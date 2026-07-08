import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const STILL = { duration: 0.3 };

function SalesTicker({ run }) {
  const [val, setVal] = useState(128);
  useEffect(() => {
    if (!run) return undefined;
    const id = setInterval(() => setVal((v) => v + 1), 900);
    return () => clearInterval(id);
  }, [run]);
  return val;
}

export default function SceneTiktokShop({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      <rect x="130" y="30" width="140" height="120" rx="12" fill="#0f1729" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <rect x="144" y="42" width="112" height="66" rx="8" fill="url(#tts-grad)" />
      <rect x="144" y="118" width="70" height="8" rx="4" fill="#fff" opacity="0.7" />
      <rect x="144" y="132" width="40" height="10" rx="5" fill="var(--accent-green)" opacity="0.85" />
      <defs>
        <linearGradient id="tts-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-magenta)" />
          <stop offset="100%" stopColor="var(--accent-purple)" />
        </linearGradient>
      </defs>

      <motion.g
        style={{ x: 148, y: 48 }}
        animate={run ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
        transition={run ? { duration: 1.3, repeat: Infinity, ease: "easeInOut" } : STILL}
      >
        <rect x="0" y="0" width="34" height="14" rx="7" fill="var(--accent-red)" />
        <text x="17" y="10" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">
          AO VIVO
        </text>
      </motion.g>

      <path d="M55 120 L62 105 H88 L95 120" stroke="var(--accent-blue)" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      <rect x="48" y="120" width="54" height="46" rx="6" stroke="var(--accent-blue)" strokeWidth="2.2" fill="none" />
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          style={{ originX: 0.5, originY: 0.5 }}
          initial={{ x: 68, y: 20, opacity: 0, scale: 0.6 }}
          animate={
            run
              ? { x: [68, 68 + (i - 1) * 14], y: [20, 130], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.4] }
              : { opacity: 0 }
          }
          transition={run ? { duration: 2, repeat: Infinity, delay: i * 0.7, ease: "easeIn" } : STILL}
        >
          <rect x="-5" y="-5" width="10" height="10" rx="2" fill="var(--accent-green)" />
        </motion.g>
      ))}

      <motion.g
        style={{ originX: 0.5, originY: 0.5, x: 75, y: 75 }}
        animate={run ? { rotate: 360 } : { rotate: 0 }}
        transition={run ? { duration: 4, repeat: Infinity, ease: "linear" } : STILL}
      >
        <g transform="translate(0,-55)">
          <path d="M0 -6 V6 M0 -6 Q4 -8 5 -4" stroke="var(--accent-magenta)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="-1.5" cy="6" r="3" fill="var(--accent-magenta)" />
        </g>
      </motion.g>

      <text x="330" y="180" textAnchor="middle" fontSize="9" fill="var(--accent-blue)" fontFamily="JetBrains Mono, monospace" opacity="0.7">
        VENDAS HOJE
      </text>
      <text x="330" y="198" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono, monospace">
        <SalesTicker run={run} />
      </text>
    </SceneFrame>
  );
}
