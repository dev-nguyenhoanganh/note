import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        src: path.resolve('src/'),
      },
    },
    server: {
      port: Number(process.env.PORT) || 9000,
      open: true,
    },
    define: {
      'process.env': {
        ...process.env,
        ...loadEnv(mode, process.cwd()),
      },
    },
  });
};
