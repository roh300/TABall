Fancy Tables — Multiplication Tables 2–100

What this does
- Single-page app to generate a multiplication table for any number between 2 and 100.
- Beautiful UI and print/PDF-friendly styles.

Files
- index.html — main page
- styles.css — styling and print rules
- script.js — generation and print logic

New pages
- squares.html / squares.js — show squares up to n with step-by-step multiplication explanation
- cubes.html / cubes.js — show cubes up to n with step-by-step multiplication explanation
- roots.html / roots.js — compute square and cube roots and show Newton-Raphson iteration trace

How to run
1. Open `index.html` in your browser (double-click or open via "File > Open").
2. Enter a number (2–100) and click Generate or press Enter.
3. Click "Print / Save PDF" to open the print dialog. Choose "Save as PDF" in your OS print dialog.

Notes
- Print CSS hides input controls for a clean PDF.
- I included quick chips for 2–12; you can modify `script.js` to change that range.

Next steps (optional)
- Add ability to generate multiple selected tables at once (2,3,4...) and layout across pages.
- Add ability to choose range (1–20), number of columns for print, or include decorative headers/footers per page.

Deployment

This is a static site (HTML/CSS/JS). You can deploy it easily:

1) GitHub Pages (recommended)
 - Create a new GitHub repository and push this project to it.
 - The repository already contains a GitHub Actions workflow at `.github/workflows/deploy.yml` that will publish the repo root to GitHub Pages whenever you push to `main` or `master`.
 - Quick commands (PowerShell):

```powershell
cd 'd:\UDEMY-WEB\TABall'
git init
git add .
git commit -m "Initial site"
# create repo on GitHub (via web) and then:
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

 - After pushing, GitHub Actions will run and publish to GitHub Pages using the repository's `GITHUB_TOKEN`. Check the Actions tab for status. Your site will be available at `https://<your-user>.github.io/<your-repo>/` (or repository Pages URL).

2) Netlify
 - Drag-and-drop the project folder to Netlify's Deploys page, or connect your GitHub repo in Netlify and set the build/publish directory to `/`.

3) Vercel
 - Connect your Git repo to Vercel and deploy as a static site. Use the root as the output directory.

4) Local testing
 - Quick local server (Python 3):

```powershell
cd 'd:\UDEMY-WEB\TABall'
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes about the included workflow
 - The Action uses `peaceiris/actions-gh-pages` to publish the repository root. This works for static sites with `index.html` at the root.
 - If you want the site on a custom domain, add a `CNAME` file at the repo root and configure DNS.

If you want, I can:
 - Create a small GitHub Actions workflow that only publishes a `dist/` folder if you prefer building first.
 - Add a one-click Netlify & Vercel deploy button to README.
