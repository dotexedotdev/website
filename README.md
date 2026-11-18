# dotexe.dev — new .EXE website

Static site for Adam Stirtan's IT consulting business, **.EXE**.
Built November 17, 2026. Single page, no frameworks, no external assets —
just `index.html`, `styles.css`, `script.js`.

## What's on the site

- Problem-first hero (the Reel 1 hook: "You're paying for software that doesn't talk to each other")
- Services with real depth (Custom Software, Automation, Integrations, Technical Consulting)
- How it works: free consultation → agree the scope → clear pricing in writing → build included → monthly retainer
- The "why no build fee" story: with AI, building is the quick part; the value is iterating until it fits
- Work: Norgard Restoration case study (flagship), ClassZoo, Playday Pups
- About Adam (15+ years, direct access, Burlington-based) with his quote
- FAQ (cost, timeline, ownership, existing software, after launch, location)
- Contact form + phone `(365) 778-1337` + `inbox@dotexe.dev`

## Deliberate decisions (Nov 17, 2026)

- **No dollar figures anywhere on the site.** Norgard's retainer numbers are
  client-specific and must NOT be published anywhere public — including this
  README. Pricing is shown in the proposal after scope is agreed.
- **Free consultation is front and centre** — call or video call, no paid assessments.
- **Norgard case study needs Jon's OK before the site goes live.** It tells his
  story (paper docket, desktop folders, "messy and not efficient") from the App
  brief he and his wife wrote. Ask him at the Nov 18 demo. The case study is
  honest about scope: QuickBooks and Xactimate integrations are on the roadmap,
  not shipped.

## Contact form — one-time activation

The form posts to **FormSubmit** (`https://formsubmit.co/inbox@dotexe.dev`) — a
free form endpoint, no account needed. The first time someone submits, FormSubmit
emails `inbox@dotexe.dev` an activation link. Adam must click it once; after
that, submissions arrive as emails. If the form is ever swapped for another
endpoint, update the `action` in `index.html` and the `_next` URL.

## Deploying

1. Create the public GitHub repo `adamstirtan/dotexe-dev`
   (GitHub App cannot create repos — create via the browser, Adam completes 2FA).
2. Push this directory to `main`.
3. Repo Settings → Pages → Source: Deploy from a branch, `main` / `/ (root)`.
4. Add the custom domain `www.dotexe.dev` (the `CNAME` file is already in the repo).
5. At the domain registrar, point `www.dotexe.dev` at GitHub Pages
   (CNAME to `adamstirtan.github.io`), and add the apex A records GitHub shows
   if the bare domain should redirect too. Enforce HTTPS once the certificate issues.
6. The old Google Site stays live until DNS is switched — cut over only after the
   Pages site is verified at `adamstirtan.github.io/dotexe-dev/`.

## Still to do

- Adam headshot for the About section (the only local photo on file is 150×150 —
  too small). Send a bigger one and add it as `adam.jpg`.
- Jon's approval for the Norgard case study (see above).
- FormSubmit activation click after the first real submission.
