<template>
  <div ref="root" class="page-transition-veil" aria-hidden="true" data-interactive="page-transition" />
</template>

<script setup lang="ts">
import { useGSAP } from "../../composables/useGSAP";

const root = ref<HTMLElement | null>(null);

useGSAP(root, ({ gsap, reduceMotion }) => {
  if (!root.value || reduceMotion) {
    return;
  }

  gsap.set(root.value, { yPercent: 100, autoAlpha: 0 });

  const router = useRouter();
  let timeline: ReturnType<typeof gsap.timeline> | undefined;
  const reveal = () => {
    timeline?.kill();
    timeline = gsap
      .timeline()
      .set(root.value, { autoAlpha: 1, yPercent: 100 })
      .to(root.value, { yPercent: 0, duration: 0.42, ease: "power3.inOut" })
      .to(root.value, { yPercent: -100, duration: 0.62, ease: "power3.inOut" });
  };

  const removeHook = router.afterEach(reveal);

  return () => {
    timeline?.kill();
    timeline = undefined;
    removeHook();
  };
});
</script>

<style scoped>
.page-transition-veil {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background:
    linear-gradient(180deg, rgba(8, 17, 31, 0.96), rgba(5, 9, 16, 0.98)),
    radial-gradient(circle at 50% 0%, rgba(110, 143, 184, 0.18), transparent 28rem);
  pointer-events: none;
}
</style>
