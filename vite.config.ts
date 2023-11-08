import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default ({ mode }) => {
  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        src: path.resolve('src/'),
      },
    },
    define: {
      'process.env': {
        ...process.env,
        ...loadEnv(mode, process.cwd()),
      },
    },
  });
};
