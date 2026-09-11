import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, FolderOpen, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useObjectUrl, useProject } from "@/lib/hooks";
import { getPhotoBlob } from "@/lib/repository";
import { generateReport, type GeneratedReport } from "@/lib/pdf/report";
import { getCachedReport, setCachedReport } from "@/lib/pdf/cache";
import { openBlob, saveFile, shareFile } from "@/lib/share";
import { userMessage } from "@/lib/utils";

export const Route = createFileRoute("/project/$projectId/pdf")({
  ssr: false,
  component: PdfPreviewPage,
});

function PdfPreviewPage() {
  const { projectId } = Route.useParams();
  const { bundle, missing } = useProject(projectId);
  const [report, setReport] = useState<GeneratedReport | null>(() => getCachedReport(projectId));
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const preview = report?.previews[page]?.blob ?? null;
  const previewUrl = useObjectUrl(preview);

  useEffect(() => {
    if (report || !bundle) return;
    let cancelled = false;
    generateReport(bundle.project, bundle.sections, bundle.photos, getPhotoBlob)
      .then((next) => {
        if (cancelled) return;
        setCachedReport(projectId, next);
        setReport(next);
      })
      .catch((err) => {
        if (!cancelled) setError(userMessage(err, "Could not generate the PDF."));
      });
    return () => {
      cancelled = true;
    };
  }, [bundle, projectId, report]);

  if (missing) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-2xl">Project not found</h1>
        <Button asChild className="mt-6">
          <Link to="/">Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex items-center gap-2 border-b border-border px-3 py-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/project/$projectId" params={{ projectId }} aria-label="Back to project">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">PDF preview</p>
          <p className="truncate text-xs text-muted-foreground">
            {report ? `${report.filename} · ${report.pageCount} pages` : "Generating report…"}
          </p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-muted/60 px-4 py-6">
        {error ? (
          <p className="max-w-md text-center text-sm text-destructive">{error}</p>
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt={report?.previews[page]?.title ?? "PDF page"}
            className="doc-photo max-h-[75vh] rounded-sm bg-card shadow-[var(--shadow-border-hover)] transition-transform duration-150"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Preparing pages…</p>
        )}
      </div>

      <div className="border-t border-border bg-card px-3 py-3">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={!report || page <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          <p className="min-w-24 text-center text-sm tabular-nums text-muted-foreground">
            {report ? `${page + 1} / ${report.pageCount}` : "—"}
          </p>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={report == null || page >= report.pageCount - 1}
            onClick={() => {
              if (!report) return;
              setPage((p) => Math.min(report.pageCount - 1, p + 1));
            }}
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} aria-label="Zoom out">
            <ZoomOut />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))} aria-label="Zoom in">
            <ZoomIn />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!report}
            onClick={async () => {
              if (!report) return;
              const result = await saveFile(report.blob, report.filename, "application/pdf", "pdf");
              if (result !== "cancelled") toast.success("PDF saved");
            }}
          >
            <Download />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!report}
            onClick={() => {
              if (!report) return;
              openBlob(report.blob);
            }}
          >
            <FolderOpen />
            Open
          </Button>
          <Button
            size="sm"
            disabled={!report}
            onClick={async () => {
              if (!report) return;
              try {
                const result = await shareFile(report.blob, report.filename, bundle?.project.name ?? "Fieldframe report");
                if (result === "downloaded") toast.success("PDF downloaded — share from your files if needed");
              } catch (err) {
                toast.error(userMessage(err, "Could not share the PDF."));
              }
            }}
          >
            <Share2 />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
