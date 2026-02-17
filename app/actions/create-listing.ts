'use server';

type ListingInput = {
  schoolId: string;
  ownerId: string;
  title: string;
  size: string;
  whatsappPhone: string;
  description?: string;
  condition?: string;
  isFree: boolean;
  priceCents?: number;
};

export type CreateListingRepo = {
  createListing: (input: ListingInput) => Promise<{ id: string }>;
};

export type ListingRateLimiter = {
  allow: (key: string, limit: number, windowMs: number) => Promise<boolean>;
};

type CreateListingResult =
  | { ok: true; listingId: string }
  | { ok: false; error: 'validation_error' | 'rate_limited' };

const MAX_DAILY_LISTINGS = 5;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PRICE_CENTS = 200000;

function nonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function isValidPrice(input: ListingInput): boolean {
  if (input.isFree) return true;
  if (typeof input.priceCents !== 'number') return false;
  return input.priceCents > 0 && input.priceCents <= MAX_PRICE_CENTS;
}

function isValidInput(input: ListingInput): boolean {
  return (
    nonEmpty(input.schoolId) &&
    nonEmpty(input.ownerId) &&
    nonEmpty(input.title) &&
    nonEmpty(input.size) &&
    nonEmpty(input.whatsappPhone) &&
    isValidPrice(input)
  );
}

function listingRateLimitKey(ownerId: string): string {
  return `create-listing:${ownerId}`;
}

export async function createListing(
  input: ListingInput,
  deps: { repo: CreateListingRepo; rateLimiter: ListingRateLimiter },
): Promise<CreateListingResult> {
  const allowed = await deps.rateLimiter.allow(
    listingRateLimitKey(input.ownerId),
    MAX_DAILY_LISTINGS,
    DAILY_WINDOW_MS,
  );

  if (!allowed) return { ok: false, error: 'rate_limited' };
  if (!isValidInput(input)) return { ok: false, error: 'validation_error' };

  const created = await deps.repo.createListing({
    ...input,
    title: input.title.trim(),
    size: input.size.trim(),
    whatsappPhone: input.whatsappPhone.trim(),
    description: input.description?.trim(),
    condition: input.condition?.trim(),
  });

  return { ok: true, listingId: created.id };
}

const noopRepo: CreateListingRepo = {
  createListing: async () => ({ id: 'noop-listing' }),
};

const memoryAttempts = new Map<string, { count: number; expiresAt: number }>();

const memoryRateLimiter: ListingRateLimiter = {
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

export async function createListingAction(formData: FormData) {
  const isFree = String(formData.get('isFree') ?? '') === 'on';
  const priceRaw = String(formData.get('priceCents') ?? '').trim();
  const priceCents = priceRaw ? Number(priceRaw) : undefined;

  return createListing(
    {
      schoolId: String(formData.get('schoolId') ?? ''),
      ownerId: String(formData.get('ownerId') ?? ''),
      title: String(formData.get('title') ?? ''),
      size: String(formData.get('size') ?? ''),
      whatsappPhone: String(formData.get('whatsappPhone') ?? ''),
      description: String(formData.get('description') ?? ''),
      condition: String(formData.get('condition') ?? ''),
      isFree,
      priceCents,
    },
    { repo: noopRepo, rateLimiter: memoryRateLimiter },
  );
}

