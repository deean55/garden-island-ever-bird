package com.fieldframe.platform

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.pdf.PdfRenderer
import android.net.Uri
import android.os.ParcelFileDescriptor
import android.provider.OpenableColumns
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.FileProvider
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.theme.CardShape
import com.fieldframe.theme.Paper
import java.io.File

@Composable
actual fun rememberGalleryPicker(onPicked: (List<ImageBytes>) -> Unit): () -> Unit {
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.PickMultipleVisualMedia(20),
    ) { uris ->
        val images = uris.mapNotNull { uri -> readImage(context, uri) }
        if (images.isNotEmpty()) onPicked(images)
    }
    return {
        launcher.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
    }
}

@Composable
actual fun rememberPackagePicker(onPicked: (ByteArray) -> Unit, onError: (String) -> Unit): () -> Unit {
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri == null) return@rememberLauncherForActivityResult
        runCatching {
            context.contentResolver.openInputStream(uri)?.use { it.readBytes() }
                ?: error("Could not read the selected file.")
        }.onSuccess(onPicked).onFailure { onError(it.message ?: "Could not import this package.") }
    }
    return {
        launcher.launch(arrayOf("application/zip", "application/octet-stream", "*/*"))
    }
}

@Composable
actual fun rememberSaveFile(
    mimeType: String,
    onSaved: (Boolean) -> Unit,
): (filename: String, bytes: ByteArray) -> Unit {
    val context = LocalContext.current
    var pending by remember { mutableStateOf<ByteArray?>(null) }
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument(mimeType)) { uri ->
        val data = pending
        pending = null
        if (uri == null || data == null) {
            onSaved(false)
            return@rememberLauncherForActivityResult
        }
        val ok = runCatching {
            context.contentResolver.openOutputStream(uri)?.use { it.write(data) }
                ?: error("Could not write the file.")
        }.isSuccess
        onSaved(ok)
    }
    return { filename, bytes ->
        pending = bytes
        launcher.launch(filename)
    }
}

actual fun shareFile(bytes: ByteArray, filename: String, mimeType: String, title: String) {
    val context = AndroidApp.requireContext()
    val file = cacheFile(filename, bytes)
    val uri = FileProvider.getUriForFile(context, "${context.packageName}.files", file)
    val intent = Intent(Intent.ACTION_SEND).apply {
        type = mimeType
        putExtra(Intent.EXTRA_STREAM, uri)
        putExtra(Intent.EXTRA_SUBJECT, title)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    }
    context.startActivity(Intent.createChooser(intent, title).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
}

actual fun openFile(bytes: ByteArray, filename: String, mimeType: String) {
    val context = AndroidApp.requireContext()
    val file = cacheFile(filename, bytes)
    val uri = FileProvider.getUriForFile(context, "${context.packageName}.files", file)
    val intent = Intent(Intent.ACTION_VIEW).apply {
        setDataAndType(uri, mimeType)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    }
    context.startActivity(intent)
}

@Composable
actual fun BytesImage(
    bytes: ByteArray?,
    rotation: Int,
    contentDescription: String,
    modifier: Modifier,
) {
    val bitmap = remember(bytes, rotation) {
        bytes?.let { decode(it, rotation) }
    }
    if (bitmap != null) {
        Image(
            bitmap = bitmap.asImageBitmap(),
            contentDescription = contentDescription,
            modifier = modifier,
            contentScale = ContentScale.Crop,
        )
    }
}

@Composable
actual fun PdfDocumentPreview(bytes: ByteArray, modifier: Modifier) {
    val pages = remember(bytes) { renderPdf(bytes) }
    DisposableEffect(pages) {
        onDispose { pages.forEach { it.recycle() } }
    }
    LazyColumn(modifier, verticalArrangement = Arrangement.spacedBy(16.dp)) {
        items(pages) { page ->
            Surface(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                shape = CardShape,
                color = Paper,
                shadowElevation = 2.dp,
            ) {
                Image(
                    bitmap = page.asImageBitmap(),
                    contentDescription = "PDF page",
                    modifier = Modifier.fillMaxWidth(),
                    contentScale = ContentScale.FillWidth,
                )
            }
        }
    }
}

private fun readImage(context: android.content.Context, uri: Uri): ImageBytes? {
    val mime = context.contentResolver.getType(uri) ?: "image/jpeg"
    val name = context.contentResolver.query(uri, null, null, null, null)?.use { cursor ->
        val idx = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
        if (cursor.moveToFirst() && idx >= 0) cursor.getString(idx) else "photo.jpg"
    } ?: "photo.jpg"
    val bytes = context.contentResolver.openInputStream(uri)?.use { it.readBytes() } ?: return null
    return ImageBytes(bytes, mime, name)
}

private fun cacheFile(filename: String, bytes: ByteArray): File {
    val context = AndroidApp.requireContext()
    val file = File(context.cacheDir, filename)
    file.parentFile?.mkdirs()
    file.writeBytes(bytes)
    return file
}

private fun decode(bytes: ByteArray, rotation: Int): Bitmap? {
    val raw = BitmapFactory.decodeByteArray(bytes, 0, bytes.size) ?: return null
    val deg = ((rotation % 360) + 360) % 360
    if (deg == 0) return raw
    val matrix = android.graphics.Matrix().apply { postRotate(deg.toFloat()) }
    val rotated = Bitmap.createBitmap(raw, 0, 0, raw.width, raw.height, matrix, true)
    if (rotated !== raw) raw.recycle()
    return rotated
}

private fun renderPdf(bytes: ByteArray): List<Bitmap> {
    val file = cacheFile("preview.pdf", bytes)
    val pfd = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)
    val renderer = PdfRenderer(pfd)
    val pages = ArrayList<Bitmap>(renderer.pageCount)
    try {
        for (i in 0 until renderer.pageCount) {
            val page = renderer.openPage(i)
            val bitmap = Bitmap.createBitmap(page.width * 2, page.height * 2, Bitmap.Config.ARGB_8888)
            bitmap.eraseColor(android.graphics.Color.WHITE)
            page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
            page.close()
            pages += bitmap
        }
    } finally {
        renderer.close()
        pfd.close()
    }
    return pages
}
