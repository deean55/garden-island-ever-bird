package fieldframe


fun paint() {
    val root = document.getElementById("kotlin-app") ?: return
    val view = buildView()
    root.innerHTML = ""
    root.appendChild(view)
    val focusId = S.focusId
    if (focusId != null) {
        val node = document.getElementById(focusId)
        if (node != null) {
            node.focus()
            try {
                node.setSelectionRange(S.focusPos, S.focusPos)
            } catch (_: dynamic) {
            }
        }
    }
}

fun buildView(): dynamic {
    val shell = el("div", "ff-shell")
    add(shell, when (val route = currentRoute()) {
        is Route.Home -> dashboardView()
        is Route.Project -> projectView(route.id)
        is Route.Photo -> photoView(route.projectId, route.photoId)
        is Route.Pdf -> pdfView(route.projectId)
    })
    when (S.dialog) {
        "new-project" -> add(shell, newProjectDialog())
        "add-photo" -> add(shell, addPhotoSheet())
        "camera" -> add(shell, cameraView())
        "section-new" -> add(shell, sectionNameDialog(false))
        "section-rename" -> add(shell, sectionNameDialog(true))
        "confirm-delete-section" -> add(shell, confirmDialog(
            "Delete this section?",
            "Photographs in this section will also be deleted. This cannot be undone.",
            "Delete",
        ) {
            val id = S.addSectionId ?: return@confirmDialog
            Repo.deleteSection(id).jsThen {
                S.dialog = null
                toast("Section deleted")
                loadProject((currentRoute() as? Route.Project)?.id ?: "", force = true)
                null
            }.jsCatch { err -> catchToast(err, "Could not delete the section.") }
        })
        "confirm-delete-project" -> add(shell, confirmDialog(
            "Delete this project?",
            "All photographs, sections, and descriptions will be removed from this device.",
            "Delete project",
        ) {
            val id = (currentRoute() as? Route.Project)?.id ?: S.bundle?.project?.id ?: return@confirmDialog
            Repo.deleteProject(id).jsThen {
                S.dialog = null
                toast("Project deleted")
                go("/")
                null
            }.jsCatch { err -> catchToast(err, "Could not delete the project.") }
        })
        "confirm-delete-photo" -> add(shell, confirmDialog(
            "Delete this photograph?",
            "The image and its description will be removed from this project.",
            "Delete",
        ) {
            val route = currentRoute() as? Route.Photo ?: return@confirmDialog
            Repo.deletePhoto(route.photoId).jsThen {
                dropThumb(route.photoId)
                S.dialog = null
                toast("Photograph deleted")
                go("/project/${route.projectId}")
                null
            }.jsCatch { err -> catchToast(err, "Could not delete this photograph.") }
        })
        "move-photo" -> add(shell, movePhotoDialog())
        "project-menu" -> { /* rendered inline */ }
    }
    S.toast?.let { message ->
        add(shell, el("div", if (S.toastError) "ff-toast ff-toast-error" else "ff-toast", message))
    }
    return shell
}

fun dashboardView(): dynamic {
    val page = el("div", "ff-page")
    val header = el("header", "ff-hero")
    val copy = el("div")
    add(copy, el("p", "ff-kicker", "FIELDFRAME · KOTLIN MULTIPLATFORM"))
    add(copy, el("h1", "ff-title", "Photo records"))
    add(copy, el("p", "ff-lede", "Inspection, property, vehicle, and site documentation — stored only on this device."))
    add(header, copy)
    val actions = el("div", "ff-actions")
    add(actions, btn("Import", "outline", "md", Ic.upload) {
        pickFiles(".photodoc,application/zip,application/json", false).jsThen { filesAny ->
            val files = filesFrom(filesAny)
            val file = files.firstOrNull() ?: return@jsThen null
            S.busy = true
            paint()
            importPackage(file).jsThen { projectAny ->
                val project = projectAny as Project
                S.busy = false
                toast("Project imported")
                go("/project/${project.id}")
                null
            }.jsCatch { err ->
                S.busy = false
                catchToast(err, "Could not import this package.")
                paint()
                null
            }
            null
        }
    })
    add(actions, btn("New project", "primary", "md", Ic.plus) {
        openNewProject()
    })
    add(header, actions)
    add(page, header)

    val searchWrap = el("div", "ff-search")
    add(searchWrap, icon(Ic.search, "ff-search-icon"))
    add(searchWrap, textInput("search", S.query, "Search projects, references, descriptions") { value ->
        S.query = value
        loadDashboard()
    })
    add(page, searchWrap)

    when {
        S.error != null -> add(page, el("p", "ff-error", S.error))
        S.loading && S.projects.isEmpty() -> {
            val grid = el("div", "ff-grid")
            repeat(3) { add(grid, el("div", "ff-skeleton")) }
            add(page, grid)
        }
        S.projects.isEmpty() && S.query.isBlank() -> add(page, emptyState())
        S.projects.isEmpty() -> add(page, el("p", "ff-muted", "No projects match “${S.query}”."))
        else -> {
            val grid = el("ul", "ff-grid")
            for (item in S.projects) add(grid, projectCard(item))
            add(page, grid)
        }
    }
    return page
}

