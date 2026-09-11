import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, v as useNavigate, y as useParams, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as KotlinHost } from "./kotlin-host-BcrOd8b3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._projectId-KoEja4Ea.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectRedirect() {
	const { projectId } = useParams({ from: "/project/$projectId" });
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/",
			hash: `/project/${projectId}`
		});
	}, [navigate, projectId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KotlinHost, {});
}
//#endregion
export { ProjectRedirect as component };
