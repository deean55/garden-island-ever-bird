package com.fieldframe.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.fieldframe.platform.LocalAppContainer
import com.fieldframe.platform.PdfDocumentPreview
import com.fieldframe.platform.openFile
import com.fieldframe.platform.rememberSaveFile
import com.fieldframe.platform.shareFile
import com.fieldframe.theme.Forest
import com.fieldframe.theme.MutedFg
import com.fieldframe.theme.Paper
import com.fieldframe.viewmodel.PdfViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PdfScreen(
    projectId: String,
    onBack: () -> Unit,
) {
    val container = LocalAppContainer.current
    val vm = viewModel(key = "pdf-$projectId") {
        PdfViewModel(projectId, container.repository, container.pdfGenerator)
    }
    val snack = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    val save = rememberSaveFile("application/pdf") { ok ->
        if (ok) scope.launch { snack.showSnackbar("PDF saved") }
    }

    Scaffold(
        containerColor = Paper,
        snackbarHost = { SnackbarHost(snack) },
        topBar = {
            TopAppBar(
                title = { Text("Report", style = MaterialTheme.typography.titleLarge) },
                navigationIcon = {
                    IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Outlined.ArrowBack, "Back") }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Paper),
            )
        },
    ) { padding ->
        Column(Modifier.fillMaxSize().padding(padding)) {
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                QuietButton("Save", onClick = {
                    vm.pdf?.let { save(it.filename, it.bytes) }
                })
                QuietButton("Open", onClick = {
                    vm.pdf?.let { openFile(it.bytes, it.filename, "application/pdf") }
                })
                QuietButton("Share", onClick = {
                    vm.pdf?.let { shareFile(it.bytes, it.filename, "application/pdf", it.filename) }
                })
            }
            when {
                vm.busy -> {
                    Column(
                        Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        CircularProgressIndicator(color = Forest)
                        Text("Preparing report…", color = MutedFg, modifier = Modifier.padding(top = 12.dp))
                    }
                }
                vm.error != null -> ErrorBanner(vm.error ?: "")
                vm.pdf != null -> PdfDocumentPreview(vm.pdf!!.bytes, Modifier.fillMaxSize())
            }
        }
    }
}
