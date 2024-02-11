import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      consts: path.resolve(__dirname, 'src/consts'),
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      inits: path.resolve(__dirname, 'src/inits'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      navigation: path.resolve(__dirname, 'src/navigation'),
      pages: path.resolve(__dirname, 'src/pages'),
      services: path.resolve(__dirname, 'src/services'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      types: path.resolve(__dirname, 'src/types'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/vars.scss";`,
      },
    },
  },
  plugins: [react()],
})
