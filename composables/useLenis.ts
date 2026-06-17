import type Lenis from "lenis";

type LenisScrollOptions = Parameters<Lenis["scrollTo"]>[1];

export const useLenis = () => {
  const nuxtApp = useNuxtApp();

  return {
    lenis: nuxtApp.$lenis,
    scrollTo: (target: string | number | HTMLElement, options?: LenisScrollOptions) => nuxtApp.$lenis?.scrollTo(target, options),
    stop: () => nuxtApp.$lenis?.stop(),
    start: () => nuxtApp.$lenis?.start()
  };
};
