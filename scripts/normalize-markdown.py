#!/usr/bin/env python3
"""Normalize Forge markdown: trim whitespace, collapse blank lines."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "node_modules", ".turbo", "dist", "build"}


def is_block_line(line: str) -> bool:
    stripped = line.lstrip()
    return (
        stripped.startswith("#")
        or stripped.startswith("```")
        or stripped.startswith("|")
        or stripped.startswith(">")
        or stripped.startswith("---")
        or re.match(r"^[-*+]\s", stripped) is not None
        or re.match(r"^\d+\.\s", stripped) is not None
    )


def is_compact_line(line: str) -> bool:
    if not line.strip():
        return False
    if is_block_line(line):
        return False
    if len(line) > 100:
        return False
    stripped = line.strip()
    # Short label-style lines, even with a trailing period.
    if len(stripped) <= 35:
        return True
    # Full sentences keep paragraph breaks.
    if re.search(r"[.!?:;]$", stripped):
        return False
    return True


def normalize_content(text: str) -> str:
    lines = [line.rstrip() for line in text.replace("\r\n", "\n").split("\n")]
    collapsed: list[str] = []
    for line in lines:
        if line == "" and collapsed and collapsed[-1] == "":
            continue
        collapsed.append(line)

    result: list[str] = []
    i = 0
    while i < len(collapsed):
        line = collapsed[i]
        if (
            line == ""
            and result
            and i + 1 < len(collapsed)
            and result[-1] != ""
            and collapsed[i + 1] != ""
        ):
            prev = result[-1]
            nxt = collapsed[i + 1]
            if is_compact_line(prev) and is_compact_line(nxt):
                i += 1
                continue
        result.append(line)
        i += 1

    while result and result[-1] == "":
        result.pop()
    return "\n".join(result) + "\n"


def iter_markdown_files(root: Path):
    for path in root.rglob("*"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.suffix.lower() == ".md":
            yield path


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT
    changed = 0
    for path in iter_markdown_files(root):
        original = path.read_text(encoding="utf-8")
        normalized = normalize_content(original)
        if normalized != original:
            path.write_text(normalized, encoding="utf-8", newline="\n")
            changed += 1
            print(f"normalized: {path.relative_to(root)}")
    print(f"Done. {changed} files updated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
