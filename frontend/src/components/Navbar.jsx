import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import SgsLogo from "./SgsLogo";
import ComingSoonModal from "./ComingSoonModal";
import { scrollToId } from "../lib/scroll";

const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "Serviços", id: "servicos" },
  { label: "Método", id: "metodo" },
  { label: "Cases", id: "cases" },
  { label: "Equipe", id: "equipe" },
  { label: "VIP", id: "vip" },
  { label: "Contato", id: "contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientAreaOpen, setClientAreaOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Works from any route: on "/" it scrolls (via Lenis when active); from
  // elsewhere it navigates home first and queues the section for
  // useScrollToOnMount (see App.js) to jump to once Landing has mounted.
  const goToSection = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,14,26,0.78)] backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="container-x flex items-center justify-between h-[68px]">
          <a
            href="#hero"
            onClick={goToSection("hero")}
            className="flex items-center gap-3 group"
            data-testid="nav-logo"
          >
            <SgsLogo size={40} />
            <span className="font-display font-extrabold text-white text-[15px] sm:text-[17px] tracking-tight">
              Sanches Group System
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={goToSection(l.id)}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setClientAreaOpen(true)}
              data-testid="nav-cliente-area"
              className="hidden md:inline-flex text-sm text-slate-300 hover:text-white px-4 py-2 transition"
            >
              Área do Cliente
            </button>
            <button
              type="button"
              onClick={() => navigate("/diagnostico")}
              data-testid="nav-cta"
              className="magnetic-btn hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sgs-green text-[#04231b] text-sm font-semibold hover:scale-[1.03] transition shadow-[0_0_24px_rgba(16,217,129,0.4)]"
            >
              Solicitar Acesso <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/10 text-white"
              aria-label="Abrir menu"
              data-testid="mobile-menu-open"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-[360px] z-[70] bg-[#0F1729] border-l border-white/10 p-6"
              data-testid="mobile-drawer"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <SgsLogo size={32} />
                  <span className="font-display font-bold text-white">
                    SGS
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="w-11 h-11 rounded-full border border-white/10 grid place-items-center text-white"
                  data-testid="mobile-menu-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={goToSection(l.id)}
                      className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-white transition text-base font-medium"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  navigate("/diagnostico");
                }}
                href="/diagnostico"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] text-base font-semibold"
                data-testid="mobile-cta"
              >
                Solicitar Acesso <ArrowRight className="w-4 h-4" />
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <ComingSoonModal
        open={clientAreaOpen}
        onClose={() => setClientAreaOpen(false)}
        title="Área do Cliente"
        subtitle="O portal de acompanhamento dedicado para clientes SGS está a caminho."
      />
    </>
  );
}
