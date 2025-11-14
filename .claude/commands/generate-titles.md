---
description: Generate 10 title candidates for podcast episode
argument-hint: [episode_number]
---

You are tasked with generating 10 title candidates for a momit.fm podcast episode.

## Input
- Episode number: $1 (optional - if not provided, assume it's the next episode)

## Steps

1. **Fetch recent episode titles** from the RSS feed:
   ```bash
   curl -s https://rss.art19.com/momitfm | grep -A 2 "<title>" | head -30
   ```

2. **Analyze title patterns** from the most recent 3-5 episodes:
   - Structure: Episode number + 2-4 topics separated by " / "
   - Sometimes uses "×" to connect related concepts
   - Mix of casual Japanese phrases and specific product/service names
   - Balance of life topics, tech topics, and AI/tools
   - Concise but descriptive

3. **Read the transcript or shownote** (if available) to understand the episode content:
   - Check `~/Downloads/momitfm{episode_number}.txt` for transcript
   - Or check `~/Downloads/momitfm{episode_number}-shownote.txt` for shownote
   - Identify 2-4 main topics discussed

4. **Generate 10 title candidates** following the observed pattern:
   - Start with episode number (e.g., "89. ")
   - Use " / " as separator between topics
   - Keep each title under 100 characters when possible
   - Vary the phrasing and emphasis across candidates
   - Some can be more casual, others more descriptive

5. **Output format**:
   ```
   ## Title Candidates for Episode {N}

   1. {episode_number}. {topic1} / {topic2} / {topic3}
   2. {episode_number}. {topic1} / {topic2} / {topic3}
   ...
   10. {episode_number}. {topic1} / {topic2} / {topic3}

   **Pattern observations:**
   - [List key patterns observed]

   **Top recommendation:** #{number} - [Reason why]
   ```

Generate the title candidates now.
