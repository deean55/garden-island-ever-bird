package com.fieldframe.shared.domain

import java.util.UUID

internal actual fun currentTimeMillis(): Long = System.currentTimeMillis()

internal actual fun newId(): String = UUID.randomUUID().toString()
