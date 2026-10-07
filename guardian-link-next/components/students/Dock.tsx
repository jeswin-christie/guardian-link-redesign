/* Phones and tablets: START FREE within thumb reach once the hero's
   button has scrolled away. Hidden again from the closing section down,
   which has its own. Restored at the user's request (2026-09-14). */
export default function Dock() {
  return (
    <div className="dock" data-dock="">
      <p className="dock__price"><strong>$24.99/month</strong>3 people &middot; Try It Free</p>
      <a className="btn btn--start" href="#plan" data-cta="start">Start Free</a>
    </div>
  );
}
