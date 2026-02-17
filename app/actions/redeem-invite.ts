'use server';

type InviteRecord = {
  id: string;
  schoolId: string;
  code: string;
  isActive: boolean;
  expiresAt: string | null;
};

export type InviteRepo = {
  findInviteByCode: (code: string) => Promise<InviteRecord | null>;
  hasMembership: (profileId: string, schoolId: string) => Promise<boolean>;
  createMembership: (profileId: string, schoolId: string) => Promise<void>;
  markInviteUsed: (inviteId: string, profileId: string) => Promise<void>;
};

export type RateLimiter = {
  allow: (key: string, limit: number, windowMs: number) => Promise<boolean>;
};

type RedeemInviteInput = {
  code: string;
  profileId: string;
  ip?: string;
};

type RedeemInviteResult =
  | { ok: true; schoolId: string }
  | { ok: false; error: 'invalid_code' | 'rate_limited' | 'expired_code' };

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return Date.parse(expiresAt) <= Date.now();
}

function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase();
}

function buildRateLimitKey(input: RedeemInviteInput): string {
  const source = input.ip?.trim() || input.profileId;
  return `redeem-invite:${source}`;
}

export async function redeemInvite(
  input: RedeemInviteInput,
  deps: { repo: InviteRepo; rateLimiter: RateLimiter },
): Promise<RedeemInviteResult> {
  const allowed = await deps.rateLimiter.allow(
    buildRateLimitKey(input),
    MAX_ATTEMPTS,
    WINDOW_MS,
  );

  if (!allowed) {
    return { ok: false, error: 'rate_limited' };
  }

  const code = normalizeCode(input.code);
  const invite = await deps.repo.findInviteByCode(code);

  if (!invite || !invite.isActive) {
    return { ok: false, error: 'invalid_code' };
  }

  if (isExpired(invite.expiresAt)) {
    return { ok: false, error: 'expired_code' };
  }

  const alreadyMember = await deps.repo.hasMembership(
    input.profileId,
    invite.schoolId,
  );

  if (!alreadyMember) {
    await deps.repo.createMembership(input.profileId, invite.schoolId);
  }

  await deps.repo.markInviteUsed(invite.id, input.profileId);

  return { ok: true, schoolId: invite.schoolId };
}

const noopRepo: InviteRepo = {
  findInviteByCode: async () => null,
  hasMembership: async () => false,
  createMembership: async () => undefined,
  markInviteUsed: async () => undefined,
};

const memoryAttempts = new Map<string, { count: number; expiresAt: number }>();

const memoryRateLimiter: RateLimiter = {
  allow: async (key, limit, windowMs) => {
    const now = Date.now();
    const current = memoryAttempts.get(key);

    if (!current || current.expiresAt <= now) {
      memoryAttempts.set(key, { count: 1, expiresAt: now + windowMs });
      return true;
    }

    if (current.count >= limit) return false;

    current.count += 1;
    memoryAttempts.set(key, current);
    return true;
  },
};

export async function redeemInviteAction(formData: FormData) {
  const code = String(formData.get('code') ?? '');
  const profileId = String(formData.get('profileId') ?? 'anonymous');
  const ip = String(formData.get('ip') ?? '');

  return redeemInvite(
    { code, profileId, ip },
    { repo: noopRepo, rateLimiter: memoryRateLimiter },
  );
}

