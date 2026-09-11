import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-BFgpIxcz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayIsoDate() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDate(iso) {
	if (!iso) return "—";
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return new Date(y, m - 1, d).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
}
function formatDateTime(ms) {
	return new Date(ms).toLocaleString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function padPhotoNumber(n) {
	return String(n).padStart(2, "0");
}
function sanitizeFilename(name) {
	return name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "").replace(/\s+/g, "_").replace(/_+/g, "_").replace(/^[._]+|[._]+$/g, "").slice(0, 80) || "Project";
}
function uniqueFilename(base, existing) {
	if (!existing.has(base.toLowerCase())) return base;
	const dot = base.lastIndexOf(".");
	const stem = dot > 0 ? base.slice(0, dot) : base;
	const ext = dot > 0 ? base.slice(dot) : "";
	for (let i = 1; i < 100; i++) {
		const next = `${stem}_${String(i).padStart(2, "0")}${ext}`;
		if (!existing.has(next.toLowerCase())) return next;
	}
	return `${stem}_${Date.now()}${ext}`;
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 2e3);
}
function userMessage(err, fallback) {
	if (err instanceof DOMException) {
		if (err.name === "NotAllowedError") return "Permission was denied.";
		if (err.name === "NotFoundError") return "No camera was found on this device.";
		if (err.name === "NotReadableError") return "The camera is already in use.";
		if (err.name === "AbortError") return "The action was cancelled.";
		if (err.name === "QuotaExceededError") return "Not enough storage available on this device.";
		if (err.name === "SecurityError") return "Access was blocked by the browser.";
	}
	if (err instanceof Error && err.message) return err.message;
	return fallback;
}
function newId() {
	return crypto.randomUUID();
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-forest-soft",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			ghost: "hover:bg-muted text-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-6",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var DB_NAME = "fieldframe";
var DB_VERSION = 1;
function requestToPromise(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error ?? /* @__PURE__ */ new Error("IndexedDB request failed"));
	});
}
function transactionDone(tx) {
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("IndexedDB transaction failed"));
		tx.onabort = () => reject(tx.error ?? /* @__PURE__ */ new Error("IndexedDB transaction aborted"));
	});
}
var dbPromise = null;
function isDbAvailable() {
	return typeof indexedDB !== "undefined";
}
function openFieldframeDb() {
	if (!isDbAvailable()) return Promise.reject(/* @__PURE__ */ new Error("Local storage is not available in this browser."));
	if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains("projects")) db.createObjectStore("projects", { keyPath: "id" });
			if (!db.objectStoreNames.contains("sections")) db.createObjectStore("sections", { keyPath: "id" }).createIndex("byProject", "projectId", { unique: false });
			if (!db.objectStoreNames.contains("photos")) {
				const photos = db.createObjectStore("photos", { keyPath: "id" });
				photos.createIndex("byProject", "projectId", { unique: false });
				photos.createIndex("bySection", "sectionId", { unique: false });
			}
			if (!db.objectStoreNames.contains("blobs")) db.createObjectStore("blobs", { keyPath: "id" });
			if (!db.objectStoreNames.contains("thumbs")) db.createObjectStore("thumbs", { keyPath: "id" });
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => {
			dbPromise = null;
			reject(request.error ?? /* @__PURE__ */ new Error("Could not open the local database."));
		};
	});
	return dbPromise;
}
async function idbGet(store, id) {
	const tx = (await openFieldframeDb()).transaction(store, "readonly");
	const result = await requestToPromise(tx.objectStore(store).get(id));
	await transactionDone(tx);
	return result;
}
async function idbGetAll(store) {
	const tx = (await openFieldframeDb()).transaction(store, "readonly");
	const result = await requestToPromise(tx.objectStore(store).getAll());
	await transactionDone(tx);
	return result;
}
async function idbGetAllByIndex(store, index, value) {
	const tx = (await openFieldframeDb()).transaction(store, "readonly");
	const result = await requestToPromise(tx.objectStore(store).index(index).getAll(value));
	await transactionDone(tx);
	return result;
}
async function idbPut(store, value) {
	const tx = (await openFieldframeDb()).transaction(store, "readwrite");
	tx.objectStore(store).put(value);
	await transactionDone(tx);
}
async function idbDelete(store, id) {
	const tx = (await openFieldframeDb()).transaction(store, "readwrite");
	tx.objectStore(store).delete(id);
	await transactionDone(tx);
}
async function putProjectGraph(args) {
	const tx = (await openFieldframeDb()).transaction([
		"projects",
		"sections",
		"photos",
		"blobs",
		"thumbs"
	], "readwrite");
	tx.objectStore("projects").put(args.project);
	for (const section of args.sections) tx.objectStore("sections").put(section);
	for (const photo of args.photos) tx.objectStore("photos").put(photo);
	for (const blob of args.blobs) tx.objectStore("blobs").put(blob);
	for (const thumb of args.thumbs) tx.objectStore("thumbs").put(thumb);
	await transactionDone(tx);
}
async function deleteProjectGraph(projectId) {
	const photos = await idbGetAllByIndex("photos", "byProject", projectId);
	const sections = await idbGetAllByIndex("sections", "byProject", projectId);
	const tx = (await openFieldframeDb()).transaction([
		"projects",
		"sections",
		"photos",
		"blobs",
		"thumbs"
	], "readwrite");
	tx.objectStore("projects").delete(projectId);
	for (const section of sections) tx.objectStore("sections").delete(section.id);
	for (const photo of photos) {
		tx.objectStore("photos").delete(photo.id);
		tx.objectStore("blobs").delete(photo.id);
		tx.objectStore("thumbs").delete(photo.id);
	}
	await transactionDone(tx);
}
async function deletePhotoGraph(photoId) {
	const tx = (await openFieldframeDb()).transaction([
		"photos",
		"blobs",
		"thumbs"
	], "readwrite");
	tx.objectStore("photos").delete(photoId);
	tx.objectStore("blobs").delete(photoId);
	tx.objectStore("thumbs").delete(photoId);
	await transactionDone(tx);
}
var THUMB_MAX = 480;
var PDF_MAX_EDGE = 2200;
function isQuotaError(err) {
	return err instanceof DOMException && err.name === "QuotaExceededError";
}
async function readImageSize(blob) {
	try {
		const bitmap = await createImageBitmap(blob);
		const size = {
			width: bitmap.width,
			height: bitmap.height
		};
		bitmap.close();
		return size;
	} catch {
		throw new Error("This image could not be read. Try a JPEG or PNG file.");
	}
}
function rotatedSize(width, height, rotation) {
	return rotation === 90 || rotation === 270 ? {
		width: height,
		height: width
	} : {
		width,
		height
	};
}
async function drawToCanvas(blob, rotation, maxEdge) {
	let bitmap;
	try {
		bitmap = await createImageBitmap(blob);
	} catch {
		throw new Error("This image could not be loaded.");
	}
	const visual = rotatedSize(bitmap.width, bitmap.height, rotation);
	const scale = maxEdge ? Math.min(1, maxEdge / Math.max(visual.width, visual.height)) : 1;
	const destW = Math.max(1, Math.round(visual.width * scale));
	const destH = Math.max(1, Math.round(visual.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = destW;
	canvas.height = destH;
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		bitmap.close();
		throw new Error("Could not prepare the image.");
	}
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, destW, destH);
	ctx.translate(destW / 2, destH / 2);
	ctx.rotate(rotation * Math.PI / 180);
	ctx.drawImage(bitmap, -(bitmap.width * scale) / 2, -(bitmap.height * scale) / 2, bitmap.width * scale, bitmap.height * scale);
	bitmap.close();
	return canvas;
}
function canvasToBlob(canvas, type, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(/* @__PURE__ */ new Error("Could not encode the image."));
		}, type, quality);
	});
}
async function makeThumbnail(blob, rotation = 0) {
	return canvasToBlob(await drawToCanvas(blob, rotation, THUMB_MAX), "image/jpeg", .82);
}
async function rasterizeJpeg(blob, rotation, maxEdge = PDF_MAX_EDGE) {
	const canvas = await drawToCanvas(blob, rotation, maxEdge);
	const out = await canvasToBlob(canvas, "image/jpeg", .92);
	return {
		bytes: new Uint8Array(await out.arrayBuffer()),
		width: canvas.width,
		height: canvas.height
	};
}
async function captureVideoFrame(video) {
	const width = video.videoWidth;
	const height = video.videoHeight;
	if (!width || !height) throw new Error("The camera is not ready yet.");
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not capture a photograph.");
	ctx.drawImage(video, 0, 0, width, height);
	return canvasToBlob(canvas, "image/jpeg", .95);
}
function friendlyQuotaError(err) {
	if (isQuotaError(err)) return /* @__PURE__ */ new Error("Not enough storage available on this device.");
	if (err instanceof Error) return err;
	return /* @__PURE__ */ new Error("Storage failed.");
}
var DEFAULT_SECTION_NAMES = [
	"Front",
	"Front Left",
	"Left",
	"Rear Left",
	"Rear",
	"Rear Right",
	"Right",
	"Front Right",
	"Top",
	"Bottom",
	"Close-up 1",
	"Close-up 2"
];
var CUSTOM_SECTION_SUGGESTIONS = [
	"Exterior",
	"Interior",
	"Engine",
	"Damage",
	"Roof",
	"Electrical",
	"Plumbing",
	"Documents"
];
var PHOTODOC_FORMAT = "photodoc";
var listeners = /* @__PURE__ */ new Set();
var version = 0;
function emit() {
	version += 1;
	for (const listener of listeners) listener();
}
function subscribeRepo(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
function getRepoVersion() {
	return version;
}
function getServerRepoVersion() {
	return 0;
}
async function touchProject(projectId) {
	const project = await idbGet("projects", projectId);
	if (!project) return;
	project.updatedAt = Date.now();
	await idbPut("projects", project);
}
function sortSections(sections) {
	return [...sections].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}
function sortPhotos(photos) {
	return [...photos].sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt - b.createdAt);
}
function numberPhotos(sections, photos) {
	const result = [];
	let n = 1;
	for (const section of sortSections(sections)) for (const photo of sortPhotos(photos.filter((p) => p.sectionId === section.id))) {
		result.push({
			photo,
			section,
			number: n
		});
		n += 1;
	}
	return result;
}
function numberPhotosForPdf(project, sections, photos) {
	if (!project.beforeAfterEnabled) return [{
		label: "Photographs",
		items: numberPhotos(sections, photos)
	}];
	const beforePhotos = photos.filter((p) => p.phase !== "after");
	const afterPhotos = photos.filter((p) => p.phase === "after");
	const before = numberPhotos(sections, beforePhotos);
	const after = numberPhotos(sections, afterPhotos).map((item, index) => ({
		...item,
		number: before.length + index + 1
	}));
	return [{
		label: "BEFORE",
		items: before
	}, {
		label: "AFTER",
		items: after
	}];
}
async function listProjectSummaries(query = "") {
	const [projects, photos] = await Promise.all([idbGetAll("projects"), idbGetAll("photos")]);
	const needle = query.trim().toLowerCase();
	const byProject = /* @__PURE__ */ new Map();
	for (const photo of photos) {
		const list = byProject.get(photo.projectId) ?? [];
		list.push(photo);
		byProject.set(photo.projectId, list);
	}
	return projects.filter((project) => {
		if (!needle) return true;
		return `${project.name} ${project.description} ${project.referenceNumber}`.toLowerCase().includes(needle);
	}).sort((a, b) => b.updatedAt - a.updatedAt).map((project) => {
		const list = sortPhotos(byProject.get(project.id) ?? []);
		return {
			...project,
			photoCount: list.length,
			coverPhotoId: list[0]?.id ?? null
		};
	});
}
async function getProjectBundle(id) {
	const project = await idbGet("projects", id);
	if (!project) return null;
	const [sections, photos] = await Promise.all([idbGetAllByIndex("sections", "byProject", id), idbGetAllByIndex("photos", "byProject", id)]);
	return {
		project,
		sections: sortSections(sections),
		photos: sortPhotos(photos)
	};
}
async function createProject(input) {
	const now = Date.now();
	const project = {
		id: newId(),
		name: input.name.trim() || "Untitled project",
		description: input.description.trim(),
		date: input.date || todayIsoDate(),
		referenceNumber: input.referenceNumber.trim(),
		createdAt: now,
		updatedAt: now,
		beforeAfterEnabled: input.beforeAfterEnabled
	};
	await putProjectGraph({
		project,
		sections: DEFAULT_SECTION_NAMES.map((name, index) => ({
			id: newId(),
			projectId: project.id,
			name,
			sortOrder: index,
			isCustom: false
		})),
		photos: [],
		blobs: [],
		thumbs: []
	});
	emit();
	return project;
}
async function updateProject(id, patch) {
	const project = await idbGet("projects", id);
	if (!project) throw new Error("Project not found.");
	await idbPut("projects", {
		...project,
		...patch,
		name: (patch.name ?? project.name).trim() || project.name,
		updatedAt: Date.now()
	});
	emit();
}
async function deleteProject(id) {
	await deleteProjectGraph(id);
	emit();
}
async function addSection(projectId, name) {
	const maxOrder = (await idbGetAllByIndex("sections", "byProject", projectId)).reduce((m, s) => Math.max(m, s.sortOrder), -1);
	const section = {
		id: newId(),
		projectId,
		name: name.trim() || "Custom",
		sortOrder: maxOrder + 1,
		isCustom: true
	};
	await idbPut("sections", section);
	await touchProject(projectId);
	emit();
	return section;
}
async function renameSection(id, name) {
	const section = await idbGet("sections", id);
	if (!section) throw new Error("Section not found.");
	section.name = name.trim() || section.name;
	await idbPut("sections", section);
	await touchProject(section.projectId);
	emit();
}
async function deleteSection(id) {
	const section = await idbGet("sections", id);
	if (!section) return;
	const photos = await idbGetAllByIndex("photos", "bySection", id);
	for (const photo of photos) await deletePhotoGraph(photo.id);
	await idbDelete("sections", id);
	await touchProject(section.projectId);
	emit();
}
async function getPhotoBlob(id) {
	return (await idbGet("blobs", id))?.blob;
}
async function getPhotoThumb(id) {
	return (await idbGet("thumbs", id))?.blob ?? await getPhotoBlob(id);
}
async function addPhotos(input) {
	let order = (await idbGetAllByIndex("photos", "bySection", input.sectionId)).reduce((m, p) => Math.max(m, p.sortOrder), -1);
	const created = [];
	try {
		for (let i = 0; i < input.files.length; i++) {
			const file = input.files[i];
			const mimeType = file.type || "image/jpeg";
			const size = await readImageSize(file);
			const id = newId();
			const now = Date.now();
			order += 1;
			const photo = {
				id,
				projectId: input.projectId,
				sectionId: input.sectionId,
				description: "",
				sortOrder: order,
				createdAt: now,
				updatedAt: now,
				rotation: 0,
				mimeType,
				width: size.width,
				height: size.height,
				phase: input.phase,
				originalName: input.names?.[i] || (file instanceof File ? file.name : `capture-${id}.jpg`)
			};
			const thumb = await makeThumbnail(file, 0);
			await idbPut("photos", photo);
			await idbPut("blobs", {
				id,
				blob: file
			});
			await idbPut("thumbs", {
				id,
				blob: thumb
			});
			created.push(photo);
		}
		await touchProject(input.projectId);
		emit();
		return created;
	} catch (err) {
		throw friendlyQuotaError(err);
	}
}
async function replacePhoto(photoId, file, originalName) {
	const photo = await idbGet("photos", photoId);
	if (!photo) throw new Error("Photograph not found.");
	try {
		const size = await readImageSize(file);
		const thumb = await makeThumbnail(file, photo.rotation);
		photo.mimeType = file.type || photo.mimeType;
		photo.width = size.width;
		photo.height = size.height;
		photo.updatedAt = Date.now();
		if (originalName) photo.originalName = originalName;
		await idbPut("photos", photo);
		await idbPut("blobs", {
			id: photoId,
			blob: file
		});
		await idbPut("thumbs", {
			id: photoId,
			blob: thumb
		});
		await touchProject(photo.projectId);
		emit();
	} catch (err) {
		throw friendlyQuotaError(err);
	}
}
async function updatePhoto(id, patch) {
	const photo = await idbGet("photos", id);
	if (!photo) throw new Error("Photograph not found.");
	Object.assign(photo, patch);
	photo.updatedAt = Date.now();
	await idbPut("photos", photo);
	await touchProject(photo.projectId);
	emit();
}
async function rotatePhoto(id, delta) {
	const photo = await idbGet("photos", id);
	if (!photo) throw new Error("Photograph not found.");
	const next = ((photo.rotation + delta) % 360 + 360) % 360;
	photo.rotation = next;
	photo.updatedAt = Date.now();
	const blob = await getPhotoBlob(id);
	if (blob) await idbPut("thumbs", {
		id,
		blob: await makeThumbnail(blob, next)
	});
	await idbPut("photos", photo);
	await touchProject(photo.projectId);
	emit();
}
async function deletePhoto(id) {
	const photo = await idbGet("photos", id);
	if (!photo) return;
	await deletePhotoGraph(id);
	await touchProject(photo.projectId);
	emit();
}
async function movePhoto(photoId, sectionId, phase) {
	const photo = await idbGet("photos", photoId);
	if (!photo) throw new Error("Photograph not found.");
	const max = (await idbGetAllByIndex("photos", "bySection", sectionId)).filter((p) => p.id !== photoId).reduce((m, p) => Math.max(m, p.sortOrder), -1);
	photo.sectionId = sectionId;
	photo.sortOrder = max + 1;
	if (phase) photo.phase = phase;
	photo.updatedAt = Date.now();
	await idbPut("photos", photo);
	await touchProject(photo.projectId);
	emit();
}
async function shiftPhoto(photoId, direction) {
	const photo = await idbGet("photos", photoId);
	if (!photo) return;
	const siblings = sortPhotos(await idbGetAllByIndex("photos", "bySection", photo.sectionId)).filter((p) => p.phase === photo.phase);
	const swap = siblings[siblings.findIndex((p) => p.id === photoId) + direction];
	if (!swap) return;
	const tmp = photo.sortOrder;
	photo.sortOrder = swap.sortOrder;
	swap.sortOrder = tmp;
	photo.updatedAt = Date.now();
	swap.updatedAt = Date.now();
	await idbPut("photos", photo);
	await idbPut("photos", swap);
	await touchProject(photo.projectId);
	emit();
}
function notifyRepo() {
	emit();
}
function useRepoVersion() {
	return (0, import_react.useSyncExternalStore)(subscribeRepo, getRepoVersion, getServerRepoVersion);
}
function useProjectList(query) {
	const version = useRepoVersion();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listProjectSummaries(query).then((list) => {
			if (!cancelled) {
				setData(list);
				setError(null);
			}
		}).catch((err) => {
			if (!cancelled) setError(err instanceof Error ? err.message : "Could not load projects.");
		});
		return () => {
			cancelled = true;
		};
	}, [query, version]);
	return {
		data,
		error
	};
}
function useProject(projectId) {
	const version = useRepoVersion();
	const [bundle, setBundle] = (0, import_react.useState)(null);
	const [missing, setMissing] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getProjectBundle(projectId).then((next) => {
			if (cancelled) return;
			if (!next) {
				setMissing(true);
				setBundle(null);
			} else {
				setMissing(false);
				setBundle(next);
			}
		}).catch((err) => {
			if (!cancelled) setError(err instanceof Error ? err.message : "Could not load this project.");
		});
		return () => {
			cancelled = true;
		};
	}, [projectId, version]);
	return {
		bundle,
		missing,
		error
	};
}
function useObjectUrl(blob) {
	const [url, setUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!blob) {
			setUrl(null);
			return;
		}
		const next = URL.createObjectURL(blob);
		setUrl(next);
		return () => URL.revokeObjectURL(next);
	}, [blob]);
	return url;
}
var thumbCache = /* @__PURE__ */ new Map();
function useThumbUrl(photoId, cacheKey = "") {
	const version = useRepoVersion();
	const [blob, setBlob] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!photoId) {
			setBlob(null);
			return;
		}
		const cached = thumbCache.get(`${photoId}:${cacheKey}:${version}`);
		if (cached) {
			setBlob(cached);
			return;
		}
		let cancelled = false;
		getPhotoThumb(photoId).then((next) => {
			if (cancelled) return;
			if (next) {
				thumbCache.set(`${photoId}:${cacheKey}:${version}`, next);
				setBlob(next);
			} else setBlob(null);
		});
		return () => {
			cancelled = true;
		};
	}, [
		photoId,
		cacheKey,
		version
	]);
	return useObjectUrl(blob);
}
async function shareFile(blob, filename, title) {
	const file = new File([blob], filename, { type: blob.type || "application/octet-stream" });
	try {
		if (typeof navigator.share === "function" && navigator.canShare?.({ files: [file] })) {
			await navigator.share({
				files: [file],
				title,
				text: title
			});
			return "shared";
		}
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
	}
	downloadBlob(blob, filename);
	return "downloaded";
}
async function saveFile(blob, filename, mime, extension) {
	const picker = window.showSaveFilePicker;
	if (typeof picker === "function") try {
		const writable = await (await picker({
			suggestedName: filename,
			types: [{
				description: extension.toUpperCase(),
				accept: { [mime]: [`.${extension}`] }
			}]
		})).createWritable();
		await writable.write(blob);
		await writable.close();
		return "saved";
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
	}
	downloadBlob(blob, filename);
	return "downloaded";
}
function openBlob(blob) {
	const url = URL.createObjectURL(blob);
	if (!window.open(url, "_blank", "noopener,noreferrer")) downloadBlob(blob, "document");
	setTimeout(() => URL.revokeObjectURL(url), 6e4);
}
function pickImageFiles(multiple = true) {
	return new Promise((resolve) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/jpeg,image/png,image/heic,image/heif,image/webp";
		input.multiple = multiple;
		input.addEventListener("change", () => resolve(Array.from(input.files ?? [])));
		input.addEventListener("cancel", () => resolve([]));
		input.click();
	});
}
function pickPackageFile() {
	return new Promise((resolve) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".photodoc,application/zip,application/json";
		input.addEventListener("change", () => resolve(input.files?.[0] ?? null));
		input.addEventListener("cancel", () => resolve(null));
		input.click();
	});
}
//#endregion
export { rotatePhoto as A, useProject as B, padPhotoNumber as C, rasterizeJpeg as D, putProjectGraph as E, todayIsoDate as F, useThumbUrl as H, uniqueFilename as I, updatePhoto as L, saveFile as M, shareFile as N, renameSection as O, shiftPhoto as P, updateProject as R, openBlob as S, pickPackageFile as T, userMessage as U, useProjectList as V, movePhoto as _, addSection as a, numberPhotos as b, cn as c, deleteProject as d, deleteSection as f, makeThumbnail as g, getPhotoBlob as h, addPhotos as i, sanitizeFilename as j, replacePhoto as k, createProject as l, formatDateTime as m, CUSTOM_SECTION_SUGGESTIONS as n, buttonVariants as o, formatDate as p, PHOTODOC_FORMAT as r, captureVideoFrame as s, Button as t, deletePhoto as u, newId as v, pickImageFiles as w, numberPhotosForPdf as x, notifyRepo as y, useObjectUrl as z };
