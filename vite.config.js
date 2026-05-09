import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv/index.html'),
        cvPrint: resolve(__dirname, 'cv/print.html'),
        dirkNielandt: resolve(__dirname, 'dirk-nielandt/index.html'),
        fizzi: resolve(__dirname, 'fizzi/index.html'),
        beestenbos: resolve(__dirname, 'cafe-beestenbos-cashup/index.html'),
        doorHetOog: resolve(__dirname, 'door-het-oog-van-de-maker/index.html'),
      },
    },
  },
})