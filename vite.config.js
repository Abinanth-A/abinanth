import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        logtrixproject: resolve(__dirname, 'logtrixproject/index.html'),
        onlinecalculator: resolve(__dirname, 'onlinecalculator/index.html')
      }
    }
  }
})
