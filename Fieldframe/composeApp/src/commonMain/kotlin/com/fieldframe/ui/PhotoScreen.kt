package com.fieldframe.ui

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material.icons.outlined.MoreVert
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.fieldframe.platform.BytesImage
import com.fieldframe.platform.LocalAppContainer
import com.fieldframe.platform.rememberGalleryPicker
import com.fieldframe.shared.domain.numberPhotos
import com.fieldframe.shared.domain.padPhotoNumber
import com.fieldframe.shared.model.PhotoPhase
import com.fieldframe.theme.MutedFg
import com.fieldframe.theme.Paper
import com.fieldframe.viewmodel.PhotoViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PhotoScreen(
    projectId: String,
    photoId: String,
    onBack: () -> Unit,
) {
    val container = LocalAppContainer.current
    val vm = viewModel(key = photoId) { PhotoViewModel(projectId, photoId, container.repository) }
    val bundle by vm.bundle.collectAsState()
    var menu by remember { mutableStateOf(false) }
    var confirm by remember { mutableStateOf(false) }
    var move by remember { mutableStateOf(false) }
    val replace = rememberGalleryPicker { images ->
        images.firstOrNull()?.let { vm.replace(it) }
    }

    val photo = bundle?.photos?.find { it.id == photoId }
    val section = bundle?.sections?.find { it.id == photo?.sectionId }
    if (photo != null) vm.hydrate(photo)
    val number = bundle?.let { numberPhotos(it.sections, it.photos).find { n -> n.photo.id == photoId }?.number } ?: 0

    Scaffold(
        containerColor = Paper,
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(section?.name ?: "Photograph", style = MaterialTheme.typography.titleLarge)
                        Text("Photo ${padPhotoNumber(number)}", color = MutedFg, style = MaterialTheme.typography.labelSmall)
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Outlined.ArrowBack, "Back") }
                },
                actions = {
                    Box {
                        IconButton(onClick = { menu = true }) { Icon(Icons.Outlined.MoreVert, "Photograph actions") }
                        DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                            DropdownMenuItem(text = { Text("Replace image") }, onClick = { menu = false; replace() })
                            DropdownMenuItem(text = { Text("Move to section") }, onClick = { menu = false; move = true })
                            DropdownMenuItem(
                                text = { Text("Delete photograph", color = MaterialTheme.colorScheme.error) },
                                onClick = { menu = false; confirm = true },
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Paper),
            )
        },
    ) { padding ->
        if (photo == null) {
            Text("Photograph not found.", modifier = Modifier.padding(padding).padding(24.dp), color = MutedFg)
            return@Scaffold
        }
        Column(
            Modifier.fillMaxSize().padding(padding).verticalScroll(rememberScrollState()).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            vm.error?.let { ErrorBanner(it) }
            Box(Modifier.fillMaxWidth().height(360.dp)) {
                BytesImage(
                    bytes = vm.bytes,
                    rotation = photo.rotation,
                    contentDescription = photo.description.ifBlank { section?.name ?: "Photograph" },
                    modifier = Modifier.fillMaxSize(),
                )
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.horizontalScroll(rememberScrollState())) {
                QuietButton("Rotate left", onClick = { vm.rotate(-90) })
                QuietButton("Rotate right", onClick = { vm.rotate(90) })
                QuietButton("Earlier", onClick = { vm.shift(-1) })
                QuietButton("Later", onClick = { vm.shift(1) })
            }
            Text("Zoom", style = MaterialTheme.typography.labelSmall, color = MutedFg)
            Slider(value = vm.zoom, onValueChange = vm::updateZoom, valueRange = 1f..4f)
            Field("Description", vm.description, { vm.setDescription(it, photo) }, singleLine = false, placeholder = "What this photograph shows")
        }
    }

    if (confirm) {
        ConfirmDialog(
            "Delete this photograph?",
            "The image and its description will be removed from this project.",
            "Delete",
            onConfirm = { confirm = false; vm.delete(onBack) },
            onDismiss = { confirm = false },
        )
    }
    if (move && bundle != null && photo != null) {
        ModalBottomSheet(onDismissRequest = { move = false }, sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)) {
            Column(Modifier.padding(20.dp).padding(bottom = 24.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Move photograph", style = MaterialTheme.typography.titleLarge)
                bundle!!.sections.forEach { sec ->
                    QuietButton(sec.name, onClick = {
                        val phase = if (bundle!!.project.beforeAfterEnabled) photo.phase else PhotoPhase.STANDARD
                        vm.move(sec.id, phase)
                        move = false
                    }, modifier = Modifier.fillMaxWidth())
                }
            }
        }
    }
}
