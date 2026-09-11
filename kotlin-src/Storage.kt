package fieldframe

object Idb {
    private var db: dynamic = null

    fun open(): Any {
        if (db != null) return jsResolve(db)
        return newPromise { ok, fail ->
            val req = indexedDB.open("fieldframe", 1)
            req.onupgradeneeded = {
                val next = req.result
                if (js("!next.objectStoreNames.contains('projects')") as Boolean) {
                    next.createObjectStore("projects", js("{keyPath:'id'}"))
                }
                if (js("!next.objectStoreNames.contains('sections')") as Boolean) {
                    val s = next.createObjectStore("sections", js("{keyPath:'id'}"))
                    s.createIndex("byProject", "projectId", js("{unique:false}"))
                }
                if (js("!next.objectStoreNames.contains('photos')") as Boolean) {
                    val p = next.createObjectStore("photos", js("{keyPath:'id'}"))
                    p.createIndex("byProject", "projectId", js("{unique:false}"))
                    p.createIndex("bySection", "sectionId", js("{unique:false}"))
                }
                if (js("!next.objectStoreNames.contains('blobs')") as Boolean) {
                    next.createObjectStore("blobs", js("{keyPath:'id'}"))
                }
                if (js("!next.objectStoreNames.contains('thumbs')") as Boolean) {
                    next.createObjectStore("thumbs", js("{keyPath:'id'}"))
                }
            }
            req.onsuccess = {
                db = req.result
                ok(db)
            }
            req.onerror = {
                fail(req.error ?: js("new Error('Could not open the local database.')"))
            }
        }
    }

    private fun txDone(tx: dynamic): Any {
        return newPromise { ok, fail ->
            tx.oncomplete = { ok(true) }
            tx.onerror = { fail(tx.error ?: js("new Error('IndexedDB transaction failed')")) }
            tx.onabort = { fail(tx.error ?: js("new Error('IndexedDB transaction aborted')")) }
        }
    }

    fun get(store: String, id: String): Any {
        return then(open()) { database ->
            newPromise { ok, fail ->
                val tx = database.transaction(store, "readonly")
                val req = tx.objectStore(store).get(id)
                req.onsuccess = { ok(req.result) }
                req.onerror = { fail(req.error) }
            }
        }
    }

    fun getAll(store: String): Any {
        return then(open()) { database ->
            newPromise { ok, fail ->
                val tx = database.transaction(store, "readonly")
                val req = tx.objectStore(store).getAll()
                req.onsuccess = { ok(jsArrayToList(req.result)) }
                req.onerror = { fail(req.error) }
            }
        }
    }

    fun getByIndex(store: String, index: String, value: String): Any {
        return then(open()) { database ->
            newPromise { ok, fail ->
                val tx = database.transaction(store, "readonly")
                val req = tx.objectStore(store).index(index).getAll(value)
                req.onsuccess = { ok(jsArrayToList(req.result)) }
                req.onerror = { fail(req.error) }
            }
        }
    }

    fun put(store: String, value: dynamic): Any {
        return then(open()) { database ->
            val tx = database.transaction(store, "readwrite")
            tx.objectStore(store).put(value)
            txDone(tx)
        }
    }

    fun delete(store: String, id: String): Any {
        return then(open()) { database ->
            val tx = database.transaction(store, "readwrite")
            tx.objectStore(store).delete(id)
            txDone(tx)
        }
    }

    fun putGraph(
        project: dynamic,
        sections: List<dynamic>,
        photos: List<dynamic>,
        blobs: List<dynamic>,
        thumbs: List<dynamic>,
    ): Any {
        return then(open()) { database ->
            val tx = database.transaction(js("['projects','sections','photos','blobs','thumbs']"), "readwrite")
            tx.objectStore("projects").put(project)
            for (s in sections) tx.objectStore("sections").put(s)
            for (p in photos) tx.objectStore("photos").put(p)
            for (b in blobs) tx.objectStore("blobs").put(b)
            for (t in thumbs) tx.objectStore("thumbs").put(t)
            txDone(tx)
        }
    }

    fun deleteProjectGraph(projectId: String): Any {
        return then(getByIndex("photos", "byProject", projectId)) { photosAny ->
            val photos = photosAny as List<dynamic>
            then(getByIndex("sections", "byProject", projectId)) { sectionsAny ->
                val sections = sectionsAny as List<dynamic>
                then(open()) { database ->
                    val tx = database.transaction(js("['projects','sections','photos','blobs','thumbs']"), "readwrite")
                    tx.objectStore("projects").delete(projectId)
                    for (s in sections) tx.objectStore("sections").delete(dynStr(s, "id"))
                    for (p in photos) {
                        val id = dynStr(p, "id")
                        tx.objectStore("photos").delete(id)
                        tx.objectStore("blobs").delete(id)
                        tx.objectStore("thumbs").delete(id)
                    }
                    txDone(tx)
                }
            }
        }
    }

