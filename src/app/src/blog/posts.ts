// .EXE blog posts — FALLBACK COPY.
//
// The live blog now reads from the Airtable Posts table via GET /api/blog
// (see README.md in this folder). This file is only used when the API is
// unreachable, so the blog never renders blank — the list and article views
// fall back to the posts below on any fetch error.
//
// TO PUBLISH A NEW ARTICLE: add a row to the Airtable Posts table (no code,
// no deploy — see README.md). Then ALSO append the article here, newest
// first, so the fallback stays current: if Airtable is ever down, readers
// still see the latest articles. Fields:
//   slug    — the URL part after /blog/ (lowercase, hyphens, no spaces)
//   title   — the article headline
//   date    — ISO date, e.g. '2026-11-18'
//   excerpt — one or two sentences, shown on the list page and under the title
//   body    — paragraphs as HTML strings (links allowed); keep paragraphs short
//   image   — header image path, e.g. '/blog/my-article.jpg' (see below)
//   sources — optional list of { label, url } shown at the end of the article
//
// ARTICLE IMAGES: every article gets a header image, shown at the top of
// the article page and as the thumbnail on the /blog list. Images live in
// `public/blog/` and are referenced by path, e.g. '/blog/my-article.jpg'.
//   - Size: wide landscape, 2736×912 (3:1) works well; the views crop with
//     object-fit: cover, so anything roughly 3:1 or 16:9 is fine.
//   - Style: a generic illustration for the topic — never present a
//     generated image as a photograph of a specific real place, building,
//     or facility. The article page labels it "Illustrative image".
//   - FOR THE MON/WED/FRI 7AM BLOG CRON: generate one image per article
//     with the media tools (prompt: wide landscape banner illustration of
//     the topic, flat illustration style, muted indigo palette, no text),
//     save it as `public/blog/<slug>.jpg`, set the `image` field to
//     `/blog/<slug>.jpg`, and check the image visually before committing.
//     If image generation is unavailable in a run, leave `image` unset —
//     the views render the article without one — and say so in the report
//     rather than shipping a mismatched or placeholder image.
//
// Every article must be grounded in real, verifiable sources. No invented
// facts, dates, or quotes — if a detail can't be sourced, leave it out.

export interface BlogSource {
  label: string
  // A source is listed with a link only when we have its exact URL.
  // Never guess or reconstruct a URL — a label with no link is honest.
  url?: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string[]
  image?: string
  sources?: BlogSource[]
}

