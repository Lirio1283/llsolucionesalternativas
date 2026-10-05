# Connect Sanity and the existing Netlify project

Target Netlify project: https://app.netlify.com/projects/llsolucionesalternativas/

GitHub repository: https://github.com/Lirio1283/llsolucionesalternativas

Hosted Studio: https://llsolucionesalternativas.sanity.studio/

Sanity organization page: https://www.sanity.io/@ojblkcomb (administration, not the editor).

Sanity project ID: `k56pw45w`. Organization ID: `ojblkcomb`. The organization ID is used for account administration; website and Studio APIs use the project ID. The configured dataset is `production`; verify it exists in project settings.

The public Sanity project ID is configured in the environment examples and Netlify build configuration. Private tokens, publishing webhook, Studio hosting, and account roles still require setup. Its blog honestly shows an empty state until published content exists. No external accounts or permissions are created by this checkout.

## 1. Create the Sanity project

Create a project in https://www.sanity.io/manage using a family-controlled account. Name it **LL Soluciones Alternativas** and create a `production` dataset. For simple public articles, a public dataset works; unpublished drafts still need authenticated access. Do not store confidential data in published documents.

The Studio has been deployed by the owner at `https://llsolucionesalternativas.sanity.studio`. Confirm that exact origin is listed in Sanity's CORS settings with credentials enabled. For local editing, install dependencies with `npm ci --prefix studio`, copy `studio/.env.example` to `studio/.env`, and run `npm run dev --prefix studio`. Add the local Studio origin (`http://localhost:3333`) to CORS only if using it. No write token belongs in Studio environment variables; users sign in individually.

The father is both author and reviewer and must have publishing access. Use **Editor** where the selected plan supports it; on a plan offering only Administrator and Viewer, he needs Administrator to edit and publish. Administrator also grants project-management access, so prefer Editor when available. A separate Contributor/reviewer workflow is no longer required. Confirm current roles and pricing before selecting a plan. Sources: [Sanity roles](https://www.sanity.io/docs/user-guides/roles), [pricing](https://www.sanity.io/pricing).

Create an Author record with real name and biography, publish it, then create a practice draft. Add title, slug, summary, body, author, topic and date. Review and approve it before publishing.

## 2. Connect Netlify

In the existing project, link `Lirio1283/llsolucionesalternativas` and select `main`. Push the implementation before deploying; local uncommitted files cannot be built by Netlify. Configuration comes from `netlify.toml`: Node 22.22.0, `npm run verify`, `dist`, and `netlify/functions`. Enable form detection. Do not upload the repository root.

Netlify environment settings (never commit values):

| Name | Use |
| --- | --- |
| `SANITY_PROJECT_ID` | Project ID, available to builds and functions |
| `SANITY_DATASET` | `production`, available to builds and functions |
| `SANITY_READ_TOKEN` | Optional read-only token if the dataset is private, build scope only |
| `REQUIRE_CMS` | `true` in production once connected; prevents an accidentally disconnected empty blog deployment |
| `SANITY_PREVIEW_TOKEN` | Read-only token that can read drafts, functions scope only |
| `PREVIEW_PASSWORD` | Strong private password for the draft preview, functions scope only |
| `SANITY_WEBHOOK_SECRET` | Random signing secret shared with Sanity webhook, functions scope only |
| `NETLIFY_BUILD_HOOK_URL` | Private production build hook URL, functions scope only |

Do not expose private values in `PUBLIC_*` or `SANITY_STUDIO_*` fields, browser code, or chat. Preview uses HTTP Basic authentication with username `editor`; share its password through a private channel. This first implementation uses a shared editorial password, not per-user preview authentication. Rotate it when access changes. Fork PR contexts should have no privileged credentials; the site can build without CMS there.

## 3. Published content rebuilds

Create a Netlify build hook targeting `main` and save its URL as `NETLIFY_BUILD_HOOK_URL`. In Sanity, create a webhook to `https://llsolucionesalternativas.com/api/cms-published` (use the live Netlify origin before DNS cutover). Enable create/update/delete for `production`, leave drafts disabled, and set the shared signing secret.

Filter:

```groq
coalesce(after()._type, before()._type) in ["article", "author"] && !(coalesce(after()._id, before()._id) in path("drafts.**")) && !(coalesce(after()._id, before()._id) in path("versions.**"))
```

Projection:

```groq
{"_id": coalesce(after()._id, before()._id), "_type": coalesce(after()._type, before()._type)}
```

The `before()` fallback preserves the deleted document's ID/type when an article is unpublished. Test unpublishing and author updates, not only article creation. The function validates Sanity signatures and triggers a build; errors return retryable responses. Never place the build-hook URL in the Studio or browser. [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks), [Netlify build hooks](https://docs.netlify.com/build/configure-builds/build-hooks/).

This initial webhook implementation does not maintain a distributed deduplication store. Every valid event may request a build; provider queuing/concurrency should be reviewed, and batching added if publishing volume grows. Do not claim build-storm prevention has been completed. Configure provider failure alerts for the actual administrator and test manual retry.

## 4. Contact and domain launch

Configure Netlify form submission notifications to `grupolebrop@gmail.com`. Submit a real test lead and confirm it arrives. Local preview deliberately does not pretend to send forms. The production form requires email; phone remains optional. Verify anti-spam behavior and agree lead retention with the owner.

Verify the domain, preserve all email DNS records, and configure the apex HTTPS domain as primary. The Netlify app-host redirect assumes `llsolucionesalternativas.netlify.app`; confirm the actual hostname. Deploy previews receive noindex headers through the build script. Configure preview access protection in Netlify if required; noindex does not make a preview private.

The old Pages deployment workflows are removed in this implementation to avoid exposing source or competing deploys. Existing GitHub Pages output remains on its last deployment until hosting is explicitly retired. Do not remove its DNS before the Netlify replacement is working. The prior page remains recoverable in Git history. Audit existing indexed URLs and add specific redirects before domain cutover.

## 5. Launch checks and rollback

Run `npm run verify`, verify mobile/desktop navigation and service filters, test form delivery, and demonstrate the father's write → preview → self-review → publish → rebuild flow. Confirm he can publish and unpublish, and that previews require authentication. Confirm public HTML/RSS/sitemap exclude drafts and privileged tokens. Test update and unpublish builds. Add repository branch protection requiring CI and Netlify preview checks.

Roll back bad public output through Netlify's previous healthy deploy. Restore incorrect CMS edits from document history before triggering another build. Test these steps with the owner. Set an export/asset backup cadence and administrator failure notifications. Search Console ownership, real photo collection, privacy/retention review, and field performance monitoring remain launch responsibilities.

## Implementation boundaries

CMS manages articles and authors in this first release. The eight verified service descriptions and business information are version-controlled; CMS editing of services/projects/settings and a real project portfolio are subsequent work. No fake articles, fabricated projects, testimonials, addresses, or metrics are published. The monogram and architectural illustration are original vector assets; the Manrope font uses its included OFL license. Branding legal clearance is not implied.
