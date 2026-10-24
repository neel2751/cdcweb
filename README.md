# CDC Construction website — Build Studio

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, exported as static files for the existing hosting.com (cPanel) hosting.
Forms post to one small PHP script on the same hosting.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in later; works empty
npm run dev                  # http://localhost:3000
```

Forms need the PHP endpoint, so they only send on the live server (or with `php -S`, see below).

## Build and deploy

```bash
npm run build      # writes the whole site to out/
```

Upload **the contents of `out/`** to `public_html` (File Manager or FTP/SFTP). This includes:

- `.htaccess` — HTTPS, old-URL redirects (/aboutus, /contactus, /callback), clean URLs, security headers and CSP
- `api/enquiry.php` — the form endpoint

> Turn on "show hidden files" in File Manager so `.htaccess` is uploaded.

## Form endpoint setup (once)

1. In cPanel, create `/home/<cpanel-user>/cdc-private/` (outside `public_html`, permissions 700).
2. Copy `server/form-config.sample.php` there as `form-config.php` and fill it in.
3. **Resend**: create an account, add `cdc.construction` as a domain and add the DNS records it gives you in the cPanel Zone Editor
   (they sit alongside the Microsoft 365 SPF/DKIM records — don't remove those). Put the API key in `form-config.php`.
4. **Turnstile** (spam check): create a site in Cloudflare → Turnstile. Site key → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env.local`
   (then rebuild); secret key → `turnstile_secret` in `form-config.php`.
5. **Routing**: set who receives each enquiry type in `routes`.
6. **Lead sheet** (optional, recommended): follow the steps at the top of `server/lead-sheet.gs`.
   Every enquiry is also saved to `cdc-private/leads.csv` as a backup.

Test the endpoint locally:

```bash
cd public && CDC_FORM_CONFIG=/path/to/form-config.php php -S 127.0.0.1:8080
```

## Content you edit

| What | File |
| --- | --- |
| Phone, email, address, socials, stats, reviews | `src/data/site.ts` |
| Services (8) | `src/data/services.ts` |
| Sectors (4) | `src/data/sectors.ts` |
| Projects / CDC Project Proof case studies | `src/data/projects.ts` |
| "Recently handed over" board | `src/data/handover.json` (or a Google Sheet, below) |
| Compliance documents (versions, expiry dates, PDFs) | `src/data/compliance.ts` + PDFs in `public/documents/` |
| Estimator rates and options | `src/data/estimator.ts` |
| FAQs, open roles, team | `src/data/content.ts` |

### Project Proof rules
A case study shows a field only when it's filled in. Add `challenge`, `scope`, `approach`, `facts`, photos and
`clientQuote` only once CDC has checked them, then set `proof: { checkedOn, checkedBy }`.
Photos: WebP files in `public/images/projects/<slug>/`, around 1600 px wide, then list them in `photos`.

### Estimator rates
`published.rates` is `null`, so the live estimator shows **no prices** — it collects answers, shows Budget Confidence
and books a survey. When CDC signs off real £/m² rates, fill in `published` with `reviewedOn` and `reviewedBy`.
For design reviews only, `NEXT_PUBLIC_ESTIMATOR_PREVIEW=true` shows sample rates with a warning banner. Never deploy with it on.

### Handover board from a Google Sheet
Publish a sheet tab with a `slug` column as CSV, put the URL in `HANDOVER_CSV_URL`. `npm run build` syncs it first.

## Before launch — search the code for `TODO(CDC)`

- Real project photos and case study facts
- Estimator rates (or launch without prices)
- Accreditation certificates, expiry dates and public PDFs
- Legal pages: privacy (draft written to match the forms), terms, cancellation policy, Carbon Reduction Plan text
- Mobile WhatsApp number in `src/data/site.ts` (the current number is a landline)
- Team profiles and open roles
- Review the "included" lists and planning notes on each service

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`
