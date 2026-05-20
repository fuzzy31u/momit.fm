---
description: Prepare all materials for Art19 upload
argument-hint: [episode_number]
---

You are tasked with consolidating all generated materials for uploading a momit.fm episode to Art19.

## Input
- Episode number: $1

## Prerequisites
Before running this skill, the following should already be generated:
- Transcript: `public/transcripts/$1.json`
- Title candidates (from `/generate-titles`)
- Shownote (from `/generate-shownote`)
- Chapters (from `/generate-chapters`)

## Steps

1. **Read the Art19 checklist** for reference:
   ```bash
   cat docs/workflow/art19-checklist.md
   ```

2. **Read the transcript** for context:
   ```bash
   cat public/transcripts/$1.json | head -20
   ```

3. **Generate all content** by reading the transcript and producing:
   - Top 3 title candidates
   - Full shownote (plain text, ready to paste)
   - Chapter markers (Art19 format)
   - 2-3 ad insertion point suggestions

4. **Output as Art19 Upload Bundle**:

```
========================================
Art19 Upload Bundle — Episode $1
========================================

## 1. Title (pick one)

1. $1. [候補1]
2. $1. [候補2]
3. $1. [候補3]

## 2. Description (copy below)
---
[Shownote 全文をここに出力]
---

## 3. Chapters (copy below)
---
00:00:00 オープニング
00:MM:SS [トピック]
...
---

## 4. Ad Insertion Points
---
1. 00:MM:SS — [理由]
2. 00:MM:SS — [理由]
---

## 5. Checklist
- [ ] Audio file exported from Riverside
- [ ] Title pasted
- [ ] Description pasted
- [ ] Chapters entered
- [ ] Ad markers set
- [ ] Preview checked
- [ ] Published
```

## Notes
- All text output is plain text for easy copy-paste into Art19's web UI
- If any prerequisite is missing, generate it inline rather than blocking
- The user will manually upload to Art19 after reviewing this bundle
