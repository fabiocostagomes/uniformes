'use server';

import {
  defaultImageTransformer,
  type ImageTransformer,
  type ProcessedImageOutput,
  type RawImageInput,
} from '../../lib/images/compress';

const MAX_FILES = 3;
const MAX_ORIGINAL_BYTES = 10_000_000;
const MAX_PROCESSED_BYTES = 500_000;
const MAX_EDGE = 1600;
const MAX_UPLOADS_PER_DAY = 20;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

export type UploadImageInput = RawImageInput;

type PreparedImage = ProcessedImageOutput & {
  storagePath: string;
};

type PrepareImagesResult =
  | { ok: true; files: PreparedImage[] }
  | {
      ok: false;
      error:
        | 'too_many_files'
        | 'file_too_large'
        | 'processed_file_too_large'
        | 'invalid_processed_format';
    };

type UploadRateLimiter = {
  allow: (key: string, limit: number, windowMs: number) => Promise<boolean>;
};

const memoryAttempts = new Map<string, { count: number; expiresAt: number }>();

const memoryRateLimiter: UploadRateLimiter = {
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

function toStoragePath(listingId: string, name: string, index: number): string {
  const base = name.replace(/[^\w.-]/g, '-');
  return `${listingId}/${Date.now()}-${index}-${base}`;
}

function isProcessedOutputValid(file: ProcessedImageOutput): boolean {
  const edge = Math.max(file.width, file.height);
  return (
    file.mimeType === 'image/webp' &&
    file.exifStripped &&
    edge <= MAX_EDGE &&
    file.sizeBytes <= MAX_PROCESSED_BYTES
  );
}

export async function prepareListingImages(args: {
  listingId: string;
  files: UploadImageInput[];
  transformer: ImageTransformer;
}): Promise<PrepareImagesResult> {
  const { listingId, files, transformer } = args;

  if (files.length > MAX_FILES) return { ok: false, error: 'too_many_files' };

  for (const file of files) {
    if (file.sizeBytes > MAX_ORIGINAL_BYTES) {
      return { ok: false, error: 'file_too_large' };
    }
  }

  const prepared: PreparedImage[] = [];

  for (const [index, file] of files.entries()) {
    const processed = await transformer(file);

    if (processed.sizeBytes > MAX_PROCESSED_BYTES) {
      return { ok: false, error: 'processed_file_too_large' };
    }

    if (!isProcessedOutputValid(processed)) {
      return { ok: false, error: 'invalid_processed_format' };
    }

    prepared.push({
      ...processed,
      storagePath: toStoragePath(listingId, processed.name, index),
    });
  }

  return { ok: true, files: prepared };
}

export async function uploadListingImagesAction(formData: FormData) {
  const listingId = String(formData.get('listingId') ?? '');
  const ownerId = String(formData.get('ownerId') ?? 'anonymous');
  const allowed = await memoryRateLimiter.allow(
    `upload-images:${ownerId}`,
    MAX_UPLOADS_PER_DAY,
    DAILY_WINDOW_MS,
  );

  if (!allowed) {
    return;
  }

  // Placeholder until browser File handling + Supabase Storage integration.
  await prepareListingImages({
    listingId,
    files: [],
    transformer: defaultImageTransformer,
  });
}

export type { ImageTransformer };
