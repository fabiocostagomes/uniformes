import { describe, expect, it, vi } from 'vitest';

import {
  moderateListing,
  type ModerateListingRepo,
} from '../../app/actions/moderate-listing';

function buildRepo() {
  return {
    updateStatus: vi.fn(async () => undefined),
  } satisfies ModerateListingRepo;
}

describe('moderation', () => {
  it('blocks members from removing listings they do not own', async () => {
    const repo = buildRepo();

    const result = await moderateListing(
      {
        listingId: 'listing-001',
        actorId: 'member-1',
        actorRole: 'member',
        ownerId: 'owner-1',
        currentStatus: 'active',
        nextStatus: 'removed',
      },
      { repo },
    );

    expect(result).toEqual({ ok: false, error: 'forbidden' });
    expect(repo.updateStatus).not.toHaveBeenCalled();
  });

  it('allows owner transition from active to reserved', async () => {
    const repo = buildRepo();

    const result = await moderateListing(
      {
        listingId: 'listing-001',
        actorId: 'owner-1',
        actorRole: 'member',
        ownerId: 'owner-1',
        currentStatus: 'active',
        nextStatus: 'reserved',
      },
      { repo },
    );

    expect(result).toEqual({ ok: true });
    expect(repo.updateStatus).toHaveBeenCalledWith('listing-001', 'reserved');
  });

  it('blocks invalid owner transitions', async () => {
    const repo = buildRepo();

    const result = await moderateListing(
      {
        listingId: 'listing-001',
        actorId: 'owner-1',
        actorRole: 'member',
        ownerId: 'owner-1',
        currentStatus: 'reserved',
        nextStatus: 'active',
      },
      { repo },
    );

    expect(result).toEqual({ ok: false, error: 'invalid_transition' });
    expect(repo.updateStatus).not.toHaveBeenCalled();
  });

  it('allows admins to remove listings from any status', async () => {
    const repo = buildRepo();

    const result = await moderateListing(
      {
        listingId: 'listing-001',
        actorId: 'admin-1',
        actorRole: 'admin',
        ownerId: 'owner-1',
        currentStatus: 'sold',
        nextStatus: 'removed',
      },
      { repo },
    );

    expect(result).toEqual({ ok: true });
    expect(repo.updateStatus).toHaveBeenCalledWith('listing-001', 'removed');
  });
});
