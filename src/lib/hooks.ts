import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getPhotoThumb,
  getProjectBundle,
  getRepoVersion,
  getServerRepoVersion,
  listProjectSummaries,
  subscribeRepo,
} from "./repository";
import type { Photo, Project, ProjectSummary, Section } from "./models";

export function useRepoVersion(): number {
  return useSyncExternalStore(subscribeRepo, getRepoVersion, getServerRepoVersion);
}

export function useProjectList(query: string) {
  const version = useRepoVersion();
  const [data, setData] = useState<ProjectSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    listProjectSummaries(query)
      .then((list) => {
        if (!cancelled) {
          setData(list);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load projects.");
      });
    return () => {
      cancelled = true;
    };
  }, [query, version]);
  return { data, error };
}

export function useProject(projectId: string) {
  const version = useRepoVersion();
  const [bundle, setBundle] = useState<{
    project: Project;
    sections: Section[];
    photos: Photo[];
  } | null>(null);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    getProjectBundle(projectId)
      .then((next) => {
        if (cancelled) return;
        if (!next) {
          setMissing(true);
          setBundle(null);
        } else {
          setMissing(false);
          setBundle(next);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load this project.");
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, version]);
  return { bundle, missing, error };
}

export function useObjectUrl(blob: Blob | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!blob) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url;
}

const thumbCache = new Map<string, Blob>();

export function useThumbUrl(photoId: string | null | undefined, cacheKey = ""): string | null {
  const version = useRepoVersion();
  const [blob, setBlob] = useState<Blob | null>(null);
  useEffect(() => {
    if (!photoId) {
      setBlob(null);
      return;
    }
    const cached = thumbCache.get(`${photoId}:${cacheKey}:${version}`);
    if (cached) {
      setBlob(cached);
      return;
    }
    let cancelled = false;
    getPhotoThumb(photoId).then((next) => {
      if (cancelled) return;
      if (next) {
        thumbCache.set(`${photoId}:${cacheKey}:${version}`, next);
        setBlob(next);
      } else setBlob(null);
    });
    return () => {
      cancelled = true;
    };
  }, [photoId, cacheKey, version]);
  return useObjectUrl(blob);
}
