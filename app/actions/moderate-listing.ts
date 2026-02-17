'use server';

type ListingStatus = 'active' | 'reserved' | 'sold' | 'archived' | 'removed';
type ActorRole = 'member' | 'admin';

type ModerateListingInput = {
  listingId: string;
  actorId: string;
  actorRole: ActorRole;
  ownerId: string;
  currentStatus: ListingStatus;
  nextStatus: ListingStatus;
};

export type ModerateListingRepo = {
  updateStatus: (listingId: string, status: ListingStatus) => Promise<void>;
};

type ModerateListingResult =
  | { ok: true }
  | { ok: false; error: 'forbidden' | 'invalid_transition' };

type DeleteListingInput = {
  listingId: string;
  actorId: string;
  actorRole: ActorRole;
  ownerId: string;
};

type DeleteListingResult = { ok: true } | { ok: false; error: 'forbidden' };

const OWNER_TRANSITIONS: Record<ListingStatus, ListingStatus[]> = {
  active: ['reserved', 'sold', 'archived'],
  reserved: ['sold'],
  sold: [],
  archived: [],
  removed: [],
};

function ownerCanTransition(
  currentStatus: ListingStatus,
  nextStatus: ListingStatus,
): boolean {
  return OWNER_TRANSITIONS[currentStatus].includes(nextStatus);
}

export async function moderateListing(
  input: ModerateListingInput,
  deps: { repo: ModerateListingRepo },
): Promise<ModerateListingResult> {
  if (input.actorRole === 'admin') {
    if (input.nextStatus !== 'removed') {
      return { ok: false, error: 'invalid_transition' };
    }

    await deps.repo.updateStatus(input.listingId, input.nextStatus);
    return { ok: true };
  }

  if (input.actorId !== input.ownerId) {
    return { ok: false, error: 'forbidden' };
  }

  if (!ownerCanTransition(input.currentStatus, input.nextStatus)) {
    return { ok: false, error: 'invalid_transition' };
  }

  await deps.repo.updateStatus(input.listingId, input.nextStatus);
  return { ok: true };
}

export type DeleteListingRepo = {
  listImagePaths: (listingId: string) => Promise<string[]>;
  removeStorageObjects: (paths: string[]) => Promise<void>;
  deleteListing: (listingId: string) => Promise<void>;
};

export async function deleteListingWithAssets(
  input: DeleteListingInput,
  deps: { repo: DeleteListingRepo },
): Promise<DeleteListingResult> {
  const isOwner = input.actorId === input.ownerId;
  const canDelete = input.actorRole === 'admin' || isOwner;
  if (!canDelete) return { ok: false, error: 'forbidden' };

  const imagePaths = await deps.repo.listImagePaths(input.listingId);
  if (imagePaths.length > 0) {
    await deps.repo.removeStorageObjects(imagePaths);
  }

  await deps.repo.deleteListing(input.listingId);
  return { ok: true };
}

const noopRepo: ModerateListingRepo = {
  updateStatus: async () => undefined,
};

const noopDeleteListingRepo: DeleteListingRepo = {
  listImagePaths: async () => [],
  removeStorageObjects: async () => undefined,
  deleteListing: async () => undefined,
};

function parseStatus(value: string): ListingStatus | null {
  if (
    value === 'active' ||
    value === 'reserved' ||
    value === 'sold' ||
    value === 'archived' ||
    value === 'removed'
  ) {
    return value;
  }
  return null;
}

export async function moderateListingAction(formData: FormData) {
  const currentStatus = parseStatus(String(formData.get('currentStatus') ?? ''));
  const nextStatus = parseStatus(String(formData.get('nextStatus') ?? ''));

  if (!currentStatus || !nextStatus) return;

  await moderateListing(
    {
      listingId: String(formData.get('listingId') ?? ''),
      actorId: String(formData.get('actorId') ?? ''),
      actorRole: String(formData.get('actorRole') ?? '') === 'admin' ? 'admin' : 'member',
      ownerId: String(formData.get('ownerId') ?? ''),
      currentStatus,
      nextStatus,
    },
    { repo: noopRepo },
  );
}

export async function deleteListingAction(formData: FormData) {
  await deleteListingWithAssets(
    {
      listingId: String(formData.get('listingId') ?? ''),
      actorId: String(formData.get('actorId') ?? ''),
      actorRole: String(formData.get('actorRole') ?? '') === 'admin' ? 'admin' : 'member',
      ownerId: String(formData.get('ownerId') ?? ''),
    },
    { repo: noopDeleteListingRepo },
  );
}

export type { DeleteListingResult, ListingStatus };
