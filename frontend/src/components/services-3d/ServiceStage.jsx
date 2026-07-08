import { MeshReflectorMaterial } from "@react-three/drei";

// Ambient 3D backdrop only — a subtle reflective floor beneath the HTML
// scene overlay (see ServiceSceneStage). Per-service content used to live
// here as WebGL video planes; that's gone (see Fase 1D notes), so this
// component no longer needs `services`/`activeIndex` at all.
export default function ServiceStage() {
  return (
    <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[9, 9]} />
      <MeshReflectorMaterial
        blur={[400, 150]}
        resolution={512}
        mixBlur={1}
        mixStrength={1.5}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#0a0e1a"
        metalness={0.4}
        mirror={0.15}
      />
    </mesh>
  );
}
