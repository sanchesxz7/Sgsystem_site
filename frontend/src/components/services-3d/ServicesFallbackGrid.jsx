import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useInView } from "../CountUp";
import { viewportOnce } from "../../lib/animations";
import { useServiceVideos } from "./useServiceVideos";
import { ANIMATED_SERVICE_ICONS } from "./AnimatedServiceIcons";

// The card's <video> only plays while it's actually on screen — same "pause
// offscreen" rule the icon loop followed before real video existed (Fase
// 1D), now applied to playback itself so 7 simultaneous cards never mean 7
// simultaneous decodes.
function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const Icon = ANIMATED_SERVICE_ICONS[service.id];

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 22 } }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
      className="gradient-border rounded-2xl overflow-hidden group cursor-pointer"
      data-testid={`service-${index}`}
    >
      {service.hasVideo ? (
        <div className="relative w-full aspect-video bg-[#0a0e1a]">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={service.sources.poster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={service.sources.webm} type="video/webm" />
            <source src={service.sources.mp4} type="video/mp4" />
          </video>
          <div
            className="absolute left-3 bottom-3 w-10 h-10 rounded-xl grid place-items-center"
            style={{
              background: "rgba(10,14,26,0.75)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {Icon && <Icon size={26} active={inView} />}
            {service.logoOverride && (
              <img
                src={service.logoOverride}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                loading="lazy"
                className="absolute -right-1 -bottom-1 w-4 h-4"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="p-7 pb-0">
          <div
            className="relative w-14 h-14 rounded-2xl grid place-items-center group-hover:scale-110 transition"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 24px rgba(59,130,246,0.15)",
            }}
          >
            {Icon && <Icon size={40} active={inView} />}
            {service.logoOverride && (
              <img
                src={service.logoOverride}
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                loading="lazy"
                className="absolute right-1 bottom-1 w-5 h-5"
              />
            )}
          </div>
        </div>
      )}

      <div className="p-7">
        <h3 className="font-display text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.desc}</p>
        <ul className="space-y-2 mb-5">
          {service.bullets.map((b, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
              <Check className="w-4 h-4 text-sgs-green mt-0.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => navigate(`/diagnostico?interesse=${service.id}`)}
          className="inline-flex items-center gap-1.5 text-sm text-white border border-white/15 px-4 py-2 rounded-full hover:bg-white/5 transition"
        >
          Saiba mais <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export default function ServicesFallbackGrid() {
  const services = useServiceVideos();

  return (
    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} />
      ))}
    </div>
  );
}
