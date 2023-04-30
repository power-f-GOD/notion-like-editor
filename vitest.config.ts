import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [],
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['**/__tests__/**/*.test.ts']
    }
  })
);
