package com.fieldframe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.fieldframe.platform.AndroidApp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        AndroidApp.activity = this
        enableEdgeToEdge()
        val app = application as FieldframeApplication
        setContent {
            FieldframeApp(app.container)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        if (AndroidApp.activity === this) AndroidApp.activity = null
    }
}
