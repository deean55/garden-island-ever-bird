import {
  deletePhotoGraph,
  deleteProjectGraph,
  idbDelete,
  idbGet,
  idbGetAll,
  idbGetAllByIndex,
  idbPut,
  putProjectGraph,
  type BlobRecord,
} from "./idb";
import { friendlyQuotaError, makeThumbnail, readImageSize } from "./images";
import {
  CUSTOM_SECTION_SUGGESTIONS,
  DEFAULT_SECTION_NAMES,
  type NumberedPhoto,
  type Photo,
  type PhotoPhase,
  type Project,
  type ProjectSummary,
  type Rotation,
  type Section,
} from "./models";
import { newId, todayIsoDate } from "./utils";

type Listener = () => void;
const listeners = new Set<Listener>();
let version = 0;

function emit() {
  version += 1;
  for (const listener of listeners) listener();
}

export function subscribeRepo(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getRepoVersion(): number {
  return version;
}

export function getServerRepoVersion(): number {
  return 0;
}

async function touchProject(projectId: string): Promise<void> {
  const project = await idbGet<Project>("projects", projectId);
  if (!project) return;
  project.updatedAt = Date.now();
  await idbPut("projects", project);
}

function sortSections(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

function sortPhotos(photos: Photo[]): Photo[] {
  return [...photos].sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt - b.createdAt);
}

export function numberPhotos(sections: Section[], photos: Photo[]): NumberedPhoto[] {
  const result: NumberedPhoto[] = [];
  let n = 1;
  for (const section of sortSections(sections)) {
    for (const photo of sortPhotos(photos.filter((p) => p.sectionId === section.id))) {
      result.push({ photo, section, number: n });
      n += 1;
    }
  }
  return result;
}

export function numberPhotosForPdf(
  project: Project,
  sections: Section[],
  photos: Photo[],
): { label: string; items: NumberedPhoto[] }[] {
  if (!project.beforeAfterEnabled) {
    return [{ label: "Photographs", items: numberPhotos(sections, photos) }];
  }
  const beforePhotos = photos.filter((p) => p.phase !== "after");
  const afterPhotos = photos.filter((p) => p.phase === "after");
  const before = numberPhotos(sections, beforePhotos);
  const after = numberPhotos(sections, afterPhotos).map((item, index) => ({
    ...item,
    number: before.length + index + 1,
  }));
  return [
    { label: "BEFORE", items: before },
    { label: "AFTER", items: after },
  ];
}

export async function listProjectSummaries(query = ""): Promise<ProjectSummary[]> {
  const [projects, photos] = await Promise.all([
    idbGetAll<Project>("projects"),
    idbGetAll<Photo>("photos"),
  ]);
  const needle = query.trim().toLowerCase();
  const byProject = new Map<string, Photo[]>();
  for (const photo of photos) {
    const list = byProject.get(photo.projectId) ?? [];
    list.push(photo);
    byProject.set(photo.projectId, list);
  }
  return projects
    .filter((project) => {
      if (!needle) return true;
      const hay = `${project.name} ${project.description} ${project.referenceNumber}`.toLowerCase();
      return hay.includes(needle);
    })
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map((project) => {
      const list = sortPhotos(byProject.get(project.id) ?? []);
      return {
        ...project,
        photoCount: list.length,
        coverPhotoId: list[0]?.id ?? null,
      };
    });
}

export async function getProject(id: string): Promise<Project | undefined> {
  return idbGet<Project>("projects", id);
}

export async function getProjectBundle(id: string): Promise<{
  project: Project;
  sections: Section[];
  photos: Photo[];
} | null> {
  const project = await idbGet<Project>("projects", id);
  if (!project) return null;
  const [sections, photos] = await Promise.all([
    idbGetAllByIndex<Section>("sections", "byProject", id),
    idbGetAllByIndex<Photo>("photos", "byProject", id),
  ]);
  return { project, sections: sortSections(sections), photos: sortPhotos(photos) };
}

export async function createProject(input: {
  name: string;
  description: string;
  date: string;
  referenceNumber: string;
  beforeAfterEnabled: boolean;
}): Promise<Project> {
  const now = Date.now();
  const project: Project = {
    id: newId(),
    name: input.name.trim() || "Untitled project",
    description: input.description.trim(),
    date: input.date || todayIsoDate(),
    referenceNumber: input.referenceNumber.trim(),
    createdAt: now,
    updatedAt: now,
    beforeAfterEnabled: input.beforeAfterEnabled,
  };
  const sections: Section[] = DEFAULT_SECTION_NAMES.map((name, index) => ({
    id: newId(),
    projectId: project.id,
    name,
    sortOrder: index,
    isCustom: false,
  }));
  await putProjectGraph({ project, sections, photos: [], blobs: [], thumbs: [] });
  emit();
  return project;
}

export async function updateProject(
  id: string,
  patch: Partial<Pick<Project, "name" | "description" | "date" | "referenceNumber" | "beforeAfterEnabled">>,
): Promise<void> {
  const project = await idbGet<Project>("projects", id);
  if (!project) throw new Error("Project not found.");
  const next: Project = {
    ...project,
    ...patch,
    name: (patch.name ?? project.name).trim() || project.name,
    updatedAt: Date.now(),
  };
  await idbPut("projects", next);
  emit();
}

export async function deleteProject(id: string): Promise<void> {
  await deleteProjectGraph(id);
  emit();
}

export async function addSection(projectId: string, name: string): Promise<Section> {
  const sections = await idbGetAllByIndex<Section>("sections", "byProject", projectId);
  const maxOrder = sections.reduce((m, s) => Math.max(m, s.sortOrder), -1);
  const section: Section = {
    id: newId(),
    projectId,
    name: name.trim() || "Custom",
    sortOrder: maxOrder + 1,
    isCustom: true,
  };
  await idbPut("sections", section);
  await touchProject(projectId);
  emit();
  return section;
}

export async function renameSection(id: string, name: string): Promise<void> {
  const section = await idbGet<Section>("sections", id);
  if (!section) throw new Error("Section not found.");
  section.name = name.trim() || section.name;
  await idbPut("sections", section);
  await touchProject(section.projectId);
  emit();
}

export async function deleteSection(id: string): Promise<void> {
  const section = await idbGet<Section>("sections", id);
  if (!section) return;
  const photos = await idbGetAllByIndex<Photo>("photos", "bySection", id);
  for (const photo of photos) await deletePhotoGraph(photo.id);
  await idbDelete("sections", id);
  await touchProject(section.projectId);
  emit();
}

export async function getPhoto(id: string): Promise<Photo | undefined> {
  return idbGet<Photo>("photos", id);
}

export async function getPhotoBlob(id: string): Promise<Blob | undefined> {
  const record = await idbGet<BlobRecord>("blobs", id);
  return record?.blob;
}

export async function getPhotoThumb(id: string): Promise<Blob | undefined> {
  const record = await idbGet<BlobRecord>("thumbs", id);
  return record?.blob ?? (await getPhotoBlob(id));
}

export async function addPhotos(input: {
  projectId: string;
  sectionId: string;
  files: File[] | Blob[];
  phase: PhotoPhase;
  names?: string[];
}): Promise<Photo[]> {
  const existing = await idbGetAllByIndex<Photo>("photos", "bySection", input.sectionId);
  let order = existing.reduce((m, p) => Math.max(m, p.sortOrder), -1);
  const created: Photo[] = [];
  try {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i]!;
      const mimeType = file.type || "image/jpeg";
      const size = await readImageSize(file);
      const id = newId();
      const now = Date.now();
      order += 1;
      const photo: Photo = {
        id,
        projectId: input.projectId,
        sectionId: input.sectionId,
        description: "",
        sortOrder: order,
        createdAt: now,
        updatedAt: now,
        rotation: 0,
        mimeType,
        width: size.width,
        height: size.height,
        phase: input.phase,
        originalName: input.names?.[i] || (file instanceof File ? file.name : `capture-${id}.jpg`),
      };
      const thumb = await makeThumbnail(file, 0);
      await idbPut("photos", photo);
      await idbPut("blobs", { id, blob: file });
      await idbPut("thumbs", { id, blob: thumb });
      created.push(photo);
    }
    await touchProject(input.projectId);
    emit();
    return created;
  } catch (err) {
    throw friendlyQuotaError(err);
  }
}

