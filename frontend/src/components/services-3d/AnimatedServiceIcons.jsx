import { motion, useReducedMotion } from "framer-motion";

// Seven hand-authored SVG icons, one per service — literal enough that the
// theme reads in under a second, animated with transform/opacity only so
// they stay cheap on mobile. No emoji (inconsistent across OS, can't be
// animated with any control) and no raster images.
//
// Every icon takes `active` (loop runs) and freezes on its rest frame when
// false — callers gate that on viewport visibility (mobile grid) or "this is
// the selected service" (desktop rail). `prefers-reduced-motion` is checked
// once per icon via useReducedMotion() and force-freezes regardless of
// `active`.

const STILL = { duration: 0.3 };

function IconBase({ size = 80, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function GearShape({ color, radius = 12, teeth = 8, holeOpacity = 1 }) {
  const step = 360 / teeth;
  return (
    <>
      <circle r={radius} fill="none" stroke={color} strokeWidth="2.4" opacity="0.55" />
      <circle r={radius * 0.42} fill={color} opacity={holeOpacity} />
      {Array.from({ length: teeth }).map((_, i) => (
        <rect
          key={i}
          x={-2.1}
          y={-radius - 4.5}
          width="4.2"
          height="6"
          rx="1"
          fill={color}
          transform={`rotate(${i * step})`}
        />
      ))}
    </>
  );
}

export function WebIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <circle cx="32" cy="40" r="24" stroke="var(--accent-blue)" strokeWidth="2.2" />
      <line x1="8" y1="40" x2="56" y2="40" stroke="var(--accent-blue)" strokeWidth="1.4" opacity="0.45" />
      <motion.ellipse
        cx="32"
        cy="40"
        rx="24"
        ry="24"
        stroke="var(--accent-purple)"
        strokeWidth="1.6"
        fill="none"
        animate={run ? { scaleX: [1, 0.08, 1] } : { scaleX: 1 }}
        transition={run ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : STILL}
      />
      <motion.ellipse
        cx="32"
        cy="40"
        rx="24"
        ry="24"
        stroke="var(--accent-purple)"
        strokeWidth="1.6"
        fill="none"
        opacity="0.6"
        animate={run ? { scaleX: [0.08, 1, 0.08] } : { scaleX: 0.5 }}
        transition={run ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : STILL}
      />
      <motion.text
        x="60"
        y="63"
        textAnchor="middle"
        fontSize="13"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
        fill="var(--accent-green)"
        animate={run ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.8 }}
        transition={run ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : STILL}
      >
        {"</>"}
      </motion.text>
    </IconBase>
  );
}

export function MobileIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <rect x="24" y="10" width="32" height="60" rx="6" stroke="var(--accent-blue)" strokeWidth="2.2" />
      <motion.rect
        x="28"
        y="18"
        width="24"
        height="38"
        rx="2"
        fill="var(--accent-purple)"
        animate={run ? { opacity: [0.15, 0.5, 0.15] } : { opacity: 0.25 }}
        transition={run ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : STILL}
      />
      <line x1="34" y1="62" x2="46" y2="62" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <motion.circle
        cx="52"
        cy="16"
        r="6"
        fill="var(--accent-green)"
        style={{ originX: 0.5, originY: 0.5 }}
        animate={run ? { scale: [0, 1.2, 1, 1, 0] } : { scale: 0 }}
        transition={
          run
            ? { duration: 2.6, repeat: Infinity, repeatDelay: 0.4, times: [0, 0.25, 0.4, 0.8, 1], ease: "easeOut" }
            : STILL
        }
      />
    </IconBase>
  );
}

export function TrafficIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <path
        d="M50 20 L62 20 L62 32"
        stroke="var(--accent-green)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <motion.path
        d="M10 58 L28 40 L38 48 L62 20"
        stroke="var(--accent-green)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={run ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
        transition={run ? { duration: 2.8, repeat: Infinity, times: [0, 0.55, 0.85, 1], ease: "easeInOut" } : STILL}
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={18 + i * 14}
          cy="60"
          r="2.6"
          fill="var(--accent-blue)"
          animate={run ? { y: [0, -34], opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={run ? { duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" } : STILL}
        />
      ))}
    </IconBase>
  );
}

export function AutomationIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <line x1="30" y1="30" x2="50" y2="50" stroke="var(--accent-blue)" strokeWidth="1.6" opacity="0.4" />
      <motion.circle
        cx="40"
        cy="40"
        r="2.6"
        fill="var(--accent-green)"
        animate={run ? { x: [-10, 10, -10], y: [-10, 10, -10], opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={run ? { duration: 2, repeat: Infinity, ease: "linear" } : STILL}
      />
      <motion.g
        style={{ x: 26, y: 26 }}
        animate={run ? { rotate: 360 } : { rotate: 0 }}
        transition={run ? { duration: 5, repeat: Infinity, ease: "linear" } : STILL}
      >
        <GearShape color="var(--accent-blue)" radius={13} />
      </motion.g>
      <motion.g
        style={{ x: 54, y: 54 }}
        animate={run ? { rotate: -360 } : { rotate: 0 }}
        transition={run ? { duration: 3.6, repeat: Infinity, ease: "linear" } : STILL}
      >
        <GearShape color="var(--accent-purple)" radius={9} teeth={7} />
      </motion.g>
    </IconBase>
  );
}

