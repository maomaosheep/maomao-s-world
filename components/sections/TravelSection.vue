<template>
  <SectionFrame
    id="travel"
    eyebrow="旅行记录"
    kicker="Travel"
    title="路不是目的地，它是情绪移动的方式。"
    description="这些旅行条目是可替换占位资料：城市、山路、湖面和一段没有目的的夜车。布局采用图片与文字穿插，让内容像镜头一样相互遮挡。"
    layout="overlap"
    :image="images.background"
  >
    <div class="travel-overlap" data-motion-target="travel-overlap">
      <article v-for="place in places" :key="place.name" class="travel-overlap__card" data-motion-target="travel-card">
        <img :src="place.image" :alt="place.alt" loading="lazy" decoding="async" />
        <div>
          <span>{{ place.type }}</span>
          <h3>{{ place.name }}</h3>
          <p>{{ place.story }}</p>
        </div>
      </article>
    </div>
  </SectionFrame>
</template>

<script setup lang="ts">
import SectionFrame from "./SectionFrame.vue";

const images = {
  background: {
    src: new URL("../../Photos/mysterious-forest-road.jpg", import.meta.url).href,
    alt: "雾气森林公路"
  }
};

const places = [
  {
    type: "城市 / City",
    name: "上海，凌晨两点的延安高架",
    story: "他在雨后的车窗里看见城市被拉成长线，霓虹被刻意压低，只剩蓝灰色的反光。",
    image: new URL("../../Photos/rainy-city-night.jpg", import.meta.url).href,
    alt: "雨夜城市街道"
  },
  {
    type: "山路 / Road",
    name: "临安，雾从杉树之间升起",
    story: "那天没有目的地，只有一条湿润的山路。车灯照出去，像电影里进入下一章之前的黑场。",
    image: new URL("../../Photos/foggy-forest-road.jpg", import.meta.url).href,
    alt: "雾中森林公路"
  },
  {
    type: "远方 / Distance",
    name: "川西，蓝色山脉像未寄出的信",
    story: "他记得风很冷，山很远。照片后来被放进这里，作为未来真实旅行记录的替身。",
    image: new URL("../../Photos/misty-blue-mountains.jpg", import.meta.url).href,
    alt: "蓝色雾中山脉"
  }
];
</script>

<style scoped>
.travel-overlap {
  display: grid;
  gap: clamp(28px, 7vw, 84px);
}

.travel-overlap__card {
  display: grid;
  grid-template-columns: minmax(220px, 0.78fr) minmax(0, 1fr);
  align-items: end;
  margin: 0;
}

.travel-overlap__card:nth-child(even) {
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.78fr);
}

.travel-overlap__card:nth-child(even) img {
  grid-column: 2;
}

.travel-overlap__card:nth-child(even) div {
  grid-column: 1;
  grid-row: 1;
  margin-right: -12%;
  margin-left: 0;
}

.travel-overlap img {
  width: 100%;
  min-height: 360px;
  object-fit: cover;
  border-radius: var(--radius-glass);
  filter: saturate(0.66) brightness(0.74);
}

.travel-overlap__card div {
  position: relative;
  z-index: 1;
  margin-left: -12%;
  padding: clamp(22px, 4vw, 42px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
}

.travel-overlap span {
  color: #bfd8ff;
  font-size: 0.78rem;
}

.travel-overlap h3 {
  margin: 14px 0 0;
  color: #e8eef5;
  font-size: clamp(1.45rem, 3vw, 2.6rem);
  font-weight: 560;
  line-height: 1.12;
}

.travel-overlap p {
  margin: 18px 0 0;
  color: rgba(159, 175, 194, 0.92);
  line-height: 1.78;
}

@media (max-width: 760px) {
  .travel-overlap__card,
  .travel-overlap__card:nth-child(even) {
    display: block;
  }

  .travel-overlap__card div,
  .travel-overlap__card:nth-child(even) div {
    margin: -42px 14px 0;
  }
}
</style>
