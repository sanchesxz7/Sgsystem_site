// Central place for values repeated across components — mainly so a single
// edit here (not a find-and-replace across the codebase) updates every
// WhatsApp link on the site.

// E.164 format, no leading "+". Confirm this is the SGS number before
// launch — it's reused verbatim from what was already hardcoded across
// WhatsAppFloat/StickyWhatsAppMobile/DiagnosticPopup/Footer/ThankYou.
export const WHATSAPP_NUMBER = "5511978734770";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
