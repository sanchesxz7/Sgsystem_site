import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

// Array pensado para crescer — adicionar novos membros é só um novo objeto.
const TEAM = [
  {
    name: "Gabriel Sanches",
    role: "Head de Tecnologia",
    photo: "/assets/team/head-tecnologia.webp",
  },
  {
    name: "Thiago",
    role: "Head de Tráfego Digital",
    photo: "/assets/team/head-trafego.webp",
  },
];

export default function Team() {
  return (
    <section id="equipe" className="section relative" data-testid="section-team">
      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-magenta" /> Time SGS
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Especialistas que tocam{" "}
            <span className="text-gradient-static">seu projeto</span>.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-slate-300 text-lg max-w-xl"
          >
            Cada cliente da SGS tem um squad dedicado com líderes seniores em
            cada pilar do método.
          </motion.p>
        </motion.div>

        {/*
          Per-card initial/whileInView (not a stagger-parent wrapper): the
          parent's own `viewport={{amount:0.2}}` needs 20% of the WHOLE
          grid visible at once, which becomes impossible once the grid is
          taller than ~5x the viewport (exactly what broke the services
          fallback grid once video thumbnails made those cards taller — see
          ServicesFallbackGrid). TEAM is short today, but the array is
          meant to grow, so this avoids the same regression later.
        */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 22 } }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
              className="group relative rounded-2xl border border-white/5 bg-[#0F1729] overflow-hidden"
              data-testid={`team-${i}`}
            >
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "var(--gradient-signature)",
                  filter: "blur(18px)",
                  zIndex: -1,
                }}
              />
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(10,14,26,0.9) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-lg font-bold text-white">
                    {m.name}
                  </div>
                  <div className="text-sm text-slate-300">{m.role}</div>
                </div>
              </div>
              <div className="p-4">
                <button
                  type="button"
                  disabled
                  className="relative w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-white/10 text-slate-400 text-sm opacity-60 cursor-not-allowed"
                  data-testid={`team-member-soon-${i}`}
                >
                  Conhecer +
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-sgs-green ml-1">
                    <Sparkles className="w-3 h-3" /> Em breve
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
