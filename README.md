# 5W Marketing Lead Gen

A local, navigable design prototype for the 5W marketing workspace. The current direction focuses on one professional interface, developed from the earlier V2 concept. It includes mock contacts, campaigns, workflows, analytics, and settings; it does not connect to a production backend.

## Run locally

Requires Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173/`. If the npm development script cannot run in your shell, start Vite directly with `node ./node_modules/vite/bin/vite.js --host 127.0.0.1`.

Run `npm run build` to verify the production bundle and `npm run test:routes` to check the workspace routes.

## Explore

The root URL opens the dashboard after the password screen. The narrow category rail selects a section, while the adjacent panel shows its tools and quick links. **All tools** opens the full module list, including less frequently used screens.

The dashboard includes lead metrics, a performance chart, contacts needing attention, active campaigns, and a workflow canvas. Each module has mock interactions such as filtering, creating a draft, editing a contact, changing settings, or switching the active site. Changes remain in browser memory for the current session.

## GitHub Pages

The repository has a GitHub Actions workflow at `.github/workflows/deploy.yml`. Pushing to `main` builds the app and deploys it to `https://luisvmendoza.github.io/MarketingLeadGen/`. Navigation uses hash routes such as `#/v2/automations` so module links work on GitHub Pages.

The password screen is a visual gate implemented in client code; it is suitable for design review with mock data. The repository and published JavaScript are public. The document asks search engines not to index the page, but this does not make it private.
