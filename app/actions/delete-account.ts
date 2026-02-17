'use server';

import type { DeleteListingResult } from './moderate-listing';

type DeleteAccountInput = {
  profileId: string;
};

export type DeleteAccountRepo = {
  listOwnedListingIds: (profileId: string) => Promise<string[]>;
  deleteProfileData: (profileId: string) => Promise<void>;
};

type DeleteAccountResult = { ok: true } | { ok: false; error: 'listing_delete_failed' };

type DeleteListingFn = (
  listingId: string,
  actorId: string,
  actorRole: 'member' | 'admin',
) => Promise<DeleteListingResult>;

export async function deleteAccountData(
  input: DeleteAccountInput,
  deps: { repo: DeleteAccountRepo; deleteListing: DeleteListingFn },
): Promise<DeleteAccountResult> {
  const listingIds = await deps.repo.listOwnedListingIds(input.profileId);

  for (const listingId of listingIds) {
    const deleted = await deps.deleteListing(listingId, input.profileId, 'member');
    if (!deleted.ok) {
      return { ok: false, error: 'listing_delete_failed' };
    }
  }

  await deps.repo.deleteProfileData(input.profileId);
  return { ok: true };
}

const noopRepo: DeleteAccountRepo = {
  listOwnedListingIds: async () => [],
  deleteProfileData: async () => undefined,
};

const noopDeleteListing: DeleteListingFn = async () => ({ ok: true });

export async function deleteAccountAction(formData: FormData) {
  const profileId = String(formData.get('profileId') ?? '');
  await deleteAccountData({ profileId }, { repo: noopRepo, deleteListing: noopDeleteListing });
}
