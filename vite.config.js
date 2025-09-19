import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0', // આ લાઇન ઉમેરો
    port: process.env.PORT || 4173 // આ પણ ઉમેરો
  }
})
