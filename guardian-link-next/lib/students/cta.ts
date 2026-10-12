/* Every primary CTA on the campaign page ("Get the Parent Plan") goes here:
   the paid Parent Plan journey with PARENTPLAN already selected, never the
   free plan. NEXT_PUBLIC_PARENT_PLAN_URL overrides it (env.example.txt);
   lib/students/behaviour/main.js adds the ad's UTM / fbclid on load. */
export const PARENT_PLAN_URL =
  process.env.NEXT_PUBLIC_PARENT_PLAN_URL || 'https://portal.myguardianlink.com/org/PARENTPLAN';

export const PARENT_PLAN_LABEL = 'Get the Parent Plan';
