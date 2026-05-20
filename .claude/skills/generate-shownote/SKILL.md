---
description: Generate podcast shownote from transcript file
argument-hint: [transcript_path_or_episode_number]
---

You are tasked with generating a podcast episode shownote (description) from a Japanese transcript.

## Input
- Argument: $1
  - If a file path (e.g., `~/Downloads/momitfm95.txt`): read as raw transcript
  - If a number (e.g., `95`): read from `public/transcripts/$1.json` (JSON format with segments)
- Raw transcript format: Speaker Name (MM:SS.mmm) followed by transcribed text
- JSON transcript format: `{ "episodeId": N, "segments": [{ "speaker", "timestamp", "text" }] }`

## Style Reference

First, read the style guide for established patterns and real examples:
```bash
cat docs/workflow/episode-style-guide.md
```

## Output Format Requirements

Generate a plain text description following momit.fm's established style.

### Structure:
1. Opening paragraph (2-3 sentences summarizing the episode)
2. Blank line
3. Topic sections with emojis and bold titles
4. Blank line
5. Separator line
6. Blank line
7. Closing section with links

### Plain Text Format Template:
```
[Opening summary paragraph - 2-3 sentences, conversational tone]

[Emoji] **[Topic Title]** – [Description/explanation]
[Emoji] **[Topic Title]** – [Description/explanation]
[Emoji] **[Topic Title]** – [Description/explanation]

…………………………………………………………………

フィードバックは #momitfm (https://twitter.com/search?q=%23momitfm) もしくは おたよりフォーム (https://note.com/kamiyuuu/n/n5cb3cd154259) より募集しています。

Yu Kamiya (https://twitter.com/kamiyuuu) / miho (https://twitter.com/miholovesq)

momit hub (https://hub.momit.fm/) / YouTube (https://www.youtube.com/@momitfm)
```

### Style Guidelines:
- **Format**: Plain text without HTML tags for easy copy-paste
- **Tone**: Conversational, informative, friendly (casual Japanese)
- **Opening**: Brief context about what's discussed, written as natural summary. 聞きどころのハイライトを会話調で紹介
- **Topics**: Use relevant emojis that match the content (tech: 🤖🔧🧰💻, parenting: 📝✈️🎮, concepts: 🧠📏🌐)
- **Topic titles**: Bold with `**` markers. Concise and catchy
- **Descriptions**: Concise explanations using em dash (–) separator. 1 文で簡潔に
- **Topic count**: Main themes 3-5 + sub-topics as needed (total 5-12)
- **Links**: Include URLs in parentheses after link text, e.g., `Link Text (URL)`
- **Separator**: Use `…………………………………………………………………` (full-width ellipsis × 15)
- **Blank lines**: Use single blank lines between sections for readability
- **Avoid**: Picking up too much from ice-break / small talk at the beginning. Focus on main topics

## Steps:
1. Read the style guide from `docs/workflow/episode-style-guide.md`
2. Read the transcript from $1
3. Identify main discussion topics (skip ice-break, focus on substantive content)
4. Understand the overall theme and context
5. Generate plain text description matching the established style
6. Output the shownote

## Ad Insertion Points (Bonus)

After the shownote, suggest 2-3 ad insertion points:
```
---
📍 広告挿入ポイント候補:
1. HH:MM:SS — [トピック転換の説明]
2. HH:MM:SS — [トピック転換の説明]
3. HH:MM:SS — [トピック転換の説明]
```

Generate the shownote now.
