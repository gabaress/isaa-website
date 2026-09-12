# ISAA Website — FINAL APPROVED MVP SPECIFICATION

**Status:** Approved for build · v2.5 · **Target of this pass: DEMO, not launch** · Supersedes `SPEC-v1-draft.md`
**Build window:** 24 elapsed hours ≈ **14.25 productive hours + roughly 2 hours slack**
**Changelog**
- **v2.5** — this pass targets a **demo**: §12 separates a demo gate from a launch gate, the custom domain and Search Console come off the critical path, accessibility explicitly does not. The placeholder mechanism generalises to every unsupplied field, so no remaining `[VERIFY]` blocks the build. Founding year removed for good.
- **v2.4** — About copy, hero and footer one-liner approved and locked in §14.2. Athlete Protection Officer recorded, with consequences for `/getting-started` and `/resources`.
- **v2.3** — Trinity naming, `isaa.archery.ie` and all-island scope settled. Club contacts built against bracketed placeholders with a production guard.
- **v2.2** — supplied content recorded verbatim in §14. Analytics and the contact form cut for good.
- **v2.1** — photographs and documents supplied: photo-led hero, `/resources` reinstated, club logos deferred.
- **v2.0** — first approved rewrite of `SPEC-v1-draft.md`.

**Audience for this document:** the developer (human or coding agent) building the site tomorrow.

**Rule that governs everything below:** no fact about ISAA is invented here. Anything unknown is marked `[CONTENT REQUIRED]` (we must be given it) or `[VERIFY]` (a human must confirm it), and **nothing is ever invented to fill a gap.**

How a gap is handled depends on which build it is (§12):

- **Demo build** — render the bracketed marker, visibly styled as a placeholder. The gap becomes the ask, and the committee can see exactly what the site needs from them.
- **Production build** — omit the block entirely. Every section in this spec is specified to survive its content being absent.

One mechanism serves both (§7 item 10). The default is omit, so a forgotten setting fails towards the safe outcome.

---

## 0. Decisions changed from the v1 draft, and why

The v1 draft was structurally sound but failed on three counts: it left roughly a dozen product decisions open for the developer to make at 2am, it assumed assets that do not exist in this repository, and it invented a brand palette that is already sitting in our own logo file.

| # | v1 said | Approved decision | Why |
|---|---|---|---|
| 1 | Palette: invented forest green `#154734` + gold `#D4A017` | **ISAA green `#015a06`, ISAA orange `#FF7E00`**, read directly from `assets/club-logos/isaa-logo/ISAA_logo_vectorised.svg` | We already have real brand colours. Inventing new ones is the fastest possible way to look off-brand. |
| 2 | Photo-led hero; "3–5 real photos essential before launch" | **Photo-led hero confirmed** — five real photographs have now been supplied. But only one is a genuine action shot, so photography is rationed: one hero, two supporting, no photo walls | Three of the five are posed group shots. Repeating them across the site would read as padding. See §5.4 for the per-photo assignment. |
| 3 | A Resources page of PDF downloads | **Reinstated as `/resources`** — four real documents have now been supplied | Four documents serving two distinct audiences (archers, committees) justify a page. All four are now PDFs; the remaining tasks are renaming and version labelling — see §7. |
| 4 | Contact page with a Formspree form | **Cut the form.** A contact block with a large mailto, copyable address and socials | Saves a third-party account, an env var, spam handling, success/error states, testing, and most of the privacy policy. Students contact clubs by Instagram DM anyway. |
| 5 | 7 pages + privacy, with a standalone Contact page | **6 pages + privacy + 404, no Contact page** | Contact was a thin page duplicating the footer. It is now a block on `/about` with an `#contact` anchor. Resources survives on its own because it has four real documents behind it; Contact never did. |
| 6 | Club cards expand via accordion/modal "to save build time" | **Flat cards. No disclosure widget anywhere on the site** | Backwards: an accessible accordion costs *more* time than rendering four fields flat. |
| 7 | Header CTA button ("Get Started" *or* "Find Your Club" — pick one) | **No header CTA button at all** | A persistent CTA button beside a five-item nav on a five-page information site is a SaaS tell. The hero carries the CTAs. |
| 8 | Two type families (Archivo *or* Space Grotesk, + Inter *or* Source Sans) | **One family: Archivo**, weights 400/500/700 | Single-typeface systems read as designed rather than assembled. Space Grotesk in particular now reads as "AI landing page". |
| 9 | `next-sitemap` dependency | **Built-in `app/sitemap.ts` and `app/robots.ts`** | Zero dependencies for something the framework already does. |
| 10 | "`/assets` already exists — reuse as-is" | **Assets must be moved into `public/`** | Next.js does not serve files from a root `/assets` directory. This alone would have cost half an hour of confused debugging. |
| 11 | Lighthouse / a11y / SEO as end-of-day blocks | **Folded into each page as it is built** | End-of-day quality blocks are the first thing sacrificed when a build runs late. Cheap inline, expensive retrofitted. |
| 12 | Silent on post-launch maintenance | **`CONTENT.md` is a launch deliverable** | The committee turns over every year. If updating the site requires a developer, the site is dead within two years. |
| 13 | — | **The previous ISAA website is not a reference.** No content, structure, copy or visual decision is carried over from it, and it is not to be consulted during the build | Confirmed by the client. This is a new site, not a redesign. |

---

## 1. Final sitemap

```
/                    Home
/clubs               Club directory (deep links per club: /clubs#ucd)
/events              Fixtures and results
/getting-started     New to archery
/resources           Handbooks, rules and governance documents
/about               What ISAA is · Committee · Contact (#contact)
/privacy             Privacy (footer link only)
404                  Not found
```

No `/news`, no `/clubs/[slug]`, no `/events/[slug]`, no `/contact`, no search, no accounts.

Phase 2 can add `/news` and `/clubs/[slug]` without changing this IA.

---

## 2. Final navigation

**Header — sticky, 64px, identical structure on desktop and mobile:**

```
[ISAA mark + wordmark]     Clubs   Events   New to Archery   Resources   About
```

- **Five items is the ceiling, so Resources displaces Contact.** Now that four real documents exist, Resources earns a slot more than an anchor link did. Contact is reachable from the footer on every page, from the About page, and from the mobile menu — it loses nothing by leaving the header. The `/about#contact` anchor still exists for direct linking.
- `New to Archery` is the nav label; the URL is `/getting-started`. Label optimised for a scanning student, URL for search.
- **No button in the header.** Links only. Current page gets `aria-current="page"` plus a 2px ISAA-green underline.
- Mobile: hamburger opens a full-screen panel — same five items at 20px, ISAA email and social links at the bottom. Focus is trapped while open, `Esc` closes it, focus returns to the toggle button.
- Because the header is sticky, every anchor target needs `scroll-margin-top: 80px`. This is a WCAG 2.2 requirement (2.4.11 Focus Not Obscured), not a nicety.

**Footer — three columns desktop, stacked mobile:**

1. ISAA mark, the one-liner from §14.2, `© {year} Irish Student Archery Association`
2. Clubs · Events · New to Archery · Resources · About · Privacy
3. `isaasecretary@archery.ie` (prominent — with no form, this is the site’s main standing contact point), Instagram link

If a social handle is not supplied, its icon is not rendered. No dead social icons.

---

## 3. Final homepage structure

Six content sections. The page must answer *What is ISAA / How do I get involved / Where is my club / What is on* within two screens on mobile.

