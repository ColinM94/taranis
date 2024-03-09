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
        '@renderer': resolve('src/renderer/src'),
        assets: resolve('src/renderer/src/assets'),
        components: resolve('src/renderer/src/components'),
        consts: resolve('src/renderer/src/consts'),
        config: resolve('src/renderer/src/config'),
        entities: resolve('src/renderer/src/entities'),
        scenes: resolve('src/renderer/src/scenes'),
        screens: resolve('src/renderer/src/screens'),
        store: resolve('src/renderer/src/store'),
        styles: resolve('src/renderer/src/styles'),
        types: resolve('src/renderer/src/types'),
        utils: resolve('src/renderer/src/utils')
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
