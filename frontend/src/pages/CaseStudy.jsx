import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import SgsLogo from "../components/SgsLogo";

const CASES_DATA = {
  "angel-doces": {
    name: "Angel Doces",
    sector: "Confeitaria artesanal",
    metric: "+312%",
    metricLabel: "em vendas",
    period: "após estruturação completa",
    logo: "/assets/case_angel.png",
    logoBg: "#ffffff",
    color: "from-blue-400 to-pink-400",
    pillars: [
      "Funil de vendas reestruturado de ponta a ponta",
      "Ecossistema digital completo (site, social, automações)",
      "Audiovisual profissional para conteúdo e tráfego",
      "Gestão de tráfego em Meta com remarketing avançado",
    ],
  },
  construfe: {
    name: "Construfé",
    sector: "Indústria e construção",
    metric: "+187%",
    metricLabel: "em leads qualificadas e visitas",
    period: "em 90 dias",
    logo: "/assets/case_construfe.png",
    logoBg: "#0F1729",
    color: "from-cyan-400 to-blue-500",
    pillars: [
      "Funil B2B com qualificação automática",
      "Campanhas locais geo-segmentadas",
      "Pixel + CAPI + conversões offline conectados",
      "Painel comercial em tempo real",
    ],
  },
  "top-show": {
    name: "Top Show",
    sector: "Entretenimento e eventos",
    metric: "+20%",
    metricLabel: "no faturamento",
    period: "em 90 dias",
    logo: "/assets/case_topshow.png",
    logoBg: "#0a050a",
    color: "from-red-500 to-blue-500",
    pillars: [
      "Tráfego pago multiplataforma com criativos high-impact",
      "VSLs e vídeos de campanha com direção premium",
      "Calendário editorial integrado às datas dos shows",
      "Mensuração de ingressos e bilheteria",
    ],
  },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const c = CASES_DATA[slug];

  if (!c) {
    return (
      <main
        className="min-h-screen grid place-items-center p-6 text-center"
        data-testid="page-case-notfound"
      >
        <div className="glass-card rounded-3xl max-w-md w-full p-10">
          <SgsLogo size={48} className="mx-auto" />
          <h1 className="font-display mt-6 text-3xl font-extrabold text-white">
            Case não encontrado
          </h1>
          <p className="mt-3 text-slate-300">
            O case que você procura ainda não foi publicado.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative pb-24" data-testid="page-case">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[60vh] -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.18), transparent 60%)",
        }}
      />
      <header className="container-x py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <SgsLogo size={36} />
          <span className="font-display font-extrabold text-white">
            Sanches Group System
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-slate-200 hover:bg-white/5 transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </header>

      <section className="container-x mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-2xl overflow-hidden"
            style={{ background: c.logoBg }}
          >
            <img
              src={c.logo}
              alt={`Logo ${c.name}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-sm text-slate-400">{c.sector}</div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
              {c.name}
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 grid lg:grid-cols-2 gap-6"
        >
          <div className="glass-card rounded-3xl p-7">
            <div className="text-xs uppercase tracking-wider text-slate-400">
              Resultado-chave
            </div>
            <div className="font-display text-6xl font-extrabold text-gradient-green mt-2">
              {c.metric}
            </div>
            <div className="text-slate-300 mt-1">
              {c.metricLabel} · <span className="font-mono">{c.period}</span>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-7">
            <div className="text-xs uppercase tracking-wider text-slate-400">
              O que foi feito
            </div>
            <ul className="mt-3 space-y-2 text-slate-200">
              {c.pillars.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sgs-green mt-2" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-card rounded-3xl p-8 text-center"
        >
          <Rocket className="w-7 h-7 text-sgs-green mx-auto" />
          <h3 className="font-display mt-3 text-2xl font-extrabold text-white">
            Estudo completo em produção
          </h3>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Estamos finalizando o case study detalhado com imagens, números e
            depoimento em vídeo. Quer ser avisado em primeira mão?
          </p>
          <Link
            to="/#contato"
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.03] transition"
          >
            Quero receber o case <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
