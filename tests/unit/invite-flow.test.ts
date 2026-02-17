import { describe, expect, it, vi } from 'vitest';

import { redeemInvite, type InviteRepo, type RateLimiter } from '../../app/actions/redeem-invite';

function makeRepo(overrides: Partial<InviteRepo> = {}): InviteRepo {
  return {
    findInviteByCode: vi.fn(async () => null),
    hasMembership: vi.fn(async () => false),
    createMembership: vi.fn(async () => undefined),
    markInviteUsed: vi.fn(async () => undefined),
    ...overrides,
  };
}

function makeRateLimiter(allow = true): RateLimiter {
  return {
    allow: vi.fn(async () => allow),
  };
}

describe('invite flow', () => {
  it('blocks non-member when code is invalid', async () => {
    const repo = makeRepo();
    const rateLimiter = makeRateLimiter(true);

    const result = await redeemInvite(
      {
        code: 'INVALID',
        profileId: 'user-1',
        ip: '127.0.0.1',
      },
      { repo, rateLimiter },
    );

    expect(result.ok).toBe(false);
    expect(result.error).toBe('invalid_code');
  });

  it('creates membership and marks invite as used for valid code', async () => {
    const repo = makeRepo({
      findInviteByCode: vi.fn(async () => ({
        id: 'invite-1',
        schoolId: 'school-1',
        code: 'VALID',
        isActive: true,
        expiresAt: null,
      })),
    });
    const rateLimiter = makeRateLimiter(true);

    const result = await redeemInvite(
      {
        code: 'VALID',
        profileId: 'user-1',
        ip: '127.0.0.1',
      },
      { repo, rateLimiter },
    );

    expect(result.ok).toBe(true);
    expect(repo.createMembership).toHaveBeenCalledWith('user-1', 'school-1');
    expect(repo.markInviteUsed).toHaveBeenCalledWith('invite-1', 'user-1');
  });

  it('applies rate limit before redeem attempt', async () => {
    const repo = makeRepo();
    const rateLimiter = makeRateLimiter(false);

    const result = await redeemInvite(
      {
        code: 'ANY',
        profileId: 'user-1',
        ip: '127.0.0.1',
      },
      { repo, rateLimiter },
    );

    expect(result.ok).toBe(false);
    expect(result.error).toBe('rate_limited');
    expect(repo.findInviteByCode).not.toHaveBeenCalled();
  });
});
