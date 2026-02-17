import { describe, expect, it, vi } from 'vitest';

import {
  createListing,
  type CreateListingRepo,
  type ListingRateLimiter,
} from '../../app/actions/create-listing';

function makeRepo(overrides: Partial<CreateListingRepo> = {}): CreateListingRepo {
  return {
    createListing: vi.fn(async () => ({ id: 'listing-1' })),
    ...overrides,
  };
}

function makeRateLimiter(allow = true): ListingRateLimiter {
  return {
    allow: vi.fn(async () => allow),
  };
}

describe('create listing', () => {
  it('rejects when required fields are missing', async () => {
    const repo = makeRepo();
    const result = await createListing(
      {
        schoolId: 'school-1',
        ownerId: 'user-1',
        title: '',
        size: '',
        whatsappPhone: '',
        isFree: false,
      },
      { repo, rateLimiter: makeRateLimiter(true) },
    );

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('expected validation error');
    expect(result.error).toBe('validation_error');
  });

  it('rejects when paid listing has no price', async () => {
    const repo = makeRepo();
    const result = await createListing(
      {
        schoolId: 'school-1',
        ownerId: 'user-1',
        title: 'Camisola oficial',
        size: '10',
        whatsappPhone: '+351910000000',
        isFree: false,
      },
      { repo, rateLimiter: makeRateLimiter(true) },
    );

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('expected validation error');
    expect(result.error).toBe('validation_error');
  });

  it('rejects when price exceeds maximum', async () => {
    const repo = makeRepo();
    const result = await createListing(
      {
        schoolId: 'school-1',
        ownerId: 'user-1',
        title: 'Casaco',
        size: '12',
        whatsappPhone: '+351910000000',
        isFree: false,
        priceCents: 300000,
      },
      { repo, rateLimiter: makeRateLimiter(true) },
    );

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('expected validation error');
    expect(result.error).toBe('validation_error');
  });

  it('creates listing when input is valid', async () => {
    const repo = makeRepo();

    const result = await createListing(
      {
        schoolId: 'school-1',
        ownerId: 'user-1',
        title: 'Polo colegio',
        size: '10',
        whatsappPhone: '+351910000000',
        isFree: true,
      },
      { repo, rateLimiter: makeRateLimiter(true) },
    );

    expect(result.ok).toBe(true);
    expect(repo.createListing).toHaveBeenCalledTimes(1);
  });

  it('applies rate limiting before creating listing', async () => {
    const repo = makeRepo();

    const result = await createListing(
      {
        schoolId: 'school-1',
        ownerId: 'user-1',
        title: 'Polo colegio',
        size: '10',
        whatsappPhone: '+351910000000',
        isFree: true,
      },
      { repo, rateLimiter: makeRateLimiter(false) },
    );

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('expected rate limited error');
    expect(result.error).toBe('rate_limited');
    expect(repo.createListing).not.toHaveBeenCalled();
  });
});