| # | Section | Purpose and content | CTA | Priority | Mobile behaviour |
|---|---|---|---|---|---|
| 1 | **Header** | See §2 | — | P0 | Hamburger |
| 2 | **Hero** — photograph with scrim, ~480px desktop / ~400px mobile | H1 and subhead per §14.2. One supporting sentence. Two buttons. Background: **`_DSC7458` (archer at full draw, targets behind)**, cropped 16:9 favouring the right two-thirds, under a solid ISAA-green scrim at 70–80% with text on the left. Solid scrim, never a gradient. The green must dominate — this is a brand panel that happens to contain a photograph, not a photo with text on it. If the crop cannot be made to work, fall back to the solid green panel with the target-ring motif (§5.3) rather than shipping unreadable text over an image | `Find your club` (primary) → `/clubs` · `New to archery?` (secondary, outlined) → `/getting-started` | P0 | Text left-aligned and stacked; buttons full-width, 48px tall; crop shifts to the archer, `object-position` tuned so the subject is not cut at 375px |
| 3 | **Facts strip** — one row on Paper, hairline rules between items | Exactly three verified facts: **{clubCount} affiliated clubs** · **Clubs across the island of Ireland** · **Indoor & outdoor intervarsities**. No founding year — client has ruled it out, and it is not to be added later either. Three real facts is a complete strip | none | P0 | Stacks; the row must still look deliberate at two or three items — centre them, do not stretch to fill |
| 4 | **Find your club** | Two-sentence intro, then an alphabetical text list of every affiliated institution linking to `/clubs#id`. No logo wall, no search box | `See all clubs` → `/clubs` | P0 | Two-column text list, 44px row height |
| 5 | **What's on** | The next 1–3 events by date: date block, title, venue, type tag. **If `events.json` contains no future events this section does not render at all** — no "check back soon" placeholder | `All fixtures` → `/events` | P0 | Single column |
| 6 | **Getting involved** | Three numbered steps in plain type: 1 Find your college's club · 2 Go to a beginners' session · 3 Shoot at an intervarsity. One short paragraph each `[CONTENT REQUIRED]` | `Start here` → `/getting-started` | P1 | Stacks; the numerals stay as type, not circular badges |
| 7 | **Footer** | See §2 | — | P0 | Stacked |

**Explicitly not on the homepage:** testimonials, a sponsor strip, unsourced statistics, a newsletter box, an Instagram embed, a full-width gradient "Join us" band, and anything that animates on scroll.

---

## 4. Final page specifications

### 4.1 `/clubs` — Club Directory

**The most valuable page on the site.** It is the one thing only ISAA can publish. Budget time accordingly.

