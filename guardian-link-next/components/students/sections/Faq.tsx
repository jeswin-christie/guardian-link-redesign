import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   10 · PARENT QUESTIONS — immediately before the final CTA (company
   feedback 6). Questions and answers are the company's, word for word;
   only the brand name follows the style guide.
   On phones each answer is re-set line by line by lib/behaviour/main.js
   (4b), which rewrites the <p> in place.
   ========================================================================== */
export default function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="wrap">
        <header className="section-head" data-reveal="">
          <p className="eyebrow">FAQ</p>
          <h2 className="h2">Parent Questions</h2>
        </header>

        <div className="faq__list" data-reveal="">
          <details className="faq__item" open>
            <summary>Does this replace 911?<Icon name="plus" /></summary>
            <div className="faq__a"><p>No. <span className="brand">myGuardianLink</span> strengthens, complements and supports 911. If the situation requires emergency response, the live Urgent Response Coordinator can escalate to 911.</p></div>
          </details>
          <details className="faq__item">
            <summary>Does my student need to be able to speak?<Icon name="plus" /></summary>
            <div className="faq__a"><p>No. Your student can activate <span className="brand">myGuardianLink</span> without making a traditional phone call or explaining everything first. The system sends the critical information needed to begin a coordinated response.</p></div>
          </details>
          <details className="faq__item">
            <summary>Who receives their location?<Icon name="plus" /></summary>
            <div className="faq__a"><p>Their trusted contacts and the live Urgent Response Coordinator receive the activation information, including precise location and incident details needed to respond.</p></div>
          </details>
          <details className="faq__item">
            <summary>What happens if the situation becomes an emergency?<Icon name="plus" /></summary>
            <div className="faq__a"><p>The Urgent Response Coordinator can escalate the incident to 911, providing the user&rsquo;s verified identity, contact information, precise location and incident details to support a faster, more informed response.</p></div>
          </details>
          <details className="faq__item">
            <summary>Are all three accounts private?<Icon name="plus" /></summary>
            <div className="faq__a"><p>Yes. Each Parent Plan member has their own secure account and private profile. Each person verifies their own information and controls their own account.</p></div>
          </details>
          <details className="faq__item">
            <summary>Can I cancel anytime?<Icon name="plus" /></summary>
            <div className="faq__a"><p>Yes. There is no long-term commitment, and you can cancel at any time. The Parent Plan also includes the stated 30-day refund policy.</p></div>
          </details>
          <details className="faq__item">
            <summary>What happens after I purchase?<Icon name="plus" /></summary>
            <div className="faq__a"><p>You create your account and purchase the Parent Plan, then send secure invitations to the other family members. Each person verifies their information, completes their profile and downloads the <span className="brand">myGuardianLink</span> app.</p></div>
          </details>
        </div>
      </div>
    </section>
  );
}
