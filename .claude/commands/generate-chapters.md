---
description: Generate chapter markers from transcript
argument-hint: [episode_number]
---

You are tasked with generating chapter markers for a momit.fm podcast episode.

## Input
- Episode number: $1

## Steps

1. **Read the style guide** for chapter conventions:
   ```bash
   cat docs/workflow/episode-style-guide.md
   ```

2. **Read the transcript**:
   - Primary: `public/transcripts/$1.json`
   - Fallback: `~/Downloads/momitfm$1.txt`

3. **Analyze topic transitions**:
   - Identify where the conversation shifts to a new subject
   - Look for explicit topic introductions ("次の話題", "もう一個", "ちょっと話変わるんですけど")
   - Distinguish ice-break / small talk from main content
   - Note natural pause points between major themes

4. **Generate 5-8 chapters**:
   - First chapter starts at `00:00:00` (e.g., "オープニング" or episode theme)
   - Each chapter: timestamp + concise Japanese title
   - Titles should be short (under 30 characters) and descriptive
   - Match the casual, conversational tone of the podcast

5. **Output in two formats**:

### Art19 用（コピペ用）
```
00:00:00 オープニング
00:MM:SS [トピック1]
00:MM:SS [トピック2]
00:MM:SS [トピック3]
...
```

### 確認用（詳細）
```
| Time | Chapter | Notes |
|------|---------|-------|
| 00:00:00 | オープニング | [何について話し始めたか] |
| 00:MM:SS | [トピック] | [転換のきっかけ] |
...
```

## Guidelines
- Chapters should be roughly evenly spaced (avoid clustering)
- Don't create a chapter for every minor tangent
- The last chapter should cover the closing/outro if distinct
- Timestamp should point to where the new topic actually starts, not the transition
