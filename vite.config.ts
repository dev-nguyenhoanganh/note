import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default ({ mode }) => {
  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), checker({ typescript: true })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number(process.env.PORT) || 9000,
      open: true,
    },
    define: {
      'process.env': { ...loadEnv(mode, process.cwd(), 'ENV_') },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  });
};
