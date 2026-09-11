package com.fieldframe.platform

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.toComposeImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.viewinterop.UIKitView
import com.fieldframe.shared.data.toByteArray
import com.fieldframe.shared.data.toNSData
import com.fieldframe.shared.model.ImageBytes
import kotlinx.cinterop.ExperimentalForeignApi
import org.jetbrains.skia.Image
import platform.Foundation.NSTemporaryDirectory
import platform.Foundation.NSURL
import platform.Foundation.writeToFile
import platform.PDFKit.PDFDocument
import platform.PDFKit.PDFView
import platform.PhotosUI.PHPickerConfiguration
import platform.PhotosUI.PHPickerFilter
import platform.PhotosUI.PHPickerResult
import platform.PhotosUI.PHPickerViewController
import platform.PhotosUI.PHPickerViewControllerDelegateProtocol
import platform.UIKit.UIActivityViewController
import platform.UIKit.UIApplication
import platform.UIKit.UIDocumentPickerDelegateProtocol
import platform.UIKit.UIDocumentPickerViewController
import platform.UIKit.UIImagePickerController
import platform.UIKit.UIImagePickerControllerDelegateProtocol
import platform.UIKit.UIImagePickerControllerOriginalImage
import platform.UIKit.UIImagePickerControllerSourceType
import platform.UIKit.UINavigationControllerDelegateProtocol
import platform.UIKit.UIImage
import platform.UIKit.UIImageJPEGRepresentation
import platform.UIKit.UIViewController
import platform.UniformTypeIdentifiers.UTTypeImage
import platform.UniformTypeIdentifiers.UTTypePDF
import platform.UniformTypeIdentifiers.UTTypeZIP
import platform.darwin.NSObject

private fun topController(): UIViewController? {
    val root = UIApplication.sharedApplication.keyWindow?.rootViewController
    var current = root
    while (current?.presentedViewController != null) {
        current = current?.presentedViewController
    }
    return current
}

@Composable
actual fun rememberGalleryPicker(onPicked: (List<ImageBytes>) -> Unit): () -> Unit {
    val delegate = remember {
        object : NSObject(), PHPickerViewControllerDelegateProtocol {
            override fun picker(picker: PHPickerViewController, didFinishPicking: List<*>) {
                picker.dismissViewControllerAnimated(true, null)
                val images = ArrayList<ImageBytes>()
                val results = didFinishPicking.filterIsInstance<PHPickerResult>()
                if (results.isEmpty()) return
                var remaining = results.size
                results.forEach { result ->
                    result.itemProvider.loadDataRepresentationForTypeIdentifier(
                        UTTypeImage.identifier,
                    ) { data, _ ->
                        if (data != null) {
                            images += ImageBytes(data.toByteArray(), "image/jpeg", "gallery.jpg")
                        }
                        remaining -= 1
                        if (remaining <= 0 && images.isNotEmpty()) onPicked(images.toList())
                    }
                }
            }
        }
    }
    return {
        val config = PHPickerConfiguration()
        config.selectionLimit = 20
        config.filter = PHPickerFilter.imagesFilter
        val picker = PHPickerViewController(config)
        picker.delegate = delegate
        topController()?.presentViewController(picker, true, null)
    }
}

@Composable
actual fun rememberPackagePicker(onPicked: (ByteArray) -> Unit, onError: (String) -> Unit): () -> Unit {
    val delegate = remember {
        object : NSObject(), UIDocumentPickerDelegateProtocol {
            override fun documentPicker(controller: UIDocumentPickerViewController, didPickDocumentsAtURLs: List<*>) {
                val url = didPickDocumentsAtURLs.firstOrNull() as? NSURL
                val data = url?.let { platform.Foundation.NSData.dataWithContentsOfURL(it) }
                if (data != null) onPicked(data.toByteArray())
                else onError("Could not read the selected file.")
            }
        }
    }
    return {
        val picker = UIDocumentPickerViewController(forOpeningContentTypes = listOf(UTTypeZIP))
        picker.delegate = delegate
        topController()?.presentViewController(picker, true, null)
    }
}

