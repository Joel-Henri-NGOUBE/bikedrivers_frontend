import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["https://bikedrivers-frontend-v1-0-1-1.onrender.com", "localhost", "0.0.0.0"]
  }
})
