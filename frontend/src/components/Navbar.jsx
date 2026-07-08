import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import SgsLogo from "./SgsLogo";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Método", href: "#metodo" },
  { label: "Cases", href: "#cases" },
  { label: "Equipe", href: "#equipe" },
  { label: "VIP", href: "#vip" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contato"
              data-testid="nav-cliente-area"
              className="hidden md:inline-flex text-sm text-slate-300 hover:text-white px-4 py-2 transition"
            >
              Área do Cliente
            </a>
            <a
              href="#contato"
              data-testid="nav-cta"
              className="magnetic-btn hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sgs-green text-[#04231b] text-sm font-semibold hover:scale-[1.03] transition shadow-[0_0_24px_rgba(16,217,129,0.4)]"
            >
              Solicitar Acesso <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex w-10 h-10 items-center justify-center rounded-full border border-white/10 text-white"
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
                  className="w-10 h-10 rounded-full border border-white/10 grid place-items-center text-white"
                  data-testid="mobile-menu-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="block px-4 py-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-white transition text-base font-medium"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                onClick={() => setOpen(false)}
                href="#contato"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] text-base font-semibold"
                data-testid="mobile-cta"
              >
                Solicitar Acesso <ArrowRight className="w-4 h-4" />
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
