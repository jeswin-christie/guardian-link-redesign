import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   2 · TRUST STRIP — directly under the hero (company feedback 2), the
   company's four proof points, word for word.
   ========================================================================== */
export default function Proof() {
  return (
    <section className="proof on-dark" aria-label="What every activation brings">
      <ul className="wrap proof__list">
        <li className="proof__item"><span className="proof__ico"><Icon name="headset" /></span>Live Human Response</li>
        <li className="proof__item"><span className="proof__ico"><Icon name="pin" /></span>Precise Location</li>
        <li className="proof__item"><span className="proof__ico"><Icon name="people" /></span>Trusted Contacts</li>
        <li className="proof__item"><span className="proof__ico"><Icon name="shield" /></span>911 Escalation When Needed</li>
      </ul>
    </section>
  );
}
