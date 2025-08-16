// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Set your desired port
    host: true, // This is crucial for network access (e.g., from mobile devices)
  },
});