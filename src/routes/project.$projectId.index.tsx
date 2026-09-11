import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Camera, FileText, Images, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { CameraCapture } from "@/components/camera-capture";
import { PhotoThumb } from "@/components/photo-thumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { exportProjectPackage } from "@/lib/export/photodoc";
import { useProject } from "@/lib/hooks";
import type { Photo, PhotoPhase, Section } from "@/lib/models";
import { CUSTOM_SECTION_SUGGESTIONS } from "@/lib/models";
import { setCachedReport } from "@/lib/pdf/cache";
import { generateReport } from "@/lib/pdf/report";
import {
  addPhotos,
  addSection,
  deleteProject,
  deleteSection,
  getPhotoBlob,
  numberPhotos,
  renameSection,
  updateProject,
} from "@/lib/repository";
import { saveFile } from "@/lib/share";
import { userMessage } from "@/lib/utils";

export const Route = createFileRoute("/project/$projectId/")({
  ssr: false,
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const { bundle, missing, error } = useProject(projectId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [beforeAfter, setBeforeAfter] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    if (!bundle) return;
    setName(bundle.project.name);
    setDescription(bundle.project.description);
    setDate(bundle.project.date);
    setReferenceNumber(bundle.project.referenceNumber);
    setBeforeAfter(bundle.project.beforeAfterEnabled);
    hydrated.current = true;
  }, [bundle?.project.id]);

  useEffect(() => {
    if (!hydrated.current || !bundle) return;
    const handle = window.setTimeout(() => {
      void updateProject(projectId, { name, description, date, referenceNumber }).catch((err) =>
        toast.error(userMessage(err, "Could not save project details.")),
      );
    }, 500);
    return () => window.clearTimeout(handle);
  }, [name, description, date, referenceNumber, projectId, bundle]);

  const [cameraFor, setCameraFor] = useState<{ sectionId: string; phase: PhotoPhase } | null>(null);
  const [addFor, setAddFor] = useState<{ sectionId: string; phase: PhotoPhase } | null>(null);
  const [sectionNameOpen, setSectionNameOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [renameTarget, setRenameTarget] = useState<Section | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Section | null>(null);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  const numbered = useMemo(
    () => (bundle ? numberPhotos(bundle.sections, bundle.photos) : []),
    [bundle],
  );
  const numberById = useMemo(() => new Map(numbered.map((n) => [n.photo.id, n.number])), [numbered]);

  if (missing) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-2xl">Project not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">It may have been deleted from this device.</p>
        <Button asChild className="mt-6">
          <Link to="/">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center text-sm text-destructive">{error}</div>
    );
  }

  if (!bundle) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  const current = bundle;

  async function importInto(sectionId: string, phase: PhotoPhase, files: File[] | Blob[], names?: string[]) {
    if (!files.length) return;
    try {
      await addPhotos({ projectId, sectionId, files, phase, names });
      toast.success(files.length === 1 ? "Photograph added" : `${files.length} photographs added`);
    } catch (err) {
      toast.error(userMessage(err, "Could not add the photograph."));
    }
  }

  async function handlePdf() {
    setPdfBusy(true);
    try {
      const report = await generateReport(current.project, current.sections, current.photos, getPhotoBlob);
      setCachedReport(projectId, report);
      void navigate({ to: "/project/$projectId/pdf", params: { projectId } });
    } catch (err) {
      toast.error(userMessage(err, "Could not generate the PDF."));
    } finally {
      setPdfBusy(false);
    }
  }

  return (
    <div className="mx-auto min-h-dvh max-w-4xl px-4 pb-24 pt-4 sm:px-6">
      <header className="sticky top-0 z-20 -mx-4 mb-6 flex items-center gap-2 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/" aria-label="Back to dashboard">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-medium leading-tight">{name || "Untitled"}</p>
          <p className="truncate text-xs text-muted-foreground">
            {numbered.length} photograph{numbered.length === 1 ? "" : "s"}
            {referenceNumber ? ` · ${referenceNumber}` : ""}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => void handlePdf()} disabled={pdfBusy}>
          <FileText />
          {pdfBusy ? "Preparing" : "PDF"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Project actions">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => {
                void (async () => {
                  try {
                    const pack = await exportProjectPackage(bundle);
                    const result = await saveFile(pack.blob, pack.filename, "application/zip", "photodoc");
                    if (result !== "cancelled") toast.success("Project exported");
                  } catch (err) {
                    toast.error(userMessage(err, "Could not export this project."));
                  }
                })();
              }}
            >
              Export package
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive onSelect={() => setDeleteProjectOpen(true)}>
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <section className="grid gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="grid gap-2">
          <Label htmlFor="name">Project name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="ref">Reference / ID</Label>
            <Input id="ref" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <label className="flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-3">
          <span>
            <span className="block text-sm font-medium">Before & after</span>
            <span className="text-sm text-muted-foreground">Split photographs into two sets in the PDF</span>
          </span>
          <Switch
            checked={beforeAfter}
            onCheckedChange={(checked) => {
              setBeforeAfter(checked);
              void updateProject(projectId, { beforeAfterEnabled: checked });
            }}
          />
        </label>
      </section>

      <div className="mt-8 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-medium">Sections</h2>
          <p className="text-sm text-muted-foreground">Standard angles plus any custom groups you add.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setSectionNameOpen(true)}>
          <Plus />
          Section
        </Button>
      </div>

      <div className="mt-4 grid gap-4">
        {bundle.sections.map((section) => (
          <SectionBlock
            key={section.id}
            section={section}
            photos={bundle.photos.filter((p) => p.sectionId === section.id)}
            beforeAfter={beforeAfter}
            numberById={numberById}
            onAdd={(phase) => setAddFor({ sectionId: section.id, phase })}
            onRename={() => {
              setRenameTarget(section);
              setNewSectionName(section.name);
            }}
            onDelete={() => setDeleteTarget(section)}
            onOpenPhoto={(photoId) =>
              void navigate({
                to: "/project/$projectId/photo/$photoId",
                params: { projectId, photoId },
              })
            }
          />
        ))}
      </div>

      <Sheet open={!!addFor} onOpenChange={(open) => !open && setAddFor(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add photograph</SheetTitle>
          </SheetHeader>
          <div className="mt-4 grid gap-2">
            <Button
              variant="outline"
              className="h-12 justify-start"
              onClick={() => {
                if (!addFor) return;
                setCameraFor(addFor);
                setAddFor(null);
              }}
            >
              <Camera />
              Capture photo
            </Button>
            <label className="inline-flex h-12 cursor-pointer items-center justify-start gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium hover:bg-muted">
              <Images className="size-4" />
              Choose from gallery
              <input
                type="file"
                accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
                multiple
                className="sr-only"
                onChange={async (event) => {
                  if (!addFor) return;
                  const files = Array.from(event.target.files ?? []);
                  event.target.value = "";
                  if (!files.length) return;
                  await importInto(addFor.sectionId, addFor.phase, files);
                  setAddFor(null);
                }}
              />
            </label>
          </div>
        </SheetContent>
      </Sheet>

      {cameraFor ? (
        <CameraCapture
          onClose={() => setCameraFor(null)}
          onCapture={async (blob) => {
            const target = cameraFor;
            setCameraFor(null);
            await importInto(target.sectionId, target.phase, [blob], [`capture-${Date.now()}.jpg`]);
          }}
        />
      ) : null}

      <Dialog open={sectionNameOpen} onOpenChange={setSectionNameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom section</DialogTitle>
          </DialogHeader>
          <Input value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} placeholder="Interior" />
          <div className="flex flex-wrap gap-2">
            {CUSTOM_SECTION_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                onClick={() => setNewSectionName(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSectionNameOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                try {
                  await addSection(projectId, newSectionName || "Custom");
                  setNewSectionName("");
                  setSectionNameOpen(false);
                } catch (err) {
                  toast.error(userMessage(err, "Could not add the section."));
                }
              }}
            >
              Add section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!renameTarget} onOpenChange={(open) => !open && setRenameTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename section</DialogTitle>
          </DialogHeader>
          <Input value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!renameTarget) return;
                await renameSection(renameTarget.id, newSectionName);
                setRenameTarget(null);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this section?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && !deleteTarget.isCustom
                ? "This is a standard angle. Photographs in this section will also be deleted."
                : "Photographs in this section will also be deleted. This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                if (!deleteTarget) return;
                await deleteSection(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteProjectOpen} onOpenChange={setDeleteProjectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              All photographs, sections, and descriptions will be removed from this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                await deleteProject(projectId);
                toast.success("Project deleted");
                void navigate({ to: "/" });
              }}
            >
              Delete project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SectionBlock({
  section,
  photos,
  beforeAfter,
  numberById,
  onAdd,
  onRename,
  onDelete,
  onOpenPhoto,
}: {
  section: Section;
  photos: Photo[];
  beforeAfter: boolean;
  numberById: Map<string, number>;
  onAdd: (phase: PhotoPhase) => void;
  onRename: () => void;
  onDelete: () => void;
  onOpenPhoto: (id: string) => void;
}) {
  const groups: { label: string; phase: PhotoPhase; items: Photo[] }[] = beforeAfter
    ? [
        { label: "Before", phase: "before", items: photos.filter((p) => p.phase !== "after") },
        { label: "After", phase: "after", items: photos.filter((p) => p.phase === "after") },
      ]
    : [{ label: "", phase: "standard", items: photos }];

  return (
    <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-medium">{section.name}</h3>
          <p className="text-xs text-muted-foreground">
            <span className="tabular-nums">{photos.length}</span> photograph{photos.length === 1 ? "" : "s"}
            {section.isCustom ? " · Custom" : ""}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`${section.name} actions`}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onRename}>Rename</DropdownMenuItem>
            <DropdownMenuItem destructive onSelect={onDelete}>
              Delete section
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {!beforeAfter ? (
          <Button size="sm" onClick={() => onAdd("standard")}>
            <Plus />
            Add
          </Button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-5">
        {groups.map((group) => (
          <div key={group.phase}>
            {group.label ? (
              <div className="mb-2 flex items-center justify-between">
                <Badge variant="outline">{group.label}</Badge>
                <Button size="sm" variant="outline" onClick={() => onAdd(group.phase)}>
                  <Plus />
                  Add
                </Button>
              </div>
            ) : null}
            {group.items.length === 0 ? (
              <button
                type="button"
                onClick={() => onAdd(group.phase)}
                className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground"
              >
                Add a photograph
              </button>
            ) : (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.items.map((photo) => (
                  <li key={photo.id}>
                    <button
                      type="button"
                      onClick={() => onOpenPhoto(photo.id)}
                      className="group block w-full overflow-hidden rounded-lg bg-muted text-left"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <PhotoThumb photoId={photo.id} alt={section.name} rotation={photo.rotation} />
                      </div>
                      <div className="flex items-start justify-between gap-2 px-2 py-2">
                        <p className="text-xs font-medium tabular-nums text-muted-foreground">
                          Photo {String(numberById.get(photo.id) ?? 0).padStart(2, "0")}
                        </p>
                        {photo.description ? (
                          <p className="line-clamp-1 text-xs text-foreground">{photo.description}</p>
                        ) : null}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
