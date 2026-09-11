package com.fieldframe.shared.export

import com.fieldframe.shared.domain.DEFAULT_SECTION_NAMES
import com.fieldframe.shared.domain.currentTimeMillis
import com.fieldframe.shared.domain.extensionFor
import com.fieldframe.shared.domain.newId
import com.fieldframe.shared.domain.sanitizeFilename
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.ProjectBundle
import com.fieldframe.shared.model.Section

data class PhotoDocPackage(
    val bundle: ProjectBundle,
    val photoBytes: Map<String, ByteArray>,
)

data class ExportedPackage(
    val bytes: ByteArray,
    val filename: String,
) {
    override fun equals(other: Any?): Boolean =
        other is ExportedPackage && bytes.contentEquals(other.bytes) && filename == other.filename

    override fun hashCode(): Int = 31 * bytes.contentHashCode() + filename.hashCode()
}

fun packageFilename(projectName: String): String = "${sanitizeFilename(projectName)}.photodoc"

fun encodePhotoDocJson(bundle: ProjectBundle): String {
    val p = bundle.project
    val sections = bundle.sections.joinToString(",") { s ->
        """{"id":${j(s.id)},"projectId":${j(s.projectId)},"name":${j(s.name)},"sortOrder":${s.sortOrder},"isCustom":${s.isCustom}}"""
    }
    val photos = bundle.photos.joinToString(",") { ph ->
        """{"id":${j(ph.id)},"projectId":${j(ph.projectId)},"sectionId":${j(ph.sectionId)},"description":${j(ph.description)},"sortOrder":${ph.sortOrder},"createdAt":${ph.createdAt},"updatedAt":${ph.updatedAt},"rotation":${ph.rotation},"mimeType":${j(ph.mimeType)},"width":${ph.width},"height":${ph.height},"phase":${j(ph.phase)},"originalName":${j(ph.originalName)}}"""
    }
    return """{"format":"photodoc","version":1,"exportedAt":${j(isoNow())},"project":{"id":${j(p.id)},"name":${j(p.name)},"description":${j(p.description)},"date":${j(p.date)},"referenceNumber":${j(p.referenceNumber)},"createdAt":${p.createdAt},"updatedAt":${p.updatedAt},"beforeAfterEnabled":${p.beforeAfterEnabled}},"sections":[$sections],"photos":[$photos]}"""
}

fun parsePhotoDoc(
    json: String,
    files: Map<String, ByteArray>,
): PhotoDocPackage {
    val root = JsonMap.parse(json)
    if (root.str("format") != "photodoc") {
        error("This file is not a valid Fieldframe package.")
    }
    val src = root.map("project") ?: error("The package is missing required project data.")
    val now = currentTimeMillis()
    val projectId = newId()
    val project = Project(
        id = projectId,
        name = src.str("name").trim().ifEmpty { "Imported project" },
        description = src.str("description"),
        date = src.str("date").ifEmpty { com.fieldframe.shared.domain.todayIsoDate() },
        referenceNumber = src.str("referenceNumber"),
        createdAt = now,
        updatedAt = now,
        beforeAfterEnabled = src.bool("beforeAfterEnabled"),
    )
    val sectionMap = HashMap<String, String>()
    val sections = root.list("sections").map { raw ->
        val id = newId()
        sectionMap[raw.str("id")] = id
        Section(
            id = id,
            projectId = projectId,
            name = raw.str("name").ifEmpty { "Section" },
            sortOrder = raw.int("sortOrder"),
            isCustom = raw.bool("isCustom"),
        )
    }.ifEmpty {
        DEFAULT_SECTION_NAMES.mapIndexed { index, name ->
            Section(newId(), projectId, name, index, false)
        }
    }
    val photos = ArrayList<Photo>()
    val bytes = HashMap<String, ByteArray>()
    for (raw in root.list("photos")) {
        val oldId = raw.str("id")
        val sectionId = sectionMap[raw.str("sectionId")] ?: continue
        val id = newId()
        val ext = extensionFor(raw.str("mimeType"), raw.str("originalName"))
        val file = files["photos/$oldId.$ext"]
            ?: files.entries.firstOrNull { it.key.startsWith("photos/$oldId.") }?.value
            ?: continue
        photos += Photo(
            id = id,
            projectId = projectId,
            sectionId = sectionId,
            description = raw.str("description"),
            sortOrder = raw.int("sortOrder"),
            createdAt = now,
            updatedAt = now,
            rotation = raw.int("rotation"),
            mimeType = raw.str("mimeType").ifEmpty { "image/jpeg" },
            width = raw.int("width"),
            height = raw.int("height"),
            phase = raw.str("phase").ifEmpty { "standard" },
            originalName = raw.str("originalName").ifEmpty { "photo-$id.jpg" },
        )
        bytes[id] = file
    }
    return PhotoDocPackage(ProjectBundle(project, sections, photos), bytes)
}

fun zipPhotoDoc(bundle: ProjectBundle, photoBytes: Map<String, ByteArray>): ByteArray {
    val entries = LinkedHashMap<String, ByteArray>()
    entries["project.json"] = encodePhotoDocJson(bundle).encodeToByteArray()
    for (photo in bundle.photos) {
        val data = photoBytes[photo.id] ?: continue
        val ext = extensionFor(photo.mimeType, photo.originalName)
        entries["photos/${photo.id}.$ext"] = data
    }
    return ZipStore.encode(entries)
}

fun unzipPhotoDoc(bytes: ByteArray): PhotoDocPackage {
    val entries = ZipStore.decode(bytes)
    val json = entries["project.json"]?.decodeToString()
        ?: error("This file is not a valid Fieldframe package.")
    return parsePhotoDoc(json, entries)
}

private fun j(value: String): String = buildString {
    append('"')
    for (ch in value) {
        when (ch) {
            '\\' -> append("\\\\")
            '"' -> append("\\\"")
            '\n' -> append("\\n")
            '\r' -> append("\\r")
            '\t' -> append("\\t")
            else -> if (ch.code < 32) append("\\u").append(ch.code.toString(16).padStart(4, '0')) else append(ch)
        }
    }
    append('"')
}

private fun isoNow(): String {
    val ms = currentTimeMillis()
    val days = ms / 86_400_000L
    val rem = (ms % 86_400_000L).toInt()
    val h = rem / 3_600_000
    val m = (rem % 3_600_000) / 60_000
    val s = (rem % 60_000) / 1000
    val ymd = com.fieldframe.shared.domain.todayIsoDate(ms)
    return "${ymd}T${pad(h)}:${pad(m)}:${pad(s)}Z"
}

private fun pad(n: Int) = if (n < 10) "0$n" else "$n"
