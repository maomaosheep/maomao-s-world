<template>
  <div class="page-experience">
    <InteractiveExperience />

    <main class="page-experience__content" data-page-root>
      <section class="app-shell" data-section="opening">
        <div class="intro-frame">
          <p class="intro-kicker">个人数字世界 / Personal Digital World</p>
          <h1>雾气落在车窗上，故事从手指擦过的地方开始。</h1>
          <p class="intro-copy">
            这里暂时记录林屿森的影像、旅行、音乐、食物和生活轨迹。你像坐在森林边的车里，隔着一层雨雾慢慢看见窗外。
          </p>
        </div>
      </section>

      <SectionsExperience />
    </main>
  </div>
</template>

<script setup lang="ts">
import InteractiveExperience from "../../components/interactive/InteractiveExperience.vue";
import SectionsExperience from "../../components/sections/SectionsExperience.vue";
</script>

<style scoped>
.page-experience {
  position: relative;
  min-height: 100svh;
}

.page-experience__content {
  position: relative;
  z-index: var(--z-content);
}
</style>
