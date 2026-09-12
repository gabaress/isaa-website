# Keeping the ISAA website up to date

This page is for whoever looks after the website on the committee — usually the Webmaster or PRO. You do not need to be a developer. Almost everything on the site is edited by changing a few text files in the `data/` folder; the site rebuilds itself when you save your changes to GitHub.

If something here is unclear, email `isaawebmaster@archery.ie` — and then improve this file so the next committee does not have the same question.

---

## 1. How the site is built and published

- The site is stored on GitHub in this repository.
- Every time a change is saved ("committed") to the `main` branch, Vercel rebuilds and publishes the site automatically within a minute or two.
- Nothing on the site is typed in by hand on a web page. **All content lives in files under `data/`.** Change the file, save it to GitHub, and the change is live.

You can edit a file directly on GitHub in the browser: open the file, click the pencil icon, make the change, and choose *Commit changes* to `main`. That is the whole workflow.

## 2. Placeholders — what the square brackets mean

Anything on the site that ISAA has not supplied yet is written in the data files as text in square brackets, for example:

```
"email": "[insert email here]"
```

- On the **demo** site these appear as dashed grey boxes, so the committee can see exactly what is missing and where.
- On the **public** site they are hidden completely — the row simply is not shown.

This is controlled by one setting on Vercel called `NEXT_PUBLIC_SHOW_PLACEHOLDERS`. It is set to `true` on the demo deployment only. **Never set it on the public site.** If it is not set at all, placeholders are hidden, which is the safe default.

To fill in a placeholder, replace the whole bracketed text with the real value. To leave something out entirely, delete the line.

`[VERIFY]` notes on the demo are questions for the committee about wording that a developer wrote and should not publish without a yes. Once confirmed, a developer removes the note from the page file (they are in `app/`, not in `data/`).

## 3. The files you will actually edit

All in the `data/` folder.

### `clubs.json` — the club directory

One entry per affiliated club, kept in alphabetical order by the name students scan for. The fields:

| Field | Required | What it is |
|---|---|---|
| `id` | yes | Short lowercase code, e.g. `ucd`. This is the link anchor: `/clubs#ucd`. Do not change it once published. |
| `institution` | yes | The big label on the card — the name a student looks for. For ATU use the campus (`ATU Sligo`). |
| `clubName` | no | Second line: the club's own name (`Dublin University Archery Club`), or the full institution name where the big label is a short form. |
| `city` | no | Leave out for multi-campus institutions. |
| `description` | no | One or two plain sentences about the club. |
| `email` | no | The club's contact address. |
| `instagram` | no | The full URL, e.g. `https://www.instagram.com/example/`. |
| `website` | no | Full URL, if the club has one. |
| `logo` | no | Not used yet — see §6. |

**To add a club:** copy an existing entry, change every field, and place it in alphabetical order. The club count on the homepage, the facts strip and the About page updates automatically — but see the note about the word "Sixteen" in §7.

**To remove a club:** delete its entry.

### `events.json` — fixtures and results

One entry per event. The site works out for itself which events are upcoming and which are past, using today's date, so you never move anything between lists. Past events older than two years drop off automatically.

```json
{
  "id": "indoor-iv-2026",
  "title": "Indoor Intervarsity 2026",
  "type": "competition",
  "startDate": "2026-11-14",
  "endDate": "2026-11-15",
  "venue": "Sports hall name, City",
  "description": "One or two sentences on format and who can enter.",
  "entryDeadline": "2026-11-01",
  "entryUrl": "https://forms.example/entry",
  "resultsUrl": "https://example.com/results"
}
```

- `type` must be one of: `competition`, `social`, `agm`, `training`.
- Dates are written year-month-day: `2026-11-14`.
- `endDate`, `description`, `entryDeadline`, `entryUrl` and `resultsUrl` are all optional — leave out what you do not have.
- The entry link goes to whatever ISAA already uses (a Google Form, a club page). The site does not take entries itself.
- Add `resultsUrl` after the event and it appears on the past-events row.

The next three upcoming events also appear on the homepage. If there are no upcoming events, the homepage section disappears and the events page shows a short "fixtures are confirmed at the start of term" note instead.

**The site only recalculates dates when it is rebuilt.** Vercel rebuilds on every change to `main`, so in a quiet term an event can linger in "Upcoming" for a while after it has passed. Any small edit (even to this file) triggers a rebuild — or ask the Webmaster to set up a weekly scheduled redeploy on Vercel.

### `documents.json` — handbooks, rules and the constitution

One entry per PDF on the Resources page.

| Field | What it is |
|---|---|
| `title` | As it should appear. |
| `description` | One line on who it is for and what it covers. |
| `group` | `competing` or `governance`. |
| `file` | Path to the PDF inside `public/pdfs/`, e.g. `/pdfs/isaa-rulebook-2017.pdf`. |
| `sizeLabel` | The real file size, e.g. `PDF · 342KB`. Check it — do not guess. |
| `versionLabel` | The date inside the document: `Adopted 12 August 2017`, `Last updated September 2025`. **Always shown.** |

