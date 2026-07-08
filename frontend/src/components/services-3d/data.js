// Shared between the WebGL 3D showcase and the lightweight fallback grid.
// `video` is an extensionless path — consumers build `${video}.webm`,
// `${video}.mp4` and `${video}.jpg` (poster) from it.
//
// These clips are auto-captured recordings of each service's own procedural
// scene (see services-3d/scenes/) — not real footage — recorded via
// Playwright so mobile gets a lightweight <video> loop instead of running
// the SVG/Framer Motion animation live. Swap in real footage later by
// replacing the files at these same paths; nothing else needs to change.
const VIDEO_BASE = "/assets/videos/servicos";

export const SERVICES = [
  {
    id: "dev-web",
    title: "Desenvolvimento Web",
    desc: "Sites, plataformas SaaS e e-commerces de alta performance, otimizados para conversão e SEO.",
    video: `${VIDEO_BASE}/dev-web`,
    hasVideo: true,
    bullets: [
      "Landing pages de alta conversão",
      "Plataformas SaaS sob medida",
      "E-commerce escalável (Shopify, Magento, custom)",
      "Performance Core Web Vitals 90+",
      "Integrações via API REST/GraphQL",
    ],
  },
  {
    id: "mobile",
    title: "Aplicativos Mobile",
    desc: "Apps iOS, Android e PWA com UX premium, push notifications e analytics integrado.",
    video: `${VIDEO_BASE}/mobile`,
    hasVideo: true,
    bullets: [
      "Native iOS e Android",
      "React Native cross-platform",
      "Progressive Web Apps",
      "Publicação App Store / Play Store",
      "Analytics e crash reporting",
    ],
  },
  {
    id: "trafego",
    title: "Gestão de Tráfego Digital",
    desc: "Mídia paga em Meta, Google e TikTok com foco em ROAS e CPL otimizados continuamente.",
    video: `${VIDEO_BASE}/trafego`,
    hasVideo: true,
    bullets: [
      "Meta Ads · Google Ads · TikTok",
      "Funis de aquisição multi-canal",
      "Pixel, GTM e CAPI configurados",
      "Otimização semanal de campanhas",
      "Relatórios em tempo real",
    ],
  },
  {
    id: "automacao",
    title: "Automação Empresarial",
    desc: "Fluxos automatizados com n8n, Make e ChatGPT integrados a CRMs e plataformas de atendimento.",
    video: `${VIDEO_BASE}/automacao`,
    hasVideo: true,
    bullets: [
      "Chatbots WhatsApp + IA",
      "Pipelines de vendas no CRM",
      "Automações com n8n e Make",
      "Integração entre 50+ ferramentas",
      "Dashboards executivos",
    ],
  },
  {
    id: "audiovisual",
    title: "Serviço de Audiovisual",
    desc: "Produção de vídeos para tráfego pago, conteúdo orgânico e institucionais com direção premiada.",
    video: `${VIDEO_BASE}/audiovisual`,
    hasVideo: true,
    bullets: [
      "Vídeos verticais (Reels, Shorts, TikTok)",
      "VSLs e vídeos de tráfego",
      "Institucionais e branding",
      "Edição com motion graphics",
      "Legendagem e localização",
    ],
  },
  {
    id: "social-media",
    title: "Gestão de Social Media",
    desc: "Estratégia editorial, design e community management para construir audiência qualificada.",
    video: `${VIDEO_BASE}/social-media`,
    hasVideo: true,
    bullets: [
      "Planejamento editorial mensal",
      "Design de posts e stories",
      "Copy persuasiva PT-BR",
      "Community management",
      "Relatórios de engajamento",
    ],
  },
  {
    id: "tiktok-shop",
    title: "Gestão de TikTok Shop",
    desc: "Configuração, catálogo e gestão de vendas dentro do TikTok Shop, integrado à estratégia de conteúdo e tráfego pago.",
    video: `${VIDEO_BASE}/tiktok-shop`,
    hasVideo: true,
    // TODO: confirmar que este é o SVG oficial da marca (brand kit TikTok for
    // Business) antes de publicar — nunca recriar o logotipo via código/IA.
    logoOverride: "/assets/tiktok-shop-logo.svg",
    bullets: [
      "Setup completo da loja no TikTok Shop",
      "Cadastro e otimização de catálogo",
      "Integração com criadores/afiliados",
      "Campanhas de live shopping",
      "Relatórios de vendas e GMV",
    ],
  },
];

export function videoSources(service) {
  return {
    webm: `${service.video}.webm`,
    mp4: `${service.video}.mp4`,
    poster: `${service.video}.jpg`,
  };
}
