import type { Ref } from "vue";
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GSAPContextCleanup } from "../types/motion";
import { motionMedia } from "../motion/motion";

type UseGSAPSetup = (tools: {
  gsap: typeof GSAP;
  ScrollTrigger: typeof ScrollTrigger;
  reduceMotion: boolean;
}) => void | GSAPContextCleanup;

export const useGSAP = (scope: Ref<HTMLElement | null>, setup: UseGSAPSetup) => {
  let mm: ReturnType<typeof GSAP.matchMedia> | undefined;

  onMounted(() => {
    const nuxtApp = useNuxtApp();
    const element = scope.value;

    if (!element) {
      return;
    }

    mm = nuxtApp.$gsap.matchMedia();
    mm.add(
      {
        reduceMotion: motionMedia.reduceMotion,
        isMobile: motionMedia.isMobile,
        isTablet: motionMedia.isTablet,
        isDesktop: motionMedia.isDesktop
      },
      (context: gsap.Context) => {
        const reduceMotion = Boolean(context.conditions?.reduceMotion);
        const cleanup = setup({
          gsap: nuxtApp.$gsap,
          ScrollTrigger: nuxtApp.$ScrollTrigger,
          reduceMotion
        });
        let cleaned = false;

        // matchMedia owns the GSAP context for this media branch and reverts
        // animations/ScrollTriggers automatically when this cleanup runs.
        return () => {
          if (cleaned) {
            return;
          }

          cleanup?.();
          cleaned = true;
        };
      },
      element
    );
  });

  onBeforeUnmount(() => {
    mm?.revert();
    mm = undefined;
  });
};
