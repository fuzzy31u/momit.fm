---
name: edit-riverside
description: Edit a momit.fm recording in Riverside (MCP, or the browser fallback when the plan lacks MCP) — Magic Audio, pause removal, Japanese filler-word cuts ("なんか"/"あの"/"ちょっと"), the opening cut, and overlaying the intro/outro bed without changing the runtime. Step 0 of release-episode. Use when the user says "Riverside 編集", "音声編集", "エピソードN を編集", "edit episode N".
arguments: [episode]
---

You are editing a momit.fm recording in Riverside through the Riverside MCP (`mcp__riverside__*`), or through the Browser fallback section when the MCP is unavailable. This replaces three manual right-panel operations: AI Tools (Remove pauses + Magic Audio), Your Media (intro/outro insert), and Co-creator ("Remove filler words なんか, あの and ちょっと").

## Input
- Episode number: `$episode`
- Output contract (what `release-episode` Step 0 needs): `~/Downloads/momitfm$episode.mp3` and `.txt`. A `.srt` is not produced by default and is not required — see fact 14.

## Constants

Fill these on the first successful run and keep them here (`TBD` means: discover it, then edit this file).

- `PRODUCTION_ID`: UNVERIFIED — `65dda57c9aaa32ccaaf05ac0` appears in the web app's `/api/v4/production/...` calls, but the MCP has never confirmed it is the same entity. Treat as TBD for MCP purposes: Step 0 must confirm it from `platform_list_productions` before any MCP read uses it
- `STUDIO_ID`: `98-87TKS`
- `PROJECT_ID`: per episode — the id in the project URL (`/projects/<id>`); ep102 was `6abe14d2202ec7063a93cd07`
- `INTRO_ASSET_ID`: TBD — the asset is named `momitfm_theme_intro_v01.mp3` in Your Media → Audio (not `momit.fm_stream_intro.mp3`)
- `INTRO_DURATION_MS`: ~7800 (UI shows `00:07`)
- `PAUSE_THRESHOLD_MS`: TBD for MCP. In the UI the Remove-pauses slider has 5 steps (0–4); **step 4 (max)** is the agreed setting (ep102: 40:23 → 39:55)
- `FILLER_WORDS`: `["なんか", "あの", "ちょっと"]` — 「ちょっと」 added at the user's request on ep102; keep the degree-adverb uses (「もうちょっと」「ちょっと忙しい」「ちょっと経路が違う」 etc.)

## Critical facts (do not rediscover)

1. **`editing_remove_fillers` does NOT do what we want.** It removes only regions the transcript labelled as disfluency. Japanese 「なんか」「あの」 are ordinary words and carry no such label. Use the transcript-selection path in Step 5 instead.
2. **Two time axes. Mixing them corrupts the edit silently, with no error.**
   - *playable* ms (post-cut, what the listener hears): `editing_cut_time_ranges`, `editing_insert_audio`, `editing_read_aligned_transcript`, `editing_resolve_transcript_selection`
   - *source* `{n,d}` fractions (pre-cut): `editing_read_timeline_in_range`
   Never compare or derive across them. Converting a `{n,d}` to ms does not make it comparable to a playable ms.
