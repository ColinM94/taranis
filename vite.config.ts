import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      src: "src",
      entities: "src/entities",
    },
  },
});
