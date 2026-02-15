#!/bin/bash
#
# Ralph Wiggum Loop for AI-SDLC
# Runs OUTSIDE Claude Code in a regular terminal for fresh context per iteration.
#
# Usage:
#   ./scripts/loop.sh build 01-core-feature    # Build mode
#   ./scripts/loop.sh plan 01-core-feature     # Planning mode
#   ./scripts/loop.sh fix 01-core-feature      # Fix mode
#   ./scripts/loop.sh build 01-core-feature 10 # Max 10 iterations
#
# The loop:
#   1. Pipes PROMPT_{mode}.md to claude -p
#   2. Git commits happen inside Claude (per task)
#   3. Git push after each iteration
#   4. Repeats with fresh context
#
# Stop: Ctrl+C

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
MODE="${1:-build}"
PHASE_DIR="$2"
MAX_ITERATIONS="${3:-0}"

# Validate mode
if [[ ! "$MODE" =~ ^(plan|build|fix)$ ]]; then
    echo -e "${RED}Error: Mode must be 'plan', 'build', or 'fix'${NC}"
    echo "Usage: ./scripts/loop.sh <mode> <phase-dir> [max-iterations]"
    echo "Example: ./scripts/loop.sh build 01-core-feature"
    exit 1
fi

# Validate phase directory
if [ -z "$PHASE_DIR" ]; then
    echo -e "${RED}Error: Phase directory required${NC}"
    echo "Usage: ./scripts/loop.sh <mode> <phase-dir> [max-iterations]"
    echo ""
    echo "Available phases:"
    ls -1 .planning/phases/ 2>/dev/null | grep -v "^\..*" || echo "  (none found)"
    exit 1
fi

PHASE_PATH=".planning/phases/$PHASE_DIR"
PROMPT_FILE="$PHASE_PATH/PROMPT_${MODE}.md"

if [ ! -f "$PROMPT_FILE" ]; then
    echo -e "${RED}Error: Prompt file not found: $PROMPT_FILE${NC}"
    echo ""
    echo "Run /ai-sdlc:plan-phase first to generate prompt files."
    exit 1
fi

# Load .env if present
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Header
echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}                    ${GREEN}RALPH WIGGUM LOOP${NC}                         ${BLUE}║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Mode:       ${YELLOW}$MODE${NC}"
echo -e "  Phase:      ${YELLOW}$PHASE_DIR${NC}"
echo -e "  Prompt:     ${YELLOW}$PROMPT_FILE${NC}"
echo -e "  Branch:     ${YELLOW}$CURRENT_BRANCH${NC}"
echo -e "  Max Iter:   ${YELLOW}${MAX_ITERATIONS:-unlimited}${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop at any time.${NC}"
echo ""

ITERATION=0

while true; do
    # Check iteration limit
    if [ "$MAX_ITERATIONS" -gt 0 ] && [ "$ITERATION" -ge "$MAX_ITERATIONS" ]; then
        echo ""
        echo -e "${GREEN}Reached max iterations: $MAX_ITERATIONS${NC}"
        break
    fi

    ITERATION=$((ITERATION + 1))

    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}ITERATION $ITERATION${NC} — $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""

    # Run Claude with the prompt
    # --dangerously-skip-permissions: Auto-approve all tool calls (required for autonomous operation)
    # --output-format stream-json: Structured output for logging
    # -p: Print mode (non-interactive, reads stdin)
    cat "$PROMPT_FILE" | claude -p \
        --dangerously-skip-permissions \
        --output-format stream-json \
        --verbose

    EXIT_CODE=$?

    echo ""
    echo -e "${BLUE}───────────────────────────────────────────────────────────────${NC}"
    echo -e "Iteration $ITERATION complete. Exit code: $EXIT_CODE"

    # Git push after each iteration
    echo "Pushing to origin/$CURRENT_BRANCH..."
    if git push origin "$CURRENT_BRANCH" 2>/dev/null; then
        echo -e "${GREEN}Push successful${NC}"
    else
        # Try setting upstream if first push
        if git push -u origin "$CURRENT_BRANCH" 2>/dev/null; then
            echo -e "${GREEN}Push successful (set upstream)${NC}"
        else
            echo -e "${YELLOW}Push failed (no changes or auth issue)${NC}"
        fi
    fi

    # Handle errors
    if [ $EXIT_CODE -ne 0 ]; then
        echo -e "${YELLOW}Claude exited with error. Waiting 5 seconds before retry...${NC}"
        sleep 5
    fi

    # Small pause between iterations
    sleep 2
done

echo ""
echo -e "${GREEN}Ralph loop complete.${NC}"
