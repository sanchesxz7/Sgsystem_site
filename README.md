# Sanches Group System — Landing Page

Site institucional da Sanches Group System (Soluções Digitais Corporativas).
Single-page em React + Tailwind, com animações em Framer Motion, smooth scroll Lenis
e backend FastAPI + MongoDB para captura de leads.

## Estrutura

```
.
├── backend/
│   ├── server.py           # FastAPI app + rotas /api/leads
│   ├── requirements.txt
│   └── .env                # MONGO_URL, DB_NAME, CORS_ORIGINS
├── frontend/
│   ├── public/
│   │   ├── index.html      # Meta tags, fonts (Plus Jakarta Sans, Inter, JetBrains Mono), JSON-LD
│   │   └── assets/logo.png # Hexágono transparente (gerado a partir do PNG original)
│   ├── src/
│   │   ├── App.js          # Rotas: / (Landing) e /obrigado (ThankYou)
│   │   ├── index.css       # Design tokens + utilitários (glass, mesh, gradients, animações)
│   │   ├── lib/animations.js
│   │   ├── pages/ThankYou.jsx
│   │   └── components/
│   │       ├── SgsLogo.jsx
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx          # Particles canvas + dashboard glassmorphism + count-ups
│   │       ├── LogoMarquee.jsx
│   │       ├── SocialProof.jsx   # Stats agregados + 3 cases com sparklines + thumbnails de vídeo
│   │       ├── Services.jsx      # 6 serviços
│   │       ├── Method.jsx        # Diagrama circular + modal por pilar + typewriter
│   │       ├── Process.jsx       # Timeline com scroll-linked progress
│   │       ├── Portfolio.jsx     # Grid filtrável
│   │       ├── About.jsx
│   │       ├── FAQ.jsx
│   │       ├── FinalCTA.jsx      # Form → POST /api/leads → /obrigado
│   │       ├── Footer.jsx
│   │       ├── WhatsAppFloat.jsx # Botão flutuante (trocar número aqui)
│   │       └── CountUp.jsx
│   ├── tailwind.config.js  # Cores SGS (sgs.bg, sgs.green, etc.)
│   └── package.json
```

## Variáveis de ambiente

Backend (`/app/backend/.env`):
- `MONGO_URL` — string de conexão MongoDB
- `DB_NAME` — nome do banco
- `CORS_ORIGINS` — origens permitidas (default `*`)

Frontend (`/app/frontend/.env`):
- `REACT_APP_BACKEND_URL` — URL pública do backend (com prefixo `/api`)

## Endpoints

- `POST /api/leads` — cria lead (campos: name, contact, revenue, message?, source?)
- `GET /api/leads` — lista leads (desc por created_at)
- `GET /api/leads/count` — contagem

## Customizações rápidas

1. **WhatsApp** — `frontend/src/lib/constants.js`, constante
   `WHATSAPP_NUMBER` (formato E.164 sem `+`), reutilizada em todo o site.
2. **Conteúdo** — textos estão no topo de cada componente como constantes
   (`STATS`, `CASES`, `SERVICES`, `STEPS`, `PROJECTS`, `FAQS`, etc.).
3. **Cores / paleta** — `frontend/src/index.css` (variáveis `--bg-*` e
   `--accent-*`) e `tailwind.config.js` (chave `sgs`).
4. **GA4 / Meta Pixel / GTM** — adicionar tags no `<head>` de
   `frontend/public/index.html`.

## Acessibilidade & Performance

- `prefers-reduced-motion` desliga animações pesadas.
- Tipografia responsiva com `clamp()`.
- Lazy loading nativo de imagens.
- Schema.org Organization, Open Graph, meta description em PT-BR.
