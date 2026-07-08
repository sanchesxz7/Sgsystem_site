import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Star, CheckCircle2 } from "lucide-react";
import SgsLogo from "./SgsLogo";

const HEADLINE_WORDS = [
  "Soluções",
  "Digitais",
  "para",
  "o",
  { text: "Crescimento", gradient: true },
  "do",
  "Seu",
  "Negócio",
];

const NOTIFICATIONS = [
  { text: "Deploy realizado", time: "há 2 min" },
  { text: "Lead capturado", time: "há 4 min" },
  { text: "Campanha otimizada", time: "há 7 min" },
  { text: "ROI atualizado", time: "há 11 min" },
];

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let w = (c.width = c.offsetWidth * window.devicePixelRatio);
    let h = (c.height = c.offsetHeight * window.devicePixelRatio);
    const N = 50;
    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.2,
    }));
    const onResize = () => {
      w = c.width = c.offsetWidth * window.devicePixelRatio;
      h = c.height = c.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", onResize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 188, 255, ${d.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden
    />
  );
}

function DashboardMock() {
  const [progress, setProgress] = useState(0);
  const [notifIdx, setNotifIdx] = useState(0);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const t = setTimeout(() => setProgress(78), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const i = setInterval(
      () => setNotifIdx((x) => (x + 1) % NOTIFICATIONS.length),
      4000,
    );
    return () => clearInterval(i);
  }, []);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 6, ry: px * 8 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      className="relative"
      style={{ perspective: 1400 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        ref={cardRef}
        className="glass-card rounded-3xl p-6 sm:p-7 w-full max-w-[460px] float-y"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform .25s ease",
        }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        data-testid="hero-dashboard"
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sgs-blue via-sgs-purple to-sgs-magenta grid place-items-center text-white font-bold">
              SG
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                Dashboard SGS
              </div>
              <div className="text-slate-400 text-xs font-mono">
                client.sanches.io
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Performance Geral
            </span>
            <span className="font-mono text-white text-sm font-semibold">
              {progress}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg,#10D981,#3B82F6,#8B5CF6,#EC4899)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Big metric */}
        <div className="rounded-2xl bg-[#0b1220] border border-white/5 p-4 mb-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Conversões este mês
          </div>
          <div className="flex items-end gap-2">
            <Counter
              to={127}
              prefix="+"
              suffix="%"
              className="font-display text-4xl sm:text-5xl font-extrabold text-gradient-static"
            />
            <span className="text-emerald-400 text-xs mb-2">▲ vs período anterior</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Total", value: 24 },
            { label: "Concluídas", value: 18, color: "text-emerald-400" },
            { label: "Em revisão", value: 4, color: "text-blue-400" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/[0.03] border border-white/5 p-3"
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {s.label}
              </div>
              <Counter
                to={s.value}
                duration={1500}
                className={`font-mono text-xl font-bold ${s.color || "text-white"}`}
              />
            </div>
          ))}
        </div>

        {/* Notification ticker */}
        <div className="relative h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 px-3 overflow-hidden">
          {NOTIFICATIONS.map((n, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                y: i === notifIdx ? 0 : -50,
                opacity: i === notifIdx ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center gap-2 px-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white">{n.text}</span>
              <span className="ml-auto text-xs text-slate-400 font-mono">
                {n.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute -left-10 sm:-left-16 top-10 glass-card rounded-2xl px-4 py-3 hidden sm:block"
      >
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">
          ROI 12m
        </div>
        <div className="font-mono text-2xl font-extrabold text-gradient-green">
          +340%
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute -right-6 sm:-right-10 bottom-12 glass-card rounded-2xl px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-mono text-white font-bold">4.9</span>
          <span className="text-xs text-slate-400">200+ clientes</span>
        </div>
      </motion.div>
    </div>
  );
}

function Counter({ to, prefix = "", suffix = "", duration = 2000, className }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const t = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, 600);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span className={className}>
      {prefix}
      {Math.round(v)}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-28 lg:pt-24 pb-20 overflow-hidden"
      data-testid="section-hero"
    >
      {/* Backgrounds */}
      <div className="mesh-bg" aria-hidden />
      <div className="grid-overlay" aria-hidden />
      <Particles />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle,#8B5CF6,transparent 70%)" }}
      />

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
          {/* Left */}
          <div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="font-display font-extrabold text-white leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(40px, 6.2vw, 84px)" }}
              data-testid="hero-headline"
            >
              {HEADLINE_WORDS.map((w, i) => {
                const isObj = typeof w === "object";
                const text = isObj ? w.text : w;
                return (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className={`inline-block mr-[0.25em] ${isObj ? "text-gradient" : ""}`}
                  >
                    {text}
                  </motion.span>
                );
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-6 max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed"
              data-testid="hero-subhead"
            >
              Desenvolvimento Web, Aplicativos, Automação e Gestão de Tráfego
              Digital com resultados mensuráveis para empresas que buscam
              excelência.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contato"
                data-testid="hero-cta-primary"
                className="cta-primary group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[#04231b] font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com Consultor
              </a>
              <a
                href="#contato"
                data-testid="hero-cta-secondary"
                className="cta-secondary group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold"
              >
                Solicitar Acesso à Plataforma
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-7 flex items-center gap-4"
            >
              <div className="flex items-center" data-testid="hero-logo-stack">
                {[
                  { src: "/assets/case_angel.png", alt: "Angel Doces", bg: "#ffffff" },
                  { src: "/assets/case_construfe.png", alt: "Construfé", bg: "#0F1729" },
                  { src: "/assets/case_topshow.png", alt: "Top Show", bg: "#0a050a" },
                ].map((l, i) => (
                  <img
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    width={36}
                    height={36}
                    loading="lazy"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "2px solid #0A0E1A",
                      marginLeft: i === 0 ? 0 : -10,
                      objectFit: "contain",
                      background: l.bg,
                      zIndex: 10 - i,
                    }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="text-white font-semibold">
                  +200 empresas escalando com a SGS
                </div>
                <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-mono">4.9/5</span> em avaliações
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — visual */}
          <div className="relative flex flex-col items-center gap-10 lg:gap-12">
            <SgsLogo variant="hero" size={140} className="hidden md:inline-block" />
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}
