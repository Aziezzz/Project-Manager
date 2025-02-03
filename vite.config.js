import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Project-Manager',
  server: {
    proxy: {
        '/api': 'http://localhost:3001', // Proxy request API ke server backend
    },
},
});
