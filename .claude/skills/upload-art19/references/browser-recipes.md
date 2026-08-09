# Art19 browser recipes (verified 2026-08)

JavaScript snippets for `mcp__claude-in-chrome__javascript_tool`. All verified live against the Art19 admin UI (Ember + Quill).

## Set Description via Quill API

Preserves anchors and bold. Build `html` from the prepare-episode bundle.

```js
const html = `<p>…opening…</p><p><br></p><p>🎉 <strong>Topic</strong> – desc</p>…`;
const editorEl = document.querySelector('.ql-editor');
const container = editorEl.closest('.ql-container');
let quill = container.__quill || (window.Quill && window.Quill.find && window.Quill.find(container));
if (quill) {
  quill.setContents(quill.clipboard.convert(html));
} else {
  editorEl.innerHTML = html;
  editorEl.dispatchEvent(new Event('input', {bubbles: true}));
}
```

Description HTML conventions (from ep98 RSS output):
- Topics: `<p>emoji <strong>title</strong> – description</p>`
- Separator: `<p>…………………………………………………………………</p>` (full-width ellipsis ×15)
- Links: `<a href="…" rel="noopener noreferrer" target="_blank">text</a>`
- Fixed anchors: `#momitfm`→`https://x.com/search?q=momitfm`, `お便りフォーム`→Google Form URL, `@_yukamiya`/`@m2vela`→x.com, `@kirillovlov2983`→YouTube
- Feedback block is a `<ul><li>…</li></ul>`

## Select Mid-Roll AIP type (Ember custom radio)

Real mouse clicks and plain `.click()` on the label div do NOT register. This does:

```js
const midRadio = [...document.querySelectorAll('input[type=radio]')].find(r => r.value === '1');
midRadio.click();
midRadio.checked = true;
midRadio.dispatchEvent(new Event('change', {bubbles: true}));
midRadio.dispatchEvent(new Event('input', {bubbles: true}));
```

Radio values in the AIP Type group: `0`=Pre-Roll, `1`=Mid-Roll, `2`=Post-Roll.

## Read Start Date / time field values

```js
[...document.querySelectorAll('input.date-picker-target, input.art19-power-timepicker-input')].map(i => i.value)
// e.g. ["Aug 9, 2026", "6:00 PM"]
```

- Date: `form_input` with `MM/DD/YYYY` works (normalizes to "Aug 9, 2026").
- Time: `form_input` does NOT work (normalizes to 12:00 AM). Click the time input → dropdown of 30-min options opens → `find` the option button (e.g. "6:00 PM") → click its ref.

## Marker timestamp input

The marker editor panel's timestamp textbox has class `spinner-9`; `form_input` with `HH:MM:SS.00` works. The markers list text confirms placement:

```js
const markers = [...document.querySelectorAll('div,section')].find(e =>
  e.textContent.includes('Markers') && e.textContent.includes('Pre-Roll 1') && e.textContent.length < 2000);
markers.textContent.replace(/\s+/g, ' ');
// "Markers Pre-Roll 1 00:00:00.00 | … Mid-Roll 1 00:17:06.00 | … Post-Roll 1 00:34:12.71 | …"
```

## Reliable Save (when the header Save button doesn't fire)

The Save button sits in the page header, **outside** the form. Ref/coordinate clicks can silently do nothing (verify with read_network_requests: no `PUT /episodes/{uuid}` = not saved). Reliable path:

```js
document.querySelector('form.ui__form').requestSubmit();
// → triggers PUT https://art19.com/episodes/{uuid} (expect 200), page navigates from /edit to detail
```

Verify persistence server-side (works even if the page is flaky):

```js
const res = await fetch('https://art19.com/episodes/{uuid}', {
  headers: {Accept: 'application/vnd.api+json'}, credentials: 'include'});
const j = await res.json();
j.data.attributes.description  // HTML — check anchors here
// NOTE: description_plain strips <a> tags; never use it to verify links
```

Or check the public RSS after a few minutes: `curl -s https://rss.art19.com/momitfm | grep -c '<marker>'`.

## Check episode status / errors after Save

```js
({
  url: location.href,
  status: [...document.querySelectorAll('*')].filter(e => e.children.length === 0 &&
    /^(Draft|Scheduled|Published)$/i.test(e.textContent.trim())).map(e => e.textContent.trim()),
  error: [...document.querySelectorAll('section,div')].filter(e =>
    /could not|Unschedule/i.test(e.textContent) && e.textContent.length < 500)
    .map(e => e.textContent.replace(/\s+/g, ' ').trim()).slice(0, 2)
})
```

Successful save navigates from `…/edit` to the episode detail URL (no `/edit` suffix).
