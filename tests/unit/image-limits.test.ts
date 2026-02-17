import { describe, expect, it } from 'vitest';

import {
  prepareListingImages,
  type ImageTransformer,
  type UploadImageInput,
} from '../../app/actions/upload-listing-images';

const baseFile = (overrides: Partial<UploadImageInput> = {}): UploadImageInput => ({
  name: 'uniforme.jpg',
  sizeBytes: 500_000,
  width: 1200,
  height: 900,
  mimeType: 'image/jpeg',
  ...overrides,
});

const passthroughTransformer: ImageTransformer = async (file) => ({
  name: file.name.replace(/\.[a-z]+$/i, '.webp'),
  sizeBytes: 300_000,
  width: 1200,
  height: 900,
  mimeType: 'image/webp',
  exifStripped: true,
});

describe('image limits', () => {
  it('rejects more than 3 images', async () => {
    const result = await prepareListingImages({
      listingId: 'listing-1',
      files: [baseFile(), baseFile(), baseFile(), baseFile()],
      transformer: passthroughTransformer,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('too_many_files');
    }
  });

  it('rejects originals above 10MB', async () => {
    const result = await prepareListingImages({
      listingId: 'listing-1',
      files: [baseFile({ sizeBytes: 11_000_000 })],
      transformer: passthroughTransformer,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('file_too_large');
    }
  });

  it('rejects processed files above 500KB', async () => {
    const oversizedTransformer: ImageTransformer = async () => ({
      name: 'uniforme.webp',
      sizeBytes: 600_000,
      width: 1200,
      height: 900,
      mimeType: 'image/webp',
      exifStripped: true,
    });

    const result = await prepareListingImages({
      listingId: 'listing-1',
      files: [baseFile()],
      transformer: oversizedTransformer,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('processed_file_too_large');
    }
  });

  it('enforces webp output and exif stripping', async () => {
    const badTransformer: ImageTransformer = async () => ({
      name: 'uniforme.jpg',
      sizeBytes: 200_000,
      width: 1200,
      height: 900,
      mimeType: 'image/jpeg',
      exifStripped: false,
    });

    const result = await prepareListingImages({
      listingId: 'listing-1',
      files: [baseFile()],
      transformer: badTransformer,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('invalid_processed_format');
    }
  });

  it('returns upload-ready files when constraints are met', async () => {
    const result = await prepareListingImages({
      listingId: 'listing-1',
      files: [baseFile()],
      transformer: passthroughTransformer,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.files).toHaveLength(1);
      expect(result.files[0].mimeType).toBe('image/webp');
      expect(result.files[0].storagePath).toContain('listing-1/');
    }
  });
});
