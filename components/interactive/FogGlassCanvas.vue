<template>
  <div ref="root" class="fog-glass" aria-hidden="true" data-interactive="fog-glass">
    <img class="fog-glass__clear" :src="clearImageUrl" alt="" draggable="false" />
    <canvas ref="canvas" class="fog-glass__fog" />
    <div class="fog-glass__tint" />
    <div class="fog-glass__aurora fog-glass__aurora--one" />
    <div class="fog-glass__aurora fog-glass__aurora--two" />
    <div class="fog-glass__reflection" />
  </div>
</template>

<script setup lang="ts">
import { getFogGlassToken } from "../../shaders/fogGlass";
import { cinematicWindowResources } from "../../utils/resourcePaths";

type Point = {
  x: number;
  y: number;
  time: number;
};

type StrokeSegment = {
  from: Point;
  control: Point;
  to: Point;
  width: number;
  age: number;
  life: number;
};

const root = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const reflection = getFogGlassToken("reflection");
const fogImageUrl = cinematicWindowResources.foggedWindow;
const clearImageUrl = cinematicWindowResources.clearWindow;

let context: CanvasRenderingContext2D | null = null;
let fogImage: HTMLImageElement | null = null;
let segments: StrokeSegment[] = [];
let frame = 0;
let width = 0;
let height = 0;
let pixelRatio = 1;
let lastPoint: Point | null = null;
let lastMidpoint: Point | null = null;
let lastFrameTime = 0;
let isAnimating = false;
let reduceMotion = false;
let coarsePointer = false;
let imageReady = false;

const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
  time: b.time
});

const distance = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

const getCoverRect = (image: HTMLImageElement) => {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  const drawWidth = canvasRatio > imageRatio ? width : height * imageRatio;
  const drawHeight = canvasRatio > imageRatio ? width / imageRatio : height;

  return {
    x: (width - drawWidth) / 2,
    y: (height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight
  };
};

const drawFogBase = () => {
  const ctx = context;
  const image = fogImage;

  if (!ctx || !imageReady || !image) {
    return;
  }

  const rect = getCoverRect(image);
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
};

const resizeCanvas = () => {
  const element = canvas.value;

  if (!element) {
    return;
  }

  width = window.innerWidth;
  height = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio || 1, coarsePointer || width < 768 ? 1 : 1.5);
  element.width = Math.floor(width * pixelRatio);
  element.height = Math.floor(height * pixelRatio);
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  context = element.getContext("2d", { alpha: true });
  context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  drawFogBase();
  startDrawing();
};

const loadFogImage = () =>
  new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = fogImageUrl;
    image.onload = () => {
      fogImage = image;
      imageReady = true;
      drawFogBase();
      resolve();
    };
  });

const strokeWidthFor = (from: Point, to: Point) => {
  const velocity = distance(from, to) / Math.max(to.time - from.time, 16);
  const base = coarsePointer ? 34 : 42;
  return Math.max(28, Math.min(base + velocity * 10, 58));
};

const addSegment = (point: Point) => {
  if (!lastPoint) {
    lastPoint = point;
    lastMidpoint = point;
    return;
  }

  const travel = distance(lastPoint, point);

  if (travel < 2) {
    return;
  }

  const currentMidpoint = midpoint(lastPoint, point);
  const previousMidpoint = lastMidpoint ?? lastPoint;
  const widthForStroke = strokeWidthFor(lastPoint, point);

  segments.push({
    from: previousMidpoint,
    control: lastPoint,
    to: currentMidpoint,
    width: widthForStroke,
    age: 0,
    life: 3200 + Math.min(travel * 18, 1700)
  });

  lastPoint = point;
  lastMidpoint = currentMidpoint;
  startDrawing();
};

const handlePointerMove = (event: PointerEvent) => {
  if (reduceMotion || event.pointerType === "touch") {
    return;
  }

  addSegment({
    x: event.clientX,
    y: event.clientY,
    time: performance.now()
  });
};

const endStroke = () => {
  lastPoint = null;
  lastMidpoint = null;
};

