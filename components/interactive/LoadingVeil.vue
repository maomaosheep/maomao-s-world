<template>
  <div ref="root" class="loading-veil" aria-hidden="true" data-interactive="loading">
    <div class="loading-veil__signature">
      <p class="loading-veil__title">毛毛的世界</p>
      <div class="loading-veil__line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGSAP } from "../../composables/useGSAP";

const root = ref<HTMLElement | null>(null);
const setIntroReady = (ready: boolean) => {
  document.documentElement.dataset.introReady = ready ? "true" : "false";
};

useGSAP(root, ({ gsap, reduceMotion }) => {
  if (!root.value) {
    return;
  }

  setIntroReady(false);

  if (reduceMotion) {
    gsap.set(root.value, { autoAlpha: 0 });
    setIntroReady(true);
    return;
  }

  const line = root.value.querySelector(".loading-veil__line");
  const title = root.value.querySelector(".loading-veil__title");
  const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  timeline
    .fromTo(
      title,
      { autoAlpha: 0, y: 18, filter: "blur(12px)", letterSpacing: "0.28em" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.06em", duration: 0.78, ease: "power2.out" }
    )
    .fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.82 })
    .to(root.value, { yPercent: -100, duration: 1.05 }, "-=0.08")
    .add(() => setIntroReady(true), "-=0.04")
    .set(root.value, { autoAlpha: 0 });

  return () => {
    timeline.kill();
    setIntroReady(true);
  };
});
</script>

<style scoped>
.loading-veil {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-system) + 1);
  display: grid;
  place-items: center;
  padding: clamp(28px, 5vw, 56px);
  background:
    radial-gradient(circle at 50% 18%, rgba(110, 143, 184, 0.16), transparent 28rem),
    var(--color-night-950);
  pointer-events: none;
}

.loading-veil__signature {
  display: grid;
  gap: 16px;
  justify-items: start;
  width: min(340px, 42vw);
  transform: translateX(clamp(140px, 16vw, 260px));
}

.loading-veil__title {
  margin: 0;
  color: #c9d5e3;
  font-size: clamp(1.2rem, 1.65vw, 1.58rem);
  font-weight: 520;
  line-height: 1.2;
  letter-spacing: 0.06em;
}

.loading-veil__line {
  width: min(280px, 40vw);
  height: 1px;
  background: rgba(232, 238, 248, 0.72);
  transform: scaleX(0);
}

@media (max-width: 900px) {
  .loading-veil__signature {
    width: min(280px, 68vw);
    transform: translateX(0);
  }
}
</style>
