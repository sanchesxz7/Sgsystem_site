import { AnimatePresence, motion } from "framer-motion";
import { SERVICE_SCENES } from "./scenes";

// Plain HTML/SVG layer over the Canvas — the Canvas itself only renders the
// ambient backdrop (particles + reflective floor + camera drift). Keeping
// the actual per-service content out of WebGL means:
//  - it re-renders in the same React commit as ServiceRail's text/rail
//    (both driven by the same `activeIndex` prop from the same parent),
//    which is what fixes the stage/text/rail desync bug — there is no
//    second, R3F-useFrame-driven crossfade calculation to drift out of sync;
//  - swapping a service to a real video later is a one-line change here
//    (`service.hasVideo`), no WebGL plane/texture work required.
export default function ServiceSceneStage({ services, activeIndex }) {
  const service = services[activeIndex];
  const Scene = SERVICE_SCENES[service.id];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none"
      data-testid="service-scene-stage"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ aspectRatio: "16 / 9" }}
      >
        {/*
          No `mode="wait"`: it strictly serializes exit→enter per key, and
          scrolling fast fires more activeIndex changes than that queue can
          drain, so it visibly lags behind the real active service (see
          ServiceRail for the full writeup of this bug). Concurrent mode
          keeps whatever's on screen matched to the latest activeIndex.
        */}
        <AnimatePresence initial={false}>
          <motion.div
            key={service.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.hasVideo ? (
              <video
                muted
                loop
                autoPlay
                playsInline
                poster={service.sources.poster}
                className="w-full h-full object-cover"
              >
                <source src={service.sources.webm} type="video/webm" />
                <source src={service.sources.mp4} type="video/mp4" />
              </video>
            ) : Scene ? (
              <Scene active />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
