#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
SCPL="$ROOT/X推文转PDF.scpl"
OUT="$ROOT/X推文转PDF.shortcut"

npx -y scpl-cli "$SCPL" -o "$OUT"

python3 << PY
import plistlib
from pathlib import Path

path = Path("$OUT")
with path.open("rb") as f:
    data = plistlib.load(f)

data["WFWorkflowName"] = "X推文转PDF"
data["WFWorkflowTypes"] = ["ActionExtension", "NCWidget"]
data["WFWorkflowInputContentItemClasses"] = [
    "WFURLContentItem",
    "WFStringContentItem",
    "WFSafariWebPageContentItem",
]
icon = data.setdefault("WFWorkflowIcon", {})
icon.setdefault("WFWorkflowIconStartColor", 463140863)  # blue
icon.setdefault("WFWorkflowIconGlyphNumber", 59511)

with path.open("wb") as f:
    plistlib.dump(data, f, fmt=plistlib.FMT_BINARY)

print(f"Built {path} ({path.stat().st_size} bytes)")
PY
