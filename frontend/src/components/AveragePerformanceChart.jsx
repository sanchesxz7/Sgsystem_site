import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "./CountUp";
import { staggerContainer, fadeInUp } from "../lib/animations";

// Aggregate monthly revenue trend across the client portfolio (R$, thousands)
// — an average trajectory, not any single client's case (the TOP Show case
// has its own dedicated chart in the Prova Social section). Compact, single
// "draws once on view" mode — no scroll pin, same weight budget on every
// device (this used to be RevenueScrollChart's desktop-scrub component;
// that mode is gone, this is what its mobile fallback already did).
const REVENUE_SERIES = [
  80, 100, 130, 170, 250, 340, 390, 430, 480, 540, 630, 740,
];
const MILESTONE_INDEXES = [0, 3, 5, 9, 11];

const CHART_W = 1000;
const CHART_H = 420;
const CHART_PAD = { top: 30, right: 24, bottom: 36, left: 16 };

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});
const formatRevenue = (thousands) => `R$ ${currencyFormatter.format(Math.round(thousands))} mil`;

function buildChartPoints(series, w, h, pad) {
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const max = Math.max(...series) * 1.08;
  const min = Math.min(...series) * 0.85;
  const stepX = innerW / (series.length - 1);
  return series.map((v, i) => {
    const x = pad.left + i * stepX;
    const y = pad.top + innerH - ((v - min) / (max - min)) * innerH;
    return { x, y, v };
  });
}

export default function AveragePerformanceChart() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const points = useMemo(
    () => buildChartPoints(REVENUE_SERIES, CHART_W, CHART_H, CHART_PAD),
    [],
  );
  const fullPath = useMemo(
    () => points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" "),
    [points],
  );
  const areaPath = `${fullPath} L ${points[points.length - 1].x} ${CHART_H - CHART_PAD.bottom} L ${points[0].x} ${CHART_H - CHART_PAD.bottom} Z`;
  const finalValue = REVENUE_SERIES[REVENUE_SERIES.length - 1];

  return (
    <div
      ref={ref}
      className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden"
      data-testid="average-performance-panel"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <span className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Média de
            faturamento
          </span>
          <p className="mt-3 text-slate-400 text-sm max-w-sm">
            Média agregada de faturamento entre os clientes ativos do método
            SGS, mês a mês.
          </p>
        </div>
        <span
          className="font-display font-extrabold text-white"
          style={{ fontSize: "clamp(26px, 6vw, 36px)" }}
        >
          {formatRevenue(finalValue)}
        </span>
      </div>

      <div className="relative w-full" style={{ aspectRatio: `${CHART_W} / ${CHART_H}` }}>
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="avg-perf-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#10D981" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="avg-perf-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill="url(#avg-perf-area)"
            style={{ opacity: inView ? 0.85 : 0, transition: "opacity 1.2s ease 0.3s" }}
          />
          <motion.path
            d={fullPath}
            fill="none"
            stroke="url(#avg-perf-line)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mt-6 flex flex-wrap gap-3"
      >
        {MILESTONE_INDEXES.map((idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className="rounded-full bg-[#0c1322]/90 border border-white/10 px-3 py-1.5 text-xs font-mono text-white"
            data-testid={`average-performance-milestone-${idx}`}
          >
            Mês {idx + 1} ·{" "}
            <span className="text-sgs-green">{formatRevenue(REVENUE_SERIES[idx])}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
