package com.fieldframe.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fieldframe.shared.data.ProjectRepository
import com.fieldframe.shared.pdf.GeneratedPdf
import com.fieldframe.shared.pdf.PdfGenerator
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PdfViewModel(
    private val projectId: String,
    private val repo: ProjectRepository,
    private val generator: PdfGenerator,
) : ViewModel() {
    val bundle = repo.observeBundle(projectId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), null)

    var pdf by mutableStateOf<GeneratedPdf?>(null)
        private set
    var busy by mutableStateOf(true)
        private set
    var error by mutableStateOf<String?>(null)
        private set

    init {
        refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            busy = true
            error = null
            runCatching {
                val current = repo.getBundle(projectId) ?: error("Project not found")
                val bytes = HashMap<String, ByteArray>()
                for (photo in current.photos) {
                    repo.getPhotoBytes(photo.id)?.let { bytes[photo.id] = it }
                }
                generator.generate(current, bytes)
            }.onSuccess { pdf = it }
                .onFailure { error = it.message ?: "Could not generate the PDF." }
            busy = false
        }
    }
}
