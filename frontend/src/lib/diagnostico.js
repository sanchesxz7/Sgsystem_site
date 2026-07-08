import { buildWhatsAppUrl } from "./constants";

export const NICHO_OPTIONS = [
  "E-commerce",
  "Serviços locais",
  "Infoprodutos",
  "Indústria",
  "Saúde",
  "Educação",
  "Alimentação",
  "Moda",
  "Outro",
];

export const FATURAMENTO_OPTIONS = [
  "Até R$ 10k",
  "R$ 10–50k",
  "R$ 50–100k",
  "R$ 100–500k",
  "Acima de R$ 500k",
  "Prefiro não informar",
];

export const INVESTIMENTO_OPTIONS = [
  "Não invisto ainda",
  "Até R$ 1k/mês",
  "R$ 1–5k/mês",
  "R$ 5–20k/mês",
  "Acima de R$ 20k/mês",
];

export const GARGALO_OPTIONS = [
  "Poucos leads",
  "Leads desqualificados",
  "Não converto os leads que chegam",
  "Dependo de indicação",
  "Sem presença digital",
  "Processos manuais/sem automação",
  "Não sei medir resultados",
];

export const MAX_GARGALOS = 3;

// Digit-count alone (>=10) accepted obviously-fake input like "0000000000".
// This checks the actual shape of a BR number: 10 digits (landline, DDD +
// 8-digit local number) or 11 digits (mobile, DDD + 9-digit number that
// must start with "9"), with a DDD in the real 11–99 range.
export function isValidPhoneBR(raw) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) return false;
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;
  if (digits.length === 11 && digits[2] !== "9") return false;
  return true;
}

export const initialDiagnosticoData = {
  nome: "",
  negocio: "",
  site: "",
  nicho: "",
  nichoOutro: "",
  redes: { instagram: "", tiktok: "", youtube: "", facebook: "", linkedin: "" },
  publico: "",
  faturamento: "",
  investimento: "",
  gargalos: [],
  objetivo: "",
  whatsapp: "",
  consentimento: false,
  // Pre-filled from ?interesse=<service-id> when arriving via a "Saiba
  // mais" card CTA (see services-3d data) — not a wizard step of its own,
  // just carried through to the final message.
  interesse: "",
};

function fieldOr(value, fallback = "não informado") {
  const v = (value ?? "").toString().trim();
  return v || fallback;
}

function nichoLabel(data) {
  if (data.nicho === "Outro") return fieldOr(data.nichoOutro);
  return fieldOr(data.nicho);
}

function redesLabel(redes) {
  const parts = Object.entries(redes)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`);
  return parts.length ? parts.join(" | ") : "não informado";
}

function gargalosLabel(gargalos) {
  return gargalos.length ? gargalos.join(", ") : "não informado";
}

export function buildDiagnosticoMessage(data) {
  const lines = [
    "*NOVO DIAGNÓSTICO — SGS*",
    `👤 Nome: ${fieldOr(data.nome)}`,
    `🏢 Negócio: ${fieldOr(data.negocio)}${data.site ? ` | ${data.site.trim()}` : ""}`,
    `🎯 Nicho: ${nichoLabel(data)}`,
    `📱 Redes: ${redesLabel(data.redes)}`,
    `👥 Público: ${fieldOr(data.publico)}`,
    `💰 Faturamento: ${fieldOr(data.faturamento)}`,
    `📊 Tráfego pago: ${fieldOr(data.investimento)}`,
    `🚧 Gargalos: ${gargalosLabel(data.gargalos)}`,
    `🏁 Objetivo 6m: ${fieldOr(data.objetivo)}`,
    `📞 WhatsApp do lead: ${fieldOr(data.whatsapp)}`,
  ];
  if (data.interesse) {
    lines.splice(1, 0, `🛠️ Interesse inicial: ${data.interesse}`);
  }
  return lines.join("\n");
}

// Isolated on purpose: there's no backend yet, so this opens wa.me with the
// message pre-filled — the lead still has to tap "send" themselves inside
// WhatsApp, this can't submit silently. When there's a backend/n8n webhook,
// swap the body of this one function for a fetch/axios POST; nothing in
// Diagnostico.jsx needs to change since it only ever calls submitDiagnostico.
export function submitDiagnostico(data) {
  const message = buildDiagnosticoMessage(data);
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}
