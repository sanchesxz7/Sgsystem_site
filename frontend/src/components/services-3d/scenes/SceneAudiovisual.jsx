import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const STILL = { duration: 0.3 };
const TRACK_Y = [90, 120];
const CLIPS = [
  { track: 0, x: 20, w: 70, color: "var(--accent-blue)" },
  { track: 0, x: 110, w: 50, color: "var(--accent-purple)" },
  { track: 0, x: 180, w: 90, color: "var(--accent-blue)" },
  { track: 1, x: 40, w: 60, color: "var(--accent-magenta)" },
  { track: 1, x: 120, w: 100, color: "var(--accent-magenta)" },
];

export default function SceneAudiovisual({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      {TRACK_Y.map((y, i) => (
        <rect key={i} x="20" y={y} width="280" height="20" rx="4" fill="#0f1729" />
      ))}
      {CLIPS.map((c, i) => (
        <rect key={i} x={c.x} y={TRACK_Y[c.track] + 2} width={c.w} height="16" rx="3" fill={c.color} opacity="0.75" />
      ))}

      <g transform="translate(20, 165)">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.rect
            key={i}
            x={i * 10}
            y="-6"
            width="4"
            height="12"
            rx="2"
            fill="var(--accent-green)"
            opacity="0.6"
            style={{ originY: 0.5 }}
            initial={{ scaleY: 0.5 }}
            animate={run ? { scaleY: [0.3, 1.6, 0.4, 1.2, 0.3] } : { scaleY: 0.6 }}
            transition={run ? { duration: 1.6, repeat: Infinity, delay: (i % 7) * 0.08, ease: "easeInOut" } : STILL}
          />
        ))}
      </g>

      <motion.g
        initial={{ x: 20 }}
        animate={run ? { x: [20, 300, 20] } : { x: 20 }}
        transition={run ? { duration: 5, repeat: Infinity, ease: "linear" } : STILL}
      >
        <line x1="0" y1="82" x2="0" y2="185" stroke="#fff" strokeWidth="1.6" opacity="0.8" />
        <path d="M-5 82 L5 82 L0 90 Z" fill="#fff" opacity="0.8" />
      </motion.g>

      <motion.circle
        cx="330"
        cy="35"
        r="6"
        fill="var(--accent-red)"
        animate={run ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
        transition={run ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : STILL}
      />
      <text x="316" y="55" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="var(--accent-red)" opacity="0.8">
        REC
      </text>

      <motion.g
        style={{ originX: 0, originY: 1, x: 20, y: 42 }}
        animate={run ? { rotate: [0, -18, 0, 0] } : { rotate: 0 }}
        transition={run ? { duration: 3, repeat: Infinity, times: [0, 0.25, 0.5, 1], ease: "easeInOut" } : STILL}
      >
        <rect x="0" y="-12" width="34" height="12" rx="2" fill="var(--accent-blue)" opacity="0.85" />
        <line x1="5" y1="-12" x2="9" y2="0" stroke="#0a0e1a" strokeWidth="1.6" />
        <line x1="15" y1="-12" x2="19" y2="0" stroke="#0a0e1a" strokeWidth="1.6" />
        <line x1="25" y1="-12" x2="29" y2="0" stroke="#0a0e1a" strokeWidth="1.6" />
      </motion.g>
    </SceneFrame>
  );
}
