import type { Metadata } from 'next';

import Footer from '@/components/students/Footer';
import Header from '@/components/students/Header';
import IconSprite, { Icon } from '@/components/students/IconSprite';
import PageScripts from '@/components/students/PageScripts';

import '@/styles/students/guide.css';

/* ==========================================================================
   FREE PREVENTION & READINESS GUIDE — /students/guide/
   The landing page's "Get the Free Prevention & Readiness Guide" link opens
   it. myguardianlink.com has no guide of its own (checked 2026-10-06).

   ALL CONTENT IS THE CLIENT'S OWN WORDING, from myguardianlink.com (user,
   2026-10-06: "only the information should come from the website", no
   ideas of our own). Each block notes its source page. Changes made:
   - Brand name written "myGuardianLink" (style guide), as on the landing page.
   - Spelling only: "Gaurdian Links" → myGuardianLink, "activcation" →
     activation, "Clear answer" → "Clear answers"; capitals in two headings
     ("What You Need To know", "protection that starts…").
   - Lines using "help" / "safety" / "safely" were left out where the site
     says the same thing without them (user's wording rule, 2026-10-06).
   - Nothing added: the only new words are the page's labels ("In this
     guide", "Free Guide").
   ========================================================================== */

export const metadata: Metadata = {
  alternates: { canonical: '/students/guide/' },
  title: 'Free Prevention & Readiness Guide — myGuardianLink',
  description: 'Be Ready. Be Protected. Before you need it.',
  openGraph: {
    title: 'Free Prevention & Readiness Guide | myGuardianLink',
    description: 'Be Ready. Be Protected. Before you need it.',
    images: [{ url: '/students/assets/img/campaign/og-image.jpg', width: 1200, height: 630 }],
  },
};

// Chapter titles are the website's own headings.
const CHAPTERS = [
  { id: 'prevent', icon: 'shield', title: 'Protection that starts before the emergency' },
  { id: 'campus', icon: 'pin', title: 'Alone on campus? Not anymore.' },
  { id: 'reality', icon: 'phone', title: '911 Is Essential.' },
  { id: 'seconds', icon: 'tap', title: 'What happens when you activate' },
  { id: 'setup', icon: 'id', title: 'Set it up before you need it.' },
  { id: 'know', icon: 'book', title: 'What You Need to Know' },
];

// Source: myguardianlink.com/faq/ ("What You Need To know" and FAQ).
const QA = [
  ['Is this a replacement for 911?', 'No. It is designed to support 911 when you cannot call, speak, or explain clearly.'],
  ['Who receives my signal?', 'Your trusted contacts and a personal coordinator.'],
  ['What does the coordinator do?', 'A live coordinator reviews your alert in real time, verifies your location and message, and begins the next response steps immediately.'],
  ['Does it work if I cannot talk?', 'Yes. The system is designed for silent or limited-action situations.'],
  ['Is my location sent?', 'Yes, the system sends GPS location when available.'],
  ['Can my family be notified?', 'Yes, trusted contacts can receive the urgent signal.'],
  ['Is there a record?', 'Yes. Incident activity can be time-stamped and documented for accountability.'],
];

