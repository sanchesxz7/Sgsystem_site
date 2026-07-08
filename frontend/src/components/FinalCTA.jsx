import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Send, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import axios from "axios";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const REVENUE_OPTIONS = [
  "Até R$ 50 mil/mês",
  "R$ 50 mil — R$ 200 mil/mês",
  "R$ 200 mil — R$ 1 milhão/mês",
  "R$ 1 milhão — R$ 5 milhões/mês",
  "Acima de R$ 5 milhões/mês",
];

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function FinalCTA() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    contact: "",
    revenue: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const looksLikeEmailOrPhone = (v) => {
    const s = v.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    const isPhone = s.replace(/\D/g, "").length >= 10;
    return isEmail || isPhone;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!data.name || !data.contact || !data.revenue) {
      setError("Preencha nome, contato e faixa de faturamento.");
      return;
    }
    if (!looksLikeEmailOrPhone(data.contact)) {
      setError("Informe um e-mail válido ou um WhatsApp com DDD.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, { ...data, source: "final-cta" });
      navigate("/obrigado");
    } catch (err) {
      setError(
        err?.response?.data?.detail
          ? String(err.response.data.detail)
          : "Não foi possível enviar agora. Tente novamente em instantes.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className="section relative overflow-hidden"
      data-testid="section-final-cta"
    >
      {/* Mesh + gradient bg */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(circle at 80% 60%, rgba(139,92,246,0.3), transparent 60%), radial-gradient(circle at 50% 90%, rgba(236,72,153,0.2), transparent 60%)",
        }}
      />
      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span variants={fadeInUp} className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Diagnóstico gratuito
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display mt-5 font-extrabold text-white tracking-tight"
              style={{ fontSize: "clamp(34px, 4.8vw, 64px)", lineHeight: 1.04 }}
            >
              Pronto para escalar seu negócio{" "}
              <span className="text-gradient-static">com método</span>?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-slate-200 text-lg max-w-xl"
            >
              Agende um diagnóstico gratuito de 30 minutos e descubra o que está
              travando suas vendas.
            </motion.p>

            <motion.ul
              variants={fadeInUp}
              className="mt-8 space-y-2 text-slate-200"
            >
              {[
                "100% gratuito",
                "Sem compromisso",
                "Resposta em até 24h",
                "Atendido por especialista sênior",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sgs-green" />
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="mt-8">
              <Link
                to="/diagnostico"
                className="inline-flex items-center gap-2 text-sm text-sgs-green hover:gap-3 transition-all"
                data-testid="final-cta-diagnostico-link"
              >
                Prefere um diagnóstico completo? Responda algumas perguntas
                rápidas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
            onSubmit={submit}
            className="glass-card rounded-3xl p-7 sm:p-8"
            data-testid="lead-form"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="text-xs uppercase tracking-wider text-slate-400">
                  Nome
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  maxLength={80}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sgs-green/60 focus:bg-white/[0.07] transition"
                  placeholder="Seu nome completo"
                  data-testid="form-name"
                />
              </div>
              <div>
                <label htmlFor="lead-contact" className="text-xs uppercase tracking-wider text-slate-400">
                  E-mail ou WhatsApp
                </label>
                <input
                  id="lead-contact"
                  type="text"
                  required
                  maxLength={160}
                  value={data.contact}
                  onChange={(e) =>
                    setData({ ...data, contact: e.target.value })
                  }
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sgs-green/60 focus:bg-white/[0.07] transition"
                  placeholder="email@empresa.com ou (11) 99999-9999"
                  data-testid="form-contact"
                />
              </div>
              <div>
                <label htmlFor="lead-revenue" className="text-xs uppercase tracking-wider text-slate-400">
                  Faturamento atual
                </label>
                <select
                  id="lead-revenue"
                  required
                  value={data.revenue}
                  onChange={(e) =>
                    setData({ ...data, revenue: e.target.value })
                  }
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sgs-green/60 focus:bg-white/[0.07] transition"
                  data-testid="form-revenue"
                >
                  <option value="" className="bg-[#0F1729]">
                    Selecione uma faixa
                  </option>
                  {REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o} className="bg-[#0F1729]">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lead-message" className="text-xs uppercase tracking-wider text-slate-400">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="lead-message"
                  rows={3}
                  maxLength={1000}
                  value={data.message}
                  onChange={(e) =>
                    setData({ ...data, message: e.target.value })
                  }
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sgs-green/60 focus:bg-white/[0.07] transition resize-none"
                  placeholder="Conte rapidamente seu cenário"
                  data-testid="form-message"
                />
              </div>
              {error && (
                <div className="text-sm text-rose-400" data-testid="form-error">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="magnetic-btn w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition shadow-[0_0_28px_rgba(16,217,129,0.45)]"
                data-testid="form-submit"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    Solicitar Diagnóstico Gratuito{" "}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 text-center">
                Ao enviar, você concorda com nossa Política de Privacidade.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
