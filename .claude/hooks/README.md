# Claude Code Hooks

This directory contains hooks for automating Claude Code workflows.

## Pre-Commit Check Hook

The `UserPromptSubmit` hook intercepts commit-related prompts and adds a reminder to check for unused code.

### Setup

Add this to `.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "./.claude/hooks/pre-commit-check.sh"
      }]
    }]
  }
}
```

### What it does

When you ask Claude to commit changes, the hook:
1. Detects commit-related prompts (contains "commit" or "staged")
2. Reminds you to check for:
   - Unused dependencies
   - Empty files
   - Unused imports/exports
   - Dead code
3. Adds context about keeping codebase minimal

### How to use

Just commit normally through Claude Code:
```
"commit the changes"
"check staged changes and commit"
```

Claude will automatically remind you to verify the code is minimal before committing.

### Override

To skip the check, use `--no-verify` in your prompt:
```
"commit --no-verify"
```

## Files

- `README.md` - This file
- `pre-commit-check.sh` - Script that validates staged changes
- Example configuration in project `.claude/settings.json`
