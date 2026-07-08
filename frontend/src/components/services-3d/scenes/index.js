import SceneDevWeb from "./SceneDevWeb";
import SceneMobile from "./SceneMobile";
import SceneTrafego from "./SceneTrafego";
import SceneAutomacao from "./SceneAutomacao";
import SceneAudiovisual from "./SceneAudiovisual";
import SceneSocialMedia from "./SceneSocialMedia";
import SceneTiktokShop from "./SceneTiktokShop";

// Procedural stand-in for each service's real video, keyed by SERVICES[i].id
// — never by array index. Swap a service to real footage by flipping its
// `hasVideo` flag in data.js; this map stays as the fallback for whichever
// services haven't gotten their video yet.
export const SERVICE_SCENES = {
  "dev-web": SceneDevWeb,
  mobile: SceneMobile,
  trafego: SceneTrafego,
  automacao: SceneAutomacao,
  audiovisual: SceneAudiovisual,
  "social-media": SceneSocialMedia,
  "tiktok-shop": SceneTiktokShop,
};

export default SERVICE_SCENES;
