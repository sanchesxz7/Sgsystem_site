import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const STILL = { duration: 0.3 };
const FEED_COLORS = ["var(--accent-blue)", "var(--accent-purple)", "var(--accent-magenta)"];

export default function SceneSocialMedia({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      <rect x="140" y="16" width="120" height="193" rx="14" fill="#0f1729" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

      <clipPath id="social-feed-clip">
        <rect x="146" y="22" width="108" height="181" rx="10" />
      </clipPath>
      <g clipPath="url(#social-feed-clip)">
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ y: 220 }}
            animate={run ? { y: [220, 100, -40, -160] } : { y: 100 - i * 60 }}
            transition={run ? { duration: 6, repeat: Infinity, delay: i * 2, ease: "linear" } : STILL}
          >
            <rect x="152" y="0" width="96" height="70" rx="8" fill={FEED_COLORS[i]} opacity="0.35" />
            <rect x="158" y="8" width="16" height="16" rx="8" fill="#fff" opacity="0.6" />
            <rect x="180" y="10" width="40" height="6" rx="3" fill="#fff" opacity="0.5" />
            <rect x="158" y="34" width="84" height="28" rx="4" fill="#fff" opacity="0.12" />
          </motion.g>
        ))}
      </g>

      <motion.path
        d="M80 150 C74 144 70 140 70 135 C70 131 73 129 76 129 C78 129 80 130 80 133 C80 130 82 129 84 129 C87 129 90 131 90 135 C90 140 86 144 80 150 Z"
        fill="var(--accent-red)"
        style={{ originX: 0.5, originY: 0.5 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={run ? { scale: [0, 1.3, 1], y: [0, -20, -40], opacity: [0, 1, 0] } : { scale: 1, opacity: 0 }}
        transition={run ? { duration: 2, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" } : STILL}
      />

      {[0, 1].map((i) => (
        <motion.g
          key={i}
          style={{ x: 60 + i * 10 }}
          initial={{ y: 70 - i * 30, opacity: 0 }}
          animate={
            run
              ? { y: [70 - i * 30, 56 - i * 30, 56 - i * 30], opacity: [0, 1, 0] }
              : { y: 70 - i * 30, opacity: 0.5 }
          }
          transition={run ? { duration: 2.2, repeat: Infinity, delay: i * 1.1, ease: "easeOut" } : STILL}
        >
          <rect x="-16" y="-10" width="32" height="20" rx="8" fill="var(--accent-blue)" opacity="0.8" />
          <path d="M-6 10 L-6 16 L0 10 Z" fill="var(--accent-blue)" opacity="0.8" />
        </motion.g>
      ))}
    </SceneFrame>
  );
}
