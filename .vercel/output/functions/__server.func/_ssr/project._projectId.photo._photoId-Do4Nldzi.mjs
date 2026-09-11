import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as ArrowLeft, a as Trash2, c as RotateCw, l as RotateCcw, n as ZoomOut, t as ZoomIn } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-CoOhjTaB.mjs";
import { A as rotatePhoto, B as useProject, C as padPhotoNumber, L as updatePhoto, P as shiftPhoto, U as userMessage, _ as movePhoto, b as numberPhotos, h as getPhotoBlob, k as replacePhoto, t as Button, u as deletePhoto, w as pickImageFiles, z as useObjectUrl } from "./share-BFgpIxcz.mjs";
import { a as DialogHeader, c as Textarea, i as DialogFooter, n as DialogContent, o as DialogTitle, s as Label, t as Dialog } from "./textarea-CpUuzyIN.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DyK5KWaF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._projectId.photo._photoId-Do4Nldzi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PhotoEditorPage() {
	const { projectId, photoId } = Route.useParams();
	const navigate = useNavigate();
	const { bundle, missing } = useProject(projectId);
	const [blob, setBlob] = (0, import_react.useState)(null);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [description, setDescription] = (0, import_react.useState)("");
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [moveOpen, setMoveOpen] = (0, import_react.useState)(false);
	const hydrated = (0, import_react.useRef)(null);
	const photo = bundle?.photos.find((p) => p.id === photoId);
	const number = (0, import_react.useMemo)(() => bundle ? numberPhotos(bundle.sections, bundle.photos) : [], [bundle]).find((n) => n.photo.id === photoId)?.number ?? 0;
	const section = bundle?.sections.find((s) => s.id === photo?.sectionId);
	const url = useObjectUrl(blob);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getPhotoBlob(photoId).then((next) => {
			if (!cancelled) setBlob(next ?? null);
		});
		return () => {
			cancelled = true;
		};
	}, [photoId, photo?.updatedAt]);
	(0, import_react.useEffect)(() => {
		if (!photo) return;
		if (hydrated.current === photo.id) return;
		hydrated.current = photo.id;
		setDescription(photo.description);
		setZoom(1);
	}, [photo]);
	(0, import_react.useEffect)(() => {
		if (!photo || hydrated.current !== photo.id) return;
		const handle = window.setTimeout(() => {
			if (description === photo.description) return;
			updatePhoto(photo.id, { description }).catch((err) => toast.error(userMessage(err, "Could not save the description.")));
		}, 450);
		return () => window.clearTimeout(handle);
	}, [description, photo]);
	if (missing || bundle && !photo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Photograph not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/project/$projectId",
				params: { projectId },
				children: "Back to project"
			})
		})]
	});
	if (!photo || !bundle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-dvh animate-pulse bg-muted" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 border-b border-border px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/project/$projectId",
						params: { projectId },
						"aria-label": "Back to project",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate font-medium",
						children: [
							"Photo ",
							padPhotoNumber(number),
							" — ",
							section?.name ?? "Section"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: photo.originalName
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-[48vh] flex-1 items-center justify-center overflow-hidden bg-ink",
				children: url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: photo.description || section?.name || "Photograph",
					className: "max-h-[72vh] w-full max-w-5xl object-contain transition-transform duration-150",
					style: { transform: `rotate(${photo.rotation}deg) scale(${zoom})` }
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-primary-foreground/70",
					children: "Loading photograph…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-card px-4 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-3xl gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => void rotatePhoto(photo.id, -90),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Rotate"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => void rotatePhoto(photo.id, 90),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, {}), "Rotate"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setZoom((z) => Math.max(1, z - .25)),
								"aria-label": "Zoom out",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setZoom((z) => Math.min(4, z + .25)),
								"aria-label": "Zoom in",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: async () => {
									const file = (await pickImageFiles(false))[0];
									if (!file) return;
									try {
										await replacePhoto(photo.id, file, file.name);
										toast.success("Photograph replaced");
									} catch (err) {
										toast.error(userMessage(err, "Could not replace this photograph."));
									}
								},
								children: "Replace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setMoveOpen(true),
								children: "Move"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => void shiftPhoto(photo.id, -1),
								children: "Earlier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => void shiftPhoto(photo.id, 1),
								children: "Later"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-destructive",
								onClick: () => setDeleteOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Delete"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "photo-desc",
								children: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "photo-desc",
								value: description,
								onChange: (e) => setDescription(e.target.value),
								placeholder: `Describe the ${section?.name?.toLowerCase() ?? "subject"} — finishes, damage, identifying details.`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Saves automatically."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: moveOpen,
				onOpenChange: setMoveOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Move to section" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid max-h-72 gap-1 overflow-y-auto",
						children: bundle.sections.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: item.id === photo.sectionId ? "secondary" : "ghost",
							className: "justify-start",
							onClick: async () => {
								await movePhoto(photo.id, item.id);
								setMoveOpen(false);
								toast.success(`Moved to ${item.name}`);
							},
							children: item.name
						}, item.id))
					}),
					bundle.project.beforeAfterEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: async () => {
								await updatePhoto(photo.id, { phase: "before" });
								toast.success("Moved to Before");
							},
							children: "Before"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: async () => {
								await updatePhoto(photo.id, { phase: "after" });
								toast.success("Moved to After");
							},
							children: "After"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setMoveOpen(false),
						children: "Close"
					}) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this photograph?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "The image and its description will be removed from this project." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: async () => {
						await deletePhoto(photo.id);
						toast.success("Photograph deleted");
						navigate({
							to: "/project/$projectId",
							params: { projectId }
						});
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
//#endregion
export { PhotoEditorPage as component };