const drawSegmentMask = (ctx: CanvasRenderingContext2D, segment: StrokeSegment, alpha: number) => {
  const featherSteps = 5;

  ctx.globalCompositeOperation = "destination-out";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let step = featherSteps; step >= 1; step -= 1) {
    const scale = step / featherSteps;
    ctx.globalAlpha = alpha * (step === 1 ? 1 : 0.12);
    ctx.lineWidth = segment.width * (1 + (1 - scale) * 1.8);
    ctx.beginPath();
    ctx.moveTo(segment.from.x, segment.from.y);
    ctx.quadraticCurveTo(segment.control.x, segment.control.y, segment.to.x, segment.to.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
};

const draw = (time: number) => {
  const ctx = context;

  if (!ctx || !imageReady) {
    stopDrawing();
    return;
  }

  const delta = Math.min(time - lastFrameTime || 16.7, 50);
  lastFrameTime = time;
  drawFogBase();

  segments = segments.filter((segment) => {
    segment.age += delta;
    const progress = Math.min(segment.age / segment.life, 1);
    const hold = 0.18;
    const recondense = progress < hold ? 0 : (progress - hold) / (1 - hold);
    const alpha = Math.pow(1 - recondense, 1.7);

    if (alpha > 0.012) {
      drawSegmentMask(ctx, segment, alpha);
    }

    return progress < 1;
  });

  if (segments.length === 0) {
    drawFogBase();
    stopDrawing();
    return;
  }

  frame = window.requestAnimationFrame(draw);
};

const startDrawing = () => {
  if (isAnimating || reduceMotion || !imageReady || segments.length === 0) {
    return;
  }

  isAnimating = true;
  lastFrameTime = performance.now();
  frame = window.requestAnimationFrame(draw);
};

const stopDrawing = () => {
  isAnimating = false;
  lastFrameTime = 0;

  if (frame) {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
};

onMounted(async () => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  resizeCanvas();
  await loadFogImage();
  resizeCanvas();

  if (!reduceMotion && !coarsePointer) {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", endStroke);
    window.addEventListener("blur", endStroke);
  }

  window.addEventListener("resize", resizeCanvas);
});

onBeforeUnmount(() => {
  stopDrawing();
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerleave", endStroke);
  window.removeEventListener("blur", endStroke);
  window.removeEventListener("resize", resizeCanvas);
  segments = [];
});
</script>

<style scoped>
.fog-glass {
  position: fixed;
  inset: 0;
  z-index: var(--z-base);
  overflow: hidden;
  pointer-events: none;
  background:
    linear-gradient(180deg, #324b66 0%, #2b425b 35%, #25384d 70%, #21344a 100%);
}

.fog-glass__clear,
.fog-glass__fog,
.fog-glass__tint,
.fog-glass__aurora,
.fog-glass__reflection {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.fog-glass__clear {
  object-fit: cover;
  opacity: 0.94;
  transform: translate3d(0, 0, 0);
}

.fog-glass__fog {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.fog-glass__tint {
  background:
    linear-gradient(180deg, rgba(33, 52, 74, 0.2), rgba(5, 9, 16, 0.34)),
    radial-gradient(circle at 50% -12%, rgba(191, 216, 255, 0.16), transparent 33rem);
  mix-blend-mode: multiply;
}

.fog-glass__aurora {
  filter: blur(68px);
  opacity: 0.34;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.fog-glass__aurora--one {
  background: radial-gradient(circle at 22% 22%, rgba(191, 216, 255, 0.2), transparent 30rem);
  animation: aurora-breathe 12s var(--ease-cinematic) infinite alternate;
}

.fog-glass__aurora--two {
  background: radial-gradient(circle at 82% 34%, rgba(123, 135, 152, 0.18), transparent 28rem);
  animation: aurora-drift 16s var(--ease-cinematic) infinite alternate;
}

.fog-glass__reflection {
  background: v-bind(reflection);
  opacity: 0.12;
  transform: translateX(-24%);
  animation: reflection-pass 12s var(--ease-cinematic) infinite;
}

@keyframes aurora-breathe {
  from {
    transform: translate3d(-3%, -1%, 0) scale(1);
  }

  to {
    transform: translate3d(4%, 2%, 0) scale(1.08);
  }
}

@keyframes aurora-drift {
  from {
    transform: translate3d(3%, 2%, 0) scale(1.02);
  }

  to {
    transform: translate3d(-4%, -1%, 0) scale(0.98);
  }
}

@keyframes reflection-pass {
  0%,
  44% {
    transform: translateX(-42%);
    opacity: 0;
  }

  64% {
    opacity: 0.12;
  }

  100% {
    transform: translateX(42%);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fog-glass__aurora,
  .fog-glass__reflection {
    animation: none;
  }
}
</style>