fun emptyState(): dynamic {
    val card = el("div", "ff-empty")
    add(card, el("p", "ff-kicker", "START A RECORD"))
    add(card, el("h2", "ff-empty-title", "No projects yet"))
    add(card, el("p", "ff-muted", "Create a project to capture twelve standard angles, add custom sections, and generate a professional PDF report."))
    add(card, btn("New project", "primary", "md", Ic.plus) {
        openNewProject()
    })
    return card
}

fun projectCard(item: ProjectSummary): dynamic {
    val li = el("li")
    val card = el("button", "ff-card") { b ->
        b.type = "button"
        b.addEventListener("click", { go("/project/${item.project.id}") })
    }
    val cover = el("div", "ff-cover")
    val url = item.coverPhotoId?.let { S.thumbUrls[it] }
    if (url != null) {
        add(cover, el("img", "ff-cover-img") { img ->
            img.src = url
            img.alt = ""
        })
    } else {
        add(cover, icon(Ic.camera, "ff-cover-icon"))
    }
    add(card, cover)
    val body = el("div", "ff-card-body")
    add(body, el("h2", "ff-card-title", item.project.name))
    val meta = buildString {
        append(formatDate(item.project.date))
        if (item.project.referenceNumber.isNotBlank()) append(" · ${item.project.referenceNumber}")
    }
    add(body, el("p", "ff-muted", meta))
    val count = if (item.photoCount == 1) "1 photograph" else "${item.photoCount} photographs"
    add(body, el("p", "ff-card-foot", "$count · Updated ${formatDateTime(item.project.updatedAt)}"))
    add(card, body)
    add(li, card)
    return li
}

fun openNewProject() {
    S.newName = ""
    S.newRef = ""
    S.newDate = todayIsoDate()
    S.newDesc = ""
    S.newBeforeAfter = false
    S.dialog = "new-project"
    paint()
}

fun newProjectDialog(): dynamic {
    val body = el("div", "ff-stack")
    add(body, field("Project name", "np-name", textInput("np-name", S.newName, "North elevation survey") { S.newName = it }))
    add(body, field("Reference / ID", "np-ref", textInput("np-ref", S.newRef, "INV-2041") { S.newRef = it }))
    add(body, field("Date", "np-date", textInput("np-date", S.newDate, "", "date") { S.newDate = it }))
    add(body, field("Description", "np-desc", textarea("np-desc", S.newDesc, "Site, vehicle, or inspection notes") { S.newDesc = it }))
    add(body, beforeAfterToggle(S.newBeforeAfter) { S.newBeforeAfter = it; paint() })
    val actions = el("div", "ff-dialog-actions")
    add(actions, btn("Cancel", "outline") { S.dialog = null; paint() })
    add(actions, btn("Create project", "primary", disabled = S.busy) {
        val name = dynStr(document.getElementById("np-name"), "value").ifEmpty { S.newName }
        val ref = dynStr(document.getElementById("np-ref"), "value").ifEmpty { S.newRef }
        val date = dynStr(document.getElementById("np-date"), "value").ifEmpty { S.newDate }
        val desc = dynStr(document.getElementById("np-desc"), "value").ifEmpty { S.newDesc }
        if (name.trim().isEmpty()) {
            toast("Give the project a name.", true)
            return@btn
        }
        S.busy = true
        paint()
        Repo.createProject(name, desc, date, ref, S.newBeforeAfter).jsThen { projectAny ->
            val project = projectAny as Project
            S.busy = false
            S.dialog = null
            toast("Project created")
            go("/project/${project.id}")
            null
        }.jsCatch { err ->
            S.busy = false
            catchToast(err, "Could not create the project.")
            paint()
            null
        }
    })
    val card = dialogCard("New project", body, actions)
    val hint = el("p", "ff-hint", "Twelve standard angles are added automatically. Everything stays on this device.")
    card.insertBefore(hint, card.children[1])
    return overlay({ S.dialog = null; paint() }, card)
}

