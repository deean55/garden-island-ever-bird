package fieldframe

private var pdfLibWait = 0

fun generatePdf() {
    val bundle = S.bundle ?: return
    if (isMissing(window.PDFLib) && pdfLibWait < 25) {
        pdfLibWait += 1
        S.pdfBusy = true
        S.pdfError = null
        paint()
        window.setTimeout({
            generatePdf()
            null
        }, 200)
        return
    }
    pdfLibWait = 0
    S.pdfBusy = true
    S.pdfError = null
    paint()
    catchP(then(buildPdf(bundle.project, bundle.sections, bundle.photos)) { result ->
        val blob = result[0]
        val filename = result[1] as String
        S.pdfUrl?.let { revokeUrl(it) }
        S.pdfUrl = createUrl(blob)
        S.pdfName = filename
        S.pdfBusy = false
        paint()
        true
    }) { err ->
        S.pdfBusy = false
        S.pdfError = userMessage(err, "Could not generate the PDF.")
        paint()
        true
    }
}

fun buildPdf(project: Project, sections: List<Section>, photos: List<Photo>): Any {
    val PDFLib = window.PDFLib
    if (isMissing(PDFLib)) return jsReject(js("new Error('PDF library is not available.')"))
    val PDFDocument = PDFLib.PDFDocument
    val StandardFonts = PDFLib.StandardFonts
    val rgb = PDFLib.rgb
    return then(PDFDocument.create()) { doc ->
        then(doc.embedFont(StandardFonts.TimesRoman)) { regular ->
            then(doc.embedFont(StandardFonts.TimesRomanBold)) { bold ->
                then(doc.embedFont(StandardFonts.Helvetica)) { sans ->
                    then(doc.embedFont(StandardFonts.HelveticaBold)) { sansBold ->
                        val pageW = 595.28
                        val pageH = 841.89
                        val margin = 48.0
                        val ink = rgb(0.11, 0.098, 0.082)
                        val muted = rgb(0.42, 0.392, 0.345)
                        val forest = rgb(0.118, 0.263, 0.212)
                        val rule = rgb(0.78, 0.729, 0.655)
                        val paper = rgb(0.98, 0.969, 0.945)
                        val groups = numberPhotosForPdf(project, sections, photos)
                        val items = ArrayList<NumberedPhoto>()
                        val dividers = ArrayList<Pair<Int, String>>()
                        if (project.beforeAfterEnabled) {
                            for (group in groups) {
                                dividers.add(items.size to group.first)
                                items.addAll(group.second)
                            }
                        } else {
                            items.addAll(groups.first().second)
                        }
                        val total = 1 + dividers.size + items.size

                        fun footer(page: dynamic, pageNo: Int) {
                            page.drawLine(js("{start:{x:margin,y:36}, end:{x:pageW-margin,y:36}, thickness:0.6, color:rule}"))
                            page.drawText(formatDate(project.date), js("{x:margin, y:22, size:8, font:sans, color:muted}"))
                            val label = "Page $pageNo of $total"
                            val width = (sans.widthOfTextAtSize(label, 8) as Number).toDouble()
                            page.drawText(label, js("{x: pageW - margin - width, y:22, size:8, font:sans, color:muted}"))
                        }

                        val cover = doc.addPage(js("[pageW, pageH]"))
                        cover.drawRectangle(js("{x:0,y:0,width:pageW,height:pageH,color:paper}"))
                        cover.drawText("FIELDFRAME", js("{x:margin,y:pageH-88,size:10,font:sansBold,color:forest}"))
                        cover.drawText("PHOTO DOCUMENTATION REPORT", js("{x:margin,y:pageH-104,size:9,font:sans,color:muted}"))
                        cover.drawText(project.name.ifEmpty { "Untitled project" }.take(48), js("{x:margin,y:pageH-160,size:28,font:bold,color:ink}"))
                        cover.drawLine(js("{start:{x:margin,y:pageH-180}, end:{x:margin+72,y:pageH-180}, thickness:1.2, color:forest}"))
                        cover.drawText("Reference", js("{x:margin,y:pageH-220,size:8,font:sansBold,color:muted}"))
                        cover.drawText(project.referenceNumber.ifEmpty { "—" }, js("{x:margin+110,y:pageH-220,size:11,font:regular,color:ink}"))
                        cover.drawText("Date", js("{x:margin,y:pageH-238,size:8,font:sansBold,color:muted}"))
                        cover.drawText(formatDate(project.date), js("{x:margin+110,y:pageH-238,size:11,font:regular,color:ink}"))
                        cover.drawText("Photographs", js("{x:margin,y:pageH-256,size:8,font:sansBold,color:muted}"))
                        cover.drawText(photos.size.toString(), js("{x:margin+110,y:pageH-256,size:11,font:regular,color:ink}"))
                        if (project.description.isNotBlank()) {
                            cover.drawText("DESCRIPTION", js("{x:margin,y:pageH-290,size:8,font:sansBold,color:muted}"))
                            cover.drawText(project.description.take(180), js("{x:margin,y:pageH-310,size:11,font:regular,color:ink}"))
                        }
                        footer(cover, 1)

                        var chain: dynamic = jsResolve(true)
                        var pageNo = 1
                        if (project.beforeAfterEnabled) {
                            for (group in groups) {
                                chain = then(chain) {
                                    pageNo += 1
                                    val page = doc.addPage(js("[pageW, pageH]"))
                                    page.drawRectangle(js("{x:0,y:0,width:pageW,height:pageH,color:paper}"))
                                    page.drawText(group.first, js("{x:margin,y:pageH/2,size:36,font:bold,color:ink}"))
                                    page.drawText("Photographs in this set", js("{x:margin,y:pageH/2-28,size:12,font:regular,color:muted}"))
                                    footer(page, pageNo)
                                    true
                                }
                                for (item in group.second) {
                                    chain = then(chain) { addPhotoPage(doc, item, project, rgb, paper, ink, muted, forest, rule, sans, sansBold, regular, ++pageNo, total, margin, pageW, pageH) }
                                }
                            }
                        } else {
                            for (item in items) {
                                chain = then(chain) { addPhotoPage(doc, item, project, rgb, paper, ink, muted, forest, rule, sans, sansBold, regular, ++pageNo, total, margin, pageW, pageH) }
                            }
                        }
                        then(chain) {
                            then(doc.save()) { bytes ->
                                val copy = js("new Uint8Array(bytes)")
                                val blob = js("new Blob([copy], {type:'application/pdf'})")
                                val filename = "${sanitizeFilename(project.name)}_${project.date.ifEmpty { todayIsoDate() }}.pdf"
                                arrayOf(blob, filename)
                            }
                        }
                    }
                }
            }
        }
    }
}

