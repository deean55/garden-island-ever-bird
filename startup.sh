#!/bin/sh
set -eu
cd /workspace
node scripts/preview.mjs stop || true

need_compile=0
if [ ! -f public/fieldframe.mjs ]; then
  need_compile=1
else
  for f in kotlin-src/*.kt; do
    if [ "$f" -nt public/fieldframe.mjs ]; then
      need_compile=1
      break
    fi
  done
fi
if [ "$need_compile" = 1 ] && [ -x /opt/kotlinc/bin/kotlinc-js ]; then
  sh scripts/compile-kotlin.sh >>/tmp/app-startup.log 2>&1 || true
fi

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
