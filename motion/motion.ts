import type { CinematicMotionPresets, MotionDefaults, MotionMediaQueries } from "../types/motion";

export const motionDefaults: MotionDefaults = {
  duration: 0.9,
  ease: "power3.out",
  fastDuration: 0.32,
  slowDuration: 1.4,
  scrub: 0.8
};

export const motionMedia: MotionMediaQueries = {
  reduceMotion: "(prefers-reduced-motion: reduce)",
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px) and (max-width: 1199px)",
  isDesktop: "(min-width: 1200px)"
};

export const scrollTriggerDefaults = {
  ignoreMobileResize: true
} as const;

export const cinematicMotion: CinematicMotionPresets = {
  maskReveal: {
    duration: 1.15,
    ease: "power3.out"
  },
  parallax: {
    scrub: 0.9,
    ease: "none"
  },
  blurTransition: {
    duration: 1.4,
    ease: "sine.inOut",
    fromBlur: 18,
    toBlur: 0
  },
  clipPathReveal: {
    duration: 1.1,
    ease: "power2.inOut"
  },
  fogRecondense: {
    duration: 4.2,
    ease: "sine.inOut"
  }
};
