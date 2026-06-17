<template>
  <div class="sections-experience" data-sections-experience>
    <AboutSection />
    <LifeJourneySection />
    <GallerySection />
    <TravelSection />
    <MusicSection />
    <FoodSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import AboutSection from "./AboutSection.vue";
import FoodSection from "./FoodSection.vue";
import FooterSection from "./FooterSection.vue";
import GallerySection from "./GallerySection.vue";
import LifeJourneySection from "./LifeJourneySection.vue";
import MusicSection from "./MusicSection.vue";
import TravelSection from "./TravelSection.vue";
</script>

<style scoped>
.sections-experience {
  position: relative;
  width: 100%;
}
</style>
