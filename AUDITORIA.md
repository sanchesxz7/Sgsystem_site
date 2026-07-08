# Auditoria completa — Sanches Group System (Fase 3)

Data: 2026-07-08. Varredura arquivo por arquivo de `frontend/src/**` e `frontend/public/**`, com correções aplicadas em seguida. Critério de severidade: **crítico** (quebra funcionalidade/segurança), **alto** (bug visível ou perda de conversão), **médio** (inconsistência ou risco menor), **baixo** (polimento).

---

## 0. Asset — logo Mercado Livre

**Pendente do cliente.** Não é possível extrair uma imagem colada diretamente no chat para o disco — é uma limitação da ferramenta, não algo que eu possa contornar. O placeholder documentado (`frontend/public/assets/clients/mercado-livre.svg`) permanece até o arquivo `mercado-livre.webp` (800×800, fundo amarelo oficial) ser salvo manualmente em `frontend/public/assets/clients/`. Quando isso acontecer, trocar a referência em `MercadoLivreCase.jsx` (duas ocorrências de `mercado-livre.svg`) por `mercado-livre.webp`, com `width`/`height` explícitos e sem empilhar outro fundo amarelo por cima (o arquivo já traz o amarelo da marca).

---

## 1. Bug prioritário — TopShowStoryChart no mobile

| Arquivo | Severidade | Problema | Correção |
|---|---|---|---|
| `frontend/src/components/TopShowStoryChart.jsx` | **Crítico** | Painel mobile usava um `<video>` auto-capturado do card inteiro (cabeçalho+contador+gráfico num único clipe de ~13s). Resultado: gráfico "pequeno" (o clipe mostra a cena inteira, não só a linha) e delay grande (13s de reveal + badge só aparecia depois disso). | Reescrito `MobileTopShowChart` para reaproveitar os mesmos subcomponentes SVG do desktop (`TopShowSegment`, `TopShowMilestone`, `TipDot`, `TrendGlow`), trocando o progresso *scroll-scrubbed* por um tween de tempo (`animate(progress, 1, {duration:2})`) disparado no `useInView` (threshold 0.15, early trigger). Painel agora full-width, `min-height:320px` dedicado só ao gráfico (não ao card inteiro), padding reduzido (`p-4 sm:p-6`). Duração total do reveal: **~2s** (medido via instrumentação: 2747ms→4754ms). Vídeos órfãos `topshow.mp4/.webm/.jpg` removidos. |

Verificado via Playwright: painel mobile 335px de largura × 657px de altura, sem popup, sem erro de console; regressão no desktop confirmada (scroll-scrub intacto).

---

## 2. Varredura de bugs

