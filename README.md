# GitHub Pages deployment

This repository is configured to publish the static site contained in the `wwwroot` folder to GitHub Pages using a GitHub Actions workflow.

## How it works
- The workflow at `.github/workflows/pages.yml` runs on pushes to `main`.
- It uploads the `wwwroot` folder as the Pages artifact and then deploys it via the official Pages actions.

## Notes
- Place your site files (HTML, CSS, JS, assets) inside `wwwroot`.
- If you use a custom domain, add a file named `CNAME` inside `wwwroot` containing your domain.
- A `.nojekyll` file is already present in `wwwroot` to prevent Jekyll processing.

## Preview locally
Run a quick local server from the repo root:

```powershell
python -m http.server 8000 --directory .\wwwroot
```

## After push
- On the first successful run GitHub Pages will publish a site and show the URL in the repository's Pages settings or in the Actions run logs.
