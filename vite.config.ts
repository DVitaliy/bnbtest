import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true
    })
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets")
    }
  }
})
