import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ tsDecorators: true, }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    fs: {
      cachedChecks: false
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
})