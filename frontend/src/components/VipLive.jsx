import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Unlock, Crown, Sparkles, Activity, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const PROJECTS = [
  {
    name: "Angel Doces — Black Friday",
    status: "Em andamento",
    statusColor: "#10D981",
    progress: 78,
    update: "Campanha de remarketing ativada · ROAS 4,2x",
  },
  {
    name: "Construfé — Funil B2B",
    status: "Em análise",
    statusColor: "#F59E0B",
    progress: 42,
    update: "Aguardando aprovação dos 3 criativos novos",
  },
  {
    name: "Top Show — Tour 2026",
    status: "Em andamento",
    statusColor: "#3B82F6",
    progress: 64,
    update: "Edição final do VSL em renderização",
  },
];

export default function VipLive() {
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  return (
    <section
      id="vip"
      className="section relative bg-[#0c1322] overflow-hidden"
      data-testid="section-vip"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(245,158,11,0.15), transparent 60%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.15), transparent 60%)",
        }}
      />
      <div className="container-x relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeInUp}
            className="eyebrow"
            style={{
              borderColor: "rgba(245,158,11,0.4)",
              background: "rgba(245,158,11,0.08)",
              color: "#FCD34D",
              boxShadow: "0 0 24px rgba(245,158,11,0.25)",
            }}
          >
            <Crown className="w-3.5 h-3.5" /> Área VIP · Acesso restrito
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Acompanhe seus projetos{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#FCD34D,#F59E0B,#EC4899)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ao vivo
            </span>
            .
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-slate-300 text-lg max-w-xl"
          >
            Feed em tempo real de campanhas, deploys, aprovações e métricas.
            Exclusivo para membros do ecossistema SGS.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
          {/* Left card: access state */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            className="glass-card rounded-3xl p-6 sticky top-24"
            data-testid="vip-side-card"
          >
            <div className="flex items-center gap-2 text-amber-300">
              {unlocked ? (
                <Unlock className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              <span className="text-xs uppercase tracking-wider">
                {unlocked ? "Acesso liberado" : "Acesso bloqueado"}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mt-3">
              {unlocked ? "Você está dentro" : "Membro do ecossistema?"}
            </h3>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {unlocked
                ? "Veja o status de cada projeto atualizado em tempo real."
                : "O acompanhamento ao vivo é exclusivo para clientes ativos da SGS. Solicite seu acesso para visualizar todos os projetos."}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="/diagnostico"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/diagnostico");
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.02] transition"
                data-testid="vip-cta-access"
              >
                Solicitar acesso <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setUnlocked((u) => !u)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/40 text-amber-200 text-sm hover:bg-amber-400/10 transition"
                data-testid="vip-demo-toggle"
              >
                <Sparkles className="w-4 h-4" />
                {unlocked ? "Bloquear demonstração" : "Demo: desbloquear"}
              </button>
            </div>
          </motion.div>

          {/* Right: feed (locked overlay or revealed) */}
          <div className="relative">
            <div
              className={`space-y-4 transition-all duration-500 ${
                unlocked ? "" : "blur-md pointer-events-none select-none"
              }`}
              data-testid="vip-feed"
            >
              {PROJECTS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl grid place-items-center"
                        style={{
                          background: `${p.statusColor}22`,
                          color: p.statusColor,
                        }}
                      >
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{p.name}</div>
                        <div className="text-xs text-slate-400">
                          {p.update}
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${p.statusColor}22`,
                        color: p.statusColor,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: unlocked ? `${p.progress}%` : 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg,#10D981,#3B82F6,#8B5CF6)",
                        }}
                      />
                    </div>
                    <span className="font-mono text-white text-sm w-12 text-right">
                      {p.progress}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {!unlocked && (
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="glass-card rounded-3xl px-8 py-7 text-center max-w-sm">
                  <Lock className="w-7 h-7 text-amber-300 mx-auto" />
                  <div className="mt-3 font-display text-xl font-bold text-white">
                    Conteúdo exclusivo
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Solicite acesso ao programa SGS para ver o status dos seus
                    projetos em tempo real.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
