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
        fizziShowreel: resolve(__dirname, 'fizzi-showreel/index.html'),
        beestenbosFootoi: resolve(__dirname, 'beestenbos-fooi/index.html'),
        oog: resolve(__dirname, 'oog/index.html'),
        doorHetOog: resolve(__dirname, 'door-het-oog-van-de-maker/index.html'),
      },
    },
  },
})