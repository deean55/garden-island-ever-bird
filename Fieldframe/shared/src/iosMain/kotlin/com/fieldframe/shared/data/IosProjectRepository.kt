package com.fieldframe.shared.data

import com.fieldframe.shared.domain.DEFAULT_SECTION_NAMES
import com.fieldframe.shared.domain.currentTimeMillis
import com.fieldframe.shared.domain.newId
import com.fieldframe.shared.domain.sortPhotos
import com.fieldframe.shared.domain.sortSections
import com.fieldframe.shared.domain.todayIsoDate
import com.fieldframe.shared.export.JsonMap
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.ProjectBundle
import com.fieldframe.shared.model.ProjectSummary
import com.fieldframe.shared.model.Section
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class IosProjectRepository(
    private val files: IosFileStore = IosFileStore(),
) : ProjectRepository {

    private val mutex = Mutex()
    private val snapshot = MutableStateFlow(load())

    override fun observeSummaries(query: String): Flow<List<ProjectSummary>> {
        val needle = query.trim().lowercase()
        return snapshot.map { snap ->
            val byProject = snap.photos.groupBy { it.projectId }
            snap.projects
                .filter {
                    needle.isEmpty() ||
                        "${it.name} ${it.description} ${it.referenceNumber}".lowercase().contains(needle)
                }
                .sortedByDescending { it.updatedAt }
                .map { project ->
                    val list = sortPhotos(byProject[project.id] ?: emptyList())
                    ProjectSummary(project, list.size, list.firstOrNull()?.id)
                }
        }
    }

    override fun observeBundle(projectId: String): Flow<ProjectBundle?> =
        snapshot.map { it.bundle(projectId) }

    override suspend fun getBundle(projectId: String): ProjectBundle? = snapshot.value.bundle(projectId)

    override suspend fun createProject(
        name: String,
        description: String,
        date: String,
        referenceNumber: String,
        beforeAfter: Boolean,
    ): Project = mutate { snap ->
        val now = currentTimeMillis()
        val project = Project(
            id = newId(),
            name = name.trim().ifEmpty { "Untitled project" },
            description = description.trim(),
            date = date.ifEmpty { todayIsoDate() },
            referenceNumber = referenceNumber.trim(),
            createdAt = now,
            updatedAt = now,
            beforeAfterEnabled = beforeAfter,
        )
        val sections = DEFAULT_SECTION_NAMES.mapIndexed { index, sectionName ->
            Section(newId(), project.id, sectionName, index, false)
        }
        snap.copy(projects = snap.projects + project, sections = snap.sections + sections) to project
    }

    override suspend fun updateProject(project: Project) {
        mutate { snap ->
            val next = project.copy(updatedAt = currentTimeMillis())
            snap.copy(projects = snap.projects.map { if (it.id == next.id) next else it }) to Unit
        }
    }

    override suspend fun deleteProject(id: String) {
        mutate { snap ->
            val ids = snap.photos.filter { it.projectId == id }.map { it.id }
            ids.forEach { files.deletePhoto(it) }
            snap.copy(
                projects = snap.projects.filterNot { it.id == id },
                sections = snap.sections.filterNot { it.projectId == id },
                photos = snap.photos.filterNot { it.projectId == id },
            ) to Unit
        }
    }

    override suspend fun addSection(projectId: String, name: String): Section = mutate { snap ->
        val max = snap.sections.filter { it.projectId == projectId }.maxOfOrNull { it.sortOrder } ?: -1
        val section = Section(newId(), projectId, name.trim().ifEmpty { "Custom" }, max + 1, true)
        snap.copy(
            sections = snap.sections + section,
            projects = snap.touch(projectId),
        ) to section
    }

    override suspend fun renameSection(id: String, name: String) {
        mutate { snap ->
            val current = snap.sections.find { it.id == id } ?: return@mutate snap to Unit
            snap.copy(
                sections = snap.sections.map {
                    if (it.id == id) it.copy(name = name.trim().ifEmpty { it.name }) else it
                },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun deleteSection(id: String) {
        mutate { snap ->
            val current = snap.sections.find { it.id == id } ?: return@mutate snap to Unit
            val ids = snap.photos.filter { it.sectionId == id }.map { it.id }
            ids.forEach { files.deletePhoto(it) }
            snap.copy(
                sections = snap.sections.filterNot { it.id == id },
                photos = snap.photos.filterNot { it.sectionId == id },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun addPhotos(
        projectId: String,
        sectionId: String,
        imagesList: List<ImageBytes>,
        phase: String,
    ): List<Photo> = mutate { snap ->
        var order = snap.photos.filter { it.sectionId == sectionId }.maxOfOrNull { it.sortOrder } ?: -1
        val created = ArrayList<Photo>()
        for (image in imagesList) {
            val (w, h) = IosImages.size(image.bytes)
            val id = newId()
            val now = currentTimeMillis()
            order += 1
            val photo = Photo(
                id = id,
                projectId = projectId,
                sectionId = sectionId,
                description = "",
                sortOrder = order,
                createdAt = now,
                updatedAt = now,
                rotation = 0,
                mimeType = image.mimeType.ifEmpty { "image/jpeg" },
                width = w,
                height = h,
                phase = phase,
                originalName = image.filename.ifEmpty { "capture-$id.jpg" },
            )
            files.writePhoto(id, image.bytes)
            files.writeThumb(id, IosImages.thumbnail(image.bytes, 0))
            created += photo
        }
        snap.copy(
            photos = snap.photos + created,
            projects = snap.touch(projectId),
        ) to created
    }

    override suspend fun replacePhoto(photoId: String, image: ImageBytes) {
        mutate { snap ->
            val current = snap.photos.find { it.id == photoId } ?: return@mutate snap to Unit
            val (w, h) = IosImages.size(image.bytes)
            files.writePhoto(photoId, image.bytes)
            files.writeThumb(photoId, IosImages.thumbnail(image.bytes, current.rotation))
            val next = current.copy(
                mimeType = image.mimeType.ifEmpty { current.mimeType },
                width = w,
                height = h,
                updatedAt = currentTimeMillis(),
                originalName = image.filename.ifEmpty { current.originalName },
            )
            snap.copy(
                photos = snap.photos.map { if (it.id == photoId) next else it },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun updatePhoto(photo: Photo) {
        mutate { snap ->
            snap.copy(
                photos = snap.photos.map { if (it.id == photo.id) photo.copy(updatedAt = currentTimeMillis()) else it },
                projects = snap.touch(photo.projectId),
            ) to Unit
        }
    }

    override suspend fun rotatePhoto(photoId: String, delta: Int) {
        mutate { snap ->
            val current = snap.photos.find { it.id == photoId } ?: return@mutate snap to Unit
            val nextRot = ((current.rotation + delta) % 360 + 360) % 360
            files.readPhoto(photoId)?.let { files.writeThumb(photoId, IosImages.thumbnail(it, nextRot)) }
            snap.copy(
                photos = snap.photos.map {
                    if (it.id == photoId) it.copy(rotation = nextRot, updatedAt = currentTimeMillis()) else it
                },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun deletePhoto(photoId: String) {
        mutate { snap ->
            val current = snap.photos.find { it.id == photoId } ?: return@mutate snap to Unit
            files.deletePhoto(photoId)
            snap.copy(
                photos = snap.photos.filterNot { it.id == photoId },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun movePhoto(photoId: String, sectionId: String, phase: String?) {
        mutate { snap ->
            val current = snap.photos.find { it.id == photoId } ?: return@mutate snap to Unit
            val max = snap.photos.filter { it.sectionId == sectionId && it.id != photoId }.maxOfOrNull { it.sortOrder } ?: -1
            snap.copy(
                photos = snap.photos.map {
                    if (it.id == photoId) it.copy(
                        sectionId = sectionId,
                        sortOrder = max + 1,
                        phase = phase ?: it.phase,
                        updatedAt = currentTimeMillis(),
                    ) else it
                },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun shiftPhoto(photoId: String, direction: Int) {
        mutate { snap ->
            val current = snap.photos.find { it.id == photoId } ?: return@mutate snap to Unit
            val siblings = sortPhotos(snap.photos.filter { it.sectionId == current.sectionId && it.phase == current.phase })
            val index = siblings.indexOfFirst { it.id == photoId }
            val swap = siblings.getOrNull(index + direction) ?: return@mutate snap to Unit
            val now = currentTimeMillis()
            snap.copy(
                photos = snap.photos.map {
                    when (it.id) {
                        current.id -> it.copy(sortOrder = swap.sortOrder, updatedAt = now)
                        swap.id -> it.copy(sortOrder = current.sortOrder, updatedAt = now)
                        else -> it
                    }
                },
                projects = snap.touch(current.projectId),
            ) to Unit
        }
    }

    override suspend fun getPhotoBytes(photoId: String): ByteArray? = files.readPhoto(photoId)

    override suspend fun getThumbBytes(photoId: String): ByteArray? = files.readThumb(photoId)

    override suspend fun importBundle(
        bundle: ProjectBundle,
        photoBytes: Map<String, ByteArray>,
    ): Project = mutate { snap ->
        for (photo in bundle.photos) {
            val bytes = photoBytes[photo.id] ?: continue
            files.writePhoto(photo.id, bytes)
            runCatching { files.writeThumb(photo.id, IosImages.thumbnail(bytes, photo.rotation)) }
        }
        snap.copy(
            projects = snap.projects + bundle.project,
            sections = snap.sections + bundle.sections,
            photos = snap.photos + bundle.photos,
        ) to bundle.project
    }

    private data class Snap(
        val projects: List<Project> = emptyList(),
        val sections: List<Section> = emptyList(),
        val photos: List<Photo> = emptyList(),
    ) {
        fun bundle(id: String): ProjectBundle? {
            val project = projects.find { it.id == id } ?: return null
            return ProjectBundle(
                project,
                sortSections(sections.filter { it.projectId == id }),
                sortPhotos(photos.filter { it.projectId == id }),
            )
        }

        fun touch(projectId: String): List<Project> {
            val now = currentTimeMillis()
            return projects.map { if (it.id == projectId) it.copy(updatedAt = now) else it }
        }
    }

    private suspend fun <T> mutate(block: (Snap) -> Pair<Snap, T>): T = mutex.withLock {
        val (next, result) = block(snapshot.value)
        snapshot.value = next
        persist(next)
        result
    }

    private fun load(): Snap {
        val json = files.readIndex() ?: return Snap()
        return runCatching { parseSnap(json) }.getOrElse { Snap() }
    }

    private fun persist(snap: Snap) {
        files.writeIndex(encodeSnap(snap))
    }

    private fun encodeSnap(snap: Snap): String {
        fun p(pr: Project) =
            """{"id":${q(pr.id)},"name":${q(pr.name)},"description":${q(pr.description)},"date":${q(pr.date)},"referenceNumber":${q(pr.referenceNumber)},"createdAt":${pr.createdAt},"updatedAt":${pr.updatedAt},"beforeAfterEnabled":${pr.beforeAfterEnabled}}"""
        fun s(sec: Section) =
            """{"id":${q(sec.id)},"projectId":${q(sec.projectId)},"name":${q(sec.name)},"sortOrder":${sec.sortOrder},"isCustom":${sec.isCustom}}"""
        fun ph(photo: Photo) =
            """{"id":${q(photo.id)},"projectId":${q(photo.projectId)},"sectionId":${q(photo.sectionId)},"description":${q(photo.description)},"sortOrder":${photo.sortOrder},"createdAt":${photo.createdAt},"updatedAt":${photo.updatedAt},"rotation":${photo.rotation},"mimeType":${q(photo.mimeType)},"width":${photo.width},"height":${photo.height},"phase":${q(photo.phase)},"originalName":${q(photo.originalName)}}"""
        return """{"projects":[${snap.projects.joinToString(",") { p(it) }}],"sections":[${snap.sections.joinToString(",") { s(it) }}],"photos":[${snap.photos.joinToString(",") { ph(it) }}]}"""
    }

    private fun parseSnap(json: String): Snap {
        val root = JsonMap.parse(json)
        val projects = root.list("projects").map {
            Project(
                it.str("id"), it.str("name"), it.str("description"), it.str("date"),
                it.str("referenceNumber"), it.int("createdAt").toLong(), it.int("updatedAt").toLong(),
                it.bool("beforeAfterEnabled"),
            )
        }
        // createdAt may exceed Int — parse via string if needed
        val projectsFixed = root.list("projects").map {
            Project(
                id = it.str("id"),
                name = it.str("name"),
                description = it.str("description"),
                date = it.str("date"),
                referenceNumber = it.str("referenceNumber"),
                createdAt = it.long("createdAt"),
                updatedAt = it.long("updatedAt"),
                beforeAfterEnabled = it.bool("beforeAfterEnabled"),
            )
        }
        val sections = root.list("sections").map {
            Section(it.str("id"), it.str("projectId"), it.str("name"), it.int("sortOrder"), it.bool("isCustom"))
        }
        val photos = root.list("photos").map {
            Photo(
                id = it.str("id"),
                projectId = it.str("projectId"),
                sectionId = it.str("sectionId"),
                description = it.str("description"),
                sortOrder = it.int("sortOrder"),
                createdAt = it.long("createdAt"),
                updatedAt = it.long("updatedAt"),
                rotation = it.int("rotation"),
                mimeType = it.str("mimeType").ifEmpty { "image/jpeg" },
                width = it.int("width"),
                height = it.int("height"),
                phase = it.str("phase").ifEmpty { "standard" },
                originalName = it.str("originalName"),
            )
        }
        return Snap(projectsFixed.ifEmpty { projects }, sections, photos)
    }

    private fun q(value: String): String = buildString {
        append('"')
        for (ch in value) {
            when (ch) {
                '\\' -> append("\\\\")
                '"' -> append("\\\"")
                '\n' -> append("\\n")
                '\r' -> append("\\r")
                '\t' -> append("\\t")
                else -> append(ch)
            }
        }
        append('"')
    }
}
