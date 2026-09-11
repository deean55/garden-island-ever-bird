package com.fieldframe.shared.pdf

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Rect
import android.graphics.RectF
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import com.fieldframe.shared.data.AndroidImageStore
import com.fieldframe.shared.model.ProjectBundle
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream

class AndroidPdfGenerator(
    private val images: AndroidImageStore,
) : PdfGenerator {

    override suspend fun generate(
        bundle: ProjectBundle,
        photoBytes: Map<String, ByteArray>,
    ): GeneratedPdf = withContext(Dispatchers.Default) {
        val spec = buildReportSpec(bundle.project, bundle.sections, bundle.photos)
        val document = PdfDocument()
        try {
            spec.pages.forEachIndexed { index, page ->
                val info = PdfDocument.PageInfo.Builder(PAGE_W.toInt(), PAGE_H.toInt(), index + 1).create()
                val pdfPage = document.startPage(info)
                val canvas = pdfPage.canvas
                canvas.drawColor(PAPER)
                when (page.kind) {
                    ReportPage.Kind.COVER -> drawCover(canvas, spec, page)
                    ReportPage.Kind.DIVIDER -> drawDivider(canvas, spec, page, index + 1)
                    ReportPage.Kind.PHOTO -> {
                        val bytes = page.photoId?.let { photoBytes[it] }
                        val bitmap = bytes?.let { runCatching { images.rasterize(it, page.rotation) }.getOrNull() }
                        drawPhoto(canvas, spec, page, bitmap, index + 1)
                        bitmap?.recycle()
                    }
                }
                document.finishPage(pdfPage)
            }
            val out = ByteArrayOutputStream()
            document.writeTo(out)
            GeneratedPdf(out.toByteArray(), pdfFilename(bundle.project.name))
        } finally {
            document.close()
        }
    }

    private fun drawCover(canvas: Canvas, spec: ReportSpec, page: ReportPage) {
        val ink = paint(INK, 11f, Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL))
        val kicker = paint(FOREST, 9f, Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)).apply {
            letterSpacing = 0.18f
        }
        val title = paint(INK, 28f, Typeface.create(Typeface.SERIF, Typeface.NORMAL))
        val muted = paint(MUTED, 11f, Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL))
        canvas.drawText("FIELDFRAME", MARGIN, 72f, kicker)
        var y = 120f
        for (line in wrap(page.title, title, PAGE_W - MARGIN * 2)) {
            canvas.drawText(line, MARGIN, y, title)
            y += 34f
        }
        y += 8f
        if (page.subtitle.isNotBlank()) {
            for (line in wrap(page.subtitle, muted, PAGE_W - MARGIN * 2).take(8)) {
                canvas.drawText(line, MARGIN, y, muted)
                y += 16f
            }
        }
        y += 28f
        val rule = paint(RULE, 0.8f)
        canvas.drawLine(MARGIN, y, PAGE_W - MARGIN, y, rule)
        y += 28f
        val project = spec.project
        val meta = listOf(
            "Date" to formatDate(project.date),
            "Reference" to project.referenceNumber.ifBlank { "—" },
            "Photographs" to spec.pages.count { it.kind == ReportPage.Kind.PHOTO }.toString(),
            "Sections" to "Twelve standard angles plus custom groups",
        )
        val label = paint(MUTED, 9f, Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)).apply {
            letterSpacing = 0.08f
        }
        val value = paint(INK, 12f, Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL))
        for ((k, v) in meta) {
            canvas.drawText(k.uppercase(), MARGIN, y, label)
            canvas.drawText(v, MARGIN, y + 18f, value)
            y += 44f
        }
        footer(canvas, spec, 1, ink, muted, rule)
    }

    private fun drawDivider(canvas: Canvas, spec: ReportSpec, page: ReportPage, pageNo: Int) {
        val title = paint(INK, 32f, Typeface.create(Typeface.SERIF, Typeface.NORMAL))
        val kicker = paint(FOREST, 9f, Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)).apply {
            letterSpacing = 0.18f
        }
        canvas.drawText("PHOTOGRAPHIC RECORD", MARGIN, PAGE_H / 2f - 24f, kicker)
        canvas.drawText(page.title, MARGIN, PAGE_H / 2f + 16f, title)
        footer(canvas, spec, pageNo, paint(INK, 11f), paint(MUTED, 9f), paint(RULE, 0.8f))
    }

    private fun drawPhoto(
        canvas: Canvas,
        spec: ReportSpec,
        page: ReportPage,
        bitmap: Bitmap?,
        pageNo: Int,
    ) {
        val ink = paint(INK, 11f)
        val muted = paint(MUTED, 9f)
        val kicker = paint(FOREST, 8f, Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)).apply {
            letterSpacing = 0.12f
        }
        val heading = paint(INK, 16f, Typeface.create(Typeface.SERIF, Typeface.NORMAL))
        canvas.drawText(page.sectionName.uppercase(), MARGIN, 56f, kicker)
        canvas.drawText(photoCaption(page.photoNumber), MARGIN, 78f, heading)

        val imageTop = 96f
        val descReserve = if (page.description.isBlank()) 64f else 120f
        val boxW = PAGE_W - MARGIN * 2
        val boxH = PAGE_H - imageTop - descReserve
        if (bitmap != null) {
            val fitted = fit(bitmap.width.toFloat(), bitmap.height.toFloat(), boxW, boxH)
            val left = MARGIN + (boxW - fitted.first) / 2f
            val dest = RectF(left, imageTop, left + fitted.first, imageTop + fitted.second)
            canvas.drawBitmap(bitmap, null, dest, Paint(Paint.FILTER_BITMAP_FLAG))
            val descY = dest.bottom + 22f
            drawDescription(canvas, page, descY)
        } else {
            canvas.drawText("Photograph missing from this device.", MARGIN, imageTop + 40f, muted)
            drawDescription(canvas, page, imageTop + 70f)
        }
        footer(canvas, spec, pageNo, ink, muted, paint(RULE, 0.8f))
    }

    private fun drawDescription(canvas: Canvas, page: ReportPage, top: Float) {
        if (page.description.isBlank()) return
        val label = paint(MUTED, 8f, Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)).apply {
            letterSpacing = 0.12f
        }
        val body = paint(INK, 11f)
        canvas.drawText("DESCRIPTION", MARGIN, top, label)
        var y = top + 16f
        for (line in wrap(page.description, body, PAGE_W - MARGIN * 2).take(6)) {
            canvas.drawText(line, MARGIN, y, body)
            y += 14f
        }
    }

    private fun footer(
        canvas: Canvas,
        spec: ReportSpec,
        pageNo: Int,
        ink: Paint,
        muted: Paint,
        rule: Paint,
    ) {
        canvas.drawLine(MARGIN, PAGE_H - 36f, PAGE_W - MARGIN, PAGE_H - 36f, rule)
        canvas.drawText(formatDate(spec.project.date), MARGIN, PAGE_H - 22f, muted)
        val label = "Page $pageNo of ${spec.pageCount}"
        val width = muted.measureText(label)
        canvas.drawText(label, PAGE_W - MARGIN - width, PAGE_H - 22f, muted)
    }

    private fun paint(color: Int, size: Float, typeface: Typeface = Typeface.SANS_SERIF): Paint =
        Paint(Paint.ANTI_ALIAS_FLAG).apply {
            this.color = color
            textSize = size
            this.typeface = typeface
        }

    private fun wrap(text: String, paint: Paint, maxWidth: Float): List<String> {
        if (text.isBlank()) return emptyList()
        val words = text.split(Regex("\\s+"))
        val lines = ArrayList<String>()
        var current = StringBuilder()
        for (word in words) {
            val trial = if (current.isEmpty()) word else "$current $word"
            if (paint.measureText(trial) <= maxWidth) {
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

    private fun fit(srcW: Float, srcH: Float, boxW: Float, boxH: Float): Pair<Float, Float> {
        val scale = minOf(boxW / srcW, boxH / srcH)
        return srcW * scale to srcH * scale
    }

    private fun formatDate(iso: String): String {
        if (iso.isBlank()) return "—"
        val parts = iso.split("-")
        if (parts.size < 3) return iso
        val months = listOf(
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        )
        val m = parts[1].toIntOrNull() ?: return iso
        val d = parts[2].toIntOrNull() ?: return iso
        val month = months.getOrNull(m - 1) ?: return iso
        return "$d $month ${parts[0]}"
    }

    companion object {
        private const val PAGE_W = 595f
        private const val PAGE_H = 842f
        private const val MARGIN = 48f
        private const val PAPER = 0xFFF9F7F1.toInt()
        private const val INK = 0xFF1C1915.toInt()
        private const val MUTED = 0xFF6B6458.toInt()
        private const val FOREST = 0xFF1E4336.toInt()
        private const val RULE = 0xFFCFC6B6.toInt()
    }
}