3. **Thread the revision.** Every revision-aware write takes `expectedRevision`; pass the revision the previous write returned. A revision conflict is **not retryable** — never re-fire the same write with a newer number substituted. Stop, re-read, re-derive (Error handling).
4. **Never create a second edit.** Keep passing the same `editId`. `editing_clone_edit` only when the user explicitly wants a separate version (or for the dry run).
5. **`editing_insert_audio` overlays; it does not extend the timeline.** That is exactly what momit.fm wants — the intro bed plays under the opening, runtime unchanged. Do not reach for `editing_insert_media_as_scene` (that one grows the timeline).
6. **Cuts move the playable axis, so intro/outro insertion must come last.** A playable offset computed before Step 5 is wrong after it.
7. **Transcript handles are opaque and revision-scoped.** Pass them through exactly as received — never parse one, rebuild a timestamp from one, or carry one across revisions. The ms bounds printed beside them are rounded outward and are for orientation only.
8. **`editing_resolve_transcript_selection` fails closed.** Execute `payload.input` unchanged, and only when `readyToApply` is true. A null payload is an answer, not an obstacle.
9. **No export-trigger tool exists** on the public surface (`platform_list_exports` / `platform_get_export` are read-only). Export is triggered by the user in the UI; we poll.
10. **OAuth expires after 7 days** with no silent refresh. `Needs authentication` → the user reconnects via `/mcp`.
11. **Prefer the dedicated tool over `editing_batch`.** (And the callable name is `editing_batch`, not `editing_editing_batch`.)
12. **`editing_get_editing_guide` is authoritative** for parameters, enums, limits and defaults — this file deliberately does not copy them. Request the narrowest section; an unscoped call is the most expensive read on this surface.
13. **Riverside's download filenames are not episode-shaped.** Audio arrives as `riverside_edit_- <studio name>_<internal n>.mp3` (the trailing number is Riverside's own counter, **not** the episode number) and the transcript as `<studio-slug> (<n>).txt` — e.g. `riverside_edit_- miho & yu_98.mp3` + `miho-yu (4).txt` for episode 101. `scripts/renameDownloads.js` maps both onto `momitfm{N}.*` by mtime.
14. **No `.srt` is produced by default.** Only the audio and the `.txt` transcript come down. `convert-transcript` and Art19 need only those two, so a missing `.srt` is not an error.
15. **Do NOT down-convert the export — Art19 re-encodes everything to 128 kbps on delivery.** Every published enclosure is ~128 kbps regardless of what was uploaded (verified 2026-09 across ep97–101, including ep100 which was uploaded at 64 kbps). The old "64 kbps house standard" described the *uploaded* file, not what listeners receive, so down-converting only adds a lossy generation ahead of Art19's own transcode and makes the delivered audio worse. **Upload Riverside's export as-is.** Shrinking it is justified only when upload time is the actual problem — say so and get the user's agreement first.
16. **The transcript is cut from the RAW recording; the mp3 is the EDITED export.** Their timelines do not match — every pause removed and every filler cut makes the transcript run ahead, and the gap accumulates toward the end (ep98 +5:43, ep99 +3:39, ep101 +3:15, ep102 +1:23, ep100 +0:27). Any timestamp derived from the transcript therefore drifts late in the episode; scale by `audio_duration / transcript_end` and say it is an estimate. This is long-standing behaviour, not a regression. It matters for ad insertion points — chapters themselves are never published (Art19 has no chapter field).

## Workflow

### Step 0: Connectivity & plan check
Call `platform_list_productions` once.
- Auth error → tell the user to run `/mcp` and connect Riverside, then retry **once**. If the retry still fails (auth, plan, or the MCP tools never appear — the ep102 outcome), do not loop: switch to the Browser fallback section below.
- Plan error (MCP requires **Grow or above**; Free/Pro are excluded) → the account is on a lower plan and the user does not want to upgrade (decided 2026-10-08). **Switch to the Browser fallback section below** and run the same steps through the Riverside UI via `claude-in-chrome`. Do not keep retrying the MCP.
- Success → compare the returned production id with Constants; record it if TBD, and replace the UNVERIFIED value if it differs.

### Step 1: Locate the recording
`platform_list_projects` → `platform_list_recordings`. Identify the session for episode `$episode`. If several takes exist, show them (date, duration) and ask which one. Never guess the take.

### Step 2: Get the edit (do not create a duplicate)
`platform_list_edits` first. If an edit already exists for this recording, use it — the user may have started one in the UI. Otherwise `editing_create_edit_from_recording` with the session and project ids.

Hold `editId` and the current `revision`. **Record this starting revision** — Step 7 diffs against it.

### Step 2.5: Is this edit already done?
Before any write, call `editing_compare_revisions` from the edit's first revision to its current one. It attributes each cut and mute to the pass that produced it, so it tells you which of Steps 3-6 have already run.

**The cleanup passes are not idempotent** — `editing_remove_pauses` and `editing_cut_time_ranges` cut again, and `editing_insert_audio` overlays a second copy of the intro. So:

- Passes already applied → **skip those steps**. Say which ones you skipped and why.
- Everything already applied → the edit is finished; go straight to Step 8 (export).
- Nothing applied → continue to Step 3.

This is the common case when a download failed and the release workflow re-entered this skill (see `release-episode` Step 0).

### Step 3: Magic Audio
`editing_set_magic_audio` on each recording track. It only changes how a track sounds — it removes nothing and creates no cuts, so it is order-independent and does not affect the axes.

### Step 4: Remove pauses
`editing_remove_pauses` with `PAUSE_THRESHOLD_MS` and `expectedRevision`. On the first run, agree the threshold with the user before calling — too low and the speech sounds clipped. Keep the returned revision.

### Step 5: Cut 「なんか」「あの」「ちょっと」

