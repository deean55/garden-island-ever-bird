import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime, d as DialogContent, f as DialogDescription, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as ArrowLeft, b as Check, d as Plus, f as Images, g as Ellipsis, h as FileText, r as X, u as RefreshCcw, v as ChevronRight, x as Camera } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$2 } from "./router-CoOhjTaB.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { B as useProject, M as saveFile, O as renameSection, R as updateProject, U as userMessage, a as addSection, b as numberPhotos, c as cn, d as deleteProject, f as deleteSection, h as getPhotoBlob, i as addPhotos, n as CUSTOM_SECTION_SUGGESTIONS, s as captureVideoFrame, t as Button } from "./share-BFgpIxcz.mjs";
import { a as DialogHeader, c as Textarea, i as DialogFooter, n as DialogContent$1, o as DialogTitle$1, s as Label, t as Dialog$1 } from "./textarea-CpUuzyIN.mjs";
import { a as Portal2, c as SubContent2, i as ItemIndicator2, l as SubTrigger2, n as Content2, o as Root2, r as Item2, s as Separator2, t as CheckboxItem2, u as Trigger } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { i as exportProjectPackage, n as PhotoThumb, r as Switch, t as Input } from "./photodoc-Ci1iliZj.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DyK5KWaF.mjs";
import { r as setCachedReport, t as generateReport } from "./report-iVMSN5cS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._projectId.index-jXC6nfnZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CameraCapture({ onCapture, onClose }) {
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [facing, setFacing] = (0, import_react.useState)("environment");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function start() {
			setError(null);
			try {
				streamRef.current?.getTracks().forEach((t) => t.stop());
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: { ideal: facing },
						width: { ideal: 1920 },
						height: { ideal: 1080 }
					},
					audio: false
				});
				if (cancelled) {
					stream.getTracks().forEach((t) => t.stop());
					return;
				}
				streamRef.current = stream;
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					await videoRef.current.play();
				}
			} catch (err) {
				if (!cancelled) setError(userMessage(err, "The camera could not be opened."));
			}
		}
		if (!navigator.mediaDevices?.getUserMedia) {
			setError("Camera capture is not supported in this browser. Choose a photo from the gallery instead.");
			return;
		}
		start();
		return () => {
			cancelled = true;
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
		};
	}, [facing]);
	async function shoot() {
		const video = videoRef.current;
		if (!video) return;
		setBusy(true);
		try {
			const blob = await captureVideoFrame(video);
			streamRef.current?.getTracks().forEach((t) => t.stop());
			await onCapture(blob);
		} catch (err) {
			setError(userMessage(err, "Could not capture a photograph."));
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-ink text-primary-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide",
					children: "Camera"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					className: "text-primary-foreground hover:bg-white/10",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-0 flex-1 bg-black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					playsInline: true,
					muted: true,
					className: "h-full w-full object-contain"
				}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center bg-ink/80 p-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-sm space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: "Camera unavailable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-primary-foreground/70",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: onClose,
								children: "Close"
							})
						]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-8 px-6 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-primary-foreground hover:bg-white/10",
						onClick: () => setFacing((f) => f === "environment" ? "user" : "environment"),
						disabled: !!error,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void shoot(),
						disabled: busy || !!error,
						className: "flex size-18 items-center justify-center rounded-full border-4 border-primary-foreground/80 bg-primary-foreground text-ink disabled:opacity-50",
						style: {
							width: 72,
							height: 72
						},
						"aria-label": "Capture photograph",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-11" })
				]
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-muted-foreground"
	} },
	defaultVariants: { variant: "secondary" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none focus:bg-muted data-[state=open]:bg-muted", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto size-4" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-36 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-border-hover)]", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-border-hover)]", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, destructive, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", inset && "pl-8", destructive && "text-destructive focus:bg-destructive/10", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ side = "bottom", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex flex-col gap-4 bg-card p-6 text-card-foreground shadow-[var(--shadow-border-hover)] transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out", side === "bottom" && "inset-x-0 bottom-0 rounded-t-xl border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", side === "right" && "inset-y-0 right-0 h-full w-80 border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-sm p-2 text-muted-foreground opacity-70 hover:opacity-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 text-left", className),
		...props
	});
}
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("font-display text-lg font-medium", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function ProjectPage() {
	const { projectId } = Route$2.useParams();
	const navigate = useNavigate();
	const { bundle, missing, error } = useProject(projectId);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [referenceNumber, setReferenceNumber] = (0, import_react.useState)("");
	const [beforeAfter, setBeforeAfter] = (0, import_react.useState)(false);
	const hydrated = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!bundle) return;
		setName(bundle.project.name);
		setDescription(bundle.project.description);
		setDate(bundle.project.date);
		setReferenceNumber(bundle.project.referenceNumber);
		setBeforeAfter(bundle.project.beforeAfterEnabled);
		hydrated.current = true;
	}, [bundle?.project.id]);
	(0, import_react.useEffect)(() => {
		if (!hydrated.current || !bundle) return;
		const handle = window.setTimeout(() => {
			updateProject(projectId, {
				name,
				description,
				date,
				referenceNumber
			}).catch((err) => toast.error(userMessage(err, "Could not save project details.")));
		}, 500);
		return () => window.clearTimeout(handle);
	}, [
		name,
		description,
		date,
		referenceNumber,
		projectId,
		bundle
	]);
	const [cameraFor, setCameraFor] = (0, import_react.useState)(null);
	const [addFor, setAddFor] = (0, import_react.useState)(null);
	const [sectionNameOpen, setSectionNameOpen] = (0, import_react.useState)(false);
	const [newSectionName, setNewSectionName] = (0, import_react.useState)("");
	const [renameTarget, setRenameTarget] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [deleteProjectOpen, setDeleteProjectOpen] = (0, import_react.useState)(false);
	const [pdfBusy, setPdfBusy] = (0, import_react.useState)(false);
	const numbered = (0, import_react.useMemo)(() => bundle ? numberPhotos(bundle.sections, bundle.photos) : [], [bundle]);
	const numberById = (0, import_react.useMemo)(() => new Map(numbered.map((n) => [n.photo.id, n.number])), [numbered]);
	if (missing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Project not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "It may have been deleted from this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Back to dashboard"
				})
			})
		]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-6 py-16 text-center text-sm text-destructive",
		children: error
	});
	if (!bundle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-muted" })
	});
	const current = bundle;
	async function importInto(sectionId, phase, files, names) {
		if (!files.length) return;
		try {
			await addPhotos({
				projectId,
				sectionId,
				files,
				phase,
				names
			});
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
			navigate({
				to: "/project/$projectId/pdf",
				params: { projectId }
			});
		} catch (err) {
			toast.error(userMessage(err, "Could not generate the PDF."));
		} finally {
			setPdfBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-dvh max-w-4xl px-4 pb-24 pt-4 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 -mx-4 mb-6 flex items-center gap-2 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "Back to dashboard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-lg font-medium leading-tight",
							children: name || "Untitled"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								numbered.length,
								" photograph",
								numbered.length === 1 ? "" : "s",
								referenceNumber ? ` · ${referenceNumber}` : ""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => void handlePdf(),
						disabled: pdfBusy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), pdfBusy ? "Preparing" : "PDF"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Project actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => {
									(async () => {
										try {
											const pack = await exportProjectPackage(bundle);
											if (await saveFile(pack.blob, pack.filename, "application/zip", "photodoc") !== "cancelled") toast.success("Project exported");
										} catch (err) {
											toast.error(userMessage(err, "Could not export this project."));
										}
									})();
								},
								children: "Export package"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								destructive: true,
								onSelect: () => setDeleteProjectOpen(true),
								children: "Delete project"
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Project name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ref",
								children: "Reference / ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ref",
								value: referenceNumber,
								onChange: (e) => setReferenceNumber(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "date",
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "desc",
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "Before & after"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "Split photographs into two sets in the PDF"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: beforeAfter,
							onCheckedChange: (checked) => {
								setBeforeAfter(checked);
								updateProject(projectId, { beforeAfterEnabled: checked });
							}
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium",
					children: "Sections"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Standard angles plus any custom groups you add."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => setSectionNameOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Section"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4",
				children: bundle.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
					section,
					photos: bundle.photos.filter((p) => p.sectionId === section.id),
					beforeAfter,
					numberById,
					onAdd: (phase) => setAddFor({
						sectionId: section.id,
						phase
					}),
					onRename: () => {
						setRenameTarget(section);
						setNewSectionName(section.name);
					},
					onDelete: () => setDeleteTarget(section),
					onOpenPhoto: (photoId) => void navigate({
						to: "/project/$projectId/photo/$photoId",
						params: {
							projectId,
							photoId
						}
					})
				}, section.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!addFor,
				onOpenChange: (open) => !open && setAddFor(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Add photograph" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-12 justify-start",
						onClick: () => {
							if (!addFor) return;
							setCameraFor(addFor);
							setAddFor(null);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}), "Capture photo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex h-12 cursor-pointer items-center justify-start gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium hover:bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-4" }),
							"Choose from gallery",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/jpeg,image/png,image/heic,image/heif,image/webp",
								multiple: true,
								className: "sr-only",
								onChange: async (event) => {
									if (!addFor) return;
									const files = Array.from(event.target.files ?? []);
									event.target.value = "";
									if (!files.length) return;
									await importInto(addFor.sectionId, addFor.phase, files);
									setAddFor(null);
								}
							})
						]
					})]
				})] })
			}),
			cameraFor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraCapture, {
				onClose: () => setCameraFor(null),
				onCapture: async (blob) => {
					const target = cameraFor;
					setCameraFor(null);
					await importInto(target.sectionId, target.phase, [blob], [`capture-${Date.now()}.jpg`]);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: sectionNameOpen,
				onOpenChange: setSectionNameOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: "Custom section" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: newSectionName,
						onChange: (e) => setNewSectionName(e.target.value),
						placeholder: "Interior"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: CUSTOM_SECTION_SUGGESTIONS.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground",
							onClick: () => setNewSectionName(suggestion),
							children: suggestion
						}, suggestion))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setSectionNameOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: async () => {
							try {
								await addSection(projectId, newSectionName || "Custom");
								setNewSectionName("");
								setSectionNameOpen(false);
							} catch (err) {
								toast.error(userMessage(err, "Could not add the section."));
							}
						},
						children: "Add section"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!renameTarget,
				onOpenChange: (open) => !open && setRenameTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: "Rename section" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: newSectionName,
						onChange: (e) => setNewSectionName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setRenameTarget(null),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: async () => {
							if (!renameTarget) return;
							await renameSection(renameTarget.id, newSectionName);
							setRenameTarget(null);
						},
						children: "Save"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleteTarget,
				onOpenChange: (open) => !open && setDeleteTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this section?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: deleteTarget && !deleteTarget.isCustom ? "This is a standard angle. Photographs in this section will also be deleted." : "Photographs in this section will also be deleted. This cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: async () => {
						if (!deleteTarget) return;
						await deleteSection(deleteTarget.id);
						setDeleteTarget(null);
					},
					children: "Delete"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: deleteProjectOpen,
				onOpenChange: setDeleteProjectOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this project?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "All photographs, sections, and descriptions will be removed from this device." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: async () => {
						await deleteProject(projectId);
						toast.success("Project deleted");
						navigate({ to: "/" });
					},
					children: "Delete project"
				})] })] })
			})
		]
	});
}
function SectionBlock({ section, photos, beforeAfter, numberById, onAdd, onRename, onDelete, onOpenPhoto }) {
	const groups = beforeAfter ? [{
		label: "Before",
		phase: "before",
		items: photos.filter((p) => p.phase !== "after")
	}, {
		label: "After",
		phase: "after",
		items: photos.filter((p) => p.phase === "after")
	}] : [{
		label: "",
		phase: "standard",
		items: photos
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-medium",
						children: section.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: photos.length
							}),
							" photograph",
							photos.length === 1 ? "" : "s",
							section.isCustom ? " · Custom" : ""
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": `${section.name} actions`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onSelect: onRename,
						children: "Rename"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						destructive: true,
						onSelect: onDelete,
						children: "Delete section"
					})]
				})] }),
				!beforeAfter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => onAdd("standard"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Add"]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-5",
			children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [group.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => onAdd(group.phase),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Add"]
				})]
			}) : null, group.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onAdd(group.phase),
				className: "flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground",
				children: "Add a photograph"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: group.items.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpenPhoto(photo.id),
					className: "group block w-full overflow-hidden rounded-lg bg-muted text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoThumb, {
							photoId: photo.id,
							alt: section.name,
							rotation: photo.rotation
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2 px-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium tabular-nums text-muted-foreground",
							children: ["Photo ", String(numberById.get(photo.id) ?? 0).padStart(2, "0")]
						}), photo.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-1 text-xs text-foreground",
							children: photo.description
						}) : null]
					})]
				}) }, photo.id))
			})] }, group.phase))
		})]
	});
}
//#endregion
export { ProjectPage as component };
