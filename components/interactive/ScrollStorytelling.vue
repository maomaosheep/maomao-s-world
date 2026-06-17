<template>
  <div ref="root" class="scroll-storytelling" aria-hidden="true" data-interactive="scroll-storytelling">
    <div class="scroll-storytelling__progress">
      <span class="scroll-storytelling__bar" />
    </div>
    <p class="scroll-storytelling__chapter">{{ activeChapter }}</p>
  </div>
</template>

<script setup lang="ts">
import { useGSAP } from "../../composables/useGSAP";

const root = ref<HTMLElement | null>(null);
const activeChapter = ref("Opening");

const chapterNames: Record<string, string> = {
  opening: "Opening",
  about: "About",
  "life-journey": "Life Journey",
  gallery: "Gallery",
  travel: "Travel",
  music: "Music",
  food: "Food",
  footer: "Closing"
};

useGSAP(root, ({ gsap, ScrollTrigger, reduceMotion }) => {
  const progressBar = root.value?.querySelector(".scroll-storytelling__bar");
  const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
  const animations: gsap.core.Animation[] = [];

  if (!root.value || !progressBar || sections.length === 0) {
    return;
  }

  gsap.set(progressBar, { scaleY: 0, transformOrigin: "center top" });

  const triggers = sections.map((section, index) =>
    ScrollTrigger.create({
      trigger: section,
      start: "top 62%",
      end: "bottom 38%",
      refreshPriority: index,
      onEnter: () => {
        activeChapter.value = chapterNames[section.dataset.section ?? ""] ?? "Chapter";
      },
      onEnterBack: () => {
        activeChapter.value = chapterNames[section.dataset.section ?? ""] ?? "Chapter";
      }
    })
  );

  const progressTween = gsap.to(progressBar, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: reduceMotion ? false : 0.8
    }
  });
  animations.push(progressTween);

  if (!reduceMotion) {
    sections.forEach((section, index) => {
      const layout = section.dataset.layout ?? "overlap";
      const header = section.querySelector<HTMLElement>('[data-motion-target="section-header"]');
      const title = section.querySelector<HTMLElement>('[data-motion-target="section-title"]');
      const description = section.querySelector<HTMLElement>('[data-motion-target="section-description"]');
      const body = section.querySelector<HTMLElement>('[data-motion-target="section-body"]');
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(
          [
            '[data-motion-target="about-card"]',
            '[data-motion-target="timeline-item"]',
            '[data-motion-target="gallery-card"]',
            '[data-motion-target="travel-card"]',
            '[data-motion-target="music-card"]',
            '[data-motion-target="food-card"]'
          ].join(",")
        )
      );
      const targets = [header, title, description, body].filter((target): target is HTMLElement => Boolean(target));

      gsap.set(targets, {
        autoAlpha: 0.34,
        filter: "blur(12px)",
        y: 42
      });

      if (title) {
        gsap.set(title, {
          clipPath: "inset(0 100% 0 0 round 0px)",
          transformOrigin: "left center"
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          end: "center 38%",
          scrub: 0.72,
          refreshPriority: index
        }
      });
      animations.push(timeline);

      timeline
        .to(title, { autoAlpha: 1, clipPath: "inset(0 0% 0 0 round 0px)", filter: "blur(0px)", y: 0, duration: 0.72 })
        .to(description, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.58 }, "<0.12")
        .to(body, { autoAlpha: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 0.72 }, "<0.08");

      if (cards.length > 0) {
        animations.push(
          gsap.fromTo(
            cards,
            {
              autoAlpha: 0.44,
              y: (cardIndex) => 22 + (cardIndex % 3) * 12,
              x: (cardIndex) => (layout === "overlap" ? (cardIndex % 2 === 0 ? -18 : 18) : 0),
              scale: 0.955,
              filter: "blur(10px)",
              clipPath: "inset(12% 10% 12% 10% round 8px)"
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0% round 8px)",
              stagger: { amount: 0.36, from: "start" },
              scrollTrigger: {
                trigger: section,
                start: "top 66%",
                end: "bottom 44%",
                scrub: 0.8,
                refreshPriority: index
              }
            }
          )
        );
      }

      if (section.dataset.section === "gallery") {
        animations.push(
          gsap.to(cards, {
            y: (cardIndex) => (cardIndex % 2 === 0 ? -48 : 34),
            scale: (cardIndex) => (cardIndex % 2 === 0 ? 1.035 : 0.985),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              refreshPriority: index
            }
          })
        );
      }

      if (section.dataset.section === "life-journey") {
        animations.push(
          gsap.fromTo(
            cards,
            { x: -34, rotationX: 8, transformOrigin: "left center" },
            {
              x: 0,
              rotationX: 0,
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 44%",
                scrub: 0.7,
                refreshPriority: index
              }
            }
          )
        );
      }

      if (section.dataset.section === "music") {
        animations.push(
          gsap.to(cards, {
            motionPath: {
              path: [
                { x: 0, y: 0 },
                { x: 12, y: -18 },
                { x: -8, y: 10 },
                { x: 0, y: 0 }
              ],
              curviness: 1.4
            },
            stagger: { amount: 0.3, from: "center" },
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              refreshPriority: index
            }
          })
        );
      }

      if (section.dataset.section === "food") {
        cards.forEach((card, cardIndex) => {
          animations.push(
            gsap.fromTo(
              card,
              { scale: 0.92, y: 54, filter: "blur(14px)" },
              {
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  end: "center 48%",
                  scrub: 0.62,
                  refreshPriority: index + cardIndex / 10
                }
              }
            )
          );
        });
      }
    });
  }

  return () => {
    animations.forEach((animation) => animation.kill());
    triggers.forEach((trigger) => trigger.kill());
  };
});
</script>

<style scoped>
.scroll-storytelling {
  position: fixed;
  right: clamp(14px, 2.4vw, 28px);
  bottom: clamp(24px, 4vw, 48px);
  z-index: var(--z-overlay);
  display: grid;
  gap: 12px;
  justify-items: center;
  pointer-events: none;
}

.scroll-storytelling__progress {
  width: 1px;
  height: 112px;
  overflow: hidden;
  background: rgba(232, 238, 248, 0.16);
}

.scroll-storytelling__bar {
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(232, 238, 248, 0.72);
  transform: scaleY(0);
}

.scroll-storytelling__chapter {
  margin: 0;
  writing-mode: vertical-rl;
  color: rgba(232, 238, 248, 0.62);
  font-size: 0.72rem;
  letter-spacing: 0;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .scroll-storytelling {
    display: none;
  }
}
</style>
