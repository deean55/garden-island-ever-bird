package com.fieldframe.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material.icons.outlined.MoreVert
import androidx.compose.material.icons.outlined.PhotoCamera
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.fieldframe.platform.BytesImage
import com.fieldframe.platform.CameraCaptureOverlay
import com.fieldframe.platform.LocalAppContainer
import com.fieldframe.platform.rememberGalleryPicker
import com.fieldframe.platform.rememberSaveFile
import com.fieldframe.shared.domain.CUSTOM_SECTION_SUGGESTIONS
import com.fieldframe.shared.domain.numberPhotos
import com.fieldframe.shared.domain.padPhotoNumber
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.PhotoPhase
import com.fieldframe.shared.model.Section
import com.fieldframe.theme.MutedFg
import com.fieldframe.theme.Paper
import com.fieldframe.viewmodel.ProjectViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProjectScreen(
    projectId: String,
    onBack: () -> Unit,
    onOpenPhoto: (String) -> Unit,
    onOpenPdf: () -> Unit,
) {
    val container = LocalAppContainer.current
    val vm = viewModel(key = projectId) { ProjectViewModel(projectId, container.repository) }
    val bundle by vm.bundle.collectAsState()
    val snack = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    var menu by remember { mutableStateOf(false) }
    var confirmDelete by remember { mutableStateOf(false) }
    var addSection by remember { mutableStateOf(false) }
    var addTarget by remember { mutableStateOf<Pair<String, String>?>(null) }
    var camera by remember { mutableStateOf(false) }
    var rename by remember { mutableStateOf<Section?>(null) }
    var deleteSection by remember { mutableStateOf<Section?>(null) }

    bundle?.let { vm.hydrate(it) }
    LaunchedEffect(vm.toast) {
        vm.toast?.let { snack.showSnackbar(it); vm.toast = null }
    }

    val savePackage = rememberSaveFile("application/zip") { ok ->
        if (ok) scope.launch { snack.showSnackbar("Project exported") }
    }
    val pickGallery = rememberGalleryPicker { images ->
        val target = addTarget
        if (target != null && images.isNotEmpty()) {
            vm.addPhotos(target.first, target.second, images)
        }
        addTarget = null
    }

    Scaffold(
        containerColor = Paper,
        snackbarHost = { SnackbarHost(snack) },
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(vm.name.ifBlank { "Untitled" }, style = MaterialTheme.typography.titleLarge)
                        Text(
                            "${bundle?.photos?.size ?: 0} photographs",
                            style = MaterialTheme.typography.labelSmall,
                            color = MutedFg,
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Outlined.ArrowBack, "Back")
                    }
                },
                actions = {
                    QuietButton("PDF", onClick = onOpenPdf)
                    Box {
                        IconButton(onClick = { menu = true }) { Icon(Icons.Outlined.MoreVert, "Project actions") }
                        DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                            DropdownMenuItem(
                                text = { Text("Export package") },
                                onClick = {
                                    menu = false
                                    scope.launch {
                                        val exported = vm.exportBytes()
                                        if (exported != null) savePackage(exported.second, exported.first)
                                    }
                                },
                            )
                            DropdownMenuItem(
                                text = { Text("Delete project", color = MaterialTheme.colorScheme.error) },
                                onClick = { menu = false; confirmDelete = true },
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Paper),
            )
        },
    ) { padding ->
        val current = bundle
        if (current == null) {
            Text("Loading…", modifier = Modifier.padding(padding).padding(24.dp), color = MutedFg)
            return@Scaffold
        }
        val numbers = numberPhotos(current.sections, current.photos).associate { it.photo.id to it.number }
        Column(
            Modifier.fillMaxSize().padding(padding).verticalScroll(rememberScrollState()).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            vm.error?.let { ErrorBanner(it) }
            Panel {
                Field("Project name", vm.name, vm::setName)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Field("Reference / ID", vm.reference, vm::setReference, Modifier.weight(1f))
                    Field("Date", vm.date, vm::setDate, Modifier.weight(1f))
                }
                Field("Description", vm.description, vm::setDescription, singleLine = false)
                BeforeAfterToggle(current.project.beforeAfterEnabled, vm::setBeforeAfter)
            }
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Column {
                    Text("Sections", style = MaterialTheme.typography.headlineMedium)
                    Text("Standard angles plus any custom groups you add.", color = MutedFg, style = MaterialTheme.typography.labelSmall)
                }
                QuietButton("Section", onClick = { addSection = true })
            }
            current.sections.forEach { section ->
                SectionBlock(
                    section = section,
                    photos = current.photos.filter { it.sectionId == section.id },
                    beforeAfter = current.project.beforeAfterEnabled,
                    numbers = numbers,
                    onAdd = { phase -> addTarget = section.id to phase },
                    onOpen = onOpenPhoto,
                    onRename = { rename = section },
                    onDelete = { deleteSection = section },
                )
            }
        }
    }

    if (confirmDelete) {
        ConfirmDialog(
            "Delete this project?",
            "All photographs, sections, and descriptions will be removed from this device.",
            "Delete project",
            onConfirm = { confirmDelete = false; vm.deleteProject(onBack) },
            onDismiss = { confirmDelete = false },
        )
    }
    deleteSection?.let { section ->
        ConfirmDialog(
            "Delete this section?",
            "Photographs in this section will also be deleted. This cannot be undone.",
            "Delete",
            onConfirm = { vm.deleteSection(section.id); deleteSection = null },
            onDismiss = { deleteSection = null },
        )
    }
    if (addSection) {
        NameSheet("Add section", "", CUSTOM_SECTION_SUGGESTIONS, { addSection = false }) {
            vm.addSection(it)
            addSection = false
        }
    }
    rename?.let { section ->
        NameSheet("Rename section", section.name, emptyList(), { rename = null }) {
            vm.renameSection(section.id, it)
            rename = null
        }
    }
    if (addTarget != null && !camera) {
        AddPhotoSheet(
            onDismiss = { addTarget = null },
            onCamera = { camera = true },
            onGallery = pickGallery,
        )
    }
    if (camera) {
        CameraCaptureOverlay(
            onCaptured = { image ->
                val target = addTarget
                if (target != null) vm.addPhotos(target.first, target.second, listOf(image))
                camera = false
                addTarget = null
            },
            onDismiss = { camera = false },
        )
    }
}

