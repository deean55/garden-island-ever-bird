package com.fieldframe.shared.data

import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.addressOf
import kotlinx.cinterop.usePinned
import platform.Foundation.NSData
import platform.Foundation.NSDocumentDirectory
import platform.Foundation.NSFileManager
import platform.Foundation.NSSearchPathForDirectoriesInDomains
import platform.Foundation.NSUserDomainMask
import platform.Foundation.create
import platform.Foundation.dataWithContentsOfFile
import platform.Foundation.writeToFile

@OptIn(ExperimentalForeignApi::class)
class IosFileStore {
    private val root: String = run {
        val paths = NSSearchPathForDirectoriesInDomains(
            NSDocumentDirectory,
            NSUserDomainMask,
            true,
        )
        val base = paths.firstOrNull() as? String ?: error("Not enough storage available on this device.")
        val dir = "$base/fieldframe"
        NSFileManager.defaultManager.createDirectoryAtPath(dir, true, null, null)
        NSFileManager.defaultManager.createDirectoryAtPath("$dir/photos", true, null, null)
        NSFileManager.defaultManager.createDirectoryAtPath("$dir/thumbs", true, null, null)
        dir
    }

    val indexPath: String get() = "$root/index.json"
    fun photoPath(id: String) = "$root/photos/$id"
    fun thumbPath(id: String) = "$root/thumbs/$id.jpg"

    fun readIndex(): String? = NSData.dataWithContentsOfFile(indexPath)?.toByteArray()?.decodeToString()

    fun writeIndex(json: String) {
        json.encodeToByteArray().toNSData().writeToFile(indexPath, true)
    }

    fun writePhoto(id: String, bytes: ByteArray) {
        bytes.toNSData().writeToFile(photoPath(id), true)
    }

    fun writeThumb(id: String, bytes: ByteArray) {
        bytes.toNSData().writeToFile(thumbPath(id), true)
    }

    fun readPhoto(id: String): ByteArray? = NSData.dataWithContentsOfFile(photoPath(id))?.toByteArray()

    fun readThumb(id: String): ByteArray? =
        NSData.dataWithContentsOfFile(thumbPath(id))?.toByteArray() ?: readPhoto(id)

    fun deletePhoto(id: String) {
        val fm = NSFileManager.defaultManager
        fm.removeItemAtPath(photoPath(id), null)
        fm.removeItemAtPath(thumbPath(id), null)
    }
}

@OptIn(ExperimentalForeignApi::class)
internal internal fun ByteArray.toNSData(): NSData = usePinned {
    NSData.create(bytes = it.addressOf(0), length = size.toULong())
}

@OptIn(ExperimentalForeignApi::class)
internal internal fun NSData.toByteArray(): ByteArray {
    val out = ByteArray(length.toInt())
    if (out.isEmpty()) return out
    out.usePinned { dest ->
        platform.posix.memcpy(dest.addressOf(0), this.bytes, this.length)
    }
    return out
}
