import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
=======
// https://vitejs.dev/config/
>>>>>>> origin/lokesh-dev
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
<<<<<<< HEAD
  server: {
    host: '0.0.0.0',   // allow external access (not only localhost)
    port: 5173,        // Vite dev server port
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
=======
>>>>>>> origin/lokesh-dev
});
