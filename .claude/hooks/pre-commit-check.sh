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
        # Check for potential credentials in staged files
        CREDENTIAL_PATTERNS="(api[_-]?key|secret|password|token|credential|private[_-]?key|access[_-]?token|bearer)"
        CREDENTIAL_FOUND=""

        # Check staged files for credential patterns
        if git diff --cached | grep -i -E "$CREDENTIAL_PATTERNS" > /dev/null 2>&1; then
            CREDENTIAL_FOUND="
⚠️  WARNING: Potential credentials detected in staged files!
   Review carefully before committing.
"
        fi

        # Check for sensitive file patterns
        SENSITIVE_FILES=$(git diff --cached --name-only | grep -E "(\\.env|\\.pem|secret|credential|password|private|key\\.)" | head -5)
        SENSITIVE_WARNING=""

        if [ -n "$SENSITIVE_FILES" ]; then
            SENSITIVE_WARNING="
⚠️  WARNING: Sensitive file names detected:
$(echo "$SENSITIVE_FILES" | sed 's/^/   - /')

   Verify these should be committed or add to .gitignore
"
        fi

        # Add context reminder to check for minimal codebase
        CONTEXT="

⚠️ Pre-commit reminder: Check staged changes for minimal codebase
- Remove unused dependencies (package.json)
- Remove empty files or unused code
- Remove unused imports/exports
- Verify all changes are necessary
${CREDENTIAL_FOUND}${SENSITIVE_WARNING}
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
