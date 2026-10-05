# LL Soluciones Alternativas

Spanish-first construction and civil engineering website built with Astro, with a Sanity editorial Studio and Netlify deployment configuration.

## Run locally

Use Node **22.19 or newer** (CI/Netlify pin 22.22.0).

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:4321/. No CMS account is required for the initial preview; the blog shows an honest empty state. Set Astro telemetry off in restricted environments with `$env:ASTRO_TELEMETRY_DISABLED='1'`.

```powershell
npm run verify
```

This runs Astro/TypeScript checks, content and integration tests, the static build, and output validation. Deploy **only `dist/`**, never repository-root files. Netlify builds using `netlify.toml`; GitHub Actions verifies changes. The former GitHub Pages deploy workflows are retired to prevent competing deployments and source exposure.

## Content and deployment

Editor: https://llsolucionesalternativas.sanity.studio/

Repository: https://github.com/Lirio1283/llsolucionesalternativas

- [Sanity/Netlify connection instructions](docs/integration-guide.md): account setup, roles, secrets, webhook, domain cutover, form notification and launch checks.
- [Spanish editor guide](docs/editor-guide.es.md): draft, review, approve and publish.
- [Website specification](docs/website-spec.md): agreed product direction and future work.
- [Implementation status](docs/implementation-status.md): completed features and remaining integration/launch work.

The eight service pages and business details live in `src/data/services.ts`. Sanity manages articles/authors. Only published content is used in public builds; a CMS outage fails a build rather than silently deploying empty content. Authenticated draft previews run through a Netlify function with a separate server-only read token. The father writes, reviews, publishes, updates and unpublishes his own articles. Assign him a Sanity role that permits publishing; separate reviewer access is not required.

## Original assets

The LL monogram (`public/favicon.svg`) and architectural concept illustration (`public/images/structure.svg`) are original vector designs. Concept imagery is labeled and does not imply completed company projects. Manrope is self-hosted under its included OFL license in `public/fonts/OFL.txt`. The PNG social image is derived from `public/images/social.svg`; regenerate font/social exports with `node scripts/prepare-assets.mjs` if sources change. Legal clearance for the identity is not implied.

No live CMS, account permissions, DNS, form notifications, or Netlify repository integration are provisioned merely by building this repository. Keep credentials out of version control and browser bundles.
