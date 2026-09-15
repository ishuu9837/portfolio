# Y Eswar Portfolio

React and Vite portfolio site, configured for deployment as a static Vercel site.

## Deploy to Vercel

1. Import this repository into Vercel. The checked-in `vercel.json` builds the client with `pnpm vite build` and publishes `dist/public`.
2. Copy `.env.example` values into **Project Settings → Environment Variables** if the portfolio images are stored in the Forge/Manus storage service. `BUILT_IN_FORGE_API_KEY` is used only by the Vercel serverless proxy and must not use a `VITE_` prefix.
3. Deploy. The rewrite rules preserve client-side routes and proxy `/manus-storage/*` asset requests without exposing the storage key to browsers.

Analytics is optional. Set both `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` to enable Umami; otherwise no analytics script is loaded.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run the production checks with:

```bash
pnpm check
pnpm build
```
