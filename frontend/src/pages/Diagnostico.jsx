import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import SgsLogo from "../components/SgsLogo";
import {
  initialDiagnosticoData,
  NICHO_OPTIONS,
  FATURAMENTO_OPTIONS,
  INVESTIMENTO_OPTIONS,
  GARGALO_OPTIONS,
  MAX_GARGALOS,
  submitDiagnostico,
} from "../lib/diagnostico";

function maskPhoneBR(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d*)/, "($1");
  if (digits.length <= 7) return digits.replace(/^(\d{2})(\d*)/, "($1) $2");
  return digits.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-sgs-green/60 focus:bg-white/[0.07] transition";

function Question({ children }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
      {children}
    </h2>
  );
}

function OptionalHint() {
  return <p className="text-xs text-slate-500 mb-4">Opcional — pode pular esta pergunta.</p>;
}

function ChipToggle({ label, active, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-full text-sm border transition text-left ${
        active
          ? "bg-sgs-green text-[#04231b] border-sgs-green font-semibold"
          : disabled
            ? "border-white/10 text-slate-600 cursor-not-allowed"
            : "border-white/15 text-slate-300 hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );
}

// --- Step definitions ------------------------------------------------

const STEPS = [
  {
    key: "nome",
    required: true,
    isValid: (d) => d.nome.trim().length > 0,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Como podemos te chamar?</Question>
        <input
          ref={autoFocusRef}
          type="text"
          value={data.nome}
          onChange={(e) => update({ nome: e.target.value })}
          placeholder="Seu nome"
          className={inputClass}
          data-testid="diag-input-nome"
        />
      </>
    ),
  },
  {
    key: "negocio",
    required: false,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Qual o nome do seu negócio?</Question>
        <OptionalHint />
        <div className="space-y-3">
          <input
            ref={autoFocusRef}
            type="text"
            value={data.negocio}
            onChange={(e) => update({ negocio: e.target.value })}
            placeholder="Nome do negócio"
            className={inputClass}
            data-testid="diag-input-negocio"
          />
          <input
            type="url"
            value={data.site}
            onChange={(e) => update({ site: e.target.value })}
            placeholder="Site (se tiver) — https://..."
            className={inputClass}
            data-testid="diag-input-site"
          />
        </div>
      </>
    ),
  },
  {
    key: "nicho",
    required: false,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Qual o nicho / segmento do seu negócio?</Question>
        <OptionalHint />
        <select
          ref={autoFocusRef}
          value={data.nicho}
          onChange={(e) => update({ nicho: e.target.value })}
          className={inputClass}
          data-testid="diag-input-nicho"
        >
          <option value="" className="bg-[#0F1729]">
            Selecione
          </option>
          {NICHO_OPTIONS.map((o) => (
            <option key={o} value={o} className="bg-[#0F1729]">
              {o}
            </option>
          ))}
        </select>
        {data.nicho === "Outro" && (
          <input
            type="text"
            value={data.nichoOutro}
            onChange={(e) => update({ nichoOutro: e.target.value })}
            placeholder="Qual?"
            className={`${inputClass} mt-3`}
            data-testid="diag-input-nicho-outro"
          />
        )}
      </>
    ),
  },
  {
    key: "redes",
    required: false,
    render: ({ data, update, autoFocusRef }) => {
      const fields = [
        ["instagram", "Instagram"],
        ["tiktok", "TikTok"],
        ["youtube", "YouTube"],
        ["facebook", "Facebook"],
        ["linkedin", "LinkedIn"],
      ];
      return (
        <>
          <Question>Redes sociais do seu negócio</Question>
          <OptionalHint />
          <p className="text-sm text-slate-400 mb-3">
            Cole os links ou @ dos perfis ativos.
          </p>
          <div className="space-y-2.5">
            {fields.map(([key, label], i) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-xs text-slate-400">{label}</span>
                <input
                  ref={i === 0 ? autoFocusRef : undefined}
                  type="text"
                  value={data.redes[key]}
                  onChange={(e) =>
                    update({ redes: { ...data.redes, [key]: e.target.value } })
                  }
                  placeholder="@perfil ou link"
                  className={`${inputClass} !text-base !py-2.5`}
                  data-testid={`diag-input-rede-${key}`}
                />
              </div>
            ))}
          </div>
        </>
      );
    },
  },
  {
    key: "publico",
    required: false,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Quem é seu cliente ideal?</Question>
        <OptionalHint />
        <p className="text-sm text-slate-400 mb-3">
          Idade, região, comportamento — o que você souber.
        </p>
        <textarea
          ref={autoFocusRef}
          rows={4}
          value={data.publico}
          onChange={(e) => update({ publico: e.target.value })}
          placeholder="Descreva seu público-alvo"
          className={`${inputClass} resize-none`}
          data-testid="diag-input-publico"
        />
      </>
    ),
  },
  {
    key: "faturamento",
    required: false,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Qual o faturamento mensal atual?</Question>
        <OptionalHint />
        <select
          ref={autoFocusRef}
          value={data.faturamento}
          onChange={(e) => update({ faturamento: e.target.value })}
          className={inputClass}
          data-testid="diag-input-faturamento"
        >
          <option value="" className="bg-[#0F1729]">
            Selecione uma faixa
          </option>
          {FATURAMENTO_OPTIONS.map((o) => (
            <option key={o} value={o} className="bg-[#0F1729]">
              {o}
            </option>
          ))}
        </select>
      </>
    ),
  },
  {
    key: "investimento",
    required: false,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Quanto você investe em tráfego pago hoje?</Question>
        <OptionalHint />
        <select
          ref={autoFocusRef}
          value={data.investimento}
          onChange={(e) => update({ investimento: e.target.value })}
          className={inputClass}
          data-testid="diag-input-investimento"
        >
          <option value="" className="bg-[#0F1729]">
            Selecione
          </option>
          {INVESTIMENTO_OPTIONS.map((o) => (
            <option key={o} value={o} className="bg-[#0F1729]">
              {o}
            </option>
          ))}
        </select>
      </>
    ),
  },
  {
    key: "gargalos",
    required: false,
    render: ({ data, update }) => {
      const toggle = (opt) => {
        const has = data.gargalos.includes(opt);
        if (has) {
          update({ gargalos: data.gargalos.filter((g) => g !== opt) });
        } else if (data.gargalos.length < MAX_GARGALOS) {
          update({ gargalos: [...data.gargalos, opt] });
        }
      };
      return (
        <>
          <Question>Qual seu principal gargalo hoje?</Question>
          <p className="text-sm text-slate-400 mb-4">
            Escolha até {MAX_GARGALOS} — opcional.
          </p>
          <div className="flex flex-wrap gap-2" data-testid="diag-input-gargalos">
            {GARGALO_OPTIONS.map((opt) => {
              const active = data.gargalos.includes(opt);
              const disabled = !active && data.gargalos.length >= MAX_GARGALOS;
              return (
                <ChipToggle
                  key={opt}
                  label={opt}
                  active={active}
                  disabled={disabled}
                  onClick={() => toggle(opt)}
                />
              );
            })}
          </div>
        </>
      );
    },
  },
  {
    key: "objetivo",
    required: false,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Qual seu objetivo nos próximos 6 meses?</Question>
        <OptionalHint />
        <textarea
          ref={autoFocusRef}
          rows={4}
          value={data.objetivo}
          onChange={(e) => update({ objetivo: e.target.value })}
          placeholder="Ex: dobrar o faturamento, estruturar o time comercial..."
          className={`${inputClass} resize-none`}
          data-testid="diag-input-objetivo"
        />
      </>
    ),
  },
  {
    key: "whatsapp",
    required: true,
    isValid: (d) => d.whatsapp.replace(/\D/g, "").length >= 10 && d.consentimento,
    render: ({ data, update, autoFocusRef }) => (
      <>
        <Question>Qual seu WhatsApp?</Question>
        <p className="text-sm text-slate-400 mb-3">
          É para lá que vamos te chamar com o diagnóstico.
        </p>
        <input
          ref={autoFocusRef}
          type="tel"
          inputMode="tel"
          value={data.whatsapp}
          onChange={(e) => update({ whatsapp: maskPhoneBR(e.target.value) })}
          placeholder="(11) 91234-5678"
          className={inputClass}
          data-testid="diag-input-whatsapp"
        />
        <label className="mt-5 flex items-start gap-3 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={data.consentimento}
            onChange={(e) => update({ consentimento: e.target.checked })}
            className="mt-1 w-4 h-4 accent-[#10D981]"
            data-testid="diag-input-consentimento"
          />
          Autorizo o contato da SGS pelos dados informados. Seus dados são
          usados apenas para este diagnóstico.
        </label>
      </>
    ),
  },
];

