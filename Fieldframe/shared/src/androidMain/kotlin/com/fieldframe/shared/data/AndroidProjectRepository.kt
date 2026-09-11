package com.fieldframe.shared.data

import androidx.room.withTransaction
import com.fieldframe.shared.domain.DEFAULT_SECTION_NAMES
import com.fieldframe.shared.domain.currentTimeMillis
import com.fieldframe.shared.domain.newId
import com.fieldframe.shared.domain.sortPhotos
import com.fieldframe.shared.domain.todayIsoDate
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.ProjectBundle
import com.fieldframe.shared.model.ProjectSummary
import com.fieldframe.shared.model.Section
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.withContext

class AndroidProjectRepository(
    private val db: FieldframeDatabase,
    private val images: AndroidImageStore,
) : ProjectRepository {

    private val projects get() = db.projects()
    private val sections get() = db.sections()
    private val photos get() = db.photos()

    override fun observeSummaries(query: String): Flow<List<ProjectSummary>> {
        val needle = query.trim().lowercase()
        return combine(projects.observeAll(), photos.observeAll()) { projectRows, photoRows ->
            val byProject = photoRows.groupBy { it.projectId }
            projectRows
                .filter { entity ->
                    needle.isEmpty() ||
                        "${entity.name} ${entity.description} ${entity.referenceNumber}"
                            .lowercase()
                            .contains(needle)
                }
                .map { entity ->
                    val list = sortPhotos((byProject[entity.id] ?: emptyList()).map { it.toModel() })
                    ProjectSummary(entity.toModel(), list.size, list.firstOrNull()?.id)
                }
        }
    }

    override fun observeBundle(projectId: String): Flow<ProjectBundle?> {
        return combine(
            projects.observeById(projectId),
            sections.observeByProject(projectId),
            photos.observeByProject(projectId),
        ) { project, sectionRows, photoRows ->
            project?.let {
                ProjectBundle(
                    it.toModel(),
                    sectionRows.map { s -> s.toModel() },
                    photoRows.map { p -> p.toModel() },
                )
            }
        }
    }

    override suspend fun getBundle(projectId: String): ProjectBundle? = withContext(Dispatchers.IO) {
        val project = projects.get(projectId) ?: return@withContext null
        ProjectBundle(
            project.toModel(),
            sections.listByProject(projectId).map { it.toModel() },
            photos.listByProject(projectId).map { it.toModel() },
        )
    }

    override suspend fun createProject(
        name: String,
        description: String,
        date: String,
        referenceNumber: String,
        beforeAfter: Boolean,
    ): Project = withContext(Dispatchers.IO) {
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
        val sectionEntities = DEFAULT_SECTION_NAMES.mapIndexed { index, sectionName ->
            Section(newId(), project.id, sectionName, index, false).toEntity()
        }
        db.withTransaction {
            projects.upsert(project.toEntity())
            sections.upsertAll(sectionEntities)
        }
        project
    }

    override suspend fun updateProject(project: Project) = withContext(Dispatchers.IO) {
        projects.upsert(project.copy(updatedAt = currentTimeMillis()).toEntity())
    }

    override suspend fun deleteProject(id: String) = withContext(Dispatchers.IO) {
        val ids = photos.listByProject(id).map { it.id }
        db.withTransaction {
            photos.deleteByProject(id)
            sections.deleteByProject(id)
            projects.delete(id)
        }
        images.deleteAll(ids)
    }

    override suspend fun addSection(projectId: String, name: String): Section = withContext(Dispatchers.IO) {
        val max = sections.listByProject(projectId).maxOfOrNull { it.sortOrder } ?: -1
        val section = Section(newId(), projectId, name.trim().ifEmpty { "Custom" }, max + 1, true)
        sections.upsert(section.toEntity())
        touch(projectId)
        section
    }

    override suspend fun renameSection(id: String, name: String) = withContext(Dispatchers.IO) {
        val current = sections.get(id) ?: return@withContext
        sections.update(current.copy(name = name.trim().ifEmpty { current.name }))
        touch(current.projectId)
    }

    override suspend fun deleteSection(id: String) = withContext(Dispatchers.IO) {
        val current = sections.get(id) ?: return@withContext
        val ids = photos.listBySection(id).map { it.id }
        db.withTransaction {
            photos.deleteBySection(id)
            sections.delete(id)
        }
        images.deleteAll(ids)
        touch(current.projectId)
    }

    override suspend fun addPhotos(
        projectId: String,
        sectionId: String,
        imagesList: List<ImageBytes>,
        phase: String,
    ): List<Photo> = withContext(Dispatchers.IO) {
        val existing = photos.listBySection(sectionId)
        var order = existing.maxOfOrNull { it.sortOrder } ?: -1
        val created = ArrayList<Photo>()
        for (image in imagesList) {
            val (w, h) = images.decodeBounds(image.bytes)
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
            images.writePhoto(id, image.bytes)
            images.writeThumb(id, images.makeThumbnail(image.bytes, 0))
            photos.upsert(photo.toEntity())
            created += photo
        }
        touch(projectId)
        created
    }

    override suspend fun replacePhoto(photoId: String, image: ImageBytes) = withContext(Dispatchers.IO) {
        val current = photos.get(photoId) ?: return@withContext
        val (w, h) = images.decodeBounds(image.bytes)
        val updated = current.copy(
            mimeType = image.mimeType.ifEmpty { current.mimeType },
            width = w,
            height = h,
            updatedAt = currentTimeMillis(),
            originalName = image.filename.ifEmpty { current.originalName },
        )
        images.writePhoto(photoId, image.bytes)
        images.writeThumb(photoId, images.makeThumbnail(image.bytes, updated.rotation))
        photos.upsert(updated)
        touch(current.projectId)
    }

    override suspend fun updatePhoto(photo: Photo) = withContext(Dispatchers.IO) {
        photos.upsert(photo.copy(updatedAt = currentTimeMillis()).toEntity())
        touch(photo.projectId)
    }

    override suspend fun rotatePhoto(photoId: String, delta: Int) = withContext(Dispatchers.IO) {
        val current = photos.get(photoId) ?: return@withContext
        val next = ((current.rotation + delta) % 360 + 360) % 360
        val bytes = images.readPhoto(photoId)
        if (bytes != null) {
            images.writeThumb(photoId, images.makeThumbnail(bytes, next))
        }
        photos.upsert(current.copy(rotation = next, updatedAt = currentTimeMillis()))
        touch(current.projectId)
    }

    override suspend fun deletePhoto(photoId: String) = withContext(Dispatchers.IO) {
        val current = photos.get(photoId) ?: return@withContext
        photos.delete(photoId)
        images.deletePhoto(photoId)
        touch(current.projectId)
    }

    override suspend fun movePhoto(photoId: String, sectionId: String, phase: String?) = withContext(Dispatchers.IO) {
        val current = photos.get(photoId) ?: return@withContext
        val max = photos.listBySection(sectionId)
            .filter { it.id != photoId }
            .maxOfOrNull { it.sortOrder } ?: -1
        photos.upsert(
            current.copy(
                sectionId = sectionId,
                sortOrder = max + 1,
                phase = phase ?: current.phase,
                updatedAt = currentTimeMillis(),
            ),
        )
        touch(current.projectId)
    }

    override suspend fun shiftPhoto(photoId: String, direction: Int) = withContext(Dispatchers.IO) {
        val current = photos.get(photoId) ?: return@withContext
        val siblings = sortPhotos(
            photos.listBySection(current.sectionId)
                .map { it.toModel() }
                .filter { it.phase == current.phase },
        )
        val index = siblings.indexOfFirst { it.id == photoId }
        val swap = siblings.getOrNull(index + direction) ?: return@withContext
        val now = currentTimeMillis()
        photos.upsert(current.copy(sortOrder = swap.sortOrder, updatedAt = now))
        photos.upsert(swap.toEntity().copy(sortOrder = current.sortOrder, updatedAt = now))
        touch(current.projectId)
    }

    override suspend fun getPhotoBytes(photoId: String): ByteArray? = withContext(Dispatchers.IO) {
        images.readPhoto(photoId)
    }

    override suspend fun getThumbBytes(photoId: String): ByteArray? = withContext(Dispatchers.IO) {
        images.readThumb(photoId)
    }

    override suspend fun importBundle(
        bundle: ProjectBundle,
        photoBytes: Map<String, ByteArray>,
    ): Project = withContext(Dispatchers.IO) {
        db.withTransaction {
            projects.upsert(bundle.project.toEntity())
            sections.upsertAll(bundle.sections.map { it.toEntity() })
            photos.upsertAll(bundle.photos.map { it.toEntity() })
        }
        for (photo in bundle.photos) {
            val bytes = photoBytes[photo.id] ?: continue
            images.writePhoto(photo.id, bytes)
            runCatching { images.writeThumb(photo.id, images.makeThumbnail(bytes, photo.rotation)) }
        }
        bundle.project
    }

    private suspend fun touch(projectId: String) {
        val current = projects.get(projectId) ?: return
        projects.upsert(current.copy(updatedAt = currentTimeMillis()))
    }
}