fun beforeAfterToggle(checked: Boolean, onChange: (Boolean) -> Unit): dynamic {
    val row = el("label", "ff-switch-row")
    val copy = el("span")
    add(copy, el("span", "ff-switch-title", "Before & after"))
    add(copy, el("span", "ff-hint", "Separate photographs into two sets in the report"))
    add(row, copy)
    add(row, el("button", if (checked) "ff-switch on" else "ff-switch") { b ->
        b.type = "button"
        b.setAttribute("role", "switch")
        b.setAttribute("aria-checked", if (checked) "true" else "false")
        b.addEventListener("click", { onChange(!checked) })
    })
    return row
}

fun projectView(projectId: String): dynamic {
    val page = el("div", "ff-page ff-page-narrow")
    if (S.missing) return missingView("Project not found", "It may have been deleted from this device.", "/")
    if (S.error != null) {
        val errPage = el("div", "ff-page")
        add(errPage, el("p", "ff-error", S.error))
        return errPage
    }
    val bundle = S.bundle
    if (bundle == null || S.loading) {
        add(page, el("div", "ff-skeleton ff-skeleton-lg"))
        return page
    }
    val numbered = numberPhotos(bundle.sections, bundle.photos)
    val numberById = numbered.associate { it.photo.id to it.number }

    val bar = el("header", "ff-bar")
    add(bar, iconBtn(Ic.back, "Back to dashboard") { go("/") })
    val titles = el("div", "ff-bar-copy")
    add(titles, el("p", "ff-bar-title", S.editName.ifEmpty { "Untitled" }))
    val sub = buildString {
        append("${numbered.size} photograph")
        if (numbered.size != 1) append("s")
        if (S.editRef.isNotBlank()) append(" · ${S.editRef}")
    }
    add(titles, el("p", "ff-hint", sub))
    add(bar, titles)
    add(bar, btn(if (S.pdfBusy) "Preparing" else "PDF", "outline", "sm", Ic.file, S.pdfBusy) {
        S.pdfUrl?.let { revokeUrl(it) }
        S.pdfUrl = null
        go("/project/$projectId/pdf")
    })
    val menuWrap = el("div", "ff-menu-wrap")
    add(menuWrap, iconBtn(Ic.more, "Project actions") {
        S.menu = if (S.menu == "project") null else "project"
        paint()
    })
    if (S.menu == "project") {
        val menu = el("div", "ff-menu")
        add(menu, el("button", "ff-menu-item", "Export package") { b ->
            b.type = "button"
            b.addEventListener("click", {
                S.menu = null
                exportPackage(bundle).jsThen { pair ->
                    val blob = pair[0]
                    val filename = pair[1] as String
                    saveFile(blob, filename).jsThen {
                        if (it != "cancelled") toast("Project exported")
                        null
                    }
                    null
                }.jsCatch { err -> catchToast(err, "Could not export this project.") }
            })
        })
        add(menu, el("button", "ff-menu-item danger", "Delete project") { b ->
            b.type = "button"
            b.addEventListener("click", {
                S.menu = null
                S.dialog = "confirm-delete-project"
                paint()
            })
        })
        add(menuWrap, menu)
    }
    add(bar, menuWrap)
    add(page, bar)

    val details = el("section", "ff-panel")
    add(details, field("Project name", "p-name", textInput("p-name", S.editName) {
        S.editName = it
        scheduleProjectSave()
    }))
    val row = el("div", "ff-two")
    add(row, field("Reference / ID", "p-ref", textInput("p-ref", S.editRef) {
        S.editRef = it
        scheduleProjectSave()
    }))
    add(row, field("Date", "p-date", textInput("p-date", S.editDate, "", "date") {
        S.editDate = it
        scheduleProjectSave()
    }))
    add(details, row)
    add(details, field("Description", "p-desc", textarea("p-desc", S.editDesc) {
        S.editDesc = it
        scheduleProjectSave()
    }))
    add(details, beforeAfterToggle(S.editBeforeAfter) { checked ->
        S.editBeforeAfter = checked
        bundle.project.beforeAfterEnabled = checked
        Repo.updateProject(bundle.project).jsThen {
            loadProject(projectId, force = true)
            null
        }
        paint()
    })
    add(page, details)

    val sectionHead = el("div", "ff-section-head")
    val hcopy = el("div")
    add(hcopy, el("h2", "ff-h2", "Sections"))
    add(hcopy, el("p", "ff-hint", "Standard angles plus any custom groups you add."))
    add(sectionHead, hcopy)
    add(sectionHead, btn("Section", "outline", "sm", Ic.plus) {
        S.newSectionName = ""
        S.dialog = "section-new"
        paint()
    })
    add(page, sectionHead)

    val list = el("div", "ff-stack")
    for (section in bundle.sections) {
        add(list, sectionBlock(projectId, section, bundle.photos.filter { it.sectionId == section.id }, S.editBeforeAfter, numberById))
    }
    add(page, list)
    return page
}

