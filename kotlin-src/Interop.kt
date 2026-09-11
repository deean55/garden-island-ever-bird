package fieldframe

external val document: dynamic
external val window: dynamic
external val console: dynamic
external val indexedDB: dynamic
external val navigator: dynamic

fun jsObj(): dynamic = js("({})")

fun newId(): String = js("crypto.randomUUID()") as String

fun nowMs(): Double = js("Date.now()") as Double

fun stringify(value: dynamic): String = js("JSON.stringify(value)") as String

fun parseJson(text: String): dynamic = js("JSON.parse(text)")

fun createUrl(blob: dynamic): String = js("URL.createObjectURL(blob)") as String

fun revokeUrl(url: String) {
    js("URL.revokeObjectURL(url)")
}

fun jsResolve(value: dynamic = true): Any = js("Promise.resolve(value)")

fun jsReject(error: dynamic): Any = js("Promise.reject(error)")

fun then(p: dynamic, fn: (dynamic) -> Any?): Any = p.then(fn)

fun catchP(p: dynamic, fn: (dynamic) -> Any?): Any = p.catch(fn)

fun newPromise(fn: (dynamic, dynamic) -> Unit): Any = js("new Promise(fn)")


fun Any.jsThen(fn: (dynamic) -> Any?): Any = then(this.asDynamic(), fn)

fun Any.jsCatch(fn: (dynamic) -> Any?): Any = catchP(this.asDynamic(), fn)



fun downloadBlob(blob: dynamic, filename: String) {
    val a = document.createElement("a")
    val url = createUrl(blob)
    a.href = url
    a.download = filename
    a.rel = "noopener"
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout({
        revokeUrl(url)
        null
    }, 2000)
}

fun openBlob(blob: dynamic) {
    val url = createUrl(blob)
    val opened = window.open(url, "_blank", "noopener,noreferrer")
    if (opened == null) downloadBlob(blob, "document")
    window.setTimeout({
        revokeUrl(url)
        null
    }, 60000)
}

fun pickFiles(accept: String, multiple: Boolean): Any {
    return newPromise { ok, _ ->
        val input = document.createElement("input")
        input.type = "file"
        input.accept = accept
        input.multiple = multiple
        input.addEventListener("change", {
            ok(js("Array.from(input.files || [])"))
        })
        input.addEventListener("cancel", {
            ok(js("[]"))
        })
        input.click()
    }
}

fun saveFile(blob: dynamic, filename: String): Any {
    downloadBlob(blob, filename)
    return jsResolve("downloaded")
}

fun shareFile(blob: dynamic, filename: String, title: String): Any {
    val file = js("new File([blob], filename, { type: blob.type || 'application/octet-stream' })")
    val can = js("typeof navigator.share === 'function' && navigator.canShare && navigator.canShare({files:[file]})") as Boolean
    return if (can) {
        catchP(then(navigator.share(js("{files:[file], title:title, text:title}"))) { "shared" }) { err ->
            val name = dynStr(err, "name")
            if (name == "AbortError") "cancelled"
            else {
                downloadBlob(blob, filename)
                "downloaded"
            }
        }
    } else {
        downloadBlob(blob, filename)
        jsResolve("downloaded")
    }
}

fun userMessage(err: dynamic, fallback: String): String {
    val name = dynStr(err, "name")
    val message = dynStr(err, "message")
    return when (name) {
        "NotAllowedError" -> "Permission was denied."
        "NotFoundError" -> "No camera was found on this device."
        "NotReadableError" -> "The camera is already in use."
        "AbortError" -> "The action was cancelled."
        "QuotaExceededError" -> "Not enough storage available on this device."
        "SecurityError" -> "Access was blocked by the browser."
        else -> if (message.isNotBlank()) message else fallback
    }
}

fun dynStr(o: dynamic, key: String, fallback: String = ""): String {
    if (o == null || js("o === undefined") as Boolean) return fallback
    val v = o[key]
    return if (v == null || js("v === undefined") as Boolean) fallback else v.toString()
}

fun dynNum(o: dynamic, key: String, fallback: Double = 0.0): Double {
    if (o == null || js("o === undefined") as Boolean) return fallback
    val v = o[key]
    return if (v == null || js("v === undefined") as Boolean) fallback else (v as Number).toDouble()
}

fun dynInt(o: dynamic, key: String, fallback: Int = 0): Int = dynNum(o, key, fallback.toDouble()).toInt()

fun dynBool(o: dynamic, key: String, fallback: Boolean = false): Boolean {
    if (o == null || js("o === undefined") as Boolean) return fallback
    val v = o[key]
    return if (v == null || js("v === undefined") as Boolean) fallback else js("!!v") as Boolean
}

fun isMissing(v: dynamic): Boolean = v == null || js("v === undefined") as Boolean

fun jsArrayToList(arr: dynamic): List<dynamic> {
    if (isMissing(arr)) return emptyList()
    val len = (arr.length as Number).toInt()
    val out = ArrayList<dynamic>(len)
    var i = 0
    while (i < len) {
        out.add(arr[i])
        i++
    }
    return out
}

fun canvasToBlob(canvas: dynamic, type: String, quality: Double): Any {
    return newPromise { ok, fail ->
        canvas.toBlob({ blob: dynamic ->
            if (blob != null) ok(blob) else fail(js("new Error('Could not encode the image.')"))
        }, type, quality)
    }
}

fun arrayBufferOf(blob: dynamic): dynamic = blob.arrayBuffer()

fun filesFrom(result: dynamic): List<dynamic> = jsArrayToList(result)
