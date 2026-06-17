<template>
  <SectionFrame
    id="music"
    eyebrow="音乐切片"
    kicker="Music"
    title="他的播放列表，像一条藏在画面下方的暗线。"
    description="音乐内容使用随机但完整的个人偏好占位：氛围、后摇、钢琴、雨声采样和夜间通勤歌单。后续可以替换为真实平台链接。"
    layout="broken"
  >
    <div class="music-board" data-motion-target="music-board">
      <article v-for="track in tracks" :key="track.title" class="music-board__track" data-motion-target="music-card">
        <span>{{ track.index }}</span>
        <p>{{ track.scene }}</p>
        <h3>{{ track.title }}</h3>
        <strong>{{ track.artist }}</strong>
        <small>{{ track.note }}</small>
      </article>
    </div>
  </SectionFrame>
</template>

<script setup lang="ts">
import SectionFrame from "./SectionFrame.vue";

const tracks = [
  {
    index: "A1",
    scene: "雨夜写稿",
    title: "玻璃上的低频",
    artist: "Ambient / Piano",
    note: "适合凌晨一点整理照片，音量很低，几乎和窗外雨声混在一起。"
  },
  {
    index: "B4",
    scene: "山路通勤",
    title: "Drive Through Blue Trees",
    artist: "Post-rock",
    note: "鼓点慢慢进入，像车灯照到雾里的白线。"
  },
  {
    index: "C2",
    scene: "独自散步",
    title: "晚风经过便利店",
    artist: "Indie Pop",
    note: "旋律轻，但不明亮；适合从地铁口走回家。"
  },
  {
    index: "D7",
    scene: "专注工作",
    title: "Quiet Interface",
    artist: "Minimal Electronic",
    note: "循环、克制、没有高潮，用来陪伴长时间的界面整理。"
  }
];
</script>

<style scoped>
.music-board {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
}

.music-board__track {
  min-height: 260px;
  padding: clamp(20px, 3vw, 32px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
    rgba(43, 66, 91, 0.34);
  backdrop-filter: blur(14px);
}

.music-board__track:nth-child(1) {
  grid-column: 1 / 4;
}

.music-board__track:nth-child(2) {
  grid-column: 4 / 7;
  margin-top: 72px;
}

.music-board__track:nth-child(3) {
  grid-column: 2 / 5;
}

.music-board__track:nth-child(4) {
  grid-column: 5 / 7;
  margin-top: -42px;
}

.music-board span,
.music-board p {
  margin: 0;
  color: #7b8798;
  font-size: 0.78rem;
}

.music-board h3 {
  margin: 44px 0 0;
  color: #e8eef5;
  font-size: clamp(1.35rem, 3vw, 2.4rem);
  font-weight: 560;
  line-height: 1.05;
}

.music-board strong {
  display: block;
  margin-top: 16px;
  color: #bfd8ff;
  font-weight: 520;
}

.music-board small {
  display: block;
  margin-top: 18px;
  color: rgba(159, 175, 194, 0.9);
  font-size: 0.95rem;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .music-board {
    grid-template-columns: 1fr;
  }

  .music-board__track,
  .music-board__track:nth-child(n) {
    grid-column: auto;
    margin-top: 0;
  }
}
</style>
