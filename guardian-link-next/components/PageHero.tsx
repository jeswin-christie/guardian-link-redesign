import Link from 'next/link';
import type { ReactNode } from 'react';
import { Img, SplitChars, Btn, TextLink, NextStep, type Action } from './primitives';

type Props = {
  eyebrow?: string;
  /** Headline lines. The asterisk is added after the last line when `footnote` is given. */
  lines: string[];
  footnote?: string;
  sub?: ReactNode;
  primary?: Action;
  link?: Action;
  image?: string;
  imageMobile?: string;
  video?: string;
  /** full = viewport height (home), tall = 92vh (inner pages) */
  size?: 'full' | 'tall' | 'short';
  /** smaller type for long headlines */
  scale?: 'xl' | 'lg' | 'md';
  children?: ReactNode;
};

/** The shared hero: blurred media, rising navy shapes, large centred headline with an asterisk footnote. */
export default function PageHero({
  eyebrow, lines, footnote, sub, primary, link, image, imageMobile, video, size = 'tall', scale = 'xl', children,
}: Props) {
  return (
    <section className={`panel hero hero--${size} hero--${scale}`} id="top" data-section="top">
      <div className="hero__media">
        {video ? (
          <video className="hero__video" autoPlay muted loop playsInline preload="auto" poster={image ? `/media/${image}` : undefined} aria-hidden="true">
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <>
            {/* Blurred cover copy fills the frame; the full image sits on top uncropped (inner-page stills are often portrait). */}
            <Img src={image} className={`hero__video hero__video--bg${imageMobile ? ' hide-sm' : ''}`} sizes="50vw" priority />
            <Img src={image} className={`hero__video hero__video--fit${imageMobile ? ' hide-sm' : ''}`} sizes="100vw" priority />
            {imageMobile && <Img src={imageMobile} className="hero__video hero__video--bg show-sm" sizes="50vw" priority />}
            {imageMobile && <Img src={imageMobile} className="hero__video hero__video--fit show-sm" sizes="100vw" priority />}
          </>
        ) : null}
      </div>
      <div className="hero__shade" />

      <svg className="hero__shapes" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path className="shape shape--a" data-depth="0.35" d="M-380 1500 L-380 900 A640 640 0 0 1 900 900 L900 1500 L590 1500 L590 900 A330 330 0 0 0 -70 900 L-70 1500 Z" />
        <path className="shape shape--b" data-depth="0.18" d="M300 1500 L300 900 A420 420 0 0 1 1140 900 L1140 1500 L960 1500 L960 900 A240 240 0 0 0 480 900 L480 1500 Z" />
        <path className="shape shape--c" data-depth="0.5" d="M1130 1500 L1130 900 C1160 720 1300 610 1440 590 L1600 590 L1600 1500 Z" />
      </svg>

      <Link href="/" className="hero__logo" aria-label="My Guardian Link home">
        <Img src="mgl-horizontal-logo-rev.webp" alt="My Guardian Link" sizes="220px" priority />
      </Link>

      <div className="hero__center" data-hero-center>
        {eyebrow && <p className="hero__eyebrow"><i />{eyebrow}</p>}
        <h1 className="hero__title" aria-label={lines.join(' ')}>
          {lines.map((l, i) => (
            <SplitChars key={i} text={l} line={i}
              after={i === lines.length - 1 && footnote ? <sup className="hero__ast" aria-hidden="true">*</sup> : null} />
          ))}
        </h1>
        {footnote && <p className="hero__foot"><span className="hero__ast-sm">*</span>{footnote}</p>}
        {sub && <div className="hero__sub">{sub}</div>}
        {(primary || link) && (
          <div className="hero__ctas">
            {primary && <Btn a={primary} variant="cta" />}
            {link && <TextLink a={link} className="hero__link" />}
            {primary?.label === 'Get Protected Now' && <NextStep className="hero__next" />}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
