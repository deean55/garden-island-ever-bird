package fieldframe

fun main() {
    if (js("window.__fieldframeKotlin") == true) {
        bootRoute()
        return
    }
    js("window.__fieldframeKotlin = true")
    window.addEventListener("hashchange", {
        S.hydratedPhoto = null
        S.photoUrl?.let { revokeUrl(it) }
        S.photoUrl = null
        if (currentRoute() !is Route.Pdf) {
            S.pdfUrl?.let { revokeUrl(it) }
            S.pdfUrl = null
            S.pdfError = null
        }
        if (currentRoute() is Route.Home) {
            S.hydratedProject = null
            S.bundle = null
        }
        bootRoute()
    })
    document.addEventListener("click", { ev: dynamic ->
        val menu = S.menu
        if (menu != null) {
            val t = ev.target
            val inside = js("t && t.closest && t.closest('.ff-menu-wrap')")
            if (inside == null || js("inside === undefined") as Boolean || js("!inside") as Boolean) {
                S.menu = null
                paint()
            }
        }
    })
    paint()
    catchP(then(Idb.open()) {
        bootRoute()
        true
    }) { err ->
        S.loading = false
        S.error = userMessage(err, "Local storage is not available in this browser.")
        paint()
        true
    }
}
