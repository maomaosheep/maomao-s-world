<template>
  <section
    class="section-frame"
    :class="[`section-frame--${layout}`, { 'section-frame--media': Boolean(image) }]"
    :id="id"
    :aria-labelledby="titleId"
    :data-section="id"
    :data-layout="layout"
  >
    <header class="section-frame__header" data-motion-target="section-header">
      <p class="section-frame__eyebrow">
        <span>{{ eyebrow }}</span>
        <span>{{ kicker }}</span>
      </p>
      <h2 :id="titleId" data-motion-target="section-title">{{ title }}</h2>
      <p v-if="description" class="section-frame__description" data-motion-target="section-description">
        {{ description }}
      </p>
    </header>

    <div class="section-frame__body" data-motion-target="section-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string;
    kicker: string;
    eyebrow: string;
    title: string;
    description?: string;
    layout?: "immersive" | "floating" | "overlap" | "broken" | "timeline" | "sticky" | "closing";
    image?: {
      src: string;
      alt: string;
    };
  }>(),
  {
    description: "",
    layout: "overlap",
    image: undefined
  }
);

const titleId = `${props.id}-title`;
</script>

<style scoped>
.section-frame {
  position: relative;
  display: grid;
  min-height: 96svh;
  overflow: clip;
  padding: clamp(76px, 12vw, 152px) var(--space-page-x);
  border-top: 1px solid rgba(191, 216, 255, 0.12);
  color: #e8eef5;
  isolation: isolate;
}

.section-frame::before {
  position: absolute;
  inset: 0;
  z-index: -2;
  content: "";
  background: transparent;
}

.section-frame::after {
  position: absolute;
  top: 0;
  right: var(--space-page-x);
  left: var(--space-page-x);
  z-index: -1;
  height: 1px;
  content: "";
  background: linear-gradient(90deg, transparent, rgba(191, 216, 255, 0.28), transparent);
}

.section-frame__header {
  max-width: 760px;
}

.section-frame__eyebrow {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0 0 18px;
  color: #bfd8ff;
  font-size: 0.78rem;
}

.section-frame__eyebrow span:first-child {
  color: #c9d5e3;
}

.section-frame__eyebrow span + span::before {
  padding-right: 10px;
  color: rgba(201, 213, 227, 0.38);
  content: "/";
}

.section-frame h2 {
  max-width: 860px;
  margin: 0;
  color: #e8eef5;
  font-size: clamp(2.35rem, 7vw, 7rem);
  font-weight: 560;
  line-height: 0.96;
  letter-spacing: 0;
}

.section-frame__description {
  max-width: 640px;
  margin: 24px 0 0;
  color: rgba(159, 175, 194, 0.9);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.8;
}

.section-frame__body {
  min-width: 0;
}

.section-frame--immersive {
  min-height: 112svh;
  align-content: end;
  gap: clamp(36px, 7vw, 92px);
}

.section-frame--immersive .section-frame__header {
  margin-top: auto;
}

.section-frame--floating {
  min-height: 108svh;
  grid-template-columns: minmax(0, 0.88fr) minmax(320px, 0.72fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
}

.section-frame--floating .section-frame__header {
  position: relative;
  z-index: 2;
  padding: clamp(26px, 4vw, 46px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
}

.section-frame--floating .section-frame__body {
  align-self: end;
}

.section-frame--overlap {
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(28px, 6vw, 96px);
  align-items: center;
}

.section-frame--overlap .section-frame__body {
  margin-top: clamp(90px, 14vw, 180px);
}

.section-frame--broken {
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
  align-items: start;
}

.section-frame--broken .section-frame__header {
  grid-column: 1 / 8;
}

.section-frame--broken .section-frame__body {
  grid-column: 5 / 13;
  margin-top: clamp(72px, 12vw, 140px);
}

.section-frame--timeline {
  grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(32px, 7vw, 108px);
}

.section-frame--timeline .section-frame__header {
  position: sticky;
  top: 84px;
  align-self: start;
}

.section-frame--sticky {
  grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(30px, 7vw, 104px);
  align-items: start;
}

.section-frame--sticky .section-frame__header {
  position: sticky;
  top: 76px;
}

.section-frame--closing {
  min-height: 78svh;
  align-content: end;
}

@media (max-width: 900px) {
  .section-frame,
  .section-frame--floating,
  .section-frame--overlap,
  .section-frame--timeline,
  .section-frame--sticky {
    display: block;
    min-height: auto;
  }

  .section-frame--broken {
    display: block;
  }

  .section-frame__header,
  .section-frame--timeline .section-frame__header,
  .section-frame--sticky .section-frame__header {
    position: relative;
    top: auto;
  }

  .section-frame__body,
  .section-frame--overlap .section-frame__body,
  .section-frame--broken .section-frame__body {
    margin-top: 34px;
  }

  .section-frame--floating .section-frame__header {
    padding: 24px;
  }
}
</style>
