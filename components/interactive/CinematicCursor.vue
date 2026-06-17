<template>
  <div ref="root" class="cinematic-cursor" aria-hidden="true" data-interactive="cursor">
    <div ref="cursor" class="cinematic-cursor__mark" />
    <span
      v-for="burst in bursts"
      :key="burst.id"
      class="cinematic-cursor__burst"
      :style="{ left: `${burst.x}px`, top: `${burst.y}px` }"
    >
      {{ burst.symbol }}
    </span>
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null);
const cursor = ref<HTMLElement | null>(null);
const bursts = ref<{ id: number; x: number; y: number; symbol: string }[]>([]);
const symbols = ["❤️", "✨", "⭐", "🌸", "🍀", "🐰", "🫧", "🩵"];

let burstId = 0;
let reduceMotion = false;
let cleanupTimers: number[] = [];

const moveCursor = (event: PointerEvent) => {
  if (!cursor.value || reduceMotion || event.pointerType === "touch") {
    return;
  }

  cursor.value.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
};

const addBurst = (event: PointerEvent) => {
  if (reduceMotion || event.pointerType === "touch") {
    return;
  }

  const id = burstId;
  burstId += 1;
  bursts.value.push({
    id,
    x: event.clientX,
    y: event.clientY,
    symbol: symbols[Math.floor(Math.random() * symbols.length)] ?? "✨"
  });

  cleanupTimers.push(
    window.setTimeout(() => {
      bursts.value = bursts.value.filter((burst) => burst.id !== id);
    }, 1050)
  );
};

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerdown", addBurst, { passive: true });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", moveCursor);
  window.removeEventListener("pointerdown", addBurst);
  cleanupTimers.forEach((timer) => window.clearTimeout(timer));
  cleanupTimers = [];
});
</script>

<style scoped>
.cinematic-cursor {
  position: fixed;
  inset: 0;
  z-index: var(--z-system);
  pointer-events: none;
}

.cinematic-cursor__mark {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 0;
  height: 0;
  border-top: 10px solid rgba(232, 238, 248, 0.92);
  border-right: 7px solid transparent;
  transform: translate3d(-20px, -20px, 0);
  transition: transform 90ms linear;
  will-change: transform;
}

.cinematic-cursor__burst {
  position: absolute;
  translate: -50% -50%;
  font-size: 26px;
  line-height: 1;
  animation: cursor-burst 1.05s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: transform, opacity;
}

@keyframes cursor-burst {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.68) rotate(0deg);
  }

  16% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate3d(14px, -54px, 0) scale(1.14) rotate(16deg);
  }
}

@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .cinematic-cursor {
    display: none;
  }
}
</style>
