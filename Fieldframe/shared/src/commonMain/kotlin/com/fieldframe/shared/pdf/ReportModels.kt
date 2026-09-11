package com.fieldframe.shared.pdf

import com.fieldframe.shared.domain.numberPhotosForPdf
import com.fieldframe.shared.domain.padPhotoNumber
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.Section

data class ReportPage(
    val kind: Kind,
    val title: String = "",
    val subtitle: String = "",
    val photoId: String? = null,
    val rotation: Int = 0,
    val description: String = "",
    val photoNumber: Int = 0,
    val sectionName: String = "",
) {
    enum class Kind { COVER, DIVIDER, PHOTO }
}

data class ReportSpec(
    val project: Project,
    val pages: List<ReportPage>,
) {
    val pageCount: Int get() = pages.size
}

fun buildReportSpec(project: Project, sections: List<Section>, photos: List<Photo>): ReportSpec {
    val pages = ArrayList<ReportPage>()
    pages += ReportPage(
        kind = ReportPage.Kind.COVER,
        title = project.name.ifBlank { "Untitled project" },
        subtitle = project.description,
    )
    val groups = numberPhotosForPdf(project, sections, photos)
    if (project.beforeAfterEnabled) {
        for ((label, items) in groups) {
            if (items.isEmpty()) continue
            pages += ReportPage(kind = ReportPage.Kind.DIVIDER, title = label)
            for (item in items) {
                pages += ReportPage(
                    kind = ReportPage.Kind.PHOTO,
                    title = item.section.name,
                    photoId = item.photo.id,
                    rotation = item.photo.rotation,
                    description = item.photo.description,
                    photoNumber = item.number,
                    sectionName = item.section.name,
                )
            }
        }
    } else {
        for (item in groups.first().second) {
            pages += ReportPage(
                kind = ReportPage.Kind.PHOTO,
                title = item.section.name,
                photoId = item.photo.id,
                rotation = item.photo.rotation,
                description = item.photo.description,
                photoNumber = item.number,
                sectionName = item.section.name,
            )
        }
    }
    return ReportSpec(project, pages)
}

fun photoCaption(number: Int): String = "Photo ${padPhotoNumber(number)}"
