import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { useMediaQuery } from "../hooks/use-media-query";
import { useInView } from "./CountUp";
import { staggerContainer, fadeInUp } from "../lib/animations";

// Real case: TOP Show, Jan–Jul 2026. Growth is deliberately not a straight
// line — the dips (Mar, Mai) are what make the "+1.650% em 6 meses" land as
// credible rather than a marketing curve.
const TOPSHOW_SERIES = [
  { month: "Jan/26", value: 20000, milestone: null },
  { month: "Fev/26", value: 48000, milestone: "Funil reestruturado" },
  { month: "Mar/26", value: 41000, milestone: "Ajuste de campanhas" },
  { month: "Abr/26", value: 95000, milestone: "Retomada forte" },
  { month: "Mai/26", value: 82000, milestone: "Queda sazonal" },
  { month: "Jun/26", value: 190000, milestone: "Escala de mídia paga" },
  { month: "Jul/26", value: 350000, milestone: null },
];
const SEGMENT_COUNT = TOPSHOW_SERIES.length - 1;
const GROWTH_PCT = Math.round(
  ((TOPSHOW_SERIES.at(-1).value - TOPSHOW_SERIES[0].value) / TOPSHOW_SERIES[0].value) * 100,
);

const CHART_W = 1000;
const CHART_H = 420;
const CHART_PAD = { top: 30, right: 24, bottom: 36, left: 16 };

// Scroll fractions (of this panel's own pin duration) spent drawing the
// line — the remaining tail is reserved for the final badge beat.
const PROGRESS_DOMAIN = [0.05, 0.85];
const MILESTONE_FADE_MARGIN = 0.025;
const PIN_HEIGHT_VH = 260;

const COLOR_UP = "var(--accent-green)";
const COLOR_DOWN = "var(--accent-red)";
// Framer Motion's useTransform needs real hex/rgb values to blend between —
// it can't resolve CSS custom properties at animation time — so any
// *interpolated* (not just statically-picked) color uses these literals,
// which mirror the --accent-green/--accent-red/neutral tokens.
const COLOR_UP_HEX = "#10d981";
const COLOR_DOWN_HEX = "#ef4444";
const COLOR_NEUTRAL_HEX = "#e5e7eb";

const currencyFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const formatCurrency = (v) => `R$ ${currencyFormatter.format(Math.round(v))}`;

function buildChartPoints(series, w, h, pad) {
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const values = series.map((p) => p.value);
  const max = Math.max(...values) * 1.08;
  const min = Math.min(...values) * 0.85;
  const stepX = innerW / (series.length - 1);
  return series.map((p, i) => {
    const x = pad.left + i * stepX;
    const y = pad.top + innerH - ((p.value - min) / (max - min)) * innerH;
    return { x, y, ...p };
  });
}

// Progress value (within PROGRESS_DOMAIN) at which point `i` is reached.
function pointProgress(i) {
  const [start, end] = PROGRESS_DOMAIN;
  return start + (i / SEGMENT_COUNT) * (end - start);
}

function TopShowSegment({ index, p1, p2, up, progress }) {
  const range = [pointProgress(index), pointProgress(index + 1)];
  const pathLengthValue = useTransform(progress, range, [0, 1], { clamp: true });
  return (
    <motion.line
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke={up ? COLOR_UP : COLOR_DOWN}
      strokeWidth="3.5"
      strokeLinecap="round"
      style={{
        pathLength: pathLengthValue,
        filter: up
          ? "drop-shadow(0 0 8px rgba(16,217,129,0.5))"
          : "drop-shadow(0 0 8px rgba(239,68,68,0.5))",
      }}
      data-testid={`topshow-segment-${index}`}
    />
  );
}

function TopShowMilestone({ point, index, progress }) {
  const t = pointProgress(index);
  const inStart = Math.max(0, t - MILESTONE_FADE_MARGIN);
  const outEnd = Math.min(1, t + MILESTONE_FADE_MARGIN * 3);
  const opacity = useTransform(progress, [inStart, t, outEnd - MILESTONE_FADE_MARGIN, outEnd], [0, 1, 1, 0], {
    clamp: true,
  });
  const scale = useTransform(progress, [inStart, t], [0.85, 1], { clamp: true });
  const leftPct = (point.x / CHART_W) * 100;
  const topPct = (point.y / CHART_H) * 100;

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-full pb-3 pointer-events-none"
      style={{ left: `${leftPct}%`, top: `${topPct}%`, opacity, scale }}
      data-testid="topshow-milestone"
    >
      <div className="whitespace-nowrap rounded-full bg-black/80 border border-white/10 px-3 py-1 text-xs font-mono text-white shadow-lg">
        {point.month} · {point.milestone}
      </div>
    </motion.div>
  );
}

