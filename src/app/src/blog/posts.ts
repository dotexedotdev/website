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
    slug: 'email-compromised-what-to-do-next',
    title: 'Someone got into his email. Here is what we did next.',
    date: '2026-11-25',
    excerpt:
      'Someone got into his email, hid the evidence with filters, and used it to shop. Here is the list we worked through to close every door, account by account.',
    image: '/blog/email-compromised-what-to-do-next.jpg',
    body: [
      'A family member called me recently because something was wrong with his email. His personal information had been released, and someone had used it to get into his account. By the time we looked, the damage was done, and it was stranger than either of us expected.',
      'They had not just read his mail. They had set up filters to send anything from Amazon straight to the trash, so he would never see it. Then they got into his Amazon account and ordered expensive computer parts, to be delivered to themselves. Order confirmations, shipping notices, all of it went to the trash folder, out of sight. If he had not called me, he might not have noticed for weeks.',
      'That is the part that stays with me. It was not a dramatic break-in. It was quiet. Someone sat in his inbox, hid the evidence, and used it to shop.',
      'The first worry, once we saw what had happened, was not the orders. It was the question nobody can answer on their own: what else do they have access to? An email account is the key to everything else. With it, someone can reset the password on your Amazon account, your bank, your Facebook, anything that sends a reset link to your inbox. That is the part that keeps people up at night, and it is the part most advice skips over. The articles tell you to change your password. They do not tell you how to work out what the intruder touched.',
      'So here is what we actually did, in order. It is the same list I would walk any small business through, because the steps are the same whether the account belongs to a family member or your company.',
      'First, we changed the email password, from a device we trusted, and turned on two-factor authentication. That locks the front door. Two-factor means a password alone is no longer enough to get in. It is the single most useful thing you can do, and it takes five minutes.',
      'Second, we checked the filters and forwarding rules. This is the step everyone misses. The attackers had set up a rule to hide Amazon emails, and there could have been more. In Gmail, that is Settings, then Filters and Blocked Addresses. In Outlook, it is Rules. We deleted every rule we did not recognise, and checked that no forwarding address had been added. A forwarding rule is the quietest trick of all: a copy of every email, sent somewhere else, forever.',
      'Third, we checked the recovery options. The recovery email and phone number on the account have to be yours. If an attacker changed them, they can lock you out later, even after you change the password. Ours were still correct. If they had not been, that would have been the next fix.',
      'Fourth, we went through the accounts tied to that email, starting with the ones that can spend money. Amazon first, because that was where the orders were. We changed the Amazon password, turned on two-factor there too, checked the order history, and cancelled what we could. Then the bank, then anything else that sends password resets to that inbox.',
      'Fifth, we checked for the same password elsewhere. If one password was used in more than one place, every one of those places is now at risk. That is how a single leaked password becomes five compromised accounts. We changed the reused ones.',
      'That is the whole list. Nothing on it is complicated, and nothing on it needs special software. What it needs is someone who knows to look, and the time to go through it carefully. That is the part people skip when they are on their own, because they are rattled and they want it to be over.',
      'It is also the part .EXE can help with. If something like this happens to you, or to someone in your family, or to your business, you do not have to work out what the intruder touched on your own. We will go through it with you, account by account, and make sure the doors are actually closed. The intro call is free, and the first question is always the same: what are you worried they can get into?',
    ],
  },
  {
    slug: 'ai-vulnerability-window-days-not-weeks',
    title: 'AI finds website flaws in days now. The fix has hours, not weeks.',
    date: '2026-11-23',
    excerpt:
      'AI can now find flaws in code and websites in days, and the window before a flaw is exploited has shrunk from weeks to hours. Here is what that means for a small business that has to keep its systems updated.',
    image: '/blog/ai-vulnerability-window-days-not-weeks.jpg',
    body: [
      'This week felt like the internet was falling apart. Outlook went dark. Chase had problems. Apple systems had problems. Air traffic control systems had problems. It is tempting to see one big attack behind it all. Jon Reed at CNET, writing this week, says it is probably not one attack. It is a lot of separate failures in an internet that is getting more fragile, and AI is a big reason why.',
      'Here is the number that stuck with me. The National Vulnerability Database received more than 17,000 new vulnerability reports in October, and more than 10,000 already in November. A year earlier, October brought fewer than 5,000. AI can now comb through code and websites for flaws, including code nobody used to look at closely. What once needed a trained team can now be done by one person with an AI model and the right tools. The flaws are being found faster than ever.',
      'That sounds like good news for defence, and partly it is. Defenders use the same tools. But Reed’s line is the one that matters: "Before, it might have taken weeks before a newly discovered vulnerability could be exploited. Now it might take days, even hours." Faster discovery helps everyone, including the people who want to use the flaw. The window between a flaw being found and a flaw being used has shrunk from weeks to days, even hours.',
      'For a small business, that changes what "keeping things updated" means. It used to mean getting around to updates when you had time. Now the update is a race, and the people running the race are automated. If you are responsible for a website, a booking system, or any of the things connected to the internet that may or may not still be maintained by their creators, you may not be paying attention and know you should update. You may find yourself liable if a breach leads to a leak of customer data. You may not have the know-how to fix it. That is the part of Reed’s article that hits closest to home for the businesses I work with.',
      'And the problem is wider than websites. The same AI tools can pick apart firmware in refrigerators, smart home gadgets, and grocery store freezers, code that far fewer eyes ever reviewed. Reed cites a Swedish supermarket attack in which freezers were raised to 50 degrees Celsius and staff had to empty them. The backlog of critical fixes is now so large that companies are swamped, which is one reason your software seems to update constantly. Sometimes the patch itself causes the outage. Several recent high profile outages, including Apple’s, are believed to have been caused by software updates.',
      'There is a second twist. AI is now writing a lot of the code itself, and some of it never gets reviewed by a human. Smaller teams, more AI-written code, and more junior developers leaning on AI without senior experience may mean new vulnerabilities are being written into new software and patches. The same technology is causing the problem, providing the solution, and complicating that solution.',
      'So what do you actually do? The advice from the security people Reed quotes is simple and unglamorous: patch promptly. One of them compares it to a flu shot or preventative healthcare. Know what you have connected to the internet, know who maintains each piece, and make sure somebody is watching for updates and applying them quickly. Do not use services that do not properly maintain their systems and protect privacy and security. That is not a technology strategy. It is housekeeping, and it is now the difference between a quiet week and a breach.',
      'There is a hopeful note at the end. One researcher Reed quotes expects two years of growing pains as vulnerabilities are found and patched, then software an order of magnitude more secure in a year or two. The flood of flaws being found now is, in a way, the system cleaning itself out. But those two years are exactly when a small business is most exposed, because the flaws are being found fast and the fixes still depend on someone paying attention.',
      'That is the unglamorous work .EXE does: keeping a small business’s systems updated and connected, so the fix happens before the exploit. If you are not sure what you have connected, who maintains it, or when it was last updated, that is a good place to start. The intro call is free.',
    ],
    sources: [
      {
        label: 'Jon Reed, "Everything Is Falling Apart, and AI’s Fingerprints Are All Over It", CNET, November 20, 2026',
        url: 'https://www.cnet.com/tech/services-and-software/outages-and-cyberattacks-everything-is-breaking-is-it-ai/',
      },
    ],
  },
  {
    slug: 'steeltech-rhysida-ransomware-lesson',
    title: 'A Canadian manufacturer was listed by a ransomware gang this week. Here’s the lesson for Halton small businesses',
    date: '2026-11-20',
    excerpt:
      'Rhysida listed a Manitoba manufacturer on its leak site on November 18, claiming 1.5 TB of stolen data. The attack pattern is the same one aimed at businesses of every size — and the defences are mostly unglamorous.',
    image: '/blog/steeltech-rhysida-ransomware-lesson.jpg',
    body: [
      'On November 18, the ransomware group Rhysida published SteelTech Inc. — a Manitoba manufacturer of outdoor wood furnaces, trading as HeatMaster SS — on its leak site, claiming to have taken about 1.5 terabytes of data, including accounting records, mail archives and employee information. The company has not confirmed the claims, and the details so far come from the group itself, so treat them as claims rather than established fact. What is not in doubt is the pattern: this is the same group, using the same playbook, that has listed hundreds of victims since it emerged in May 2023.',
      'That playbook is called double extortion. The attackers steal a copy of your data before they encrypt it, then demand payment twice over: once to unlock your systems, and again to keep the stolen data from being published. It matters because it changes what a backup can do for you. A good backup gets your systems back — but it does nothing about the data the attackers already hold. Prevention is the only defence against the second demand.',
      'Small businesses are squarely in scope. CIRA’s 2025 Cybersecurity Survey found that 24 percent of Canadian organizations had been hit by ransomware in the preceding twelve months, and 74 percent of victims paid the ransom. The Canadian Centre for Cyber Security calls ransomware the top cybercrime threat facing Canada’s critical infrastructure, and notes that the ransomware-as-a-service model has lowered the technical barrier so far that any organization is a viable target. Most victims are not chosen for who they are — they are chosen because a door was open.',
      'The doors, in Rhysida’s case, are well documented. A joint advisory from CISA, the FBI and the Multi-State Information Sharing and Analysis Center (AA23-319A) lists three ways in: valid accounts on external-facing remote services such as VPNs, where multi-factor authentication was not enabled; the Zerologon vulnerability in older domain controllers; and phishing. None of those requires a sophisticated target — just an unpatched system, a reused password, or one convincing email.',
      'What actually stops it is the unglamorous list the Cyber Centre recommends. Back up your data on the 3-2-1 rule — three copies, on two kinds of media, with one copy off site — and keep one copy offline, where ransomware cannot reach it. Test your restores: a backup that has never been restored is a hope, not a plan. Turn on multi-factor authentication for email, VPN and cloud admin accounts, and patch promptly. And write down an incident response plan before you need one: who is in charge, who you call — your IT provider, your insurer, the Canadian Centre for Cyber Security at 1-833-CYBER-88 — and what you do first.',
      'If it does happen, speed is everything: call your bank immediately if money has moved, then report it to your local police and to the Canadian Anti-Fraud Centre at 1-888-495-8501. And remember the timing. The week to check your backups is the week before you need them — not the week a ransomware gang publishes your name.',
    ],
    sources: [
      {
        label: 'Cyber Threat Intelligence — “SteelTech Inc. Ransomware Attack by Rhysida (2026)”',
        url: 'https://cyberthreatintelligence.net/ransomware-victim/steeltech-inc-rhysida-2026',
      },
      {
        label: 'Alberta Radio — “Canada War & Cyber: Java Alert, Breach Claims”, November 18, 2026 (notes the claims are unverified)',
        url: 'https://www.albertaradio.ca/post/canada-war-cyber-briefing-breach-claims-global-flashpoints-november-18-2026',
      },
      {
        label: 'CISA, FBI and MS-ISAC — “#StopRansomware: Rhysida Ransomware” (AA23-319A)',
      },
      {
        label: 'Cybersecurity Canada — “Ransomware: What Canadian Businesses Need to Know Before, During, and After an Attack”',
        url: 'https://cybersecuritycanada.ca/news/posts/ransomware-what-canadian-businesses-need-to-know-before-during-and-after-an-attack/',
      },
      {
        label: 'Cloudforces — “Ransomware Hit 24% of Canadian Organizations in 2025” (citing CIRA’s 2025 Cybersecurity Survey)',
        url: 'https://www.cloudforces.ca/blog/ransomware-preparedness-playbook-canadian-smbs-2026',
      },
    ],
  },
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