const TOTAL_STEPS = STEPS.length;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function Diagnostico() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState(initialDiagnosticoData);
  const [done, setDone] = useState(false);
  const autoFocusRef = useRef(null);

  const isSuccess = stepIndex >= TOTAL_STEPS;
  const current = STEPS[stepIndex];

  const update = useCallback((patch) => setData((d) => ({ ...d, ...patch })), []);

  const currentValid = useMemo(() => {
    if (!current) return true;
    if (!current.required) return true;
    return current.isValid ? current.isValid(data) : true;
  }, [current, data]);

  const goNext = useCallback(() => {
    if (current?.required && !currentValid) return;
    setDirection(1);
    setStepIndex((s) => Math.min(s + 1, TOTAL_STEPS));
  }, [current, currentValid]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStepIndex((s) => Math.max(s - 1, 0));
  }, []);

  useEffect(() => {
    // Same-tab-index-based autofocus per step, skipped on the multi-select
    // (gargalos) step and the success screen, neither of which set the ref.
    const id = requestAnimationFrame(() => autoFocusRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [stepIndex]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (e.target.tagName === "TEXTAREA") return;
    e.preventDefault();
    if (!isSuccess) goNext();
  };

  const handleSubmitWhatsApp = () => {
    submitDiagnostico(data);
    setDone(true);
  };

  const progressPct = isSuccess ? 100 : Math.round((stepIndex / TOTAL_STEPS) * 100);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      onKeyDown={handleKeyDown}
      data-testid="page-diagnostico"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.15), transparent 60%)",
        }}
      />

      {/* Minimal header — no full navbar, this page is meant to be entered from ad traffic */}
      <header className="relative z-10 container-x flex items-center justify-between py-6">
        <Link to="/" className="flex items-center gap-2" data-testid="diag-back-home">
          <SgsLogo size={32} />
          <span className="font-display font-bold text-white hidden sm:inline">
            Sanches Group System
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site
        </Link>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 container-x">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden" data-testid="diag-progress">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--gradient-signature)" }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {!isSuccess && (
          <div className="mt-2 text-xs text-slate-500 font-mono">
            {stepIndex + 1} / {TOTAL_STEPS}
          </div>
        )}
      </div>

      <div className="relative z-10 container-x flex items-center justify-center min-h-[70vh] py-10">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            {!isSuccess ? (
              <motion.div
                key={current.key}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`diag-step-${stepIndex + 1}`}
              >
                {current.render({ data, update, autoFocusRef })}

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={stepIndex === 0}
                    className="text-sm text-slate-400 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition"
                  >
                    ← Voltar
                  </button>
                  <div className="flex items-center gap-4">
                    {!current.required && (
                      <button
                        type="button"
                        onClick={goNext}
                        className="text-sm text-slate-400 hover:text-white transition"
                      >
                        Pular
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={current.required && !currentValid}
                      className="cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[#04231b] disabled:opacity-40 disabled:cursor-not-allowed disabled:animate-none"
                      data-testid="diag-next"
                    >
                      {stepIndex === TOTAL_STEPS - 1 ? "Finalizar" : "Avançar"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                data-testid="diag-step-success"
              >
                <div className="glass-card rounded-3xl p-7 sm:p-9">
                  <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5 bg-sgs-green/15 border border-sgs-green/30">
                    <Check className="w-6 h-6 text-sgs-green" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Prontinho, {data.nome || "tudo certo"}!
                  </h2>
                  <p className="mt-3 text-slate-300 leading-relaxed">
                    Você será direcionado ao nosso WhatsApp com suas respostas
                    preenchidas — é só apertar enviar.
                  </p>

                  <dl className="mt-6 space-y-2 text-sm border-t border-white/10 pt-5">
                    {data.negocio && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Negócio</dt>
                        <dd className="text-slate-200 text-right">{data.negocio}</dd>
                      </div>
                    )}
                    {data.nicho && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Nicho</dt>
                        <dd className="text-slate-200 text-right">
                          {data.nicho === "Outro" ? data.nichoOutro : data.nicho}
                        </dd>
                      </div>
                    )}
                    {data.faturamento && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Faturamento</dt>
                        <dd className="text-slate-200 text-right">{data.faturamento}</dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">WhatsApp</dt>
                      <dd className="text-slate-200 text-right">{data.whatsapp}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={handleSubmitWhatsApp}
                    className="cta-primary mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-[#04231b]"
                    data-testid="diag-submit-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar diagnóstico no WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {done && (
                    <p className="mt-3 text-center text-xs text-slate-500">
                      Abrimos o WhatsApp numa nova aba — se não apareceu, verifique
                      o bloqueador de pop-ups.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
