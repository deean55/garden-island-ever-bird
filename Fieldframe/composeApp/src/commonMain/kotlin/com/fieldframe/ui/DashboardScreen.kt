package com.fieldframe.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.PhotoCamera
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.fieldframe.platform.BytesImage
import com.fieldframe.platform.LocalAppContainer
import com.fieldframe.platform.rememberPackagePicker
import com.fieldframe.shared.domain.todayIsoDate
import com.fieldframe.shared.model.ProjectSummary
import com.fieldframe.theme.MutedFg
import com.fieldframe.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    onOpenProject: (String) -> Unit,
) {
    val container = LocalAppContainer.current
    val vm = viewModel { DashboardViewModel(container.repository) }
    val projects by vm.projects.collectAsState()
    val query by vm.query.collectAsState()
    var showNew by remember { mutableStateOf(false) }
    val importPackage = rememberPackagePicker(
        onPicked = { bytes -> vm.importPackage(bytes, onOpenProject) },
        onError = { },
    )

    Scaffold { padding ->
        Column(
            Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
        ) {
            Column(Modifier.padding(top = 24.dp, bottom = 16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Kicker("FIELDFRAME · KOTLIN MULTIPLATFORM")
                Text("Photo records", style = MaterialTheme.typography.headlineLarge)
                Text(
                    "Inspection, property, vehicle, and site documentation — stored only on this device.",
                    color = MutedFg,
                    style = MaterialTheme.typography.bodyMedium,
                )
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    QuietButton("Import", onClick = importPackage)
                    PrimaryButton("New project", onClick = { showNew = true })
                }
            }
            OutlinedTextField(
                value = query,
                onValueChange = vm::setQuery,
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                placeholder = { Text("Search projects, references, descriptions") },
                leadingIcon = { Icon(Icons.Outlined.Search, contentDescription = null) },
                shape = FieldShape,
            )
            vm.error?.let { ErrorBanner(it) }
            when {
                projects.isEmpty() && query.isBlank() -> EmptyState { showNew = true }
                projects.isEmpty() -> Text(
                    "No projects match “$query”.",
                    color = MutedFg,
                    modifier = Modifier.padding(top = 24.dp),
                )
                else -> LazyVerticalGrid(
                    columns = GridCells.Adaptive(260.dp),
                    modifier = Modifier.fillMaxSize().padding(top = 16.dp),
                    contentPadding = PaddingValues(bottom = 48.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    items(projects, key = { it.project.id }) { item ->
                        ProjectCard(item, onOpenProject)
                    }
                }
            }
        }
    }

    if (showNew) {
        NewProjectSheet(
            onDismiss = { showNew = false },
            onCreate = { name, desc, date, ref, ba ->
                vm.createProject(name, desc, date, ref, ba) {
                    showNew = false
                    onOpenProject(it)
                }
            },
        )
    }
}

@Composable
private fun EmptyState(onCreate: () -> Unit) {
    Surface(
        modifier = Modifier.fillMaxWidth().padding(top = 48.dp),
        shape = CardShape,
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 1.dp,
    ) {
        Column(
            Modifier.padding(40.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            Kicker("START A RECORD")
            Text("No projects yet", style = MaterialTheme.typography.headlineMedium)
            Text(
                "Create a project to capture twelve standard angles, add custom sections, and generate a professional PDF report.",
                color = MutedFg,
                style = MaterialTheme.typography.bodyMedium,
            )
            PrimaryButton("New project", onClick = onCreate, modifier = Modifier.padding(top = 8.dp))
        }
    }
}

@Composable
private fun ProjectCard(item: ProjectSummary, onOpen: (String) -> Unit) {
    val repo = LocalAppContainer.current.repository
    var cover by remember(item.coverPhotoId) { mutableStateOf<ByteArray?>(null) }
    LaunchedEffect(item.coverPhotoId) {
        cover = item.coverPhotoId?.let { repo.getThumbBytes(it) }
    }
    Surface(
        modifier = Modifier.fillMaxWidth().clickable { onOpen(item.project.id) },
        shape = CardShape,
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 1.dp,
    ) {
        Column {
            Box(
                Modifier.fillMaxWidth().aspectRatio(16f / 10f),
                contentAlignment = Alignment.Center,
            ) {
                if (cover != null) {
                    BytesImage(cover, 0, item.project.name, Modifier.fillMaxSize())
                } else {
                    Icon(Icons.Outlined.PhotoCamera, null, tint = MutedFg)
                }
            }
            Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(item.project.name.ifBlank { "Untitled project" }, style = MaterialTheme.typography.titleLarge)
                val meta = buildString {
                    append(item.project.date)
                    if (item.project.referenceNumber.isNotBlank()) append(" · ${item.project.referenceNumber}")
                }
                Text(meta, color = MutedFg, style = MaterialTheme.typography.labelSmall)
                Text(
                    "${item.photoCount} photograph${if (item.photoCount == 1) "" else "s"}",
                    color = MutedFg,
                    style = MaterialTheme.typography.labelSmall,
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun NewProjectSheet(
    onDismiss: () -> Unit,
    onCreate: (name: String, desc: String, date: String, ref: String, ba: Boolean) -> Unit,
) {
    var name by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }
    var date by remember { mutableStateOf(todayIsoDate()) }
    var ref by remember { mutableStateOf("") }
    var ba by remember { mutableStateOf(false) }
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    ) {
        Column(
            Modifier.padding(horizontal = 20.dp).padding(bottom = 32.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text("New project", style = MaterialTheme.typography.titleLarge)
            Text(
                "Twelve standard angles are added automatically. Everything stays on this device.",
                color = MutedFg,
            )
            Field("Project name", name, { name = it }, placeholder = "Front elevation — 14 Oak Street")
            Field("Reference / ID", ref, { ref = it })
            Field("Date", date, { date = it })
            Field("Description", desc, { desc = it }, singleLine = false)
            BeforeAfterToggle(ba) { ba = it }
            PrimaryButton(
                "Create project",
                onClick = { onCreate(name, desc, date, ref, ba) },
                modifier = Modifier.fillMaxWidth(),
            )
        }
    }
}
