# ISAA website

The website of the Irish Student Archery Association — `isaa.archery.ie`.

Next.js (App Router) + TypeScript + Tailwind CSS, statically generated, deployed on Vercel. No CMS, no database, no analytics, no third-party scripts.

- **Updating content** (clubs, events, documents, committee): see [CONTENT.md](CONTENT.md). No developer needed.
- **Specification**: [SPEC.md](SPEC.md) is the source of truth for scope and design decisions.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` to see placeholders rendered locally (the demo build). Without it, unsupplied content is hidden — the production default.

## Layout of the repository

```
app/            routes, layout, metadata files (sitemap, robots, icons, OG image)
components/     the small set of UI components
data/           ALL site content, as JSON — edit these to update the site
lib/            content helpers (placeholder guard, event date logic, nav)
types/          the data contracts for data/*.json
public/         served files: photos/, pdfs/, logo/
scripts/        asset preparation and the launch-gate check
assets/         original, unprocessed media as supplied (not served)
```

Static files are served from `public/` only. `assets/` holds the originals that `scripts/` process into `public/`.

## Placeholders and the launch gate

Unsupplied content is written into `data/*.json` as a bracketed sentinel such as `"[insert email here]"`. With `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` (the demo deployment only) these render as visible dashed placeholders; otherwise they are omitted.

Before any production deploy, with that variable unset:

```bash
npm run build && npm run check:launch
```

The check fails if any `[insert`, `[VERIFY]` or `[CONTENT REQUIRED]` remains in the built HTML.

## Deploy

Import the GitHub repository into Vercel and accept the defaults. Every push to `main` deploys production; every branch gets a preview URL.

Environment variables on Vercel:

| Variable | Where | Value |
|---|---|---|
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | demo/preview only | `true` |
| `NEXT_PUBLIC_SITE_URL` | production, once the domain resolves | `https://isaa.archery.ie` |

Until `NEXT_PUBLIC_SITE_URL` is set, the deployment's own `*.vercel.app` address is used for canonical URLs and Open Graph images so shared links preview correctly.

## Asset scripts

```bash
npm run assets:photos   # resize/convert the photographs in assets/media-photos → public/photos
npm run assets:og       # re-render app/opengraph-image.png from scripts/og-image.html (needs Chrome)
```
