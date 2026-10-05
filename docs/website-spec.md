# LL Soluciones Alternativas — Website specification

Status: implementation proposal; services, DR focus, and father-managed review/publishing confirmed  
Date: October 5, 2026  
Primary domain: https://llsolucionesalternativas.com  
Scope: redesign, SEO foundation, editorial CMS, and migration to automated Netlify deployment.

## 1. Product direction

Build a distinctive construction and architecture website that earns trust through real work, helps prospective clients understand available services, and turns useful engineering advice into qualified inquiries. The owner must be able to write, preview, publish, and update articles without editing code or using GitHub.

The visual direction is an architectural editorial portfolio: large project photography, strong typography, precise grids, concrete textures, restrained blueprint details, and an orange accent against charcoal and warm off-white. It should feel ambitious and technically capable while remaining fast and usable on a phone.

Success means visitors can find an appropriate service, see credible evidence, and contact the company; the father can publish independently; and code changes and published content reach production automatically after validation. SEO readiness is a deliverable; rankings and lead volume are outcomes to measure, not guarantees.

## 2. Current repository findings

- `index.html` is a single Spanish page with inline styles, a browser-loaded Tailwind CDN script, stock project images, email links, and WhatsApp links.
- Its content lists Santo Domingo Este, Dominican Republic, a street address, an email, and a telephone number. Treat these as unverified migration inputs.
- It advertises residential construction, earthworks, supervision, machinery rental, installations, and finishes. Validate these capabilities before turning them into service pages.
- Stock images and generic project descriptions cannot establish an actual portfolio. The existing claim of more than 50 projects requires evidence before reuse.
- `assets/header-bg.jpg` is referenced but absent from the repository inventory.
- Both `.github/workflows/pages.yml` and `.github/workflows/static.yml` deploy repository-root content to GitHub Pages on `main`; consolidate this overlapping deployment setup during migration.
- The README describes a `wwwroot` directory that is absent and disagrees with the workflows' actual artifact paths.
- No application package, CMS, Netlify configuration, sitemap, or dedicated blog implementation is present.
- The public domain could not be retrieved through the research browser. Live hosting, DNS, redirects, and indexation remain to be audited before launch.

This document specifies future changes. It does not change the current deployment or provision external accounts.

## 3. Assumptions and decisions to resolve

| Decision | Working assumption | Needed before |
| --- | --- | --- |
| Market | Confirmed: physically based in the Dominican Republic; DR is primary, international inquiries welcome. Confirm specific cities | Final local SEO |
| Language | Spanish public site and Spanish editorial labels; English spec | Content production |
| Branding | Confirmed legal name: LLSOLUCIONES ALTERNATIVAS E.I.R.L.; new minimalist identity requested | Design approval |
| Services | Eight service families supplied by the owner; see section 6 | Final scope and supporting evidence |
| Editor | Confirmed: father writes, reviews and publishes his own articles | CMS role setup |
| Ownership | Family controls GitHub, Netlify, CMS, domain, and recovery access | Account integration |
| Budget | Lightweight managed stack; plans and recurring costs evaluated before account setup | Provider selection |

If bilingual content is requested, revise routing to language prefixes, add translated content relationships and hreflang, and avoid duplicate untranslated pages. Do not infer the business location from the developer's timezone.

The site should describe the company as based in the DR and offer an international inquiry path without claiming offices, licenses, permitting capability, or project experience abroad. Add an optional country field to inquiries; country-specific service pages require demonstrated capability and substantive local content. Language remains provisionally Spanish; international positioning does not automatically require English.

Owner-supplied contact details supersede the existing HTML: telephone `+1 829-988-1111`, email `grupolebronp@llsolucionesalternativas.com`. Confirm delivery during launch testing. The existing page uses a different email spelling, so update all visible contacts, form destinations, and structured data consistently. Street address and exact local coverage still require confirmation.

## 4. Audience and conversion

Primary audiences: homeowners building or renovating, property developers, and commercial clients seeking an accountable construction partner. Secondary audiences: architects, project managers, and owners needing specialist support.

Primary action: “Solicitar una cotización.” Secondary actions: WhatsApp, telephone, and project exploration. Service and blog pages should offer a contextual inquiry action rather than interrupt reading with popups.

