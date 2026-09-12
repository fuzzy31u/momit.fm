---
name: generate-chapters
description: Generate 5-8 chapter markers (HH:MM:SS + Japanese title) from a momit.fm episode transcript, as an internal aid for shownote structure and ad-point selection. NOT published — Art19 has no chapter support. Use when releasing an episode and need the episode's topic structure with timestamps.
---

You are tasked with generating chapter markers for a momit.fm podcast episode.

> **These chapters are not published.** Art19 has no native chapter feature ([FAQ](https://art19.zendesk.com/hc/en-us/articles/40885686831501-Does-ART19-support-Chapters)), and the plain-text-timecode workaround is unusable here because dynamic ad insertion shifts the listener's playhead by the inserted ad duration (Pre/Mid/Post × up to 120 s each, not correctable in advance). Use the output to sanity-check the shownote's topic order and to choose ad insertion points.
>
> Timestamps are also **estimates**: the transcript comes from the raw recording while the mp3 is the edited export, so times are scaled by `audio_duration / transcript_end` and drift by tens of seconds late in the episode. See `edit-riverside` fact 16.

## Input
- Episode number: $1

## Steps

1. **Read the style guide** for chapter conventions:
   ```bash
   cat .claude/skills/_shared/episode-style-guide.md
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
