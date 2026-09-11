package com.fieldframe.shared.pdf

import com.fieldframe.shared.domain.pad2
import com.fieldframe.shared.model.ProjectBundle

/**
 * Minimal PDF 1.4 writer used on iOS. Embeds JPEG images and Helvetica.
 * Android uses [AndroidPdfGenerator] / PdfDocument instead.
 */
class SimplePdfGenerator(
    private val jpegForPhoto: suspend (photoId: String, rotation: Int) -> ByteArray?,
) : PdfGenerator {

    override suspend fun generate(
        bundle: ProjectBundle,
        photoBytes: Map<String, ByteArray>,
    ): GeneratedPdf {
        val spec = buildReportSpec(bundle.project, bundle.sections, bundle.photos)
        val writer = PdfWriter()
        spec.pages.forEachIndexed { index, page ->
            when (page.kind) {
                ReportPage.Kind.COVER -> writer.addCover(spec, page)
                ReportPage.Kind.DIVIDER -> writer.addDivider(spec, page, index + 1)
                ReportPage.Kind.PHOTO -> {
                    val jpeg = page.photoId?.let { jpegForPhoto(it, page.rotation) }
                    writer.addPhoto(spec, page, jpeg, index + 1)
                }
            }
        }
        return GeneratedPdf(writer.toByteArray(), pdfFilename(bundle.project.name))
    }
}

private const val W = 595.0
private const val H = 842.0
private const val M = 48.0

private class PdfWriter {
    private val objects = ArrayList<ByteArray>()
    private val pages = ArrayList<Int>()

    init {
        objects += "%PDF-1.4\n".encodeToByteArray() // placeholder, rebuilt at end
        objects += "<< /Type /Catalog /Pages 2 0 R >>".encodeToByteArray()
        objects += ByteArray(0) // pages tree filled later
        objects += "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>".encodeToByteArray()
        objects += "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>".encodeToByteArray()
        objects += "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>".encodeToByteArray()
    }

    fun addCover(spec: ReportSpec, page: ReportPage) {
        val sb = StringBuilder()
        pageOp(sb)
        text(sb, "F2", 9, M, H - 72, "FIELDFRAME")
        var y = H - 120
        for (line in wrap(page.title, 28.0, W - M * 2)) {
            text(sb, "F3", 28, M, y, line)
            y -= 34
        }
        y -= 8
        if (page.subtitle.isNotBlank()) {
            for (line in wrap(page.subtitle, 11.0, W - M * 2).take(8)) {
                text(sb, "F1", 11, M, y, line)
                y -= 16
            }
        }
        y -= 20
        line(sb, M, y, W - M, y)
        y -= 36
        val meta = listOf(
            "DATE" to formatDate(spec.project.date),
            "REFERENCE" to spec.project.referenceNumber.ifBlank { "—" },
            "PHOTOGRAPHS" to spec.pages.count { it.kind == ReportPage.Kind.PHOTO }.toString(),
        )
        for ((k, v) in meta) {
            text(sb, "F2", 9, M, y, k)
            text(sb, "F1", 12, M, y - 16, v)
            y -= 44
        }
        footer(sb, spec, 1)
        endPage(sb, emptyMap())
    }

    fun addDivider(spec: ReportSpec, page: ReportPage, pageNo: Int) {
        val sb = StringBuilder()
        pageOp(sb)
        text(sb, "F2", 9, M, H / 2 + 24, "PHOTOGRAPHIC RECORD")
        text(sb, "F3", 32, M, H / 2 - 8, page.title)
        footer(sb, spec, pageNo)
        endPage(sb, emptyMap())
    }

    fun addPhoto(spec: ReportSpec, page: ReportPage, jpeg: ByteArray?, pageNo: Int) {
        val sb = StringBuilder()
        pageOp(sb)
        text(sb, "F2", 8, M, H - 56, page.sectionName.uppercase())
        text(sb, "F3", 16, M, H - 78, photoCaption(page.photoNumber))
        val resources = HashMap<String, Int>()
        if (jpeg != null) {
            val dim = jpegSize(jpeg) ?: (1600 to 1200)
            val imgObj = addImage(jpeg, dim.first, dim.second)
            resources["Im1"] = imgObj
            val boxW = W - M * 2
            val boxH = H - 96 - 120
            val scale = minOf(boxW / dim.first, boxH / dim.second)
            val dw = dim.first * scale
            val dh = dim.second * scale
            val x = M + (boxW - dw) / 2
            val y = H - 96 - dh
            sb.append("q $dw 0 0 $dh $x $y cm /Im1 Do Q\n")
            if (page.description.isNotBlank()) {
                text(sb, "F2", 8, M, y - 22, "DESCRIPTION")
                var ty = y - 38
                for (line in wrap(page.description, 11.0, W - M * 2).take(6)) {
                    text(sb, "F1", 11, M, ty, line)
                    ty -= 14
                }
            }
        }
        footer(sb, spec, pageNo)
        endPage(sb, resources)
    }