Quote form: name, email or phone (at least one required), service, project location, and message. Budget range and intended start date are optional. Show field errors, submission progress, and a clear success state. Include spam controls, a privacy notice, and verified recipient delivery. Launch without file attachments to simplify privacy and handling. WhatsApp messages may include the service title but must not expose submitted personal data in analytics.

## 5. Site structure

| Route | Purpose and required content |
| --- | --- |
| `/` | Positioning, featured work, key services, process, verified trust signals, recent articles, inquiry CTA |
| `/servicios/` | Overview of confirmed capabilities and suitable client needs |
| `/servicios/[slug]/` | Scope, deliverables, process, constraints, relevant projects, useful FAQs, contact CTA |
| `/proyectos/` | Real project portfolio with optional service/type filters |
| `/proyectos/[slug]/` | Client challenge, actual company role, location at safe granularity, scope, work stages, outcomes, approved gallery |
| `/nosotros/` | Company story, team, verified credentials, approach, service area |
| `/blog/` | Articles with category navigation and crawlable pagination |
| `/blog/[slug]/` | Article, author, publication/update dates, optional contents, related articles and service CTA |
| `/contacto/` | Quote form, confirmed contact channels, hours, service area; map only if useful |
| `/privacidad/` | Accurate disclosure of forms, analytics, processors, retention, and contact |
| `/404.html` | Helpful missing-page experience with navigation and contact |
| `/sitemap-index.xml`, `/robots.txt`, `/rss.xml` | Discovery and syndication |

Do not create empty portfolio detail pages, city doorway pages, or thin category archives. With insufficient verified projects, launch a modest portfolio or a process-focused section and expand it later.

### Homepage sequence

1. Compact navigation and accessible mobile menu.
2. A large authentic image with a clear H1 describing construction and confirmed market; quote and projects actions.
3. Verified proof such as credentials, experience, or client testimonials with permission.
4. Selected projects in a varied editorial grid, with visible scope and location.
5. Service families linking to dedicated pages.
6. Process: consultation, assessment/design, planning, execution, handover. Adapt to actual delivery practice.
7. Company/team introduction and recent practical articles.
8. Inquiry block and complete footer with contact, service links, privacy, and social links if active.

## 6. Service opportunities

### Confirmed launch portfolio

The owner supplied these service families and positioning. Use them as the launch information architecture, with professional responsibilities and direct/partner delivery clarified in final copy.

| Spanish service title and proposed slug | Owner-supplied scope |
| --- | --- |
| Ingeniería civil — `ingenieria-civil` | Technical management for residential, commercial, and institutional work, from initial idea to handover |
| Agrimensura y deslinde — `agrimensura-y-deslinde` | Surveys, measurements, boundary processes, and documentary support for cadastral and municipal processes |
| Estudios de suelos — `estudios-de-suelos` | Geotechnical evaluation before design, budgeting, and construction |
| Planos MIVED y ayuntamientos — `planos-mived-y-ayuntamientos` | Architectural and structural plans and technical submissions oriented toward DR authority approvals |
| Presupuestos de obra — `presupuestos-de-obra` | Organized quantities, costs, and scope for contracting, purchasing, and execution |
| Proyectos llave en mano — `proyectos-llave-en-mano` | Coordination of design, procurement, execution, and closeout |
| Supervisión técnica — `supervision-tecnica` | Quality, progress, safety, and compliance monitoring with clear owner reports |
| Alquiler de equipos — `alquiler-de-equipos` | Equipment supporting construction, movement, and technical fieldwork; inventory and availability to confirm |

Shared message: “Servicios para cada etapa del proyecto.” Supporting positioning: “Documentación, campo y obra bajo una misma mesa técnica.” Contact invitation: “Conversemos sobre el alcance, permisos y presupuesto de su obra.”

Supporting capabilities: topographic surveys of lots and parcels; technical permit dossiers; architectural and structural designs for submission; detailed civil works budgets; construction supervision and contractor control; residential and commercial execution. Explain these within the eight service pages rather than producing repetitive thin pages.

MIVED and municipal references are owner-provided service descriptions, not verified procedural guidance. Verify current official requirements before publishing articles that describe regulatory steps, and do not promise approvals.

### Future expansion candidates

Each candidate requires business confirmation, qualified delivery capacity, and substantive copy before publication.

