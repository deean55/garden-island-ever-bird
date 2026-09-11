package com.fieldframe.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fieldframe.shared.data.ProjectRepository
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.shared.model.Photo
import com.fieldframe.shared.model.ProjectBundle
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PhotoViewModel(
    private val projectId: String,
    private val photoId: String,
    private val repo: ProjectRepository,
) : ViewModel() {
    val bundle: StateFlow<ProjectBundle?> = repo.observeBundle(projectId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), null)

    var description by mutableStateOf("")
        private set
    var zoom by mutableStateOf(1f)
        private set
    var bytes by mutableStateOf<ByteArray?>(null)
        private set
    private var hydrated = false
    private var saveJob: Job? = null
    var error by mutableStateOf<String?>(null)
        private set

    init {
        viewModelScope.launch {
            bytes = repo.getPhotoBytes(photoId)
        }
    }

    fun hydrate(photo: Photo) {
        if (hydrated) return
        description = photo.description
        hydrated = true
    }

    fun setDescription(value: String, photo: Photo) {
        description = value
        saveJob?.cancel()
        saveJob = viewModelScope.launch {
            delay(400)
            repo.updatePhoto(photo.copy(description = value))
        }
    }

    fun setZoom(value: Float) {
        zoom = value.coerceIn(1f, 4f)
    }

    fun rotate(delta: Int) {
        viewModelScope.launch {
            repo.rotatePhoto(photoId, delta)
            bytes = repo.getPhotoBytes(photoId)
        }
    }

    fun replace(image: ImageBytes) {
        viewModelScope.launch {
            runCatching { repo.replacePhoto(photoId, image) }
                .onSuccess { bytes = repo.getPhotoBytes(photoId) }
                .onFailure { error = it.message ?: "Could not replace this photograph." }
        }
    }

    fun move(sectionId: String, phase: String?) {
        viewModelScope.launch { repo.movePhoto(photoId, sectionId, phase) }
    }

    fun shift(direction: Int) {
        viewModelScope.launch { repo.shiftPhoto(photoId, direction) }
    }

    fun delete(onDeleted: () -> Unit) {
        viewModelScope.launch {
            repo.deletePhoto(photoId)
            onDeleted()
        }
    }
}
