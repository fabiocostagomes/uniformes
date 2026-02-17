import { describe, expect, it, vi } from 'vitest';

import {
  deleteListingWithAssets,
  type DeleteListingRepo,
} from '../../app/actions/moderate-listing';
import {
  deleteAccountData,
  type DeleteAccountRepo,
} from '../../app/actions/delete-account';

describe('privacy deletion flows', () => {
  it('deletes account profile data and owned listings', async () => {
    const deleteListing = vi.fn(async () => ({ ok: true as const }));
    const repo = {
      listOwnedListingIds: vi.fn(async () => ['listing-001', 'listing-002']),
      deleteProfileData: vi.fn(async () => undefined),
    } satisfies DeleteAccountRepo;

    const result = await deleteAccountData(
      { profileId: 'user-1' },
      { repo, deleteListing },
    );

    expect(result).toEqual({ ok: true });
    expect(deleteListing).toHaveBeenCalledWith('listing-001', 'user-1', 'member');
    expect(deleteListing).toHaveBeenCalledWith('listing-002', 'user-1', 'member');
    expect(repo.deleteProfileData).toHaveBeenCalledWith('user-1');
  });

  it('deletes listing and related storage images', async () => {
    const repo = {
      listImagePaths: vi.fn(async () => ['listing-001/a.webp', 'listing-001/b.webp']),
      removeStorageObjects: vi.fn(async () => undefined),
      deleteListing: vi.fn(async () => undefined),
    } satisfies DeleteListingRepo;

    const result = await deleteListingWithAssets(
      {
        listingId: 'listing-001',
        actorId: 'owner-1',
        actorRole: 'member',
        ownerId: 'owner-1',
      },
      { repo },
    );

    expect(result).toEqual({ ok: true });
    expect(repo.removeStorageObjects).toHaveBeenCalledWith([
      'listing-001/a.webp',
      'listing-001/b.webp',
    ]);
    expect(repo.deleteListing).toHaveBeenCalledWith('listing-001');
  });

  it('blocks deleting listings for non-owner non-admin', async () => {
    const repo = {
      listImagePaths: vi.fn(async () => []),
      removeStorageObjects: vi.fn(async () => undefined),
      deleteListing: vi.fn(async () => undefined),
    } satisfies DeleteListingRepo;

    const result = await deleteListingWithAssets(
      {
        listingId: 'listing-001',
        actorId: 'member-1',
        actorRole: 'member',
        ownerId: 'owner-1',
      },
      { repo },
    );

    expect(result).toEqual({ ok: false, error: 'forbidden' });
    expect(repo.deleteListing).not.toHaveBeenCalled();
  });
});