1. `editing_read_aligned_transcript` in **word-detail** mode, windowed across the episode. Widen a window rather than assuming the transcript ended.
2. Collect the word handles matching `FILLER_WORDS` (fact 7 — pass handles through untouched).
3. Drop the meaningful uses, which are not fillers:
   - 「あの」 as a demonstrative — 「あの人」「あの時」「あの話」「あのとき」「あの番組」「あのレポート」 etc. (followed by a noun)
   - 「なんか」 in its substantive sense — 「なんか食べたい」「なんかない?」「〜なんか」 as a particle (「私なんか」「日本なんか」「パンなんか」)
   - 「ちょっと」 as a degree adverb — 「もうちょっと」「ちょっと忙しい」「ちょっと間が空いた」「ちょっと経路が違う」 (modifying an adjective/verb with the sense "a little"). The softener before a clause (「ちょっとまず最初に」「ちょっとね」) is the filler
   Keep only the interjectional/hesitation uses. On ep102 this kept 5 of 93 なんか/あの and 9 of 53 ちょっと.
4. **Approval gate (default ON).** Present the candidates as a numbered list with a short before/after context snippet each, plus the count and estimated time saved. Wait for approval; cut only what the user approved. Skip this gate only when invoked with `--auto`.
5. `editing_resolve_transcript_selection` with intent `remove`, against the **same revision** the transcript read returned.
6. Check `readyToApply`. False, or `payload: null` → **stop**, report the warnings, re-resolve. Do not hand-build a call.
7. Execute `payload.input` **unchanged** via `editing_cut_time_ranges`, threading `expectedRevision`. Keep the returned revision.

### Step 5.5: Cut the opening pre-roll words (rule from 2026-10-08, applies from ep103)
The episode must start on 「momit.fm は IT 企業で働く…」. Cut everything before it: the host's 「はい、始めます」 (and any lead-in pause). The ASR renders the show name as 「AMITFM」「マミットFM」「モミットFM」 etc., so locate the cut end by the phrase 「は IT 企業で働く」 rather than the brand spelling. No approval gate — this is a standing instruction. It is a cut, so it must come **before** Step 6 (fact 6) and it shifts every playable offset by the removed length.

### Step 6: Overlay intro & outro (must be after Step 5.5)
1. `editing_get_asset_metadata(INTRO_ASSET_ID)` → duration. (First run: find the asset id via the media tools and write both into Constants.)
2. Get the playable end from `editing_read_aligned_transcript` — **never** from a source-axis read (fact 2).
3. `editing_insert_audio` twice on the same asset:
   - intro: `startMs: 0`
   - outro: `startMs: playableEnd − INTRO_DURATION_MS`
   Level and fades: take the current parameter names off the live schema.
4. Thread `expectedRevision` through both.

### Step 7: Verify from the diff, not from intent
`editing_compare_revisions` from the Step 2 starting revision to the final one. Report from its attributed result:
- which pass produced which cuts/mutes, and how many
- duration before and after
- that the Step 6 inserts did **not** change the duration (overlay, fact 5)

If the comparison disagrees with what you believe you did, report the comparison.

### Step 8: Export & download (manual trigger, polled completion)

1. Give the user the edit URL and ask them to hit Export in the Riverside UI (fact 9), then download the **audio** and the **transcript** to `~/Downloads`.
2. Poll `platform_list_exports` / `platform_get_export` until the export is ready. Report progress rather than going silent.
3. **Dry-run the rename first** — the script picks the most recently modified `.txt`/`.srt`/`.mp3` in `~/Downloads` (past 7 days, skipping `momitfm*`), so an unrelated recent download can be grabbed by mistake:
   ```bash
   node scripts/renameDownloads.js $episode --json
   ```
   Check the `from` names against fact 13 before executing. Then:
   ```bash
   node scripts/renameDownloads.js $episode --json --yes
   ```
4. **Record the audio parameters — do not re-encode** (fact 15). Confirm the duration matches the edit, note codec/bitrate for the log, and move on:
   ```bash
   ffprobe -v error -select_streams a:0 \
     -show_entries stream=codec_name,channels,sample_rate,bit_rate \
     -show_entries format=duration -of default=noprint_wrappers=1 \
     ~/Downloads/momitfm$episode.mp3
   ```
5. Confirm the handoff contract before declaring done (`.srt` is optional — fact 14):
   ```bash
   ls -la ~/Downloads/momitfm$episode.mp3 ~/Downloads/momitfm$episode.txt
   ```
6. Hand back to `release-episode`.

## Browser fallback (no Grow plan — used for ep102, 2026-10-08)

Same steps, driven through the Riverside UI with `claude-in-chrome`. The user logs in themselves; a `tabs_context_mcp` tab is navigated to the project URL. Verified behaviour:

