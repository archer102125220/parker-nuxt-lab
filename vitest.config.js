import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.spec.js',
        '**/*.spec.ts',
        '**/*.config.js',
        '**/*.config.ts',
        '.nuxt/',
        '.output/',
        'dist/',
        'coverage/'
      ]
    },
    include: [
      'tests/unit/**/*.spec.js',
      'tests/unit/**/*.spec.ts',
      'tests/integration/**/*.spec.js',
      'tests/integration/**/*.spec.ts'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.nuxt',
      '.output',
      'tests/**.spec.ts' // Exclude E2E tests (Playwright)
    ]
  },
  resolve: {
    alias: {
      '@': __dirname,
      '@app': path.join(__dirname, 'app'),
      '@server': path.join(__dirname, 'server'),
      '@i18n': path.join(__dirname, 'i18n'),
      '@public': path.join(__dirname, 'public'),
      '@models': path.join(__dirname, 'models'),
      '@services': path.join(__dirname, 'services'),
      '@shared': path.join(__dirname, 'shared'),
      '@utils': path.join(__dirname, 'utils'),
      '@service-worker': path.join(__dirname, 'service-worker'),
      '@modules': path.join(__dirname, 'modules'),
      '~': __dirname,
      '~app': path.join(__dirname, 'app'),
      '~server': path.join(__dirname, 'server'),
      '~i18n': path.join(__dirname, 'i18n'),
      '~style': path.join(__dirname, 'style'),
      '~public': path.join(__dirname, 'public'),
      '~models': path.join(__dirname, 'models'),
      '~services': path.join(__dirname, 'services'),
      '~shared': path.join(__dirname, 'shared'),
      '~utils': path.join(__dirname, 'utils'),
      '~service-worker': path.join(__dirname, 'service-worker'),
      '~modules': path.join(__dirname, 'modules')
    }
  }
});
