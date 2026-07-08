import { useMemo } from "react";
import { SERVICES, videoSources } from "./data";

// Thin memoized accessor shared by the 3D showcase and the fallback grid.
// Actual loading stays declarative (`preload="metadata"`, `poster=...`) —
// no eager JS preloading here, that would defeat the point of lazy playback.
export function useServiceVideos() {
  return useMemo(
    () => SERVICES.map((service) => ({ ...service, sources: videoSources(service) })),
    [],
  );
}

export default useServiceVideos;
