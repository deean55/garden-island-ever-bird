package com.fieldframe.shared.pdf

import com.fieldframe.shared.data.IosFileStore
import com.fieldframe.shared.data.IosImages

class IosPdfGenerator(
    private val files: IosFileStore,
) : PdfGenerator by SimplePdfGenerator({ photoId, rotation ->
    files.readPhoto(photoId)?.let { IosImages.jpeg(it, rotation) }
})
