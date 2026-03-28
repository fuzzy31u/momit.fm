---
description: Orchestrate the full episode release workflow
argument-hint: [episode_number]
---

You are the orchestrator for releasing a new momit.fm podcast episode. Guide the user through each step, pausing for confirmation before proceeding.

## Input
- Episode number: $1

## Workflow

### Pre-flight Check
Verify that the Riverside transcript file exists:
```bash
ls ~/Downloads/momitfm$1.txt
```
If not found, ask the user to export the transcript from Riverside.fm and save it as `~/Downloads/momitfm$1.txt`.

---

### Step 1: Transcript Conversion
Convert the Riverside transcript to structured JSON.

Run: `/convert-transcript $1`

Confirm the output looks correct before proceeding.

---

### Step 2: Title Generation
Generate 10 title candidates for the episode.

Run: `/generate-titles $1`

Ask the user to pick their preferred title (or suggest modifications).

---

### Step 3: Shownote Generation
Generate the episode description/shownote.

Run: `/generate-shownote $1`

Present the shownote for user review. Apply any requested edits.

---

### Step 4: Chapter Generation
Generate chapter markers from the transcript.

Run: `/generate-chapters $1`

Present chapters for user review.

---

### Step 5: Art19 Upload Bundle
Consolidate all materials for Art19 upload.

Run: `/prepare-episode $1`

This outputs all materials in copy-paste-ready format.

---

### Step 6: Art19 Upload (Manual)
Remind the user:
```
Art19 にアップロードしてください:
1. Art19 ダッシュボード → New Episode
2. 音源ファイルをアップロード
3. 上記バンドルからタイトル・Description・Chapters をコピペ
4. 広告ポイントを設定
5. プレビュー確認 → 公開

公開後、RSS が更新されると:
- GitHub Actions が自動で momit.fm サイトを更新
- announcement.txt が自動生成されます

準備ができたら「done」と教えてください。
```

---

### Step 7: Post-Publication
After the user confirms Art19 publication:

1. Generate the announcement text:
   Run: `/generate-announcement $1`

2. Stage and remind about committing:
   ```bash
   git add public/transcripts/$1.json
   ```
   Suggest committing with: `Add transcript for episode $1`

3. Present the final summary:
   ```
   ## Episode $1 Release Complete

   - [x] Transcript converted and committed
   - [x] Title selected
   - [x] Shownote generated
   - [x] Chapters created
   - [x] Art19 uploaded
   - [x] Announcement text ready

   GitHub Actions will handle:
   - [x] RSS monitoring → site update
   - [x] Vercel deploy

   Next: Copy announcement text to X/Twitter
   ```

## Important Notes
- Each step pauses for user confirmation before proceeding
- If a step fails, troubleshoot before moving on
- The user can skip steps if they've already completed them
- Art19 upload is always manual (no API available)
