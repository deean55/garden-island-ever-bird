package fieldframe

sealed class Route {
    object Home : Route()
    data class Project(val id: String) : Route()
    data class Photo(val projectId: String, val photoId: String) : Route()
    data class Pdf(val projectId: String) : Route()
}

object S {
    var query = ""
    var projects: List<ProjectSummary> = emptyList()
    var bundle: Bundle? = null
    var missing = false
    var loading = true
    var error: String? = null

    var dialog: String? = null
    var menu: String? = null
    var toast: String? = null
    var toastError = false
    var busy = false

    var newName = ""
    var newRef = ""
    var newDate = todayIsoDate()
    var newDesc = ""
    var newBeforeAfter = false
    var newSectionName = ""

    var addSectionId: String? = null
    var addPhase = "standard"
    var cameraFacing = "environment"
    var cameraError: String? = null
    var cameraStream: dynamic = null
    var videoEl: dynamic = null

    var editName = ""
    var editRef = ""
    var editDate = ""
    var editDesc = ""
    var editBeforeAfter = false
    var hydratedProject: String? = null

    var photoDesc = ""
    var photoZoom = 1.0
    var photoUrl: String? = null
    var hydratedPhoto: String? = null

    var pdfUrl: String? = null
    var pdfName: String? = null
    var pdfBusy = false
    var pdfError: String? = null

    var focusId: String? = null
    var focusPos = 0
    var saveTimer: Int = 0
    var toastTimer: Int = 0
    var thumbUrls = HashMap<String, String>()
}

fun currentRoute(): Route {
    val raw = (window.location.hash as String).removePrefix("#").trim('/')
    if (raw.isEmpty()) return Route.Home
    val parts = raw.split("/")
    return when {
        parts.size >= 4 && parts[0] == "project" && parts[2] == "photo" -> Route.Photo(parts[1], parts[3])
        parts.size >= 3 && parts[0] == "project" && parts[2] == "pdf" -> Route.Pdf(parts[1])
        parts.size >= 2 && parts[0] == "project" -> Route.Project(parts[1])
        else -> Route.Home
    }
}

fun go(path: String) {
    closeTransient()
    val hash = if (path.startsWith("#")) path else "#$path"
    window.scrollTo(0, 0)
    if ((window.location.hash as String) != hash) window.location.hash = hash
    else bootRoute()
}

fun closeTransient() {
    S.dialog = null
    S.menu = null
    stopCamera()
}

fun toast(message: String, error: Boolean = false) {
    S.toast = message
    S.toastError = error
    if (S.toastTimer != 0) window.clearTimeout(S.toastTimer)
    S.toastTimer = window.setTimeout({
        S.toast = null
        paint()
        null
    }, 2800) as Int
    paint()
}

fun stopCamera() {
    val stream = S.cameraStream
    if (stream != null) {
        val tracks = jsArrayToList(stream.getTracks())
        for (t in tracks) t.stop()
    }
    S.cameraStream = null
    S.videoEl = null
    S.cameraError = null
}

fun thumbUrl(id: String, blob: dynamic): String {
    S.thumbUrls[id]?.let { return it }
    val url = createUrl(blob)
    S.thumbUrls[id] = url
    return url
}

fun dropThumb(id: String) {
    S.thumbUrls.remove(id)?.let { revokeUrl(it) }
}

@Suppress("UNCHECKED_CAST")
fun loadDashboard() {
    S.loading = true
    S.missing = false
    S.error = null
    paint()
    catchP(then(Repo.listSummaries(S.query)) { list ->
        S.projects = list as List<ProjectSummary>
        S.loading = false
        paint()
        prefetchThumbs(S.projects.mapNotNull { it.coverPhotoId })
        true
    }) { err ->
        S.loading = false
        S.error = userMessage(err, "Could not load projects.")
        paint()
        true
    }
}

fun loadProject(id: String, force: Boolean = false) {
    if (!force && S.bundle?.project?.id == id && S.hydratedProject == id) {
        paint()
        return
    }
    S.loading = true
    S.missing = false
    S.error = null
    paint()
    catchP(then(Repo.getBundle(id)) { bundleAny ->
        val bundle = bundleAny as Bundle?
        if (bundle == null) {
            S.bundle = null
            S.missing = true
            S.loading = false
            paint()
        } else {
            S.bundle = bundle
            S.missing = false
            S.loading = false
            if (S.hydratedProject != id) {
                S.editName = bundle.project.name
                S.editRef = bundle.project.referenceNumber
                S.editDate = bundle.project.date
                S.editDesc = bundle.project.description
                S.editBeforeAfter = bundle.project.beforeAfterEnabled
                S.hydratedProject = id
            } else {
                S.editBeforeAfter = bundle.project.beforeAfterEnabled
            }
            paint()
            prefetchThumbs(bundle.photos.map { it.id })
        }
        true
    }) { err ->
        S.loading = false
        S.error = userMessage(err, "Could not load this project.")
        paint()
        true
    }
}

fun loadPhoto(projectId: String, photoId: String) {
    fun afterBundle(bundle: Bundle) {
        val photo = bundle.photos.find { it.id == photoId }
        if (photo == null) {
            S.missing = true
            S.loading = false
            paint()
        } else {
            if (S.hydratedPhoto != photoId) {
                S.photoDesc = photo.description
                S.photoZoom = 1.0
                S.hydratedPhoto = photoId
            }
            S.loading = false
            paint()
            then(Repo.getBlob(photoId)) { blob ->
                S.photoUrl?.let { revokeUrl(it) }
                S.photoUrl = if (!isMissing(blob) && blob != null) createUrl(blob) else null
                paint()
                true
            }
        }
    }
    val current = S.bundle
    if (current?.project?.id == projectId) afterBundle(current)
    else {
        S.loading = true
        paint()
        then(Repo.getBundle(projectId)) { bundleAny ->
            val bundle = bundleAny as Bundle?
            if (bundle == null) {
                S.missing = true
                S.loading = false
                paint()
            } else {
                S.bundle = bundle
                S.hydratedProject = projectId
                afterBundle(bundle)
            }
            true
        }
    }
}

fun prefetchThumbs(ids: List<String>) {
    for (id in ids) {
        if (S.thumbUrls.containsKey(id)) continue
        then(Repo.getThumb(id)) { blob ->
            if (!isMissing(blob) && blob != null) {
                thumbUrl(id, blob)
                paint()
            }
            true
        }
    }
}

fun scheduleProjectSave() {
    if (S.saveTimer != 0) window.clearTimeout(S.saveTimer)
    S.saveTimer = window.setTimeout({
        val bundle = S.bundle
        if (bundle != null) {
            bundle.project.name = S.editName
            bundle.project.referenceNumber = S.editRef
            bundle.project.date = S.editDate
            bundle.project.description = S.editDesc
            catchP(Repo.updateProject(bundle.project)) { err ->
                toast(userMessage(err, "Could not save project details."), true)
                true
            }
        }
        null
    }, 500) as Int
}

fun bootRoute() {
    when (val route = currentRoute()) {
        is Route.Home -> loadDashboard()
        is Route.Project -> loadProject(route.id, force = true)
        is Route.Photo -> loadPhoto(route.projectId, route.photoId)
        is Route.Pdf -> {
            loadProject(route.projectId, force = true)
            if (S.pdfUrl == null) generatePdf()
        }
    }
}

fun catchToast(err: dynamic, fallback: String) {
    toast(userMessage(err, fallback), true)
}
