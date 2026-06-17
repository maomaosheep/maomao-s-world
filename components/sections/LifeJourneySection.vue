<template>
  <SectionFrame
    id="life-journey"
    eyebrow="生活轨迹"
    kicker="Life Journey"
    title="时间像窗外的山路，一段一段向后退。"
    description="这些经历是随机生成的个人信息占位：从海边小城、设计学院、第一份产品工作，到独自完成个人影像计划。真实资料接入时，只需要替换这组结构化数据。"
    layout="timeline"
  >
    <ol class="journey" aria-label="林屿森的生活轨迹" data-motion-target="timeline-list">
      <li v-for="chapter in chapters" :key="chapter.year" class="journey__item" data-motion-target="timeline-item">
        <time>{{ chapter.year }}</time>
        <div class="journey__line" aria-hidden="true" />
        <article>
          <p>{{ chapter.place }}</p>
          <h3>{{ chapter.title }}</h3>
          <span>{{ chapter.copy }}</span>
        </article>
      </li>
    </ol>
  </SectionFrame>
</template>

<script setup lang="ts">
import SectionFrame from "./SectionFrame.vue";

const chapters = [
  {
    year: "2016",
    place: "舟山",
    title: "第一次把海雾拍成日记",
    copy: "高中毕业后的夏天，他用一台旧相机记录清晨码头。那时还不知道设计是什么，只记得雾气会把世界变得柔软。"
  },
  {
    year: "2019",
    place: "杭州",
    title: "在设计学院学会删减",
    copy: "他开始研究字体、空间、界面和叙事。比起做更多效果，他更在意一段内容如何慢慢靠近观看者。"
  },
  {
    year: "2022",
    place: "上海",
    title: "进入产品团队，负责情绪化体验",
    copy: "第一份工作围绕音乐社区和创作者工具展开。白天处理复杂流程，晚上写下关于城市夜雨的短句。"
  },
  {
    year: "2026",
    place: "杭州",
    title: "开始搭建自己的个人数字世界",
    copy: "这一次，他不想做模板网站，而是把经历、照片、食物、旅行和音乐组织成一部可以滚动观看的私人电影。"
  }
];
</script>

<style scoped>
.journey {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.journey__item {
  display: grid;
  grid-template-columns: 90px 28px minmax(0, 1fr);
  gap: 18px;
  min-height: 190px;
}

.journey time {
  color: #bfd8ff;
  font-size: 0.86rem;
}

.journey__line {
  position: relative;
  height: 100%;
}

.journey__line::before,
.journey__line::after {
  position: absolute;
  content: "";
}

.journey__line::before {
  top: 4px;
  left: 8px;
  width: 10px;
  height: 10px;
  border: 1px solid rgba(191, 216, 255, 0.7);
  border-radius: 50%;
  background: rgba(191, 216, 255, 0.18);
}

.journey__line::after {
  top: 22px;
  bottom: 0;
  left: 12px;
  width: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.journey article {
  padding: 0 0 46px;
}

.journey article p {
  margin: 0 0 10px;
  color: #7b8798;
  font-size: 0.82rem;
}

.journey h3 {
  margin: 0;
  color: #c9d5e3;
  font-size: clamp(1.28rem, 2.2vw, 2rem);
  font-weight: 560;
  line-height: 1.25;
}

.journey span {
  display: block;
  max-width: 680px;
  margin-top: 14px;
  color: rgba(159, 175, 194, 0.9);
  line-height: 1.78;
}

@media (max-width: 620px) {
  .journey__item {
    grid-template-columns: 62px 22px minmax(0, 1fr);
    gap: 12px;
  }
}
</style>
