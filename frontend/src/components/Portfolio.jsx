import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import ComingSoonModal from "./ComingSoonModal";
import MercadoLivreCase from "./MercadoLivreCase";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const FILTERS = ["Todos", "Web", "Tráfego", "Audiovisual"];

const PROJECTS = [
  {
    title: "Angel Doces",
    sub: "Ecossistema Digital · Confeitaria",
    cat: "Web",
    metric: "+312% em vendas",
    description:
      "Funil de vendas reestruturado + audiovisual profissional + ecossistema digital completo.",
    image: "/assets/case_angel.png",
    imageBg: "#ffffff",
    logo: "/assets/case_angel.png",
    logoBg: "#ffffff",
    accent: "#3b82f6",
  },
  {
    title: "Construfé",
    sub: "Funil B2B · Indústria",
    cat: "Tráfego",
    metric: "+187% em leads",
    description:
      "Funil de qualificação automática + campanhas locais geo-segmentadas.",
    image: "/assets/case_construfe.png",
    imageBg: "#0F1729",
    logo: "/assets/case_construfe.png",
    logoBg: "#0F1729",
    accent: "#38bdf8",
  },
  {
    title: "Top Show",
    sub: "Tráfego + Audiovisual · Eventos",
    cat: "Audiovisual",
    metric: "+20% em faturamento",
    description:
      "Tráfego pago multiplataforma + VSLs high-impact + calendário editorial.",
    image: "/assets/case_topshow.png",
    imageBg: "#0a050a",
    logo: "/assets/case_topshow.png",
    logoBg: "#0a050a",
    accent: "#ef4444",
  },
];

function ProjectMedia({ project, eager }) {
  return (
    <div
      className="relative w-full h-[180px] overflow-hidden"
      style={{ background: project.imageBg }}
    >
      <img
        src={project.image}
        alt={project.title}
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 w-full h-full object-contain p-4"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, rgba(10,14,26,0.55))",
        }}
      />
    </div>
  );
}

function LogoBadge({ project }) {
  return (
    <img
      src={project.logo}
      alt=""
      width={36}
      height={36}
      className="rounded-full border-2 border-[#0F1729] object-contain"
      style={{ background: project.logoBg }}
    />
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const filtered =
    filter === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <section
      id="projetos"
      className="section relative bg-[#0c1322]"
      data-testid="section-portfolio"
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
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-blue" /> Portfólio
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Projetos que viraram{" "}
            <span className="text-gradient-static">resultado</span>.
          </motion.h2>
        </motion.div>

        <div className="mt-10">
          <MercadoLivreCase />
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          data-testid="portfolio-filters"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-testid={`filter-${f.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm transition border ${
                filter === f
                  ? "bg-white text-[#0a0e1a] border-white"
                  : "border-white/15 text-slate-300 hover:bg-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden border border-white/5 bg-[#0F1729] flex flex-col"
              data-testid={`project-${i}`}
            >
              <div className="relative">
                <ProjectMedia project={p} eager={i === 0} />
                {/* Logo badge no canto inferior esquerdo */}
                <div className="absolute left-3 -bottom-4 z-20">
                  <LogoBadge project={p} />
                </div>
              </div>

              <div className="p-5 pt-6 flex-1 flex flex-col">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  {p.cat}
                </div>
                <div className="mt-1 font-display text-lg font-bold text-white">
                  {p.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{p.sub}</div>

                <div
                  className="mt-3 text-sm font-mono font-semibold"
                  style={{ color: p.accent }}
                >
                  {p.metric}
                </div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                  {p.description}
                </p>

                <button
                  onClick={() => {
                    setSelected(p);
                    setOpen(true);
                  }}
                  className="mt-4 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white text-sm hover:bg-white/[0.07] transition"
                  data-testid={`project-video-${i}`}
                >
                  <Play className="w-3.5 h-3.5" /> Ver depoimento
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <ComingSoonModal
        open={open}
        onClose={() => setOpen(false)}
        title={
          selected ? `Depoimento ${selected.title} · Em breve` : "Em breve"
        }
        subtitle="O depoimento em vídeo deste projeto está sendo finalizado. Em breve você poderá assisti-lo aqui."
      />
    </section>
  );
}
