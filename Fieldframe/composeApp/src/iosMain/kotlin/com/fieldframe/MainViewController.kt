package com.fieldframe

import androidx.compose.ui.window.ComposeUIViewController
import com.fieldframe.platform.AppContainer
import com.fieldframe.shared.data.IosFileStore
import com.fieldframe.shared.data.IosProjectRepository
import com.fieldframe.shared.pdf.IosPdfGenerator
import platform.UIKit.UIViewController

fun MainViewController(): UIViewController {
    val files = IosFileStore()
    val container = AppContainer(
        repository = IosProjectRepository(files),
        pdfGenerator = IosPdfGenerator(files),
    )
    return ComposeUIViewController { FieldframeApp(container) }
}
