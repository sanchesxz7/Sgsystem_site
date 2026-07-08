import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SgsLogo from "../components/SgsLogo";
import { buildWhatsAppUrl } from "../lib/constants";

export default function ThankYou() {
  return (
    <main
      className="min-h-screen relative grid place-items-center overflow-hidden p-6"
      data-testid="page-thanks"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(16,217,129,0.18), transparent 60%), radial-gradient(circle at 70% 80%, rgba(139,92,246,0.18), transparent 60%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="glass-card rounded-3xl max-w-xl w-full p-10 text-center relative"
      >
        <div className="flex justify-center mb-6">
          <SgsLogo size={56} />
        </div>
        <div className="w-16 h-16 mx-auto rounded-full grid place-items-center bg-emerald-400/15 border border-emerald-400/30">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="font-display mt-6 text-3xl sm:text-4xl font-extrabold text-white">
          Recebemos seu pedido!
        </h1>
        <p className="mt-4 text-slate-300 leading-relaxed">
          Nossa equipe vai entrar em contato em até{" "}
          <span className="text-white font-semibold">24h úteis</span> para
          agendar seu diagnóstico gratuito de 30 minutos.
        </p>
        <p className="mt-2 text-slate-400 text-sm">
          Enquanto isso, dá uma olhada nos nossos cases ou fala com a gente
          direto no WhatsApp.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white hover:bg-white/5 transition"
            data-testid="thanks-back"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao site
          </Link>
          <a
            href={buildWhatsAppUrl("Olá! Vim pelo site da Sanches Group System.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.03] transition"
            data-testid="thanks-whatsapp"
          >
            <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
          </a>
        </div>
      </motion.div>
    </main>
  );
}
