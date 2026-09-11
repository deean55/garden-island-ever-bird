package com.fieldframe.shared.export

class JsonMap(private val values: Map<String, Any?>) {
    fun str(key: String): String {
        val v = values[key] ?: return ""
        return v.toString()
    }

    fun int(key: String): Int {
        val v = values[key] ?: return 0
        return when (v) {
            is Int -> v
            is Long -> v.toInt()
            is Double -> v.toInt()
            else -> v.toString().toIntOrNull() ?: 0
        }
    }

    fun bool(key: String): Boolean {
        val v = values[key] ?: return false
        return when (v) {
            is Boolean -> v
            else -> v.toString() == "true"
        }
    }

    fun long(key: String): Long {
        val v = values[key] ?: return 0L
        return when (v) {
            is Long -> v
            is Int -> v.toLong()
            is Double -> v.toLong()
            else -> v.toString().toLongOrNull() ?: 0L
        }
    }

    fun map(key: String): JsonMap? = values[key] as? JsonMap

    @Suppress("UNCHECKED_CAST")
    fun list(key: String): List<JsonMap> {
        val v = values[key] as? List<*> ?: return emptyList()
        return v.mapNotNull { it as? JsonMap }
    }

    companion object {
        fun parse(text: String): JsonMap {
            val parser = JsonParser(text)
            val value = parser.parseValue()
            return value as? JsonMap ?: error("The package manifest is corrupted.")
        }
    }
}

private class JsonParser(private val s: String) {
    private var i = 0

    fun parseValue(): Any? {
        skip()
        if (i >= s.length) error("The package manifest is corrupted.")
        return when (s[i]) {
            '{' -> parseObject()
            '[' -> parseArray()
            '"' -> parseString()
            't', 'f' -> parseBool()
            'n' -> {
                i += 4
                null
            }
            '-', in '0'..'9' -> parseNumber()
            else -> error("The package manifest is corrupted.")
        }
    }

    private fun parseObject(): JsonMap {
        i++
        val map = LinkedHashMap<String, Any?>()
        skip()
        if (peek() == '}') {
            i++
            return JsonMap(map)
        }
        while (true) {
            skip()
            val key = parseString()
            skip()
            if (peek() != ':') error("The package manifest is corrupted.")
            i++
            map[key] = parseValue()
            skip()
            when (peek()) {
                ',' -> i++
                '}' -> {
                    i++
                    return JsonMap(map)
                }
                else -> error("The package manifest is corrupted.")
            }
        }
    }

    private fun parseArray(): List<Any?> {
        i++
        val list = ArrayList<Any?>()
        skip()
        if (peek() == ']') {
            i++
            return list
        }
        while (true) {
            list += parseValue()
            skip()
            when (peek()) {
                ',' -> i++
                ']' -> {
                    i++
                    return list
                }
                else -> error("The package manifest is corrupted.")
            }
        }
    }

    private fun parseString(): String {
        if (peek() != '"') error("The package manifest is corrupted.")
        i++
        val sb = StringBuilder()
        while (i < s.length) {
            val c = s[i++]
            when (c) {
                '"' -> return sb.toString()
                '\\' -> {
                    if (i >= s.length) break
                    when (val e = s[i++]) {
                        '"', '\\', '/' -> sb.append(e)
                        'b' -> sb.append('\b')
                        'f' -> sb.append('\u000C')
                        'n' -> sb.append('\n')
                        'r' -> sb.append('\r')
                        't' -> sb.append('\t')
                        'u' -> {
                            val hex = s.substring(i, i + 4)
                            i += 4
                            sb.append(hex.toInt(16).toChar())
                        }
                        else -> sb.append(e)
                    }
                }
                else -> sb.append(c)
            }
        }
        error("The package manifest is corrupted.")
    }

    private fun parseBool(): Boolean {
        return if (s.startsWith("true", i)) {
            i += 4
            true
        } else {
            i += 5
            false
        }
    }

    private fun parseNumber(): Number {
        val start = i
        if (peek() == '-') i++
        while (i < s.length && s[i] in '0'..'9') i++
        var isDouble = false
        if (i < s.length && s[i] == '.') {
            isDouble = true
            i++
            while (i < s.length && s[i] in '0'..'9') i++
        }
        val raw = s.substring(start, i)
        return if (isDouble) raw.toDouble() else raw.toLong().let { if (it in Int.MIN_VALUE..Int.MAX_VALUE) it.toInt() else it }
    }

    private fun skip() {
        while (i < s.length && s[i].isWhitespace()) i++
    }

    private fun peek(): Char = if (i < s.length) s[i] else '\u0000'
}
