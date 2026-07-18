import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
                main: resolve(__dirname, 'index.html'),
                logtrix: resolve(__dirname, 'logtrix.html'),
                calculator: resolve(__dirname, 'calculator.html'),
      }
    }
  }
})
