import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const CODE_LINES = [40, 70, 55, 90, 35, 65, 50];
const STILL = { duration: 0.3 };

export default function SceneDevWeb({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      <rect x="20" y="20" width="360" height="185" rx="10" fill="#0f1729" stroke="rgba(255,255,255,0.08)" />
      <rect x="20" y="20" width="360" height="26" rx="10" fill="#111827" />
      {["#ef4444", "#eab308", "#10d981"].map((c, i) => (
        <circle key={c} cx={34 + i * 12} cy="33" r="3.5" fill={c} opacity="0.8" />
      ))}

      <g transform="translate(32, 62)">
        {CODE_LINES.map((w, i) => (
          <motion.rect
            key={i}
            x="0"
            y={i * 16}
            height="6"
            rx="3"
            width={w}
            fill={i % 2 === 0 ? "var(--accent-blue)" : "var(--accent-purple)"}
            style={{ originX: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={run ? { scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : { scaleX: 1, opacity: 0.6 }}
            transition={
              run
                ? { duration: 6, repeat: Infinity, times: [0, 0.12, 0.85, 1], delay: i * 0.4, ease: "easeInOut" }
                : STILL
            }
          />
        ))}
        <motion.rect
          x="0"
          y={CODE_LINES.length * 16}
          width="2"
          height="9"
          fill="var(--accent-green)"
          animate={run ? { opacity: [1, 0, 1] } : { opacity: 0.8 }}
          transition={run ? { duration: 0.8, repeat: Infinity } : STILL}
        />
      </g>

      <line x1="210" y1="56" x2="210" y2="195" stroke="rgba(255,255,255,0.08)" />

      <motion.g
        style={{ originX: 0.5, originY: 0.5, x: 300, y: 120 }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={run ? { scale: [0.6, 1, 1, 0.6], opacity: [0, 1, 1, 0] } : { scale: 1, opacity: 0.85 }}
        transition={run ? { duration: 6, repeat: Infinity, times: [0, 0.3, 0.85, 1], ease: "easeOut" } : STILL}
      >
        <rect x="-55" y="-38" width="110" height="76" rx="10" fill="url(#devweb-grad)" />
        <rect x="-40" y="-18" width="80" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
        <rect x="-40" y="-2" width="55" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
        <rect x="-40" y="16" width="36" height="12" rx="6" fill="rgba(255,255,255,0.85)" />
      </motion.g>
      <defs>
        <linearGradient id="devweb-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-blue)" />
          <stop offset="100%" stopColor="var(--accent-purple)" />
        </linearGradient>
      </defs>
    </SceneFrame>
  );
}