    fun toByteArray(): ByteArray {
        objects[2] = buildString {
            append("<< /Type /Pages /Count ${pages.size} /Kids [")
            append(pages.joinToString(" ") { "$it 0 R" })
            append("] >>")
        }.encodeToByteArray()
        val body = ArrayList<Byte>()
        body += "%PDF-1.4\n%\u00E2\u00E3\u00CF\u00D3\n".encodeToByteArray().toList()
        val offsets = IntArray(objects.size)
        // objects[0] unused (1-indexed)
        for (i in 1 until objects.size) {
            offsets[i] = body.size
            body += "$i 0 obj\n".encodeToByteArray().toList()
            body += objects[i].toList()
            body += "\nendobj\n".encodeToByteArray().toList()
        }
        val xref = body.size
        val sb = StringBuilder()
        sb.append("xref\n0 ${objects.size}\n")
        sb.append("0000000000 65535 f \n")
        for (i in 1 until objects.size) {
            sb.append(offsets[i].toString().padStart(10, '0'))
            sb.append(" 00000 n \n")
        }
        sb.append("trailer << /Size ${objects.size} /Root 1 0 R >>\nstartxref\n$xref\n%%EOF")
        body += sb.toString().encodeToByteArray().toList()
        return body.toByteArray()
    }

    private fun addImage(jpeg: ByteArray, width: Int, height: Int): Int {
        val header = "<< /Type /XObject /Subtype /Image /Width $width /Height $height /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.size} >>\nstream\n".encodeToByteArray()
        val end = "\nendstream".encodeToByteArray()
        val obj = header + jpeg + end
        objects += obj
        return objects.lastIndex
    }

    private fun endPage(content: StringBuilder, images: Map<String, Int>) {
        val stream = content.toString().encodeToByteArray()
        objects += "<< /Length ${stream.size} >>\nstream\n".encodeToByteArray() + stream + "\nendstream".encodeToByteArray()
        val contentId = objects.lastIndex
        val fontRes = "/Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>"
        val imgRes = if (images.isEmpty()) "" else {
            val inner = images.entries.joinToString(" ") { "/${it.key} ${it.value} 0 R" }
            "/XObject << $inner >>"
        }
        objects += "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 $W $H] /Contents $contentId 0 R /Resources << $fontRes $imgRes >> >>".encodeToByteArray()
        pages += objects.lastIndex
    }

    private fun pageOp(sb: StringBuilder) {
        sb.append("1 0 0 1 0 0 cm\n")
    }

    private fun footer(sb: StringBuilder, spec: ReportSpec, pageNo: Int) {
        line(sb, M, 36.0, W - M, 36.0)
        text(sb, "F1", 8, M, 22.0, formatDate(spec.project.date))
        val label = "Page $pageNo of ${spec.pageCount}"
        text(sb, "F1", 8, W - M - label.length * 4.2, 22.0, label)
    }

    private fun text(sb: StringBuilder, font: String, size: Int, x: Double, y: Double, value: String) {
        sb.append("BT /$font $size Tf ${fmt(x)} ${fmt(y)} Td (").append(escape(value)).append(") Tj ET\n")
    }

    private fun line(sb: StringBuilder, x1: Double, y1: Double, x2: Double, y2: Double) {
        sb.append("0.78 0.73 0.66 RG 0.6 w ${fmt(x1)} ${fmt(y1)} m ${fmt(x2)} ${fmt(y2)} l S\n")
    }

    private fun wrap(text: String, size: Double, maxWidth: Double): List<String> {
        val avg = size * 0.5
        val words = text.split(Regex("\\s+"))
        val lines = ArrayList<String>()
        var current = StringBuilder()
        for (word in words) {
            val trial = if (current.isEmpty()) word else "$current $word"
            if (trial.length * avg <= maxWidth) {
                if (current.isNotEmpty()) current.append(' ')
                current.append(word)
            } else {
                if (current.isNotEmpty()) lines += current.toString()
                current = StringBuilder(word)
            }
        }
        if (current.isNotEmpty()) lines += current.toString()
        return lines
    }

    private fun escape(value: String): String = buildString {
        for (ch in value) {
            when (ch) {
                '(', ')', '\\' -> append('\\').append(ch)
                '\n' -> append("\\n")
                else -> if (ch.code in 32..126) append(ch) else append('?')
            }
        }
    }

    private fun fmt(n: Double): String = ((n * 100).toInt() / 100.0).toString()
}

private fun formatDate(iso: String): String {
    if (iso.isBlank()) return "—"
    val parts = iso.split("-")
    if (parts.size < 3) return iso
    val months = listOf("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
    val m = parts[1].toIntOrNull() ?: return iso
    val d = parts[2].toIntOrNull() ?: return iso
    val month = months.getOrNull(m - 1) ?: return iso
    return "$d $month ${parts[0]}"
}

private fun jpegSize(bytes: ByteArray): Pair<Int, Int>? {
    var i = 2
    while (i + 8 < bytes.size) {
        if (bytes[i] != 0xFF.toByte()) return null
        val marker = bytes[i + 1].toInt() and 0xFF
        val len = ((bytes[i + 2].toInt() and 0xFF) shl 8) or (bytes[i + 3].toInt() and 0xFF)
        if (marker in 0xC0..0xC3) {
            val h = ((bytes[i + 5].toInt() and 0xFF) shl 8) or (bytes[i + 6].toInt() and 0xFF)
            val w = ((bytes[i + 7].toInt() and 0xFF) shl 8) or (bytes[i + 8].toInt() and 0xFF)
            return w to h
        }
        i += 2 + len
    }
    return null
}
