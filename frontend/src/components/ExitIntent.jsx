import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

const SESSION_KEY = "sgs-exit-intent-shown";

export default function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Avoid showing again in same session
    if (window.sessionStorage?.getItem(SESSION_KEY)) return;

    let armed = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, 8000); // arm after 8s on page

    const onMouseLeave = (e) => {
      if (!armed) return;
      if (e.clientY <= 0 && !open) {
        setOpen(true);
        try {
          window.sessionStorage?.setItem(SESSION_KEY, "1");
        } catch {}
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] grid place-items-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
          data-testid="exit-intent"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white"
              data-testid="exit-intent-close"
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="w-14 h-14 rounded-2xl grid place-items-center mb-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,217,129,0.25), rgba(59,130,246,0.25))",
                boxShadow: "0 0 40px rgba(16,217,129,0.35)",
              }}
            >
              <Sparkles className="w-6 h-6 text-emerald-300" />
            </div>
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
              Antes de você ir...
            </span>
            <h3 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Ganhe um diagnóstico{" "}
              <span className="text-gradient-green">100% gratuito</span>.
            </h3>
            <p className="mt-3 text-slate-300">
              30 minutos com um especialista sênior para mapear o que está
              travando suas vendas — sem compromisso e com plano de ação no
              final.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
              <li>✓ Análise rápida do seu funil atual</li>
              <li>✓ Sugestões priorizadas por impacto</li>
              <li>✓ Resposta em até 24h úteis</li>
            </ul>
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.02] transition glow-cta"
              data-testid="exit-intent-cta"
            >
              Quero meu diagnóstico gratuito <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full text-center text-xs text-slate-400 hover:text-white transition"
            >
              Agora não, obrigado.
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
