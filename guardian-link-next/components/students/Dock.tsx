import { PARENT_PLAN_LABEL, PARENT_PLAN_URL } from '@/lib/students/cta';

/* Phones and tablets: GET THE PARENT PLAN within thumb reach once the hero's
   button has scrolled away. Hidden again from the closing section down,
   which has its own. Restored at the user's request (2026-09-14). */
export default function Dock() {
  return (
    <div className="dock" data-dock="">
      <p className="dock__price"><strong>$24.99/month</strong>Billed annually &middot; 3 people</p>
      <a className="btn btn--start" href={PARENT_PLAN_URL} data-cta="start">{PARENT_PLAN_LABEL}</a>
    </div>
  );
}
