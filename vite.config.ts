import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'src/': path.join(__dirname, 'src/')
    }
  }
});
