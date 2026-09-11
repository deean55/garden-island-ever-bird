import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as object, i as number, n as boolean, o as string, r as literal, s as union, t as array } from "../_libs/zod.mjs";
import { E as putProjectGraph, H as useThumbUrl, c as cn, g as makeThumbnail, h as getPhotoBlob, j as sanitizeFilename, r as PHOTODOC_FORMAT, v as newId } from "./share-BFgpIxcz.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/photodoc-Ci1iliZj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-card shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function PhotoThumb({ photoId, alt, className, rotation = 0 }) {
	const url = useThumbUrl(photoId, String(rotation));
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("bg-muted", className),
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt,
		className: cn("doc-photo h-full w-full object-cover", className)
	});
}
var rotationSchema = union([
	literal(0),
	literal(90),
	literal(180),
	literal(270)
]);
var phaseSchema = union([
	literal("standard"),
	literal("before"),
	literal("after")
]);
var manifestSchema = object({
	format: literal(PHOTODOC_FORMAT),
	version: literal(1),
	exportedAt: string(),
	project: object({
		id: string(),
		name: string(),
		description: string(),
		date: string(),
		referenceNumber: string(),
		createdAt: number(),
		updatedAt: number(),
		beforeAfterEnabled: boolean()
	}),
	sections: array(object({
		id: string(),
		projectId: string(),
		name: string(),
		sortOrder: number(),
		isCustom: boolean()
	})),
	photos: array(object({
		id: string(),
		projectId: string(),
		sectionId: string(),
		description: string(),
		sortOrder: number(),
		createdAt: number(),
		updatedAt: number(),
		rotation: rotationSchema,
		mimeType: string(),
		width: number(),
		height: number(),
		phase: phaseSchema,
		originalName: string()
	}))
});
function extensionFor(mime, name) {
	const fromName = name.split(".").pop()?.toLowerCase();
	if (fromName && fromName.length <= 5) return fromName;
	if (mime.includes("png")) return "png";
	if (mime.includes("webp")) return "webp";
	if (mime.includes("heic") || mime.includes("heif")) return "heic";
	return "jpg";
}
async function exportProjectPackage(bundle) {
	const zip = new import_lib.default();
	const manifest = {
		format: PHOTODOC_FORMAT,
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		project: bundle.project,
		sections: bundle.sections,
		photos: bundle.photos
	};
	zip.file("project.json", JSON.stringify(manifest, null, 2));
	const folder = zip.folder("photos");
	if (!folder) throw new Error("Could not create the export package.");
	for (const photo of bundle.photos) {
		const blob = await getPhotoBlob(photo.id);
		if (!blob) continue;
		const ext = extensionFor(photo.mimeType, photo.originalName);
		folder.file(`${photo.id}.${ext}`, blob);
	}
	return {
		blob: await zip.generateAsync({ type: "blob" }),
		filename: `${sanitizeFilename(bundle.project.name)}.photodoc`
	};
}
async function importProjectPackage(file) {
	const zip = await import_lib.default.loadAsync(file);
	const jsonFile = zip.file("project.json");
	if (!jsonFile) throw new Error("This file is not a valid Fieldframe package.");
	let parsed;
	try {
		parsed = JSON.parse(await jsonFile.async("string"));
	} catch {
		throw new Error("The package manifest is corrupted.");
	}
	const result = manifestSchema.safeParse(parsed);
	if (!result.success) throw new Error("The package is missing required project data.");
	const manifest = result.data;
	const now = Date.now();
	const projectId = newId();
	const sectionMap = /* @__PURE__ */ new Map();
	const photoMap = /* @__PURE__ */ new Map();
	const project = {
		...manifest.project,
		id: projectId,
		name: manifest.project.name?.trim() || "Imported project",
		createdAt: now,
		updatedAt: now
	};
	const sections = manifest.sections.map((section) => {
		const id = newId();
		sectionMap.set(section.id, id);
		return {
			...section,
			id,
			projectId
		};
	});
	const photos = [];
	const blobs = [];
	const thumbs = [];
	for (const photo of manifest.photos) {
		const sectionId = sectionMap.get(photo.sectionId);
		if (!sectionId) continue;
		const id = newId();
		photoMap.set(photo.id, id);
		const ext = extensionFor(photo.mimeType, photo.originalName);
		const entry = zip.file(`photos/${photo.id}.${ext}`) || zip.file(`photos/${photo.id}.jpg`) || zip.file(`photos/${photo.id}.jpeg`) || zip.file(`photos/${photo.id}.png`);
		if (!entry) continue;
		const bytes = await entry.async("blob");
		const blob = bytes.type ? bytes : new Blob([bytes], { type: photo.mimeType || "image/jpeg" });
		let thumb;
		try {
			thumb = await makeThumbnail(blob, photo.rotation);
		} catch {
			continue;
		}
		photos.push({
			...photo,
			id,
			projectId,
			sectionId,
			phase: photo.phase,
			rotation: photo.rotation
		});
		blobs.push({
			id,
			blob
		});
		thumbs.push({
			id,
			blob: thumb
		});
	}
	if (sections.length === 0) throw new Error("The package does not contain any sections.");
	await putProjectGraph({
		project,
		sections,
		photos,
		blobs,
		thumbs
	});
	return project;
}
//#endregion
export { importProjectPackage as a, exportProjectPackage as i, PhotoThumb as n, Switch as r, Input as t };
