---
description: Generate 10 title candidates for podcast episode
argument-hint: [episode_number]
---

You are tasked with generating 10 title candidates for a momit.fm podcast episode.

## Input
- Episode number: $1 (optional - if not provided, assume it's the next episode)

## Steps

1. **Read the style guide** for established title patterns and examples:
   ```bash
   cat docs/workflow/episode-style-guide.md
   ```

2. **Fetch recent episode titles** from the RSS feed:
   ```bash
   curl -s https://rss.art19.com/momitfm | grep -oP '(?<=<title>).*?(?=</title>)' | head -15
   ```

3. **Analyze title patterns** from the style guide and recent episodes:
   - Structure: `{N}. {Topic1} / {Topic2} / {Topic3}`
   - Topic separator: ` / ` (half-width space + slash + space)
   - Related concepts connector: `×` (e.g., `YouTube×創作欲の相性`)
   - No emojis in titles
   - Under 120 characters total
   - Mix of casual Japanese phrases and specific product/service names
   - Balance of life/parenting topics and tech/AI topics
   - Expression patterns: 疑問形、「の」で具体化、体験・実践系の語（活用術、体験談、検証、チャレンジ）

4. **Read the transcript or shownote** to understand the episode content:
   - Check `public/transcripts/$1.json` for transcript JSON
   - Or check `~/Downloads/momitfm$1.txt` for raw transcript
   - Or check `~/Downloads/momitfm$1-shownote.txt` for shownote
   - Identify 2-4 main topics discussed

5. **Check for topic duplication** against the 5 most recent episode titles:
   - Avoid repeating the same topic phrasing or keywords from recent episodes
   - If a topic overlaps (e.g., "Claude Code" appeared recently), find a fresh angle or different framing

6. **Generate 10 title candidates** following the observed pattern:
   - Start with episode number (e.g., "95. ")
   - Use ` / ` as separator between topics
   - Keep each title under 120 characters
   - Vary the phrasing and emphasis across candidates
   - Some can be more casual, others more descriptive
   - Try at least 1-2 with `×` connector for related concepts
   - Try at least 1-2 with question-style phrasing

7. **Output format**:
   ```
   ## Title Candidates for Episode {N}

   1. {N}. {topic1} / {topic2} / {topic3}
   2. {N}. {topic1} / {topic2} / {topic3}
   ...
   10. {N}. {topic1} / {topic2} / {topic3}

   **Recent titles (duplication check):**
   - [Last 5 episode titles listed]

   **Top recommendation:** #{number} - [Reason why]
   ```

Generate the title candidates now.
