import type { PixelCrop } from "react-image-crop";

export type CropRenderOptions = {
  /** UI zoom applied via CSS transform: scale(...) around center. */
  zoom?: number;
  /** Output size (square). */
  outputSize?: number;
};

/**
 * Renders a 1:1 crop (PixelCrop) into a square PNG canvas.
 * Designed so preview === final output.
 *
 * If the image is visually zoomed via CSS transform (scale) without affecting layout,
 * we invert that transform to match what the user sees.
 */
export function renderSquareCroppedCanvas(
  imageEl: HTMLImageElement,
  crop: PixelCrop,
  options: CropRenderOptions = {}
) {
  const outputSize = options.outputSize ?? 512;
  const zoom = options.zoom ?? 1;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2D context");

  canvas.width = outputSize;
  canvas.height = outputSize;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Convert crop from displayed (layout) pixels into the unzoomed layout space.
  const displayW = imageEl.width;
  const displayH = imageEl.height;
  const cx = displayW / 2;
  const cy = displayH / 2;

  const invZoom = zoom === 0 ? 1 : 1 / zoom;
  const unzoomedX = (crop.x - cx) * invZoom + cx;
  const unzoomedY = (crop.y - cy) * invZoom + cy;
  const unzoomedW = crop.width * invZoom;
  const unzoomedH = crop.height * invZoom;

  // Map layout pixels -> natural pixels.
  const scaleX = imageEl.naturalWidth / displayW;
  const scaleY = imageEl.naturalHeight / displayH;

  const sx = Math.max(0, Math.round(unzoomedX * scaleX));
  const sy = Math.max(0, Math.round(unzoomedY * scaleY));
  const sw = Math.min(imageEl.naturalWidth - sx, Math.round(unzoomedW * scaleX));
  const sh = Math.min(imageEl.naturalHeight - sy, Math.round(unzoomedH * scaleY));

  ctx.clearRect(0, 0, outputSize, outputSize);
  ctx.drawImage(imageEl, sx, sy, sw, sh, 0, 0, outputSize, outputSize);

  return canvas;
}

export async function canvasToPngBlob(canvas: HTMLCanvasElement, quality = 0.95) {
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Failed to create PNG blob"));
        resolve(blob);
      },
      "image/png",
      quality
    );
  });
}