**To add or replace a document:** put the PDF in `public/pdfs/` with a plain lowercase filename (letters, numbers and hyphens only — no spaces or apostrophes), then add or update its entry here with the real size and the version date. If a newer version of an existing document is adopted, replace the file and update `versionLabel`.

### `facts.json` — the three facts on the homepage

Exactly what appears in the strip under the hero. `{clubCount}` is replaced by the number of clubs in `clubs.json`. Keep it to verified facts; the client has ruled out adding a founding year.

### `committee.json` — committee roles and role emails

Role names and their role addresses. Names are deliberately not shown. When a role is added or renamed at an AGM, change it here.

### `site.json` — site-wide details

The general email, the Instagram URL, the one-line tagline and the domain. Add `"facebook": "https://..."` if ISAA ever has a Facebook page and an icon will appear in the footer automatically — icons only appear for links that exist.

## 4. Text on the pages themselves

Longer copy — the About paragraphs, the New to Archery page, the FAQs, the privacy page — lives in the page files in `app/` (for example `app/getting-started/page.tsx`). These are code files, but the text in them is plain English between tags, and small wording changes are safe to make in the GitHub editor. For anything bigger, ask someone comfortable with code.

## 5. Photographs

Three photographs are used, deliberately large, one per slot:

| Slot | File | What works here |
|---|---|---|
| Homepage hero | `public/photos/hero-full-draw.webp` (1600×900) | An action shot, subject on the right. It sits under a strong green tint, so contrast matters more than colour. |
| About | `public/photos/about-squad.webp` (1600×900) | A squad or event photo that shows a real competition. |
| New to Archery | `public/photos/beginners-club-kit.webp` (1600×1067) | Ordinary students in club kit — peers, not athletes. |

The current three are placeholders due for replacement. To swap one, a developer runs `npm run assets:photos` after editing `scripts/prep-photos.mjs` to point at the new original — that resizes it, strips camera metadata and keeps it under the size budget (hero ≤180KB, others ≤120KB). Keep the same filename and dimensions and nothing else needs to change.

Before using any photo: confirm everyone pictured has consented, nobody is under 18, and you know who took it. Credit the photographer — there is a `credit` slot on each figure.

## 6. Club logos

Not used yet, by decision. The card is designed for them: put a square logo at `public/club-logos/{id}.webp` (max 240px wide, on a white background, under ~15KB) and add `"logo": "/club-logos/ucd.webp"` to the club's entry. Do this for all clubs or none — a mix of crests, wordmarks and blanks looks worse than names alone.

## 7. Outstanding items — what the demo is asking for

In rough order of value:

1. **Every club's email and Instagram** (`clubs.json`) — the single most useful thing on the site. Until all sixteen are in, the site must not go to the public domain.
2. **A confirmed fixture list** (`events.json`).
3. **One-line descriptions** for the four documents (`documents.json`) and for each club (`clubs.json`).
4. **Answers to the `[VERIFY]` notes** visible on the demo: beginner kit, costs, the safeguarding wording on New to Archery, the Archery Ireland sentence and the "never picked up a bow" sentence on About, whether the 2017 Constitution and Rulebook have been amended since, whether a safeguarding policy document exists, and the privacy wording.
5. **The word "Sixteen"** in the homepage hero subhead (`app/page.tsx`) is typed as a word because a sentence cannot start with a numeral. When the club count changes, change that word.
6. **A proper vector logo.** The current one is traced from a raster; it is fine on screen but a redrawn version would be cleaner.

## 8. Going live on isaa.archery.ie — the launch checklist

1. All sixteen clubs have real contact details.
2. Every `[VERIFY]` note has been answered and removed from the page files.
3. Run the launch gate: with `NEXT_PUBLIC_SHOW_PLACEHOLDERS` **unset**, build the site and run `npm run check:launch`. It fails if any bracketed placeholder is still in the output. Do not launch on a failing check.
4. Make sure `NEXT_PUBLIC_SHOW_PLACEHOLDERS` is not set on the production deployment on Vercel.
5. Archery Ireland's DNS contact adds a CNAME for `isaa.archery.ie` pointing at Vercel; add the domain in the Vercel project settings.
6. On Vercel set `NEXT_PUBLIC_SITE_URL=https://isaa.archery.ie` and redeploy, so link previews and the sitemap use the real address.
7. Verify the site in Google Search Console and submit `https://isaa.archery.ie/sitemap.xml`.
8. Click every external link and every document download once, by hand.
9. Ask every club to link the site from its Instagram bio and its students' union society page. Sixteen relevant links in the first week matter more than anything else for search.

## 9. Once a year, at handover

- Update `committee.json` if roles changed.
- Check every club is still affiliated and its contacts still work.
- Clear out `events.json` entries older than two years (they stop showing anyway, but the file stays tidy).
- Check the two handbooks are still the current season's and update `versionLabel`.
- Make sure the new Webmaster has access to GitHub and Vercel — both accounts should belong to ISAA role addresses, not to a person.
