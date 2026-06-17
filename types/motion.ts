export type MotionDefaults = {
  duration: number;
  ease: string;
  fastDuration: number;
  slowDuration: number;
  scrub: number;
};

export type MotionMediaQueries = {
  reduceMotion: string;
  isMobile: string;
  isTablet: string;
  isDesktop: string;
};

export type TimedMotion = {
  duration: number;
  ease: string;
};

export type ParallaxMotion = {
  scrub: number;
  ease: "none";
};

export type BlurTransitionMotion = TimedMotion & {
  fromBlur: number;
  toBlur: number;
};

export type CinematicMotionPresets = {
  maskReveal: TimedMotion;
  parallax: ParallaxMotion;
  blurTransition: BlurTransitionMotion;
  clipPathReveal: TimedMotion;
  fogRecondense: TimedMotion;
};

export type GSAPContextCleanup = () => void;