export async function replacePhoto(photoId: string, file: Blob, originalName?: string): Promise<void> {
  const photo = await idbGet<Photo>("photos", photoId);
  if (!photo) throw new Error("Photograph not found.");
  try {
    const size = await readImageSize(file);
    const thumb = await makeThumbnail(file, photo.rotation);
    photo.mimeType = file.type || photo.mimeType;
    photo.width = size.width;
    photo.height = size.height;
    photo.updatedAt = Date.now();
    if (originalName) photo.originalName = originalName;
    await idbPut("photos", photo);
    await idbPut("blobs", { id: photoId, blob: file });
    await idbPut("thumbs", { id: photoId, blob: thumb });
    await touchProject(photo.projectId);
    emit();
  } catch (err) {
    throw friendlyQuotaError(err);
  }
}

export async function updatePhoto(
  id: string,
  patch: Partial<Pick<Photo, "description" | "phase" | "rotation" | "sortOrder" | "sectionId">>,
): Promise<void> {
  const photo = await idbGet<Photo>("photos", id);
  if (!photo) throw new Error("Photograph not found.");
  Object.assign(photo, patch);
  photo.updatedAt = Date.now();
  await idbPut("photos", photo);
  await touchProject(photo.projectId);
  emit();
}

export async function rotatePhoto(id: string, delta: 90 | -90): Promise<void> {
  const photo = await idbGet<Photo>("photos", id);
  if (!photo) throw new Error("Photograph not found.");
  const next = ((((photo.rotation + delta) % 360) + 360) % 360) as Rotation;
  photo.rotation = next;
  photo.updatedAt = Date.now();
  const blob = await getPhotoBlob(id);
  if (blob) {
    const thumb = await makeThumbnail(blob, next);
    await idbPut("thumbs", { id, blob: thumb });
  }
  await idbPut("photos", photo);
  await touchProject(photo.projectId);
  emit();
}

