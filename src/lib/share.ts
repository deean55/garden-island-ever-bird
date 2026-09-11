import { downloadBlob } from "./utils";

export async function shareFile(blob: Blob, filename: string, title: string): Promise<"shared" | "downloaded" | "cancelled"> {
  const file = new File([blob], filename, { type: blob.type || "application/octet-stream" });
  try {
    if (typeof navigator.share === "function" && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title, text: title });
      return "shared";
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
  }
  downloadBlob(blob, filename);
  return "downloaded";
}

export async function saveFile(blob: Blob, filename: string, mime: string, extension: string): Promise<"saved" | "downloaded" | "cancelled"> {
  const picker = (
    window as Window & {
      showSaveFilePicker?: (options: {
        suggestedName: string;
        types: { description: string; accept: Record<string, string[]> }[];
      }) => Promise<{ createWritable: () => Promise<{ write: (data: Blob) => Promise<void>; close: () => Promise<void> }> }>;
    }
  ).showSaveFilePicker;
  if (typeof picker === "function") {
    try {
      const handle = await picker({
        suggestedName: filename,
        types: [{ description: extension.toUpperCase(), accept: { [mime]: [`.${extension}`] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return "saved";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    }
  }
  downloadBlob(blob, filename);
  return "downloaded";
}

export function openBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) downloadBlob(blob, "document");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export function pickImageFiles(multiple = true): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/heic,image/heif,image/webp";
    input.multiple = multiple;
    input.addEventListener("change", () => resolve(Array.from(input.files ?? [])));
    input.addEventListener("cancel", () => resolve([]));
    input.click();
  });
}

export function pickPackageFile(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".photodoc,application/zip,application/json";
    input.addEventListener("change", () => resolve(input.files?.[0] ?? null));
    input.addEventListener("cancel", () => resolve(null));
    input.click();
  });
}
