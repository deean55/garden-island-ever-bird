package com.fieldframe.shared.data

import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.useContents
import platform.CoreGraphics.CGAffineTransformMakeRotation
import platform.CoreGraphics.CGRectMake
import platform.CoreGraphics.CGSizeMake
import platform.UIKit.UIGraphicsBeginImageContextWithOptions
import platform.UIKit.UIGraphicsEndImageContext
import platform.UIKit.UIGraphicsGetImageFromCurrentImageContext
import platform.UIKit.UIImage
import platform.UIKit.UIImageJPEGRepresentation
import platform.UIKit.UIImageOrientation
import kotlin.math.PI
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

@OptIn(ExperimentalForeignApi::class)
object IosImages {
    fun size(bytes: ByteArray): Pair<Int, Int> {
        val image = UIImage(data = bytes.toNSData())
            ?: error("This image could not be read. Try a JPEG or PNG file.")
        return image.size.useContents { width.toInt() to height.toInt() }
    }

    fun thumbnail(bytes: ByteArray, rotation: Int, maxSize: Double = 480.0): ByteArray {
        val image = UIImage(data = bytes.toNSData())
            ?: error("This image could not be read. Try a JPEG or PNG file.")
        val rotated = rotate(image, rotation)
        val (w, h) = rotated.size.useContents { width to height }
        val scale = min(1.0, maxSize / max(w, h))
        val destW = max(1.0, round(w * scale))
        val destH = max(1.0, round(h * scale))
        UIGraphicsBeginImageContextWithOptions(CGSizeMake(destW, destH), true, 1.0)
        rotated.drawInRect(CGRectMake(0.0, 0.0, destW, destH))
        val scaled = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        val data = scaled?.let { UIImageJPEGRepresentation(it, 0.82) }
            ?: error("Could not encode the image.")
        return data.toByteArray()
    }

    fun jpeg(bytes: ByteArray, rotation: Int, quality: Double = 0.9): ByteArray {
        val image = UIImage(data = bytes.toNSData())
            ?: error("This image could not be read. Try a JPEG or PNG file.")
        val rotated = rotate(image, rotation)
        val data = UIImageJPEGRepresentation(rotated, quality)
            ?: error("Could not encode the image.")
        return data.toByteArray()
    }

    private fun rotate(image: UIImage, rotation: Int): UIImage {
        val deg = ((rotation % 360) + 360) % 360
        if (deg == 0) return image
        val radians = deg * PI / 180.0
        val (w, h) = image.size.useContents { width to height }
        val swapped = deg == 90 || deg == 270
        val dw = if (swapped) h else w
        val dh = if (swapped) w else h
        UIGraphicsBeginImageContextWithOptions(CGSizeMake(dw, dh), true, 1.0)
        val ctx = platform.UIKit.UIGraphicsGetCurrentContext()
        ctx?.let {
            platform.CoreGraphics.CGContextTranslateCTM(it, dw / 2.0, dh / 2.0)
            platform.CoreGraphics.CGContextConcatCTM(it, CGAffineTransformMakeRotation(radians))
            image.drawInRect(CGRectMake(-w / 2.0, -h / 2.0, w, h))
        }
        val out = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return out ?: image
    }
}
