'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Img } from './primitives';
import { NEXT_STEP } from '@/lib/meta';
import { signupUrl } from '@/lib/funnel';
import { FREE_SETUP, type Plan } from '@/lib/plans';

/* ---------- Auto-advancing accordion with cross-fading media ---------- */
export type AccItem = { title: string; body: ReactNode; image: string; alt?: string };

export function AutoAccordion({ items, duration = 6000, numbered = true }: { items: AccItem[]; duration?: number; numbered?: boolean }) {
  const [idx, setIdx] = useState(0);
  const bars = useRef<(HTMLElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const state = useRef({ t0: 0, visible: false, paused: false, elapsed: 0 });

  useEffect(() => {
    const s = state.current;
    s.t0 = performance.now();
    bars.current.forEach((b) => b && (b.style.transform = 'scaleX(0)'));
  }, [idx]);

  useEffect(() => {
    const s = state.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; if (s.visible) s.t0 = performance.now() - s.elapsed; }, { threshold: 0.3 });
    if (box.current) io.observe(box.current);
    let id = 0;
    const loop = (t: number) => {
      if (s.visible && !s.paused && !reduce) {
        s.elapsed = t - s.t0;
        const p = Math.min(1, s.elapsed / duration);
        setIdx((cur) => {
          const bar = bars.current[cur];
          if (bar) bar.style.transform = `scaleX(${p})`;
          if (p >= 1) { s.elapsed = 0; return (cur + 1) % items.length; }
          return cur;
        });
      } else if (s.paused) { s.t0 = t - s.elapsed; }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [duration, items.length]);

  return (
    <div className="acc-split">
      <div className="acc" ref={box} onMouseEnter={() => (state.current.paused = true)} onMouseLeave={() => (state.current.paused = false)}>
        {items.map((it, i) => (
          <div key={i} className={`acc__item${i === idx ? ' is-active' : ''}`}>
            <button className="acc__head" onClick={() => { state.current.elapsed = 0; setIdx(i); }} aria-expanded={i === idx}>
              {numbered && <em>{String(i + 1).padStart(2, '0')}</em>}{it.title}
            </button>
            <div className="acc__body"><div>{it.body}</div></div>
            <span className="acc__bar"><i ref={(el) => { bars.current[i] = el; }} /></span>
          </div>
        ))}
      </div>
      <div className="acc-media">
        <div className="acc-media__stack">
          {items.map((it, i) => (
            <Img key={i} src={it.image} alt={it.alt ?? ''} className={i === idx ? 'is-active' : ''} sizes="(max-width: 860px) 100vw, 50vw" />
          ))}
        </div>
        <div className="acc-media__count"><span>{String(idx + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}</div>
      </div>
    </div>
  );
}

/* ---------- FAQ accordion ---------- */
export type QA = { q: string; a: ReactNode };
export function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq" data-stagger>
      {items.map((it, i) => (
        <div key={i} className={`faq__item${open === i ? ' is-open' : ''}`}>
          <button className="faq__q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{it.q}</span><i aria-hidden="true" />
          </button>
          <div className="faq__a"><div>{it.a}</div></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Pricing plans with annual / monthly toggle ---------- */
export function PricingPlans({ plans }: { plans: Plan[] }) {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <div className="billing" role="group" aria-label="Billing period">
        <button className={annual ? 'is-on' : ''} aria-pressed={annual} onClick={() => setAnnual(true)}>Annual <em>Save up to 50%</em></button>
        <button className={!annual ? 'is-on' : ''} aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
        <i className={`billing__knob${annual ? '' : ' is-right'}`} aria-hidden="true" />
      </div>
      <div className="plans" data-stagger>
        {plans.map((p) => {
          const free = p.id === 'free';
          const billing = free ? undefined : annual ? 'annual' : 'monthly';
          return (
            <article key={p.id} className={`plan${p.featured ? ' plan--featured' : ''}`}>
              {p.tag && <span className="plan__tag">{p.tag}</span>}
              <h2 className="plan__name">{p.name}</h2>
              <div className="plan__blurb">{p.note && <small>{p.note}</small>}{p.blurb}</div>
              <div className="plan__price">
                <b>{annual ? p.annualMo : p.monthly}</b><span>/ month</span>
              </div>
              <p className="plan__bill">
                {free ? FREE_SETUP : annual ? <>Billed annually at {p.annualTotal}</> : 'Billed monthly'}
              </p>
              {!free && <p className="plan__alt">{annual ? <>Or {p.monthly}/month, billed monthly</> : <>Or {p.annualMo}/month, billed annually at {p.annualTotal}</>}</p>}
              <ul className="plan__rows">
                {p.rows.map(([k, v]) => (
                  <li key={k}><span>{k}</span><b className={v === 'Not included' ? 'na' : ''}>{v}</b></li>
                ))}
              </ul>
              <a href={signupUrl()} data-cta={`plan-${p.id}`} data-plan={p.id} data-billing={billing}
                className={`btn ${p.featured ? 'btn--cta' : 'btn--ghost'} plan__cta`}>{p.cta}</a>
              <p className="next-step plan__next">{NEXT_STEP}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}
