package com.fieldframe.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fieldframe.shared.data.ProjectRepository
import com.fieldframe.shared.domain.todayIsoDate
import com.fieldframe.shared.export.unzipPhotoDoc
import com.fieldframe.shared.model.ProjectSummary
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

@OptIn(ExperimentalCoroutinesApi::class)
class DashboardViewModel(
    private val repo: ProjectRepository,
) : ViewModel() {
    val query = MutableStateFlow("")
    val projects: StateFlow<List<ProjectSummary>> = query
        .flatMapLatest { repo.observeSummaries(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    var error by mutableStateOf<String?>(null)
        private set
    var busy by mutableStateOf(false)
        private set

    fun setQuery(value: String) {
        query.value = value
    }

    fun createProject(
        name: String,
        description: String,
        date: String,
        reference: String,
        beforeAfter: Boolean,
        onCreated: (String) -> Unit,
    ) {
        viewModelScope.launch {
            busy = true
            runCatching {
                repo.createProject(name, description, date.ifBlank { todayIsoDate() }, reference, beforeAfter)
            }.onSuccess { onCreated(it.id) }
                .onFailure { error = it.message ?: "Could not create the project." }
            busy = false
        }
    }

    fun importPackage(bytes: ByteArray, onImported: (String) -> Unit) {
        viewModelScope.launch {
            busy = true
            runCatching {
                val pkg = unzipPhotoDoc(bytes)
                repo.importBundle(pkg.bundle, pkg.photoBytes)
            }.onSuccess { onImported(it.id) }
                .onFailure { error = it.message ?: "Could not import this package." }
            busy = false
        }
    }

    fun clearError() {
        error = null
    }
}
