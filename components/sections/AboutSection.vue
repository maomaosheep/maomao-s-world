<template>
  <SectionFrame
    id="about"
    eyebrow="关于我"
    kicker="About Me"
    title="林屿森，把日常拍成一场安静的雨。"
    description="一个住在杭州的产品设计师，也写短篇影像札记。白天整理界面、原型与叙事路径，夜里把雨声、车窗和森林边缘收进自己的数字世界。"
    layout="immersive"
    :image="images.hero"
  >
    <div class="about-brief" data-motion-target="about-brief">
      <article v-for="item in profileCards" :key="item.label" class="about-brief__card" data-motion-target="about-card">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <p>{{ item.note }}</p>
      </article>
    </div>
  </SectionFrame>
</template>

<script setup lang="ts">
import SectionFrame from "./SectionFrame.vue";

const images = {
  hero: {
    src: new URL("../../Photos/foggy-forest-aerial.jpg", import.meta.url).href,
    alt: "低饱和蓝色雾气森林航拍图"
  }
};

const profileCards = [
  {
    label: "姓名",
    value: "林屿森",
    note: "1998 年生，现居杭州。喜欢把人的情绪、地点和时间做成可以缓慢阅读的界面。"
  },
  {
    label: "身份",
    value: "产品设计师 / 影像记录者",
    note: "关注交互叙事、情绪化 UI、低饱和摄影，也长期收集雨天城市的声音。"
  },
  {
    label: "此刻",
    value: "正在建立一座个人数字世界",
    note: "它不是简历，而是一部可以滚动推进的私人电影，后续所有内容都可以被真实资料替换。"
  }
];
</script>

<style scoped>
.about-brief {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 1080px;
}

.about-brief__card {
  min-height: 220px;
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
}

.about-brief__card span {
  display: block;
  margin-bottom: 42px;
  color: rgba(191, 216, 255, 0.82);
  font-size: 0.78rem;
}

.about-brief__card strong {
  display: block;
  color: #e8eef5;
  font-size: clamp(1.15rem, 2vw, 1.62rem);
  font-weight: 560;
  line-height: 1.25;
}

.about-brief__card p {
  margin: 14px 0 0;
  color: rgba(159, 175, 194, 0.9);
  line-height: 1.72;
}

@media (max-width: 860px) {
  .about-brief {
    grid-template-columns: 1fr;
  }
}
</style>
