import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  BarChart3,
  Repeat,
  Quote,
  Play,
} from "lucide-react";
import CountUp, { useInView } from "./CountUp";
import ComingSoonModal from "./ComingSoonModal";
import TopShowStoryChart from "./TopShowStoryChart";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const STATS = [
  {
    icon: TrendingUp,
    prefix: "R$ ",
    to: 47,
    suffix: "M+",
    label: "Receita gerada para clientes",
  },
  { icon: Users, prefix: "+", to: 200, suffix: "", label: "Empresas atendidas" },
  {
    icon: BarChart3,
    prefix: "+",
    to: 340,
    suffix: "%",
    label: "ROI médio em 12 meses",
  },
  { icon: Repeat, prefix: "", to: 98, suffix: "%", label: "Taxa de retenção" },
];

const CASES = [
  {
    slug: "angel-doces",
    name: "Angel Doces",
    sector: "Confeitaria artesanal",
    logo: "/assets/case_angel.webp",
    logoBg: "#ffffff",
    metric: "+312%",
    metricLabel: "em vendas",
    period: "após estruturação completa",
    quote:
      "Funil de vendas, ecossistema digital e audiovisual profissional — virou outro negócio.",
    points: [12, 16, 18, 24, 28, 35, 42, 48, 56, 64, 72, 88],
    color: "from-blue-400 to-pink-400",
  },
  {
    slug: "construfe",
    name: "Construfé",
    sector: "Indústria e construção",
    logo: "/assets/case_construfe.webp",
    logoBg: "#0F1729",
    metric: "+187%",
    metricLabel: "em leads qualificadas e visitas",
    period: "em 90 dias",
    quote:
      "Mais visita na loja, mais orçamento fechado e um time finalmente alinhado.",
    points: [8, 12, 18, 22, 30, 28, 38, 44, 52, 60, 68, 75],
    color: "from-cyan-400 to-blue-500",
  },
  {
    slug: "top-show",
    name: "Top Show",
    sector: "Entretenimento e eventos",
    logo: "/assets/case_topshow.webp",
    logoBg: "#0a050a",
    metric: "+20%",
    metricLabel: "no faturamento",
    period: "em 90 dias",
    quote:
      "Tráfego pago bem feito + audiovisual de alto impacto trouxeram um novo patamar de público.",
    points: [40, 42, 44, 48, 50, 52, 54, 56, 58, 60, 62, 64],
    color: "from-red-500 to-blue-500",
  },
];

const VIDEO_THUMBS = [
  { name: "Em breve", role: "Depoimento Angel Doces" },
  { name: "Em breve", role: "Depoimento Construfé" },
  { name: "Em breve", role: "Depoimento Top Show" },
  { name: "Em breve", role: "Depoimento cliente 4" },
  { name: "Em breve", role: "Depoimento cliente 5" },
];

function Sparkline({ points, gradientId }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 280;
  const h = 80;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div ref={ref} className={`sparkline ${inView ? "in-view" : ""}`}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1">
            <stop offset="0%" stopColor="#10D981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id={gradientId + "fill"} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${path} L ${w} ${h} L 0 ${h} Z`}
          fill={`url(#${gradientId}fill)`}
          opacity={inView ? 0.8 : 0}
          style={{ transition: "opacity 1.4s ease 0.4s" }}
        />
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function SocialProof() {
  const [comingOpen, setComingOpen] = useState(false);
  const [comingTitle, setComingTitle] = useState("");

  const openComing = (label) => {
    setComingTitle(label);
    setComingOpen(true);
  };

  return (
    <section
      id="cases"
      className="section relative bg-[#0c1322]"
      data-testid="section-social-proof"
    >
      <div className="mesh-bg opacity-50" aria-hidden />
      <div className="container-x relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Prova social
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Não pedimos que você confie.{" "}
            <span className="text-gradient-static">Mostramos os números.</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-slate-300 text-lg"
          >
            Resultados reais de empresas que aplicaram nosso método.
          </motion.p>
        </motion.div>

        {/* Stats banner */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative"
                data-testid={`stat-${i}`}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className="w-7 h-7 text-sgs-green mb-3" />
                  <CountUp
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    duration={2200}
                    className="font-display font-extrabold text-white whitespace-nowrap"
                    decimals={0}
                  />
                  <style>{`[data-testid="stat-${i}"] .font-display{font-size:clamp(34px,4.4vw,60px); line-height:1.05}`}</style>
                  <div className="mt-2 text-sm text-slate-400 max-w-[180px]">
                    {s.label}
                  </div>
                  <div
                    className="mt-3 h-[2px] w-16 rounded-full"
                    style={{ background: "var(--gradient-signature)" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <TopShowStoryChart />

        {/* Cases grid (real clients) */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="gradient-border p-6 rounded-2xl"
              data-testid={`case-${c.slug}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-xl overflow-hidden grid place-items-center shrink-0"
                  style={{ background: c.logoBg }}
                >
                  <img
                    src={c.logo}
                    alt={`Logo ${c.name}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.sector}</div>
                </div>
              </div>
              <div className="font-display text-4xl font-extrabold text-gradient-green">
                {c.metric}
              </div>
              <div className="text-slate-400 text-sm">
                {c.metricLabel} ·{" "}
                <span className="font-mono">{c.period}</span>
              </div>
              <div className="my-5">
                <Sparkline points={c.points} gradientId={`grad-${i}`} />
              </div>
              <div className="flex gap-2">
                <Quote className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{c.quote}"
                </p>
              </div>
              <Link
                to={`/cases/${c.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm text-sgs-green hover:gap-2 transition-all"
                data-testid={`case-link-${c.slug}`}
              >
                Ver case completo →
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Video testimonials → coming soon */}
        <div className="mt-16">
          <h3 className="font-display text-white text-2xl font-bold mb-5 text-center">
            Depoimentos em vídeo
          </h3>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
            {VIDEO_THUMBS.map((p, i) => (
              <button
                key={i}
                onClick={() => openComing("Depoimento em vídeo")}
                className="snap-center shrink-0 w-[200px] aspect-[9/16] rounded-2xl relative overflow-hidden group"
                data-testid={`video-thumb-${i}`}
                style={{
                  background: `linear-gradient(135deg, hsl(${(i * 60) % 360},60%,18%), hsl(${(i * 60 + 40) % 360},60%,30%))`,
                }}
              >
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 grid place-items-center group-hover:scale-110 transition">
                    <Play className="w-5 h-5 text-[#0a0e1a] ml-0.5" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-left">
                  <div className="text-white font-semibold text-sm">{p.name}</div>
                  <div className="text-slate-300 text-xs">{p.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ComingSoonModal
        open={comingOpen}
        onClose={() => setComingOpen(false)}
        title={comingTitle || "Em breve"}
        subtitle="Os depoimentos completos em vídeo estão sendo finalizados. Em breve você poderá assistir tudo por aqui."
      />
    </section>
  );
}
