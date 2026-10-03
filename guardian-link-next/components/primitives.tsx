import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { MEDIA } from '@/lib/media';

/* ---------- Image from /public/media with intrinsic size ---------- */
export function Img({
  src, alt = '', className, sizes = '(max-width: 860px) 100vw, 50vw', priority, style, ...rest
}: { src: string; alt?: string; className?: string; sizes?: string; priority?: boolean; style?: CSSProperties; [k: `data-${string}`]: string | boolean | undefined }) {
  const [w, h] = MEDIA[src] ?? [1200, 800];
  return (
    <Image src={`/media/${src}`} alt={alt} width={w} height={h} sizes={sizes} className={className}
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

export function Btn({ a, variant = 'red', className = '', arrow, play }: { a: Action; variant?: string; className?: string; arrow?: boolean; play?: boolean }) {
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

/* ---------- Giant kinetic word track ---------- */
export function Giant({ word, dir = -1, speed = 0.4, className = '', repeat = 4, auto }: { word: ReactNode; dir?: 1 | -1; speed?: number; className?: string; repeat?: number; auto?: number }) {
  return (
    <div className={`giant ${className}`} aria-hidden="true">
      <div className="giant__track" data-marquee={dir} data-speed={speed} {...(auto ? { 'data-auto': auto } : {})}>
        {Array.from({ length: repeat }).map((_, i) => <span key={i}>{word}</span>)}
      </div>
    </div>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? ' eyebrow--light' : ''}`} data-reveal>{children}</p>;
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
