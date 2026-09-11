package com.fieldframe.shared.model

data class Project(
    val id: String,
    val name: String,
    val description: String,
    val date: String,
    val referenceNumber: String,
    val createdAt: Long,
    val updatedAt: Long,
    val beforeAfterEnabled: Boolean,
)

data class Section(
    val id: String,
    val projectId: String,
    val name: String,
    val sortOrder: Int,
    val isCustom: Boolean,
)

data class Photo(
    val id: String,
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

data class ProjectSummary(
    val project: Project,
    val photoCount: Int,
    val coverPhotoId: String?,
)

data class ProjectBundle(
    val project: Project,
    val sections: List<Section>,
    val photos: List<Photo>,
)

data class NumberedPhoto(
    val photo: Photo,
    val section: Section,
    val number: Int,
)

data class ImageBytes(
    val bytes: ByteArray,
    val mimeType: String,
    val filename: String,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ImageBytes) return false
        return bytes.contentEquals(other.bytes) && mimeType == other.mimeType && filename == other.filename
    }

    override fun hashCode(): Int {
        var result = bytes.contentHashCode()
        result = 31 * result + mimeType.hashCode()
        result = 31 * result + filename.hashCode()
        return result
    }
}

object PhotoPhase {
    const val STANDARD = "standard"
    const val BEFORE = "before"
    const val AFTER = "after"
}