fun sectionBlock(
    projectId: String,
    section: Section,
    photos: List<Photo>,
    beforeAfter: Boolean,
    numberById: Map<String, Int>,
): dynamic {
    val card = el("section", "ff-panel")
    val head = el("div", "ff-row")
    val copy = el("div", "ff-grow")
    add(copy, el("h3", "ff-h3", section.name))
    val meta = buildString {
        append(photos.size.toString())
        append(if (photos.size == 1) " photograph" else " photographs")
        if (section.isCustom) append(" · Custom")
    }
    add(copy, el("p", "ff-hint", meta))
    add(head, copy)
    val menuWrap = el("div", "ff-menu-wrap")
    add(menuWrap, iconBtn(Ic.more, "${section.name} actions") {
        S.menu = if (S.menu == section.id) null else section.id
        paint()
    })
    if (S.menu == section.id) {
        val menu = el("div", "ff-menu")
        add(menu, el("button", "ff-menu-item", "Rename") { b ->
            b.type = "button"
            b.addEventListener("click", {
                S.menu = null
                S.addSectionId = section.id
                S.newSectionName = section.name
                S.dialog = "section-rename"
                paint()
            })
        })
        add(menu, el("button", "ff-menu-item danger", "Delete section") { b ->
            b.type = "button"
            b.addEventListener("click", {
                S.menu = null
                S.addSectionId = section.id
                S.dialog = "confirm-delete-section"
                paint()
            })
        })
        add(menuWrap, menu)
    }
    add(head, menuWrap)
    if (!beforeAfter) {
        add(head, btn("Add", "primary", "sm", Ic.plus) { openAdd(section.id, "standard") })
    }
    add(card, head)

    val groups = if (beforeAfter) {
        listOf(
            Triple("Before", "before", photos.filter { it.phase != "after" }),
            Triple("After", "after", photos.filter { it.phase == "after" }),
        )
    } else listOf(Triple("", "standard", photos))

    for ((label, phase, items) in groups) {
        val block = el("div", "ff-group")
        if (label.isNotEmpty()) {
            val gh = el("div", "ff-row")
            add(gh, el("span", "ff-badge", label))
            add(gh, btn("Add", "outline", "sm", Ic.plus) { openAdd(section.id, phase) })
            add(block, gh)
        }
        if (items.isEmpty()) {
            add(block, el("button", "ff-drop", "Add a photograph") { b ->
                b.type = "button"
                b.addEventListener("click", { openAdd(section.id, phase) })
            })
        } else {
            val ul = el("ul", "ff-thumbs")
            for (photo in items) {
                val li = el("li")
                val b = el("button", "ff-thumb") { btnEl ->
                    btnEl.type = "button"
                    btnEl.addEventListener("click", { go("/project/$projectId/photo/${photo.id}") })
                }
                val frame = el("div", "ff-thumb-frame")
                val url = S.thumbUrls[photo.id]
                if (url != null) {
                    add(frame, el("img", "ff-thumb-img") { img ->
                        img.src = url
                        img.alt = section.name
                        img.style.transform = "rotate(${photo.rotation}deg)"
                    })
                } else {
                    add(frame, icon(Ic.camera, "ff-cover-icon"))
                }
                add(b, frame)
                val cap = el("div", "ff-thumb-cap")
                add(cap, el("p", "ff-hint", "Photo ${padPhotoNumber(numberById[photo.id] ?: 0)}"))
                if (photo.description.isNotBlank()) add(cap, el("p", "ff-thumb-desc", photo.description))
                add(b, cap)
                add(li, b)
                add(ul, li)
            }
            add(block, ul)
        }
        add(card, block)
    }
    return card
}

