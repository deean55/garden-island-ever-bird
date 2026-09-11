export type PhotoPhase = "standard" | "before" | "after";
export type Rotation = 0 | 90 | 180 | 270;

export interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  referenceNumber: string;
  createdAt: number;
  updatedAt: number;
  beforeAfterEnabled: boolean;
}

export interface Section {
  id: string;
  projectId: string;
  name: string;
  sortOrder: number;
  isCustom: boolean;
}

export interface Photo {
  id: string;
  projectId: string;
  sectionId: string;
  description: string;
  sortOrder: number;
  createdAt: number;
  updatedAt: number;
  rotation: Rotation;
  mimeType: string;
  width: number;
  height: number;
  phase: PhotoPhase;
  originalName: string;
}

export interface ProjectSummary extends Project {
  photoCount: number;
  coverPhotoId: string | null;
}

export interface NumberedPhoto {
  photo: Photo;
  section: Section;
  number: number;
}

export const DEFAULT_SECTION_NAMES = [
  "Front",
  "Front Left",
  "Left",
  "Rear Left",
  "Rear",
  "Rear Right",
  "Right",
  "Front Right",
  "Top",
  "Bottom",
  "Close-up 1",
  "Close-up 2",
] as const;

export const CUSTOM_SECTION_SUGGESTIONS = [
  "Exterior",
  "Interior",
  "Engine",
  "Damage",
  "Roof",
  "Electrical",
  "Plumbing",
  "Documents",
] as const;

export const PHOTODOC_FORMAT = "photodoc" as const;
export const PHOTODOC_VERSION = 1 as const;

export interface PhotoDocManifest {
  format: typeof PHOTODOC_FORMAT;
  version: typeof PHOTODOC_VERSION;
  exportedAt: string;
  project: Project;
  sections: Section[];
  photos: Photo[];
}
