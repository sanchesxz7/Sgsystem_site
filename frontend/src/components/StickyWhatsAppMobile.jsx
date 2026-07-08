import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/constants";

const WHATSAPP_URL = buildWhatsAppUrl(
  "Olá! Vim pelo site da Sanches Group System e quero falar com um consultor.",
);

/**
 * Banner sticky para mobile — fica fixo na base.
 * Em desktop fica oculto (já temos o botão flutuante).
 */
export default function StickyWhatsAppMobile() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      className="sm:hidden fixed bottom-0 inset-x-0 z-[55] p-3 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/95 to-transparent"
      data-testid="sticky-whatsapp-mobile"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-full font-semibold text-[#04231b] shadow-[0_8px_30px_rgba(37,211,102,0.45)]"
        style={{ background: "linear-gradient(135deg,#25D366,#10D981)" }}
      >
        <span className="inline-flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Falar agora no WhatsApp
        </span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}
