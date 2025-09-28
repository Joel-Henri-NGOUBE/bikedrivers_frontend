/// <reference types="vitest" /> 
/// <reference types="vite/client" /> 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["bikedrivers-frontend-v1-0-1-1.onrender.com"]
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"]
  },
})
