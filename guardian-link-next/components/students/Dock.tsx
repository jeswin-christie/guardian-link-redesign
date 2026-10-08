/* Phones and tablets: START FREE within thumb reach once the hero's
   button has scrolled away. Hidden again from the closing section down,
   which has its own. Restored at the user's request (2026-09-14). */
export default function Dock() {
  return (
    <div className="dock" data-dock="">
      <p className="dock__price"><strong>$24.99/month</strong>Billed annually &middot; 3 people</p>
      <a className="btn btn--start" href="https://portal.myguardianlink.com/login" data-cta="start">Start Free</a>
    </div>
  );
}
