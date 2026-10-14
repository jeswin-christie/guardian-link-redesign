import { Hero } from "@/components/runners/sections/Hero";
import { WhyItMatters } from "@/components/runners/sections/WhyItMatters";
import { RealRisks } from "@/components/runners/sections/RealRisks";
import { SeeSomething } from "@/components/runners/sections/SeeSomething";
import { EverydayUse } from "@/components/runners/sections/EverydayUse";
import { Roadside } from "@/components/runners/sections/Roadside";
import { SetupSteps } from "@/components/runners/sections/SetupSteps";
import { FinalCta } from "@/components/runners/sections/FinalCta";
import { Footer } from "@/components/runners/sections/Footer";
import { MobileCtaBar } from "@/components/runners/sections/MobileCtaBar";
import { ScrollReveal } from "@/components/runners/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <RealRisks />
        <WhyItMatters />
        <SeeSomething />
        <Roadside />
        <EverydayUse />
        <SetupSteps />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
      <ScrollReveal />
    </>
  );
}
