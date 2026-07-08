import { Suspense, useMemo, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import ServiceStage from "./ServiceStage";
import ServiceRail from "./ServiceRail";
import ServiceSceneStage from "./ServiceSceneStage";
import { useServiceVideos } from "./useServiceVideos";

const PARTICLE_COUNT = 220;
const CAMERA_BASE_Z = 4.2;
const CAMERA_DOLLY_RANGE = 0.6; // how far the camera pushes in across the whole scroll
const CAMERA_DRIFT = 0.15; // subtle side-to-side parallax
const SEGMENT_VH = 70; // scroll distance "spent" per service, mirrors the Fase 1 rail pacing
const PIN_HEIGHT_VH = (services) => services.length * SEGMENT_VH;

// Slow-drifting dust motes tinted with the signature gradient — depth cue,
// not a focal point. Rotation is mutated directly in useFrame (no state).
function AmbientParticles() {
  const pointsRef = useRef(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      new THREE.Color("#3b82f6"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#ec4899"),
    ];
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = Math.random() * 4 - 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Gentle dolly + side parallax tied to scroll — reinforces depth without
// being disorienting. Mutates the camera directly; no React state involved.
function CameraRig({ scrollYProgress }) {
  useFrame((state) => {
    const offset = scrollYProgress.get();
    const { camera } = state;
    camera.position.z = CAMERA_BASE_Z - offset * CAMERA_DOLLY_RANGE;
    camera.position.x = Math.sin(offset * Math.PI * 2) * CAMERA_DRIFT;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Imperatively paints the rail's progress fill every frame (bypassing React
// entirely for that high-frequency value) — the discrete active-service
// index is lifted separately, via useMotionValueEvent in the parent, since
// that only needs to update a handful of times across the whole scroll.
function ProgressBarPainter({ scrollYProgress, progressBarRef }) {
  useFrame(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleY(${scrollYProgress.get()})`;
    }
  });
  return null;
}

export default function ServicesWebGLScroll() {
  const services = useServiceVideos();
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressBarRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(services.length - 1, Math.max(0, Math.floor(latest * services.length)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${PIN_HEIGHT_VH(services)}vh` }}
      data-testid="services-webgl-panel"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container-x w-full">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center h-[78vh] min-h-[560px]">
            <div className="relative h-full rounded-3xl overflow-hidden border border-white/[0.06]">
              <Canvas
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true }}
                resize={{ scroll: false, debounce: 200 }}
                camera={{ position: [0, 0.3, CAMERA_BASE_Z], fov: 42 }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.45} />
                  <directionalLight position={[3, 4, 2]} intensity={0.9} />
                  <AmbientParticles />

                  <CameraRig scrollYProgress={scrollYProgress} />
                  <ProgressBarPainter scrollYProgress={scrollYProgress} progressBarRef={progressBarRef} />
                  <ServiceStage />

                  <EffectComposer multisampling={0}>
                    <Bloom intensity={0.35} luminanceThreshold={0.4} luminanceSmoothing={0.3} mipmapBlur />
                    <ChromaticAberration offset={[0.0006, 0.0006]} radialModulation={false} modulationOffset={0} />
                    <Vignette eskil={false} offset={0.25} darkness={0.6} />
                  </EffectComposer>
                </Suspense>
              </Canvas>

              <ServiceSceneStage services={services} activeIndex={activeIndex} />
            </div>

            <ServiceRail services={services} activeIndex={activeIndex} progressBarRef={progressBarRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
