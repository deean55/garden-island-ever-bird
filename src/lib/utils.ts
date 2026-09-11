import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(ms: number): string {
  return new Date(ms).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function padPhotoNumber(n: number): string {
  return String(n).padStart(2, "0");
}

export function sanitizeFilename(name: string): string {
  const cleaned = name
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[._]+|[._]+$/g, "")
    .slice(0, 80);
  return cleaned || "Project";
}

export function uniqueFilename(base: string, existing: Set<string>): string {
  if (!existing.has(base.toLowerCase())) return base;
  const dot = base.lastIndexOf(".");
  const stem = dot > 0 ? base.slice(0, dot) : base;
  const ext = dot > 0 ? base.slice(dot) : "";
  for (let i = 1; i < 100; i++) {
    const next = `${stem}_${String(i).padStart(2, "0")}${ext}`;
    if (!existing.has(next.toLowerCase())) return next;
  }
  return `${stem}_${Date.now()}${ext}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2_000);
}

export function userMessage(err: unknown, fallback: string): string {
  if (err instanceof DOMException) {
    if (err.name === "NotAllowedError") return "Permission was denied.";
    if (err.name === "NotFoundError") return "No camera was found on this device.";
    if (err.name === "NotReadableError") return "The camera is already in use.";
    if (err.name === "AbortError") return "The action was cancelled.";
    if (err.name === "QuotaExceededError") return "Not enough storage available on this device.";
    if (err.name === "SecurityError") return "Access was blocked by the browser.";
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export function newId(): string {
  return crypto.randomUUID();
}
