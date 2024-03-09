import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer'),
        assets: resolve('src/renderer/assets'),
        components: resolve('src/renderer/components'),
        consts: resolve('src/renderer/consts'),
        config: resolve('src/renderer/config'),
        entities: resolve('src/renderer/entities'),
        scenes: resolve('src/renderer/scenes'),
        screens: resolve('src/renderer/screens'),
        store: resolve('src/renderer/store'),
        styles: resolve('src/renderer/styles'),
        types: resolve('src/renderer/types'),
        utils: resolve('src/renderer/utils')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "styles/vars.scss";`
        }
      }
    },
    plugins: [react()]
  }
})
