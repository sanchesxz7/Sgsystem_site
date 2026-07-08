// Shared registry for the single Lenis instance (created in App.js, only
// while on the Landing route — see useLenis()). Anything that needs to
// scroll to a section goes through here instead of touching Lenis directly,
// so it degrades gracefully (plain smooth scrollIntoView) when Lenis isn't
// mounted — e.g. prefers-reduced-motion, or a route with no Lenis instance.
let activeLenis = null;

export function setActiveLenis(instance) {
  activeLenis = instance;
}

export function scrollToId(id, { offset = -84 } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (activeLenis) {
    activeLenis.scrollTo(el, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  return true;
}
