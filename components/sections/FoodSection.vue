<template>
  <SectionFrame
    id="food"
    eyebrow="味觉记忆"
    kicker="Food"
    title="食物是另一种地点，保存着当天的光线。"
    description="这些食物记忆是完整占位资料：早餐、夜宵、家常菜和旅途中偶然遇见的小店。结构可直接替换为真实清单。"
    layout="sticky"
    :image="images.background"
  >
    <div class="food-scroll" data-motion-target="food-scroll">
      <article v-for="item in foodNotes" :key="item.name" class="food-scroll__item" data-motion-target="food-card">
        <span>{{ item.time }}</span>
        <h3>{{ item.name }}</h3>
        <p>{{ item.memory }}</p>
      </article>
    </div>
  </SectionFrame>
</template>

<script setup lang="ts">
import SectionFrame from "./SectionFrame.vue";

const images = {
  background: {
    src: new URL("../../Photos/rainy-city-night.jpg", import.meta.url).href,
    alt: "雨夜城市街景作为味觉记忆背景"
  }
};

const foodNotes = [
  {
    time: "07:20 / 清晨",
    name: "桂花豆浆和热饭团",
    memory: "杭州的早晨还没完全亮，早餐店玻璃上有雾。他喜欢站在门口吃第一口，像给一天调一个低饱和的开场。"
  },
  {
    time: "13:40 / 午后",
    name: "青柠鸡汤米线",
    memory: "在昆明短暂停留时记住的味道。酸味很轻，汤很热，适合从一个陌生街区慢慢走回住处。"
  },
  {
    time: "22:15 / 夜里",
    name: "便利店关东煮",
    memory: "加班后的雨夜，他常买一杯热汤。灯光落在塑料盖上，像一张没有拍下来的照片。"
  },
  {
    time: "冬天 / 家里",
    name: "番茄牛腩",
    memory: "家里会反复出现的菜。不是为了特别，而是因为它让很多不稳定的日子重新变得可被安放。"
  }
];
</script>

<style scoped>
.food-scroll {
  display: grid;
  gap: 18px;
}

.food-scroll__item {
  min-height: 42svh;
  padding: clamp(24px, 5vw, 54px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
}

.food-scroll__item:nth-child(2),
.food-scroll__item:nth-child(4) {
  margin-left: clamp(0px, 8vw, 96px);
}

.food-scroll span {
  color: #bfd8ff;
  font-size: 0.8rem;
}

.food-scroll h3 {
  max-width: 620px;
  margin: 18px 0 0;
  color: #e8eef5;
  font-size: clamp(1.7rem, 4vw, 3.8rem);
  font-weight: 560;
  line-height: 1.02;
}

.food-scroll p {
  max-width: 620px;
  margin: 24px 0 0;
  color: rgba(159, 175, 194, 0.92);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.85;
}

@media (max-width: 760px) {
  .food-scroll__item {
    min-height: auto;
  }

  .food-scroll__item:nth-child(2),
  .food-scroll__item:nth-child(4) {
    margin-left: 0;
  }
}
</style>
