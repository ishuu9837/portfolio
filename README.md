# Y Eswar — editorial portfolio

A responsive Next.js portfolio closely matching the artwork, typography, paper textures and editorial layout of the requested reference, https://anzalabidi.dev. It uses Y Eswar's own profile, projects, portrait, logo and contact information.

## Run

Node.js 20.9+ and pnpm are required.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. For a production export:

```sh
pnpm build
python3 scripts/preview.py
```

Stop an existing server on port 3000 before starting another. `pnpm typecheck` checks TypeScript. The static export uses directory URLs (`trailingSlash: true`) and is written to `out/`.

## Content and components

- `app/content.ts`: projects, skills, education, work history, certifications, contact details.
- `app/page.tsx`: the homepage and chronological journey.
- `app/site-chrome.tsx`: shared header, theme, keyboard search, mobile drawer, contact copy and interaction sounds.
- `app/art-gallery.tsx`: seven paintings with a crossfade switcher and artist captions.
- `app/companion.tsx`: animated companion and section shortcuts, with a still-image reduced-motion fallback.
- `app/projects/[slug]/page.tsx`: six static project case studies.
- `app/research/page.tsx`: ongoing histopathology research notes.
- `app/resume/page.tsx`: résumé with print/save-as-PDF support.
- `app/globals.css`: responsive styling and personalization.
- `app/reference.css` and `app/ornaments.ts`: reference-derived visual treatment and decorative assets.

The first three project cards contain real website previews. Projects without live previews follow them, with conceptual illustrations. Contact and paper requests open the visitor's email app. No backend, analytics or credentials are required. The site defaults to day mode and remembers an explicit theme choice. Search opens with Cmd/Ctrl+K and supports keyboard navigation. Sound is off until explicitly enabled.

## Assets and rights

See `docs/reference-assets.md` for the reference capture, asset provenance and personalization decisions. The reference website's terms and asset rights continue to apply to reused artwork and custom assets. Portrait and logo are supplied by the user. No reference author's biography, booking calendar, contact accounts or analytics integrations are included.

The previous island edition remains in the original moved project folder. This revised working copy is in `/Users/ishuu/Downloads/ishuu/eswar-portfolio`.

## Deployment and verification

`pnpm build` creates a static `out/` directory. Hosting is not updated by a local build. The existing private Sites project metadata is retained in `.openai/hosting.json`; publication requires a separate deployment.

SEO uses the supplied `ishuu.me` domain. Connecting that domain remains a separate DNS/hosting action.

`design-qa.md` records visual comparisons and browser checks. Evidence lives in `qa-results/`. Historical Lighthouse results from the island/earlier editions do not apply to this reconstruction.
