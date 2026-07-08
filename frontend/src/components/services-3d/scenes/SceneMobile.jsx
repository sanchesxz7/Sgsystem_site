import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const STILL = { duration: 0.3 };
const CARD_COLORS = ["var(--accent-blue)", "var(--accent-purple)", "var(--accent-magenta)"];

export default function SceneMobile({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      <motion.g
        style={{ originX: 0.5, originY: 0.5, x: 200, y: 112 }}
        animate={run ? { rotate: 360 } : { rotate: 0 }}
        transition={run ? { duration: 14, repeat: Infinity, ease: "linear" } : STILL}
      >
        {[0, 120, 240].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <circle cx="0" cy="-92" r="5" fill="var(--accent-purple)" opacity="0.75" />
          </g>
        ))}
      </motion.g>

      <rect x="150" y="30" width="100" height="165" rx="16" fill="#0f1729" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <rect x="158" y="42" width="84" height="141" rx="6" fill="#0a0e1a" />

      <clipPath id="mobile-screen-clip">
        <rect x="158" y="42" width="84" height="141" rx="6" />
      </clipPath>
      <g clipPath="url(#mobile-screen-clip)">
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ x: 280 }}
            animate={run ? { x: [280, 0, 0, -140] } : { x: 0 }}
            transition={
              run
                ? { duration: 5, repeat: Infinity, times: [0, 0.2, 0.75, 1], delay: i * 0.3, ease: "easeInOut" }
                : STILL
            }
          >
            <rect x="164" y={50 + i * 46} width="72" height="38" rx="8" fill={CARD_COLORS[i]} opacity="0.85" />
          </motion.g>
        ))}
      </g>

      <motion.g
        style={{ originX: 0.5, originY: 0.5, x: 234, y: 36 }}
        animate={run ? { scale: [0, 1.3, 1, 1, 0] } : { scale: 0 }}
        transition={
          run
            ? { duration: 2.6, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.3, 0.45, 0.8, 1], ease: "easeOut" }
            : STILL
        }
      >
        <circle r="7" fill="var(--accent-green)" />
      </motion.g>
    </SceneFrame>
  );
}
