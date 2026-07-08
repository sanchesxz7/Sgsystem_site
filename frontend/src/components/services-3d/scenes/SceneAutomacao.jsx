import { motion } from "framer-motion";
import { SceneFrame, useSceneRun } from "./SceneBase";

const STILL = { duration: 0.3 };
const NODES = [
  { x: 50, y: 112 },
  { x: 145, y: 55 },
  { x: 145, y: 170 },
  { x: 255, y: 55 },
  { x: 255, y: 170 },
  { x: 350, y: 112 },
];
const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

export default function SceneAutomacao({ active = true }) {
  const run = useSceneRun(active);
  return (
    <SceneFrame>
      {EDGES.map(([a, b], i) => {
        const p1 = NODES[a];
        const p2 = NODES[b];
        return (
          <path
            key={i}
            d={`M${p1.x} ${p1.y} Q${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2} ${p2.x} ${p2.y}`}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.6"
            fill="none"
          />
        );
      })}

      {/*
        Traveling pulse via `pathOffset` (stroke-dashoffset under the hood)
        rather than animating a circle's cx/cy through an array of
        keyframes — the latter briefly writes literal "undefined" to the
        cx/cy DOM attributes during Framer Motion's unmount cleanup (logged
        as a console error, harmless but noisy). pathOffset never touches a
        raw attribute, so there's nothing to leave stale on exit.
      */}
      {EDGES.map(([a, b], i) => {
        const p1 = NODES[a];
        const p2 = NODES[b];
        return (
          <motion.path
            key={`pulse-${i}`}
            d={`M${p1.x} ${p1.y} Q${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2} ${p2.x} ${p2.y}`}
            stroke="var(--accent-green)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="8 300"
            initial={{ pathOffset: 0, opacity: 0 }}
            animate={run ? { pathOffset: [0, 1], opacity: [0, 1, 1, 0] } : { pathOffset: 0, opacity: 0 }}
            transition={run ? { duration: 1.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" } : STILL}
          />
        );
      })}

      {NODES.map((n, i) => (
        <motion.g key={i} style={{ x: n.x, y: n.y }}>
          <circle r="14" fill="#0f1729" stroke="var(--accent-blue)" strokeWidth="2" />
          <motion.circle
            r="14"
            fill="var(--accent-blue)"
            animate={run ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
            transition={run ? { duration: 1.4, repeat: Infinity, delay: i * 0.3 + 0.2, ease: "easeOut" } : STILL}
          />
          {i === NODES.length - 1 && (
            <motion.path
              d="M-5 0 L-1.5 4 L6 -5"
              stroke="var(--accent-green)"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={run ? { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : { pathLength: 1, opacity: 1 }}
              transition={run ? { duration: 1.6, repeat: Infinity, delay: 1.6, times: [0, 0.3, 0.85, 1] } : STILL}
            />
          )}
        </motion.g>
      ))}
    </SceneFrame>
  );
}
