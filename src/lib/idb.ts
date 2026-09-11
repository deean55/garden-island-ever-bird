import type { Photo, Project, Section } from "./models";

const DB_NAME = "fieldframe";
const DB_VERSION = 1;

export type BlobRecord = { id: string; blob: Blob };

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
  });
}

function transactionDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB transaction aborted"));
  });
}

let dbPromise: Promise<IDBDatabase> | null = null;

export function isDbAvailable(): boolean {
  return typeof indexedDB !== "undefined";
}

export function openFieldframeDb(): Promise<IDBDatabase> {
  if (!isDbAvailable()) {
    return Promise.reject(new Error("Local storage is not available in this browser."));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("projects")) {
          db.createObjectStore("projects", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("sections")) {
          const sections = db.createObjectStore("sections", { keyPath: "id" });
          sections.createIndex("byProject", "projectId", { unique: false });
        }
        if (!db.objectStoreNames.contains("photos")) {
          const photos = db.createObjectStore("photos", { keyPath: "id" });
          photos.createIndex("byProject", "projectId", { unique: false });
          photos.createIndex("bySection", "sectionId", { unique: false });
        }
        if (!db.objectStoreNames.contains("blobs")) {
          db.createObjectStore("blobs", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("thumbs")) {
          db.createObjectStore("thumbs", { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        dbPromise = null;
        reject(request.error ?? new Error("Could not open the local database."));
      };
    });
  }
  return dbPromise;
}

export async function idbGet<T>(store: string, id: string): Promise<T | undefined> {
  const db = await openFieldframeDb();
  const tx = db.transaction(store, "readonly");
  const result = await requestToPromise(tx.objectStore(store).get(id));
  await transactionDone(tx);
  return result as T | undefined;
}

export async function idbGetAll<T>(store: string): Promise<T[]> {
  const db = await openFieldframeDb();
  const tx = db.transaction(store, "readonly");
  const result = await requestToPromise(tx.objectStore(store).getAll());
  await transactionDone(tx);
  return result as T[];
}

export async function idbGetAllByIndex<T>(
  store: string,
  index: string,
  value: IDBValidKey,
): Promise<T[]> {
  const db = await openFieldframeDb();
  const tx = db.transaction(store, "readonly");
  const result = await requestToPromise(tx.objectStore(store).index(index).getAll(value));
  await transactionDone(tx);
  return result as T[];
}

export async function idbPut(store: string, value: unknown): Promise<void> {
  const db = await openFieldframeDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).put(value);
  await transactionDone(tx);
}

export async function idbDelete(store: string, id: string): Promise<void> {
  const db = await openFieldframeDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).delete(id);
  await transactionDone(tx);
}

export async function putProjectGraph(args: {
  project: Project;
  sections: Section[];
  photos: Photo[];
  blobs: BlobRecord[];
  thumbs: BlobRecord[];
}): Promise<void> {
  const db = await openFieldframeDb();
  const tx = db.transaction(
    ["projects", "sections", "photos", "blobs", "thumbs"],
    "readwrite",
  );
  tx.objectStore("projects").put(args.project);
  for (const section of args.sections) tx.objectStore("sections").put(section);
  for (const photo of args.photos) tx.objectStore("photos").put(photo);
  for (const blob of args.blobs) tx.objectStore("blobs").put(blob);
  for (const thumb of args.thumbs) tx.objectStore("thumbs").put(thumb);
  await transactionDone(tx);
}

export async function deleteProjectGraph(projectId: string): Promise<void> {
  const photos = await idbGetAllByIndex<Photo>("photos", "byProject", projectId);
  const sections = await idbGetAllByIndex<Section>("sections", "byProject", projectId);
  const db = await openFieldframeDb();
  const tx = db.transaction(
    ["projects", "sections", "photos", "blobs", "thumbs"],
    "readwrite",
  );
  tx.objectStore("projects").delete(projectId);
  for (const section of sections) tx.objectStore("sections").delete(section.id);
  for (const photo of photos) {
    tx.objectStore("photos").delete(photo.id);
    tx.objectStore("blobs").delete(photo.id);
    tx.objectStore("thumbs").delete(photo.id);
  }
  await transactionDone(tx);
}

export async function deletePhotoGraph(photoId: string): Promise<void> {
  const db = await openFieldframeDb();
  const tx = db.transaction(["photos", "blobs", "thumbs"], "readwrite");
  tx.objectStore("photos").delete(photoId);
  tx.objectStore("blobs").delete(photoId);
  tx.objectStore("thumbs").delete(photoId);
  await transactionDone(tx);
}
