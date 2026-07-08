import { Suspense, lazy, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "../hooks/use-media-query";
import { checkWebGL2Support } from "../lib/webgl-support";
import ServicesFallbackGrid from "./services-3d/ServicesFallbackGrid";
import WebGLErrorBoundary from "./services-3d/WebGLErrorBoundary";
import { staggerContainer, fadeInUp, viewportOnce } from "../lib/animations";

// `three`/`@react-three/*` (~600KB+ gzip) must never reach a bundle that
// won't render it — lazy-loaded, and only imported at all once `activate3D`
// is already known to be true (see the gate below).
const ServicesWebGLScroll = lazy(() => import("./services-3d/ServicesWebGLScroll"));

export default function Services() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReducedMotion = useReducedMotion();
  const supportsWebGL2 = useMemo(() => checkWebGL2Support(), []);

  const activate3D = isDesktop && hasFinePointer && !prefersReducedMotion && supportsWebGL2;

  return (
    <section id="servicos" className="section relative" data-testid="section-services">
      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-blue" /> O que entregamos
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            Soluções completas para{" "}
            <span className="text-gradient-static">seu negócio</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-slate-300 text-lg max-w-2xl">
            Da estratégia ao código, da campanha ao conteúdo. Um time único
            executando todos os pilares do crescimento digital.
          </motion.p>
        </motion.div>
      </div>

      {activate3D ? (
        <WebGLErrorBoundary
          fallback={
            <div className="container-x">
              <ServicesFallbackGrid />
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="container-x">
                <ServicesFallbackGrid />
              </div>
            }
          >
            <ServicesWebGLScroll />
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        <div className="container-x">
          <ServicesFallbackGrid />
        </div>
      )}
    </section>
  );
}
