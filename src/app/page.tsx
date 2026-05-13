import type { Metadata } from "next";

import { Nav }          from "@/components/landing/Nav";
import { Hero }         from "@/components/landing/Hero";
import { TrustBar }     from "@/components/landing/TrustBar";
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

export const metadata: Metadata = {
  title: "NoorVenture — Ethical Peer-to-Business Investing",
  description:
    "Connect with vetted businesses through Musharakah — true profit and loss sharing. No interest. No hidden fees. No speculation. Shariah-certified and open to all ethical investors.",
  keywords: ["ethical investing", "Musharakah", "Islamic finance", "halal investment", "NoorVenture", "profit sharing"],
  openGraph: {
    title: "NoorVenture — Ethical Peer-to-Business Investing",
    description: "True profit-sharing partnerships. No riba. No gharar. Shariah-certified.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      {/* ── Navigation ────────────────────────────────────────────── */}
      <Nav />

      {/* ── Above the fold ────────────────────────────────────────── */}
      <main>
        {/* 1. Hero — value proposition + live capital card */}
        <Hero />

        {/* 2. Trust bar — platform credibility signals */}
        <TrustBar />

        {/* 3. Live investment ticker — social proof */}
        <Ticker />

        {/* 4. Musharakah explainer — what makes us different */}
        {/* id="musharakah" is set inside the component */}
        <Musharakah />

        {/* 4. Platform features — 6-card feature grid */}
        {/* id="features" is set inside the component */}
        <Features />

        {/* 5. Barakah calculator — interactive return projector */}
        <Calculator />

        {/* 6. Live deals — 3 featured proposals */}
        <Deals />

        {/* 7. How it works — investor + business owner flows */}
        {/* id="how" is set inside the component */}
        <HowItWorks />

        {/* 8. Pillars — ethical foundation (no riba, no gharar, no harm) */}
        {/* id="shariah" is set inside the component */}
        <Pillars />

        {/* 9. Testimonials — real investor + founder stories */}
        <Testimonials />

        {/* 10. FAQ — 6 key questions answered */}
        {/* id="faq" is set inside the component */}
        <FAQ />

        {/* 11. Final CTA — gradient call-to-action card */}
        <FinalCTA />
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