fun openAdd(sectionId: String, phase: String) {
    S.addSectionId = sectionId
    S.addPhase = phase
    S.dialog = "add-photo"
    paint()
}

fun addPhotoSheet(): dynamic {
    val sheet = el("div", "ff-sheet")
    add(sheet, el("h2", "ff-dialog-title", "Add photograph"))
    val stack = el("div", "ff-stack")
    add(stack, btn("Capture photo", "outline", "lg", Ic.camera) {
        S.dialog = "camera"
        startCamera()
        paint()
    })
    add(stack, btn("Choose from gallery", "outline", "lg", Ic.images) {
        pickFiles("image/jpeg,image/png,image/heic,image/heif,image/webp", true).jsThen { filesAny ->
            val files = filesFrom(filesAny)
            if (files.isEmpty()) return@jsThen null
            importFiles(files)
            null
        }
    })
    add(sheet, stack)
    return overlay({ S.dialog = null; paint() }, sheet)
}

fun importFiles(files: List<dynamic>, names: List<String>? = null) {
    val sectionId = S.addSectionId ?: return
    val projectId = S.bundle?.project?.id ?: (currentRoute() as? Route.Project)?.id ?: return
    S.dialog = null
    S.busy = true
    paint()
    Repo.addPhotos(projectId, sectionId, files, S.addPhase, names).jsThen { createdAny ->
        val created = createdAny as List<Photo>
        S.busy = false
        toast(if (created.size == 1) "Photograph added" else "${created.size} photographs added")
        loadProject(projectId, force = true)
        null
    }.jsCatch { err ->
        S.busy = false
        catchToast(err, "Could not add the photograph.")
        paint()
        null
    }
}

fun startCamera() {
    stopCamera()
    S.cameraError = null
    val media = navigator.mediaDevices
    if (media == null || js("typeof media.getUserMedia !== 'function'") as Boolean) {
        S.cameraError = "Camera capture is not supported in this browser. Choose a photo from the gallery instead."
        return
    }
    val facing = S.cameraFacing
    val constraints = js("{video:{facingMode:{ideal: facing}, width:{ideal:1920}, height:{ideal:1080}}, audio:false}")
    then(media.getUserMedia(constraints)) { stream ->
        S.cameraStream = stream
        paint()
        true
    }.jsCatch { err ->
        S.cameraError = userMessage(err, "The camera could not be opened.")
        paint()
        true
    }
}

