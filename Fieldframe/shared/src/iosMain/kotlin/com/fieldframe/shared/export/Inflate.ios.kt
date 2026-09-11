package com.fieldframe.shared.export

import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.addressOf
import kotlinx.cinterop.usePinned
import platform.compression.COMPRESSION_ZLIB
import platform.compression.compression_decode_buffer

@OptIn(ExperimentalForeignApi::class)
internal actual fun inflateBytes(data: ByteArray, uncompressedSize: Int): ByteArray {
    val destSize = if (uncompressedSize > 0) uncompressedSize else data.size * 4
    val dest = ByteArray(destSize)
    val written = dest.usePinned { d ->
        data.usePinned { s ->
            compression_decode_buffer(
                d.addressOf(0),
                destSize.toULong(),
                s.addressOf(0),
                data.size.toULong(),
                null,
                COMPRESSION_ZLIB,
            )
        }
    }
    if (written == 0uL) error("Could not read a compressed entry in this package.")
    return dest.copyOf(written.toInt())
}
