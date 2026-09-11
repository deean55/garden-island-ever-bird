package com.fieldframe.shared.data

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.Section

@Entity(tableName = "projects")
data class ProjectEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val date: String,
    val referenceNumber: String,
    val createdAt: Long,
    val updatedAt: Long,
    val beforeAfterEnabled: Boolean,
)

@Entity(
    tableName = "sections",
    indices = [Index("projectId")],
)
data class SectionEntity(
    @PrimaryKey val id: String,
    val projectId: String,
    val name: String,
    val sortOrder: Int,
    val isCustom: Boolean,
)

@Entity(
    tableName = "photos",
    indices = [Index("projectId"), Index("sectionId")],
)
data class PhotoEntity(
    @PrimaryKey val id: String,
    val projectId: String,
    val sectionId: String,
    val description: String,
    val sortOrder: Int,
    val createdAt: Long,
    val updatedAt: Long,
    val rotation: Int,
    val mimeType: String,
    val width: Int,
    val height: Int,
    val phase: String,
    val originalName: String,
)

fun ProjectEntity.toModel() = Project(
    id, name, description, date, referenceNumber, createdAt, updatedAt, beforeAfterEnabled,
)

fun Project.toEntity() = ProjectEntity(
    id, name, description, date, referenceNumber, createdAt, updatedAt, beforeAfterEnabled,
)

fun SectionEntity.toModel() = Section(id, projectId, name, sortOrder, isCustom)

fun Section.toEntity() = SectionEntity(id, projectId, name, sortOrder, isCustom)

fun PhotoEntity.toModel() = Photo(
    id, projectId, sectionId, description, sortOrder, createdAt, updatedAt,
    rotation, mimeType, width, height, phase, originalName,
)

fun Photo.toEntity() = PhotoEntity(
    id, projectId, sectionId, description, sortOrder, createdAt, updatedAt,
    rotation, mimeType, width, height, phase, originalName,
)
