import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2026-06-17",
  devtools: { enabled: true },
  ssr: true,
  srcDir: "app",
  alias: {
    "@app": fileURLToPath(new URL("./app", import.meta.url)),
    "@motion": fileURLToPath(new URL("./motion", import.meta.url)),
    "@types": fileURLToPath(new URL("./types", import.meta.url)),
    "@utils": fileURLToPath(new URL("./utils", import.meta.url))
  },
  plugins: [
    fileURLToPath(new URL("./plugins/gsap.client.ts", import.meta.url)),
    fileURLToPath(new URL("./plugins/lenis.client.ts", import.meta.url))
  ],
  css: ["~/assets/styles/tokens.css", "~/assets/styles/base.css"],
  app: {
    head: {
      title: "\u6bdb\u6bdb\u7684\u4e16\u754c",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      htmlAttrs: {
        lang: "zh-CN"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#08111f" },
        {
          name: "description",
          content: "A cinematic personal digital world built with Nuxt, GSAP, and Lenis."
        }
      ]
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  vite: {
    css: {
      devSourcemap: true
    }
  }
});
