package fieldframe

fun exportPackage(bundle: Bundle): Any {
    val JSZip = window.JSZip
    if (isMissing(JSZip)) return jsReject(js("new Error('Export library is not available.')"))
    val zip = js("new JSZip()")
    val manifest = jsObj()
    manifest.format = "photodoc"
    manifest.version = 1
    manifest.exportedAt = js("new Date().toISOString()")
    manifest.project = bundle.project.toJs()
    manifest.sections = listToJsArray(bundle.sections.map { it.toJs() })
    manifest.photos = listToJsArray(bundle.photos.map { it.toJs() })
    zip.file("project.json", stringify(manifest))
    val folder = zip.folder("photos")
    var chain: dynamic = jsResolve(true)
    for (photo in bundle.photos) {
        chain = then(chain) {
            then(Repo.getBlob(photo.id)) { blob ->
                if (!isMissing(blob) && blob != null) {
                    val ext = extensionFor(photo.mimeType, photo.originalName)
                    folder.file("${photo.id}.$ext", blob)
                }
                true
            }
        }
    }
    return then(chain) {
        then(zip.generateAsync(js("{type:'blob'}"))) { blob ->
            arrayOf(blob, "${sanitizeFilename(bundle.project.name)}.photodoc")
        }
    }
}

fun importPackage(file: dynamic): Any {
    val JSZip = window.JSZip
    if (isMissing(JSZip)) return jsReject(js("new Error('Import library is not available.')"))
    return then(JSZip.loadAsync(file)) { zip ->
        val jsonFile = zip.file("project.json")
        if (isMissing(jsonFile)) throw js("new Error('This file is not a valid Fieldframe package.')")
        then(jsonFile.async("string")) { text ->
            val parsed = try {
                parseJson(text as String)
            } catch (e: Throwable) {
                throw js("new Error('The package manifest is corrupted.')")
            }
            if (dynStr(parsed, "format") != "photodoc") {
                throw js("new Error('The package is missing required project data.')")
            }
            val now = nowMs()
            val projectId = newId()
            val srcProject = parsed.project
            val project = Project(
                id = projectId,
                name = dynStr(srcProject, "name").trim().ifEmpty { "Imported project" },
                description = dynStr(srcProject, "description"),
                date = dynStr(srcProject, "date", todayIsoDate()),
                referenceNumber = dynStr(srcProject, "referenceNumber"),
                createdAt = now,
                updatedAt = now,
                beforeAfterEnabled = dynBool(srcProject, "beforeAfterEnabled"),
            )
            val sectionMap = HashMap<String, String>()
            val sections = jsArrayToList(parsed.sections).map { raw ->
                val id = newId()
                sectionMap[dynStr(raw, "id")] = id
                Section(id, projectId, dynStr(raw, "name"), dynInt(raw, "sortOrder"), dynBool(raw, "isCustom"))
            }
            if (sections.isEmpty()) throw js("new Error('The package does not contain any sections.')")
            val photos = ArrayList<Photo>()
            val blobs = ArrayList<dynamic>()
            val thumbs = ArrayList<dynamic>()
            var chain: dynamic = jsResolve(true)
            for (raw in jsArrayToList(parsed.photos)) {
                val oldId = dynStr(raw, "id")
                val oldSection = dynStr(raw, "sectionId")
                val sectionId = sectionMap[oldSection] ?: continue
                val id = newId()
                val ext = extensionFor(dynStr(raw, "mimeType"), dynStr(raw, "originalName"))
                chain = then(chain) {
                    val entry = zip.file("photos/$oldId.$ext")
                        ?: zip.file("photos/$oldId.jpg")
                        ?: zip.file("photos/$oldId.jpeg")
                        ?: zip.file("photos/$oldId.png")
                    if (isMissing(entry)) jsResolve(true)
                    else then(entry.async("blob")) { bytes ->
                        val mime = dynStr(raw, "mimeType", "image/jpeg")
                        val blob = js("bytes.type ? bytes : new Blob([bytes], {type: mime})")
                        val rotation = dynInt(raw, "rotation")
                        catchP(then(Images.thumbnail(blob, rotation)) { thumb ->
                            photos.add(
                                Photo(
                                    id = id,
                                    projectId = projectId,
                                    sectionId = sectionId,
                                    description = dynStr(raw, "description"),
                                    sortOrder = dynInt(raw, "sortOrder"),
                                    createdAt = dynNum(raw, "createdAt", now),
                                    updatedAt = now,
                                    rotation = rotation,
                                    mimeType = mime,
                                    width = dynInt(raw, "width"),
                                    height = dynInt(raw, "height"),
                                    phase = dynStr(raw, "phase", "standard"),
                                    originalName = dynStr(raw, "originalName"),
                                ),
                            )
                            val blobRec = jsObj()
                            blobRec.id = id
                            blobRec.blob = blob
                            val thumbRec = jsObj()
                            thumbRec.id = id
                            thumbRec.blob = thumb
                            blobs.add(blobRec)
                            thumbs.add(thumbRec)
                            true
                        }) { true }
                    }
                }
            }
            then(chain) {
                then(Idb.putGraph(project.toJs(), sections.map { it.toJs() }, photos.map { it.toJs() }, blobs, thumbs)) {
                    project
                }
            }
        }
    }
}

fun extensionFor(mime: String, name: String): String {
    val fromName = name.substringAfterLast('.', "").lowercase()
    if (fromName.isNotEmpty() && fromName.length <= 5) return fromName
    return when {
        mime.contains("png") -> "png"
        mime.contains("webp") -> "webp"
        mime.contains("heic") || mime.contains("heif") -> "heic"
        else -> "jpg"
    }
}

fun listToJsArray(list: List<dynamic>): dynamic {
    val arr = js("[]")
    for (item in list) arr.push(item)
    return arr
}
