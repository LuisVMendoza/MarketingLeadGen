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

## Share for a few days with a password

GitHub Pages does not provide password protection for a normal project site. Keep the source in a **private GitHub repository** and deploy it through **Cloudflare Pages**. This project includes a Pages middleware that requires HTTP Basic authentication before serving routes or static assets. The login name is `preview`; choose your own password. Do not put the password in the repository or in a Vite environment variable.

1. Create an empty **private** repository on GitHub. In this project directory, run:

   ```bash
   git add .
   git commit -m "Prepare private preview"
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git push -u origin main
   ```

2. In [Cloudflare Workers & Pages](https://dash.cloudflare.com/), select **Create application > Pages > Connect to Git**, and select that repository. Set production branch to `main`, build command to `npm run build`, and output directory to `dist`. The first deployment will return 503 until the password is configured.
3. In the new Pages project, open **Settings > Variables and Secrets > Add**. Create `SITE_PASSWORD`, enter a strong temporary password, select **Encrypt**, and save it for the **Production** environment. Redeploy the project so the secret takes effect. If you share a preview branch URL too, configure the same secret for the **Preview** environment.
4. Open the production `*.pages.dev` URL in a private browser window. The browser should request username `preview` and your password. Test a nested route and an asset URL without signing in; both should be denied. Share only the URL, username, and password with the intended reviewers.
5. When the review ends, delete the Cloudflare Pages project to remove the hosted site. The GitHub repository can remain private or be deleted separately.

The explicit `public/_routes.json` makes the authentication middleware run on every request, including JavaScript and CSS assets. If `SITE_PASSWORD` is missing, the site refuses to serve content. Local Vite development remains password-free. Run `npm run test:auth` to check this behavior.

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
