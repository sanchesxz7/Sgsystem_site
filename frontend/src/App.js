import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import SocialProof from "@/components/SocialProof";
import AnimatedChart from "@/components/AnimatedChart";
import Services from "@/components/Services";
import Method from "@/components/Method";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import VipLive from "@/components/VipLive";
import Team from "@/components/Team";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyWhatsAppMobile from "@/components/StickyWhatsAppMobile";
import ExitIntent from "@/components/ExitIntent";
import DiagnosticPopup from "@/components/DiagnosticPopup";
import ThankYou from "@/pages/ThankYou";
import CaseStudy from "@/pages/CaseStudy";
import Blog from "@/pages/Blog";
import Diagnostico from "@/pages/Diagnostico";

function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

function Landing() {
  useLenis();
  return (
    <div className="App" data-testid="landing">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <SocialProof />
        <AnimatedChart />
        <Services />
        <Method />
        <Process />
        <Portfolio />
        <VipLive />
        <Team />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <StickyWhatsAppMobile />
      <ExitIntent />
      <DiagnosticPopup />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/obrigado" element={<ThankYou />} />
        <Route path="/cases/:slug" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
