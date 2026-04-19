import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'portfolio' below to your actual GitHub repo name
// e.g. github.com/faisalaazhar/my-portfolio → base: '/my-portfolio/'
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // ← UPDATE to match your repo name
})
