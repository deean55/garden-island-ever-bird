package com.fieldframe.shared.data

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import java.io.ByteArrayOutputStream
import java.io.File

class AndroidImageStore(context: Context) {
    private val photosDir = File(context.filesDir, "photos").also { it.mkdirs() }
    private val thumbsDir = File(context.filesDir, "thumbs").also { it.mkdirs() }

    fun photoFile(id: String): File = File(photosDir, id)
    fun thumbFile(id: String): File = File(thumbsDir, "$id.jpg")

    fun writePhoto(id: String, bytes: ByteArray) {
        photoFile(id).writeBytes(bytes)
    }

    fun writeThumb(id: String, bytes: ByteArray) {
        thumbFile(id).writeBytes(bytes)
    }

    fun readPhoto(id: String): ByteArray? {
        val file = photoFile(id)
        return if (file.exists()) file.readBytes() else null
    }

    fun readThumb(id: String): ByteArray? {
        val file = thumbFile(id)
        return if (file.exists()) file.readBytes() else readPhoto(id)
    }

    fun deletePhoto(id: String) {
        photoFile(id).delete()
        thumbFile(id).delete()
    }

    fun deleteAll(ids: List<String>) {
        ids.forEach { deletePhoto(it) }
    }

    fun decodeBounds(bytes: ByteArray): Pair<Int, Int> {
        val opts = BitmapFactory.Options().apply { inJustDecodeBounds = true }
        BitmapFactory.decodeByteArray(bytes, 0, bytes.size, opts)
        if (opts.outWidth <= 0 || opts.outHeight <= 0) {
            error("This image could not be read. Try a JPEG or PNG file.")
        }
        return opts.outWidth to opts.outHeight
    }

    fun makeThumbnail(bytes: ByteArray, rotation: Int, maxSize: Int = 480): ByteArray {
        val bitmap = decodeScaled(bytes, maxSize) ?: error("This image could not be read. Try a JPEG or PNG file.")
        val rotated = rotate(bitmap, rotation)
        if (rotated !== bitmap) bitmap.recycle()
        return try {
            encodeJpeg(rotated, 82)
        } finally {
            rotated.recycle()
        }
    }

    fun rasterize(bytes: ByteArray, rotation: Int, maxEdge: Int = 2200): Bitmap {
        val bitmap = decodeScaled(bytes, maxEdge) ?: error("This image could not be read. Try a JPEG or PNG file.")
        val rotated = rotate(bitmap, rotation)
        if (rotated !== bitmap) bitmap.recycle()
        return rotated
    }

    private fun decodeScaled(bytes: ByteArray, maxEdge: Int): Bitmap? {
        val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
        BitmapFactory.decodeByteArray(bytes, 0, bytes.size, bounds)
        val w = bounds.outWidth
        val h = bounds.outHeight
        if (w <= 0 || h <= 0) return null
        var sample = 1
        val longest = maxOf(w, h)
        while (longest / sample > maxEdge * 2) sample *= 2
        val opts = BitmapFactory.Options().apply {
            inSampleSize = sample
            inPreferredConfig = Bitmap.Config.ARGB_8888
        }
        return BitmapFactory.decodeByteArray(bytes, 0, bytes.size, opts)
    }

    private fun rotate(bitmap: Bitmap, rotation: Int): Bitmap {
        val deg = ((rotation % 360) + 360) % 360
        if (deg == 0) return bitmap
        val matrix = Matrix().apply { postRotate(deg.toFloat()) }
        return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
    }

    private fun encodeJpeg(bitmap: Bitmap, quality: Int): ByteArray {
        val out = ByteArrayOutputStream()
        if (!bitmap.compress(Bitmap.CompressFormat.JPEG, quality, out)) {
            error("Could not encode the image.")
        }
        return out.toByteArray()
    }
}