| Arquivo | Severidade | Problema | Correção |
|---|---|---|---|
| `frontend/src/App.js` | **Crítico** | Nenhum reset de scroll ao trocar de rota (React Router não faz isso sozinho) — navegar de `/` (scrollado) para `/diagnostico` deixava o usuário no meio da página. Nenhuma âncora funcionava vindo de outra rota. Lenis só existe dentro de `Landing` (rota `/`), sem registry compartilhado. | Criado `frontend/src/lib/scroll.js` (registry do Lenis + `scrollToId()` com fallback `scrollIntoView` nativo). Adicionado `<ScrollToTop/>` (reset de scroll em toda troca de rota) e `useScrollToOnMount()` (lê `location.state.scrollTo`, aplica o scroll assim que `Landing`/Lenis montam, depois limpa o state). |
| `frontend/src/components/Navbar.jsx` | **Alto** | Links de seção (`#servicos`, `#cases`...) eram `<a href="#...">` puros — pulo nativo instantâneo (ignora Lenis) e, se o Navbar for renderizado fora de `/`, não navegam para lá primeiro. "Solicitar Acesso" e "Área do Cliente" apontavam para `#contato` (não iam para `/diagnostico`, e "Área do Cliente" simulava uma funcionalidade inexistente). | Todos os links de seção agora passam por `goToSection(id)` (Lenis quando em `/`, `navigate("/", {state:{scrollTo:id}})` caso contrário). "Solicitar Acesso" → `/diagnostico`. "Área do Cliente" → abre `ComingSoonModal` ("Em breve") em vez de simular uma seção inexistente. Botões de abrir/fechar o menu mobile ajustados para 44×44px (ver seção 5). |
| `frontend/src/components/Hero.jsx` | **Alto** | Os dois CTAs do Hero apontavam para `#contato` — não batiam com a intenção do funil (primário deveria ir para o diagnóstico). | CTA primário ("Falar com Consultor") → `/diagnostico`. CTA secundário renomeado para "Ver Cases de Sucesso" → scroll (cross-route-safe) até `#cases`. |
| `frontend/src/components/VipLive.jsx`, `ExitIntent.jsx` | **Alto** | "Solicitar acesso" (VIP) e "Quero meu diagnóstico gratuito" (exit-intent) apontavam para `#contato` via `<a>` nativo — o exit-intent em especial promete "diagnóstico" mas não levava ao wizard. | Ambos convertidos para `navigate("/diagnostico")`. |
| `frontend/src/components/Footer.jsx` | **Alto** | Links de "Serviços"/"Sobre"/"Método"/"Cases"/"Equipe" eram `<a href="#...">` nativos (mesmo problema de Lenis/cross-route do Navbar). | Convertidos para `goToSection()`, mesmo padrão do Navbar. |
| `frontend/src/pages/CaseStudy.jsx`, `Blog.jsx` | **Alto** | `<Link to="/#contato">` — react-router **não** faz scroll até o hash sozinho; o clique navegava para `/` e ficava no topo, nunca chegando em `#contato`, apesar do texto prometer isso. | Trocado por `navigate("/", {state:{scrollTo:"contato"}})`, mesmo mecanismo do restante do site. |
| `frontend/src/components/SocialProof.jsx` | **Médio** | "Ver case completo" usava `<a href="/cases/...">` nativo em vez de `<Link>` do react-router — cada clique recarregava a página inteira (perde estado do SPA, mais lento). | Trocado por `<Link to={...}>`. |
| `frontend/src/components/WhatsAppFloat.jsx` | **Alto** | Sem classe responsiva para se esconder no mobile — ficava sobreposto ao `StickyWhatsAppMobile` (os comentários do próprio código já indicavam essa era a intenção original, só faltava a classe). Bounding boxes calculados se sobrepõem no canto inferior direito em 375px. | Adicionado `hidden sm:grid` — mobile mostra só a barra sticky, desktop só o botão flutuante. Confirmado via Playwright em ambos os breakpoints. |
| `frontend/src/components/CountUp.jsx` (`useInView`) | **Médio** | `options` (objeto recriado a cada render pelos callers) usado direto no efeito com deps `[]` — warning de `react-hooks/exhaustive-deps`, que sob `CI=true` (Vercel) vira **erro fatal de build**. | Objeto guardado em `optionsRef`, lido dentro do efeito sem entrar nas deps — comportamento idêntico, lint limpo. |
| Todo o projeto | **Baixo** | ~46 arquivos mortos: toda a pasta `src/components/ui/**` (44 componentes shadcn/ui gerados por scaffold, nunca importados pela árvore real do app), `hooks/use-toast.js` e `lib/utils.js` (só consumidos pelos arquivos acima). Confirmado por grep cruzado — zero referências fora da própria pasta `ui/`. | Removidos. Trouxe consigo ~30 dependências npm nunca usadas (`@radix-ui/*`, `class-variance-authority`, `clsx`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `next-themes`, `react-day-picker`, `react-hook-form`, `@hookform/resolvers`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `vaul`, `zod`), removidas do `package.json`. CSS final caiu de 14.0kB → 8.7kB gzip (Tailwind para de gerar utilitários não usados). |
| Console / vazamentos | — | Auditoria completa de `addEventListener`, `setInterval`/`setTimeout`, `IntersectionObserver`, `requestAnimationFrame` e contexto WebGL/canvas em todo `src/**`: **zero vazamentos encontrados** — todo listener/observer/loop tem cleanup correto no retorno do `useEffect`. Zero `console.log` remanescente. | Nenhuma correção necessária (verificado, não presumido). |

---

## 3. Auditoria de botões e links

Mapeamento completo de todo `<button>`/`<a>`/`onClick` em `src/**` (Navbar, Hero, Footer, WhatsAppFloat, StickyWhatsAppMobile, FinalCTA, FAQ, Portfolio, About, VipLive, Method, SocialProof, MercadoLivreCase, Team, ComingSoonModal, ExitIntent, DiagnosticPopup, todas as páginas). Achados que exigiram correção:

