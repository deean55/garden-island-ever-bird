package fieldframe

data class Project(
    val id: String,
    var name: String,
    var description: String,
    var date: String,
    var referenceNumber: String,
    val createdAt: Double,
    var updatedAt: Double,
    var beforeAfterEnabled: Boolean,
)

data class Section(
    val id: String,
    val projectId: String,
    var name: String,
    var sortOrder: Int,
    val isCustom: Boolean,
)

data class Photo(
    val id: String,
    val projectId: String,
    var sectionId: String,
    var description: String,
    var sortOrder: Int,
    val createdAt: Double,
    var updatedAt: Double,
    var rotation: Int,
    var mimeType: String,
    var width: Int,
    var height: Int,
    var phase: String,
    var originalName: String,
)

data class ProjectSummary(
    val project: Project,
    val photoCount: Int,
    val coverPhotoId: String?,
)

data class Bundle(
    val project: Project,
    val sections: List<Section>,
    val photos: List<Photo>,
)

data class NumberedPhoto(
    val photo: Photo,
    val section: Section,
    val number: Int,
)

val DEFAULT_SECTION_NAMES = listOf(
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
    "Close-up 2",
)

val CUSTOM_SECTION_SUGGESTIONS = listOf(
    "Exterior",
    "Interior",
    "Engine",
    "Damage",
    "Roof",
    "Electrical",
    "Plumbing",
    "Documents",
)

fun todayIsoDate(): String {
    val d = js("new Date()")
    val y = d.getFullYear()
    val m = (d.getMonth() as Int) + 1
    val day = d.getDate() as Int
    return "$y-${pad2(m)}-${pad2(day)}"
}

fun pad2(n: Int): String = if (n < 10) "0$n" else "$n"

fun padPhotoNumber(n: Int): String = if (n < 10) "0$n" else "$n"

fun formatDate(iso: String): String {
    if (iso.isBlank()) return "—"
    val parts = iso.split("-")
    if (parts.size < 3) return iso
    val y = parts[0].toIntOrNull() ?: return iso
    val m = parts[1].toIntOrNull() ?: return iso
    val d = parts[2].toIntOrNull() ?: return iso
    val date = js("new Date(y, m - 1, d)")
    return date.toLocaleDateString(
        js("undefined"),
        js("{ year: 'numeric', month: 'short', day: 'numeric' }"),
    ) as String
}

fun formatDateTime(ms: Double): String {
    val date = js("new Date(ms)")
    return date.toLocaleString(
        js("undefined"),
        js("{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }"),
    ) as String
}

fun sanitizeFilename(name: String): String {
    val cleaned = name
        .replace(Regex("[<>:\"/\\\\|?*\\u0000-\\u001f]"), "")
        .replace(Regex("\\s+"), "_")
        .replace(Regex("_+"), "_")
        .trim('_', '.')
        .take(80)
    return if (cleaned.isBlank()) "Project" else cleaned
}

fun Project.toJs(): dynamic {
    val o = jsObj()
    o.id = id
    o.name = name
    o.description = description
    o.date = date
    o.referenceNumber = referenceNumber
    o.createdAt = createdAt
    o.updatedAt = updatedAt
    o.beforeAfterEnabled = beforeAfterEnabled
    return o
}

fun Section.toJs(): dynamic {
    val o = jsObj()
    o.id = id
    o.projectId = projectId
    o.name = name
    o.sortOrder = sortOrder
    o.isCustom = isCustom
    return o
}

fun Photo.toJs(): dynamic {
    val o = jsObj()
    o.id = id
    o.projectId = projectId
    o.sectionId = sectionId
    o.description = description
    o.sortOrder = sortOrder
    o.createdAt = createdAt
    o.updatedAt = updatedAt
    o.rotation = rotation
    o.mimeType = mimeType
    o.width = width
    o.height = height
    o.phase = phase
    o.originalName = originalName
    return o
}

fun projectFromJs(o: dynamic) = Project(
    id = dynStr(o, "id"),
    name = dynStr(o, "name"),
    description = dynStr(o, "description"),
    date = dynStr(o, "date"),
    referenceNumber = dynStr(o, "referenceNumber"),
    createdAt = dynNum(o, "createdAt"),
    updatedAt = dynNum(o, "updatedAt"),
    beforeAfterEnabled = dynBool(o, "beforeAfterEnabled"),
)

fun sectionFromJs(o: dynamic) = Section(
    id = dynStr(o, "id"),
    projectId = dynStr(o, "projectId"),
    name = dynStr(o, "name"),
    sortOrder = dynInt(o, "sortOrder"),
    isCustom = dynBool(o, "isCustom"),
)

fun photoFromJs(o: dynamic) = Photo(
    id = dynStr(o, "id"),
    projectId = dynStr(o, "projectId"),
    sectionId = dynStr(o, "sectionId"),
    description = dynStr(o, "description"),
    sortOrder = dynInt(o, "sortOrder"),
    createdAt = dynNum(o, "createdAt"),
    updatedAt = dynNum(o, "updatedAt"),
    rotation = dynInt(o, "rotation"),
    mimeType = dynStr(o, "mimeType", "image/jpeg"),
    width = dynInt(o, "width"),
    height = dynInt(o, "height"),
    phase = dynStr(o, "phase", "standard"),
    originalName = dynStr(o, "originalName"),
)
