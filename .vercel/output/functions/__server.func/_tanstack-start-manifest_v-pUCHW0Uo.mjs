//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-pUCHW0Uo.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: ["/", "/project/$projectId"],
		preloads: [
			"/assets/index-CBqRiywh.js",
			"/assets/useRouter-D7WGb4h1.js",
			"/assets/dist-zJuZwMk7.js",
			"/assets/preload-helper-Cpz9OijP.js",
			"/assets/useStore-Hepi9ALP.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CBqRiywh.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-Ca5hBHct.js",
			"/assets/photodoc-B34q1pir.js",
			"/assets/textarea-qF4wc2lt.js",
			"/assets/share-BbI6W70G.js"
		]
	},
	"/project/$projectId": {
		filePath: "/workspace/src/routes/project.$projectId.tsx",
		children: [
			"/project/$projectId/pdf",
			"/project/$projectId/",
			"/project/$projectId/photo/$photoId"
		],
		preloads: ["/assets/project._projectId-elebBGd2.js"]
	},
	"/project/$projectId/pdf": {
		filePath: "/workspace/src/routes/project.$projectId.pdf.tsx",
		children: void 0,
		preloads: [
			"/assets/project._projectId.pdf-Dnlvx4rA.js",
			"/assets/arrow-left-DUM30UUh.js",
			"/assets/report-DkBP3_FM.js",
			"/assets/zoom-in-DQ1k1QKS.js",
			"/assets/share-BbI6W70G.js"
		]
	},
	"/project/$projectId/": {
		filePath: "/workspace/src/routes/project.$projectId.index.tsx",
		children: void 0,
		preloads: [
			"/assets/project._projectId.index-BlZQh0Hx.js",
			"/assets/arrow-left-DUM30UUh.js",
			"/assets/photodoc-B34q1pir.js",
			"/assets/report-DkBP3_FM.js",
			"/assets/textarea-qF4wc2lt.js",
			"/assets/share-BbI6W70G.js",
			"/assets/alert-dialog-C9etubJk.js"
		]
	},
	"/project/$projectId/photo/$photoId": {
		filePath: "/workspace/src/routes/project.$projectId.photo.$photoId.tsx",
		children: void 0,
		preloads: [
			"/assets/project._projectId.photo._photoId-BaZEK280.js",
			"/assets/arrow-left-DUM30UUh.js",
			"/assets/textarea-qF4wc2lt.js",
			"/assets/zoom-in-DQ1k1QKS.js",
			"/assets/share-BbI6W70G.js",
			"/assets/alert-dialog-C9etubJk.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