| Elemento | Severidade | Antes | Depois |
|---|---|---|---|
| `ServicesFallbackGrid.jsx` e `ServiceRail.jsx` — botão "Saiba mais" (7 cards de serviço, nos dois modos: grid mobile e rail 3D desktop) | **Crítico** | `<button>` sem `onClick` — visualmente um CTA, não fazia nada | `navigate(\`/diagnostico?interesse=${service.id}\`)`. O wizard (`Diagnostico.jsx`) lê o query param no mount, resolve o nome do serviço via `services-3d/data.js` e injeta um campo "Interesse inicial" na mensagem final do WhatsApp (`lib/diagnostico.js`) |
| `Footer.jsx` — ícones LinkedIn/YouTube | **Alto** | `href="#"`, sem handler — links mortos | Removidos (não há URL real ainda; ver pendências) |
| `Footer.jsx` — "Política de Privacidade" / "Termos de Uso" | **Alto** | `href="#"` — link morto, mas referenciado no texto de consentimento LGPD do formulário | Não são mais `<a>`: viraram `<span>` estático com `title="Em breve"` — não finge ser um link funcional. Páginas reais pendentes do cliente (ver pendências) |
| `Footer.jsx` — formulário de newsletter | **Alto** | `<form onSubmit={(e)=>e.preventDefault()}>` — captura visual de e-mail que não vai a lugar nenhum, sem feedback | Removido por completo (não existe backend de e-mail marketing no projeto — confirmado no backlog do PRD; reintroduzir só quando houver Resend/SendGrid integrado) |
| Navbar/Footer/Hero/VipLive/ExitIntent (anchors `#section`) | ver seção 2 | | |

Verificado e já correto (sem alteração): Team "Conhecer +" (desabilitado, "Em breve" — decisão de produto já tomada), FAQ toggles, Portfolio filtros/modal, Method modais, FinalCTA (submit real com `axios.post` + tratamento de erro), Diagnóstico (fluxo completo do wizard), WhatsAppFloat/StickyWhatsAppMobile/DiagnosticPopup (todos com `rel="noopener noreferrer"` corretos), VipLive "Demo: desbloquear" (toggle de demonstração intencional, não é autenticação real).

---

## 4. Segurança

| Item | Severidade | Achado | Correção |
|---|---|---|---|
| `dangerouslySetInnerHTML` | — | Zero ocorrências em todo o repositório (frontend + backend). | N/A |
| `target="_blank"` sem `rel` | — | Todas as ocorrências já tinham `rel="noopener noreferrer"` (ou o equivalente `window.open(url,"_blank","noopener,noreferrer")`). | N/A |
| Segredos hardcoded | — | Nenhum encontrado. `.env`/`.env.*` cobertos pelo `.gitignore` (única exceção intencional: `frontend/.env.production`, que só fixa `REACT_APP_BACKEND_URL=` vazio para same-origin — não é segredo). | N/A |
| `Diagnostico.jsx` — campos sem limite de tamanho | **Médio** | Nenhum campo (nome, negócio, site, redes ×5, público, objetivo) tinha `maxLength`. Textos muito longos podem empurrar a URL final do `wa.me` além do limite prático (~2000 chars) e o WhatsApp falha silenciosamente ao abrir. | `maxLength` adicionado em todos os campos de texto (80–300 conforme o campo); `FinalCTA.jsx` também recebeu `maxLength` em nome (80), contato (160, espelhando o backend) e mensagem (1000, espelhando o backend). |
| `Diagnostico.jsx` — validação de WhatsApp | **Médio** | `isValid` só checava `>=10 dígitos` — aceitava `0000000000`. | Nova `isValidPhoneBR()` em `lib/diagnostico.js`: valida 10–11 dígitos, DDD real (11–99) e, se 11 dígitos, terceiro dígito precisa ser "9" (celular). |
| `Diagnostico.jsx` — campo `site` sem validação de esquema | **Baixo** | `type="url"` sozinho não bloqueia `javascript:...` (só exige que "pareça" uma URL). Sem exploração possível hoje (o valor nunca vira `href`/navegação — confirmado por grep), mas defesa em profundidade. | Adicionado `pattern="https?://.*"` — rejeita qualquer esquema que não seja http(s) na validação nativa do formulário. |
| `FinalCTA.jsx` — campo "E-mail ou WhatsApp" | **Baixo** | Sem validação de formato (só `required`). | Checagem leve antes do submit: precisa parecer e-mail (`regex`) ou ter ≥10 dígitos. |
| `public/index.html` — headers de segurança | **Médio** | Sem `Referrer-Policy` nem qualquer outra meta de segurança. | Adicionado `<meta name="referrer" content="strict-origin-when-cross-origin">`. Como o deploy é Vercel (`vercel.json` já no repo — ver Fase de deploy anterior), adicionei também `Referrer-Policy`, `X-Content-Type-Options: nosniff` e `X-Frame-Options: SAMEORIGIN` como headers reais de resposta em `vercel.json`. **Recomendação registrada, não implementada**: uma CSP completa exigiria mapear `style-src 'unsafe-inline'` (o projeto usa `style={{}}` extensivamente), `font-src` para Google Fonts e `img-src`/`media-src` para os vídeos/imagens locais — decidi não arriscar quebrar o site sem poder testar exaustivamente todos os caminhos; fica como próximo passo dedicado. |
| `frontend` — `npm audit` | **Médio→Baixo** | 31 vulnerabilidades (0 crítica, 13 alta, 7 moderada, 11 baixa) antes de qualquer ação. | `npm audit fix` (não-destrutivo) rodado. Todas as vulnerabilidades restantes são transitivas da cadeia de build do `react-scripts` (svgo/nth-check/serialize-javascript/workbox/postcss via `resolve-url-loader` etc.) — **não chegam ao bundle do navegador**, só afetam a etapa de build. A única correção real disponível exige `npm audit fix --force`, que rebaixa `react-scripts` para `0.0.0` (quebra o projeto). Recomendação registrada: migrar de CRA/`react-scripts` para um toolchain mantido (Vite) é o único jeito de zerar isso de verdade — fora do escopo desta auditoria. |
| LGPD — consentimento | — | Checkbox de consentimento existe (`Diagnostico.jsx`, step "whatsapp"), é obrigatório (`isValid` exige `d.consentimento`), e nenhuma resposta do wizard é persistida em `localStorage`/`sessionStorage` — só monta a URL do WhatsApp em memória. | Verificado, nenhuma ação necessária. |

