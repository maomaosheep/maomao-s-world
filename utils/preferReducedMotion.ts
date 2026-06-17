import { isClient } from "./isClient";

export const prefersReducedMotion = () =>
  isClient() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
