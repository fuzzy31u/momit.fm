---
name: upload-art19
description: Upload momit.fm episode contents to Art19 via browser automation (claude-in-chrome) — creates a new episode, fills title/description, guides audio upload, sets a Mid-Roll ad insertion point at the audio midpoint, optionally sets the start date, and saves as Draft for human review. Use when releasing an episode after prepare-episode, or when the user says "Art19 にアップロード", "upload to Art19", "Art19 入稿".
arguments: [episode]
---

You are uploading a momit.fm episode to Art19 via browser automation. All steps below were verified against the live Art19 admin UI (2026-08). Pause for user confirmation where marked.

## Input
- Episode number: $episode
- Prerequisites: materials from `prepare-episode` (title, description, ad point), audio at `~/Downloads/momitfm$episode.mp3`

## Constants
- Entry page: `https://art19.com/admin/series/3020f7a0-0e0b-416c-b96d-e26903718f2c/content/episodes`
- Timezone shown in Release Schedule: JST

## Critical UI facts (learned from live runs — do not rediscover)

1. **Start Date + Save = Scheduled, not Draft.** Art19 has no "draft with a date". Saving with a Start Date set schedules auto-publish. To keep a Draft, leave Start Date empty. Clearing the date on a Scheduled episode triggers an in-page "Unschedule Episode?" modal → click OK to return to Draft.
2. **Start Date requires audio.** Saving with a Start Date but no audio fails: "Episode could not be scheduled/published: Audio File is missing". Save as Draft (no date) first, add audio, then set the date.
3. **Audio upload is manual.** The mp3 (~16MB) exceeds the file_upload tool's 10MB limit. The user uploads via "Select File…" on the episode edit page in their own browser window.
4. **The time picker rejects typed values.** `form_input` on the time field normalizes to a wrong value. Working method: click the time input → dropdown opens → `find` the desired option button (e.g. "6:00 PM") → click it.
5. **The date field accepts `form_input` with `MM/DD/YYYY`** and normalizes to "Aug 9, 2026".
6. **AIP Type radios ignore real clicks.** Ember custom radios only respond to JS: `radio.click(); radio.checked = true; dispatchEvent(change + input)`. Radio values: 0=Pre-Roll, 1=Mid-Roll, 2=Post-Roll.
7. **Description is a Quill editor.** Set rich text (anchors, bold) via the Quill API — see `references/browser-recipes.md`. Plain typing loses links.
8. **Pre-Roll 1 and Post-Roll 1 markers are auto-created** on audio upload. Only the Mid-Roll needs adding.
9. **Episode Number field stays empty** — the number is already in the title.
10. **Login is manual.** If redirected to `art19.com/login`, ask the user to sign in in their own browser window (same profile shares cookies with the automation tab). Never enter credentials.

## Workflow

### Step 1: Open entry page & create episode
- Load claude-in-chrome tools (one ToolSearch batch), get tab context, navigate to the entry page.
- If redirected to login → user signs in manually (fact 10), then re-navigate.
- `find` "New Episode" button → click. A new episode edit page opens (`.../episodes/{uuid}/edit?new=true`).

### Step 2: Fill title & description
- Title: `form_input` on the Title textbox.
- Description: Quill API recipe in `references/browser-recipes.md`. Build the HTML from the prepare-episode bundle (anchors for #momitfm, お便りフォーム, hub article, credits).
- Leave Episode Number blank. Type=Full, Rating=Clean are correct defaults.

### Step 3: Save as Draft (no Start Date yet)
- Click Save. Verify: URL loses `/edit?new=true`, page title shows the episode title, no error banner.
- Note the episode UUID from the URL.

### Step 4: Audio upload (manual — pause here)
Give the user the edit URL (`.../episodes/{uuid}/edit`) and ask them to upload `~/Downloads/momitfm$episode.mp3` via "Select File…", waiting until the waveform appears. Wait for their "done".

### Step 5: Mid-Roll ad insertion point
- Reload the edit page. Read the audio duration from the page text (format `00:MM:SS.ss`, shown next to the Post-Roll 1 marker).
- Compute midpoint = duration / 2 (round to the second).
- Click "New Marker" → menu appears → click "Ad Insertion Point". A new marker panel opens (defaults to Pre-Roll @ playhead).
- Set the marker timestamp: `form_input` the panel's timestamp textbox (class `spinner-9`) to `00:MM:SS.00`.
- Switch type to Mid-Roll via the JS radio recipe (fact 6).
- Verify the markers list shows `Mid-Roll 1 @ <midpoint>` → click "Save & Close".

### Step 6: Start Date (ask the user first)
Ask: keep as **Draft** (no date — user sets it when publishing) or **Schedule** (set date → auto-publishes)?
- Draft: skip this step.
- Schedule: `form_input` date as `MM/DD/YYYY`, set time via dropdown-click (fact 4), then Save. Status becomes "Scheduled".

### Step 7: Final save & report
- Click Save (top of form). Verify status badge (Draft/Scheduled) via page text.
- Report to the user: episode URL, status, and remaining manual items (chapters if not entered, review before publish).

## Error handling
- **Save click does nothing (no network request, URL stays on /edit)** → the Save button lives in the page header, outside the form; its binding can silently break. Fire the submit directly: `document.querySelector('form.ui__form').requestSubmit()`, then confirm a `PUT /episodes/{uuid}` → 200 via read_network_requests. Verify persistence with `fetch('https://art19.com/episodes/{uuid}', {headers:{Accept:'application/vnd.api+json'}, credentials:'include'})` — check the `description` attribute (HTML; `description_plain` strips links so never use it to verify anchors).
- **Page never reaches document_idle / renderer freezes** (find/read_page time out after audio upload) → close the tab and work from a fresh tab; drive with javascript_tool.
- Save error banner mentions "Audio File is missing" → you set a Start Date too early; clear it (X button next to date), Save, and follow fact 2's order.
- "Unschedule Episode?" modal after clearing date → click OK (this is the documented path back to Draft).
- Element refs go stale after Ember re-renders → re-run `find` instead of reusing old refs.
- Screenshots may fail (hidden window) → drive everything with `read_page` / `find` / `javascript_tool`; never block on visuals.
