# 5W Marketing Lead Gen — five interface concepts

A local, navigable frontend prototype for exploring five visual directions for the same CRM and marketing platform. It uses shared simulated data and does not connect to the original application's backend.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`. To verify the production bundle, run `npm run build` and `npm run preview`.

If your shell cannot keep an npm development script running, start Vite directly with `node ./node_modules/vite/bin/vite.js --host 127.0.0.1`.

Run `npm run test:routes` to render and check every nested route in all five concepts.

## Share briefly with GitHub Pages

The app opens on a password screen before showing the comparison or any of the five concepts. The password is represented by a SHA-256 hash in `src/preview-gate.tsx`; the text is not committed. A successful login lasts for the current browser tab. This is a **visual gate in client code**: GitHub Pages still publishes the JavaScript and mock data publicly, and someone technically inclined can bypass it. Use it only for this short-lived prototype, not for private data.

1. This checkout already points to `https://github.com/LuisVMendoza/MarketingLeadGen.git`. GitHub Free requires a public repository for Pages. In this project directory, run:

   ```bash
   git add .
   git commit -m "Prepare GitHub Pages preview"
   git push origin main
   ```

2. In the repository, open **Settings > Pages > Build and deployment**, and set **Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the app after every push to `main`.
3. After the action succeeds, open `https://LuisVMendoza.github.io/MarketingLeadGen/`. Enter the preview password to reach the comparison page. Navigation uses URL hashes (`#/v1/`, `#/v2/`, and so on), so every concept can be opened and refreshed on GitHub Pages.
4. When the review ends, disable Pages in repository settings or delete the repository. Previously downloaded files and screenshots cannot be recalled.

The build uses the repository name as Vite's asset base path. Local `npm run dev` keeps normal browser routes. The published page also asks search engines not to index it, but that request does not make it private.

## Explore

The home page at `/` compares all five concepts with visual previews, palettes, descriptions, and navigation patterns.

| Route  | Concept                        | Navigation                                                                    |
| ------ | ------------------------------ | ----------------------------------------------------------------------------- |
| `/v1/` | Operations Console             | Visible service categories, search, favorites, and searchable all-tools panel |
| `/v2/` | Modern Relationship CRM        | Compact rail, contextual menu, command palette, and prominent workflow canvas |
| `/v3/` | Campaign Creative Studio       | Production workbench, module tabs, and campaign inspector                     |
| `/v4/` | Revenue Command Center         | Compact sidebar, energetic revenue dashboard, and contact drawer              |
| `/v5/` | Immersive AI Marketing Network | Subdued ambient network, integrated copilot, floating dock, and full menu     |

Every version has nested routes for `dashboard`, `contacts`, `contacts/contact-001`, `companies`, `segments`, `tags`, `new-biz-intake`, `media-pitch`, `campaigns`, `automations`, `email-templates`, `funnels`, `forms`, `sites`, `reports`, `traffic`, `conversions`, `paid-ads-utm`, `paid-ads-analytics`, `integrations`, and `settings`. Settings also has `/settings/notifications`, `/settings/billing`, and `/settings/security`.

## Try the interactions

- Search and filter contacts; switch among table, cards, kanban, and timeline views.
- Open contact profiles. In v4, selecting a contact opens a contextual drawer first.
- Add a contact, simulate CSV import, and create segments, campaigns, and automations.
- Change the active site and reporting period; navigate through tabs and menus.
- Connect or disconnect integrations, edit a template, connect a site, and change settings.
- Open the all-tools menu, use the command palette, and try the mobile navigation.
- The AI copilot and New Biz Intake show simulated responses, loading, and confirmation states.

All changes stay in browser memory for the current session. The CSV flow uses a selected filename and creates three preview contacts; it does not parse or upload the file. Email delivery, integrations, analytics, and AI responses are simulated.

## Project structure

- `src/data.ts`: shared mock contacts, companies, sites, campaigns, workflows, analytics, and navigation metadata.
- `src/app.tsx`: routing, shared in-memory state, modals, drawers, command palette, and toasts.
- `src/layouts.tsx`: five independent navigation structures.
- `src/pages.tsx`: functional screens and charts.
- `src/*.css`: design systems, component styles, overlays, and responsive layouts.

The attached crawler material was used to understand the original platform's information architecture and relationships. The UI, styling, and implementation here are new.
