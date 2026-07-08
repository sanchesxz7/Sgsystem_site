import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../lib/constants";

export default function WhatsAppFloat() {
  const href = buildWhatsAppUrl(
    "Olá! Vim pelo site da Sanches Group System e quero falar com um consultor.",
  );
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 18 }}
      className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full grid place-items-center text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
      }}
      aria-label="Falar no WhatsApp"
      data-testid="whatsapp-float"
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(37,211,102,0.4)",
          animation: "pulse-ring 2s ease-out infinite",
        }}
        aria-hidden
      />
      <MessageCircle className="w-6 h-6 relative z-10" fill="white" />
    </motion.a>
  );
}