    fun deletePhotoGraph(photoId: String): Any {
        return then(open()) { database ->
            val tx = database.transaction(js("['photos','blobs','thumbs']"), "readwrite")
            tx.objectStore("photos").delete(photoId)
            tx.objectStore("blobs").delete(photoId)
            tx.objectStore("thumbs").delete(photoId)
            txDone(tx)
        }
    }
}

object Images {
    fun size(blob: dynamic): Any {
        return catchP(then(js("createImageBitmap(blob)")) { bitmap ->
            val w = (bitmap.width as Number).toInt()
            val h = (bitmap.height as Number).toInt()
            bitmap.close()
            arrayOf(w, h)
        }) {
            jsReject(js("new Error('This image could not be read. Try a JPEG or PNG file.')"))
        }
    }

    fun draw(blob: dynamic, rotation: Int, maxEdge: Int?): Any {
        return then(js("createImageBitmap(blob)")) { bitmap ->
            val bw = (bitmap.width as Number).toInt()
            val bh = (bitmap.height as Number).toInt()
            val swapped = rotation == 90 || rotation == 270
            val vw = if (swapped) bh else bw
            val vh = if (swapped) bw else bh
            val scale = if (maxEdge != null) minOf(1.0, maxEdge.toDouble() / maxOf(vw, vh).toDouble()) else 1.0
            val destW = maxOf(1, kotlin.math.round(vw * scale).toInt())
            val destH = maxOf(1, kotlin.math.round(vh * scale).toInt())
            val canvas = document.createElement("canvas")
            canvas.width = destW
            canvas.height = destH
            val ctx = canvas.getContext("2d")
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, destW, destH)
            ctx.translate(destW / 2.0, destH / 2.0)
            ctx.rotate(rotation * kotlin.math.PI / 180.0)
            ctx.drawImage(bitmap, -(bw * scale) / 2.0, -(bh * scale) / 2.0, bw * scale, bh * scale)
            bitmap.close()
            canvas
        }
    }

    fun thumbnail(blob: dynamic, rotation: Int): Any {
        return then(draw(blob, rotation, 480)) { canvas -> canvasToBlob(canvas, "image/jpeg", 0.82) }
    }

    fun captureFrame(video: dynamic): Any {
        val width = (video.videoWidth as Number).toInt()
        val height = (video.videoHeight as Number).toInt()
        if (width == 0 || height == 0) return jsReject(js("new Error('The camera is not ready yet.')"))
        val canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        val ctx = canvas.getContext("2d")
        ctx.drawImage(video, 0, 0, width, height)
        return canvasToBlob(canvas, "image/jpeg", 0.95)
    }
}

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

fun numberPhotosForPdf(project: Project, sections: List<Section>, photos: List<Photo>): List<Pair<String, List<NumberedPhoto>>> {
    if (!project.beforeAfterEnabled) return listOf("Photographs" to numberPhotos(sections, photos))
    val before = numberPhotos(sections, photos.filter { it.phase != "after" })
    val after = numberPhotos(sections, photos.filter { it.phase == "after" }).mapIndexed { index, item ->
        item.copy(number = before.size + index + 1)
    }
    return listOf("BEFORE" to before, "AFTER" to after)
}

@Suppress("UNCHECKED_CAST")
fun asDynList(value: dynamic): List<dynamic> = value as List<dynamic>

object Repo {
    fun listSummaries(query: String): Any {
        return then(Idb.getAll("projects")) { projectsJs ->
            then(Idb.getAll("photos")) { photosJs ->
                val needle = query.trim().lowercase()
                val photos = asDynList(photosJs).map { photoFromJs(it) }
                val byProject = HashMap<String, MutableList<Photo>>()
                for (photo in photos) byProject.getOrPut(photo.projectId) { ArrayList() }.add(photo)
                asDynList(projectsJs).map { projectFromJs(it) }
                    .filter { project ->
                        needle.isEmpty() || "${project.name} ${project.description} ${project.referenceNumber}".lowercase().contains(needle)
                    }
                    .sortedByDescending { it.updatedAt }
                    .map { project ->
                        val list = sortPhotos(byProject[project.id] ?: emptyList())
                        ProjectSummary(project, list.size, list.firstOrNull()?.id)
                    }
            }
        }
    }

