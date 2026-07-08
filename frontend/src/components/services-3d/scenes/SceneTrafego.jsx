import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const STILL = { duration: 0.3 };
const BAR_HEIGHTS = [30, 45, 38, 60, 50, 72];

// Small numeric ticker for the KPI readouts — plain rAF, no motion value
// machinery needed for a couple of digits.
function TickingNumber({ run, from, to }) {
  const [val, setVal] = useState(to);
  useEffect(() => {
    if (!run) {
      setVal(to);
      return undefined;
    }
    let raf;
    const duration = 2600;
    const start = performance.now();
    const loop = (t) => {
      const elapsed = (t - start) % duration;
      const p = elapsed / duration;
      setVal(Math.round(from + (to - from) * p));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [run, from, to]);
  return val;
}

export default function SceneTrafego({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      <rect x="20" y="20" width="360" height="185" rx="10" fill="#0f1729" stroke="rgba(255,255,255,0.08)" />

      <g transform="translate(40, 175)">
        {BAR_HEIGHTS.map((h, i) => (
          <motion.rect
            key={i}
            x={i * 20}
            y={-h}
            width="12"
            height={h}
            rx="3"
            fill="var(--accent-blue)"
            opacity="0.55"
            style={{ originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={run ? { scaleY: [0, 1, 1, 0] } : { scaleY: 1 }}
            transition={
              run
                ? { duration: 1.2, delay: i * 0.15, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }
                : STILL
            }
          />
        ))}
      </g>

      <motion.path
        d="M40 150 L90 120 L130 132 L170 90 L210 100 L250 60 L290 40"
        stroke="var(--accent-green)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={run ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
        transition={run ? { duration: 4, repeat: Infinity, times: [0, 0.6, 0.9, 1], ease: "easeInOut" } : STILL}
      />

      {[70, 150, 230].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="110"
          r="2.6"
          fill="var(--accent-green)"
          animate={run ? { y: [0, -50], opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={run ? { duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: "easeOut" } : STILL}
        />
      ))}

      <text x="330" y="45" textAnchor="middle" fontSize="9" fill="var(--accent-blue)" fontFamily="JetBrains Mono, monospace" opacity="0.7">
        ROAS
      </text>
      <text x="330" y="63" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono, monospace">
        {run ? <TickingNumber run={run} from={3} to={8} /> : 8}x
      </text>
      <text x="330" y="92" textAnchor="middle" fontSize="9" fill="var(--accent-purple)" fontFamily="JetBrains Mono, monospace" opacity="0.7">
        CPL
      </text>
      <text x="330" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono, monospace">
        R${run ? <TickingNumber run={run} from={18} to={6} /> : 6}
      </text>
    </SceneFrame>
  );
}
