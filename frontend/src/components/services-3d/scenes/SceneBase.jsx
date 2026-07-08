import { useReducedMotion } from "framer-motion";

export const SCENE_W = 400;
export const SCENE_H = 225;

// `active` (this is the selected/visible scene) AND not reduced-motion.
// Every scene calls this once and gates its whole animate tree on it.
export function useSceneRun(active) {
  const reduce = useReducedMotion();
  return active && !reduce;
}

export function SceneFrame({ children }) {
  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width={SCENE_W} height={SCENE_H} fill="#0a0e1a" />
      {children}
    </svg>
  );
}
