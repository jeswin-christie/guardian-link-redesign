/* Campaign links, set up like the runners page (client, 2026-10-12):
   - Every "Get the Parent Plan" button and the QR code: the portal's app
     sign-up with the PARENTPLAN group preselected.
   - "Go to User Portal": the PARENTPLAN organization in the User Portal.
   NEXT_PUBLIC_PARENT_PLAN_URL / NEXT_PUBLIC_PARENT_PLAN_PORTAL_URL override
   them (env.example.txt); lib/students/behaviour/main.js adds the ad's UTM /
   fbclid to both on load. */
export const PARENT_PLAN_URL =
  process.env.NEXT_PUBLIC_PARENT_PLAN_URL || 'https://portal.myguardianlink.com/app?group=PARENTPLAN';

export const PARENT_PLAN_LABEL = 'Get the Parent Plan';

export const PORTAL_URL =
  process.env.NEXT_PUBLIC_PARENT_PLAN_PORTAL_URL || 'https://portal.myguardianlink.com/org/PARENTPLAN';

export const PORTAL_LABEL = 'Go to User Portal';

/* The client's QR (2026-10-12), redrawn with segno as a sharp SVG (error level M,
   as theirs): encodes https://portal.myguardianlink.com/app?group=PARENTPLAN.
   Regenerate it if PARENT_PLAN_URL changes. */
export const PARENT_PLAN_QR = '/students/assets/img/campaign/qr-parentplan.svg';
