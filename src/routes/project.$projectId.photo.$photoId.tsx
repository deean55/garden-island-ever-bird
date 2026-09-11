import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, RotateCw, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useObjectUrl, useProject } from "@/lib/hooks";
import {
  deletePhoto,
  getPhotoBlob,
  movePhoto,
  numberPhotos,
  replacePhoto,
  rotatePhoto,
  shiftPhoto,
  updatePhoto,
} from "@/lib/repository";
import { pickImageFiles } from "@/lib/share";
import { padPhotoNumber, userMessage } from "@/lib/utils";

export const Route = createFileRoute("/project/$projectId/photo/$photoId")({
  ssr: false,
  component: PhotoEditorPage,
});

function PhotoEditorPage() {
  const { projectId, photoId } = Route.useParams();
  const navigate = useNavigate();
  const { bundle, missing } = useProject(projectId);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [zoom, setZoom] = useState(1);
  const [description, setDescription] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const hydrated = useRef<string | null>(null);

  const photo = bundle?.photos.find((p) => p.id === photoId);
  const numbered = useMemo(
    () => (bundle ? numberPhotos(bundle.sections, bundle.photos) : []),
    [bundle],
  );
  const number = numbered.find((n) => n.photo.id === photoId)?.number ?? 0;
  const section = bundle?.sections.find((s) => s.id === photo?.sectionId);
  const url = useObjectUrl(blob);

  useEffect(() => {
    let cancelled = false;
    getPhotoBlob(photoId).then((next) => {
      if (!cancelled) setBlob(next ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [photoId, photo?.updatedAt]);

  useEffect(() => {
    if (!photo) return;
    if (hydrated.current === photo.id) return;
    hydrated.current = photo.id;
    setDescription(photo.description);
    setZoom(1);
  }, [photo]);

  useEffect(() => {
    if (!photo || hydrated.current !== photo.id) return;
    const handle = window.setTimeout(() => {
      if (description === photo.description) return;
      void updatePhoto(photo.id, { description }).catch((err) =>
        toast.error(userMessage(err, "Could not save the description.")),
      );
    }, 450);
    return () => window.clearTimeout(handle);
  }, [description, photo]);

  if (missing || (bundle && !photo)) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-2xl">Photograph not found</h1>
        <Button asChild className="mt-6">
          <Link to="/project/$projectId" params={{ projectId }}>
            Back to project
          </Link>
        </Button>
      </div>
    );
  }

  if (!photo || !bundle) {
    return <div className="h-dvh animate-pulse bg-muted" />;
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
          <p className="truncate font-medium">
            Photo {padPhotoNumber(number)} — {section?.name ?? "Section"}
          </p>
          <p className="text-xs text-muted-foreground">{photo.originalName}</p>
        </div>
      </header>

      <div className="relative flex min-h-[48vh] flex-1 items-center justify-center overflow-hidden bg-ink">
        {url ? (
          <img
            src={url}
            alt={photo.description || section?.name || "Photograph"}
            className="max-h-[72vh] w-full max-w-5xl object-contain transition-transform duration-150"
            style={{ transform: `rotate(${photo.rotation}deg) scale(${zoom})` }}
          />
        ) : (
          <p className="text-sm text-primary-foreground/70">Loading photograph…</p>
        )}
      </div>

      <div className="border-t border-border bg-card px-4 py-4">
        <div className="mx-auto grid max-w-3xl gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => void rotatePhoto(photo.id, -90)}>
              <RotateCcw />
              Rotate
            </Button>
            <Button variant="outline" size="sm" onClick={() => void rotatePhoto(photo.id, 90)}>
              <RotateCw />
              Rotate
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.max(1, z - 0.25))} aria-label="Zoom out">
              <ZoomOut />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.min(4, z + 0.25))} aria-label="Zoom in">
              <ZoomIn />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const files = await pickImageFiles(false);
                const file = files[0];
                if (!file) return;
                try {
                  await replacePhoto(photo.id, file, file.name);
                  toast.success("Photograph replaced");
                } catch (err) {
                  toast.error(userMessage(err, "Could not replace this photograph."));
                }
              }}
            >
              Replace
            </Button>
            <Button variant="outline" size="sm" onClick={() => setMoveOpen(true)}>
              Move
            </Button>
            <Button variant="outline" size="sm" onClick={() => void shiftPhoto(photo.id, -1)}>
              Earlier
            </Button>
            <Button variant="outline" size="sm" onClick={() => void shiftPhoto(photo.id, 1)}>
              Later
            </Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeleteOpen(true)}>
              <Trash2 />
              Delete
            </Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="photo-desc">Description</Label>
            <Textarea
              id="photo-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Describe the ${section?.name?.toLowerCase() ?? "subject"} — finishes, damage, identifying details.`}
            />
            <p className="text-xs text-muted-foreground">Saves automatically.</p>
          </div>
        </div>
      </div>

      <Dialog open={moveOpen} onOpenChange={setMoveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move to section</DialogTitle>
          </DialogHeader>
          <div className="grid max-h-72 gap-1 overflow-y-auto">
            {bundle.sections.map((item) => (
              <Button
                key={item.id}
                variant={item.id === photo.sectionId ? "secondary" : "ghost"}
                className="justify-start"
                onClick={async () => {
                  await movePhoto(photo.id, item.id);
                  setMoveOpen(false);
                  toast.success(`Moved to ${item.name}`);
                }}
              >
                {item.name}
              </Button>
            ))}
          </div>
          {bundle.project.beforeAfterEnabled ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={async () => {
                  await updatePhoto(photo.id, { phase: "before" });
                  toast.success("Moved to Before");
                }}
              >
                Before
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await updatePhoto(photo.id, { phase: "after" });
                  toast.success("Moved to After");
                }}
              >
                After
              </Button>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this photograph?</AlertDialogTitle>
            <AlertDialogDescription>
              The image and its description will be removed from this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                await deletePhoto(photo.id);
                toast.success("Photograph deleted");
                void navigate({ to: "/project/$projectId", params: { projectId } });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