export const posts: BlogPost[] = [
  {
    slug: 'oakville-data-centre-pause-buzz-ai-campus',
    title: 'Oakville’s data-centre pause is now appeal-proof — while a 320 MW AI campus waits in the wings',
    date: '2026-11-18',
    excerpt:
      'Oakville’s one-year freeze on data centres survived its appeal period untouched, and the town’s planning review is now underway — even as BUZZ HPC advances plans for a 320-megawatt AI campus in north Oakville.',
    image: '/blog/oakville-data-centre.jpg',
    body: [
      'Oakville’s one-year pause on data centres is now on firm legal footing. The Town announced in early November that the appeal period for Interim Control By-law 2026-129 closed with no appeals received, and its review of planning rules for data centres and similar facilities is moving into its next phase. The by-law, passed on August 11, 2026, temporarily restricts new data centres, enterprise computing facilities and similar high-intensity digital processing facilities on employment lands while staff study them.',
      'What makes Oakville’s approach different from its neighbour’s is timing. Burlington’s data centre proposal at 3110 South Service Road arrived first and is a permitted use, so it went through a technical site plan review with no public meeting — and Burlington council voted down a moratorium in July. Oakville acted before any application existed: the Town says it still hasn’t received a formal data centre application, only preliminary industry discussions. Mayor Rob Burton put it this way: “The decision to act first means the appeal period is behind us, the by-law is secure, and the review now moves into its next phase.”',
      'The review will look at land use compatibility, infrastructure capacity, electricity and water demands, noise and environmental impacts, and who — the town, the province, or another agency — is responsible for what. Under Ontario’s Planning Act, the pause can run for up to one year, with the option to extend it to two, while the study is completed. It is not a permanent ban: the Town has said so repeatedly.',
      'Meanwhile, the proposal everyone is watching got more detailed last week. BUZZ High Performance Computing, a subsidiary of HIVE Digital Technologies, outlined its power and cooling plans for a proposed 320-megawatt AI campus in Oakville, according to Structure Research on November 13. The project, announced in May, would be one of Canada’s largest AI facilities: about 320 MW of utility capacity, more than 100,000 graphics processors at full build-out, roughly $3.5 billion of investment, and a target of coming online in the second half of 2027. Industry reporting places the site at 3480 Ninth Line in north Oakville, on about 25 acres BUZZ bought for a combined $58 million.',
      'BUZZ has been answering the obvious questions in advance. In an interview published in October, BUZZ president and COO Craig Tavares said the company would privately fund the electrical connection, transformer infrastructure, required grid expansions and a new fibre-optic backbone — and that none of those costs would fall on municipal taxpayers or be recovered through a project-specific increase to residential electricity rates. The campus would connect to the provincial transmission grid rather than Oakville’s local distribution system, with the transformer station on BUZZ’s own property. The company also says it will use closed-loop cooling with no continuous municipal water use for cooling.',
      'But none of this is approved yet, and the timing is the open question. No formal application has been filed, the Town’s freeze runs to August 11, 2027, and the province’s draft Data Centre Playbook — the framework meant to coordinate all of this — is still a draft, with comments having closed in September and no decision posted. For small businesses in Halton, the practical takeaway is simple: the rules for the biggest infrastructure projects in the region are still being written, in Oakville and at Queen’s Park alike, and the next year is when they get decided. If your business touches AI infrastructure, power, or data-heavy work, that’s a process worth watching.',
    ],
    sources: [
      {
        label: 'Town of Oakville — “Oakville moves forward with data centre planning review”',
        url: 'https://www.oakville.ca/town-hall/news-notices/2026-news-releases-archive/oakville-moves-forward-with-data-centre-planning-review/',
      },
      {
        label: 'Town of Oakville — “Oakville Council approves Interim Control By-law to support further study related to data centres”',
        url: 'https://www.oakville.ca/town-hall/news-notices/2026-news-releases-archive/oakville-council-approves-interim-control-by-law-to-support-further-study-related-to-data-centres/',
      },
      {
        label: 'GTA Construction Report — “Oakville continues data centre planning review”, November 2, 2026',
        url: 'https://www.gtaconstructionreport.com/oakville-continues-data-centre-planning-review/',
      },
      {
        label: 'Structure Research — “BUZZ HPC outlines power and cooling plans for proposed Oakville AI campus”, November 13, 2026',
        url: 'https://www.structureresearch.net/2026/11/13/buzz-hpc-outlines-power-and-cooling-plans-for-proposed-oakville-ai-campus/',
      },
      {
        label: 'HIVE Digital Technologies / BUZZ HPC — company announcement, May 18, 2026',
        url: 'https://www.buzzhpc.ai/company/news/hives-buzz-hpc-announces-320-mw-sovereign-ai-infrastructure-in-greater-toronto-area/',
      },
      {
        label: 'FourWeekMBA — “BUZZ HPC Says It Will Pay Grid Costs for 320MW Oakville Site” (Capacity interview, October 2026)',
        url: 'https://fourweekmba.com/ai-buzz-hpc-says-it-will-pay-grid-costs-for-320mw-oakville-site/',
      },
      {
        label: 'OakvilleIQ — “A 320 MW data centre meets Oakville’s Toronto-fed grid”',
        url: 'https://oakvilleiq.ca/news/oakville-data-centre-320-mw-grid/',
      },
    ],
  },
  {
    slug: 'burlington-data-centre-proposal',
    title: 'A data centre is proposed for Burlington’s South Service Road. Here’s what’s actually happening',
    date: '2026-11-17',
    excerpt:
      'A two-storey, 20-megawatt data centre is proposed for the former Tucker’s Marketplace site — and the debate around it says a lot about how Ontario cities handle new infrastructure.',
    image: '/blog/burlington-data-centre.jpg',
    body: [
      'A data centre is proposed for 3110 South Service Road, on the former Mother Tucker’s / Tucker’s Marketplace site. The application is for a two-storey building of about 5,163 square metres (roughly 55,000 square feet), needing around 20 megawatts of electricity — 17 MW for the facility itself, plus 3 MW for general use — and cooled by air, not water. The facility would provide colocation, cloud computing, data storage, and data processing for commercial and institutional users. The City of Burlington notes it is not an AI or hyperscale facility.',
      'Where it stands: the application was deemed complete by the City on July 6, 2026, and the City’s project page now says it has received site plan approval, subject to conditions.',
      'Why it’s controversial has as much to do with the process as the building. Data centres are a permitted use under Burlington’s Official Plan and zoning bylaw, so no public meeting is required — and under Ontario’s Planning Act, site plan approval is a technical review decided by staff, not council. Council has no legal authority to refuse a site plan for a permitted use. Residents who objected raised familiar concerns: electricity demand, noise, water use, property values, and health — and many were frustrated to learn they had no formal say in the decision.',
      'Council did get a chance to weigh in, of a sort. On July 21, 2026, after hearing 16 delegations, council voted down a one-year moratorium on new data centre applications, 4–2. The motion came from Ward 2 Councillor Lisa Kearns, who argued residents wouldn’t accept a process with no notice, comment, or impact assessment; Mayor Marianne Meed Ward backed it. Ward 3 Councillor Rory Nisan called the result a victory for balanced development, saying “common sense has prevailed over a campaign of fear.” Council directed staff to review the city’s data-centre rules through the Official Plan process and to keep pressing the province and Ottawa for a coordinated regulatory framework.',
      'The electricity question got a partial answer from Burlington Hydro. The utility says the facility would pay for its own electrical infrastructure — two new breaker positions at Hydro One’s Cumberland Transformer Station and two distribution feeders to the site — and that the station has enough available capacity. It also says it does not expect nearby homes or businesses to see higher electricity rates as a result, since Ontario rates are regulated through the Ontario Energy Board.',
      'Burlington isn’t alone in this. Hamilton debated a moratorium of its own, and Oakville, Mississauga, Lakeshore, and Sault Ste. Marie have pauses in effect. Ontario released a draft Data Centre Playbook in August 2026, with comments closing September 12; as of early November, no decision had been posted. Whatever happens at 3110 South Service Road, the rules for the next proposal are still being written.',
    ],
    sources: [
      {
        label: 'City of Burlington — 3110 South Service Rd. development project page',
        url: 'https://www.burlington.ca/news-and-notices/posts/current-development-projects/3110-south-service-rd/',
      },
      {
        label: 'The Reporter (Local Journalism Initiative) — “Burlington Data Centre Proposal Advances as Hydro Details Address Key Concerns”, Aug 8, 2026',
        url: 'https://thereporter.ca/2026/08/08/burlington-data-centre-proposal-advances-as-hydro-details-address-key-concerns/',
      },
      {
        label: 'Quirrely — “These Towns around the World signed-off on Data Centres. Then they found out what they’d agreed to.” (Hamilton and Burlington moratorium votes)',
        url: 'https://www.quirrely.ca/briefs/towns-signed-off-data-centres-then-found-out/',
      },
      {
        label: 'Lisa Kearns for Mayor — campaign update on the data centre motion',
        url: 'https://lisakearns.ca/campaign-recap-whats-next/',
      },
      {
        label: 'LSG Realty — Ontario data centre policy tracker (draft Data Centre Playbook, municipal pauses)',
        url: 'https://lsgrealty.ca/data-centres',
      },
    ],
  },
  {
    slug: 'hamilton-halton-smart-mobility-funding',
    title: 'Hamilton–Halton’s smart mobility hub just got $4.5M more. Here’s why local businesses should care',
    date: '2026-11-17',
    excerpt:
      'The Centre for Integrated Transportation and Mobility was renewed as an Ontario Vehicle Innovation Network site — with fresh funding for the region’s small tech firms.',
    image: '/blog/hamilton-halton-mobility.jpg',
    body: [
      'On May 15, 2026, the Centre for Integrated Transportation and Mobility (CITM) — an initiative of Innovation Factory — was renewed as one of nine Regional Technology Development Sites in the Ontario Vehicle Innovation Network (OVIN). The Hamilton region site receives $4.5 million: $2 million through OVIN, matched by over $330,000 from other public sector sources and $2.2 million in private sector contributions.',
      'It’s part of a bigger provincial bet: over $69.6 million into Ontario’s automotive and mobility ecosystem, made up of $17.5 million from the Government of Ontario, $32.8 million in matching industry investment, and $19.3 million from the broader public sector.',
      'What CITM actually does is the interesting part for small businesses. It gives start-ups and SMEs specialized business and technical help to develop, validate, and scale connected and electrified vehicle technology — powertrains, charging and hydrogen infrastructure, connected and autonomous vehicle systems, smart transportation infrastructure, and Transportation-as-a-Service. That help includes access to McMaster University, Mohawk College, Sheridan College, and CanmetMATERIALS for prototyping and testing, 5G network access through Rogers, telematics data through Geotab, and real-world pilot environments at HOPA Ports and John C. Munro Hamilton International Airport.',
      'Why this matters in Burlington and Oakville: Halton’s tech story isn’t only data centres. There is funded, practical support here for small firms building mobility and industrial technology — and the ecosystem is close enough to use. If you run a small tech or manufacturing business in the area, programs like this are worth knowing about. And one of the partners will look familiar to anyone who’s followed local tech: Geotab.',
    ],
    sources: [
      {
        label: 'Innovation Factory — “CITM Renewed as OVIN Regional Technology Development Site”, May 15, 2026',
        url: 'https://innovationfactory.ca/citm-renewed-as-ovin-regional-technology-development-site-supporting-smart-mobility-innovation-in-hamilton-halton-regions/',
      },
    ],
  },
  {
    slug: 'spear-phishing-small-business-canada',
    title: 'The $68-million email: spear phishing is now the costliest scam aimed at Canadian businesses',
    date: '2026-11-17',
    excerpt:
      'Targeted impersonation emails cost Canadians $67.9 million in 2025 — and the first half of 2026 was already worse. Here’s how the scam works, and what stops it.',
    image: '/blog/spear-phishing.jpg',
    body: [
      'The numbers are stark. Canadians reported more than $704 million in fraud losses in 2025, the highest year on record, according to the Canadian Anti-Fraud Centre’s annual statistics, released in March 2026. Spear phishing — targeted impersonation, including business email compromise — accounted for $67.9 million of that, across 813 reports, making it the second-largest fraud category by dollar loss. And 2026 started worse: about $57.7 million in spear phishing losses in the first six months alone. The Anti-Fraud Centre estimates only 5 to 10 percent of fraud is ever reported, so the real totals are several times higher.',
      'Here’s how it usually plays out for a small business. A criminal impersonates someone trusted — a boss, a supplier, a lawyer, an employee — and convinces someone to send money or change banking details. The classic version is invoice fraud: a “supplier” emails new payment instructions, the invoice is real, and the bank account isn’t. Construction, contracting, and real estate are frequent targets. In May 2026, the Anti-Fraud Centre said it helped recover about $3.5 million for a Quebec business that had wired money on fraudulent instructions — and that the fast report was what made recovery possible.',
      'What actually stops it is mostly unglamorous. Verify any change of banking details by calling a phone number you already trust — never the one in the email. Require two-person approval for wires and payment changes. Set up DMARC on your email domain so impersonators can’t send mail that looks like it came from you. And train your team that urgency plus secrecy is a red flag: real suppliers don’t mind being double-checked.',
      'If money has already gone out, speed is everything: call your bank immediately, then report it to your local police and to the Canadian Anti-Fraud Centre — online or at 1-888-495-8501. The faster it’s reported, the better the chance of getting any of it back.',
    ],
    sources: [
      {
        label: 'Canadian Anti-Fraud Centre — Top 10 frauds in 2025 (February 2026)',
      },
      {
        label: 'Cybersecurity Canada — Cybersecurity Canada Report 2026: Canadian SMB Statistics',
        url: 'https://cybersecuritycanada.ca/cybersecurity-canada-report-2026/',
      },
      {
        label: 'Cybersecurity News — “How to protect your business from email compromise and payment fraud”',
        url: 'http://cybersecuritynews.ca/guides/how-protect-your-business-email-compromise-and-payment-fraud',
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
