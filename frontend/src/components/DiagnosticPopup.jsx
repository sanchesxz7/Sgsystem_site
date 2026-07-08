import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/constants";

const STORAGE_KEY = "sgs-diag-popup";
const TTL_MS = 24 * 60 * 60 * 1000; // 24h

const WHATSAPP_URL = buildWhatsAppUrl("Olá! Quero meu Diagnóstico Gratuito com a SGS.");

export default function DiagnosticPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const last = window.localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      if (!last || now - Number(last) > TTL_MS) {
        // Abre imediatamente após mount
        setOpen(true);
        window.localStorage.setItem(STORAGE_KEY, String(now));
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="diag-popup-title"
          data-testid="diagnostic-popup"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-3xl w-full max-w-md p-7 sm:p-8 relative"
            style={{ width: "min(90vw, 28rem)" }}
          >
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white hover:bg-white/5 transition"
              data-testid="diag-popup-close"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-14 h-14 rounded-2xl grid place-items-center mb-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,217,129,0.25), rgba(59,130,246,0.25))",
                boxShadow: "0 0 40px rgba(16,217,129,0.4)",
              }}
            >
              <Target className="w-6 h-6 text-emerald-300" />
            </motion.div>

            <h3
              id="diag-popup-title"
              className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight"
            >
              Diagnóstico{" "}
              <span className="text-gradient-green">Gratuito</span> 🎯
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Descubra o que está travando o crescimento da sua empresa. Fale
              agora com um especialista SGS — <strong>sem compromisso</strong>.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="cta-primary inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-[#04231b] font-semibold"
                data-testid="diag-popup-cta"
              >
                <MessageCircle className="w-4 h-4" /> Quero meu Diagnóstico
              </a>
              <button
                onClick={close}
                className="text-sm text-slate-400 hover:text-white py-2 transition"
                data-testid="diag-popup-dismiss"
              >
                Agora não
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
