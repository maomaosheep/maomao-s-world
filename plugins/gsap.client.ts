import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { motionDefaults, scrollTriggerDefaults } from "../motion/motion";

let pluginsRegistered = false;

const registerClubPlugins = async () => {
  const optionalPlugins = await Promise.allSettled([import("gsap/DrawSVGPlugin"), import("gsap/SplitText")]);

  optionalPlugins.forEach((pluginModule) => {
    if (pluginModule.status !== "fulfilled") {
      return;
    }

    const moduleValue = pluginModule.value as Record<string, gsap.Plugin | undefined>;
    const plugin = moduleValue.DrawSVGPlugin ?? moduleValue.SplitText;

    if (plugin) {
      gsap.registerPlugin(plugin);
    }
  });
};

export default defineNuxtPlugin(async () => {
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin);
    await registerClubPlugins();
    pluginsRegistered = true;
  }

  gsap.defaults({
    duration: motionDefaults.duration,
    ease: motionDefaults.ease,
    overwrite: "auto"
  });

  ScrollTrigger.config(scrollTriggerDefaults);

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  };
});
