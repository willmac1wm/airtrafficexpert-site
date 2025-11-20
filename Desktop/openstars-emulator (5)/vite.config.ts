import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Your API Key
const apiKey = 'AIzaSyClXVTFdo-dxJsjutZmfGg4JMbiSB10s6M';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // 1. Covers process.env.GEMINI_API_KEY
    'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
    // 2. Covers process.env.VITE_GEMINI_API_KEY
    'process.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey),
    // 3. Covers import.meta.env.GEMINI_API_KEY (Likely the culprit!)
    'import.meta.env.GEMINI_API_KEY': JSON.stringify(apiKey),
    // 4. Covers import.meta.env.VITE_GEMINI_API_KEY
    'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey),
    // 5. Covers generic process.env access
    'process.env': {
      GEMINI_API_KEY: apiKey,
      VITE_GEMINI_API_KEY: apiKey
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
  }
});
