import { prefersReducedMotion } from "~/utils/preferReducedMotion";

export const useReducedMotion = () => {
  const reducedMotion = useState("reduced-motion", () => false);

  if (import.meta.client) {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.value = query.matches;

    const update = () => {
      reducedMotion.value = query.matches;
    };

    onMounted(() => query.addEventListener("change", update));
    onBeforeUnmount(() => query.removeEventListener("change", update));
  } else {
    reducedMotion.value = prefersReducedMotion();
  }

  return readonly(reducedMotion);
};
