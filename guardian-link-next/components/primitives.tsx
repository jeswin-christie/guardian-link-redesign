import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { MEDIA } from '@/lib/media';
import { NEXT_STEP } from '@/lib/meta';

/** Illustrations / UI shots with baked-in text: shown whole (contain) inside .img-reveal, never cropped. */
const FIT_IMAGES = new Set([
  'page-2-section-4-e1779956986685.webp',
  'page3-block5-e1780058629749.webp',
  'chatgpt-image-may-28-2026-12-33-06-pm-e1779951889936.webp',
  'chatgpt-image-jun-8-2026-05-14-13-pm-1.webp',
  'what-your-account-recieve.webp',
  'the-reality.webp',
  'the-gap-section-banner.webp',
]);

/* ---------- Image from /public/media with intrinsic size ---------- */
export function Img({
  src, alt = '', className, sizes = '(max-width: 860px) 100vw, 50vw', priority, style, ...rest
}: { src: string; alt?: string; className?: string; sizes?: string; priority?: boolean; style?: CSSProperties; [k: `data-${string}`]: string | boolean | undefined }) {
  const [w, h] = MEDIA[src] ?? [1200, 800];
  const cls = FIT_IMAGES.has(src) ? [className, 'img-fit'].filter(Boolean).join(' ') : className;
  return (
    <Image src={`/media/${src}`} alt={alt} width={w} height={h} sizes={sizes} className={cls}
      priority={priority} style={style} {...rest} />
  );
}

/* ---------- Text splitting (server-rendered, no DOM mutation) ---------- */
export function SplitWords({ text, as: Tag = 'h2', className }: { text: string; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <Tag className={className} data-split-words aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w"><span style={{ '--i': i } as CSSProperties}>{w}</span></span>{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

/** Letters that rise in on page load (used in hero headlines). */
export function SplitChars({ text, line = 0, after }: { text: string; line?: number; after?: ReactNode }) {
  const words = text.split(' ');
  let idx = 0;
  // long lines get a tighter stagger so every line finishes rising within ~0.9s
  const step = `${Math.min(32, Math.round(900 / Math.max(1, text.length)))}ms`;
  return (
    <span className="hero__line" aria-hidden="true" style={{ '--step': step } as CSSProperties}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="wd">
            {[...word].map((c, ci) => (
              <span key={ci} className="ch" style={{ '--i': idx++, '--base': `${line * 260}ms` } as CSSProperties}>{c}</span>
            ))}
            {wi === words.length - 1 && after}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

/* ---------- Buttons / links ----------
   href: internal or external link · video: opens the lightbox · open: opens a popup ("org" | "referral") */
export type Action = { label: string; href?: string; video?: string; open?: 'org' | 'referral' };

export function Btn({ a, variant = 'cta', className = '', arrow, play }: { a: Action; variant?: string; className?: string; arrow?: boolean; play?: boolean }) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      {play && <span className="btn__play" />}
      {a.label}
      {arrow && <i className="btn__arr" />}
    </>
  );
  if (a.video) return <button type="button" className={cls} data-video={a.video}>{inner}</button>;
  if (a.open) return <button type="button" className={cls} data-open={a.open}>{inner}</button>;
  return <SmartLink href={a.href ?? '#'} className={cls}>{inner}</SmartLink>;
}

export function TextLink({ a, className = 'ulink' }: { a: Action; className?: string }) {
  if (a.video) return <button type="button" className={className} data-video={a.video}>{a.label}</button>;
  if (a.open) return <button type="button" className={className} data-open={a.open}>{a.label}</button>;
  return <SmartLink href={a.href ?? '#'} className={className}>{a.label}</SmartLink>;
}

export function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    const isWeb = href.startsWith('http');
    return <a href={href} className={className} {...(isWeb ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

/* ---------- "What happens next" line under every major Get Protected Now button ---------- */
export function NextStep({ className = '' }: { className?: string }) {
  return <p className={`next-step ${className}`.trim()}>{NEXT_STEP}</p>;
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? ' eyebrow--light' : ''}`} data-reveal>{children}</p>;
}

/* ---------- Section tag: icon + uppercase orange label, as on myguardianlink.com ---------- */
const TAG_ICONS = {
  // Font Awesome "eye" (regular), CC BY 4.0
  eye: { viewBox: '0 0 576 512', d: 'M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z' },
  // Tow truck, same glyph the live site uses for Roadside Assistance
  tow: { viewBox: '0 0 50 50', d: 'M4.96875 4C4.726563 4.007813 4.464844 4.097656 4.28125 4.28125L3.28125 5.28125C2.917969 5.644531 2.890625 6.226563 3.21875 6.625L17 23.34375L17 26L27 26L27 23C27 22.707031 26.878906 22.441406 26.65625 22.25L5.65625 4.25C5.457031 4.082031 5.210938 3.992188 4.96875 4ZM4 10.71875L4 19C4 19.550781 4.449219 20 5 20C5.550781 20 6 20.449219 6 21C6 21.550781 5.550781 22 5 22C4.449219 22 4 21.550781 4 21L2 21C2 22.652344 3.347656 24 5 24C6.652344 24 8 22.652344 8 21C8 19.695313 7.164063 18.570313 6 18.15625L6 13.15625ZM32 13C30.347656 13 29 14.347656 29 16L29 38L33.09375 38C33.574219 40.832031 36.03125 43 39 43C41.96875 43 44.429688 40.832031 44.90625 38L47 38C48.652344 38 50 36.652344 50 35L50 25.375C50 23.363281 48.550781 21.308594 48.375 21.0625L44.21875 15.5C43.265625 14.351563 41.773438 13 40 13ZM38 19L44.34375 19L46.78125 22.25C47.085938 22.675781 47.816406 23.902344 47.96875 25L38 25C37.550781 25 37 24.449219 37 24L37 20C37 19.445313 37.546875 19 38 19ZM0 28L0 35C0 36.652344 1.347656 38 3 38L7.09375 38C7.574219 40.832031 10.03125 43 13 43C15.96875 43 18.425781 40.832031 18.90625 38L27 38L27 28ZM13 33C15.207031 33 17 34.792969 17 37C17 39.207031 15.207031 41 13 41C10.792969 41 9 39.207031 9 37C9 34.792969 10.792969 33 13 33ZM39 33C41.207031 33 43 34.792969 43 37C43 39.207031 41.207031 41 39 41C36.792969 41 35 39.207031 35 37C35 34.792969 36.792969 33 39 33Z' },
} as const;

export function SectionTag({ children, icon }: { children: ReactNode; icon: keyof typeof TAG_ICONS }) {
  const { viewBox, d } = TAG_ICONS[icon];
  return (
    <p className="sec-tag" data-reveal>
      <svg viewBox={viewBox} fill="currentColor" aria-hidden="true"><path d={d} /></svg>
      <span>{children}</span>
    </p>
  );
}

/** Inline **bold** support for copy taken from the content bundle. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>))}</>;
}

export function JsonLd({ data }: { data: unknown[] }) {
  if (!data.length) return null;
  return (
    <>
      {data.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
