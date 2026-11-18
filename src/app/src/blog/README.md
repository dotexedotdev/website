# .EXE blog — how publishing works

The blog reads from Airtable, not from code. The source of truth is the
**Posts** table in the ".EXE" base (`appE2GISppe10HTic`).

## Publishing a new article (no code, no deploy)

1. Add a row to the **Posts** table with these fields:
   - **Title** — the article headline.
   - **Slug** — the URL part after `/blog/` (lowercase, hyphens, no spaces).
     Must be unique; changing it later breaks the old URL.
   - **Date** — the publish date (ISO, e.g. 2026-11-20).
   - **Excerpt** — one or two sentences; shown on the list page and under
     the title.
   - **Body** — the article text, paragraphs separated by blank lines.
     Paragraphs may contain simple HTML (links allowed); keep them short.
   - **Image** — the header image path, e.g. `/blog/my-article.jpg`
     (see below).
   - **Sources** — a JSON array of `{"label": "...", "url": "..."}` objects,
     shown at the end of the article. A source with no URL is listed
     without a link — never guess or reconstruct a URL.
   - **Status** — `Published` to show it, `Draft` to hold it back.
2. That's it. The API picks the row up within 30 minutes (its cache TTL)
   and the list page at `/blog` and the article page at `/blog/:slug` show
   it automatically. No commit, no deploy, no waiting on a build.

To unpublish, set **Status** back to `Draft` (or delete the row). To edit,
edit the row — the change appears once the API cache expires.

## Header images

Every article gets a header image, shown at the top of the article page
and as the thumbnail on the `/blog` list; the article page labels it
"Illustrative image".

- Files live in `src/app/public/blog/` and are referenced by site path,
  e.g. `/blog/my-article.jpg` — that is the value stored in the Airtable
  **Image** field.
- Size: wide landscape, 2736×912 (3:1); the views crop with
  `object-fit: cover`, so anything roughly 3:1 or 16:9 is fine.
- Style: a generic illustration for the topic — never present a generated
  image as a photograph of a specific real place, building, or facility.
- The image file is the one part that still needs a code commit and
  deploy: add it to `public/blog/<slug>.jpg`, push to main, and wait for
  the deploy before setting the row to Published (otherwise the article
  renders without its image until the file lands).

For the automated Mon/Wed/Fri 7am blog cron: generate one image per
article with the media tools (wide landscape banner illustration of the
topic, flat illustration style, muted indigo palette, no text), save it
as `public/blog/<slug>.jpg`, commit and deploy it, create the Airtable
row with **Image** set to `/blog/<slug>.jpg` and **Status** Published,
and append the article to `posts.ts` (below) so the fallback stays
current. If image generation is unavailable in a run, leave **Image**
blank — the views render the article without one — and say so in the
report rather than shipping a mismatched or placeholder image.

## How the pieces fit

- **Airtable Posts table** — the articles. Fields: Title, Slug, Date,
  Excerpt, Body, Image, Sources, Status (single select: Draft/Published).
- **API** — `GET /api/blog` (published summaries, newest first) and
  `GET /api/blog/{slug}` (one full article). Implemented in
  `src/api/Dotexe.Api/BlogService.cs` + `ApiFunction.cs`, reading the
  table through `AirtableClient.ListPostsAsync`. Results are cached in
  memory for 30 minutes to protect the Airtable Free plan's 1,000
  calls/month quota (shared with the lead flow); if a refresh fails, the
  previous copy is served stale rather than erroring. Table name comes
  from the `AIRTABLE_POSTS_TABLE` app setting (default `Posts`).
- **Frontend** — `src/blog/api.ts` fetches the endpoints; `BlogListView`
  and `BlogPostView` render them. If the API is unreachable, both views
  fall back to `src/blog/posts.ts`.
- **Fallback copy** — `src/blog/posts.ts` holds the same articles as a
  bundled fallback, used only when the API fails. Keep it in sync when
  publishing (append newest first). It is not the source of truth.

## First-time setup (done — 2026-11-18)

The Posts table was created in the ".EXE" base (`appE2GISppe10HTic`,
table `tblcU4cE1tw7PFVGg`), the four launch articles were imported as
Published, and the Airtable-backed blog is live and verified. The steps
below are kept for reference only — do not re-run them.

1. Create the **Posts** table in the ".EXE" base (`appE2GISppe10HTic`)
   with the fields listed at the top of this doc (Title, Slug, Date,
   Excerpt, Body, Image, Sources, Status as a single select with Draft /
   Published). Either create it by hand in the Airtable UI, or run the
   script below — it first tries the Airtable Metadata API, and if the
   token lacks the `schema.bases:write` scope it prints the manual steps
   instead.
2. Run `scripts/migrate-blog-to-airtable.py` with `AIRTABLE_API_KEY` and
   `AIRTABLE_BASE_ID` in the environment. It imports the four launch
   articles from `scripts/airtable-posts.json` (exact copies of
   `posts.ts`, generated mechanically) and sets them all to Published.
3. Verify: `GET /api/blog` on the live site returns the four posts, and
   `/blog` renders them. Until then the site keeps working unchanged —
   the views fall back to `posts.ts`.

Never commit a key; the script reads it from the environment only.

## Ground rules

Every article must be grounded in real, verifiable sources. No invented
facts, dates, or quotes — if a detail can't be sourced, leave it out.
No .EXE prices on the site; no home address anywhere.
