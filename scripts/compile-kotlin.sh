#!/bin/sh
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KOTLINC="${KOTLINC:-/opt/kotlinc/bin/kotlinc-js}"
STDLIB="${STDLIB:-/opt/kotlinc/lib/kotlin-stdlib-js.klib}"
SRC="$ROOT/kotlin-src"
KLIB_DIR="$ROOT/.kotlin-build/klib"
JS_DIR="$ROOT/.kotlin-build/js"
PUBLIC="$ROOT/public"

if [ ! -x "$KOTLINC" ]; then
  echo "kotlinc-js not found at $KOTLINC" >&2
  exit 1
fi

mkdir -p "$KLIB_DIR" "$JS_DIR" "$PUBLIC"

echo ">> compiling Kotlin sources to klib"
"$KOTLINC" \
  -Xir-produce-klib-file \
  -ir-output-dir "$KLIB_DIR" \
  -ir-output-name fieldframe \
  -module-kind es \
  -target es2015 \
  -libraries "$STDLIB" \
  "$SRC"/*.kt

echo ">> linking Kotlin/JS bundle"
"$KOTLINC" \
  -Xir-produce-js \
  -Xir-dce \
  -Xinclude="$KLIB_DIR/fieldframe.klib" \
  -ir-output-dir "$JS_DIR" \
  -ir-output-name fieldframe \
  -module-kind es \
  -target es2015 \
  -libraries "$STDLIB" \
  -main call

cp "$JS_DIR/fieldframe.mjs" "$PUBLIC/fieldframe.mjs"
echo ">> wrote $PUBLIC/fieldframe.mjs ($(wc -c < "$PUBLIC/fieldframe.mjs") bytes)"
