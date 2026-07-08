import { motion } from "framer-motion";

/**
 * SgsLogo — uses the processed transparent hexagon PNG.
 * Variants:
 *  - "icon": small (header), no animation by default
 *  - "hero": large with continuous 3D rotation + glow
 */
export default function SgsLogo({
  size = 44,
  variant = "icon",
  className = "",
}) {
  if (variant === "hero") {
    return (
      <div
        className={`relative inline-block ${className}`}
        style={{ perspective: 1200 }}
        data-testid="sgs-logo-hero"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.45), rgba(59,130,246,0.25) 40%, transparent 70%)",
            animation: "gradient-shift 6s ease-in-out infinite",
          }}
        />
        <motion.img
          src="/assets/logo.webp"
          alt="Sanches Group System"
          width={size}
          height={size}
          style={{ width: size, height: size, transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          draggable={false}
        />
      </div>
    );
  }
  return (
    <img
      src="/assets/logo.webp"
      alt="Sanches Group System"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
      draggable={false}
      data-testid="sgs-logo"
    />
  );
}