export function AudiovisualIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <rect x="14" y="30" width="52" height="36" rx="4" stroke="var(--accent-blue)" strokeWidth="2.2" fill="none" />
      <motion.g
        style={{ originX: 0, originY: 1, x: 14, y: 30 }}
        animate={run ? { rotate: [0, -22, 0, 0] } : { rotate: 0 }}
        transition={run ? { duration: 2.8, repeat: Infinity, times: [0, 0.3, 0.55, 1], ease: "easeInOut" } : STILL}
      >
        <rect x="0" y="-14" width="52" height="14" rx="3" stroke="var(--accent-blue)" strokeWidth="2.2" fill="none" />
        <line x1="6" y1="-14" x2="12" y2="0" stroke="var(--accent-blue)" strokeWidth="2" />
        <line x1="20" y1="-14" x2="26" y2="0" stroke="var(--accent-blue)" strokeWidth="2" />
        <line x1="34" y1="-14" x2="40" y2="0" stroke="var(--accent-blue)" strokeWidth="2" />
      </motion.g>
      <motion.circle
        cx="24"
        cy="48"
        r="4"
        fill="var(--accent-red)"
        animate={run ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
        transition={run ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : STILL}
      />
      <text
        x="46"
        y="52"
        textAnchor="middle"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
        fill="var(--accent-blue)"
        opacity="0.7"
      >
        REC
      </text>
    </IconBase>
  );
}

export function SocialIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <motion.g
        animate={run ? { y: [6, -4, 6], opacity: [0.35, 1, 0.35] } : { opacity: 0.8 }}
        transition={run ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : STILL}
      >
        <rect x="14" y="18" width="30" height="20" rx="8" fill="var(--accent-blue)" opacity="0.9" />
        <path d="M20 38 L20 46 L28 38 Z" fill="var(--accent-blue)" opacity="0.9" />
      </motion.g>
      <motion.g
        animate={run ? { y: [-4, 6, -4], opacity: [1, 0.35, 1] } : { opacity: 0.5 }}
        transition={run ? { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 } : STILL}
      >
        <rect x="38" y="38" width="26" height="18" rx="8" fill="var(--accent-purple)" opacity="0.9" />
        <path d="M58 56 L58 63 L50 56 Z" fill="var(--accent-purple)" opacity="0.9" />
      </motion.g>
      <motion.path
        d="M40 66 C34 60 30 56 30 51 C30 47 33 45 36 45 C38 45 40 46 40 49 C40 46 42 45 44 45 C47 45 50 47 50 51 C50 56 46 60 40 66 Z"
        fill="var(--accent-red)"
        style={{ originX: 0.5, originY: 0.5 }}
        animate={run ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={run ? { duration: 1.6, repeat: Infinity, repeatDelay: 1, ease: "easeOut" } : STILL}
      />
    </IconBase>
  );
}

export function TikTokShopIcon({ size = 80, active = true }) {
  const reduce = useReducedMotion();
  const run = active && !reduce;
  return (
    <IconBase size={size}>
      <path
        d="M20 28 L24 16 H48 L52 28"
        stroke="var(--accent-blue)"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />
      <rect x="16" y="28" width="40" height="36" rx="5" stroke="var(--accent-blue)" strokeWidth="2.2" fill="none" />
      <motion.g
        style={{ x: 36, y: 46 }}
        animate={run ? { rotate: 360 } : { rotate: 0 }}
        transition={run ? { duration: 3.6, repeat: Infinity, ease: "linear" } : STILL}
      >
        <g transform="translate(20,0)">
          <path d="M0 -6 V6 M0 -6 Q4 -8 5 -4" stroke="var(--accent-magenta)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="-1.5" cy="6" r="3" fill="var(--accent-magenta)" />
        </g>
      </motion.g>
      <motion.g
        style={{ originX: 0.5, originY: 0.5, x: 54, y: 22 }}
        animate={run ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={run ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : STILL}
      >
        <circle r="8" fill="var(--accent-green)" />
        <path d="M-3 0 L-1 2.5 L3.5 -3" stroke="#050505" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </IconBase>
  );
}

export const ANIMATED_SERVICE_ICONS = {
  "dev-web": WebIcon,
  mobile: MobileIcon,
  trafego: TrafficIcon,
  automacao: AutomationIcon,
  audiovisual: AudiovisualIcon,
  "social-media": SocialIcon,
  "tiktok-shop": TikTokShopIcon,
};

export default ANIMATED_SERVICE_ICONS;
