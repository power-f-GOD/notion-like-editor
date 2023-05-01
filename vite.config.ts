import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'src/': path.join(__dirname, 'src/')
    }
  },
  base: process.env.NODE_ENV === 'development' ? '/' : '/notion-like-editor/'
});
