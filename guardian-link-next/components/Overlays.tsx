'use client';

import { useEffect, useRef, useState } from 'react';
import { Img } from './primitives';
import { PORTAL, SUPPORT_FORM } from '@/lib/meta';
import { lockScroll } from './Motion';
import Link from 'next/link';

/**
 * Global video lightbox + "Protect My Organization" / "Explore Referral Groups" popups.
 * Any element with data-video="/media/video/x.mp4" or data-open="org|referral" opens them,
 * so pages can stay server components.
 */
export default function Overlays() {
  const [video, setVideo] = useState<string | null>(null);
  const [modal, setModal] = useState<'org' | 'referral' | null>(null);
  const vref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-video],[data-open]');
      if (!t) return;
      e.preventDefault();
      if (t.dataset.video) setVideo(t.dataset.video);
      else if (t.dataset.open === 'org' || t.dataset.open === 'referral') setModal(t.dataset.open);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setVideo(null); setModal(null); } };
    document.addEventListener('click', click);
    window.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', click); window.removeEventListener('keydown', esc); };
  }, []);

  useEffect(() => {
    lockScroll(!!video || !!modal);
    if (video) vref.current?.play().catch(() => {});
    else vref.current?.pause();
  }, [video, modal]);

  return (
    <>
      <div className={`lightbox${video ? ' is-open' : ''}`} aria-hidden={!video} onClick={(e) => { if (e.target === e.currentTarget) setVideo(null); }}>
        <button className="lightbox__close" onClick={() => setVideo(null)} aria-label="Close">×</button>
        <video ref={vref} controls playsInline preload="none" src={video ?? undefined} />
      </div>

      <div className={`modal${modal === 'org' ? ' is-open' : ''}`} aria-hidden={modal !== 'org'} role="dialog" aria-labelledby="org-title">
        <div className="modal__backdrop" onClick={() => setModal(null)} />
        <div className="modal__card" data-lenis-prevent>
          <button className="modal__close" onClick={() => setModal(null)} aria-label="Close">×</button>
          <div className="modal__grid">
            <div>
              <p className="eyebrow">Sponsor Group</p>
              <h2 id="org-title" className="h2">Protect My Organization</h2>
              <p>Any current user — even a free user — can create an organization after creating a My Guardian Link account.</p>
              <p>Access your dashboard on the My Guardian Link desktop website and, under Organization, create Protection for My Organization.</p>
              <p>Create a Sponsor Group by uploading a list of employees or associates. My Guardian Link helps notify them for onboarding, and associates can join using the QR code, invite link, or group code.</p>
              <ol className="steps">
                <li><b>Create a Sponsor Group</b>Start as a current user, even on the free plan.</li>
                <li><b>Upload Associates</b>Upload a list of employees or associates.</li>
                <li><b>Invite and Onboard</b>We notify your associates to log in and create their own accounts.</li>
                <li><b>Connect to Your Organization</b>Associates can join using the QR code, invite link, or group code.</li>
              </ol>
              <h4>Special pricing available for 4 to 2,000 users</h4>
              <p>An employee benefit that shows your people they are valued, protected, and never alone.</p>
              <div className="modal__btns">
                <a href={PORTAL} className="btn btn--gold">Log In</a>
                <Link href="/pricing/" className="btn btn--cta" onClick={() => setModal(null)}>Get Protected Now</Link>
                <button className="btn btn--orange" onClick={() => setModal('referral')}>Explore Referral Groups</button>
                <a href={SUPPORT_FORM} className="btn btn--ghost" target="_blank" rel="noopener">Contact Support</a>
              </div>
            </div>
            <figure>
              <h4>Sample Pricing and Onboarding Tools</h4>
              <p>This is what it looks like in the Organization Portal.</p>
              <Img src="sponser-group-scaled.webp" alt="Organization Portal — Sponsor Group setup" sizes="(max-width: 860px) 100vw, 40vw" />
            </figure>
          </div>
        </div>
      </div>

      <div className={`modal${modal === 'referral' ? ' is-open' : ''}`} aria-hidden={modal !== 'referral'} role="dialog" aria-labelledby="ref-title">
        <div className="modal__backdrop" onClick={() => setModal(null)} />
        <div className="modal__card" data-lenis-prevent>
          <button className="modal__close" onClick={() => setModal(null)} aria-label="Close">×</button>
          <div className="modal__grid">
            <div>
              <p className="eyebrow">Referral Group</p>
              <h2 id="ref-title" className="h2">Explore Referral Groups</h2>
              <p>Any current user — even a free user — can create a referral group after creating a My Guardian Link account.</p>
              <p>Access your dashboard on the My Guardian Link desktop website and, under Organization, create a Referral Group.</p>
              <p>A referral group is for anyone who influences a prospective user to join My Guardian Link — including radio stations, nonprofits, philanthropic groups, veteran organizations, community groups, and other audience-based partners.</p>
              <ol className="steps">
                <li><b>Create a Referral Group</b>Start as a current user, even on the free plan.</li>
                <li><b>Upload a Target List</b>Upload a targeted list for higher referral compensation, or leave it blank.</li>
                <li><b>Share and Refer</b>Promote your group to your audience, members, listeners, or community.</li>
                <li><b>Earn Recurring Revenue</b>Compensation is paid while memberships remain active.</li>
              </ol>
              <h4>Special pricing and discounts may be available for worthy groups</h4>
              <p>Examples may include veterans groups, battered women&apos;s groups, nonprofits, and other mission-driven organizations. Approval is determined by My Guardian Link support.</p>
              <div className="modal__btns">
                <a href={PORTAL} className="btn btn--gold">Log In</a>
                <Link href="/pricing/" className="btn btn--cta" onClick={() => setModal(null)}>Get Protected Now</Link>
                <a href={SUPPORT_FORM} className="btn btn--ghost" target="_blank" rel="noopener">Contact Support</a>
              </div>
              <p className="modal__note">Contact Support to schedule a video meeting to assist with your Referral Group.</p>
            </div>
            <figure>
              <h4>Referral Compensation and Group Tools</h4>
              <p>This is what it looks like in the Organization Portal.</p>
              <div className="rates">
                <div>
                  <h5>With Uploaded Target List</h5>
                  <ul><li><span>Year 1</span><b>15%</b></li><li><span>Year 2</span><b>7%</b></li><li><span>Year 3</span><b>5%</b></li></ul>
                  <small>Applies when a targeted list is uploaded.</small>
                </div>
                <div>
                  <h5>Without Uploaded List</h5>
                  <ul><li><span>Year 1</span><b>10%</b></li><li><span>Year 2</span><b>5%</b></li><li><span>Year 3</span><b>3%</b></li></ul>
                  <small>Applies when the target list is left blank and users join through the referral group.</small>
                </div>
              </div>
              <p className="modal__note">Compensation is recurring and paid monthly on active memberships only. If a user cancels, compensation stops. Special pricing and discounts must be approved and determined by the My Guardian Link support team.</p>
              <Img src="referl-group-scaled.webp" alt="Organization Portal — Referral Group setup" sizes="(max-width: 860px) 100vw, 40vw" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
