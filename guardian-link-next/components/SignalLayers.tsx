'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ClipboardList, Headset, IdCard, MapPin, Users } from 'lucide-react';
import { Img } from './primitives';

/* ---------- "One silent urgent signal" — one signal, five layers ----------
 * Left: the five layers as an auto-advancing list (same timing model as AutoAccordion).
 * Right: a dark "signal stage" — the urgent signal fanning out to all five layers at once,
 * the active layer's app screen / photo in a consistent frame, and what that layer shares.
 */

const ICONS = { identity: IdCard, location: MapPin, incident: ClipboardList, contacts: Users, coordinator: Headset };

export type SignalLayer = {
  key: keyof typeof ICONS;
  title: string;
  body: string;
  /** Short "what's shared" chips shown under the stage (restate the body copy, no new claims). */
  tags: string[];
  image: string;
  alt: string;
  /** cover = full-bleed photo filling the stage; device = phone screenshot in a bezel; card = wide UI shown whole */
  frame?: 'cover' | 'device' | 'card';
  /** object-position for cover photos, e.g. '50% 30%' */
  position?: string;
  /** App screen floating over the photo — what this layer looks like in the product */
  inset?: { image: string; alt: string; frame?: 'device' | 'card'; side?: 'left' | 'right' };
};

const pad = (n: number) => String(n).padStart(2, '0');

export function SignalLayers({ layers, duration = 6500 }: { layers: SignalLayer[]; duration?: number }) {
  const [idx, setIdx] = useState(0);
  const bars = useRef<(HTMLElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const state = useRef({ t0: 0, visible: false, paused: false, elapsed: 0 });

  useEffect(() => {
    state.current.t0 = performance.now();
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
          if (p >= 1) { s.elapsed = 0; return (cur + 1) % layers.length; }
          return cur;
        });
      } else if (s.paused) { s.t0 = t - s.elapsed; }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [duration, layers.length]);

  const go = (i: number) => { state.current.elapsed = 0; setIdx(i); };
  const pause = (v: boolean) => () => { state.current.paused = v; };

  return (
    <div className="sig__body" ref={box} onMouseEnter={pause(true)} onMouseLeave={pause(false)} onFocus={pause(true)} onBlur={pause(false)}>
      <ol className="sig__list">
        {layers.map((l, i) => {
          const Icon = ICONS[l.key];
          return (
            <li key={l.key} className={`sig__item${i === idx ? ' is-active' : ''}`}>
              <button type="button" className="sig__head" onClick={() => go(i)} aria-expanded={i === idx} aria-controls={`sig-desc-${l.key}`}>
                <span className="sig__num">{pad(i + 1)}</span>
                <span className="sig__icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8} /></span>
                <span>{l.title}</span>
              </button>
              <div className="sig__desc" id={`sig-desc-${l.key}`}><div><p>{l.body}</p></div></div>
              <span className="sig__bar" aria-hidden="true"><i ref={(el) => { bars.current[i] = el; }} /></span>
            </li>
          );
        })}
      </ol>

      <div className="sig__stage">
        {/* One signal → all five layers at once (decorative; the list above is the accessible control) */}
        <div className="sig__route" aria-hidden="true">
          <span className="sig__origin"><span className="sig__pulse" />Urgent signal</span>
          <ol className="sig__nodes">
            {layers.map((l, i) => {
              const Icon = ICONS[l.key];
              return (
                <li key={l.key} className={i === idx ? 'is-active' : undefined} onClick={() => go(i)}>
                  <span className="sig__node"><Icon size={15} strokeWidth={1.9} /></span>
                  <em>{l.title}</em>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="sig__media">
          {layers.map((l, i) => (
            <figure key={l.key} className={`sig__shot sig__shot--${l.frame ?? 'card'}${l.inset ? ' has-inset' : ''}${i === idx ? ' is-active' : ''}`}
              aria-hidden={i !== idx}>
              <Img src={l.image} alt={l.alt} sizes="(max-width: 860px) 92vw, 50vw"
                style={l.position ? ({ objectPosition: l.position } as CSSProperties) : undefined} />
              {l.inset && (
                <span className={`sig__inset sig__inset--${l.inset.frame ?? 'device'}${l.inset.side === 'left' ? ' sig__inset--left' : ''}`}>
                  <Img src={l.inset.image} alt={l.inset.alt} sizes="(max-width: 860px) 45vw, 22vw" />
                </span>
              )}
            </figure>
          ))}
        </div>

        <div className="sig__caption">
          <span className="sig__count">{pad(idx + 1)} / {pad(layers.length)}</span>
          <strong className="sig__label">{layers[idx].title}</strong>
          <ul className="sig__tags" key={idx}>
            {layers[idx].tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
