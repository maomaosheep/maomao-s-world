import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../utils/preferReducedMotion";

let lenisInstance: Lenis | null = null;
let tickerAttached = false;

export default defineNuxtPlugin<{ lenis: Lenis | null }>((nuxtApp) => {
  if (prefersReducedMotion()) {
    return {
      provide: {
        lenis: null
      }
    };
  }

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2
    });
  }

  if (!tickerAttached) {
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      lenisInstance?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    tickerAttached = true;
  }

  nuxtApp.hook("page:finish", () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  return {
    provide: {
      lenis: lenisInstance
    }
  };
});
