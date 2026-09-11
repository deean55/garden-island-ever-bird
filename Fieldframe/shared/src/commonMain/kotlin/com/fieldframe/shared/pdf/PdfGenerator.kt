package com.fieldframe.shared.pdf

import com.fieldframe.shared.domain.sanitizeFilename
import com.fieldframe.shared.model.ProjectBundle

data class GeneratedPdf(
    val bytes: ByteArray,
    val filename: String,
) {
    override fun equals(other: Any?): Boolean =
        other is GeneratedPdf && bytes.contentEquals(other.bytes) && filename == other.filename

    override fun hashCode(): Int = 31 * bytes.contentHashCode() + filename.hashCode()
}

interface PdfGenerator {
    suspend fun generate(bundle: ProjectBundle, photoBytes: Map<String, ByteArray>): GeneratedPdf
}

fun pdfFilename(projectName: String): String = "${sanitizeFilename(projectName)}.pdf"