fun cameraView(): dynamic {
    val wrap = el("div", "ff-camera")
    val top = el("div", "ff-camera-top")
    add(top, el("p", "ff-camera-label", "Camera"))
    add(top, iconBtn(Ic.close, "Close", "ghost-light") {
        stopCamera()
        S.dialog = null
        paint()
    })
    add(wrap, top)
    val stage = el("div", "ff-camera-stage")
    val video = el("video", "ff-video") { v ->
        v.setAttribute("playsinline", "true")
        v.muted = true
        S.videoEl = v
        if (S.cameraStream != null) {
            v.srcObject = S.cameraStream
            v.play()
        }
    }
    add(stage, video)
    S.cameraError?.let { message ->
        val err = el("div", "ff-camera-error")
        add(err, el("p", "ff-empty-title", "Camera unavailable"))
        add(err, el("p", "ff-hint", message))
        add(err, btn("Close", "secondary") { stopCamera(); S.dialog = null; paint() })
        add(stage, err)
    }
    add(wrap, stage)
    val dock = el("div", "ff-camera-dock")
    add(dock, iconBtn(Ic.flip, "Flip camera", "ghost-light") {
        S.cameraFacing = if (S.cameraFacing == "environment") "user" else "environment"
        startCamera()
        paint()
    })
    add(dock, el("button", "ff-shutter") { b ->
        b.type = "button"
        b.setAttribute("aria-label", "Capture photograph")
        b.disabled = S.cameraError != null || S.busy
        add(b, icon(Ic.camera))
        b.addEventListener("click", {
            val videoEl = S.videoEl ?: return@addEventListener
            S.busy = true
            Images.captureFrame(videoEl).jsThen { blob ->
                stopCamera()
                S.busy = false
                importFiles(listOf(blob), listOf("capture-${nowMs().toLong()}.jpg"))
                null
            }.jsCatch { err ->
                S.busy = false
                S.cameraError = userMessage(err, "Could not capture a photograph.")
                paint()
                null
            }
        })
    })
    add(dock, el("div", "ff-spacer"))
    add(wrap, dock)
    return wrap
}

fun sectionNameDialog(rename: Boolean): dynamic {
    val body = el("div", "ff-stack")
    add(body, textInput("sec-name", S.newSectionName, "Interior") { S.newSectionName = it })
    if (!rename) {
        val chips = el("div", "ff-chips")
        for (suggestion in CUSTOM_SECTION_SUGGESTIONS) {
            add(chips, el("button", "ff-chip", suggestion) { b ->
                b.type = "button"
                b.addEventListener("click", {
                    S.newSectionName = suggestion
                    paint()
                })
            })
        }
        add(body, chips)
    }
    val actions = el("div", "ff-dialog-actions")
    add(actions, btn("Cancel", "outline") { S.dialog = null; paint() })
    add(actions, btn(if (rename) "Save" else "Add section", "primary") {
        val name = S.newSectionName
        if (rename) {
            val id = S.addSectionId ?: return@btn
            Repo.renameSection(id, name).jsThen {
                S.dialog = null
                loadProject(S.bundle?.project?.id ?: "", force = true)
                null
            }
        } else {
            val projectId = S.bundle?.project?.id ?: return@btn
            Repo.addSection(projectId, name.ifEmpty { "Custom" }).jsThen {
                S.dialog = null
                toast("Section added")
                loadProject(projectId, force = true)
                null
            }
        }
    })
    return overlay({ S.dialog = null; paint() }, dialogCard(if (rename) "Rename section" else "Custom section", body, actions))
}

fun confirmDialog(title: String, body: String, action: String, onYes: () -> Unit): dynamic {
    val copy = el("p", "ff-muted", body)
    val actions = el("div", "ff-dialog-actions")
    add(actions, btn("Cancel", "outline") { S.dialog = null; paint() })
    add(actions, btn(action, "danger") { onYes() })
    return overlay({ S.dialog = null; paint() }, dialogCard(title, copy, actions))
}

