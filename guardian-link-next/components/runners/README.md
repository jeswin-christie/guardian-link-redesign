# My Guardian Link — Runner Landing Page

Generic, conversion-focused landing page for runner influencers (Next.js 16, App Router, Tailwind v4).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Re-branding for an influencer

Everything per-influencer lives in `src/config/site.ts`:

| Field | What it does |
|---|---|
| `partner` | `{ name, logo }` — shows the influencer's name/logo next to the My Guardian Link logo (hero + footer). `null` = MGL only. Put logo files in `public/images/partners/`. |
| `links.*` | CTA destinations on myguardianlink.com: `portal` (User Portal login — "Go to User Portal" + QR code), `getProtected` (/pricing/ — "Set Up…" buttons), `activation` (/features/#devices), `roadside` (/pricing/ Roadside Assistance), `website`. |
| `displayUrl` / `displayPortalUrl` | URL text printed on the page. |
| `groupCode` / `eventName` | Used in the race check-in example and setup line. |

## Structure

- `src/app/page.tsx` — section order
- `src/components/sections/*` — one file per section (Hero, WhyItMatters, RealRisks, SeeSomething, EverydayUse, Roadside, SetupSteps, FinalCta, Footer, MobileCtaBar)
- `src/components/ui/*` — Button, Container, Logo
- `src/app/globals.css` — design tokens (colors, fonts)

Photos in `public/images/` are from Pexels/Unsplash (free commercial license).
