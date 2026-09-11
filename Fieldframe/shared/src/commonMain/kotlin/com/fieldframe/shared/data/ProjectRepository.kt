package com.fieldframe.shared.data

import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.ProjectBundle
import com.fieldframe.shared.model.ProjectSummary
import com.fieldframe.shared.model.Section
import kotlinx.coroutines.flow.Flow

interface ProjectRepository {
    fun observeSummaries(query: String): Flow<List<ProjectSummary>>
    fun observeBundle(projectId: String): Flow<ProjectBundle?>

    suspend fun getBundle(projectId: String): ProjectBundle?
    suspend fun createProject(
        name: String,
        description: String,
        date: String,
        referenceNumber: String,
        beforeAfter: Boolean,
    ): Project

    suspend fun updateProject(project: Project)
    suspend fun deleteProject(id: String)

    suspend fun addSection(projectId: String, name: String): Section
    suspend fun renameSection(id: String, name: String)
    suspend fun deleteSection(id: String)

    suspend fun addPhotos(
        projectId: String,
        sectionId: String,
        images: List<ImageBytes>,
        phase: String,
    ): List<Photo>

    suspend fun replacePhoto(photoId: String, image: ImageBytes)
    suspend fun updatePhoto(photo: Photo)
    suspend fun rotatePhoto(photoId: String, delta: Int)
    suspend fun deletePhoto(photoId: String)
    suspend fun movePhoto(photoId: String, sectionId: String, phase: String?)
    suspend fun shiftPhoto(photoId: String, direction: Int)

    suspend fun getPhotoBytes(photoId: String): ByteArray?
    suspend fun getThumbBytes(photoId: String): ByteArray?

    suspend fun importBundle(bundle: ProjectBundle, photoBytes: Map<String, ByteArray>): Project
}
