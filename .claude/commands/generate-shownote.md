---
description: Generate podcast shownote from transcript file
argument-hint: [transcript_path]
---

You are tasked with generating a podcast episode shownote (description) from a Japanese transcript file.

## Input
- Transcript file path: $1
- Format: Speaker Name (MM:SS.mmm) followed by transcribed text with spaces between Japanese characters

## Output Format Requirements

Generate a plain text description following momit.fm's established style. Analyze the transcript to identify 3-5 main topics discussed.

### Structure:
1. Opening paragraph (2-3 sentences summarizing the episode)
2. Blank line
3. Topic sections with emojis (📚, 🛠️, 🧠, 📦, etc.)
4. Blank line
5. Separator line
6. Blank line
7. Closing section with links

### Plain Text Format Template:
```
[Opening summary paragraph]

[Emoji] [Topic Title] – [Description/explanation]
[Emoji] [Topic Title] – [Description/explanation]
[Emoji] [Topic Title] – [Description/explanation]

…………………………………………………………………

フィードバックは #momitfm (https://twitter.com/search?q=%23momitfm) もしくは おたよりフォーム (https://note.com/kamiyuuu/n/n5cb3cd154259) より募集しています。

Yu Kamiya (https://twitter.com/kamiyuuu) / miho (https://twitter.com/miholovesq)

momit hub (https://hub.momit.fm/) / YouTube (https://www.youtube.com/@momitfm)
```

### Style Guidelines:
- **Format**: Plain text without HTML tags for easy copy-paste
- **Tone**: Conversational, informative, friendly (casual Japanese)
- **Opening**: Brief context about what's discussed, written as natural summary
- **Topics**: Use relevant emojis that match the content (tech, parenting, AI, etc.)
- **Descriptions**: Concise explanations using em dash (–) separator
- **Links**: Include URLs in parentheses after link text, e.g., `Link Text (URL)`
- **Separator**: Use `…………………………………………………………………` (45 dots)
- **Blank lines**: Use single blank lines between sections for readability

### Reference Episodes for Style:
- Episode 88: AI-driven workflows, Claude Code, technical writing
- Episode 87: Children's gaming, YouTube tutorials, Minecraft education
- Episode 86: Life updates, humanoid robots, Claude Code + Emacs, Obsidian

## Steps:
1. Read the transcript file from $1
2. Identify 3-5 main discussion topics with timestamps
3. Understand the overall theme and context
4. Generate HTML-formatted description matching the established style
5. Ensure proper HTML formatting with all required elements

Generate the shownote now.
