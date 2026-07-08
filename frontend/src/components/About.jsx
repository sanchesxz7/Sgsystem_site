import { motion } from "framer-motion";
import { Cpu, Users, BarChart3, HeadphonesIcon } from "lucide-react";
import SgsLogo from "./SgsLogo";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const DIFFS = [
  {
    icon: Cpu,
    title: "Tecnologia Proprietária",
    desc:
      "Stack moderna e ferramentas internas que aceleram entregas sem abrir mão de qualidade.",
  },
  {
    icon: Users,
    title: "Time Especialista",
    desc:
      "Devs sêniores, traffickers, designers, redatores e CSMs trabalhando juntos no seu projeto.",
  },
  {
    icon: BarChart3,
    title: "Resultado Mensurável",
    desc:
      "Dashboards transparentes com KPIs comerciais e de marketing atualizados em tempo real.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte 24/7",
    desc:
      "Time de plantão para incidentes críticos e canal direto via WhatsApp com seu gerente.",
  },
];

export default function About() {
  return (
    <section id="sobre" className="section relative" data-testid="section-about">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          {/* Left text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="eyebrow"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Sobre a SGS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="font-display mt-5 font-extrabold text-white tracking-tight"
              style={{ fontSize: "clamp(32px, 4.4vw, 56px)", lineHeight: 1.06 }}
            >
              Códigos que <span className="text-gradient-static">escalam negócios</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="mt-5 text-slate-300 text-lg leading-relaxed"
            >
              Somos uma empresa brasileira de Soluções Digitais Corporativas que
              une engenharia, marketing e operações sob um único método. Nossa
              missão é transformar cada real investido em crescimento
              previsível, mensurável e duradouro.
            </motion.p>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-10 grid sm:grid-cols-2 gap-4"
            >
              {DIFFS.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg,#3B82F622,#8B5CF622)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-sgs-blue" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{d.title}</div>
                      <div className="text-sm text-slate-400 mt-1">
                        {d.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right collage */}
          <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[520px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7 }}
              className="col-span-4 row-span-4 rounded-2xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg,#3B82F6,#8B5CF6,#EC4899)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
              <div className="absolute inset-0 grid place-items-center">
                <SgsLogo size={120} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="col-span-2 row-span-3 rounded-2xl bg-[#0F1729] border border-white/5 p-5 flex flex-col justify-end"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 20%, rgba(16,217,129,0.18), transparent 60%)",
              }}
            >
              <div className="font-mono text-xs text-slate-400">desde 2018</div>
              <div className="font-display text-3xl font-extrabold text-gradient-green mt-1">
                +200
              </div>
              <div className="text-sm text-slate-300">empresas atendidas</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="col-span-2 row-span-3 rounded-2xl bg-[#0F1729] border border-white/5 p-5 flex flex-col justify-end"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.2), transparent 60%)",
              }}
            >
              <div className="font-mono text-xs text-slate-400">time</div>
              <div className="font-display text-3xl font-extrabold text-white mt-1">
                42
              </div>
              <div className="text-sm text-slate-300">especialistas</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="col-span-3 row-span-2 rounded-2xl bg-[#0F1729] border border-white/5 p-5 flex items-center justify-between"
            >
              <div>
                <div className="font-mono text-xs text-slate-400">
                  certificações
                </div>
                <div className="font-display text-xl font-bold text-white mt-1">
                  Meta · Google · Shopify
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="col-span-3 row-span-2 rounded-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,217,129,0.18), rgba(59,130,246,0.18))",
              }}
            >
              <div className="p-5">
                <div className="font-mono text-xs text-slate-300">SLA</div>
                <div className="font-display text-xl font-bold text-white mt-1">
                  Resposta &lt; 2h em horário comercial
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