export default function GuidePage() {
  return (
    <>
      <IconSprite />
      <a className="skip" href="#main">Skip to content</a>
      <Header home="/students/" />

      <main id="main" tabIndex={-1}>

        {/* COVER — tagline: Home page. */}
        <section className="g-cover on-dark">
          <div className="wrap g-cover__inner">
            <p className="eyebrow">Free Guide</p>
            <h1 className="g-cover__title"><span className="accent">Prevention &amp; Readiness</span> Guide</h1>
            <p className="g-cover__lede">Be Ready. Be Protected. Before you need it.</p>
          </div>
        </section>

        <div className="wrap g-layout">

          <nav className="g-toc" aria-label="Guide contents">
            <p className="g-toc__title">In this guide</p>
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.id}><a href={`#${c.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{c.title}</a></li>
              ))}
            </ol>
          </nav>

          <div className="g-body">

            {/* 01 — Source: Who It Protects page. */}
            <section className="g-chapter" id="prevent" data-reveal="">
              <ChapterHead n={1} />
              <p className="g-intro"><span className="brand">myGuardianLink</span> helps prevent risk, protect people in urgent moments, and deter harm with silent activation, exact location, trusted contact, and real human support.</p>
              <div className="g-cards g-cards--3">
                <div className="g-card">
                  <h3 className="h3">Prevent</h3>
                  <p>Notice risk early. Report concerns before they escalate.</p>
                </div>
                <div className="g-card">
                  <h3 className="h3">Protect</h3>
                  <p>Send the silent urgent signal with identity, GPS location, and incident details.</p>
                </div>
                <div className="g-card">
                  <h3 className="h3">Deter</h3>
                  <p>Real people, rapid response and documented action help discourage harm.</p>
                </div>
              </div>
              <blockquote className="pull">Be prepared. Stay connected. Stay Protected.</blockquote>
            </section>

            {/* 02 — Source: Features page ("Students", "Women on the Move"). */}
            <section className="g-chapter" id="campus" data-reveal="">
              <ChapterHead n={2} />
              <div className="g-cards">
                <div className="g-card">
                  <h3 className="h3">Students</h3>
                  <p>For walks across campus, late-night study sessions, parking lots, dorm transitions, and unfamiliar social situations.</p>
                </div>
                <div className="g-card">
                  <h3 className="h3">Women on the Move</h3>
                  <p>For every woman who has ever walked faster for her car.</p>
                  <p>For the uneasy moments when instinct says something is wrong.</p>
                </div>
              </div>
              <blockquote className="pull">Choose protection for yourself or someone you love.</blockquote>
            </section>

            {/* 03 — Source: Why It Matters page ("The Reality", "The Gap").
                Its fifth item, "Safely make the call", is left out (wording rule). */}
            <section className="g-chapter" id="reality" data-reveal="">
              <ChapterHead n={3} />
              <p className="g-intro">But Sometimes You Cannot Call, Speak, or Explain Fast Enough.</p>
              <h3 className="h3 g-sub">911 Works Best When the Caller Can:</h3>
              <ul className="g-list">
                <li><Icon name="check" />Speak Clearly</li>
                <li><Icon name="check" />Know their location</li>
                <li><Icon name="check" />Explain the problem</li>
                <li><Icon name="check" />Stay on the line</li>
              </ul>
              <p className="g-strong">In many emergencies that is not possible.</p>
              <div className="g-fit">
                <p className="g-fit__statement">The gap is not 911. The gap is what happens before 911 gets clear information.</p>
              </div>
            </section>

            {/* 04 — Source: Home page ("What happens when you activate") and
                Features page ("Activate with Confidence. Stay in Control."). */}
            <section className="g-chapter" id="seconds" data-reveal="">
              <ChapterHead n={4} />
              <ol className="g-steps">
                <li>
                  <span className="g-steps__num">01</span>
                  <div><h3 className="h3">Activate</h3><p>One tap, voice command, smartwatch, earbuds or silent activation.</p></div>
                </li>
                <li>
                  <span className="g-steps__num">02</span>
                  <div><h3 className="h3">Your Information Is Sent</h3><p>Identity, phone, precise GPS location, incident type and timestamp are delivered instantly.</p></div>
                </li>
                <li>
                  <span className="g-steps__num">03</span>
                  <div><h3 className="h3">People Act</h3><p>Trusted contacts and a trained personal coordinator are alerted. When danger escalates, 911 is alerted immediately.</p></div>
                </li>
              </ol>
              <h3 className="h3 g-sub">Activate with Confidence. Stay in Control.</h3>
              <p className="g-intro">Start protection in the way that feels right for you&mdash;quietly, quickly and from anywhere.</p>
              <ul className="g-list g-list--cols">
                <li><Icon name="check" />One-Touch</li>
                <li><Icon name="check" />Speech-to-Text</li>
                <li><Icon name="check" />Hands-Free</li>
                <li><Icon name="check" />&ldquo;Hey Siri&rdquo;</li>
                <li><Icon name="check" />Smart Watch</li>
                <li><Icon name="check" />Earbuds</li>
              </ul>
            </section>

            {/* 05 — Source: How It Works page ("Set it up before you need it.",
                "Starts in minutes") and Features page ("Your Information.
                Shared Securely."). */}
            <section className="g-chapter" id="setup" data-reveal="">
              <ChapterHead n={5} />
              <p className="g-intro"><strong>Starts in minutes.</strong> Be ready before danger finds you.</p>
              <div className="g-cards">
                <div className="g-card">
                  <h3 className="h3">Automatically sent</h3>
                  <ul className="g-list">
                    <li><Icon name="check" />Name</li>
                    <li><Icon name="check" />Phone Number</li>
                    <li><Icon name="check" />GPS Location</li>
                    <li><Icon name="check" />Incident Type / details</li>
                    <li><Icon name="check" />Time Stamp</li>
                  </ul>
                </div>
                <div className="g-card">
                  <h3 className="h3">Optional and voluntary</h3>
                  <p>You can choose to share additional information.</p>
                  <ul className="g-list">
                    <li><Icon name="check" />Medical conditions</li>
                    <li><Icon name="check" />Allergies / Medications</li>
                    <li><Icon name="check" />Blood type</li>
                    <li><Icon name="check" />Emergency contact</li>
                  </ul>
                </div>
              </div>
              <div className="g-fit">
                <p className="g-fit__statement">Secure. Encrypted. Private.</p>
                <p>Your data is encrypted and never sold.</p>
                <p><strong>The right information. To the right people. At the right time.</strong></p>
              </div>
            </section>

            {/* 06 — Source: FAQ page ("What You Need To know", "Coverage and
                Connectivity"). */}
            <section className="g-chapter" id="know" data-reveal="">
              <ChapterHead n={6} />
              <p className="g-intro">Clear answers before you activate protection.</p>
              <dl className="g-qa">
                {QA.map(([q, a]) => (
                  <div key={q}><dt>{q}</dt><dd>{a}</dd></div>
                ))}
                <div>
                  <dt>Does <span className="brand">myGuardianLink</span> work everywhere?</dt>
                  <dd><span className="brand">myGuardianLink</span> requires an active cellular data connection or Wi-Fi connection. Coverage is not guaranteed in every location. Signal strength and performance may be affected by the user&rsquo;s carrier, phone model, battery level, roaming plan, network congestion, terrain, weather, building materials, basements, elevators, rural areas, tunnels, and local network outages. <span className="brand">myGuardianLink</span> supports urgent communication but does not replace calling 911 or local emergency services when it is safe and possible.</dd>
                </div>
              </dl>
              <p className="g-strong">The best time to set this up is before danger finds you.</p>
            </section>

            {/* Source: the website's standing 911 line (every page). */}
            <p className="g-note">Supports 911 &mdash; does not replace 911. Emergency response depends on circumstances, connectivity, and available services.</p>
          </div>
        </div>

      </main>

      <Footer home="/students/" />
      <PageScripts page="guide" />
    </>
  );
}

function ChapterHead({ n }: { n: number }) {
  const c = CHAPTERS[n - 1];
  return (
    <header className="g-chapter__head">
      <span className="g-chapter__ico"><Icon name={c.icon} /></span>
      <p className="g-chapter__num">{String(n).padStart(2, '0')}</p>
      <h2 className="h2">{c.title}</h2>
    </header>
  );
}
