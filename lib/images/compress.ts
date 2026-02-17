export type RawImageInput = {
  name: string;
  sizeBytes: number;
  width: number;
  height: number;
  mimeType: string;
};

export type ProcessedImageOutput = {
  name: string;
  sizeBytes: number;
  width: number;
  height: number;
  mimeType: string;
  exifStripped: boolean;
};

export type ImageTransformer = (
  input: RawImageInput,
) => Promise<ProcessedImageOutput>;

export function defaultImageTransformer(
  input: RawImageInput,
): Promise<ProcessedImageOutput> {
  const edge = Math.max(input.width, input.height);
  const ratio = edge > 1600 ? 1600 / edge : 1;

  return Promise.resolve({
    name: input.name.replace(/\.[a-z0-9]+$/i, '.webp'),
    sizeBytes: Math.min(input.sizeBytes, 350_000),
    width: Math.round(input.width * ratio),
    height: Math.round(input.height * ratio),
    mimeType: 'image/webp',
    exifStripped: true,
  });
}

