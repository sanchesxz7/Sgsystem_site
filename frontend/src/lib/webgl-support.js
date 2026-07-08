// Best-effort feature check: tries to acquire a WebGL2 context on a detached
// canvas. Never throws — any failure (old browser, disabled GPU, blocked by
// extension) is treated as "not supported" so callers can fall back safely.
export function checkWebGL2Support() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    return !!gl;
  } catch {
    return false;
  }
}

export default checkWebGL2Support;
