---
description: Convert Riverside transcript to JSON format
argument-hint: [episode_number]
---

You are tasked with converting a Riverside.fm transcript file into structured JSON for the momit.fm website.

## Input
- Episode number: $1

## Steps

1. **Verify source file exists**:
   ```bash
   ls ~/Downloads/momitfm$1.txt
   ```
   If not found, inform the user and suggest checking the filename.

2. **Run the conversion script**:
   ```bash
   node scripts/convertTranscript.js $1
   ```

3. **Validate the output**:
   ```bash
   node -e "
   const t = require('./public/transcripts/$1.json');
   console.log('Episode ID:', t.episodeId);
   console.log('Segments:', t.segments.length);
   const empty = t.segments.filter(s => !s.text.trim());
   if (empty.length) console.log('WARNING: Empty segments:', empty.length);
   const speakers = [...new Set(t.segments.map(s => s.speaker))];
   console.log('Speakers:', speakers.join(', '));
   console.log('Duration:', t.segments[t.segments.length-1].timestamp);
   "
   ```

4. **Stage the file**:
   ```bash
   git add public/transcripts/$1.json
   ```

5. **Report results**:
   ```
   ## Transcript Conversion Complete

   - Episode: $1
   - Segments: [count]
   - Speakers: [names]
   - Duration: [last timestamp]
   - File: public/transcripts/$1.json (staged)
   ```

## Error Handling
- If the source file doesn't exist: suggest `~/Downloads/momitfm{N}.txt`
- If the script fails: check the transcript format matches `Speaker Name (MM:SS.mmm)` pattern
- If validation shows empty segments: warn but don't block
