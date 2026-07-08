import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// ESC to close, Tab/Shift+Tab trapped inside the modal, body scroll locked
// while open, and focus moved into the modal on open (restored on close).
// None of the existing hand-rolled modals in this codebase (ComingSoonModal,
// DiagnosticPopup) do this — factored out here so it's not reimplemented
// per-modal.
export function useModalA11y(open, onClose, contentRef) {
  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusFirst = () => {
      const el = contentRef.current;
      if (!el) return;
      const focusable = el.querySelector(FOCUSABLE_SELECTOR);
      (focusable || el).focus({ preventScroll: true });
    };
    // Wait a tick for the enter animation/mount to settle.
    const focusRaf = requestAnimationFrame(focusFirst);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const el = contentRef.current;
      if (!el) return;
      const focusables = [...el.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
        (node) => node.offsetParent !== null,
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      cancelAnimationFrame(focusRaf);
      document.removeEventListener("keydown", onKeyDown, true);
      body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open, onClose, contentRef]);
}

export default useModalA11y;
