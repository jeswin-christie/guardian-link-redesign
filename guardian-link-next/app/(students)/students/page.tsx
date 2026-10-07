import Dock from '@/components/students/Dock';
import Footer from '@/components/students/Footer';
import Gate from '@/components/students/Gate';
import Header from '@/components/students/Header';
import IconSprite from '@/components/students/IconSprite';
import PageScripts from '@/components/students/PageScripts';
import Demo from '@/components/students/sections/Demo';
import Faq from '@/components/students/sections/Faq';
import Final from '@/components/students/sections/Final';
import HerLink from '@/components/students/sections/HerLink';
import Hero from '@/components/students/sections/Hero';
import How from '@/components/students/sections/How';
import Nine from '@/components/students/sections/Nine';
import Plan from '@/components/students/sections/Plan';
import Proof from '@/components/students/sections/Proof';
import Reassure from '@/components/students/sections/Reassure';
import Setup from '@/components/students/sections/Setup';
import Stories from '@/components/students/sections/Stories';

// The college-parent campaign page. Section order is the company's
// paid-traffic flow (README, "Page order"); each section's own file
// explains its copy and decisions.
export default function Page() {
  return (
    <>
      <IconSprite />

      <a className="skip" href="#main">Skip to content</a>

      <Gate />
      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Proof />
        <Demo />
        <HerLink />
        <Reassure />
        <How />
        <Stories />
        <Plan />
        <Setup />
        <Nine />
        <Faq />
        <Final />
      </main>

      <Footer />
      <Dock />
      <PageScripts />
    </>
  );
}
