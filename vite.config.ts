import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      assets: "/src/assets",
      consts: "/src/consts",
      components: "/src/components",
      entities: "/src/entities",
      scenes: "/src/scenes",
      store: "/src/store",
      styles: "/src/styles",
      types: "/src/types",
      utils: "/src/utils",
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/vars.scss";`,
      },
    },
  },
});
