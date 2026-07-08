import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

const FAQS = [
  {
    q: "Quanto tempo leva para ver resultado?",
    a: "Os primeiros sinais aparecem em 30 dias (queda de CPL, ganho de tráfego e leads). O resultado consolidado, com previsibilidade de receita, costuma se firmar entre 60 e 90 dias após o início.",
  },
  {
    q: "Vocês trabalham com qual ticket de cliente?",
    a: "Atendemos empresas a partir de R$ 100 mil/mês de faturamento. Para projetos de tecnologia (SaaS, e-commerce, apps) avaliamos caso a caso, independente do ticket atual.",
  },
  {
    q: "Como funciona a gestão de tráfego?",
    a: "Operamos Meta Ads, Google Ads e TikTok com squad dedicada (gestor + analista + criativo). Configuramos pixel, CAPI e conversões offline. Otimizamos campanhas semanalmente com base em dashboards próprios.",
  },
  {
    q: "Posso contratar serviços avulsos?",
    a: "Sim. Embora o melhor resultado venha do método integrado, oferecemos pacotes avulsos para desenvolvimento, audiovisual, social media e automação.",
  },
  {
    q: "Vocês entregam o código-fonte do site?",
    a: "Sempre. Todo código é versionado em repositórios sob seu controle (GitHub/GitLab). Você é dono da propriedade intelectual desde o primeiro commit.",
  },
  {
    q: "Como é o contrato e a rescisão?",
    a: "Contratos mensais com fidelidade mínima de 90 dias para garantir maturação do método. Após esse período, é possível cancelar com 30 dias de aviso prévio.",
  },
  {
    q: "Atendem clientes fora do Brasil?",
    a: "Sim. Já operamos campanhas em PT, EN e ES, com clientes em Portugal, EUA, México e Argentina.",
  },
  {
    q: "Qual a diferença de vocês para uma agência?",
    a: "Agências geralmente focam em mídia ou criação. A SGS opera os 4 pilares (Aquisição, Engajamento, Monetização, Retenção) com tecnologia proprietária e responsabilidade sobre o número final do seu negócio.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section relative" data-testid="section-faq">
      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-purple" /> Dúvidas frequentes
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Perguntas que <span className="text-gradient-static">recebemos sempre</span>.
          </motion.h2>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
                data-testid={`faq-${i}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="text-white font-semibold text-base sm:text-lg">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-full bg-white/5 grid place-items-center text-white shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="px-5"
                    >
                      <div className="pb-5 pt-1 text-slate-300 leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
