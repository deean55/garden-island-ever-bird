package com.fieldframe.shared.domain

import com.fieldframe.shared.model.NumberedPhoto
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.PhotoPhase
import com.fieldframe.shared.model.Project
import com.fieldframe.shared.model.Section

fun sortSections(sections: List<Section>): List<Section> =
    sections.sortedWith(compareBy<Section> { it.sortOrder }.thenBy { it.name })

fun sortPhotos(photos: List<Photo>): List<Photo> =
    photos.sortedWith(compareBy<Photo> { it.sortOrder }.thenBy { it.createdAt })

fun numberPhotos(sections: List<Section>, photos: List<Photo>): List<NumberedPhoto> {
    val result = ArrayList<NumberedPhoto>()
    var n = 1
    for (section in sortSections(sections)) {
        for (photo in sortPhotos(photos.filter { it.sectionId == section.id })) {
            result.add(NumberedPhoto(photo, section, n))
            n += 1
        }
    }
    return result
}

fun numberPhotosForPdf(
    project: Project,
    sections: List<Section>,
    photos: List<Photo>,
): List<Pair<String, List<NumberedPhoto>>> {
    if (!project.beforeAfterEnabled) {
        return listOf("Photographs" to numberPhotos(sections, photos))
    }
    val before = numberPhotos(sections, photos.filter { it.phase != PhotoPhase.AFTER })
    val after = numberPhotos(sections, photos.filter { it.phase == PhotoPhase.AFTER }).mapIndexed { index, item ->
        item.copy(number = before.size + index + 1)
    }
    return listOf("BEFORE" to before, "AFTER" to after)
}

fun padPhotoNumber(n: Int): String = if (n < 10) "0$n" else "$n"

fun pad2(n: Int): String = if (n < 10) "0$n" else "$n"
