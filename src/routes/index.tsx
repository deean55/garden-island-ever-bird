import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, FileUp, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PhotoThumb } from "@/components/photo-thumb";
import { importProjectPackage } from "@/lib/export/photodoc";
import { useProjectList } from "@/lib/hooks";
import { createProject, notifyRepo } from "@/lib/repository";
import { pickPackageFile } from "@/lib/share";
import { formatDate, formatDateTime, todayIsoDate, userMessage } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data, error } = useProjectList(query);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-forest">FIELDFRAME</p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Photo records
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Inspection, property, vehicle, and site documentation — stored only on this device.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              const file = await pickPackageFile();
              if (!file) return;
              setBusy(true);
              try {
                const project = await importProjectPackage(file);
                notifyRepo();
                toast.success("Project imported");
                void navigate({ to: "/project/$projectId", params: { projectId: project.id } });
              } catch (err) {
                toast.error(userMessage(err, "Could not import this package."));
              } finally {
                setBusy(false);
              }
            }}
            disabled={busy}
          >
            <FileUp />
            Import
          </Button>
          <Button onClick={() => setCreating(true)}>
            <Plus />
            New project
          </Button>
        </div>
      </header>

      <div className="relative mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, references, descriptions"
          className="pl-9"
          aria-label="Search projects"
        />
      </div>

      {error ? (
        <p className="mt-8 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {data && data.length === 0 && !query ? (
        <EmptyState onCreate={() => setCreating(true)} />
      ) : data && data.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">No projects match “{query}”.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(data ?? Array.from({ length: 6 })).map((project, index) =>
            project && "id" in project ? (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() =>
                    void navigate({ to: "/project/$projectId", params: { projectId: project.id } })
                  }
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-card text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]"
                >
                  <div className="relative aspect-[16/10] bg-muted">
                    {project.coverPhotoId ? (
                      <PhotoThumb photoId={project.coverPhotoId} alt="" className="h-full w-full" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Camera className="size-8 opacity-40" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h2 className="font-display text-lg font-medium leading-snug">{project.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(project.date)}
                      {project.referenceNumber ? ` · ${project.referenceNumber}` : ""}
                    </p>
                    <p className="mt-auto pt-2 text-xs text-muted-foreground">
                      <span className="tabular-nums">{project.photoCount}</span> photograph
                      {project.photoCount === 1 ? "" : "s"} · Updated {formatDateTime(project.updatedAt)}
                    </p>
                  </div>
                </button>
              </li>
            ) : (
              <li key={index} className="h-64 animate-pulse rounded-xl bg-muted" />
            ),
          )}
        </ul>
      )}

      <NewProjectDialog
        open={creating}
        onOpenChange={setCreating}
        onCreated={(id) => void navigate({ to: "/project/$projectId", params: { projectId: id } })}
      />
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mt-16 rounded-xl bg-card px-6 py-14 text-center shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium tracking-[0.18em] text-forest">START A RECORD</p>
      <h2 className="mt-3 font-display text-3xl font-medium">No projects yet</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Create a project to capture twelve standard angles, add custom sections, and generate a professional PDF report.
      </p>
      <Button className="mt-6" onClick={onCreate}>
        <Plus />
        New project
      </Button>
    </div>
  );
}

function NewProjectDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayIsoDate());
  const [referenceNumber, setReferenceNumber] = useState("");
  const [beforeAfter, setBeforeAfter] = useState(false);
  const [saving, setSaving] = useState(false);

  const ready = useMemo(() => name.trim().length > 0, [name]);

  async function submit() {
    if (!ready) return;
    setSaving(true);
    try {
      const project = await createProject({
        name,
        description,
        date,
        referenceNumber,
        beforeAfterEnabled: beforeAfter,
      });
      toast.success("Project created");
      onOpenChange(false);
      setName("");
      setDescription("");
      setDate(todayIsoDate());
      setReferenceNumber("");
      setBeforeAfter(false);
      onCreated(project.id);
    } catch (err) {
      toast.error(userMessage(err, "Could not create the project."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Twelve standard angles are added automatically. Everything stays on this device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="North elevation survey" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-ref">Reference / ID</Label>
            <Input id="project-ref" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} placeholder="INV-2041" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-date">Date</Label>
            <Input id="project-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-desc">Description</Label>
            <Textarea
              id="project-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Site, vehicle, or inspection notes"
            />
          </div>
          <label className="flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-3">
            <span>
              <span className="block text-sm font-medium">Before & after</span>
              <span className="text-xs text-muted-foreground">Separate photographs into two sets in the report</span>
            </span>
            <Switch checked={beforeAfter} onCheckedChange={setBeforeAfter} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={!ready || saving}>
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
