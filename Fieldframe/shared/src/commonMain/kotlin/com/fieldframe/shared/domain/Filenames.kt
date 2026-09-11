package com.fieldframe.shared.domain

fun sanitizeFilename(name: String): String {
    val cleaned = name
        .replace(Regex("[<>:\"/\\\\|?*\\u0000-\\u001f]"), "")
        .replace(Regex("\\s+"), "_")
        .replace(Regex("_+"), "_")
        .trim('_', '.')
        .take(80)
    return if (cleaned.isBlank()) "Project" else cleaned
}

fun extensionFor(mimeType: String, originalName: String): String {
    val fromName = originalName.substringAfterLast('.', missingDelimiterValue = "")
        .lowercase()
        .takeIf { it.matches(Regex("[a-z0-9]{2,5}")) }
    if (fromName != null) return fromName
    return when (mimeType.lowercase()) {
        "image/png" -> "png"
        "image/webp" -> "webp"
        "image/heic", "image/heif" -> "heic"
        "application/pdf" -> "pdf"
        "application/zip" -> "zip"
        else -> "jpg"
    }
}

fun todayIsoDate(epochMillis: Long = currentTimeMillis()): String {
    val days = epochMillis / 86_400_000L
    // Approximate UTC date from epoch; platforms may override via clock.
    val z = javaEpochToYmd(days)
    return "${z.first}-${pad2(z.second)}-${pad2(z.third)}"
}

internal expect fun currentTimeMillis(): Long

internal expect fun newId(): String

private fun javaEpochToYmd(epochDays: Long): Triple<Int, Int, Int> {
    // Civil from days, Howard Hinnant algorithm.
    val z = epochDays + 719468
    val era = (if (z >= 0) z else z - 146096) / 146097
    val doe = z - era * 146097
    val yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365
    val y = yoe + era * 400
    val doy = doe - (365 * yoe + yoe / 4 - yoe / 100)
    val mp = (5 * doy + 2) / 153
    val d = (doy - (153 * mp + 2) / 5 + 1).toInt()
    val m = (mp + if (mp < 10) 3 else -9).toInt()
    val year = (y + if (m <= 2) 1 else 0).toInt()
    return Triple(year, m, d)
}
