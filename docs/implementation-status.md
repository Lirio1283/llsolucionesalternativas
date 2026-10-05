# Implementation status

## Implemented

- Original minimalist monogram, conceptual structural illustration, warm architectural palette, self-hosted Manrope, and responsive editorial layouts.
- Homepage, eight service detail pages, filterable service index, company, contact, privacy, success, and 404 pages.
- Contact channels supplied by the owner; Netlify form with honeypot, validation, error handling, and service preselection. Email is required in this first version; phone is optional.
- Published Sanity article integration, article pages, crawlable pagination, RSS, sitemap and robots policy. Honest empty state before approved articles exist.
- Spanish Sanity Studio with article/author schemas, readiness validation, direct publishing after self-review and a private draft preview link.
- Signature-verified publication webhook and authenticated, uncached/noindex draft preview function. Only published documents go into static builds.
- Metadata, canonical URLs, Organization/Service/Article structured data, social image, security headers, and preview noindex handling.
- Netlify configuration, GitHub verification workflow, lockfiles, content/integration tests, output validation and owner guides.
- Legacy duplicate Pages pipelines retired; the old page remains recoverable through Git history.

## Account-dependent launch work

- Sanity project `k56pw45w` is configured; the public `production` dataset is reachable. The owner deployed Studio at `https://llsolucionesalternativas.sanity.studio/`; confirm its credential-enabled CORS origin and publishing permissions.
- Select a suitable plan and grant the father publishing access. He is responsible for reviewing and publishing his own articles.
- Connect the existing Netlify project to the repository and configure environment variables, publication webhook, preview password and form notifications.
- Test real publishing permissions, authenticated draft previews, form delivery, publish/update/unpublish deploys and recovery with the actual accounts.
- Verify DNS/HTTPS/host redirects and legacy indexed URL redirects before switching the domain. Preserve email records.
- Confirm street address, exact service coverage, professional delivery details, lead retention, and image permissions. Collect real project images for a portfolio.
- Configure Search Console, operational alerts, backups, branch protection and preview protection as appropriate.

## Scope and verification limits

Services and business settings are code-managed initially; CMS management of projects/services/settings is future work. No project portfolio or fabricated example articles are published. Publication webhook requests are not distributed-deduplicated; review provider queuing and costs before frequent publication. Scheduled publishing, advanced analytics and per-user preview authentication are not implemented.

Source and production output are checked locally. End-to-end provider behavior and browser visual QA require available accounts/browser access; a successful static build does not verify those external operations.

The public-site verification passes all 9 tests and validates 16 generated pages. Builds are also verified against the configured Sanity project after connection. Remaining Studio CLI dependency findings are recorded in [dependency review](security-dependencies.md).