- **Editor**: Recordings tab → `Edit` on the recording creates/opens the edit (URL `riverside.com/editor/<take>/<clip>/preview`). Check the Edits tab first — "No edits yet" means nothing is applied.
- **Step 2.5 equivalent (an edit already exists)**: there is no revision diff in the UI, so read each pass's state before touching it. `AI tools` panel: the Magic Audio and Remove pauses toggles show ON if applied (the runtime under the transport bar drops below the recording length). Fillers: hide deleted parts and search 「なんか」「あの」「ちょっと」 — the pass is done only when each count **equals** its keep-list count (the demonstrative/substantive uses from Step 5.3). A higher count means the pass is unfinished, typically the punctuated tokens Co-Creator skips (「なんか、」「あの、」「ちょっと、」); do not re-run Co-Creator, resume at the manual punctuated-miss step in **Filler cuts** below and remove only the remaining tokens. Opening cut: the first visible transcript word is the show name. Overlays: the overlay track (above the main track) shows the intro clip at 0:00 and the outro at the end. Skip every pass that is already applied; the passes are not idempotent here either (a second Remove pauses toggle-off/on re-cuts, a second asset click inserts a second overlay).
- **Magic Audio / Remove pauses**: right rail `AI tools`. Toggling Remove pauses shows a 5-step slider; use step 4 (see Constants). Runtime in the transport bar (`mm:ss / total`) is the verification signal.
- **Transcript text is not in the DOM** (canvas-rendered). Fetch it in page context instead: `GET /api/v4/transcriptions/editableWithVoiceActivity/<take-id>` (same-origin, `credentials:'include'`). Shape: `data.speakers[].sentences[].words[]` = `[text, startMs, durMs, "noise"?]`. Tokens are character-level, so match keywords across adjacent tokens. This gives every filler with timestamp + context for the approval gate.
- **Filler cuts**: Co-Creator prompt `Remove the filler words 「なんか」, 「あの」 and 「ちょっと」 … Do NOT remove: <timestamp + phrase list from Step 5.3>` honours the exceptions well (ep102 ran it as two prompts, なんか/あの then ちょっと; one prompt with all three should work the same). **It skips tokens that carry trailing punctuation** (`なんか、` `あの、` `ちょっと、`). After it reports "Editing complete", hide deleted parts (search-bar filter icon → untick *Show deleted parts*), search each word and compare the count with the exception count. Fix misses by hand: drag-select the token in the transcript (double-click selects only half of a split token) and press `Delete`. Search for `なんか、` (with the comma) to isolate the misses.
- **Opening cut (Step 5.5) — NOT yet exercised; first run is ep103**: scroll the transcript to the top, drag-select from the first token through the token just before 「momit.fm は」 (ASR: 「AMITFM」 etc.; the ep102 first line read 「はい 始 め ます ᐱ AMITFM は IT 企 業 で…」), press `Delete`, and confirm the first visible word is now the show name. The drag-select + `Delete` mechanics are the same ones verified for the filler misses; the only unverified part is whether the leading pause marker (ᐱ) needs to be in the selection. Do this before the intro overlay so 0:00 is the new start. ep102 was published without this cut.
- **Intro/outro overlay**: `Your media` → Audio → click the asset. It inserts at the playhead on an overlay track and does not extend the runtime. Put the playhead at 0:00 by clicking the first transcript word (`Home` does nothing; clicking the ruler is imprecise). For the outro, click the last word, zoom the timeline (`+` ×6), click the ruler at end − 8 s, then insert. Overlays are anchored to content: later cuts move the outro with the end, so re-placement after extra cuts was not needed.
- **Export**: top-right `Export` → `Export` → Audio tab → quality **MP3** (default is WAV HD) → `Export audio only`. Ready in ~1 min under Project → Exports.
- **Downloads need the user's permission first — and the Exports-tab `Download` button saves the mp3 immediately with no menu.** Ask before clicking it. The transcript is Recordings → Tracks → Transcript → `Download` → *Transcript*. Then Step 8.3–8.5 as usual.

## Error handling

- **Revision conflict** — the edit moved underneath you; not transient, not retryable. Recover: `editing_get_revision` for the current number **and** re-run whichever read your arguments came from (transcript handles are revision-scoped, so re-resolve them); re-derive the operation against what you just read; tell the user what changed and what you intend; only then write. If the other change already did what was asked, say so instead of doing it twice.
- **Transcript precondition error** (filler/pause/smart-mute paths need a loadable transcript) — report the reason. Do not retry the same call, and do not substitute hand-computed cuts that pretend to be the same operation.
- **A tool is missing from the live surface or comes back unavailable** — say so, then offer only a fallback that the error response or `editing_get_editing_guide` actually names, described as what it does rather than as an equivalent. Never assemble a substitute or guess a tool name.
- **Undo one cleanup pass**: `editing_restore_audio_cleanup`, naming the pass. It is per-pass, not a general undo, and it does not roll back the Step 5 manual cuts.
- **`Needs authentication`** → `/mcp` → connect Riverside (fact 10).
