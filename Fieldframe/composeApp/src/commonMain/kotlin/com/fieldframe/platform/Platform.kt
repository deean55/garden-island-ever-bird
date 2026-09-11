package com.fieldframe.platform

import androidx.compose.runtime.Composable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.Modifier
import com.fieldframe.shared.data.ProjectRepository
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.shared.pdf.PdfGenerator

data class AppContainer(
    val repository: ProjectRepository,
    val pdfGenerator: PdfGenerator,
)

val LocalAppContainer = staticCompositionLocalOf<AppContainer> {
    error("AppContainer is not provided")
}

@Composable
expect fun rememberGalleryPicker(onPicked: (List<ImageBytes>) -> Unit): () -> Unit

@Composable
expect fun rememberPackagePicker(onPicked: (ByteArray) -> Unit, onError: (String) -> Unit): () -> Unit

@Composable
expect fun rememberSaveFile(
    mimeType: String,
    onSaved: (Boolean) -> Unit,
): (filename: String, bytes: ByteArray) -> Unit

expect fun shareFile(bytes: ByteArray, filename: String, mimeType: String, title: String)

expect fun openFile(bytes: ByteArray, filename: String, mimeType: String)

@Composable
expect fun CameraCaptureOverlay(
    onCaptured: (ImageBytes) -> Unit,
    onDismiss: () -> Unit,
)

@Composable
expect fun PdfDocumentPreview(bytes: ByteArray, modifier: Modifier = Modifier)

@Composable
expect fun BytesImage(
    bytes: ByteArray?,
    rotation: Int,
    contentDescription: String,
    modifier: Modifier = Modifier,
)
