import type { Rotation } from "./models";

const THUMB_MAX = 480;
const PDF_MAX_EDGE = 2200;

function isQuotaError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "QuotaExceededError";
}

export async function readImageSize(blob: Blob): Promise<{ width: number; height: number }> {
  try {
    const bitmap = await createImageBitmap(blob);
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return size;
  } catch {
    throw new Error("This image could not be read. Try a JPEG or PNG file.");
  }
}

function rotatedSize(width: number, height: number, rotation: Rotation) {
  return rotation === 90 || rotation === 270
    ? { width: height, height: width }
    : { width, height };
}

export async function drawToCanvas(
  blob: Blob,
  rotation: Rotation,
  maxEdge?: number,
): Promise<HTMLCanvasElement> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    throw new Error("This image could not be loaded.");
  }
  const visual = rotatedSize(bitmap.width, bitmap.height, rotation);
  const scale = maxEdge ? Math.min(1, maxEdge / Math.max(visual.width, visual.height)) : 1;
  const destW = Math.max(1, Math.round(visual.width * scale));
  const destH = Math.max(1, Math.round(visual.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = destW;
  canvas.height = destH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not prepare the image.");
  }
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, destW, destH);
  ctx.translate(destW / 2, destH / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(
    bitmap,
    -(bitmap.width * scale) / 2,
    -(bitmap.height * scale) / 2,
    bitmap.width * scale,
    bitmap.height * scale,
  );
  bitmap.close();
  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not encode the image."));
      },
      type,
      quality,
    );
  });
}

export async function makeThumbnail(blob: Blob, rotation: Rotation = 0): Promise<Blob> {
  const canvas = await drawToCanvas(blob, rotation, THUMB_MAX);
  return canvasToBlob(canvas, "image/jpeg", 0.82);
}

export async function rasterizeJpeg(
  blob: Blob,
  rotation: Rotation,
  maxEdge = PDF_MAX_EDGE,
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const canvas = await drawToCanvas(blob, rotation, maxEdge);
  const out = await canvasToBlob(canvas, "image/jpeg", 0.92);
  const bytes = new Uint8Array(await out.arrayBuffer());
  return { bytes, width: canvas.width, height: canvas.height };
}

export async function captureVideoFrame(video: HTMLVideoElement): Promise<Blob> {
  const width = video.videoWidth;
  const height = video.videoHeight;
  if (!width || !height) throw new Error("The camera is not ready yet.");
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not capture a photograph.");
  ctx.drawImage(video, 0, 0, width, height);
  return canvasToBlob(canvas, "image/jpeg", 0.95);
}

export function nextRotation(current: Rotation, delta: 90 | -90): Rotation {
  return ((((current + delta) % 360) + 360) % 360) as Rotation;
}

export function friendlyQuotaError(err: unknown): Error {
  if (isQuotaError(err)) {
    return new Error("Not enough storage available on this device.");
  }
  if (err instanceof Error) return err;
  return new Error("Storage failed.");
}

export const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/heic,image/heif,image/webp";
