import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  X,
  Plug,
  Zap,
  Mail,
  MessageCircle,
  RefreshCw,
  LifeBuoy,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { useModalA11y } from "../hooks/use-modal-a11y";

const TAGS = ["Automação", "Integração API", "WhatsApp", "E-mail", "Tempo real"];

const BUILD_ITEMS = [
  {
    icon: Plug,
    title: "Integração nativa com o Mercado Livre",
    desc: "Conexão via API oficial: novos pedidos capturados automaticamente, sem digitação manual.",
  },
  {
    icon: Zap,
    title: "Confirmação instantânea de compra",
    desc: "Notificação automática disparada no momento da compra, para o comprador e para o vendedor.",
  },
  {
    icon: Mail,
    title: "Disparo automático de e-mail",
    desc: "E-mails transacionais em cada etapa: confirmado, pagamento aprovado, em separação, enviado, entregue.",
  },
  {
    icon: MessageCircle,
    title: "Mensagens automáticas no WhatsApp",
    desc: "Atualizações do pedido direto no WhatsApp do cliente, com templates aprovados e rastreio incluso.",
  },
  {
    icon: RefreshCw,
    title: "Atualizações em tempo real",
    desc: "Mudanças de status refletidas na hora, sem ação humana — o sistema escuta os eventos do Mercado Livre e reage sozinho.",
  },
  {
    icon: LifeBuoy,
    title: "Suporte integrado",
    desc: "Canal de atendimento conectado ao histórico do pedido: o cliente chama no WhatsApp e o time já vê todo o contexto.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel de acompanhamento",
    desc: "Visão centralizada de todos os pedidos, disparos realizados e taxa de entrega das mensagens.",
  },
];

const RESULTS = [
  "Resposta imediata em 100% dos pedidos",
  "Zero digitação manual no fluxo",
  "Equipe liberada do operacional repetitivo",
];

function MLCaseModal({ open, onClose }) {
  const contentRef = useRef(null);
  useModalA11y(open, onClose, contentRef);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 overflow-y-auto"
          onClick={onClose}
          data-testid="ml-case-modal"
        >
          <motion.div
            ref={contentRef}
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl max-w-3xl w-full my-8 p-7 sm:p-10 relative outline-none"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ml-case-title"
            tabIndex={-1}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white hover:bg-white/5 transition"
              data-testid="ml-case-modal-close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-[#FFE600] px-2 py-1.5 shrink-0">
                <img src="/assets/clients/mercado-livre.svg" alt="" className="h-4" />
              </div>
              <span className="eyebrow">
                <span className="w-1.5 h-1.5 rounded-full bg-sgs-blue" /> Case em destaque
              </span>
            </div>
            <h3
              id="ml-case-title"
              className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              Automação completa de pedidos — Mercado Livre
            </h3>

            <div className="mt-6">
              <h4 className="font-display text-lg font-bold text-white mb-2">O desafio</h4>
              <p className="text-slate-300 leading-relaxed">
                Operação de vendas no Mercado Livre com alto volume de pedidos e
                comunicação manual: atrasos em confirmações, cliente sem
                visibilidade do status, equipe sobrecarregada com mensagens
                repetitivas.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-display text-lg font-bold text-white mb-4">
                O que construímos
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {BUILD_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div
                        className="w-9 h-9 rounded-xl grid place-items-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))",
                        }}
                      >
                        <Icon className="w-4 h-4 text-sgs-blue" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-display text-lg font-bold text-white mb-4">
                Resultado para a operação
              </h4>
              <div className="grid sm:grid-cols-3 gap-3">
                {RESULTS.map((r) => (
                  <div
                    key={r}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-300 text-sm">
                Quero uma automação assim no meu negócio
              </p>
              <Link
                to="/diagnostico"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-sgs-green text-[#04231b] font-semibold hover:scale-[1.03] transition shrink-0"
                data-testid="ml-case-modal-cta"
              >
                Fazer diagnóstico gratuito <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MercadoLivreCase() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="gradient-border rounded-2xl p-6 sm:p-8 grid md:grid-cols-[auto_1fr_auto] items-center gap-6"
        data-testid="ml-case-card"
      >
        {/* ML brand color needs a light backing — its logo doesn't read on pure dark */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl grid place-items-center shrink-0 bg-[#FFE600]">
          <img
            src="/assets/clients/mercado-livre.svg"
            alt="Mercado Livre"
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {TAGS.map((t) => (
              <span
                key={t}
                className="text-[11px] uppercase tracking-wide text-slate-300 border border-white/10 rounded-full px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            Automação completa de pedidos — Mercado Livre
          </h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-2xl">
            Sistema proprietário que automatiza todo o ciclo do pedido: da
            compra à entrega, com comunicação em tempo real por e-mail e
            WhatsApp para remetente e destinatário.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 text-white text-sm hover:bg-white/[0.07] transition shrink-0 whitespace-nowrap"
          data-testid="ml-case-cta"
        >
          Ver detalhes da implementação <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.article>

      <MLCaseModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
