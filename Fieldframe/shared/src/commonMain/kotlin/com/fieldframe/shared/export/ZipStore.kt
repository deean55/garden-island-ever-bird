package com.fieldframe.shared.export

/**
 * ZIP using the STORE method (no compression). JPEGs do not deflate well,
 * and this stays dependency-free across Android and iOS.
 */
object ZipStore {
    fun encode(entries: Map<String, ByteArray>): ByteArray {
        val out = ByteAppender()
        val central = ByteAppender()
        var offset = 0
        var count = 0
        for ((name, data) in entries) {
            val nameBytes = name.encodeToByteArray()
            val crc = crc32(data)
            out.u32(0x04034b50)
            out.u16(20)
            out.u16(0)
            out.u16(0)
            out.u16(0)
            out.u16(0)
            out.u32(crc)
            out.u32(data.size)
            out.u32(data.size)
            out.u16(nameBytes.size)
            out.u16(0)
            out.bytes(nameBytes)
            out.bytes(data)

            central.u32(0x02014b50)
            central.u16(20)
            central.u16(20)
            central.u16(0)
            central.u16(0)
            central.u16(0)
            central.u16(0)
            central.u32(crc)
            central.u32(data.size)
            central.u32(data.size)
            central.u16(nameBytes.size)
            central.u16(0)
            central.u16(0)
            central.u16(0)
            central.u16(0)
            central.u32(0)
            central.u32(offset)
            central.bytes(nameBytes)

            offset = out.size
            count += 1
        }
        val centralOffset = out.size
        out.bytes(central.toByteArray())
        out.u32(0x06054b50)
        out.u16(0)
        out.u16(0)
        out.u16(count)
        out.u16(count)
        out.u32(central.size)
        out.u32(centralOffset)
        out.u16(0)
        return out.toByteArray()
    }

    fun decode(bytes: ByteArray): Map<String, ByteArray> {
        val result = LinkedHashMap<String, ByteArray>()
        var i = 0
        while (i + 30 <= bytes.size) {
            val sig = u32(bytes, i)
            if (sig == 0x02014b50 || sig == 0x06054b50) break
            if (sig != 0x04034b50) {
                i += 1
                continue
            }
            val method = u16(bytes, i + 8)
            val compressed = u32(bytes, i + 18).toInt()
            val uncompressed = u32(bytes, i + 22).toInt()
            val nameLen = u16(bytes, i + 26)
            val extraLen = u16(bytes, i + 28)
            val nameStart = i + 30
            val nameEnd = nameStart + nameLen
            if (nameEnd > bytes.size) break
            val name = bytes.decodeToString(nameStart, nameEnd)
            val dataStart = nameEnd + extraLen
            val dataEnd = dataStart + compressed
            if (dataEnd > bytes.size) break
            val slice = bytes.copyOfRange(dataStart, dataEnd)
            val data = when (method) {
                0 -> slice
                8 -> inflate(slice, uncompressed)
                else -> error("Unsupported ZIP compression in package.")
            }
            result[name] = data
            i = dataEnd
        }
        if (!result.containsKey("project.json")) {
            error("This file is not a valid Fieldframe package.")
        }
        return result
    }

    private fun inflate(data: ByteArray, size: Int): ByteArray {
        // Platform inflate for deflated entries produced by other zippers.
        return inflateBytes(data, size)
    }
}

internal expect fun inflateBytes(data: ByteArray, uncompressedSize: Int): ByteArray

internal class ByteAppender {
    private var buf = ByteArray(1024)
    var size: Int = 0
        private set

    fun bytes(src: ByteArray) {
        ensure(src.size)
        src.copyInto(buf, size)
        size += src.size
    }

    fun u16(value: Int) {
        ensure(2)
        buf[size] = (value and 0xff).toByte()
        buf[size + 1] = ((value ushr 8) and 0xff).toByte()
        size += 2
    }

    fun u32(value: Int) {
        ensure(4)
        buf[size] = (value and 0xff).toByte()
        buf[size + 1] = ((value ushr 8) and 0xff).toByte()
        buf[size + 2] = ((value ushr 16) and 0xff).toByte()
        buf[size + 3] = ((value ushr 24) and 0xff).toByte()
        size += 4
    }

    fun toByteArray(): ByteArray = buf.copyOf(size)

    private fun ensure(more: Int) {
        val need = size + more
        if (need <= buf.size) return
        var cap = buf.size
        while (cap < need) cap *= 2
        buf = buf.copyOf(cap)
    }
}

internal fun crc32(data: ByteArray): Int {
    var crc = 0.inv()
    for (b in data) {
        val idx = (crc xor (b.toInt() and 0xff)) and 0xff
        crc = CRC_TABLE[idx] xor (crc ushr 8)
    }
    return crc.inv()
}

private val CRC_TABLE: IntArray = IntArray(256) { n ->
    var c = n
    repeat(8) {
        c = if (c and 1 != 0) 0xEDB88320.toInt() xor (c ushr 1) else c ushr 1
    }
    c
}

private fun u16(bytes: ByteArray, i: Int): Int =
    (bytes[i].toInt() and 0xff) or ((bytes[i + 1].toInt() and 0xff) shl 8)

private fun u32(bytes: ByteArray, i: Int): Int =
    (bytes[i].toInt() and 0xff) or
        ((bytes[i + 1].toInt() and 0xff) shl 8) or
        ((bytes[i + 2].toInt() and 0xff) shl 16) or
        ((bytes[i + 3].toInt() and 0xff) shl 24)
