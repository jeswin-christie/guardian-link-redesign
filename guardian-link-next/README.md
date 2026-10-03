# My Guardian Link — Next.js site

Full rebuild of myguardianlink.com in the new design system (centered big-type hero with rising shapes,
framed panels, kinetic type, floating pill nav). All copy, images and video come from the content bundle;
nothing has been rewritten — typos flagged in the bundle README are kept until the client approves fixes.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Next.js 16 (App Router, TypeScript), React 19, Lenis for smooth scroll. No other runtime dependencies.

## Font

Helvetica Neue is self-hosted from `app/fonts/` via `next/font/local` (Light 300, Roman 400 + Italic, Medium 500, Bold 700 + Italic, Heavy 800, Black 900), converted from the supplied OTF/TTF files to WOFF2 and subset to Latin. Headings use Bold, body Roman, labels Medium. Make sure the client holds a web-font licence for Helvetica Neue before launch; to swap fonts, change the `src` list in `app/layout.tsx`.

## Routes (23, all statically generated)

`/` · `/how-it-works/` · `/features/` (`#devices`, `#coverage-map`) · `/why-it-matters/` · `/who-it-protects/` ·
`/pricing/` · `/faq/` · `/support/` · `/about-us/` (`#partners`) · `/checkout/` · `/legal/` · `/account-deletion/` ·
9 policies via `app/[policy]` (privacy-policy, terms-of-use, end-user-license-agreement, refund-policy,
acceptable-use-policy, sms-calling-and-communication-terms, coverage-and-emergency-disclaimer,
child-guardian-consent-policy, sponsor-group-admin-acknowledgment).

The live site's 301 redirects are in `next.config.ts`. Titles, descriptions, canonicals and JSON-LD come from
`content/page-meta.json`.

## Where things live

| Path | What |
|---|---|
| `app/<route>/page.tsx` | Page content and section order |
| `components/PageHero.tsx` | Shared hero (blurred media, navy shapes, green headline, asterisk footnote) |
| `components/Motion.tsx` | All scroll/reveal motion — pages only add `data-*` attributes |
| `components/Interactive.tsx` | Auto accordion, FAQ, pricing toggle, checkout acknowledgment |
| `components/Overlays.tsx` | Video lightbox + Protect My Organization / Referral Group popups. Any `data-video="/media/video/x.mp4"` or `data-open="org"` element opens them |
| `components/PillNav.tsx` | Floating nav, mobile menu, chat prompt |
| `components/LegalDoc.tsx` + `content/legal/*.json` | Policy renderer with table of contents |
| `app/globals.css` | Design tokens (brand colours from `brand/colors.json`) and all styles |
| `public/media/` | Images and video from the bundle |

## Motion attributes

`data-reveal` fade-up · `data-split-words` word rise (use `<SplitWords>`) · `data-stagger` children in sequence ·
`data-reveal-img` clip reveal · `data-parallax-img` / `data-parallax="0.2"` parallax ·
`data-marquee="-1" data-speed="0.4"` scroll-driven giant type (use `<Giant>`) · `data-num="5800"` count-up ·
`data-hscroll-section` + `data-hscroll` pinned horizontal gallery. Everything respects `prefers-reduced-motion`.

## Open items to confirm with the client

- Typos from the live site ("Gaurdian", "Roadsite", "Immediatly", "befpre", "Whisper-to Text") are fixed; the support email domain is not.
- Support email domain is spelled `mygaurdianlink.com` on the live site.
- Pricing shows the visible live grid ($119.88/yr, "Save up to 50%"); the hidden grid disagrees.
- "Continue to Checkout" goes to the portal login once the box is ticked; swap in the real checkout URL.