| Family | Candidate offerings |
| --- | --- |
| Construction | Residential builds, commercial construction, extensions, turnkey delivery |
| Architecture and design | Concept design, architectural plans, remodeling design, visualization, BIM coordination |
| Civil and structural engineering | Structural assessment/design, foundations, drainage, retaining walls, infrastructure |
| Renovation and maintenance | Remodeling, waterproofing, rehabilitation, preventive maintenance, finishes |
| Project oversight | Site supervision, quality control, budgeting, quantity surveying, project management |
| Site preparation | Excavation, grading, earthworks, demolition where qualified |
| Technical coordination | Surveying, geotechnical studies, permitting support, electrical/plumbing coordination through verified specialists |
| Equipment | Machinery rental and operator services if actually available |

Publish a small set of strong service pages first. Partner-delivered services must explain the relationship. Do not imply professional licenses, permit approvals, engineering guarantees, or certifications that have not been verified.

## 7. Visual and interaction requirements

### Original minimalist brand identity

Create a new vector identity rather than reusing an existing logo: explore a typographic LL monogram, an abstract structural frame, and a clean wordmark. Present three initial directions, refine one, and deliver SVG plus transparent PNG exports, monochrome and reversed versions, favicon, and a short usage guide. This is a modest branding workstream, separate from full brand strategy.

Use custom geometric construction and properly licensed typefaces, record asset/font sources, and avoid tracing other companies' marks. Review visual similarity before release. Original creation cannot guarantee that no similar copyright or trademark rights exist; no legal-clearance claim should be attached to the design. The user has not supplied project photographs, so real imagery remains an asset request.

- Use a 12-column desktop grid, generous whitespace, large headings, and readable article text around 65–75 characters per line.
- Suggested palette: charcoal `#191C1D`, warm white `#F4F1EB`, concrete gray `#C5C2BA`, and construction orange `#D85A18`. Check actual foreground/background combinations for contrast.
- Use one display family and one readable body family, self-hosted with appropriate licenses and limited weights.
- Prefer real project details: forms, material joints, structural lines, site teams, and finished spaces. Label conceptual renders as renders; stock imagery must never masquerade as completed company work.
- Use subtle reveal effects and short hover transitions; honor reduced-motion preferences. Core content stays visible without JavaScript.
- Avoid heavy hero video, scroll hijacking, blocking loaders, and decorative 3D in the launch scope.
- Portfolio filters and navigation remain keyboard accessible. Reserve image dimensions, provide useful alt text, and ensure the floating WhatsApp action does not cover content.
- Meet WCAG 2.2 AA as the implementation target, including visible focus, semantic landmarks, labels, error announcements, and comfortable touch targets.

## 8. Recommended architecture

