import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kotlin-host-BcrOd8b3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Thin host for the Kotlin/JS app in public/fieldframe.mjs.
* All product UI, storage, PDF, and export live in kotlin-src/.
*/
function KotlinHost() {
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		if (!document.querySelector("script[data-fieldframe-kotlin]")) {
			const script = document.createElement("script");
			script.type = "module";
			script.src = "/fieldframe.mjs";
			script.dataset.fieldframeKotlin = "1";
			document.body.appendChild(script);
		}
		(async () => {
			const [pdf, zipMod] = await Promise.all([import("../_libs/pdf-lib.mjs").then((n) => n.t), import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))]);
			if (cancelled) return;
			window.PDFLib = {
				PDFDocument: pdf.PDFDocument,
				StandardFonts: pdf.StandardFonts,
				rgb: pdf.rgb
			};
			window.JSZip = zipMod.default;
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "kotlin-app",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ff-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "ff-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ff-kicker",
						children: "FIELDFRAME · KOTLIN MULTIPLATFORM"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "ff-title",
						children: "Photo records"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ff-lede",
						children: "Inspection, property, vehicle, and site documentation — stored only on this device."
					})
				] })
			})
		})
	});
}
//#endregion
export { KotlinHost as t };
