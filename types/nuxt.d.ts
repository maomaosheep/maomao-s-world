import type Lenis from "lenis";
import type { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

declare module "#app" {
  interface NuxtApp {
    $gsap: typeof gsap;
    $ScrollTrigger: typeof ScrollTrigger;
    $lenis: Lenis | null;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $gsap: typeof gsap;
    $ScrollTrigger: typeof ScrollTrigger;
    $lenis: Lenis | null;
  }
}

export {};
