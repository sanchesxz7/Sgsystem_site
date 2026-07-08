import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Rss } from "lucide-react";
import SgsLogo from "../components/SgsLogo";

export default function Blog() {
  return (
    <main className="min-h-screen relative pb-24" data-testid="page-blog">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[50vh] -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.2), transparent 60%)",
        }}
      />
      <header className="container-x py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <SgsLogo size={36} />
          <span className="font-display font-extrabold text-white">
            Sanches Group System
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-slate-200 hover:bg-white/5 transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </header>

      <section className="container-x mt-12 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))",
            boxShadow: "0 0 40px rgba(139,92,246,0.35)",
          }}
        >
          <Rss className="w-7 h-7 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-extrabold text-white"
        >
          Blog SGS · <span className="text-gradient-static">Em breve</span> 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-slate-300 text-lg"
        >
          Vamos publicar guias, estudos de caso e bastidores do método SGS para
          ajudar empresas a crescer com previsibilidade. Quer receber em
          primeira mão?
        </motion.p>
        <Link
          to="/#contato"
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.03] transition"
        >
          Inscrever-me <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