export async function deletePhoto(id: string): Promise<void> {
  const photo = await idbGet<Photo>("photos", id);
  if (!photo) return;
  await deletePhotoGraph(id);
  await touchProject(photo.projectId);
  emit();
}

export async function movePhoto(photoId: string, sectionId: string, phase?: PhotoPhase): Promise<void> {
  const photo = await idbGet<Photo>("photos", photoId);
  if (!photo) throw new Error("Photograph not found.");
  const existing = await idbGetAllByIndex<Photo>("photos", "bySection", sectionId);
  const max = existing
    .filter((p) => p.id !== photoId)
    .reduce((m, p) => Math.max(m, p.sortOrder), -1);
  photo.sectionId = sectionId;
  photo.sortOrder = max + 1;
  if (phase) photo.phase = phase;
  photo.updatedAt = Date.now();
  await idbPut("photos", photo);
  await touchProject(photo.projectId);
  emit();
}

export async function reorderPhotos(sectionId: string, orderedIds: string[]): Promise<void> {
  const photos = await idbGetAllByIndex<Photo>("photos", "bySection", sectionId);
  const map = new Map(photos.map((p) => [p.id, p]));
  for (let i = 0; i < orderedIds.length; i++) {
    const photo = map.get(orderedIds[i]!);
    if (!photo) continue;
    photo.sortOrder = i;
    photo.updatedAt = Date.now();
    await idbPut("photos", photo);
  }
  const first = photos[0];
  if (first) await touchProject(first.projectId);
  emit();
}

export async function shiftPhoto(photoId: string, direction: -1 | 1): Promise<void> {
  const photo = await idbGet<Photo>("photos", photoId);
  if (!photo) return;
  const siblings = sortPhotos(await idbGetAllByIndex<Photo>("photos", "bySection", photo.sectionId)).filter(
    (p) => p.phase === photo.phase,
  );
  const index = siblings.findIndex((p) => p.id === photoId);
  const swap = siblings[index + direction];
  if (!swap) return;
  const tmp = photo.sortOrder;
  photo.sortOrder = swap.sortOrder;
  swap.sortOrder = tmp;
  photo.updatedAt = Date.now();
  swap.updatedAt = Date.now();
  await idbPut("photos", photo);
  await idbPut("photos", swap);
  await touchProject(photo.projectId);
  emit();
}

export function notifyRepo() {
  emit();
}

export { CUSTOM_SECTION_SUGGESTIONS };

