package com.fieldframe.platform

import android.Manifest
import android.content.pm.PackageManager
import android.util.Size
import android.view.ViewGroup
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.ui.PrimaryButton
import com.fieldframe.ui.QuietButton
import java.io.File
import java.util.concurrent.Executor

@Composable
actual fun CameraCaptureOverlay(
    onCaptured: (ImageBytes) -> Unit,
    onDismiss: () -> Unit,
) {
    val context = LocalContext.current
    var granted by remember {
        mutableStateOf(
            ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED,
        )
    }
    var denied by remember { mutableStateOf(false) }
    val permission = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { ok ->
        granted = ok
        denied = !ok
    }
    LaunchedEffect(Unit) {
        if (!granted) permission.launch(Manifest.permission.CAMERA)
    }

    Box(Modifier.fillMaxSize().background(Color.Black)) {
        when {
            denied -> PermissionDenied(onDismiss) { permission.launch(Manifest.permission.CAMERA) }
            granted -> CameraPreview(onCaptured, onDismiss)
            else -> Text("Waiting for camera permission…", color = Color.White, modifier = Modifier.align(Alignment.Center))
        }
    }
}

@Composable
private fun PermissionDenied(onDismiss: () -> Unit, onRetry: () -> Unit) {
    Column(
        Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("Camera permission was denied.", color = Color.White)
        Text(
            "Fieldframe needs the camera to capture inspection photographs. You can still add photos from the gallery.",
            color = Color.White.copy(alpha = 0.7f),
            modifier = Modifier.padding(top = 8.dp, bottom = 16.dp),
        )
        PrimaryButton("Try again", onClick = onRetry)
        QuietButton("Close", onClick = onDismiss)
    }
}

@Composable
private fun CameraPreview(
    onCaptured: (ImageBytes) -> Unit,
    onDismiss: () -> Unit,
) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val imageCapture = remember {
        ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
            .setTargetResolution(Size(1920, 1440))
            .build()
    }
    var facing by remember { mutableStateOf(CameraSelector.LENS_FACING_BACK) }
    var error by remember { mutableStateOf<String?>(null) }
    val executor: Executor = remember { ContextCompat.getMainExecutor(context) }

    Box(Modifier.fillMaxSize()) {
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { ctx ->
                PreviewView(ctx).apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT,
                    )
                    scaleType = PreviewView.ScaleType.FILL_CENTER
                }
            },
            update = { previewView ->
                val providerFuture = ProcessCameraProvider.getInstance(context)
                providerFuture.addListener({
                    val provider = providerFuture.get()
                    val preview = Preview.Builder().build().also {
                        it.setSurfaceProvider(previewView.surfaceProvider)
                    }
                    val selector = CameraSelector.Builder().requireLensFacing(facing).build()
                    try {
                        provider.unbindAll()
                        provider.bindToLifecycle(lifecycleOwner, selector, preview, imageCapture)
                    } catch (e: Exception) {
                        error = e.message ?: "Could not start the camera."
                    }
                }, executor)
            },
        )
        Column(
            Modifier.align(Alignment.BottomCenter).fillMaxWidth().padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            error?.let { Text(it, color = Color.White) }
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                TextButton(onClick = onDismiss) { Text("Cancel", color = Color.White) }
                TextButton(onClick = {
                    facing = if (facing == CameraSelector.LENS_FACING_BACK)
                        CameraSelector.LENS_FACING_FRONT else CameraSelector.LENS_FACING_BACK
                }) { Text("Flip", color = Color.White) }
            }
            PrimaryButton("Capture", onClick = {
                val file = File(context.cacheDir, "capture-${System.currentTimeMillis()}.jpg")
                val output = ImageCapture.OutputFileOptions.Builder(file).build()
                imageCapture.takePicture(
                    output,
                    executor,
                    object : ImageCapture.OnImageSavedCallback {
                        override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                            val bytes = file.readBytes()
                            onCaptured(ImageBytes(bytes, "image/jpeg", file.name))
                        }

                        override fun onError(exception: ImageCaptureException) {
                            error = when {
                                exception.message?.contains("permission", true) == true ->
                                    "Permission was denied."
                                else -> exception.message ?: "Could not capture the photograph."
                            }
                        }
                    },
                )
            })
        }
    }
    DisposableEffect(Unit) {
        onDispose {
            runCatching { ProcessCameraProvider.getInstance(context).get().unbindAll() }
        }
    }
}