    fun getBundle(id: String): Any {
        return then(Idb.get("projects", id)) { p ->
            if (isMissing(p)) jsResolve(null)
            else then(Idb.getByIndex("sections", "byProject", id)) { sectionsJs ->
                then(Idb.getByIndex("photos", "byProject", id)) { photosJs ->
                    Bundle(
                        projectFromJs(p),
                        sortSections(asDynList(sectionsJs).map { sectionFromJs(it) }),
                        sortPhotos(asDynList(photosJs).map { photoFromJs(it) }),
                    )
                }
            }
        }
    }

    fun touch(projectId: String): Any {
        return then(Idb.get("projects", projectId)) { p ->
            if (isMissing(p)) jsResolve(true)
            else {
                p.updatedAt = nowMs()
                Idb.put("projects", p)
            }
        }
    }

    fun createProject(name: String, description: String, date: String, referenceNumber: String, beforeAfter: Boolean): Any {
        val now = nowMs()
        val project = Project(
            id = newId(),
            name = name.trim().ifEmpty { "Untitled project" },
            description = description.trim(),
            date = date.ifEmpty { todayIsoDate() },
            referenceNumber = referenceNumber.trim(),
            createdAt = now,
            updatedAt = now,
            beforeAfterEnabled = beforeAfter,
        )
        val sections = DEFAULT_SECTION_NAMES.mapIndexed { index, sectionName ->
            Section(newId(), project.id, sectionName, index, false)
        }
        return then(Idb.putGraph(project.toJs(), sections.map { it.toJs() }, emptyList(), emptyList(), emptyList())) {
            project
        }
    }

    fun updateProject(project: Project): Any {
        project.updatedAt = nowMs()
        return Idb.put("projects", project.toJs())
    }

    fun deleteProject(id: String): Any = Idb.deleteProjectGraph(id)

    fun addSection(projectId: String, name: String): Any {
        return then(Idb.getByIndex("sections", "byProject", projectId)) { existingAny ->
            val existing = asDynList(existingAny)
            val max = existing.maxOfOrNull { dynInt(it, "sortOrder") } ?: -1
            val section = Section(newId(), projectId, name.trim().ifEmpty { "Custom" }, max + 1, true)
            then(Idb.put("sections", section.toJs())) {
                then(touch(projectId)) { section }
            }
        }
    }

    fun renameSection(id: String, name: String): Any {
        return then(Idb.get("sections", id)) { s ->
            s.name = name.trim().ifEmpty { dynStr(s, "name") }
            then(Idb.put("sections", s)) { touch(dynStr(s, "projectId")) }
        }
    }

    fun deleteSection(id: String): Any {
        return then(Idb.get("sections", id)) { s ->
            if (isMissing(s)) jsResolve(true)
            else then(Idb.getByIndex("photos", "bySection", id)) { photosAny ->
                val photos = asDynList(photosAny)
                var chain: dynamic = jsResolve(true)
                for (p in photos) {
                    val photoId = dynStr(p, "id")
                    chain = then(chain) { Idb.deletePhotoGraph(photoId) }
                }
                then(chain) {
                    then(Idb.delete("sections", id)) { touch(dynStr(s, "projectId")) }
                }
            }
        }
    }

    fun getBlob(id: String): Any {
        return then(Idb.get("blobs", id)) { rec ->
            if (isMissing(rec)) null else rec.blob
        }
    }

    fun getThumb(id: String): Any {
        return then(Idb.get("thumbs", id)) { rec ->
            if (isMissing(rec)) getBlob(id) else rec.blob
        }
    }

    fun addPhotos(projectId: String, sectionId: String, files: List<dynamic>, phase: String, names: List<String>?): Any {
        return then(Idb.getByIndex("photos", "bySection", sectionId)) { existingAny ->
            val existing = asDynList(existingAny)
            var order = existing.maxOfOrNull { dynInt(it, "sortOrder") } ?: -1
            val created = ArrayList<Photo>()
            var chain: dynamic = jsResolve(true)
            files.forEachIndexed { index, file ->
                chain = then(chain) {
                    val mime = dynStr(file, "type", "image/jpeg").ifEmpty { "image/jpeg" }
                    then(Images.size(file)) { sizeAny ->
                        val size = sizeAny as Array<Int>
                        then(Images.thumbnail(file, 0)) { thumb ->
                            order += 1
                            val now = nowMs()
                            val id = newId()
                            val photo = Photo(
                                id = id,
                                projectId = projectId,
                                sectionId = sectionId,
                                description = "",
                                sortOrder = order,
                                createdAt = now,
                                updatedAt = now,
                                rotation = 0,
                                mimeType = mime,
                                width = size[0],
                                height = size[1],
                                phase = phase,
                                originalName = names?.getOrNull(index) ?: dynStr(file, "name", "capture-$id.jpg"),
                            )
                            val blobRec = jsObj()
                            blobRec.id = id
                            blobRec.blob = file
                            val thumbRec = jsObj()
                            thumbRec.id = id
                            thumbRec.blob = thumb
                            then(Idb.put("photos", photo.toJs())) {
                                then(Idb.put("blobs", blobRec)) {
                                    then(Idb.put("thumbs", thumbRec)) {
                                        created.add(photo)
                                        true
                                    }
                                }
                            }
                        }
                    }
                }
            }
            then(chain) { then(touch(projectId)) { created } }
        }
    }