@Composable
actual fun rememberSaveFile(
    mimeType: String,
    onSaved: (Boolean) -> Unit,
): (filename: String, bytes: ByteArray) -> Unit {
    return { filename, bytes ->
        val path = NSTemporaryDirectory() + filename
        val ok = bytes.toNSData().writeToFile(path, true)
        if (ok) {
            val url = NSURL.fileURLWithPath(path)
            val types = if (mimeType.contains("pdf")) listOf(UTTypePDF) else listOf(UTTypeZIP)
            val picker = UIDocumentPickerViewController(forExportingURLs = listOf(url), asCopy = true)
            topController()?.presentViewController(picker, true, null)
            onSaved(true)
        } else onSaved(false)
    }
}

actual fun shareFile(bytes: ByteArray, filename: String, mimeType: String, title: String) {
    val path = NSTemporaryDirectory() + filename
    bytes.toNSData().writeToFile(path, true)
    val url = NSURL.fileURLWithPath(path)
    val activity = UIActivityViewController(activityItems = listOf(url), applicationActivities = null)
    topController()?.presentViewController(activity, true, null)
}

actual fun openFile(bytes: ByteArray, filename: String, mimeType: String) {
    shareFile(bytes, filename, mimeType, filename)
}

@Composable
actual fun BytesImage(
    bytes: ByteArray?,
    rotation: Int,
    contentDescription: String,
    modifier: Modifier,
) {
    val image = remember(bytes, rotation) {
        bytes?.let {
            runCatching { Image.makeFromEncoded(it).toComposeImageBitmap() }.getOrNull()
        }
    }
    if (image != null) {
        Image(
            bitmap = image,
            contentDescription = contentDescription,
            modifier = modifier,
            contentScale = ContentScale.Crop,
        )
    }
}

@OptIn(ExperimentalForeignApi::class)
@Composable
actual fun PdfDocumentPreview(bytes: ByteArray, modifier: Modifier) {
    val data = remember(bytes) { bytes.toNSData() }
    UIKitView(
        modifier = modifier.fillMaxSize(),
        factory = {
            PDFView().apply {
                document = PDFDocument(data = data)
                autoScales = true
            }
        },
    )
}

@Composable
actual fun CameraCaptureOverlay(
    onCaptured: (ImageBytes) -> Unit,
    onDismiss: () -> Unit,
) {
    val delegate = remember {
        object : NSObject(), UIImagePickerControllerDelegateProtocol, UINavigationControllerDelegateProtocol {
            override fun imagePickerController(
                picker: UIImagePickerController,
                didFinishPickingMediaWithInfo: Map<Any?, *>,
            ) {
                val image = didFinishPickingMediaWithInfo[UIImagePickerControllerOriginalImage] as? UIImage
                picker.dismissViewControllerAnimated(true, null)
                val data = image?.let { UIImageJPEGRepresentation(it, 0.92) }
                if (data != null) {
                    onCaptured(ImageBytes(data.toByteArray(), "image/jpeg", "capture.jpg"))
                } else onDismiss()
            }

            override fun imagePickerControllerDidCancel(picker: UIImagePickerController) {
                picker.dismissViewControllerAnimated(true, null)
                onDismiss()
            }
        }
    }
    androidx.compose.runtime.LaunchedEffect(Unit) {
        val picker = UIImagePickerController()
        picker.sourceType = UIImagePickerControllerSourceType.UIImagePickerControllerSourceTypeCamera
        picker.delegate = delegate
        picker.allowsEditing = false
        val host = topController()
        if (host == null || !UIImagePickerController.isSourceTypeAvailable(
                UIImagePickerControllerSourceType.UIImagePickerControllerSourceTypeCamera,
            )
        ) {
            onDismiss()
        } else {
            host.presentViewController(picker, true, null)
        }
    }
}
