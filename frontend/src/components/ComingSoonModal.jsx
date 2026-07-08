import { motion, AnimatePresence } from "framer-motion";
import { Rocket, X } from "lucide-react";
import { scrollToId } from "../lib/scroll";

export default function ComingSoonModal({ open, onClose, title, subtitle }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4"
          onClick={onClose}
          data-testid="coming-soon-modal"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl max-w-md w-full p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 mx-auto rounded-full grid place-items-center mb-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))",
                boxShadow: "0 0 40px rgba(139,92,246,0.45)",
              }}
            >
              <Rocket className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="font-display text-2xl font-extrabold text-white">
              {title || "Em breve"} <span className="inline-block">🚀</span>
            </h3>
            <p className="mt-3 text-slate-300">
              {subtitle ||
                "Estamos preparando este conteúdo. Em breve você poderá assistir e explorar tudo por aqui."}
            </p>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                scrollToId("contato");
              }}
              className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.03] transition"
            >
              Quero ser avisado em primeira mão
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
