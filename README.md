# dotexe.dev — .EXE website

The website for Adam Stirtan's IT consulting business, **.EXE** — custom
software, automation, and integrations for small businesses.

Built the same way as the Norgard Restoration app: a Vue frontend with a
C# Azure Functions API backed by Airtable, hosted on Azure Static Web Apps.

## Stack

- **Frontend:** Vue 3 + Vite + TypeScript (`src/app/`, pnpm, Node >= 22).
  Single-page site — no router, no CRM, no auth. The contact form posts to
  the API below.
- **API:** C# .NET 10 isolated Azure Functions (`src/api/Dotexe.Api/`).
  Two routes: `GET /api/health` and `POST /api/leads` (anonymous). A lead
  submission is validated and written to Airtable.
- **Data:** Airtable — one table, `Leads`, in the .EXE base (see below).
- **Hosting:** Azure Static Web Apps. Deploy runs from
  `.github/workflows/cicd.yml` (build job, then deploy on push to `main`).

## Run it locally

Prerequisites: Node.js >= 22, pnpm 10, .NET 10 SDK.

```sh
git clone git@github.com:dotexedotdev/website.git
cd website

# Frontend — serves on http://127.0.0.1:5173, proxies /api to the Functions host
pnpm --dir src/app install
pnpm --dir src/app dev

# API — from a second terminal, with Azure Functions Core Tools installed
cp src/api/Dotexe.Api/local.settings.example.json src/api/Dotexe.Api/local.settings.json
# fill in AIRTABLE_API_KEY in local.settings.json (see Airtable below)
cd src/api/Dotexe.Api && func start
```

Without the API running, the site still renders — only the contact form
fails (it shows an error state and the phone/email fallback).

## Airtable — what the API needs

Adam created the base for .EXE leads:

- **Base ID:** `appE2GISppe10HTic`
- **Table:** `Leads`

Expected `Leads` table schema (the table is built separately):

| Field | Type | Notes |
|---|---|---|
| Name | Single line text | required |
| Business | Single line text | optional |
| Email | Email | required |
| Phone | Phone number | optional |
| Message | Long text | required |
| Status | Single select: New / Contacted / Won / Lost | default New — set in Airtable, the API does not send it |
| Created | Created time | filled by Airtable, the API does not send it |

The API also needs a **Personal Access Token** with `data.records:write`
scope on this base. Create it in Airtable (account → Developer hub →
Personal access tokens), scoped to base `appE2GISppe10HTic`.

Where the values go — never in the repo:

- **Locally:** `src/api/Dotexe.Api/local.settings.json` (copy the
  `.example.json` file). `local.settings.json` is gitignored.
  - `AIRTABLE_API_KEY` — the token (fill in)
  - `AIRTABLE_BASE_ID` — `appE2GISppe10HTic` (already in the example file)
  - `AIRTABLE_LEADS_TABLE` — `Leads`
- **In Azure:** the Static Web App's Application Settings, same three names.

## Deploy

1. Create the Static Web App (Free tier) in Azure and add its deployment
   token as the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
2. Add the three `AIRTABLE_*` settings above to the SWA's Application
   Settings.
3. Push to `main` — the workflow builds the frontend and API and deploys.
4. Custom domain: point `www.dotexe.dev` at the SWA hostname with a CNAME
   at Porkbun (the domain registrar), then enforce HTTPS in the SWA once
   the certificate provisions.

## Notes

- No dollar figures anywhere on the site. Pricing is shown in the proposal
  after scope is agreed — never published.
- The Norgard Restoration case study on the site needs Jon's OK before the
  site goes live.
- The earlier static single-page version of the site lives on `main`
  (commit `93bbf8f`); this branch (`vue-rebuild`) replaces it with the Vue
  app. The static files were the design and copy reference for the port.
