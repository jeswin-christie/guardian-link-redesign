# myGuardianLink — College Parent landing page

The landing page for the **Facebook college-parent campaign**. It is not a
corporate homepage: one audience (parents of college students), one offer
(the Parent Plan, 3 people — $24.99/month), one primary action (**START FREE**).

Built with Next.js (App Router), converted from the original static
HTML/CSS/JS page on 2026-10-06. The page is fully static (prerendered at
build time); its behaviour — opening scene, tracking, FAQ line setting,
phone dock, motion layer — is the original vanilla JS, run once after React
hydrates (`components/PageScripts.tsx`). The static version is in git
history (commit `3863b1d`).

The client brief, photography and draft copy are in
`guides/mgl_parent_vercel_v2/`; the brand rules are the *myGuardianLink Brand
Guidelines* PDF. The design spec is
`docs/superpowers/specs/2026-09-11-college-parent-landing-design.md`.

## Running it

```
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

## Before launch — must be replaced

| What | Where |
|---|---|
| **Offer terms** (optional) — what the parent pays today, when billing begins, what "free" means | Not shown on the page: the "To confirm" rows were removed at the user's request (2026-09-14), and "How Start Free Works" now states only the client's confirmed terms. If the company supplies these, add them as tiles in `components/sections/Plan.tsx`. |
| START FREE destination | Goes to the portal login page, https://portal.myguardianlink.com/login (user, 2026-10-06), with the ad's UTM / fbclid added. For a dedicated checkout, set `NEXT_PUBLIC_START_FREE_URL` (see `.env.example`); one setting updates every START FREE button. |
| Member-portal link (tapping the QR code in setup step 4) | Goes to `https://myguardianlink.com/download/` (sends each phone to its app store). `NEXT_PUBLIC_PORTAL_URL` overrides it. |
| Meta Pixel ID | `NEXT_PUBLIC_META_PIXEL_ID`. Empty = no pixel loads. See *Conversion tracking* below. |
| QR code (setup step 4, the download card) | Points to `https://myguardianlink.com/download/` (Oct 2026). Regenerate with segno if the link changes. |
| Demo video link | `components/students/sections/Demo.tsx` → `/media/video/demo.mp4` (the main site's demo). With a real player, fire the Video View event on play (see `lib/behaviour/main.js`). |
| Social proof | Removed (Oct 2026) until real, approved testimonials exist — never invented ones. |
| Free guide page | Not linked from the landing page since 2026-10-06 — reachable only at `/guide`. The guide page, `/guide` (`app/guide/page.tsx`), is built **only from myguardianlink.com's own wording** (Home, How It Works, Why It Matters, Features, FAQ, Who It Protects) — the site has no guide of its own. Each block in the file names its source page. If the website's wording changes, update the guide to match. |
| Share image URL | `NEXT_PUBLIC_SITE_URL` — the page's `https://` address, so `og:image` is absolute for Facebook (on Vercel the production URL is used if unset) |

## Page order

The company's recommended paid-traffic flow (feedback, 2026-09-13), followed
as written since 2026-09-14:

| # | Section | id |
|---|---|---|
| 0 | Opening scene — campus at dusk; opens by itself after ~2 seconds | — |
| 1 | Hero — *Protection She Deserves.* | `#top` |
| 2 | Trust strip — Live Human Response · Precise Location · Trusted Contacts · 911 Escalation When Needed | — |
| 3 | 60-second demo — See Protection in Action | `#demo` |
| 4 | Why parents need it — a direct link | `#her` |
| 5 | Parent reassurance | `#parents` |
| 6 | How it works (the one workflow explanation) | `#how` |
| — | Social proof (hidden until real) | `#stories` |
| 7 | The Parent Plan + How Start Free Works | `#plan`, `#offer` |
| 8 | Family setup | `#setup` |
| 9 | 911 support | `#with-911` |
| 10 | Parent questions (FAQ) | `#faq` |
| 11 | Final CTA — Start Free | `#start` |

## Conversion tracking

The funnel the company asked for, and where each step is measured:

| Step | Fired by | dataLayer event | Meta event |
|---|---|---|---|
| Landing Page View | this page, on load | `landing_page_view` | `PageView` |
| Video View | this page, click on the demo video | `video_view` | `VideoView` (custom) |
| CTA Click | this page, any START FREE (with `cta_location`) | `cta_click` | `StartFreeClick` (custom) |
| Checkout Start | **the checkout page (GHL)** | — | `InitiateCheckout` |
| Purchase | **the checkout page (GHL) + Conversions API** | — | `Purchase` |
| Group Plan Activation | **the app / backend, via Conversions API** | — | custom, e.g. `GroupPlanActivated` |

Also tracked here: See Protection in Action clicks (`demo_click`) and the
portal button (`portal_click`). The guide page fires `guide_page_view`.

How it fits together:

- Every event is pushed to `window.dataLayer` (for GTM or GHL) and, once
  `META_PIXEL_ID` is set, sent to the Pixel with an `event_id`. Send the same
  id from the Conversions API for the same event and Meta de-duplicates the
  pair.
- The ad's `utm_*` and `fbclid` parameters are kept for the visit and added
  to the START FREE and portal links, so GHL can attribute the purchase to
  the ad.

Before meaningful ad spend: open Meta Events Manager → *Test events*, load
the page from a test link with `?utm_source=facebook&fbclid=test`, click
through to a test purchase, and confirm each step arrives once — from both
the Pixel and the Conversions API, de-duplicated — and that GHL shows the
UTM source on the contact.

## Where to change what

| I want to change… | Edit |
|---|---|
| Any text | `components/sections/` — one file per section, in page order in `app/page.tsx`, each headed by an ALL-CAPS comment |
| A brand colour or spacing | `styles/styles.css`, the `:root` tokens at the top |
| A photo | replace the file in `public/assets/img/campaign/` (same name) |
| Launch links, Pixel ID, share URL | environment variables — `.env.local` or the host's settings; see `.env.example` |
| Title, description, share tags | `app/layout.tsx`, `metadata` |
| The guide's text | `app/guide/page.tsx` — website wording only, never new copy; each block names its source page |
| The opening scene | `components/Gate.tsx`, `styles/intro.css`, `lib/behaviour/intro.js`, and the gate script in `app/layout.tsx` |
| Remove the opening scene | delete `<Gate />` in `app/page.tsx`, the gate script in `app/layout.tsx`, the `intro.css` import and `initIntro()` in `components/PageScripts.tsx` |
| The scroll animations (reveals, drawn lines, pulses, parallax, FAQ easing, and — 1024px and wider — the hero's scroll transition: the copy steps back, the navigation bar slides away while the photo widens leftward to fill the whole screen (it returns just before the page moves on), and the tagline "Get connected. Stay protected." writes itself in over its left side on a navy shade; the words are `REVEAL_LINES` in `lib/behaviour/motion.js`) | `styles/motion.css` + `lib/behaviour/motion.js`. Layer only — no content lives there. Off automatically for visitors who prefer reduced motion. To remove: delete the `motion.css` import in `app/layout.tsx` and `initMotion()` in `components/PageScripts.tsx` |

## Decisions that differ from the draft, and why

The brief allows changes as long as the reason is clear. Each one:

### From the company's conversion feedback (2026-09-13)

1. **No menu in the header.** Paid traffic should not be offered ways off
   the conversion path. The header is the logo, *See Protection in Action*
   (on wide screens) and START FREE; phones show the logo and START FREE.
   (The draft's full menu was tried on 2026-09-13 at the user's request and
   taken out again on 2026-09-14, following this feedback as written.)
2. **Trust strip under the hero**, with the company's four proof points,
   word for word.
3. **The demo straight after the trust strip**, so parents see how it
   works before scrolling. (It spent 2026-09-13 at the foot of the page at
   the user's request; back here since 2026-09-14.)
4. **"How Start Free Works" under the Parent Plan card** lays out the offer
   in five tiles, all in the client's own words: the plan ($24.99/month for
   3 people — $8.33 each), Try It Free, 30-Day Refund Policy, Cancel
   Anytime, No Long-Term Commitment. The hero fine print links to it.
   (Removed briefly on 2026-09-13, restored 2026-09-14. The company's rows
   for what is paid today, when billing begins and what "free" means had no
   confirmed answers; their "To confirm" placeholders were removed at the
   user's request on 2026-09-14.)
5. **One explanation of the workflow.** The five-step "What happens during
   an activation" section and the 911 section's response chain repeated How
   It Works and were removed. At the user's request (2026-09-13) its five
   steps — Activate → Identify → Locate → Connect → Escalate — and its
   closing line now fill How It Works, word for word, in place of the
   three-step version (She Activates → We Connect → We Escalate), so the
   page still explains the workflow once. The 911 copy itself is unchanged.
6. **Parent Questions FAQ** immediately before the final CTA, the company's
   seven questions and answers word for word (brand name per the style
   guide).
7. **Social proof slot, hidden.** Nothing is shown until real evidence
   exists; no invented quotes or numbers.
8. **One CTA wording, one destination.** Every START FREE carries
   `data-cta="start"` and goes to `START_FREE_URL`. Since 2026-09-14, at the
   user's request, there are three: the header, the hero and the final CTA.
   Those after the demo, the direct-link section and the reassurance band,
   and on the Parent Plan card were removed. The phones' bottom dock went
   with them and was restored the same day at the user's request: on phones
   and tablets it slides up once the hero's START FREE has scrolled away,
   and hides again at the final CTA.
9. **Mobile download is a tap.** A phone can't scan its own screen, so the
   QR code in setup step 4 is a link: tapped, it goes to the member portal
   (`PORTAL_URL`); scanned from a desktop, to the link it encodes. Since
   2026-09-14 it sits in the client's download card ("Scan or Tap to
   Download", group code PARENTPLAN), which replaced the phones' *Continue
   to Download* button. Steps 1–3 sit in white boxes at every width, each
   number beside its box; on desktop they stand down the left with the
   card beside them on the right.
10. **Conversion tracking** — see above.
11. **The free guide link was removed from the landing page** (user,
    2026-10-06; it had sat below the final CTA). The final CTA is now the
    last section before the footer. The guide page itself, `/guide`, still
    exists but nothing on the landing page links to it.
12. **Section backgrounds re-alternated** for the new order (white, navy,
    soft grey) so no two neighbouring sections share a colour.

### From the original build

1. **START FREE is Confirmation Green, not orange.** The Brand Guidelines
   assign "CTA buttons" to Confirmation Green, and the guide's own *Brand in
   Action* example is a green button on navy. Orange stays where the guide
   puts it — the shield, icons and accent labels.
2. **Fonts and colours follow the style guide.** The draft used
   Georgia/Arial and off-brand `#062b59` / `#ef4c08`. The page uses Roboto
   Slab ExtraBold headlines, PT Sans body and subheads, Guardian Navy
   `#102A43`, Navy `#074f78` headings, Accent Orange `#ec7426`. Urgent Red is
   not used: nothing on a page about confidence is a true emergency.
3. **The opening scene opens by itself — no ENTER button.** The brief
   asked for an ENTER CTA; it was removed at the user's request
   (2026-09-13). The logo and headline rise in, hold for about two seconds
   (`HOLD` in `lib/behaviour/intro.js`), and the doors part on their own. A scroll,
   swipe, tap or key opens them sooner. It plays on every load and refresh;
   the one exception is a visitor arriving on a `#section` link from
   elsewhere — they asked for that section.
4. **"See What's Next →" was removed.** Brief item 5 allows two CTA labels:
   START FREE and SEE PROTECTION IN ACTION (plus the phones' download
   button above).
5. **The Parent Plan photo is large, not a small circle.** Brief item 4 asks
   for large photography, so photo 3 ("The Parent Plan photo") fills a full
   panel of the plan card instead of the draft's 190px circle.
6. **The closing headline is "Give her peace of mind. Give yourself
   confidence."** The draft's "When danger finds you, so do we" leads with
   fear at the moment of purchase (brief item 11). The new line is the
   draft's own.
7. **The hero carries only the four first-ten-second messages.** The
   draft's hero paragraph moved, word for word, to the "direct link"
   section, and the "Strengthens, Complements & Supports 911" line is in the
   footer.
8. **The phone layout is designed separately.** The headline sits over the
   photo so headline, the four features, the price and START FREE land in
   the first screen.
9. **"No tails" is handled in code.** Headlines balance their lines
   (CSS `text-wrap: balance`), and the last two words of every paragraph are
   tied together (`lib/behaviour/main.js`), so no word is left alone on a line.
10. **Brand name written "myGuardianLink"**, as in the Brand Guidelines.
11. **Everything else is the draft's copy, word for word**, checked line by
    line against `guides/mgl_parent_vercel_v2/index.html`. Each photo sits
    where the guides assign it: 1 opening scene, demo and closing section;
    2 hero; 3 Parent Plan; 4 the "direct link" section.
12. **Paragraphs are justified** (client request), with no hyphenation —
    words are never split across lines (user, 2026-09-14). To undo, delete
    the "Justified paragraphs" block near the top of `styles/styles.css`.
13. **White logo on navy.** The client's white mark (`public/assets/logo-white.png`)
    is used on the opening scene, the navy header and the footer.

## Structure

```
app/layout.tsx          <html>/<head>: metadata, fonts (next/font), CSS, pre-paint gate script
app/page.tsx            the page: sections in order
app/guide/page.tsx      the Free Prevention & Readiness Guide (/guide): all its copy, printable
components/             Gate, Header, Footer, Dock, IconSprite (+ <Icon>), PageScripts
components/sections/    one file per page section — all the copy lives here
styles/styles.css       tokens + page styles (mobile-first)
styles/intro.css        opening scene
styles/motion.css       motion layer
styles/guide.css        guide page only (g- classes), incl. its print layout
lib/behaviour/intro.js  opening scene behaviour
lib/behaviour/main.js   launch settings, attribution, tracking, no-tails, FAQ line setting, reveal, dock, smooth anchors
lib/behaviour/motion.js motion layer behaviour
public/assets/          logo.png (favicon), logo-white.png, img/campaign/ (photos, og-image.jpg, qr-app.svg)
.env.example            launch settings
tools/make-qr.py        regenerates the QR code
guides/                 client brief, draft and source photos
docs/                   design specs
```

The page is static markup that React renders once and never updates; the
scripts in `lib/behaviour/` change the DOM afterwards (wrapping the hero,
re-setting FAQ lines), exactly as on the static page. Keep it that way: no
React state in the page components, or React and the scripts would fight
over the same elements. While `npm run dev` is running, an edit hot-reloads
the section you changed but not the scripts — reload the page to see the
behaviour again.

`AGENTS.md` and `CLAUDE.md` are written by `next dev` itself.

`public/assets/img/` also still holds the photos from the earlier corporate
homepage. Nothing references them; delete them if you want a smaller upload.

## Deploying

**Vercel** (recommended): import the repository. `vercel.json` sets the
framework to Next.js — the project was first set up for the old static page,
and without it Vercel serves the files unbuilt and shows 404 NOT_FOUND.
Set the environment variables from `.env.example` in the project settings.

**Plain static host** (cPanel, Netlify drop): add `output: 'export'` to
`next.config.ts`, run `npm run build`, and upload the `out/` folder.
Environment variables must be set before the build — they are baked in.

Fonts are self-hosted by `next/font`; the page has no external dependency.
