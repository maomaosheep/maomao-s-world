<template>
  <SectionFrame
    id="gallery"
    eyebrow="影像档案"
    kicker="Gallery"
    title="照片不解释，它只把那天的湿度留下。"
    description="这里是林屿森的影像占位档案：雾、树影、城市夜色和空路。每张图片都已放入 Photos，后续可以替换成真实作品。"
    layout="floating"
    :image="images.background"
  >
    <div class="gallery-float" data-motion-target="gallery-float">
      <figure v-for="photo in photos" :key="photo.title" class="gallery-float__item" data-motion-target="gallery-card">
        <img :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
        <figcaption>
          <span>{{ photo.index }}</span>
          <strong>{{ photo.title }}</strong>
          <p>{{ photo.caption }}</p>
        </figcaption>
      </figure>
    </div>
  </SectionFrame>
</template>

<script setup lang="ts">
import SectionFrame from "./SectionFrame.vue";

const images = {
  background: {
    src: new URL("../../Photos/foggy-forest-road.jpg", import.meta.url).href,
    alt: "雾中森林公路背景"
  }
};

const photos = [
  {
    index: "01",
    title: "雨后的树线",
    caption: "拍摄设定：凌晨六点，车停在森林入口，镜头只保留低亮度蓝灰色。",
    src: new URL("../../Photos/foggy-forest-trees.jpg", import.meta.url).href,
    alt: "雾中森林树线"
  },
  {
    index: "02",
    title: "远山没有声音",
    caption: "拍摄设定：山脊被云层压低，像一段即将切换的电影空镜。",
    src: new URL("../../Photos/misty-blue-mountains.jpg", import.meta.url).href,
    alt: "低饱和蓝色雾中山脉"
  },
  {
    index: "03",
    title: "城市夜雨",
    caption: "拍摄设定：便利店灯光、潮湿路面和一个没有说出口的夜晚。",
    src: new URL("../../Photos/rainy-city-night.jpg", import.meta.url).href,
    alt: "雨夜城市街景"
  }
];
</script>

<style scoped>
.gallery-float {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 16px;
  align-items: start;
}

.gallery-float__item {
  position: relative;
  min-height: 360px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(255, 255, 255, 0.06);
}

.gallery-float__item:nth-child(2) {
  margin-top: 92px;
}

.gallery-float__item:nth-child(3) {
  grid-column: 1 / 3;
  min-height: 420px;
  margin-inline: 16%;
}

.gallery-float img {
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  filter: saturate(0.68) brightness(0.72);
}

.gallery-float figcaption {
  position: absolute;
  right: 16px;
  bottom: 16px;
  left: 16px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(33, 52, 74, 0.44);
  backdrop-filter: blur(18px);
}

.gallery-float span {
  color: #bfd8ff;
  font-size: 0.76rem;
}

.gallery-float strong {
  display: block;
  margin-top: 8px;
  color: #e8eef5;
  font-size: clamp(1.18rem, 2vw, 1.72rem);
  font-weight: 560;
}

.gallery-float p {
  margin: 10px 0 0;
  color: rgba(159, 175, 194, 0.92);
  line-height: 1.65;
}

@media (max-width: 720px) {
  .gallery-float {
    grid-template-columns: 1fr;
  }

  .gallery-float__item:nth-child(2),
  .gallery-float__item:nth-child(3) {
    grid-column: auto;
    margin: 0;
  }
}
</style>
