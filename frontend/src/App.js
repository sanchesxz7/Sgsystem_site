import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { setActiveLenis, scrollToId } from "@/lib/scroll";

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
    setActiveLenis(lenis);
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      setActiveLenis(null);
      lenis.destroy();
    };
  }, []);
}

// Anchor links (navbar, "em breve" modals, etc.) can be clicked from any
// route via `navigate("/", { state: { scrollTo: id } })` — this picks that
// up once Landing (and its Lenis instance) has actually mounted, then clears
// the state so browser back/forward doesn't replay the scroll.
function useScrollToOnMount() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    const raf = requestAnimationFrame(() => scrollToId(id));
    navigate(location.pathname, { replace: true, state: {} });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function Landing() {
  useLenis();
  useScrollToOnMount();
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

// React Router (unlike a traditional MPA) keeps whatever scroll position the
// previous page had — without this, navigating e.g. Landing (scrolled deep)
// -> /diagnostico lands the user mid-page instead of at the top. Skipped
// when a `scrollTo` section jump is queued (useScrollToOnMount) so there's
// no top-of-page flash before that jump runs.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