    fun replacePhoto(photoId: String, file: dynamic, originalName: String?): Any {
        return then(Idb.get("photos", photoId)) { raw ->
            val photo = photoFromJs(raw)
            then(Images.size(file)) { sizeAny ->
                val size = sizeAny as Array<Int>
                then(Images.thumbnail(file, photo.rotation)) { thumb ->
                    photo.mimeType = dynStr(file, "type", photo.mimeType).ifEmpty { photo.mimeType }
                    photo.width = size[0]
                    photo.height = size[1]
                    photo.updatedAt = nowMs()
                    if (originalName != null) photo.originalName = originalName
                    val blobRec = jsObj()
                    blobRec.id = photoId
                    blobRec.blob = file
                    val thumbRec = jsObj()
                    thumbRec.id = photoId
                    thumbRec.blob = thumb
                    then(Idb.put("photos", photo.toJs())) {
                        then(Idb.put("blobs", blobRec)) {
                            then(Idb.put("thumbs", thumbRec)) { touch(photo.projectId) }
                        }
                    }
                }
            }
        }
    }

    fun updatePhoto(photo: Photo): Any {
        photo.updatedAt = nowMs()
        return then(Idb.put("photos", photo.toJs())) { touch(photo.projectId) }
    }

    fun rotatePhoto(id: String, delta: Int): Any {
        return then(Idb.get("photos", id)) { raw ->
            val photo = photoFromJs(raw)
            val next = ((photo.rotation + delta) % 360 + 360) % 360
            photo.rotation = next
            photo.updatedAt = nowMs()
            then(getBlob(id)) { blob ->
                val after = if (!isMissing(blob) && blob != null) {
                    then(Images.thumbnail(blob, next)) { thumb ->
                        val rec = jsObj()
                        rec.id = id
                        rec.blob = thumb
                        Idb.put("thumbs", rec)
                    }
                } else jsResolve(true)
                then(after) {
                    then(Idb.put("photos", photo.toJs())) { touch(photo.projectId) }
                }
            }
        }
    }

    fun deletePhoto(id: String): Any {
        return then(Idb.get("photos", id)) { raw ->
            if (isMissing(raw)) jsResolve(true)
            else then(Idb.deletePhotoGraph(id)) { touch(dynStr(raw, "projectId")) }
        }
    }

    fun movePhoto(photoId: String, sectionId: String, phase: String?): Any {
        return then(Idb.get("photos", photoId)) { raw ->
            val photo = photoFromJs(raw)
            then(Idb.getByIndex("photos", "bySection", sectionId)) { existingAny ->
                val existing = asDynList(existingAny)
                val max = existing.filter { dynStr(it, "id") != photoId }.maxOfOrNull { dynInt(it, "sortOrder") } ?: -1
                photo.sectionId = sectionId
                photo.sortOrder = max + 1
                if (phase != null) photo.phase = phase
                photo.updatedAt = nowMs()
                then(Idb.put("photos", photo.toJs())) { touch(photo.projectId) }
            }
        }
    }

    fun shiftPhoto(photoId: String, direction: Int): Any {
        return then(Idb.get("photos", photoId)) { raw ->
            val photo = photoFromJs(raw)
            then(Idb.getByIndex("photos", "bySection", photo.sectionId)) { siblingsJs ->
                val siblings = sortPhotos(asDynList(siblingsJs).map { photoFromJs(it) }).filter { it.phase == photo.phase }
                val index = siblings.indexOfFirst { it.id == photoId }
                val swap = siblings.getOrNull(index + direction)
                if (swap == null) jsResolve(true)
                else {
                    val tmp = photo.sortOrder
                    photo.sortOrder = swap.sortOrder
                    swap.sortOrder = tmp
                    photo.updatedAt = nowMs()
                    swap.updatedAt = nowMs()
                    then(Idb.put("photos", photo.toJs())) {
                        then(Idb.put("photos", swap.toJs())) { touch(photo.projectId) }
                    }
                }
            }
        }
    }
}
