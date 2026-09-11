import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, v as useNavigate, y as useParams, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as KotlinHost } from "./kotlin-host-CUL6x_jt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._projectId.pdf-CU7xiF-c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PdfRedirect() {
	const { projectId } = useParams({ from: "/project/$projectId/pdf" });
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/",
			hash: `/project/${projectId}/pdf`
		});
	}, [navigate, projectId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KotlinHost, {});
}
//#endregion
export { PdfRedirect as component };
