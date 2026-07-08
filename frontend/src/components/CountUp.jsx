import { useEffect, useRef, useState } from "react";

export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // Callers pass a fresh object literal on every render, so `options` can't
  // sit in the deps array without re-running the effect (and re-creating the
  // observer) on every render. A ref holds the latest value without that.
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      optionsRef.current,
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function CountUp({
  to = 100,
  from = 0,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  const formatted = val.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