---

## 5. Responsividade

Testado em 320, 375, 414, 768, 1024, 1280, 1440px via varredura automatizada (scroll completo em cada breakpoint, checando `scrollWidth` vs `clientWidth` e erros de console).

**Resultado: zero overflow horizontal e zero erro de console em todos os 7 breakpoints.**

| Item | Severidade | Achado | Correção |
|---|---|---|---|
| `WhatsAppFloat` × `StickyWhatsAppMobile` | **Alto** | Ver seção 2 — sobreposição visual no mobile. | Corrigido. |
| `Navbar.jsx` — botões abrir/fechar menu mobile | **Médio** | 40×40px, abaixo do alvo de toque mínimo de 44px. | `w-10 h-10` → `w-11 h-11` (44×44px confirmado via Playwright). |
| `Portfolio.jsx` — botões de filtro | **Médio** | 75×38px — altura abaixo de 44px. | `py-2` → `py-3` (novo: 75×46px). |
| Imagens sem `loading="lazy"`/dimensões | **Médio** | 7 `<img>` abaixo da dobra sem `loading="lazy"` e/ou sem `width`/`height`: logo de case em `CaseStudy.jsx`, logo do Mercado Livre em `MercadoLivreCase.jsx`, `LogoBadge` em `Portfolio.jsx`, os dois `logoOverride` em `ServicesFallbackGrid.jsx`, o `logoOverride` em `ServiceRail.jsx`, o logo do TOP Show em `TopShowStoryChart.jsx`. | `loading="lazy"` + `width`/`height` explícitos adicionados em todos. `SgsLogo.jsx` (navbar, acima da dobra) mantido sem lazy de propósito. `SocialProof.jsx`/`Team.jsx` já estavam corretos (container com `aspect-ratio` fixo previne CLS mesmo sem `width`/`height` no `<img>`). |
| Diagnóstico — teclado cobrindo campo ativo | — | `autoFocusRef.current.focus()` já é chamado **sem** `preventScroll`, ou seja, o comportamento nativo do navegador (rolar o campo focado para cima do teclado virtual) já está ativo. | Verificado, nenhuma ação necessária. |
| CLS | — | `cumulative-layout-shift = 0` em todas as medições Lighthouse (antes e depois). | N/A |

---

## 6. Performance

### Lighthouse mobile — antes / depois

| Página | Métrica | Antes | Depois | Meta |
|---|---|---|---|---|
| `/` | Performance | 52 | **66** | ≥85 |
| `/` | Acessibilidade | 92 | **100** | ≥95 |
| `/` | Best Practices | 96 | 96 | ≥95 |
| `/` | SEO | 92 | 92 | — |
| `/` | LCP | 7.5s | **4.2s** | — |
| `/` | TBT | 670ms | **370ms** | — |
| `/` | CLS | 0 | 0 | — |
| `/` | Peso total da página | 1349KB | **728KB** | — |
| `/diagnostico` | Performance | — | 80 | ≥85 |
| `/diagnostico` | Acessibilidade | — | 100 | ≥95 |
| `/diagnostico` | Best Practices | — | 96 | ≥95 |

