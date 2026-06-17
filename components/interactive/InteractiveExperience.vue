<template>
  <div class="interactive-experience" data-interactive-experience>
    <FogGlassCanvas />
    <LoadingVeil />
    <PageTransitionVeil />
    <ScrollStorytelling />
    <CinematicCursor />
  </div>
</template>

<script setup lang="ts">
import CinematicCursor from "./CinematicCursor.vue";
import FogGlassCanvas from "./FogGlassCanvas.vue";
import LoadingVeil from "./LoadingVeil.vue";
import PageTransitionVeil from "./PageTransitionVeil.vue";
import ScrollStorytelling from "./ScrollStorytelling.vue";
</script>

<style scoped>
.interactive-experience {
  position: relative;
  z-index: var(--z-base);
}
</style>
