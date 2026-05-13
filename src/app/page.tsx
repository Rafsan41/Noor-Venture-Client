import { Nav }          from "@/components/landing/Nav";
import { Hero }         from "@/components/landing/Hero";
import { Ticker }       from "@/components/landing/Ticker";
import { Musharakah }   from "@/components/landing/Musharakah";
import { Features }     from "@/components/landing/Features";
import { Calculator }   from "@/components/landing/Calculator";
import { Deals }        from "@/components/landing/Deals";
import { HowItWorks }   from "@/components/landing/HowItWorks";
import { Pillars }      from "@/components/landing/Pillars";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ }          from "@/components/landing/FAQ";
import { FinalCTA }     from "@/components/landing/FinalCTA";
import { Footer }       from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Nav />
      <Hero />
      <Ticker />
      <Musharakah />
      <Features />
      <Calculator />
      <Deals />
      <HowItWorks />
      <Pillars />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
