import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Plus, m as FileUp, s as Search, x as Camera } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as todayIsoDate, T as pickPackageFile, U as userMessage, V as useProjectList, l as createProject, m as formatDateTime, p as formatDate, t as Button, y as notifyRepo } from "./share-BFgpIxcz.mjs";
import { a as DialogHeader, c as Textarea, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Label, t as Dialog } from "./textarea-CpUuzyIN.mjs";
import { a as importProjectPackage, n as PhotoThumb, r as Switch, t as Input } from "./photodoc-Ci1iliZj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1KiHRFr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const { data, error } = useProjectList(query);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-dvh max-w-6xl px-4 pb-16 pt-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-forest",
						children: "FIELDFRAME"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl",
						children: "Photo records"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm text-muted-foreground",
						children: "Inspection, property, vehicle, and site documentation — stored only on this device."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: async () => {
							const file = await pickPackageFile();
							if (!file) return;
							setBusy(true);
							try {
								const project = await importProjectPackage(file);
								notifyRepo();
								toast.success("Project imported");
								navigate({
									to: "/project/$projectId",
									params: { projectId: project.id }
								});
							} catch (err) {
								toast.error(userMessage(err, "Could not import this package."));
							} finally {
								setBusy(false);
							}
						},
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {}), "Import"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setCreating(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "New project"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search projects, references, descriptions",
					className: "pl-9",
					"aria-label": "Search projects"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive",
				children: error
			}) : null,
			data && data.length === 0 && !query ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { onCreate: () => setCreating(true) }) : data && data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-16 text-sm text-muted-foreground",
				children: [
					"No projects match “",
					query,
					"”."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: (data ?? Array.from({ length: 6 })).map((project, index) => project && "id" in project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void navigate({
						to: "/project/$projectId",
						params: { projectId: project.id }
					}),
					className: "group flex h-full w-full flex-col overflow-hidden rounded-xl bg-card text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[16/10] bg-muted",
						children: project.coverPhotoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoThumb, {
							photoId: project.coverPhotoId,
							alt: "",
							className: "h-full w-full"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-8 opacity-40" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-2 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-medium leading-snug",
								children: project.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [formatDate(project.date), project.referenceNumber ? ` · ${project.referenceNumber}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-auto pt-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: project.photoCount
									}),
									" photograph",
									project.photoCount === 1 ? "" : "s",
									" · Updated ",
									formatDateTime(project.updatedAt)
								]
							})
						]
					})]
				}) }, project.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "h-64 animate-pulse rounded-xl bg-muted" }, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewProjectDialog, {
				open: creating,
				onOpenChange: setCreating,
				onCreated: (id) => void navigate({
					to: "/project/$projectId",
					params: { projectId: id }
				})
			})
		]
	});
}
function EmptyState({ onCreate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-16 rounded-xl bg-card px-6 py-14 text-center shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-forest",
				children: "START A RECORD"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-3xl font-medium",
				children: "No projects yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground",
				children: "Create a project to capture twelve standard angles, add custom sections, and generate a professional PDF report."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-6",
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "New project"]
			})
		]
	});
}
function NewProjectDialog({ open, onOpenChange, onCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(todayIsoDate());
	const [referenceNumber, setReferenceNumber] = (0, import_react.useState)("");
	const [beforeAfter, setBeforeAfter] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const ready = (0, import_react.useMemo)(() => name.trim().length > 0, [name]);
	async function submit() {
		if (!ready) return;
		setSaving(true);
		try {
			const project = await createProject({
				name,
				description,
				date,
				referenceNumber,
				beforeAfterEnabled: beforeAfter
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New project" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Twelve standard angles are added automatically. Everything stays on this device." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "project-name",
							children: "Project name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "project-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "North elevation survey"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "project-ref",
							children: "Reference / ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "project-ref",
							value: referenceNumber,
							onChange: (e) => setReferenceNumber(e.target.value),
							placeholder: "INV-2041"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "project-date",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "project-date",
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "project-desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "project-desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Site, vehicle, or inspection notes"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "Before & after"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Separate photographs into two sets in the report"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: beforeAfter,
							onCheckedChange: setBeforeAfter
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void submit(),
				disabled: !ready || saving,
				children: "Create project"
			})] })
		] })
	});
}
//#endregion
export { Dashboard as component };
