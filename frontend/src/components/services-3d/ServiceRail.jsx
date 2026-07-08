import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { ANIMATED_SERVICE_ICONS } from "./AnimatedServiceIcons";

// Pure HTML overlay beside the 3D canvas — real, accessible, searchable text
// for the active service, plus the rail of all 7 titles and a progress track.
// `progressBarRef` is mutated imperatively (scaleY) by the scene's useFrame
// loop, so the fill animates at 60fps without going through React state.
export default function ServiceRail({ services, activeIndex, progressBarRef }) {
  const active = services[activeIndex];
  const navigate = useNavigate();
  const ActiveIcon = ANIMATED_SERVICE_ICONS[active.id];

  return (
    <div className="flex flex-col justify-center gap-10 h-full" data-testid="service-rail">
      <div className="relative max-w-md min-h-[440px]" data-testid="service-stage-text">
        {/*
          No `mode="wait"` on purpose: scrolling fast fires several
          activeIndex changes within the ~0.4s a single exit+enter cycle
          takes, and "wait" strictly serializes transitions — it was
          queuing them up and visibly lagging behind the true active index
          (the sync bug). Default (concurrent) mode lets each entry animate
          in immediately as its key appears, so what's on screen always
          matches the latest activeIndex, even mid-scroll.
        */}
        <AnimatePresence initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {ActiveIcon && (
              <div className="mb-4" data-testid="service-stage-icon">
                <ActiveIcon size={72} active />
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {active.title}
              </h3>
              {active.logoOverride && (
                <img
                  src={active.logoOverride}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
              )}
            </div>
            <p className="text-slate-400 leading-relaxed mb-5">{active.desc}</p>
            <ul className="space-y-2.5 mb-6">
              {active.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-sgs-green mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate(`/diagnostico?interesse=${active.id}`)}
              className="inline-flex items-center gap-1.5 text-sm text-white border border-white/15 px-4 py-2 rounded-full hover:bg-white/5 transition"
            >
              Saiba mais <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <div className="relative w-[2px] rounded-full bg-white/10 overflow-hidden shrink-0">
          <div
            ref={progressBarRef}
            className="absolute inset-x-0 top-0 w-full h-full rounded-full origin-top"
            style={{ background: "var(--gradient-signature)", transform: "scaleY(0)" }}
          />
        </div>
        <div>
          {services.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center py-2.5"
              data-testid={`service-rail-item-${i}`}
            >
              <span
                className={`text-sm font-medium transition-colors ${
                  i === activeIndex ? "text-white" : "text-slate-500"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