fun photoView(projectId: String, photoId: String): dynamic {
    if (S.missing) return missingView("Photograph not found", "", "/project/$projectId")
    val bundle = S.bundle
    val photo = bundle?.photos?.find { it.id == photoId }
    if (bundle == null || photo == null) {
        val skeleton = el("div", "ff-page")
        add(skeleton, el("div", "ff-skeleton ff-skeleton-lg"))
        return skeleton
    }
    val numbered = numberPhotos(bundle.sections, bundle.photos)
    val number = numbered.find { it.photo.id == photoId }?.number ?: 0
    val section = bundle.sections.find { it.id == photo.sectionId }

    val page = el("div", "ff-photo-page")
    val bar = el("header", "ff-bar")
    add(bar, iconBtn(Ic.back, "Back to project") { go("/project/$projectId") })
    val titles = el("div", "ff-bar-copy")
    add(titles, el("p", "ff-bar-title", "Photo ${padPhotoNumber(number)} — ${section?.name ?: "Section"}"))
    add(titles, el("p", "ff-hint", photo.originalName))
    add(bar, titles)
    add(page, bar)

    val stage = el("div", "ff-photo-stage")
    if (S.photoUrl != null) {
        add(stage, el("img", "ff-photo") { img ->
            img.src = S.photoUrl
            img.alt = photo.description.ifEmpty { section?.name ?: "Photograph" }
            img.style.transform = "rotate(${photo.rotation}deg) scale(${S.photoZoom})"
        })
    } else {
        add(stage, el("p", "ff-hint", "Loading photograph…"))
    }
    add(page, stage)

    val tools = el("div", "ff-tools")
    val inner = el("div", "ff-tools-inner")
    val row = el("div", "ff-tool-row")
    add(row, btn("Rotate", "outline", "sm", Ic.rotateLeft) {
        Repo.rotatePhoto(photo.id, -90).jsThen { dropThumb(photo.id); loadPhoto(projectId, photoId); null }
    })
    add(row, btn("Rotate", "outline", "sm", Ic.rotateRight) {
        Repo.rotatePhoto(photo.id, 90).jsThen { dropThumb(photo.id); loadPhoto(projectId, photoId); null }
    })
    add(row, btn("", "outline", "sm", Ic.zoomOut, aria = "Zoom out") {
        S.photoZoom = maxOf(1.0, S.photoZoom - 0.25)
        paint()
    })
    add(row, btn("", "outline", "sm", Ic.zoomIn, aria = "Zoom in") {
        S.photoZoom = minOf(4.0, S.photoZoom + 0.25)
        paint()
    })
    add(row, btn("Replace", "outline", "sm") {
        pickFiles("image/jpeg,image/png,image/heic,image/heif,image/webp", false).jsThen { filesAny ->
            val files = filesFrom(filesAny)
            val file = files.firstOrNull() ?: return@jsThen null
            Repo.replacePhoto(photo.id, file, dynStr(file, "name")).jsThen {
                dropThumb(photo.id)
                toast("Photograph replaced")
                loadPhoto(projectId, photoId)
                null
            }.jsCatch { err -> catchToast(err, "Could not replace this photograph.") }
            null
        }
    })
    add(row, btn("Move", "outline", "sm") { S.dialog = "move-photo"; paint() })
    add(row, btn("Earlier", "outline", "sm") {
        Repo.shiftPhoto(photo.id, -1).jsThen { loadPhoto(projectId, photoId); null }
    })
    add(row, btn("Later", "outline", "sm") {
        Repo.shiftPhoto(photo.id, 1).jsThen { loadPhoto(projectId, photoId); null }
    })
    add(row, btn("Delete", "outline-danger", "sm", Ic.trash) { S.dialog = "confirm-delete-photo"; paint() })
    add(inner, row)
    add(inner, field(
        "Description",
        "photo-desc",
        textarea("photo-desc", S.photoDesc, "Describe the ${(section?.name ?: "subject").lowercase()} — finishes, damage, identifying details.") {
            S.photoDesc = it
            if (S.saveTimer != 0) window.clearTimeout(S.saveTimer)
            S.saveTimer = window.setTimeout({
                photo.description = S.photoDesc
                Repo.updatePhoto(photo).jsCatch { err ->
                    catchToast(err, "Could not save the description.")
                    null
                }
                null
            }, 450) as Int
        },
    ))
    add(inner, el("p", "ff-hint", "Saves automatically."))
    add(tools, inner)
    add(page, tools)
    return page
}