Recommendation: Astro with TypeScript for prerendered public pages, Sanity Studio for structured content and a rich-text editor, and Netlify for production hosting. This is a project design choice: content-heavy pages benefit from HTML generation and the editor should not require Git knowledge. Astro documents a Sanity integration, and Sanity documents visual editing capabilities. [Astro/Sanity integration](https://docs.astro.build/en/guides/cms/sanity/), [Sanity visual editing](https://www.sanity.io/docs/visual-editing/introduction-to-visual-editing).

Use a separate authenticated CMS Studio surface, linked from an owner bookmark, with Spanish field labels and a simplified navigation. Keep page layout and design in code; make articles, services, projects, authors, categories, and business details editable as structured records. Do not build an unrestricted drag-and-drop page builder for launch.

Evaluate CMS seat permissions, history, preview integration, storage, API quotas, and pricing before committing to a plan. Decap CMS is a fallback if repository-backed content and lower vendor dependence become priorities, but Git authentication and preview usability need a separate evaluation. A CMS selection change should preserve the content models and public URL contracts.

Proposed repository:

```text
src/
  components/       # Navigation, cards, forms, SEO, article rendering
  layouts/          # Shared page and article shells
  pages/            # Public routes and RSS endpoint
  lib/              # CMS queries, validation, metadata, redirects
  styles/           # Design tokens and compiled styles
studio/             # CMS schemas, Spanish labels, editorial configuration
public/             # Verified static assets, robots policy, icons
scripts/            # Output checks, content checks, link validation
tests/              # Route, form, draft isolation, and publishing checks
docs/               # Specification, owner guide, launch and rollback runbooks
.github/workflows/ci.yml
astro.config.mjs
netlify.toml
package.json
package-lock.json
```

Fetch only published content during public builds; a CMS failure must fail the build instead of silently deploying an empty website. Validate references and slug uniqueness. Use responsive CMS image transforms or a compatible build image pipeline, modern formats, and explicit dimensions. Compile styling locally; remove runtime Tailwind CDN loading.

## 9. CMS content and publishing

### Models

| Model | Required or supported fields |
| --- | --- |
| Article | Title, stable unique slug, excerpt, rich-text body, author reference, category, hero image/alt, published date, updated date, SEO title/description, related services; optional social image |
| Author | Name, slug, biography, portrait, verified qualifications and role |
| Service | Title, slug, summary, scope, deliverables, process, FAQs, images, related projects/articles, SEO fields |
| Project | Title, slug, service references, actual role, location, dates if known, challenge, solution, verified outcome, images/captions/alt, image permissions |
| Category | Name, slug, description; index only when enough useful content exists |
| Business settings | Brand/legal name, contact details, hours, address/service area, approved social links, logo, default social image |

The CMS must support saved drafts, rich text, lists, headings, links, image upload and crop, revision recovery, and preview before publishing. Require essential fields and image alt text; warn on missing descriptions, unsupported links, and excessive title length. SEO length recommendations are guidance, not ranking rules. Generate dates and URL slugs sensibly; warn before changing a published slug and create a redirect when it changes.

### Father's workflow

1. Sign in to a bookmarked editor using his own account.
2. Choose “Nuevo artículo,” add title, summary, body, category, and photos.
3. Review a simple readiness checklist and open a protected preview.
4. Review the article personally, then publish or leave it as a draft. Father owns both editorial review and publication; no separate approval is required.
5. See the difference between “published in CMS” and “live on website”; show or link deployment status with the live article URL.
6. Update or unpublish later; either action triggers site regeneration.

Implement an authenticated draft preview path or a separate protected preview application. Drafts must never enter production HTML, public JSON, RSS, or sitemaps. Do not assume a static pull-request Deploy Preview is a live preview of unpublished CMS content. Preview tokens belong in server-side secrets; disable caching and indexing for draft responses.

One administrator owns integrations and schema changes; father receives a role that permits writing and publishing. Prefer Editor where available; on a plan with only Administrator/Viewer, publishing requires Administrator and its broader project access. Review is his responsibility, supported by drafts and private previews, with no separate approval gate. Provide a short Spanish owner guide and a practice session using a real draft. Scheduled publishing is a later enhancement unless explicitly requested.

## 10. SEO and editorial requirements

Create useful pages around real services, locations, and client questions. Google's Search Essentials establishes the baseline for crawlable, helpful content; meeting technical requirements does not guarantee inclusion or ranking. [Google Search Essentials](https://developers.google.com/search/docs/essentials).

- Each indexable route returns complete HTML with a meaningful title, description, primary H1, logical headings, visible content, canonical URL, and social metadata.
- Choose the apex HTTPS domain as canonical; redirect HTTP, www, and alternate production host variants without chains. Validate DNS and certificate behavior at cutover.
- Generate a sitemap from published canonical routes, with accurate modification dates. Robots policy must permit intended public crawling. Add `noindex` response headers to preview/staging routes; robots disallow alone is not an index-removal mechanism.
- Use crawlable links and real pagination. Avoid orphaned articles and JavaScript-only service content. Do not index empty filters, search results, or duplicate archive variants.
- Add truthful Organization/LocalBusiness markup, using a suitable subtype only when accurate; include only verified address, hours, contacts, and service areas. Add Article and BreadcrumbList markup where appropriate. Schema must match visible content. [Google LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).
- Add stable author attribution and meaningful updated dates. Reference reliable sources for technical claims and explain when pricing depends on an assessment.
- Establish Google Search Console ownership, submit the sitemap, and inspect representative pages. Confirm Google Business Profile details and align business name, address, and telephone across real listings.
- Audit existing indexed URLs and backlinks before migration; map changed pages to their closest relevant replacement with permanent redirects. Preserve any useful URLs instead of routing everything to the homepage.

### Initial article backlog

Start with four substantial, owner-reviewed pieces; publish roughly two useful articles per month thereafter, adjusting to available expertise. Candidate topics:

1. What information is needed to quote a residential construction project?
2. Which factors affect construction costs in the confirmed local market?
3. Renovation planning: scope, sequencing, budget, and common surprises.
4. What does construction supervision cover?
5. How to prepare a site before excavation and foundation work.
6. Common causes of moisture problems and when to seek an inspection.
7. Architectural plans versus structural plans: responsibilities and coordination.
8. A real project case study describing decisions and outcomes.

Each article answers one clear question, draws on actual company experience, includes useful images where available, links to relevant services and other articles, and ends with an appropriate contact invitation. Avoid mass-produced city variants, fabricated case studies, or technical advice presented as a project-specific engineering assessment.

## 11. CI/CD and Netlify migration

Use GitHub Actions for pull-request verification and Netlify's repository integration as the deployment owner. Netlify supports production builds from pushes and previews for pull requests. [Netlify Git workflows](https://docs.netlify.com/build/git-workflows/overview/).

### Code pipeline

1. On pull requests: install from the lockfile, run type/schema checks, lint, focused tests, production build, and checks against generated routes and links.
2. Netlify creates a Deploy Preview using the same build verification command. Preview output is excluded from indexing.
3. Require CI and preview checks before merging into protected `main`. Production Netlify builds also run the verification command, so a direct push cannot bypass validation through a successful deploy.
4. Netlify publishes the validated `dist/` directory atomically. A failed build preserves the previous working release.

Define scripts such as `check`, `lint`, `test`, `build`, and `verify:output`; configure the Netlify command as `npm run check && npm run lint && npm run test && npm run build && npm run verify:output`. Pin a supported Node LTS major and compatible package versions during implementation, commit the lockfile, and keep local/CI/Netlify versions aligned. Do not select versions based on this proposal's date alone.

### Content pipeline

CMS published create/update/delete events trigger a production rebuild, including unpublishing and referenced settings changes. Netlify build hooks provide rebuild triggers. [Netlify build hooks](https://docs.netlify.com/build/configure-builds/build-hooks/).

Recommended integration: a small Netlify function verifies the CMS webhook signature, filters draft-only events, rate-limits/coalesces events, and invokes a private build hook. Keep the hook URL and signing secret out of browser code and repository files. Do not enable a deployment restriction that unintentionally blocks content-triggered rebuilds; verify hook compatibility with the chosen Netlify deployment settings.

All rebuilds use the latest production branch and published content. Set build queries to bypass stale CMS CDN responses where needed. On CMS/build failure, retain the existing website and notify the administrator; provide retry and a manual rebuild fallback. Operational target: ordinary article publication visible within five minutes under normal provider conditions, with measured latency and clear failure status rather than a guarantee.

### Configuration and secrets

- `netlify.toml`: build command, `dist` publish directory, functions directory if used, environment contexts, redirects, and security/indexing headers.
- Public configuration: canonical site URL, CMS project/dataset identifiers where appropriate.
- Private configuration: CMS read token if required, preview token, webhook signature secret, build hook URL, and form delivery credentials if applicable.
- Separate production and preview secrets; fork PR builds must not receive privileged tokens. Never use a token with CMS write permissions for public-site rendering.
- Use least-privilege GitHub Actions permissions; remove Pages deployment permissions once migrated. Action versions should be reviewed and pinned appropriately during implementation.
- Deploy only generated public assets. Source files, configuration secrets, and CMS drafts must not be bundled into the public output.

### Cutover

1. Establish account ownership and export/back up existing site content and DNS records.
2. Build the replacement on a Netlify preview address; complete content, functionality, and redirect QA.
3. Verify the domain in Netlify and prepare DNS changes while preserving email-related records.
4. Switch DNS, provision/verify HTTPS, and test apex/www redirects and legacy URLs.
5. After the Netlify production site is verified, remove both Pages deployment workflows and retire GitHub Pages domain hosting. Replace README instructions with accurate development, editorial, and deployment guidance.
6. Monitor form delivery, 404s, indexing, and deployment status after launch.

Rollback: restore the last healthy Netlify deploy for code/output failures; correct or restore CMS content before rebuilding so a subsequent hook does not reintroduce the problem. Retain a documented DNS rollback option for cutover failures. CMS exports and asset backups require an owner and agreed cadence.

## 12. Performance, measurement, and operations

- Public service/blog content and navigation work without client JavaScript. Load interaction code only where needed.
- Field targets at the 75th percentile, when sufficient traffic exists: LCP at most 2.5 seconds, INP at most 200 ms, CLS at most 0.1. Use mobile lab checks before field data becomes available.
- Initial lab goal: median Lighthouse mobile performance of at least 90 over three comparable production-like runs on the homepage, service detail, and article; diagnose third-party variance rather than masking failures.
- Size images per viewport, preload only the critical hero/font when justified, lazy-load below-fold media, and keep animation lightweight.
- Track successful quote submissions, WhatsApp/telephone clicks, and article-to-service navigation using a suitable analytics setup and accurate privacy disclosures. Do not collect form messages or contact details as analytics properties.
- Use Search Console for impressions, queries, clicks, and coverage; report qualified leads separately from page views. Establish a post-launch baseline and review at 30, 60, and 90 days.
- Configure uptime and deployment failure notifications for the designated owner. Check form delivery periodically. Agree retention and deletion practices for leads.

## 13. Delivery phases

| Phase | Deliverables | Exit condition |
| --- | --- | --- |
| Discovery | Confirm market, services, branding, accounts, budget, existing URLs and assets | Approved content inventory and architecture |
| Design | Homepage, service, project, article, contact, and mobile concepts; reusable components | Reviewed design and real sample content |
| Build | Astro routes, CMS models/editor, draft previews, forms, SEO output | Main visitor and editor journeys work |
| Automation | CI, Netlify previews/production, content hooks, migration runbooks | Code/content deployment and failure tests pass |
| Launch | Verified copy, images, redirects, DNS/HTTPS, editor training | Acceptance criteria met on production |
| Growth | Editorial calendar, new case studies, measurement reviews | Owner can sustain publishing and evaluate inquiries |

Launch excludes client portals, payments, real-time estimating, CAD/BIM viewers, public blog comments, and a custom CRM. Later options include downloadable planning guides, a clearly qualified budget estimator, multilingual content, scheduling, and CRM integration based on demand.

## 14. Acceptance criteria

- **Business:** All published services, contacts, claims, credentials, and projects are verified; image usage permissions recorded; no placeholder content or false portfolio evidence remains.
- **Experience:** Navigation, quote form, telephone and WhatsApp actions work on mobile and desktop; keyboard traversal and reduced motion are checked; no broken images or layout overflow at 360, 768, and 1440 px widths.
- **Editing:** Father creates a draft, uploads an image, previews, reviews and publishes without developer assistance. He can update and unpublish his own articles. Erroneous-edit recovery is demonstrated.
- **Draft isolation:** An unpublished article is absent from production HTML, generated routes, feeds, sitemap, and public content payloads; only an authenticated preview can display it.
- **SEO:** Representative routes have unique metadata, correct canonical URLs, valid structured data matching visible content, crawlable links, and sitemap inclusion. Preview routes are noindex. Missing URLs return a real 404 and legacy redirects reach relevant pages.
- **Deployment:** A passing main-branch change deploys automatically; a failing build leaves the prior release live; PR preview works; publish/update/unpublish triggers a rebuild; duplicate events do not create uncontrolled build storms.
- **Security:** No privileged token or build hook is present in client bundles, public output, or Git history; CMS and integration access roles are verified.
- **Contact:** A test lead reaches the confirmed recipient, errors are clear, and basic spam defenses work. Analytics count success only after submission succeeds.
- **Operations:** Domain/HTTPS and alternate-host redirects work; code and content rollback are exercised; README, Spanish editor guide, and account ownership details are complete.
- **Performance:** Representative pages meet the agreed lab budget; field Core Web Vitals are monitored after launch.

## 15. Remaining business questions

1. Which DR cities are actively served, and is Spanish-only correct or should English be added?
2. Which of the eight confirmed services are delivered directly versus through partners, and what credentials and equipment inventory can be shown?
3. Which real project photos and testimonials are available, and which proposed minimalist logo direction is preferred?
4. What onboarding would help the father review and publish independently?
5. Who owns the domain, Netlify account, CMS account, and GitHub repository; is there an existing Netlify project?
6. What monthly hosting/CMS budget is acceptable, and who receives quote requests and deployment alerts?

These answers refine the proposal; they do not prevent the design and technical foundation from being specified now.
