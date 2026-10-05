# Dependency review

The public website dependency audit had no reported vulnerabilities during implementation. The Sanity Studio toolchain has a remaining upstream `braces` stack-exhaustion advisory through CLI/code-generation glob dependencies. Its inherited parent findings do not represent separate root causes. These dependencies are in the separate Studio package, not the public site's runtime.

Compatible parser/UUID/PostCSS overrides are pinned in `studio/package.json`; Studio type-check and build must pass after each dependency update. Audit both lockfiles before launch. Do not run the Studio CLI on untrusted source trees or attacker-controlled glob patterns. The first release does not enable code generation or accept visitor-controlled glob input. This limits the relevant input surface; it does not establish that the upstream vulnerability is fixed.

The audit-suggested forced Sanity downgrade was evaluated and produced additional findings, so the current release is retained. Revisit the upstream advisory and remove overrides once provider dependencies include compatible fixes. Treat this as a recorded toolchain limitation when deploying the editor, rather than claiming all dependency findings are resolved.
