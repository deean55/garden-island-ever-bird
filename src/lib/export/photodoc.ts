import JSZip from "jszip";
import { z } from "zod";
import { getPhotoBlob, getPhotoThumb } from "../repository";
import {
  PHOTODOC_FORMAT,
  PHOTODOC_VERSION,
  type Photo,
  type PhotoDocManifest,
  type PhotoPhase,
  type Project,
  type Rotation,
  type Section,
} from "../models";
import { putProjectGraph } from "../idb";
import { makeThumbnail } from "../images";
import { newId, sanitizeFilename } from "../utils";

const rotationSchema = z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]);
const phaseSchema = z.union([z.literal("standard"), z.literal("before"), z.literal("after")]);

const manifestSchema = z.object({
  format: z.literal(PHOTODOC_FORMAT),
  version: z.literal(PHOTODOC_VERSION),
  exportedAt: z.string(),
  project: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    date: z.string(),
    referenceNumber: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    beforeAfterEnabled: z.boolean(),
  }),
  sections: z.array(
    z.object({
      id: z.string(),
      projectId: z.string(),
      name: z.string(),
      sortOrder: z.number(),
      isCustom: z.boolean(),
    }),
  ),
  photos: z.array(
    z.object({
      id: z.string(),
      projectId: z.string(),
      sectionId: z.string(),
      description: z.string(),
      sortOrder: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      rotation: rotationSchema,
      mimeType: z.string(),
      width: z.number(),
      height: z.number(),
      phase: phaseSchema,
      originalName: z.string(),
    }),
  ),
});

function extensionFor(mime: string, name: string): string {
  const fromName = name.split(".").pop()?.toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("heic") || mime.includes("heif")) return "heic";
  return "jpg";
}

export async function exportProjectPackage(bundle: {
  project: Project;
  sections: Section[];
  photos: Photo[];
}): Promise<{ blob: Blob; filename: string }> {
  const zip = new JSZip();
  const manifest: PhotoDocManifest = {
    format: PHOTODOC_FORMAT,
    version: PHOTODOC_VERSION,
    exportedAt: new Date().toISOString(),
    project: bundle.project,
    sections: bundle.sections,
    photos: bundle.photos,
  };
  zip.file("project.json", JSON.stringify(manifest, null, 2));
  const folder = zip.folder("photos");
  if (!folder) throw new Error("Could not create the export package.");
  for (const photo of bundle.photos) {
    const blob = await getPhotoBlob(photo.id);
    if (!blob) continue;
    const ext = extensionFor(photo.mimeType, photo.originalName);
    folder.file(`${photo.id}.${ext}`, blob);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  const filename = `${sanitizeFilename(bundle.project.name)}.photodoc`;
  return { blob, filename };
}

export async function importProjectPackage(file: Blob): Promise<Project> {
  const zip = await JSZip.loadAsync(file);
  const jsonFile = zip.file("project.json");
  if (!jsonFile) throw new Error("This file is not a valid Fieldframe package.");
  let parsed: unknown;
  try {
    parsed = JSON.parse(await jsonFile.async("string"));
  } catch {
    throw new Error("The package manifest is corrupted.");
  }
  const result = manifestSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error("The package is missing required project data.");
  }
  const manifest = result.data;
  const now = Date.now();
  const projectId = newId();
  const sectionMap = new Map<string, string>();
  const photoMap = new Map<string, string>();

  const project: Project = {
    ...manifest.project,
    id: projectId,
    name: manifest.project.name?.trim() || "Imported project",
    createdAt: now,
    updatedAt: now,
  };
  const sections: Section[] = manifest.sections.map((section) => {
    const id = newId();
    sectionMap.set(section.id, id);
    return { ...section, id, projectId };
  });
  const photos: Photo[] = [];
  const blobs: { id: string; blob: Blob }[] = [];
  const thumbs: { id: string; blob: Blob }[] = [];

  for (const photo of manifest.photos) {
    const sectionId = sectionMap.get(photo.sectionId);
    if (!sectionId) continue;
    const id = newId();
    photoMap.set(photo.id, id);
    const ext = extensionFor(photo.mimeType, photo.originalName);
    const entry =
      zip.file(`photos/${photo.id}.${ext}`) ||
      zip.file(`photos/${photo.id}.jpg`) ||
      zip.file(`photos/${photo.id}.jpeg`) ||
      zip.file(`photos/${photo.id}.png`);
    if (!entry) continue;
    const bytes = await entry.async("blob");
    const blob = bytes.type ? bytes : new Blob([bytes], { type: photo.mimeType || "image/jpeg" });
    let thumb: Blob;
    try {
      thumb = await makeThumbnail(blob, photo.rotation as Rotation);
    } catch {
      continue;
    }
    photos.push({
      ...photo,
      id,
      projectId,
      sectionId,
      phase: photo.phase as PhotoPhase,
      rotation: photo.rotation as Rotation,
    });
    blobs.push({ id, blob });
    thumbs.push({ id, blob: thumb });
  }

  if (sections.length === 0) {
    throw new Error("The package does not contain any sections.");
  }

  await putProjectGraph({ project, sections, photos, blobs, thumbs });
  return project;
}

export { getPhotoThumb };
