package com.fieldframe.shared.export

import java.io.ByteArrayOutputStream
import java.util.zip.Inflater

internal actual fun inflateBytes(data: ByteArray, uncompressedSize: Int): ByteArray {
    val inflater = Inflater(true)
    return try {
        inflater.setInput(data)
        val out = ByteArrayOutputStream(if (uncompressedSize > 0) uncompressedSize else data.size * 2)
        val buf = ByteArray(4096)
        while (!inflater.finished()) {
            val n = inflater.inflate(buf)
            if (n == 0) break
            out.write(buf, 0, n)
        }
        out.toByteArray()
    } finally {
        inflater.end()
    }
}