fun movePhotoDialog(): dynamic {
    val bundle = S.bundle ?: return el("div")
    val route = currentRoute() as? Route.Photo ?: return el("div")
    val photo = bundle.photos.find { it.id == route.photoId } ?: return el("div")
    val body = el("div", "ff-stack ff-scroll")
    for (section in bundle.sections) {
        add(body, btn(section.name, if (section.id == photo.sectionId) "secondary" else "ghost", "md") {
            Repo.movePhoto(photo.id, section.id, null).jsThen {
                S.dialog = null
                toast("Moved to ${section.name}")
                loadPhoto(route.projectId, route.photoId)
                null
            }
        })
    }
    if (bundle.project.beforeAfterEnabled) {
        val phases = el("div", "ff-two")
        add(phases, btn("Before", "outline") {
            photo.phase = "before"
            Repo.updatePhoto(photo).jsThen { toast("Moved to Before"); loadPhoto(route.projectId, route.photoId); null }
        })
        add(phases, btn("After", "outline") {
            photo.phase = "after"
            Repo.updatePhoto(photo).jsThen { toast("Moved to After"); loadPhoto(route.projectId, route.photoId); null }
        })
        add(body, phases)
    }
    val actions = el("div", "ff-dialog-actions")
    add(actions, btn("Close", "outline") { S.dialog = null; paint() })
    return overlay({ S.dialog = null; paint() }, dialogCard("Move to section", body, actions))
}

fun pdfView(projectId: String): dynamic {
    if (S.missing) return missingView("Project not found", "", "/")
    val page = el("div", "ff-photo-page")
    val bar = el("header", "ff-bar")
    add(bar, iconBtn(Ic.back, "Back to project") { go("/project/$projectId") })
    val titles = el("div", "ff-bar-copy")
    add(titles, el("p", "ff-bar-title", "PDF preview"))
    add(titles, el("p", "ff-hint", S.pdfName?.let { name -> name } ?: if (S.pdfBusy) "Generating report…" else "Preparing pages…"))
    add(bar, titles)
    add(page, bar)
    val stage = el("div", "ff-pdf-stage")
    when {
        S.pdfError != null -> add(stage, el("p", "ff-error", S.pdfError))
        S.pdfUrl != null -> add(stage, el("iframe", "ff-pdf") { frame ->
            frame.src = S.pdfUrl
            frame.title = "PDF preview"
        })
        else -> add(stage, el("p", "ff-muted", "Preparing pages…"))
    }
    add(page, stage)
    val tools = el("div", "ff-tools")
    val row = el("div", "ff-tool-row ff-tool-center")
    add(row, btn("Save", "outline", "sm", Ic.download, S.pdfUrl == null) {
        val url = S.pdfUrl ?: return@btn
        val name = S.pdfName ?: "report.pdf"
        then(js("fetch(url)")) { res ->
            then(res.blob()) { blob ->
                saveFile(blob, name).jsThen {
                    if (it != "cancelled") toast("PDF saved")
                    null
                }
            }
        }
    })
    add(row, btn("Open", "outline", "sm", Ic.file, S.pdfUrl == null) {
        val url = S.pdfUrl ?: return@btn
        window.open(url, "_blank", "noopener,noreferrer")
    })
    add(row, btn("Share", "primary", "sm", Ic.share, S.pdfUrl == null) {
        val url = S.pdfUrl ?: return@btn
        val name = S.pdfName ?: "report.pdf"
        then(js("fetch(url)")) { res ->
            then(res.blob()) { blob ->
                shareFile(blob, name, S.bundle?.project?.name ?: "Fieldframe report").jsThen { result ->
                    if (result == "downloaded") toast("PDF downloaded — share from your files if needed")
                    null
                }.jsCatch { err -> catchToast(err, "Could not share the PDF.") }
            }
        }
    })
    add(tools, row)
    add(page, tools)
    if (!S.pdfBusy && S.pdfUrl == null && S.bundle != null && S.pdfError == null) {
        window.setTimeout({ generatePdf(); null }, 0)
    }
    return page
}

fun missingView(title: String, body: String, back: String): dynamic {
    val page = el("div", "ff-missing")
    add(page, el("h1", "ff-empty-title", title))
    if (body.isNotEmpty()) add(page, el("p", "ff-muted", body))
    add(page, btn("Back", "primary") { go(back) })
    return page
}