function TrendGlow({ trendSignal }) {
  const greenOpacity = useTransform(trendSignal, [-1, 0, 1], [0, 0, 0.3]);
  const redOpacity = useTransform(trendSignal, [-1, 0, 1], [0.3, 0, 0]);
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: greenOpacity,
          background: "radial-gradient(circle at 50% 45%, rgba(16,217,129,0.55), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: redOpacity,
          background: "radial-gradient(circle at 50% 45%, rgba(239,68,68,0.55), transparent 65%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

function LiveTopShowCounter({ value, colorMV }) {
  const ref = useRef(null);
  useMotionValueEvent(value, "change", (latest) => {
    if (ref.current) ref.current.textContent = formatCurrency(latest);
  });
  useMotionValueEvent(colorMV, "change", (latest) => {
    if (ref.current) ref.current.style.color = latest;
  });
  return (
    <span
      ref={ref}
      className="font-display font-extrabold inline-block text-right whitespace-nowrap"
      style={{
        fontSize: "clamp(30px, 3.6vw, 46px)",
        color: colorMV.get(),
        // Reserve space for the widest value ("R$ 350.000") up front: this
        // counter's width would otherwise grow with the digit count as it
        // counts up, which can flip the header row's flex-wrap mid-scroll —
        // that changes the panel's own height while useScroll is measuring
        // it, which corrupts scrollYProgress (the final badge fade never
        // completed because of exactly this feedback loop).
        minWidth: "11ch",
      }}
      data-testid="topshow-counter"
    >
      {formatCurrency(value.get())}
    </span>
  );
}

function TipDot({ progress, points }) {
  const pointProgresses = points.map((_, i) => pointProgress(i));
  const cx = useTransform(progress, pointProgresses, points.map((p) => p.x), { clamp: true });
  const cy = useTransform(progress, pointProgresses, points.map((p) => p.y), { clamp: true });
  return (
    <>
      <motion.circle cx={cx} cy={cy} r={5} fill="#fff" />
      <motion.circle
        cx={cx}
        cy={cy}
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        initial={{ r: 5, opacity: 0.7 }}
        animate={{ r: [5, 16, 5], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </>
  );
}

function FinalBadge({ progress }) {
  const ref = useRef(null);
  // Direct DOM mutation (same pattern as LiveTopShowCounter above) instead
  // of binding opacity/scale through the `style` prop: with this many other
  // motion values updating on the same parent (trend glow, spring-smoothed
  // counter, per-segment pathLength) the declarative binding intermittently
  // failed to flush the last stretch of the fade-in to the DOM — the
  // motion value itself correctly reached 1, but the element's inline style
  // never reflected it. Imperative writes sidestep whatever's causing that.
  useMotionValueEvent(progress, "change", (v) => {
    const el = ref.current;
    if (!el) return;
    const t = Math.min(1, Math.max(0, (v - 0.86) / (0.94 - 0.86)));
    el.style.opacity = String(t);
    el.style.transform = `scale(${0.8 + 0.2 * t})`;
  });
  return (
    <div
      ref={ref}
      className="absolute top-6 right-6 sm:top-8 sm:right-8 rounded-2xl px-4 py-3 text-center"
      style={{
        opacity: 0,
        background: "rgba(16,217,129,0.12)",
        border: "1px solid rgba(16,217,129,0.4)",
        boxShadow: "0 0 30px rgba(16,217,129,0.35)",
      }}
      data-testid="topshow-final-badge"
    >
      <div className="font-display font-extrabold text-sgs-green text-xl sm:text-2xl">
        +{GROWTH_PCT}%
      </div>
      <div className="text-[11px] text-slate-300 uppercase tracking-wide">em 6 meses</div>
    </div>
  );
}

function TopShowHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {/* TODO: substituir por /assets/clients/topshow-logo.svg oficial assim
            que o asset de marca do cliente TOP Show for obtido — não recriar
            o logotipo via código/IA. */}
        <img src="/assets/clients/topshow-logo.svg" alt="TOP Show" className="h-6 sm:h-7" />
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-slate-300 uppercase tracking-wide">
          Case real · Jan–Jul 2026
        </span>
      </div>
    </div>
  );
}

function DesktopTopShowChart() {
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const points = useMemo(() => buildChartPoints(TOPSHOW_SERIES, CHART_W, CHART_H, CHART_PAD), []);
  const segments = useMemo(
    () =>
      TOPSHOW_SERIES.slice(0, -1).map((p, i) => ({
        index: i,
        up: TOPSHOW_SERIES[i + 1].value >= p.value,
      })),
    [],
  );

  const trendSignal = useTransform(
    scrollYProgress,
    [0, ...segments.map((s) => (pointProgress(s.index) + pointProgress(s.index + 1)) / 2), 1],
    [0, ...segments.map((s) => (s.up ? 1 : -1)), segments.at(-1).up ? 1 : -1],
    { clamp: true },
  );
  const counterColor = useTransform(
    trendSignal,
    [-1, 0, 1],
    [COLOR_DOWN_HEX, COLOR_NEUTRAL_HEX, COLOR_UP_HEX],
  );

  const pointProgresses = TOPSHOW_SERIES.map((_, i) => pointProgress(i));
  const rawValue = useTransform(scrollYProgress, pointProgresses, TOPSHOW_SERIES.map((p) => p.value));
  const smoothedValue = useSpring(rawValue, { stiffness: 90, damping: 20 });

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${PIN_HEIGHT_VH}vh` }}
      data-testid="topshow-panel"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container-x w-full">
          <div
            className="rounded-3xl p-6 sm:p-10 relative overflow-hidden"
            style={{ background: "#050505", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <TrendGlow trendSignal={trendSignal} />

            <div className="relative z-10">
              <TopShowHeader />

              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <span className="eyebrow">
                    <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Case em
                    destaque
                  </span>
                  <h3 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white">
                    TOP Show: de R$ 20 mil para R$ 350 mil/mês
                  </h3>
                  <p className="mt-2 text-slate-400 text-sm max-w-md">
                    6 meses de método aplicado. Com quedas, correções e escala —
                    como todo crescimento real.
                  </p>
                </div>
                <LiveTopShowCounter value={smoothedValue} colorMV={counterColor} />
              </div>

              <div className="relative w-full" style={{ aspectRatio: `${CHART_W} / ${CHART_H}` }}>
                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {segments.map((s) => (
                    <TopShowSegment
                      key={s.index}
                      index={s.index}
                      p1={points[s.index]}
                      p2={points[s.index + 1]}
                      up={s.up}
                      progress={scrollYProgress}
                    />
                  ))}
                  <TipDot progress={scrollYProgress} points={points} />
                </svg>

                {points.map(
                  (p, i) =>
                    p.milestone && (
                      <TopShowMilestone key={i} point={p} index={i} progress={scrollYProgress} />
                    ),
                )}
              </div>
            </div>

            <FinalBadge progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileTopShowChart() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const videoRef = useRef(null);
  const points = useMemo(() => buildChartPoints(TOPSHOW_SERIES, CHART_W, CHART_H, CHART_PAD), []);
  const milestones = points.filter((p) => p.milestone);
  // Matches the captured video's own pacing (~13s reveal) — the counter and
  // milestone/badge text below stay real accessible DOM content, only the
  // chart draw-on itself is a <video> now (see TOPSHOW_VIDEO_MS note below).
  const TOPSHOW_VIDEO_MS = 13000;
  const totalRevealMs = TOPSHOW_VIDEO_MS;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 sm:p-8 relative overflow-hidden mt-16"
      style={{ background: "#050505", border: "1px solid rgba(255,255,255,0.06)" }}
      data-testid="topshow-panel"
    >
      {/* Static, neutral ambient glow — no scroll-driven color shifting on mobile. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.18,
          background: "radial-gradient(circle at 50% 40%, rgba(16,217,129,0.4), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/*
          Real, screen-reader-visible text: the eyebrow/title/description,
          the "TOP SHOW" wordmark and the R$20k→R$350k counter are all
          already baked into the captured video's pixels below (it's a
          recording of the full desktop card, header included) — repeating
          the big header + live counter here as HTML would just be visual
          duplication. This heading stays for a11y/SEO; nothing else does.
        */}
        <span className="eyebrow">
          <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Case em destaque
        </span>
        <h3 className="sr-only">TOP Show: de R$ 20 mil para R$ 350 mil/mês em 6 meses</h3>

        <div
          className="relative w-full rounded-2xl overflow-hidden mt-4"
          style={{ aspectRatio: "960 / 676" }}
        >
          {/*
            Auto-captured recording of the desktop scrub reveal (see
            lib note in services-3d/data.js for the same pattern) — plays
            once when scrolled into view instead of re-running the
            scroll-linked SVG draw-on, which is the heavier of the two on a
            phone CPU. Not looped on purpose: this is a one-time reveal, not
            an ambient loop.
          */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            poster="/assets/videos/topshow.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            data-testid="topshow-video"
          >
            <source src="/assets/videos/topshow.webm" type="video/webm" />
            <source src="/assets/videos/topshow.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div
          variants={staggerContainer(0.08, totalRevealMs / 1000)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-6 flex flex-wrap gap-3"
        >
          {milestones.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="rounded-full bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-mono text-white"
              data-testid="topshow-milestone"
            >
              {p.month} · {p.milestone}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-5 inline-block rounded-2xl px-4 py-3"
          style={{
            background: "rgba(16,217,129,0.12)",
            border: "1px solid rgba(16,217,129,0.4)",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.5, delay: totalRevealMs / 1000 }}
          data-testid="topshow-final-badge"
        >
          <span className="font-display font-extrabold text-sgs-green text-xl">
            +{GROWTH_PCT}%
          </span>{" "}
          <span className="text-xs text-slate-300 uppercase tracking-wide">em 6 meses</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function TopShowStoryChart() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const useScrubMode = isDesktop && !prefersReducedMotion;

  return useScrubMode ? <DesktopTopShowChart /> : <MobileTopShowChart />;
}
