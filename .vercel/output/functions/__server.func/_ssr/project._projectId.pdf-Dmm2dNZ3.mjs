import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as ArrowLeft, _ as Download, n as ZoomOut, o as Share2, p as FolderOpen, t as ZoomIn, v as ChevronRight, y as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$1 } from "./router-CoOhjTaB.mjs";
import { B as useProject, M as saveFile, N as shareFile, S as openBlob, U as userMessage, h as getPhotoBlob, t as Button, z as useObjectUrl } from "./share-BFgpIxcz.mjs";
import { n as getCachedReport, r as setCachedReport, t as generateReport } from "./report-iVMSN5cS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._projectId.pdf-Dmm2dNZ3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PdfPreviewPage() {
	const { projectId } = Route$1.useParams();
	const { bundle, missing } = useProject(projectId);
	const [report, setReport] = (0, import_react.useState)(() => getCachedReport(projectId));
	const [error, setError] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(0);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const preview = report?.previews[page]?.blob ?? null;
	const previewUrl = useObjectUrl(preview);
	(0, import_react.useEffect)(() => {
		if (report || !bundle) return;
		let cancelled = false;
		generateReport(bundle.project, bundle.sections, bundle.photos, getPhotoBlob).then((next) => {
			if (cancelled) return;
			setCachedReport(projectId, next);
			setReport(next);
		}).catch((err) => {
			if (!cancelled) setError(userMessage(err, "Could not generate the PDF."));
		});
		return () => {
			cancelled = true;
		};
	}, [
		bundle,
		projectId,
		report
	]);
	if (missing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Project not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Dashboard"
			})
		})]
	});
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: "PDF preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: report ? `${report.filename} · ${report.pageCount} pages` : "Generating report…"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 items-center justify-center overflow-auto bg-muted/60 px-4 py-6",
				children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-center text-sm text-destructive",
					children: error
				}) : previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: previewUrl,
					alt: report?.previews[page]?.title ?? "PDF page",
					className: "doc-photo max-h-[75vh] rounded-sm bg-card shadow-[var(--shadow-border-hover)] transition-transform duration-150",
					style: {
						transform: `scale(${zoom})`,
						transformOrigin: "center top"
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Preparing pages…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-card px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon-sm",
							disabled: !report || page <= 0,
							onClick: () => setPage((p) => Math.max(0, p - 1)),
							"aria-label": "Previous page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-24 text-center text-sm tabular-nums text-muted-foreground",
							children: report ? `${page + 1} / ${report.pageCount}` : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon-sm",
							disabled: report == null || page >= report.pageCount - 1,
							onClick: () => {
								if (!report) return;
								setPage((p) => Math.min(report.pageCount - 1, p + 1));
							},
							"aria-label": "Next page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon-sm",
							onClick: () => setZoom((z) => Math.max(.6, z - .15)),
							"aria-label": "Zoom out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon-sm",
							onClick: () => setZoom((z) => Math.min(2.2, z + .15)),
							"aria-label": "Zoom in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							disabled: !report,
							onClick: async () => {
								if (!report) return;
								if (await saveFile(report.blob, report.filename, "application/pdf", "pdf") !== "cancelled") toast.success("PDF saved");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Save"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							disabled: !report,
							onClick: () => {
								if (!report) return;
								openBlob(report.blob);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {}), "Open"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							disabled: !report,
							onClick: async () => {
								if (!report) return;
								try {
									if (await shareFile(report.blob, report.filename, bundle?.project.name ?? "Fieldframe report") === "downloaded") toast.success("PDF downloaded — share from your files if needed");
								} catch (err) {
									toast.error(userMessage(err, "Could not share the PDF."));
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), "Share"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PdfPreviewPage as component };