@Composable
private fun SectionBlock(
    section: Section,
    photos: List<Photo>,
    beforeAfter: Boolean,
    numbers: Map<String, Int>,
    onAdd: (String) -> Unit,
    onOpen: (String) -> Unit,
    onRename: () -> Unit,
    onDelete: () -> Unit,
) {
    var menu by remember { mutableStateOf(false) }
    Panel {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(section.name, style = MaterialTheme.typography.titleLarge)
                Text(
                    "${photos.size} photograph${if (photos.size == 1) "" else "s"}${if (section.isCustom) " · Custom" else ""}",
                    color = MutedFg,
                    style = MaterialTheme.typography.labelSmall,
                )
            }
            Box {
                IconButton(onClick = { menu = true }) { Icon(Icons.Outlined.MoreVert, "${section.name} actions") }
                DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                    DropdownMenuItem(text = { Text("Rename") }, onClick = { menu = false; onRename() })
                    DropdownMenuItem(
                        text = { Text("Delete section", color = MaterialTheme.colorScheme.error) },
                        onClick = { menu = false; onDelete() },
                    )
                }
            }
            if (!beforeAfter) {
                PrimaryButton("Add", onClick = { onAdd(PhotoPhase.STANDARD) })
            }
        }
        val groups = if (beforeAfter) {
            listOf(
                Triple("Before", PhotoPhase.BEFORE, photos.filter { it.phase != PhotoPhase.AFTER }),
                Triple("After", PhotoPhase.AFTER, photos.filter { it.phase == PhotoPhase.AFTER }),
            )
        } else listOf(Triple("", PhotoPhase.STANDARD, photos))
        groups.forEach { (label, phase, items) ->
            if (label.isNotEmpty()) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text(label.uppercase(), style = MaterialTheme.typography.labelLarge)
                    QuietButton("Add", onClick = { onAdd(phase) })
                }
            }
            if (items.isEmpty()) {
                QuietButton("Add a photograph", onClick = { onAdd(phase) }, modifier = Modifier.fillMaxWidth())
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items.chunked(2).forEach { row ->
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            row.forEach { photo ->
                                PhotoThumb(photo, numbers[photo.id] ?: 0, Modifier.weight(1f), onOpen)
                            }
                            if (row.size == 1) Box(Modifier.weight(1f))
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun PhotoThumb(photo: Photo, number: Int, modifier: Modifier, onOpen: (String) -> Unit) {
    val repo = LocalAppContainer.current.repository
    var bytes by remember(photo.id, photo.updatedAt) { mutableStateOf<ByteArray?>(null) }
    LaunchedEffect(photo.id, photo.updatedAt) { bytes = repo.getThumbBytes(photo.id) }
    Column(modifier.clickable { onOpen(photo.id) }) {
        Box(Modifier.fillMaxWidth().aspectRatio(1f), contentAlignment = Alignment.Center) {
            if (bytes != null) BytesImage(bytes, photo.rotation, "Photo ${padPhotoNumber(number)}", Modifier.fillMaxSize())
            else Icon(Icons.Outlined.PhotoCamera, null, tint = MutedFg)
        }
        Text("Photo ${padPhotoNumber(number)}", style = MaterialTheme.typography.labelSmall, color = MutedFg, modifier = Modifier.padding(top = 6.dp))
        if (photo.description.isNotBlank()) {
            Text(photo.description, style = MaterialTheme.typography.bodyMedium, maxLines = 2)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun NameSheet(
    title: String,
    initial: String,
    suggestions: List<String>,
    onDismiss: () -> Unit,
    onConfirm: (String) -> Unit,
) {
    var value by remember { mutableStateOf(initial) }
    ModalBottomSheet(onDismissRequest = onDismiss, sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)) {
        Column(Modifier.padding(20.dp).padding(bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(title, style = MaterialTheme.typography.titleLarge)
            Field("Name", value, { value = it })
            if (suggestions.isNotEmpty()) {
                Text("Suggestions", color = MutedFg, style = MaterialTheme.typography.labelSmall)
                suggestions.chunked(2).forEach { row ->
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        row.forEach { s ->
                            QuietButton(s, onClick = { value = s }, modifier = Modifier.weight(1f))
                        }
                    }
                }
            }
            PrimaryButton("Save", onClick = { onConfirm(value) }, modifier = Modifier.fillMaxWidth())
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AddPhotoSheet(onDismiss: () -> Unit, onCamera: () -> Unit, onGallery: () -> Unit) {
    ModalBottomSheet(onDismissRequest = onDismiss, sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)) {
        Column(Modifier.padding(20.dp).padding(bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text("Add photograph", style = MaterialTheme.typography.titleLarge)
            QuietButton("Capture photo", onClick = onCamera, modifier = Modifier.fillMaxWidth())
            QuietButton("Choose from gallery", onClick = onGallery, modifier = Modifier.fillMaxWidth())
        }
    }
}
