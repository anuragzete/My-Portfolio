
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables based on the mode (development or production)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE');
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      'process.env': env,
    },
  };
});

