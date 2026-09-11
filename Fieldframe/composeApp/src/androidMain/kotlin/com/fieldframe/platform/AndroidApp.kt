package com.fieldframe.platform

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import androidx.activity.ComponentActivity

@SuppressLint("StaticFieldLeak")
object AndroidApp {
    lateinit var context: Application
    var activity: ComponentActivity? = null

    fun requireContext(): Context = activity ?: context
}
