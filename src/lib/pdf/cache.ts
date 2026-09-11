import type { GeneratedReport } from "./report";

let cached: { projectId: string; report: GeneratedReport } | null = null;

export function setCachedReport(projectId: string, report: GeneratedReport) {
  cached = { projectId, report };
}

export function getCachedReport(projectId: string): GeneratedReport | null {
  if (cached?.projectId === projectId) return cached.report;
  return null;
}

export function clearCachedReport() {
  cached = null;
}
