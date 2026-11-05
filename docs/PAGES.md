# GitHub Pages · koko-hangul PREVIEW

Target live URL (after merge to `main` + LIVE): https://justinksw.github.io/koko-hangul/

## PREVIEW deployment (current)

This site is built from branch **`preview-koko-hangul-v1`**, not `main`.

### Automated (recommended)

Workflow: [`.github/workflows/pages-preview.yml`](../.github/workflows/pages-preview.yml)

On push to `preview-koko-hangul-v1`, GitHub Actions deploys the repo root (static HTML/CSS/JS + `data/hangul.json`) to GitHub Pages.

**Jessie / repo admin — one-time Settings check:**

1. GitHub → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions** (not “Deploy from a branch” unless you prefer manual)
3. After the first workflow run succeeds, the preview URL should be `https://justinksw.github.io/koko-hangul/` while Pages is fed from the preview branch workflow.

If the org requires **Deploy from a branch** instead of Actions:

- Set branch to **`preview-koko-hangul-v1`** / **`/` (root)**
- Disable or ignore the Actions workflow to avoid double deploys.

### Local preview

```bash
cd /path/to/koko-hangul
python3 -m http.server 8080
# open http://localhost:8080/  (table at /table/)
```

Project Pages base path `/koko-hangul/` applies only on `*.github.io`; local root `/` is fine for layout checks.

## Going LIVE (later)

1. Justin visual OK on PREVIEW
2. Merge PR to `main` (separate LIVE handoff — do **not** merge PREVIEW until approved)
3. Point Pages build to `main` (or merge preview branch and switch workflow branch)
4. Remove or hide PREVIEW banner only when explicitly going LIVE

## Data

- Source YAML: `briefs/substance-hangul-v1.yaml`
- Runtime JSON: `data/hangul.json` (generated from YAML; regenerate if substance changes)

Regenerate:

```bash
python3 scripts/yaml-to-json.py
```

(or copy the inline Python from the initial import commit)
