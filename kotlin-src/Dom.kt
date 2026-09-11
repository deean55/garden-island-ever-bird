package fieldframe

fun el(
    tag: String,
    className: String = "",
    text: String? = null,
    setup: (dynamic) -> Unit = {},
): dynamic {
    val e = document.createElement(tag)
    if (className.isNotEmpty()) e.className = className
    if (text != null) e.textContent = text
    setup(e)
    return e
}

fun add(parent: dynamic, child: dynamic): dynamic {
    if (child != null) parent.appendChild(child)
    return parent
}

fun icon(svg: String, className: String = "ff-icon"): dynamic {
    val span = el("span", className)
    span.innerHTML = svg
    span.setAttribute("aria-hidden", "true")
    return span
}

fun btn(
    label: String,
    kind: String = "primary",
    size: String = "md",
    svg: String? = null,
    disabled: Boolean = false,
    aria: String? = null,
    onClick: () -> Unit,
): dynamic {
    val cls = buildString {
        append("ff-btn ff-btn-$kind ff-btn-$size")
    }
    return el("button", cls) { b ->
        b.type = "button"
        b.disabled = disabled
        if (aria != null) b.setAttribute("aria-label", aria)
        if (svg != null) add(b, icon(svg))
        if (label.isNotEmpty()) add(b, el("span", "", label))
        b.addEventListener("click", { ev: dynamic ->
            ev.preventDefault()
            if (!b.disabled as Boolean) onClick()
        })
    }
}

fun iconBtn(svg: String, aria: String, kind: String = "ghost", onClick: () -> Unit): dynamic {
    return btn("", kind, "icon", svg, false, aria, onClick)
}

fun field(label: String, id: String, control: dynamic): dynamic {
    val wrap = el("label", "ff-field")
    wrap.setAttribute("for", id)
    add(wrap, el("span", "ff-label", label))
    add(wrap, control)
    return wrap
}

fun textInput(
    id: String,
    value: String,
    placeholder: String = "",
    type: String = "text",
    onInput: (String) -> Unit,
): dynamic {
    return el("input", "ff-input") { i ->
        i.id = id
        i.type = type
        i.value = value
        i.placeholder = placeholder
        val handle = {
            S.focusId = id
            S.focusPos = (i.selectionStart as? Number)?.toInt() ?: (i.value as String).length
            onInput(i.value as String)
        }
        i.addEventListener("input", handle)
        i.addEventListener("change", handle)
        i.addEventListener("focus", {
            S.focusId = id
        })
    }
}

fun textarea(
    id: String,
    value: String,
    placeholder: String = "",
    onInput: (String) -> Unit,
): dynamic {
    return el("textarea", "ff-textarea") { i ->
        i.id = id
        i.value = value
        i.placeholder = placeholder
        i.rows = 4
        val handle = {
            S.focusId = id
            S.focusPos = (i.selectionStart as? Number)?.toInt() ?: (i.value as String).length
            onInput(i.value as String)
        }
        i.addEventListener("input", handle)
        i.addEventListener("change", handle)
        i.addEventListener("focus", {
            S.focusId = id
        })
    }
}

fun overlay(onClose: (() -> Unit)?, content: dynamic): dynamic {
    val root = el("div", "ff-overlay") { o ->
        o.addEventListener("click", { ev: dynamic ->
            if (ev.target == o && onClose != null) onClose()
        })
    }
    add(root, content)
    return root
}

fun dialogCard(title: String, body: dynamic, actions: dynamic): dynamic {
    val card = el("div", "ff-dialog")
    add(card, el("h2", "ff-dialog-title", title))
    add(card, body)
    add(card, actions)
    return card
}

object Ic {
    const val camera =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/></svg>"
    const val plus =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14'/><path d='M12 5v14'/></svg>"
    const val search =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/></svg>"
    const val back =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m12 19-7-7 7-7'/><path d='M19 12H5'/></svg>"
    const val file =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/><path d='M14 2v4a2 2 0 0 0 2 2h4'/></svg>"
    const val upload =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='17 8 12 3 7 8'/><line x1='12' x2='12' y1='3' y2='15'/></svg>"
    const val more =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='1'/><circle cx='12' cy='5' r='1'/><circle cx='12' cy='19' r='1'/></svg>"
    const val images =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect width='18' height='18' x='3' y='3' rx='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>"
    const val trash =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 6h18'/><path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'/><path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'/></svg>"
    const val rotateLeft =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'/><path d='M3 3v5h5'/></svg>"
    const val rotateRight =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8'/><path d='M21 3v5h-5'/></svg>"
    const val zoomIn =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='11' cy='11' r='8'/><line x1='21' x2='16.65' y1='21' y2='16.65'/><line x1='11' x2='11' y1='8' y2='14'/><line x1='8' x2='14' y1='11' y2='11'/></svg>"
    const val zoomOut =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='11' cy='11' r='8'/><line x1='21' x2='16.65' y1='21' y2='16.65'/><line x1='8' x2='14' y1='11' y2='11'/></svg>"
    const val download =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' x2='12' y1='15' y2='3'/></svg>"
    const val share =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='18' cy='5' r='3'/><circle cx='6' cy='12' r='3'/><circle cx='18' cy='19' r='3'/><line x1='8.59' x2='15.42' y1='13.51' y2='17.49'/><line x1='15.41' x2='8.59' y1='6.51' y2='10.49'/></svg>"
    const val close =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M18 6 6 18'/><path d='m6 6 12 12'/></svg>"
    const val flip =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8'/><path d='M21 3v5h-5'/><path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16'/><path d='M8 16H3v5'/></svg>"
    const val chevronLeft =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m15 18-6-6 6-6'/></svg>"
    const val chevronRight =
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m9 18 6-6-6-6'/></svg>"
}
