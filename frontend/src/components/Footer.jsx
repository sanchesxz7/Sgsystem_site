import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SgsLogo from "./SgsLogo";
import { buildWhatsAppUrl } from "../lib/constants";
import { scrollToId } from "../lib/scroll";

const SERVICES = [
  "Desenvolvimento Web",
  "Aplicativos Mobile",
  "Gestão de Tráfego",
  "Automação Empresarial",
  "Audiovisual",
  "Social Media",
];
const COMPANY = [
  { label: "Sobre", href: "#sobre" },
  { label: "Método", href: "#metodo" },
  { label: "Cases", href: "#cases" },
  { label: "Equipe", href: "#equipe" },
  { label: "Blog", to: "/blog" },
];

const WHATSAPP_URL = buildWhatsAppUrl("Olá! Vim pelo site da Sanches Group System.");

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Same cross-route-safe pattern as Navbar's goToSection: works when the
  // footer is on "/" (scrolls via Lenis) and would still work correctly if
  // ever rendered from another route.
  const goToSection = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer
      className="relative pt-16 pb-10 bg-[#0a1020] border-t border-white/5"
      data-testid="footer"
    >
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{ background: "var(--gradient-signature)", opacity: 0.5 }}
      />
      <div className="container-x grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <SgsLogo size={40} />
            <span className="font-display font-extrabold text-white text-lg">
              Sanches Group System
            </span>
          </div>
          <p className="mt-4 text-slate-400 max-w-sm">
            Códigos que escalam negócios. Soluções digitais corporativas para o
            crescimento mensurável.
          </p>
          <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">
            Atendimento 100% online · Brasil
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href="https://instagram.com/sgsystem.oficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @sgsystem.oficial"
              className="w-9 h-9 grid place-items-center rounded-full border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition"
              data-testid="footer-instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 grid place-items-center rounded-full border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition"
              data-testid="footer-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-4">
            Serviços
          </div>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s}>
                <a
                  href="#servicos"
                  onClick={goToSection("servicos")}
                  className="text-slate-300 hover:text-white transition"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-4">
            Empresa
          </div>
          <ul className="space-y-2">
            {COMPANY.map((s) =>
              s.to ? (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className="text-slate-300 hover:text-white transition"
                  >
                    {s.label}
                  </Link>
                </li>
              ) : (
                <li key={s.label}>
                  <a
                    href={s.href}
                    onClick={goToSection(s.href.slice(1))}
                    className="text-slate-300 hover:text-white transition"
                  >
                    {s.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-4">
            Contato
          </div>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-sgs-blue" />
              <a
                href="https://instagram.com/sgsystem.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                @sgsystem.oficial
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sgs-blue" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                (11) 97873-4770
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sgs-blue" />
              <a
                href="mailto:contato@sanchesxz.com.br"
                className="hover:text-white transition"
              >
                contato@sanchesxz.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          © {new Date().getFullYear()} Sanches Group System · Todos os direitos
          reservados
        </div>
        {/*
          Política de Privacidade / Termos de Uso: no published pages exist
          yet for these (pending real legal copy from the client), so they're
          intentionally plain, non-clickable text rather than dead `href="#"`
          links. Swap back to real links once those pages exist.
        */}
        <div className="flex items-center gap-5">
          <span className="cursor-default text-slate-400" title="Em breve">
            Política de Privacidade
          </span>
          <span className="cursor-default text-slate-400" title="Em breve">
            Termos de Uso
          </span>
        </div>
      </div>
    </footer>
  );
}