- **Purpose:** a student finds their own institution's club and its contact channel without having to read anything else.
- **Structure:** H1 · one-sentence intro · a jump row of institution abbreviations as plain anchor links (no JS) · an alphabetical grid of club cards, 3-up desktop / 2-up tablet / 1-up mobile.
- **Sixteen clubs**, listed in §14.1. That number is itself the page's strongest argument — it is what proves ISAA is national rather than notional — so the grid should read as full and deliberate.
- **Card contents — flat, no expansion:** institution name (large, the primary scannable element), secondary line (club's own name, or the full institution name where the primary label is a short form), city where known, a 1–2 sentence description `[CONTENT REQUIRED per club]`, email link, Instagram link, website link. Each card carries `id={club.id}` for `/clubs#ucd` deep links and a 3px ISAA-green top rule.
- **Club contacts are placeholders for now — build as though they are real.** Every club in `clubs.json` carries `"email": "[insert email here]"` and `"instagram": "[insert Instagram link here]"`. The card is therefore built and laid out in its complete state, and filling in the real values later is a JSON edit with no code change. This is the right call: it means the hard part is finished now and the easy part is finished whenever the captains reply.
- **The placeholders must be visible in the demo and invisible in production.** Both are needed, for different reasons. Visible in the demo, because showing a committee sixteen cards reading "insert email here" is the most effective way to get sixteen captains to send their emails — the gap becomes the ask. Invisible in production, because a public site with "insert email here" printed sixteen times is exactly the unfinished-template failure this whole spec exists to avoid.
- **How:** one environment variable, `NEXT_PUBLIC_SHOW_PLACEHOLDERS`, set on the preview deployment and absent everywhere else. A helper `isPlaceholder(value)` returns true for any string wrapped in square brackets. When placeholders are hidden, the card treats them as absent and omits the row — the same path a genuinely missing field already takes, so it needs no extra layout work. **Default is hidden**, so a forgotten variable fails safe. See §7 item 10.
- **In the demo, placeholders must look like placeholders** — muted text, a dashed 1px border, and the literal bracketed string. Never styled to resemble a real email address. Nobody should be able to screenshot the demo and mistake it for finished.
- **When every placeholder is gone, delete the variable and the helper.** It is scaffolding, not a feature.
- **Logos:** name-led by default. A 32px logo chip inside a 1:1 white box is rendered **only** for clubs whose logo has been normalised per §8. A grid mixing heraldic crests, wordmarks and animated GIFs is the fastest route to looking amateur; a card with a clear name and no logo beats a grid of jumbled artwork.
- **Missing data:** render whatever fields exist. A club with only a name and an Instagram link shows exactly those two things — no "details coming soon", no empty rows.
- **No filter, no search, no sort control.** Fifteen alphabetised items are faster to scan than any control we could build.
- **Closing line:** "Club not listed, or details out of date? Email us." — `isaasecretary@archery.ie`
- **Three ATU campuses** (Galway, Mayo, Sligo) are separate clubs and sort adjacently. Lead each card with the campus — **ATU Sligo** large, "Atlantic Technological University" as the muted secondary line. A student scanning three identical institution headings cannot find themselves; the distinguishing word has to be the big one.
- **Ignore `assets/club-logos/` entirely.** It is historical: six clubs on the real list have no logo there, and two institutions that do (NCAD, Dundalk IT) are not affiliated. §14.1 is the only source.

### 4.2 `/events` — Fixtures and Results

- **Purpose:** find the next competition, how to enter, and by when.
- **Structure:** H1 · one-sentence intro · **Upcoming** list · **Past** list (most recent first, muted).
- **Event row:** date block (day/month or a range), title, type tag (Competition / Social / AGM / Training), venue, 1–2 sentences, entry deadline, and an external `Entry and details` link — a Google Form, Eventbrite page or club page, whatever ISAA already uses. **We build no registration of any kind.**
- **Automatic behaviour:** upcoming versus past is computed from `endDate` against the build date. Nothing is ever hand-moved between lists. Past events older than about two years are excluded.
- **Empty state:** if there are no upcoming events, the Upcoming heading is replaced by one honest line — "The {season} fixture list is confirmed at the start of term; follow us on Instagram for announcements" `[VERIFY this is accurate]` — and the Past list carries the page. A calendar showing only expired 2024 dates is worse than no calendar; the date logic prevents that permanently, including after we stop maintaining it.

### 4.3 `/getting-started` — New to Archery

- **Purpose:** the acquisition page. Convert "I saw a stand at the freshers' fair" into "I emailed the club."
- **Sections:** what a first session actually involves; no experience and no equipment needed `[VERIFY: do clubs supply beginner kit?]`; what it costs `[VERIFY: typical club membership range — do not estimate]`; safety and supervision, including the fact that ISAA has an **Athlete Protection Officer** with a direct contact address `[VERIFY the wording with the committee]`; 4–6 FAQs as plain `<h3>` + paragraph, **not an accordion**; closing CTA into `/clubs`.
- **Tone:** warm, concrete, second person, no marketing language. "You will shoot at ten metres in your first session" beats "Discover your potential."
- **If a fact cannot be verified,** the section says clubs set their own fees and links to the directory. That is honest and still useful. It is never estimated.
- **One photograph,** full-width, between the intro and the FAQs: `9a22939e…` (four archers in club kit at a competition). It shows peers rather than athletes, which is exactly what this page's reader needs to see. Caption optional; alt text descriptive.
- **Links to the Beginner Handbook on `/resources`** from the "your first competition" answer. This is the single most useful cross-link on the site: it takes a curious beginner from "is this for me" to an actual ISAA document.

### 4.4 `/about` — About ISAA

Replaces v1's separate About, Resources and Contact pages.

- **What ISAA is:** the approved copy in §14.2. Add one sentence on the relationship to Archery Ireland if there is a formal one `[VERIFY]`.
- **Committee:** eight roles with role emails, per §14.3. **Names are withheld** at the client's instruction — render role and email only, and spell out PRO and APO. **No headshots.** All eight addresses are role-based, which is the right pattern anyway: they survive the committee turning over, which personal addresses do not.
- **Documents:** no longer here. `/resources` owns them; `/about` carries one line linking to it.
- **One photograph:** `Team Photo` (squad at an intervarsity, target butts and numbered bosses behind). It is a phone photo and technically the weakest of the five, but it is the most *evidential* — it shows a real national event with real numbered targets, which is precisely what this page has to prove. Crop out the "WORK HARD DREAM BIG" wall graphic; it is another organisation's slogan and reads as clutter.
- **Contact (`#contact`):** a large mailto link as the primary action; the address also shown as selectable text with a copy button; social links; and a line setting expectations ("we are student volunteers — allow a few days") `[VERIFY]`. Include guidance that club-specific questions go directly to the club, linking `/clubs`.

### 4.5 `/resources` — Handbooks, Rules and Governance

Reinstated: four real documents now exist in `assets/pdfs/`.

- **Purpose:** the single authoritative home for everything ISAA publishes in writing. It is also what makes the association look like a governing body rather than a social club.
- **Audience:** committee members (governance), competing archers (rules and formats), beginners (the beginner handbook).
- **Structure:** H1 · one-line intro · two grouped lists, each with a `SectionHeading`:
  - **Competing** — Beginner Archer's Intervarsity Competition Handbook 2025 · Indoor and Outdoor Intervarsity Competition Handbook · ISAA Rulebook
  - **Governance** — ISAA Constitution
- **Document row:** title · one line on who it is for and what it covers `[CONTENT REQUIRED, one line each]` · format, size and **version date** · download link. The whole row is the click target, minimum 56px tall.
- **Version dates are mandatory and visible**, taken from inside the documents themselves, not from filenames:

  | Document | `versionLabel` |
  |---|---|
  | Beginner Archer's Intervarsity Competition Handbook | Last updated August 2025 |
  | Indoor and Outdoor Intervarsity Competition Handbook | Last updated September 2025 |
  | ISAA Rulebook | Adopted 12 August 2017 |
  | ISAA Constitution | Adopted 12 August 2017 |

  A reader must see these without opening the file. Committees are the one audience who will check, and quietly serving an eight-year-old governing document as though it were current is precisely how their trust is lost. "Adopted 12 August 2017" is a fact, not a weakness — but only if it is stated. `[VERIFY: have the constitution or rulebook been amended at any AGM since 2017?]`
- `[VERIFY: are the two handbooks still current for the 2026/27 season, or is there an updated set?]` Both name the 25/26 committee inside them.
- See §7 for the remaining document tasks — compression, renaming, and one missing PDF title.
- **Missing documents** (affiliation form, safety policy, child-protection policy if one exists `[VERIFY]`) are simply absent. No "coming soon" rows.
- **Empty groups do not render.** If Governance has no cleared document, the heading does not appear.
- Accessible link names carry the format and size: "ISAA Constitution (PDF, 640KB)".
- **No inline PDF viewer, no cover thumbnails, no icons per file type.** A list of well-labelled links is the correct interface here.

### 4.6 `/privacy`

Three sentences. The site sets no cookies, runs no analytics and no third-party scripts, and collects nothing — there is no form. Name the host, and give `isaasecretary@archery.ie` for data requests. `[VERIFY WITH ISAA before publishing]` — implementation scaffolding, not legal advice.

Being able to say "this site collects nothing about you" and have it be literally true is worth more than a cookie banner and a thousand words. It is a direct consequence of cutting the form and the analytics, and it is the shortest privacy page ISAA will ever have.

### 4.7 404

One sentence plus links to Home, Clubs and Events, styled to match. Fifteen minutes.

---

## 5. Final design system

The target is *an established Irish student sporting organisation that happens to have a very good modern website.* The three levers that get us there are **restraint in colour, one confident typeface, and borders instead of shadows.** Everything below serves that.

### 5.1 Colour

Taken from the ISAA logo, not invented.

| Token | Value | Use |
|---|---|---|
| `--isaa-green` | `#015a06` | Primary. Hero panel, headings on Paper, primary buttons, rules, links |
| `--isaa-green-dark` | `#013D04` | Hover/active on green |
| `--isaa-green-tint` | `#EDF2ED` | Rare block backgrounds (facts strip, past-events rows) |
| `--isaa-orange` | `#FF7E00` | Accent only — see restrictions below |
| `--ink` | `#14181A` | Body text |
| `--ink-muted` | `#5A6166` | Secondary text, meta, dates |
| `--paper` | `#FBFAF7` | Page background (warm, never pure white) |
| `--surface` | `#FFFFFF` | Cards |
| `--line` | `#E3E0D8` | 1px borders and rules — this replaces shadows everywhere |

**Measured contrast (do not re-litigate these at 3am):**

- Ink on Paper — **17.1:1** ✅
- Green `#015a06` on Paper — **8.2:1** ✅ body text and headings
- White on Green — **8.5:1** ✅
- Green on Green-tint — **7.5:1** ✅
- Ink-muted on Paper — **6.0:1** ✅ safe for 13px meta text
- Orange on Paper — **2.4:1** ❌ **never use orange for text on light backgrounds**
- Ink on Orange — **7.0:1** ✅ orange is usable as a *background* for a tag with near-black text
- Orange on Green — **3.3:1** ⚠️ large text and graphical elements only, never body copy

**Orange budget: under 5% of any screen.** Permitted uses: the tag on a competition event, a 3–4px rule, an active-state marker, the logo itself. Forbidden: orange body text, orange headings, orange buttons, large orange fills. Green and orange in adjacent equal-weight blocks reads as a flag or a takeaway menu — never place them side by side at equal area.

### 5.2 Typography

**One family: Archivo** (Google Fonts, loaded via `next/font/google`, weights 400/500/700, `display: swap`, latin subset only).

| Role | Size | Weight | Notes |
|---|---|---|---|
| H1 | `clamp(30px, 4.5vw, 46px)` | 700 | Tight leading (1.1), `-0.02em` tracking. **Never larger than 48px** — giant type is the loudest AI-landing-page signal |
| H2 | 26–30px | 700 | |
| H3 | 19–20px | 600 | |
| Body | 17px (16px mobile) | 400 | Line height 1.6, max measure **68ch** |
| Meta / labels | 13px | 500 | `0.06em` tracking, uppercase for tags and date blocks only |

Body links are underlined with a 2px green underline; they never rely on colour alone.

### 5.3 Components and surfaces

- **Buttons:** rectangular, **4px radius**, 44px min height, 20px horizontal padding, 500 weight, no icons unless the link leaves the site (then a 12px external-link glyph). Primary = green fill, white text. Secondary = 1.5px green border on transparent. On the green hero: primary = white fill with green text, secondary = white border on transparent. Hover darkens 10%; focus is a 2px orange outline with a 2px offset (the one place orange earns its keep).
- **Cards:** white surface, 1px `--line` border, **no shadow, ever**, 4px radius, 20–24px padding, 3px green top rule on club cards. No hover lift, no scale transform, no glow.
- **Rules and dividers:** 1px `--line`. Section starts may use a 3px green rule of 48px width above the H2 — used consistently, that becomes the site's signature and costs nothing.
- **Spacing:** 8px base scale (8/12/16/24/32/48/64/96). Section padding 80px desktop, 48px mobile. Container max-width **1120px**, 24px gutters, 20px on mobile.
- **Grid:** CSS Grid, `repeat(auto-fill, minmax(300px, 1fr))` for club and event cards.
- **Motion:** 120ms colour and border transitions on hover and focus. **That is the complete motion inventory.** No scroll reveals, no parallax, no counters, no carousels, no animation library. Wrap anything else in `prefers-reduced-motion`.
- **Icons:** hand-written inline SVGs for the six we need — hamburger, close, external link, email, Instagram, Facebook. **No icon package.** 24×24, `currentColor`, 1.5px stroke.
- **Imagery:** see §5.4. Three photographs on the whole site, used large. No stock photography ever.

### 5.4 Photography — the actual inventory and where each one goes

Five photographs have been supplied. They are all indoor sports-hall images from intervarsity events, and **only one is a genuine action shot**. That ratio dictates the rule: **use three, use them large, and never build a photo grid.** Three strong images placed deliberately read as a real organisation documenting itself; five mixed-quality images scattered as decoration read as padding.

| File | What it is | Verdict |
|---|---|---|
| `_DSC7458 (1).jpg` | Archer at full draw, recurve, targets behind, shallow depth of field. 7952×5304 | **Hero.** The only real sport photograph we have. Crop 16:9 to the right two-thirds. Note the small costume hat — at hero crop and scrim opacity it does not read, but check |
| `Team Photo.jpg` | Squad at an intervarsity, numbered target butts behind. Phone photo, 2048×1536 | **`/about`.** Technically weakest, evidentially strongest. Crop out the "WORK HARD DREAM BIG" wall graphic |
| `9a22939e…jpg` | Four archers in club kit at a competition, shooting line behind. Phone photo | **`/getting-started`.** Shows peers, not athletes — the right register for a nervous beginner |
| `_DSC7592.jpg` | ~20 people in fancy dress at a social shoot. 3.5MB, high resolution | **Hold.** Technically good and genuinely charming, but costumes undercut the governing-body register. Correct home is a future news post about that event, not a permanent page |
| `DSC_2740.jpg` | Archer from behind, portrait orientation, strong warm colour cast, **visible "OV 2023" photographer watermark** | **Do not use at launch.** Portrait crop fights every slot we have, the yellow cast clashes with the palette, and the watermark means a third party's permission and credit are needed `[VERIFY: photographer, permission, required credit]` |

**All five are placeholders.** The client will supply real photographs for the next draft. That does not reduce the care needed now — it raises it. The *slots* are what we are designing: aspect ratios, crop behaviour, scrim opacity, and the size budget. Get those right against these images and the real ones drop in without touching a line of layout. Choose them as if they were permanent.

**Rules that apply to all of them:**

- Consent and age are confirmed by the client: nobody pictured is under 18, and these are approved for use. Re-confirm for the replacement set `[VERIFY at next draft]`.
- Alt text describes what is happening — "An archer at full draw during an ISAA indoor intervarsity" — never the filename and never "image of archery".
- Photographs are never tinted, duotoned, or overlaid with gradients. The hero's solid green scrim is the only treatment permitted on the entire site.
- No photograph is cropped into a circle, a rounded card, or a tilted frame.
- Where a photograph has a known photographer, credit them in small muted type beneath it. It costs one line and it is how you keep being sent photographs.

### 5.5 What would make this look AI-generated — banned outright

Gradient backgrounds · glassmorphism · floating/tilted cards · drop shadows on anything · pill-shaped buttons · emoji as icons · 72px hero type · scroll-triggered fade-ins · unsourced statistics · "Empowering the next generation of…" copy · three-column feature grids with circular icon badges · a header CTA button · a chatbot bubble · a dark hero with a purple-to-blue gradient.

---

## 6. Final component list

Thirteen components. If a fourteenth appears, question it.

| Component | Used by | Notes |
|---|---|---|
| `SiteHeader` | layout | Sticky, nav, mobile panel, focus trap |
| `SiteFooter` | layout | Three columns, conditional socials |
| `Hero` | home | Green panel, target-ring SVG, two buttons |
| `Button` | everywhere | `variant: primary \| secondary`, `onDark` boolean |
| `SectionHeading` | all pages | H2 + green rule + optional intro |
| `FactsStrip` | home | Renders only supplied facts; handles 2–4 gracefully |
| `ClubCard` | clubs, home list | Flat, anchor id, optional logo chip |
| `EventItem` | events, home | Date block, tag, external entry link |
| `DocumentRow` | resources | Title, description, version date, format + size, download |
| `ContactBlock` | about, mobile nav | Mailto, copy button, socials |
| `Figure` | about, getting-started | `next/image` with explicit dimensions, optional caption and photographer credit |
| `TargetRings` | 404, OG image, hero fallback | Inline SVG, decorative, `aria-hidden` |
| `Tag` | events | Competition / Social / AGM / Training |

---

## 7. Final technical architecture

**Stack: Next.js (App Router) + TypeScript + Tailwind CSS, statically generated, deployed on Vercel.**

Confirming v1's choice, for v1's reasons — file-based routing maps 1:1 to the sitemap, component reuse across five pages pays for itself, and it is the stack an AI coding agent scaffolds most reliably. The change is in what we refuse to add.

**Dependency allowlist. Nothing outside this list ships:**

```
next  react  react-dom  typescript  tailwindcss  (+ its required peers)
```

That is the whole list. **No** `next-sitemap` (use `app/sitemap.ts`), **no** `lucide-react` or any icon package (six inline SVGs), **no** `framer-motion`, **no** headless UI library, **no** form library, **no** date library (`Intl.DateTimeFormat` and ISO string comparison cover every need), **no** analytics SDK beyond Vercel's one-line component, **no** CMS, **no** database, **no** ORM, **no** auth, **no** API routes.

**Critical setup details, in order:**

1. **Move assets into `public/`.** Next serves static files only from `public/`. Do this first: `public/club-logos/`, `public/logo/`, `public/pdfs/`, `public/photos/`. Update `README.md` to match — the current instructions point to a directory the framework cannot serve.
2. **Set `metadataBase`** in `app/layout.tsx` to the production URL. Without it, Open Graph image URLs resolve relatively and break when shared.
3. **The logo: `ISAA_logo_vectorised.svg` is canonical (client-confirmed), but do not ship it as-is.** It is **221KB** of auto-traced paths from a raster original — larger than every other asset on the page combined, and heavier than a photograph. Do this, in order: run it through SVGO (traced files usually shrink a great deal); if the result is under ~20KB, inline it in the header and use it everywhere. If it is still large, export a PNG at twice its display height (≈80px) for the header and keep the SVG as the source for the favicon and OG image. Either way the visual result is identical — this is purely about not shipping a quarter-megabyte of path data on every page load. `[CONTENT REQUIRED, post-launch: a properly redrawn vector, which would be a few KB]`
4. **Club logos are deferred — confirmed by the client.** Do not use anything currently in `assets/club-logos/`. The directory ships **name-led** (§4.1). Keep the optional `logo` field in the `Club` type so logos drop in later without a refactor, and leave it unset for every club at launch. When they do arrive the normalisation standard is: max 240px wide, WebP, inside a 1:1 white box, named `{id}.webp`, total payload under 200KB. Note for whoever does it later that several current files are unusable as-is — one is a 748KB JPEG, several are animated GIFs, and the Trinity logo is white-on-black and will disappear on our Paper background.
5. **Process the photographs before committing them.** The five supplied files total **7.8MB**; two are 42-megapixel. Shipping any of them unprocessed would destroy LCP on a phone at a freshers' fair, which is the exact device and moment this site exists for. Resize, convert to WebP (AVIF optional), strip EXIF (it carries camera serials and sometimes GPS), and rename semantically — `hero-full-draw.webp`, `about-squad.webp`, `beginners-club-kit.webp`. **Budget: hero ≤180KB at 1600px wide; the other two ≤120KB each; 420KB of photography on the entire site.** Serve responsive sizes via `next/image` with explicit `width`/`height` to hold CLS at zero, and `priority` on the hero only.
6. **Documents — conversion done, three tasks remain.** All four are now PDFs. Metadata inspection confirms the two handbooks were exported through Google Docs, so there is no Word authoring residue to worry about. What is still outstanding:

   - **Compress.** The beginner handbook is **2.98MB** and the indoor/outdoor handbook **2.03MB** — the export grew the first one rather than shrinking it. Downsample embedded images to 150dpi; both should land near 500KB. A 3MB download on 4G is a real cost to the exact reader we most want to reach.
   - **Rename to ASCII slugs:** `beginner-intervarsity-handbook-2025.pdf`, `intervarsity-handbook-indoor-outdoor-2025.pdf`, `isaa-constitution-2017.pdf`, `isaa-rulebook-2017.pdf`. The beginner handbook's current filename contains a curly apostrophe (`'`) and spaces, which produces an encoded, fragile URL.
   - **Set the PDF document title** on the beginner handbook — its `/Title` is currently a single space, so browser tabs and screen readers fall back to the filename. The other three are fine.

   Record real byte sizes in `documents.json` after compression. Do not estimate them.
7. **Tailwind version:** use whatever `create-next-app --ts --tailwind` installs and define the tokens the way that version expects. Do not spend a minute migrating between Tailwind 3 and 4 configuration styles.
8. **Content lives in typed JSON** in `/data`, imported at build time: `clubs.json`, `events.json`, `documents.json`, `facts.json`, `site.json` (email, socials, tagline). Interfaces in `/types`. No fetching, no runtime data layer.
9. **Everything is statically generated.** No `dynamic`, no `revalidate`, no server actions, no route handlers.
10. **Placeholder guard — applies to every unsupplied field on the site, not only club contacts.** Anything we do not have yet is written into the JSON as a bracketed sentinel — `"[insert email here]"`, `"[insert Instagram link here]"`, `"[insert one-line description]"`, `"[insert typical club membership cost]"` — so components render their complete state and the demo shows the committee precisely what is missing. One helper governs all of it:

    ```ts
    // Any bracketed string is unsupplied content, not data.
    const isPlaceholder = (v?: string) => !!v && /^\[.*\]$/.test(v);
    const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";
    ```

    Every component that renders a content field asks this first. When `showPlaceholders` is false — **the default, and the setting on the real domain** — a placeholder is treated as absent and its row is omitted, which is a code path the components already have. Set the variable only on the preview deployment used for demos.

    Add a launch-gate check that greps the built output for `[insert` and fails if it finds anything. It takes one line and it removes the possibility of the single most embarrassing outcome available to this project.

    The generalisation matters: it means the remaining `[VERIFY]` items — beginner costs, document descriptions, safeguarding wording — need no further decisions before the demo. Each becomes a visible placeholder, the committee sees the question in context on the page where the answer belongs, and answering it is a JSON edit. That is a better way to collect content than a list of questions in an email, because the person answering can see what their answer is for.

**Repo structure:**

```
app/
  layout.tsx  page.tsx  not-found.tsx  sitemap.ts  robots.ts  opengraph-image.png
  clubs/page.tsx   events/page.tsx   getting-started/page.tsx
  resources/page.tsx   about/page.tsx   privacy/page.tsx
components/   (the thirteen above)
data/         clubs.json  events.json  documents.json  facts.json  site.json
types/        index.ts
public/       club-logos/  logo/  pdfs/  photos/  favicon.ico
CONTENT.md    SPEC.md    SPEC-v1-draft.md    README.md
```

**Data contracts** (fields not listed must not be added without a real requirement):

```ts
interface Club {
  id: string;            // "ucd" — also the /clubs#anchor
  institution: string;   // CURRENT official name — see the mapping table in §8
  formerName?: string;   // "formerly NUI Galway" — only where ISAA asks for it
  clubName?: string;
  city: string;
  description?: string;
  email?: string;
  instagram?: string;    // full URL
  website?: string;
  logo?: string;         // DEFERRED — leave unset for every club at launch
}

interface ISAAEvent {
  id: string;
  title: string;
  type: "competition" | "social" | "agm" | "training";
  startDate: string;     // ISO "2026-11-14"
  endDate?: string;
  venue: string;
  description?: string;
  entryDeadline?: string;
  entryUrl?: string;     // external
  resultsUrl?: string;
}

interface SiteDocument {
  title: string;
  description?: string;             // who it is for, what it covers
  group: "competing" | "governance";
  file: string;                     // "/pdfs/isaa-constitution-2017.pdf"
  sizeLabel: string;                // "PDF · 640KB" — real size after conversion
  versionLabel: string;             // "Adopted 12 August 2017" — always shown
}
```

Every optional field must be handled as genuinely absent in the UI, not rendered as an empty row.

---

## 8. Final content requirements

Most of this section is now supplied. The verbatim content lives in §14; this section records what is settled, what is still missing, and the one contradiction that needs a ruling.

### Supplied and settled

| Item | Value |
|---|---|
| Affiliation list | **16 institutions** — §14.1 |
| About copy | Supplied — §14.2 (see the editorial note there) |
| General email | `isaasecretary@archery.ie` |
| Instagram | `https://www.instagram.com/irish_student_archery/` |
| Committee | 8 roles with role emails — §14.3. **Names withheld at client's instruction**; render roles and emails only |
| Canonical logo | `ISAA_logo_vectorised.svg` — see §7 item 3 for how to ship it |
| Photographs | Placeholders, approved for use; nobody pictured is under 18. Slots stay fixed so the real photos drop straight in |
| Documents | All four current and approved as-is |
| Analytics | **None.** No cookies, no third-party scripts, no consent banner |
| Contact | **No form, confirmed.** Email + Instagram only |
| Club logos | Deferred |

### Settled by ruling

- **Trinity:** `institution: "Trinity College Dublin"`, `clubName: "Dublin University Archery Club"`. Confirmed.
- **Domain:** `isaa.archery.ie`. Confirmed — a subdomain of Archery Ireland's zone.
- **ISAA is all-island.** Confirmed. Copy says "across the island of Ireland" throughout; never "in Ireland", which would read as excluding Ulster and Queen's.

### Still missing — ranked

| # | Item | Consequence |
|---|---|---|
| 1 | **Per-club contact details** — email and Instagram for each of the 16 | Build against placeholders per §4.1 so the layout is complete and demoable. **The placeholders must never reach the public domain** — the guard is specified in §7 item 10 |
| 2 | Confirmed upcoming events | `/events` ships with an empty Upcoming list and the homepage section does not render |
| 3 | One-line description for each of the four documents | `/resources` rows show title, version and size only |
| 4 | Beginner cost and equipment answers `[VERIFY]` | `/getting-started` links to the directory instead of answering |
| 7 | Per-club one-line descriptions | Cards are name-led; fine without |

### Institution naming notes

The logo folder is historical and is **not** the affiliation list — six clubs on the real list (RCSI, Queen's, National College of Ireland, ATU Mayo, ATU Sligo, SETU) have no logo in it, and two that do (NCAD, Dundalk IT) are not on it. Build only from §14.1.

Two small corrections applied to the supplied list, flag if wrong:

- **Queen's University Belfast** takes an apostrophe.
- **RCSI** is how it is universally referred to; its full current name is RCSI University of Medicine and Health Sciences. The spec uses `institution: "RCSI"` with the full name as the secondary line, because "Royal College of Surgeons Ireland" is neither the short form students use nor the current full form. `[VERIFY]`

**ISAA is all-island.** Ulster University and Queen's University Belfast are both on the list, which settles the question I raised earlier. That is a genuine credential and the About copy should say it plainly — "third-level institutions across the island of Ireland" rather than "in Ireland". `[VERIFY the phrasing you prefer]`

**Three ATU campuses** (Galway, Mayo, Sligo) are separate clubs. Alphabetically they occupy the first three positions in the directory, which is fine, but the campus must be the visually prominent part of the label — a student from Sligo scanning three near-identical "Atlantic Technological University" headings needs the distinguishing word to be findable. Render as **ATU Sligo** with "Atlantic Technological University" as the secondary line, not the reverse.

### Needed but the page degrades gracefully without them

Past-event results for credibility · photographer credit once real photographs arrive `[VERIFY]` · per-club city (optional in the type; Ulster and SETU are multi-campus so it is genuinely ambiguous for them, and seven of sixteen are Dublin, so it earns less than it first appears).

### Genuinely post-launch

Club logos (deferred by the client) · a clean vector ISAA logo · outdoor and field-archery photography · news · newsletter · an affiliation form.

**Never invent:** club counts, founding years, membership numbers, fees, committee names, event dates, quotes, or "over X students" claims. A site with four verified facts outranks a site with twelve invented ones the moment one reader knows better.

---

## 9. Final SEO requirements

- **Titles:** Home — `Irish Student Archery Association | University Archery Clubs in Ireland`. Others — `Clubs | ISAA`, `Fixtures & Results | ISAA`, `New to Archery | ISAA`, `About | ISAA`. Under 60 characters.
- **Meta descriptions:** unique, 140–160 characters, written for the actual query. Clubs page: *"Find your university's archery club in Ireland — contact details for every ISAA-affiliated college club."*
- **The queries that matter** are `university archery ireland`, `student archery ireland`, `{university} archery club`, `intervarsity archery`. The club directory is our strongest ranking asset because each card contains an institution name plus the word archery — write those cards as real sentences, not label-value pairs.
- **Canonical URL** on every page, absolute, via `metadataBase` + `alternates.canonical`.
- `<html lang="en-IE">`.
- **Open Graph and Twitter cards:** one branded 1200×630 image at `app/opengraph-image.png` — green field, ISAA logo, wordmark, no photograph needed. This is a launch deliverable, not a nicety: it is what appears in every WhatsApp and Instagram DM the link is shared in, which is how this site will actually spread.
- **`app/sitemap.ts`** listing all seven public routes. **`app/robots.ts`** allowing all and pointing to the sitemap.
- **Structured data:** `SportsOrganization` JSON-LD on the homepage (name, url, logo, `sameAs` socials, `areaServed: IE`). Add `Event` JSON-LD **only for real confirmed events** — never for placeholders.
- **Off-page, and worth more than all of the above:** ask each club to link the site from its Instagram bio and its students' union society page. Fifteen relevant .ie links in week one will do more than any on-page work. Put this in the handover note.
- Verify the property in Google Search Console on launch day and submit the sitemap.

---

## 10. Final accessibility requirements — WCAG 2.2 AA

Non-negotiable, and all cheap when built in from the start:

1. Contrast pairs as measured in §5.1. Orange never carries text on light backgrounds.
2. Visible focus on everything interactive: `:focus-visible` with a 2px orange outline and 2px offset. `outline: none` without a replacement is a build failure.
3. Full keyboard operability including the mobile menu — focus trapped while open, `Esc` closes, focus returns to the toggle.
4. **`scroll-margin-top: 80px` on all anchor targets** so the sticky header never obscures a focused element (2.4.11 Focus Not Obscured — new in 2.2 and the one most sites miss).
5. Skip-to-content link, first in tab order, visible on focus.
6. Semantic structure: one `<h1>` per page, no skipped heading levels, `<header>/<nav>/<main>/<footer>` landmarks, club and event lists as real `<ul>`.
7. Alt text: club logos get the institution name, not a filename. Decorative target rings get `aria-hidden="true"` and empty alt.
8. Icon-only controls (hamburger, close, copy, social links) get `aria-label`s.
9. Links that open externally or download say so in their accessible name — "Entry and details (opens on Eventbrite)", "Constitution (PDF, 240KB)".
10. Target size ≥24×24px as the WCAG 2.2 floor; we use 44×44 as our own standard.
11. Colour is never the only signal — underlines on body links, text on tags.
12. Layout holds at 200% zoom and at 320px width with no horizontal scroll.
13. `prefers-reduced-motion` respected (trivially, since our motion inventory is hover transitions).
14. Test method: keyboard-only pass on every page, plus axe DevTools on every page, before the final deploy. Not a single end-of-day block — run it as each page is finished.

---

## 11. Final MVP / non-MVP list

### In

| Feature | Priority | Reason |
|---|---|---|
| Homepage, six sections | P0 | Answers all four core questions |
| Club directory, flat cards, deep-linkable | P0 | The site's core value; nobody else publishes this |
| Events page with automatic upcoming/past split | P0 | Core journey; the date logic keeps it from rotting |
| Getting Started page | P0 | The acquisition page |
| Resources page (4 real documents, grouped, versioned) | P0 | Journey D; what makes ISAA read as a governing body rather than a social club |
| About page (org + committee + contact) | P0 | Credibility for committees, press and partners |
| Document filenames renamed to ASCII slugs | P1 | The beginner handbook's curly apostrophe makes a fragile encoded URL. A file operation, not a content change |
| Photo processing: 7.8MB → under 420KB across three images | P0 | Otherwise mobile LCP fails on the device that matters |
| Responsive layout, 320–1440px | P0 | Most traffic will be a phone at a freshers' fair |
| Titles, meta, canonical, OG image, sitemap, robots | P0 | Free, high leverage, painful to retrofit |
| Accessibility per §10 | P0 | Credibility and baseline obligation; cheap inline |
| `CONTENT.md` handover note | P1 | Determines whether the site is alive in two years |
| Privacy page | P1 | Honest, short, expected |
| ISAA logo optimised (SVGO, or PNG at header size) | P1 | 221KB of traced paths on every page load |
| 404 | P2 | Fifteen minutes |

### Out

| Feature | Verdict | Reason |
|---|---|---|
| Contact form | **Cut — client-confirmed** | Email and Instagram only. The address is a `mailto:` link and copyable text |
| Analytics of any kind | **Cut — client-confirmed** | No cookies, no third-party scripts, no consent banner, nothing to disclose |
| Contact as a header nav item | **Cut** | Displaced by Resources; footer, About and the mobile menu all carry it |
| Club logos anywhere on the site | **Deferred by client** | Directory ships name-led; the `logo` field stays in the type so they drop in later |
| Two of the five photographs | **Held back** | The fancy-dress group shot and the watermarked portrait — see §5.4 |
| Per-club and per-event URLs | Phase 2 | Anchors serve the same sharing need at this scale |
| News / blog | Phase 2 | Needs an authoring habit we cannot create in a day; a stale news page is worse than none |
| Inline PDF viewer / document thumbnails | Not needed | Well-labelled links are the correct interface for four documents |
| Search, filters, sorting | Not needed | Fifteen alphabetised items |
| Accordions, modals, tabs, carousels | Not needed | Flat content is faster to build, faster to read, and more accessible |
| Accounts, CMS, database, API routes | Not needed | No requirement exists |
| Newsletter, Instagram embed, live chat | Not needed | Third-party cost and consent overhead for no journey |
| In-house event registration | Not needed | External links suffice permanently |
| Animation library, icon package, date library | Not needed | See the dependency allowlist |
| Committee photographs | Not needed | Consent overhead, and no persona asks for them |
| Sponsors section | Not needed | There are no sponsors to display |

---

## 12. Final deployment strategy

**What we are building in this pass is a DEMO, not a launch.** Client-confirmed. That distinction is load-bearing and it changes the order of work, so it is written into the plan rather than left as an understanding:

- The deliverable is a **preview URL on `vercel.app`**, shown to the committee, with placeholders visible so the gaps become the ask.
- **The custom domain comes off the critical path entirely for this pass.** `isaa.archery.ie` needs a CNAME from whoever runs Archery Ireland's DNS zone — a different organisation with its own response time. Raise the request now so it is in flight, but nothing in this build waits on it. `metadataBase`, canonicals and the sitemap still point at `https://isaa.archery.ie` from the first commit, so no rewrite is needed when it lands.
- Google Search Console, sitemap submission and the privacy page all move to the launch pass. Nothing indexes a demo.
- **Accessibility does not move.** It is the one thing that is cheap while you build and expensive to retrofit, and a demo that cannot be keyboard-driven is a demo that hides a defect rather than revealing one. Build it in as specified in §10.

**Steps:**

1. **Hour 1: deploy an empty site to Vercel.** Import the GitHub repo, accept defaults, confirm it builds. Never discover a deployment problem at hour 22.
2. Push to `main` on every completed page. Each push is a deploy; each branch gets its own preview URL.
3. Set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` on the demo deployment. Leave it unset everywhere else, forever.
4. Before showing it: run Lighthouse mobile on `/` and `/clubs`, keyboard-pass every page, and open the URL on a real phone on mobile data.
5. Repo and Vercel ownership transfer to the ISAA accounts after this pass, per the client. `CONTENT.md` ships with the demo regardless — it is what the committee will need in order to fill the placeholders themselves.

### Demo gate — before showing it to anyone

- Every page renders and every internal link resolves
- Placeholders visible, and visibly *styled* as placeholders — dashed, muted, bracketed. Nobody should mistake the demo for finished, and nobody should mistake a gap for a bug
- Keyboard-operable throughout, including the mobile menu
- No horizontal scroll at 375px
- The hero photograph is within its size budget — a demo that loads slowly gets remembered as a slow site
- The OG image renders when the URL is pasted into WhatsApp. The demo link will be shared exactly that way

### Launch gate — later, and none of it applies to the demo

- The built output contains **no `[insert` and no `[CONTENT REQUIRED]`** — grep it, do not eyeball it
- `NEXT_PUBLIC_SHOW_PLACEHOLDERS` unset on the production domain
- All 16 clubs have real contact details
- Every outstanding `[VERIFY]` in this document is closed or its block is removed
- Privacy page published
- `isaa.archery.ie` resolving, Search Console verified, sitemap submitted
- Every external link and every document download clicked once, by hand

## 13. Final 24-hour build plan

Written for roughly fourteen productive hours. What remains is deliberate slack, because content will arrive late and something will break.

**Hour 0 — before any code (30 minutes, and the highest-leverage half hour of the project).**
Everything needed to build is now supplied, so nothing here blocks you — but two requests have external latency and should go out before you open an editor:

1. **The sixteen club captains:** a contact email and an Instagram handle. Two fields. The build no longer waits on these (placeholders cover it), but the site cannot go to the real domain until they land.
2. **Archery Ireland's DNS contact:** a CNAME for `isaa.archery.ie`. Different organisation, own response time, and easy to forget until the day you want to launch.

Two small questions for the committee alongside, neither blocking: a one-line description for each document, and whether a safeguarding policy exists for `/resources`.

| Hours | Block | Deliverable |
|---|---|---|
| 0.75 | Setup and deploy | `create-next-app`, empty site live on Vercel, `metadataBase` set |
| 0.75–1.5 | **Asset preparation** | The mechanical work, done once, before anything needs it: three photos resized, converted, EXIF-stripped, renamed, under budget; the logo run through SVGO (PNG fallback if it stays large); four documents renamed to ASCII slugs; favicon generated; everything moved into `public/`. Record real file sizes as you go — `documents.json` needs them. Document *compression* is optional: they are downloads, not page assets, so their weight never touches Lighthouse — skip it if time is tight |
| 1.5–2.5 | Design system | Tokens, Archivo, `Button`, `SectionHeading`, `Tag`, `Figure`, container and spacing scale. Proven on one throwaway screen before anything else is built |
| 2.5–4 | Header, footer, layout shell | Including the mobile panel with focus trap and the skip link. Built once, used by every page |
| 4–6 | **`/clubs`** | Types, `clubs.json` with whatever real data has arrived, `ClubCard`, grid, jump row, anchors. Built before the homepage — it is the hardest page and the most valuable, and it proves the design system under real content |
| 6–7 | `/events` | `EventItem`, date logic, upcoming/past split, empty state |
| 7–8.5 | **Homepage** | All six sections, reusing components that already exist and are proven. Hero crop and scrim tuning is the only new work |
| 8.5–9.5 | `/getting-started` | Full copy, FAQs, photo, cross-link to the beginner handbook |
| 9.5–10.25 | `/resources` | `DocumentRow`, `documents.json`, two groups, version dates visible |
| 10.25–11.25 | `/about` | Org copy, committee list, squad photo, contact block with copy button |
| 11.25–11.75 | `/privacy`, 404, `CONTENT.md` | |
| 11.75–12.75 | SEO and OG | Per-page metadata, canonicals, `sitemap.ts`, `robots.ts`, the 1200×630 OG image, JSON-LD, favicon |
| 12.75–13.75 | QA | Keyboard pass, axe on every page, 320/375/768/1440 widths, Lighthouse, every link and every document download clicked |
| 13.75–14.25 | Content swap and launch | Final real content in, launch gate checked, production deploy, real-phone test |
| +remaining | Slack | Absorb late content, fix what QA found, custom domain if DNS is available |

Reinstating Resources and adding asset preparation costs about 1.75 hours, so the plan now runs to roughly 14.25 productive hours and the slack is thinner than it was. That is an acceptable trade — the documents are real and they are what make ISAA look like a governing body — but it means the cut list below is now load-bearing, not theoretical.

Accessibility and SEO are written into each block rather than queued at the end, because a plan that leaves them until hour 20 is a plan to ship without them.

---

## 14. Supplied content

Verbatim, as provided. Nothing in this section is invented. Anything marked `[VERIFY]` is a proposal awaiting a ruling.

### 14.1 Affiliated clubs — 16

Seed `clubs.json` from this and nothing else. Sorted as they will display (alphabetical by the label a student scans for).

| `id` | `institution` (primary label) | Secondary line |
|---|---|---|
| `atu-galway` | ATU Galway | Atlantic Technological University |
| `atu-mayo` | ATU Mayo | Atlantic Technological University |
| `atu-sligo` | ATU Sligo | Atlantic Technological University |
| `dcu` | Dublin City University | — |
| `mu` | Maynooth University | — |
| `nci` | National College of Ireland | — |
| `qub` | Queen's University Belfast | — |
| `rcsi` | RCSI | RCSI University of Medicine and Health Sciences `[VERIFY]` |
| `setu` | South East Technological University | — |
| `tcd` | Trinity College Dublin | Dublin University Archery Club |
| `tud` | TU Dublin | Technological University Dublin |
| `ucc` | University College Cork | — |
| `ucd` | University College Dublin | — |
| `galway` | University of Galway | — |
| `ul` | University of Limerick | — |
| `ulster` | Ulster University | — |

Every entry takes the same two placeholder contacts until the captains reply:

```jsonc
{
  "id": "ucd",
  "institution": "University College Dublin",
  "email": "[insert email here]",
  "instagram": "[insert Instagram link here]"
}
```

See §4.1 for how these render and §7 item 10 for the guard that keeps them off the public domain.

### 14.2 About copy — APPROVED

Client-approved. This is the copy that ships; it is no longer a proposal. The supplied original is preserved at the end of this section so nothing is lost.

**`/about` opening:**

> The Irish Student Archery Association is the association for archery in third-level education across the island of Ireland. We have {clubCount} affiliated college and university clubs.
>
> We run the indoor and outdoor intervarsity competitions, publish the rules and handbooks that govern them, and connect student clubs to one another. Our clubs take complete beginners every year — most students who shoot with us had never picked up a bow before they joined.

**Homepage hero:**

> # Archery for students, across the island of Ireland
> Sixteen affiliated college and university clubs, open to every skill level.

**Footer one-liner** (the `<p>` beneath the mark in §2, derived from the above — no new facts):

> Archery for third-level students across the island of Ireland.

**One change from the version that was approved, made for a maintenance reason.** The first paragraph originally read "Sixteen college and university clubs are affiliated to us." It now reads "We have {clubCount} affiliated college and university clubs", so the number interpolates from `clubs.json.length` instead of being typed as a word. The count appears in three places — this paragraph, the hero subhead and the facts strip — and the day a seventeenth club affiliates, a hardcoded "sixteen" left behind in prose makes the entire site look unmaintained. Interpolate everywhere it is grammatically possible; the hero subhead keeps the word "Sixteen" because a sentence fragment reads badly starting with a numeral, so that one goes on the `CONTENT.md` checklist instead. Say the word if you would rather have the original sentence back.

**One sentence still wants a nod from the committee:** *"most students who shoot with us had never picked up a bow before they joined."* It follows from "students of all skill levels" in the original, but it asserts something more specific than the original did. Get a yes or cut it — the paragraph stands perfectly well without it. `[VERIFY]`

**Preserved for reference — the copy as originally supplied:**

> The Irish Student Archery Association (ISAA) is a vibrant community dedicated to fostering the sport of archery among 3rd level students across Ireland. Established with a passion for precision and camaraderie, the ISAA provides a platform for students of all skill levels to engage in this ancient and revered discipline. From beginners seeking to hone their aim to seasoned competitors aiming for excellence, the ISAA offers training, competitions, and a supportive network between 3rd level educational institutions where members can flourish both on and off the range.

### 14.3 Committee

Eight roles. **Names are withheld at the client's instruction** — render the role and the email, nothing else. The layout must not look broken with the name absent, which is the main reason to withhold all eight rather than show four.

| Role | Email |
|---|---|
| Chairperson | `isaachairperson@archery.ie` |
| Vice-Chairperson | `isaavicechairperson@archery.ie` |
| Treasurer | `isaatreasurer@archery.ie` |
| Secretary | `isaasecretary@archery.ie` |
| PRO (Public Relations Officer) | `isaapro@archery.ie` |
| Athlete Protection Officer | `isaaapo@archery.ie` |
| Records Officer | `isaarecords@archery.ie` |
| Webmaster | `isaawebmaster@archery.ie` |

Spell out the acronyms on the page. A club captain knows what a PRO is; a prospective member, a journalist or a potential partner does not, and an unexplained acronym on a public page is a small unforced error.

**The Athlete Protection Officer is worth more than a row in a table.** A named safeguarding role with its own contact address is a genuine mark of a properly run sporting body — it is the kind of thing a cautious beginner, a parent, or a potential partner looks for and rarely finds on a student organisation's website. Three consequences:

1. Render it as **"Athlete Protection Officer"** in full, never "APO".
2. **`/getting-started` should reference it in the safety section** — one sentence, something to the effect that ISAA has an Athlete Protection Officer and how to reach them. That page's job is to answer "is this safe and well run?", and this is the strongest available evidence. `[VERIFY the wording with the committee — safeguarding copy should not be drafted by a developer]`
3. If a **safeguarding or athlete protection policy document** exists, it belongs on `/resources` under Governance. `[CONTENT REQUIRED — ask; do not assume one exists]`

### 14.4 Site-wide

```jsonc
// data/site.json
{
  "email": "isaasecretary@archery.ie",
  "instagram": "https://www.instagram.com/irish_student_archery/",
  "domain": "isaa.archery.ie"   // confirmed
}
```

Note that every ISAA address is on `archery.ie`, which is Archery Ireland's domain. If ISAA's relationship to Archery Ireland is formal, that is a credential worth one sentence on `/about` — a national governing body connection is exactly the kind of thing the "is this legitimate?" reader is looking for. `[VERIFY]`

### 14.5 Documents

| Title | Group | `versionLabel` | Size |
|---|---|---|---|
| Beginner Archer's Intervarsity Competition Handbook 2025 | Competing | Last updated August 2025 | PDF · 2.9MB |
| Indoor and Outdoor Intervarsity Competition Handbook | Competing | Last updated September 2025 | PDF · 2.0MB |
| ISAA Rulebook | Competing | Adopted 12 August 2017 | PDF · 430KB |
| ISAA Constitution | Governance | Adopted 12 August 2017 | PDF · 640KB |

The three Competing documents are the intervarsity documentation — label the group so that reads clearly, since the IVs are ISAA's flagship. Descriptions still needed (§8).

---

## WHAT I WOULD CUT IF WE START RUNNING OUT OF TIME

In exact order. Cut from the top. Everything above the line can go without the site failing; nothing below the line can.

1. **The `/privacy` page.** With no contact form, no analytics, no cookies and no third-party scripts, it would have almost nothing to say. Three honest sentences are still worth shipping if there is time; if there is not, the contact email covers data requests.
2. **The 404 page.** The framework default, unstyled, is survivable for a week.
3. **The homepage "Getting involved" three-step block.** `/getting-started` covers it; the hero already routes people there.
4. **The two supporting photographs** on `/about` and `/getting-started`. They are placeholders due for replacement anyway, and the pages read fine as text. Keep the hero — it is doing real work.
5. **Past events on `/events`.** Upcoming is the job; history is credibility garnish.
6. **The homepage facts strip.** Three real facts and cheap to build, so it survives longer than it did in v2 — but it is still decoration compared with what is below it.
7. **`/resources` as a page** — degrade it to a documents block at the bottom of `/about`, and repoint the nav item. Saves about forty minutes and keeps all four documents reachable. This is a partial cut, not a deletion: the documents themselves never go, because they are the most credible thing we have.
8. **`/getting-started` as a page** — fold its four best FAQs into a block at the top of `/clubs` and point the hero's second button there. Painful, and the last cut before the structural ones.
9. **`/about`'s committee block.** Keep the organisation paragraphs and the contact block; drop the roles list.

**Below this line, nothing is negotiable — cutting any of it means we should not launch:**

- All sixteen clubs listed, under the names in §14.1
- **The placeholder guard, and the grep that enforces it.** A public directory printing "insert email here" sixteen times is the one outcome that would undo everything else on this list
- **`isaasecretary@archery.ie` as both a `mailto:` link and copyable text.** With no form, this is the only inbound channel on the entire site
- The homepage hero answering what ISAA is
- Working navigation, on mobile, operable by keyboard
- Page titles, meta descriptions and the Open Graph image
- Colour contrast, focus states and alt text
- The site being genuinely responsive at 375px
- **The hero photograph processed to budget.** A 2.4MB hero on 4G is not a stylistic failure, it is a broken site
- **Document version dates visible on every row.** Two of the four are from 2017; a reader has to be able to see that without opening the file
- **The logo not shipped as a 221KB traced SVG**

**And one thing that is never cut, even though it is tempting because it is not code:** `CONTENT.md`. A beautiful site the committee cannot update is a site that is wrong by March and abandoned by next September. Twenty minutes buys it two more years.
