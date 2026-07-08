import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Heart, DollarSign, RotateCcw, X } from "lucide-react";
import { useInView } from "./CountUp";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const PILLARS = [
  {
    id: "aquisicao",
    label: "Aquisição",
    icon: Target,
    color: "#3B82F6",
    angle: 270, // top
    desc: "Atrair audiência qualificada para o topo do funil.",
    detail:
      "Campanhas multicanal de tráfego pago, SEO técnico, parcerias e content marketing para gerar volume previsível de leads qualificados.",
    tools: ["Meta Ads", "Google Ads", "SEO Técnico", "Conteúdo SEO", "Parcerias"],
  },
  {
    id: "engajamento",
    label: "Engajamento",
    icon: Heart,
    color: "#EC4899",
    angle: 0, // right
    desc: "Construir confiança, autoridade e desejo.",
    detail:
      "Sequências de e-mail, automações no WhatsApp, conteúdo orgânico e nurturing para mover o lead até a decisão de compra.",
    tools: ["WhatsApp + IA", "E-mail", "Social Media", "Automação", "Conteúdo"],
  },
  {
    id: "monetizacao",
    label: "Monetização",
    icon: DollarSign,
    color: "#10D981",
    angle: 90, // bottom
    desc: "Realizar vendas com previsibilidade.",
    detail:
      "Otimização de checkouts, scripts de vendas, treinamento de SDRs e dashboards comerciais que destravam a conversão final.",
    tools: ["CRM", "Checkout", "Sales Ops", "Pricing", "Funis"],
  },
  {
    id: "retencao",
    label: "Retenção",
    icon: RotateCcw,
    color: "#8B5CF6",
    angle: 180, // left
    desc: "Manter os clientes comprando mais e por mais tempo.",
    detail:
      "Customer success, programas de fidelidade, upsell, NPS e automações pós-venda que ampliam o LTV.",
    tools: ["CS", "NPS", "Upsell", "Programa de Fidelidade", "Onboarding"],
  },
];

const SIZE = 460;
const RADIUS = 170;
const CENTER = SIZE / 2;

function pillarPos(angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(a),
    y: CENTER + RADIUS * Math.sin(a),
  };
}

export default function Method() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [active, setActive] = useState(null);
  const [typed, setTyped] = useState("");
  const phrase = "nunca pare de vender";

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(phrase.slice(0, i));
      if (i >= phrase.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section
      id="metodo"
      ref={ref}
      className="section relative bg-[#0c1322] overflow-hidden"
      data-testid="section-method"
    >
      <div className="mesh-bg" aria-hidden />
      <div className="container-x relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-purple" /> Método científico
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(32px, 4.4vw, 56px)", lineHeight: 1.08 }}
          >
            Existe um método científico para que sua empresa{" "}
            <span className="text-gradient-green inline-block min-w-[1ch]">
              {typed || "\u00A0"}
              <span
                className="inline-block w-[2px] h-[0.9em] bg-emerald-400 ml-1 align-[-0.1em]"
                style={{ animation: "pulse-dot 1s steps(2) infinite" }}
              />
            </span>
            .
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-slate-300 text-lg">
            Se você não segui-lo, ela não vai sair do lugar.
          </motion.p>
        </motion.div>

        {/* Diagram */}
        <div className="mt-16 flex justify-center">
          <div className="relative" style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}>
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="arc-grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="url(#arc-grad)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                opacity="0.4"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="url(#arc-grad)"
                strokeWidth="2"
                strokeDasharray="120 800"
                style={{
                  animation: inView ? "spark-flow 4s linear infinite" : "none",
                }}
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r="6"
                fill="#fff"
                style={{
                  animation: inView ? "spark-flow 4s linear infinite" : "none",
                  transformOrigin: `${CENTER}px ${CENTER}px`,
                  filter: "drop-shadow(0 0 8px #fff)",
                }}
              />
            </svg>

            {/* Center orb */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full grid place-items-center text-center"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.4), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.2) 100%)",
                  boxShadow: "0 0 60px rgba(139,92,246,0.4)",
                }}
              >
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-slate-300 uppercase">
                    Método
                  </div>
                  <div className="font-display font-extrabold text-white text-2xl mt-1">
                    SGS
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pillars */}
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              const pos = pillarPos(p.angle);
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.18, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActive(p)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: pos.x, top: pos.y }}
                  data-testid={`method-pillar-${p.id}`}
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl grid place-items-center transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}55, #111827)`,
                      border: `1px solid ${p.color}55`,
                      boxShadow: `0 0 30px ${p.color}40`,
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="mt-2 text-center text-sm font-semibold text-white whitespace-nowrap">
                    {p.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Pillar cards row */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.button
                key={p.id}
                onClick={() => setActive(p)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="text-left rounded-2xl p-5 bg-[#111827]/70 border border-white/5 hover:border-white/20 transition"
                data-testid={`method-card-${p.id}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl grid place-items-center"
                    style={{ background: `${p.color}22`, color: p.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display font-bold text-white">
                    {p.label}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-400">{p.desc}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-3xl max-w-lg w-full p-7"
              onClick={(e) => e.stopPropagation()}
              data-testid="method-modal"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl grid place-items-center"
                    style={{ background: `${active.color}22`, color: active.color }}
                  >
                    <active.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white">
                      {active.label}
                    </div>
                    <div className="text-sm text-slate-400">{active.desc}</div>
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-5 text-slate-300 leading-relaxed">{active.detail}</p>
              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Ferramentas e práticas
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
