# My Guardian Link — Next.js site

Full rebuild of myguardianlink.com in the new design system (centered big-type hero,
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
`/pricing/` · `/faq/` · `/support/` · `/about-us/` (`#partners`) · `/download/` · `/legal/` · `/account-deletion/` ·
9 policies via `app/[policy]` (privacy-policy, terms-of-use, end-user-license-agreement, refund-policy,
acceptable-use-policy, sms-calling-and-communication-terms, coverage-and-emergency-disclaimer,
child-guardian-consent-policy, sponsor-group-admin-acknowledgment).

The live site's 301 redirects are in `next.config.ts`. Titles, descriptions, canonicals and JSON-LD come from
`content/page-meta.json`.

## Campaign pages: /students/ and /runners/

Two standalone landing pages (originally separate projects: `guardian-main.zip` and
`MyGuardianLink-Runners-main.zip`) now live inside this app. The **Students** and **Runners** boxes in
"Who It Protects" (home page and `/who-it-protects/`) link to them — see `AUDIENCES` in `components/Sections.tsx`.

Each one keeps its own design, fonts and CSS by having its **own root layout** (Next.js route groups),
so none of the main site's styles, nav, loader or chat leak into them, and vice versa:

| Route group | URL | Code | Assets |
|---|---|---|---|
| `app/(site)/` | the main website (all routes above) | `components/`, `app/globals.css` | `public/media/` |
| `app/(students)/students/` | `/students/` (college-parent page), `/students/guide/` | `components/students/`, `lib/students/`, `styles/students/` (README inside) | `public/students/assets/` |
| `app/(runners)/runners/` | `/runners/` | `components/runners/`, `lib/runners/site.ts` (README inside) — Tailwind v4, pre-compiled to `runners.css`; after changing Tailwind classes run `npm run css:runners` | `public/runners/images/` |

Notes: moving between the main site and these pages is a full page load (different root layouts). Unmatched URLs
use `app/global-not-found.tsx` (renders the main site's 404). The students page reads
`NEXT_PUBLIC_START_FREE_URL`, `NEXT_PUBLIC_PORTAL_URL`, `NEXT_PUBLIC_META_PIXEL_ID` — see
`components/students/env.example.txt`.

## Where things live

| Path | What |
|---|---|
| `app/<route>/page.tsx` | Page content and section order |
| `components/PageHero.tsx` | Shared hero (blurred media, white headline, asterisk footnote, next-step note under Get Protected Now) |
| `components/Motion.tsx` | All scroll/reveal motion — pages only add `data-*` attributes |
| `components/Interactive.tsx` | Auto accordion, FAQ, pricing toggle |
| `components/Overlays.tsx` | Video lightbox + Protect My Organization / Referral Group popups. Any `data-video="/media/video/x.mp4"` or `data-open="org"` element opens them |
| `components/PillNav.tsx` | Floating nav, mobile menu, chat prompt |
| `components/LegalDoc.tsx` + `content/legal/*.json` | Policy renderer with table of contents |
| `app/globals.css` | Design tokens (brand colours from `brand/colors.json`) and all styles |
| `public/media/` | Images and video from the bundle |

## Motion attributes

`data-reveal` fade-up · `data-split-words` word rise (use `<SplitWords>`) · `data-stagger` children in sequence ·
`data-reveal-img` clip reveal · `data-parallax-img` / `data-parallax="0.2"` parallax ·
`data-num="5800"` count-up ·
`data-hscroll-section` + `data-hscroll` pinned horizontal gallery. Everything respects `prefers-reduced-motion`.

## Design rules (reviewer pass, Oct 2026)

- **Nav:** How It Works · Pricing · FAQ · About Us · Log In · Get Protected Now.
- **Footer:** How It Works · Pricing · FAQ · About Us · Support + legal row. Features, Why It Matters and Devices are no longer linked from nav or footer (the pages still exist for old links and search).
- **Primary CTA** (`variant="cta"` / `.btn--cta`, `--cta` orange-red): every Get Protected Now button. Put `<NextStep />` under major ones.
- **One path to membership:** every Get Protected Now, plan button and Create Free Account goes to account setup in the portal via `lib/funnel.ts` (`getProtected('placement')`, `signupUrl()`) — never hard-code a URL. Name the placement (`cta`) so `components/CtaTracking.tsx` can report the click (`dataLayer` event `cta_click`) and carry ad parameters into signup. The nav "Pricing" link is the only way to the pricing page.
- **Availability labels** (Included / Future Release …) come from `lib/status.ts` — change a product's status there, not in page copy.
- **App store links:** `APP_STORE` / `GOOGLE_PLAY` in `lib/meta.ts`.
- **Prices:** `lib/plans.ts` is the only place plan prices and billing wording live (homepage preview, /pricing/). Annual prices always read "$X/month, billed annually at $Y". The /students/ page repeats the Group price in its own copy — update it there too.
- **App download:** `/download/` sends phones to their own store and shows both buttons on desktop; use it wherever one "download the app" link or QR code is needed.
- **Homepage order:** hero → problem → 4 use cases → one silent signal → 4 features → who it protects (6) → why it's different (5) → proof → pricing preview → final CTA. Proof cards use real assets only; add the founder card and real user quotes when the client supplies them (see the comment in `app/(site)/page.tsx`).
- **Green** (`--green`) is reserved for protected / verified / success: checkmarks, the "911 gets clear information" step. Don't use it for buttons, headlines, links or stats.
- **No giant decorative type** and no logo inside sections — logo lives in the page header (hero) and footer only.
- **911 disclaimer:** always use `DISCLAIMER`, `DISCLAIMER_911`, `DISCLAIMER_RESPONSE` from `lib/meta.ts` — never retype it.

## Open items to confirm with the client

- Typos from the live site ("Gaurdian", "Roadsite", "Immediatly", "befpre", "Whisper-to Text") are fixed; the support email domain is not.
- Support email domain is spelled `mygaurdianlink.com` on the live site.
- Pricing shows the visible live grid ($119.88/yr, "Save up to 50%"); the hidden grid disagrees.
