import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardCheck,
  Compass,
  Rocket,
  LineChart,
  ArrowUpRight,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Diagnóstico Gratuito",
    duration: "30 min",
    desc:
      "Call estratégica para entender seu negócio, mapear gargalos e validar fit com nosso método.",
  },
  {
    icon: Compass,
    title: "Planejamento Estratégico",
    duration: "Semana 1–2",
    desc:
      "Estruturamos o método para o seu nicho: KPIs, canais, criativos, automações e cronograma.",
  },
  {
    icon: Rocket,
    title: "Execução",
    duration: "Semana 2–4",
    desc:
      "Time dedicado roda campanhas, dev, automações e conteúdo simultaneamente, com sprints semanais.",
  },
  {
    icon: LineChart,
    title: "Monitoramento Contínuo",
    duration: "On-going",
    desc:
      "Dashboard em tempo real com métricas de tráfego, vendas, retenção e LTV para decisões ágeis.",
  },
  {
    icon: ArrowUpRight,
    title: "Otimização e Escala",
    duration: "Mês 2+",
    desc:
      "Ciclos mensais de testes A/B, refino de criativos e expansão para novos canais e segmentos.",
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="processo"
      className="section relative"
      data-testid="section-process"
    >
      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-magenta" /> Como trabalhamos
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Um processo claro,{" "}
            <span className="text-gradient-static">do diagnóstico ao escalar</span>.
          </motion.h2>
        </motion.div>

        <div
          ref={containerRef}
          className="relative mt-16 max-w-4xl mx-auto"
        >
          {/* Vertical track */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <motion.div
            className="absolute left-6 lg:left-1/2 top-0 w-[2px] -translate-x-1/2 origin-top"
            style={{
              height: lineHeight,
              background: "var(--gradient-signature)",
              boxShadow: "0 0 12px rgba(139,92,246,0.5)",
            }}
          />

          <ul className="space-y-12">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6 }}
                  className="relative pl-16 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-10"
                  data-testid={`process-step-${i}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0A0E1A] border border-white/10 grid place-items-center top-1">
                    <div
                      className="w-9 h-9 rounded-full grid place-items-center"
                      style={{
                        background:
                          "linear-gradient(135deg,#3B82F6,#8B5CF6,#EC4899)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {left ? (
                    <>
                      <div className="lg:text-right lg:pr-10">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Etapa 0{i + 1} · {s.duration}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mt-2">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="lg:pl-10">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Etapa 0{i + 1} · {s.duration}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mt-2">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
