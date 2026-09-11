//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-D_YDY3th.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: ["/", "/project/$projectId"],
		preloads: ["/assets/index-rRIUDkst.js", "/assets/rolldown-runtime-W7wSyTde.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-rRIUDkst.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-BDETY1_e.js", "/assets/kotlin-host-Cu9LMxOf.js"]
	},
	"/project/$projectId": {
		filePath: "/workspace/src/routes/project.$projectId.tsx",
		children: [
			"/project/$projectId/pdf",
			"/project/$projectId/",
			"/project/$projectId/photo/$photoId"
		],
		preloads: ["/assets/project._projectId-CWYX1L7H.js", "/assets/kotlin-host-Cu9LMxOf.js"]
	},
	"/project/$projectId/pdf": {
		filePath: "/workspace/src/routes/project.$projectId.pdf.tsx",
		children: void 0,
		preloads: ["/assets/project._projectId.pdf-MExSxKHV.js"]
	},
	"/project/$projectId/": {
		filePath: "/workspace/src/routes/project.$projectId.index.tsx",
		children: void 0,
		preloads: ["/assets/project._projectId.index-CaIdGTtS.js"]
	},
	"/project/$projectId/photo/$photoId": {
		filePath: "/workspace/src/routes/project.$projectId.photo.$photoId.tsx",
		children: void 0,
		preloads: ["/assets/project._projectId.photo._photoId-CF9AQ1-6.js"]
	}
} });
//#endregion
export { tsrStartManifest };