### O que foi corrigido

- **Imagens (maior ganho isolado):** fotos da equipe estavam em PNG cru — `head-tecnologia.png` 1.8MB e `head-trafego.png` 1.2MB (!) para cards renderizados a ~350px de largura. Convertidas para WebP (qualidade 85, mesma resolução): **1.8MB→116KB** e **1.2MB→32KB**. Logo (`logo.png` 116KB→`logo.webp` 20KB) e as 3 logos de case (232-244KB cada → 16-36KB cada) também convertidas. Peso de imagem da home: **770KB → 144KB** (-81%). Qualidade visual conferida lado a lado, sem artefato perceptível. PNGs antigos removidos.
- **Contraste (fechou Acessibilidade 92→100):** `select`/`input`/`textarea` do formulário de contato sem `<label>` associado (`select-name`) — adicionados `id`/`htmlFor`. Rótulos em uppercase pequeno (`text-slate-500` 12px, usados em `Footer.jsx`, `LogoMarquee.jsx`, `Method.jsx`) mediam 3.89–3.98:1 contra o fundo escuro (mínimo exigido: 4.5:1) — trocados para `text-slate-400`. O marquee de clientes (`text-slate-500/70`) media 2.53:1 (mínimo para texto grande: 3:1) — removida a opacidade extra.
- **Dead code (seção 2):** ~46 arquivos e ~30 dependências não utilizadas removidas — reduz o que o bundler processa e o CSS final gerado (14.0kB→8.7kB gzip).
- **Code-splitting já correto:** confirmado por inspeção do bundle de produção que `three`/`@react-three/*` (1MB) ficam isolados no chunk lazy (`227.*.chunk.js`) e **não aparecem** no chunk principal (`main.*.js`) — o gate `isDesktop && hasFinePointer && !prefersReducedMotion && supportsWebGL2` com `React.lazy` funciona como esperado.
- **`font-display: swap`:** já estava correto (query param `&display=swap` na URL do Google Fonts) — verificado, nenhuma ação necessária.

### O que falta para chegar a 85 (não resolvido nesta auditoria)

O gargalo restante na home é **custo de execução JS no mount inicial**, não peso de rede: `bootup-time` do `main.*.js` soma ~3.1s sob o throttling simulado do Lighthouse (4x CPU), e o elemento de LCP (primeira palavra do headline do Hero) só pinta depois de ~3.7s porque a Hero — e as ~13 seções abaixo dela — montam e rodam seus efeitos (`useInView`, animações Framer Motion, etc.) todas de uma vez no carregamento, mesmo as que estão muito abaixo da dobra. Resolver isso de verdade exige uma mudança maior de arquitetura (lazy-mount de seções por `IntersectionObserver`, ou migrar para SSR/SSG) — fora do escopo seguro desta passada de correções pontuais. `/diagnostico` já está em 80/85 por ser uma página bem mais leve (sem Hero/Particles/3D/vídeos).

---

## Pendências que dependem do cliente

1. **Logo Mercado Livre** — arquivo `mercado-livre.webp` precisa ser salvo manualmente em `frontend/public/assets/clients/` (ver seção 0).
2. **LinkedIn / YouTube** — ícones removidos do rodapé por apontarem para link morto (`href="#"`). Reintroduzir quando houver URLs reais dos perfis.
3. **Política de Privacidade / Termos de Uso** — texto de consentimento LGPD do formulário de diagnóstico referencia uma "Política de Privacidade" que não existe como página publicada. Precisa de conteúdo jurídico real antes de linkar de volta no rodapé.
4. **Nomes dos Heads** — já corretos no site: Gabriel Sanches (Head de Tecnologia) e Thiago (Head de Tráfego Digital), confirmados em fase anterior.
5. **Número de WhatsApp** — `5511978734770`, centralizado em `lib/constants.js`, já confirmado em fase anterior.

---

## Verificação final (checklist de entrega)

- `href="#"` (links mortos): **zero** (grep limpo em todo `frontend/src`)
- `console.log`: **zero**
- "Placeholder" visível ao usuário: **zero**
- Menções a Pulse/Vertex/Forte: **zero**
- Todas as rotas (`/`, `/diagnostico`, `/diagnostico?interesse=...`, `/blog`, `/cases/:slug` válido e inválido, `/obrigado`) navegadas via Playwright: **zero erros de console/página**
- Build de produção (`CI=true npm run build`, replica o modo do Vercel): **compila limpo**
