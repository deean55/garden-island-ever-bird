package com.fieldframe.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fieldframe.shared.data.ProjectRepository
import com.fieldframe.shared.export.packageFilename
import com.fieldframe.shared.export.zipPhotoDoc
import com.fieldframe.shared.model.ImageBytes
import com.fieldframe.shared.model.ProjectBundle
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class ProjectViewModel(
    private val projectId: String,
    private val repo: ProjectRepository,
) : ViewModel() {
    val bundle: StateFlow<ProjectBundle?> = repo.observeBundle(projectId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), null)

    var name by mutableStateOf("")
        private set
    var reference by mutableStateOf("")
        private set
    var date by mutableStateOf("")
        private set
    var description by mutableStateOf("")
        private set
    private var hydrated = false
    private var saveJob: Job? = null
    var error by mutableStateOf<String?>(null)
        private set
    var toast by mutableStateOf<String?>(null)

    fun hydrate(bundle: ProjectBundle) {
        if (hydrated) return
        name = bundle.project.name
        reference = bundle.project.referenceNumber
        date = bundle.project.date
        description = bundle.project.description
        hydrated = true
    }

    fun updateName(value: String) { name = value; scheduleSave() }
    fun updateReference(value: String) { reference = value; scheduleSave() }
    fun updateDate(value: String) { date = value; scheduleSave() }
    fun updateDescription(value: String) { description = value; scheduleSave() }

    private fun scheduleSave() {
        saveJob?.cancel()
        saveJob = viewModelScope.launch {
            delay(500)
            val current = bundle.value ?: return@launch
            runCatching {
                repo.updateProject(
                    current.project.copy(
                        name = name,
                        referenceNumber = reference,
                        date = date,
                        description = description,
                    ),
                )
            }.onFailure { error = it.message ?: "Could not save project details." }
        }
    }

    fun setBeforeAfter(enabled: Boolean) {
        val current = bundle.value ?: return
        viewModelScope.launch {
            repo.updateProject(current.project.copy(beforeAfterEnabled = enabled))
        }
    }

    fun addSection(sectionName: String) {
        viewModelScope.launch {
            runCatching { repo.addSection(projectId, sectionName) }
                .onFailure { error = it.message ?: "Could not add the section." }
        }
    }

    fun renameSection(id: String, sectionName: String) {
        viewModelScope.launch { repo.renameSection(id, sectionName) }
    }

    fun deleteSection(id: String) {
        viewModelScope.launch { repo.deleteSection(id) }
    }

    fun addPhotos(sectionId: String, phase: String, images: List<ImageBytes>) {
        viewModelScope.launch {
            runCatching { repo.addPhotos(projectId, sectionId, images, phase) }
                .onSuccess { toast = if (it.size == 1) "Photograph added" else "${it.size} photographs added" }
                .onFailure { error = it.message ?: "Could not add photographs." }
        }
    }

    fun deleteProject(onDeleted: () -> Unit) {
        viewModelScope.launch {
            runCatching { repo.deleteProject(projectId) }
                .onSuccess { onDeleted() }
                .onFailure { error = it.message ?: "Could not delete the project." }
        }
    }

    suspend fun exportBytes(): Pair<ByteArray, String>? {
        val current = repo.getBundle(projectId) ?: return null
        val bytes = HashMap<String, ByteArray>()
        for (photo in current.photos) {
            repo.getPhotoBytes(photo.id)?.let { bytes[photo.id] = it }
        }
        val zip = zipPhotoDoc(current, bytes)
        return zip to packageFilename(current.project.name)
    }

    suspend fun thumb(id: String): ByteArray? = repo.getThumbBytes(id)
}
