package com.fieldframe

import android.app.Application
import com.fieldframe.platform.AppContainer
import com.fieldframe.platform.AndroidApp
import com.fieldframe.shared.data.AndroidImageStore
import com.fieldframe.shared.data.AndroidProjectRepository
import com.fieldframe.shared.data.FieldframeDatabase
import com.fieldframe.shared.pdf.AndroidPdfGenerator

class FieldframeApplication : Application() {
    lateinit var container: AppContainer
        private set

    override fun onCreate() {
        super.onCreate()
        AndroidApp.context = this
        val db = FieldframeDatabase.create(this)
        val images = AndroidImageStore(this)
        container = AppContainer(
            repository = AndroidProjectRepository(db, images),
            pdfGenerator = AndroidPdfGenerator(images),
        )
    }
}
