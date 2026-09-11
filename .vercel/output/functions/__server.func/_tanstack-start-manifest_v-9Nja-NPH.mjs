//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-9Nja-NPH.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: ["/", "/project/$projectId"],
		preloads: ["/assets/index-HBVmir1U.js", "/assets/rolldown-runtime-W7wSyTde.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-HBVmir1U.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DGJSjAWF.js", "/assets/kotlin-host-B6icQ-QH.js"]
	},
	"/project/$projectId": {
		filePath: "/workspace/src/routes/project.$projectId.tsx",
		children: [
			"/project/$projectId/pdf",
			"/project/$projectId/",
			"/project/$projectId/photo/$photoId"
		],
		preloads: ["/assets/project._projectId-D-QUjjOE.js", "/assets/kotlin-host-B6icQ-QH.js"]
	},
	"/project/$projectId/pdf": {
		filePath: "/workspace/src/routes/project.$projectId.pdf.tsx",
		children: void 0,
		preloads: ["/assets/project._projectId.pdf-B3xRtRkc.js"]
	},
	"/project/$projectId/": {
		filePath: "/workspace/src/routes/project.$projectId.index.tsx",
		children: void 0,
		preloads: ["/assets/project._projectId.index-C3e--0rC.js"]
	},
	"/project/$projectId/photo/$photoId": {
		filePath: "/workspace/src/routes/project.$projectId.photo.$photoId.tsx",
		children: void 0,
		preloads: ["/assets/project._projectId.photo._photoId-D1TWFTGF.js"]
	}
} });
//#endregion
export { tsrStartManifest };
