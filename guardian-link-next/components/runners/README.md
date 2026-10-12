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
| `partner` | `{ name, logo }` — the partner's logo replaces the My Guardian Link logo at the top of the hero; the footer keeps the small My Guardian Link logo. `null` = MGL only. Currently SRSE Sports (`public/runners/images/partners/srse-sports.png`, client proof 2026-10-12). |
| `links.*` | CTA destinations (client proof, 2026-10-12): `portal` = https://portal.myguardianlink.com/org/FALL50 ("Go to User Portal"); `getProtected`, `activation`, `roadside` = https://portal.myguardianlink.com/app?group=FALL50 (every "Set Up…" / "Activate…" button and the QR code); `website`. |
| `displayUrl` / `displayPortalUrl` | URL text printed on the page. |
| `groupCode` / `eventName` | Used in the race check-in example and setup line. |

## Structure

- `src/app/page.tsx` — section order
- `src/components/sections/*` — one file per section (Hero, WhyItMatters, RealRisks, SeeSomething, EverydayUse, Roadside, SetupSteps, FinalCta, Footer, MobileCtaBar)
- `src/components/ui/*` — Button, Container, Logo
- `src/app/globals.css` — design tokens (colors, fonts)

Photos in `public/images/` are from Pexels/Unsplash (free commercial license).
