#!/bin/bash
#
# Claude Code UserPromptSubmit Hook - Pre-Commit Check
#
# This hook runs when user submits a prompt to Claude Code.
# It detects commit-related prompts and adds a reminder to check for unused code.
#
# Input: JSON via stdin with prompt and conversation history
# Output: JSON with additionalContext or block decision
#

# Read stdin (JSON input from Claude Code)
INPUT=$(cat)

# Extract the user's prompt from JSON
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty')

# Check if prompt is about committing
if echo "$PROMPT" | grep -qi -E "(commit|staged|git add)"; then
    # Check if --no-verify flag is present
    if echo "$PROMPT" | grep -qi "\-\-no-verify"; then
        # User explicitly wants to skip verification
        echo '{}'
        exit 0
    fi

    # Get staged files count
    STAGED_COUNT=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')

    if [ "$STAGED_COUNT" -gt 0 ]; then
        # Add context reminder to check for minimal codebase
        CONTEXT="

⚠️ Pre-commit reminder: Check staged changes for minimal codebase
- Remove unused dependencies (package.json)
- Remove empty files or unused code
- Remove unused imports/exports
- Verify all changes are necessary

Staged files: $STAGED_COUNT

To skip this check, add '--no-verify' to your prompt.
"

        # Output JSON with additionalContext
        jq -n \
            --arg context "$CONTEXT" \
            '{hookSpecificOutput: {additionalContext: $context}}'
        exit 0
    fi
fi

# No modification needed
echo '{}'
exit 0
