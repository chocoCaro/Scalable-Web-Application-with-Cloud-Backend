import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


dotenv.config({ path: '../.env' });

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
