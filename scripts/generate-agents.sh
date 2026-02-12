#!/bin/bash
# Generate AGENTS.md from current project state
# Usage: ./scripts/generate-agents.sh

set -e

OUTPUT="AGENTS.md"
DATE=$(date +%Y-%m-%d)

echo "# AGENTS.md" > "$OUTPUT"
echo "> Auto-generated. Run /ai-sdlc:generate-agents or ./scripts/generate-agents.sh to rebuild." >> "$OUTPUT"
echo "> Last updated: $DATE" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Project info
if [ -f "PROJECT.md" ]; then
  PROJECT_NAME=$(head -1 PROJECT.md | sed 's/^# //')
  echo "## Project" >> "$OUTPUT"
  echo "- **Name:** $PROJECT_NAME" >> "$OUTPUT"
  if [ -f ".planning/STATE.md" ]; then
    echo "- **Status:** See STATE.md" >> "$OUTPUT"
  else
    echo "- **Status:** Not started" >> "$OUTPUT"
  fi
  echo "" >> "$OUTPUT"
fi

# Spec index
echo "## Spec Index" >> "$OUTPUT"
echo "| File | Type | Summary |" >> "$OUTPUT"
echo "|------|------|---------|" >> "$OUTPUT"

if [ -d "specs/jobs" ]; then
  for f in specs/jobs/*.md; do
    [ "$f" = "specs/jobs/_template.md" ] && continue
    [ -f "$f" ] || continue
    TITLE=$(grep -m1 "^# " "$f" | sed 's/^# //' || basename "$f" .md)
    echo "| $f | JTBD | $TITLE |" >> "$OUTPUT"
  done
fi

if [ -d "specs/domain" ]; then
  for f in specs/domain/*.md; do
    [ "$f" = "specs/domain/_template.md" ] && continue
    [ -f "$f" ] || continue
    TITLE=$(grep -m1 "^# " "$f" | sed 's/^# //' || basename "$f" .md)
    echo "| $f | Domain | $TITLE |" >> "$OUTPUT"
  done
fi

echo "" >> "$OUTPUT"

# Codebase context
echo "## Codebase Context" >> "$OUTPUT"
echo "| File | Exists |" >> "$OUTPUT"
echo "|------|--------|" >> "$OUTPUT"
for f in STACK.md ARCHITECTURE.md CONVENTIONS.md; do
  if [ -f "$f" ]; then
    echo "| $f | ✅ |" >> "$OUTPUT"
  else
    echo "| $f | ❌ needs setup |" >> "$OUTPUT"
  fi
done
echo "" >> "$OUTPUT"

# Phase progress
if [ -d ".planning/phases" ]; then
  echo "## Phase Progress" >> "$OUTPUT"
  echo "| Phase | Artifacts |" >> "$OUTPUT"
  echo "|-------|-----------|" >> "$OUTPUT"
  for d in .planning/phases/*/; do
    [ -d "$d" ] || continue
    PHASE_NAME=$(basename "$d")
    ARTIFACTS=""
    [ -f "$d/CONTEXT.md" ] && ARTIFACTS="${ARTIFACTS}CONTEXT "
    [ -f "$d/RESEARCH.md" ] && ARTIFACTS="${ARTIFACTS}RESEARCH "
    [ -f "$d/PLAN.md" ] && ARTIFACTS="${ARTIFACTS}PLAN "
    [ -f "$d/SUMMARY.md" ] && ARTIFACTS="${ARTIFACTS}SUMMARY "
    [ -f "$d/VERIFICATION.md" ] && ARTIFACTS="${ARTIFACTS}VERIFICATION "
    echo "| $PHASE_NAME | $ARTIFACTS |" >> "$OUTPUT"
  done
  echo "" >> "$OUTPUT"
fi

echo "AGENTS.md generated."
