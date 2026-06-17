<template>
  <footer class="footer-section" aria-labelledby="footer-title" data-section="footer" data-layout="closing">
    <div class="footer-section__content" data-motion-target="footer-content">
      <p class="footer-section__eyebrow">片尾 / End Credits</p>
      <h2 id="footer-title" data-motion-target="footer-title">如果你也在雨里停了一会儿，欢迎留下声音。</h2>
      <p>
        这里预留真实联系方式与社交入口。现在的占位身份是：林屿森，杭州，产品设计师。邮箱、影像档案和音乐歌单后续都可以替换。
      </p>
      <nav aria-label="页脚链接">
        <a v-for="link in links" :key="link.label" :href="link.href">{{ link.label }}</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const links = [
  { label: "邮箱", href: "mailto:linyusen@example.com" },
  { label: "影像档案", href: "#" },
  { label: "音乐歌单", href: "#" }
];
</script>

<style scoped>
.footer-section {
  position: relative;
  display: grid;
  min-height: 92svh;
  overflow: hidden;
  padding: clamp(72px, 12vw, 140px) var(--space-page-x);
  place-items: end start;
  color: #e8eef5;
  isolation: isolate;
}

.footer-section::after {
  position: absolute;
  top: 0;
  right: var(--space-page-x);
  left: var(--space-page-x);
  z-index: -1;
  height: 1px;
  content: "";
  background: linear-gradient(90deg, transparent, rgba(191, 216, 255, 0.28), transparent);
}

.footer-section__content {
  max-width: 860px;
}

.footer-section__eyebrow {
  margin: 0 0 18px;
  color: #bfd8ff;
  font-size: 0.78rem;
}

.footer-section h2 {
  margin: 0;
  color: #e8eef5;
  font-size: clamp(2.2rem, 7vw, 6.8rem);
  font-weight: 560;
  line-height: 0.98;
  letter-spacing: 0;
}

.footer-section__content > p:not(.footer-section__eyebrow) {
  max-width: 620px;
  margin: 28px 0 0;
  color: rgba(159, 175, 194, 0.92);
  line-height: 1.8;
}

.footer-section nav {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.footer-section a {
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-glass);
  background: rgba(255, 255, 255, 0.06);
  color: #e8eef5;
  text-decoration: none;
}

.footer-section a:hover {
  color: #bfd8ff;
  background: rgba(255, 255, 255, 0.12);
}
</style>