fun addPhotoPage(
    doc: dynamic,
    item: NumberedPhoto,
    project: Project,
    rgb: dynamic,
    paper: dynamic,
    ink: dynamic,
    muted: dynamic,
    forest: dynamic,
    rule: dynamic,
    sans: dynamic,
    sansBold: dynamic,
    regular: dynamic,
    pageNo: Int,
    total: Int,
    margin: Double,
    pageW: Double,
    pageH: Double,
): Any {
    val page = doc.addPage(js("[pageW, pageH]"))
    page.drawRectangle(js("{x:0,y:0,width:pageW,height:pageH,color:paper}"))
    page.drawText("FIELDFRAME", js("{x:margin,y:pageH-32,size:8,font:sans,color:forest}"))
    page.drawText(project.name.take(48), js("{x:margin+120,y:pageH-32,size:8,font:sans,color:muted}"))
    val heading = "Photo ${padPhotoNumber(item.number)}  —  ${item.section.name}"
    page.drawText(heading, js("{x:margin,y:pageH-64,size:13,font:sansBold,color:ink}"))
    return then(Repo.getBlob(item.photo.id)) { blob ->
        val after = if (isMissing(blob) || blob == null) {
            page.drawText("Photograph unavailable", js("{x:margin,y:pageH-120,size:11,font:regular,color:muted}"))
            jsResolve(true)
        } else {
            then(Images.draw(blob, item.photo.rotation, 1800)) { canvas ->
                then(canvasToBlob(canvas, "image/jpeg", 0.9)) { jpeg ->
                    then(arrayBufferOf(jpeg)) { bytes ->
                        then(doc.embedJpg(js("new Uint8Array(bytes)"))) { image ->
                            val boxW = pageW - margin * 2
                            val boxH = 520.0
                            val iw = (image.width as Number).toDouble()
                            val ih = (image.height as Number).toDouble()
                            val scale = minOf(boxW / iw, boxH / ih)
                            val dw = iw * scale
                            val dh = ih * scale
                            val imgX = margin + (boxW - dw) / 2
                            val imgY = pageH - 82 - dh
                            page.drawImage(image, js("{x:imgX,y:imgY,width:dw,height:dh}"))
                            true
                        }
                    }
                }
            }
        }
        then(after) {
            val desc = item.photo.description.ifEmpty { "No description." }.take(240)
            page.drawText("DESCRIPTION", js("{x:margin,y:72,size:7,font:sansBold,color:muted}"))
            page.drawText(desc, js("{x:margin,y:56,size:11,font:regular,color:ink}"))
            page.drawLine(js("{start:{x:margin,y:36}, end:{x:pageW-margin,y:36}, thickness:0.6, color:rule}"))
            page.drawText(formatDate(project.date), js("{x:margin, y:22, size:8, font:sans, color:muted}"))
            val label = "Page $pageNo of $total"
            val width = (sans.widthOfTextAtSize(label, 8) as Number).toDouble()
            page.drawText(label, js("{x: pageW - margin - width, y:22, size:8, font:sans, color:muted}"))
            true
        }
    }
}
