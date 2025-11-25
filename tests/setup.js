// Vitest setup file
import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// Mock Vue Router globally
global.onBeforeRouteLeave = vi.fn();

// 設定全局 config
config.global.mocks = {
  $t: (key) => key, // i18n mock
  $route: {
    params: {},
    query: {}
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  }
};

// Mock Nuxt auto-imports
global.defineComponent = (component) => component;
global.ref = (value) => ({ value });
global.computed = (fn) => ({ value: fn() });
global.reactive = (obj) => obj;
global.watch = () => { };
global.watchEffect = () => { };
global.onMounted = () => { };
global.onActivated = () => { };
global.onDeactivated = () => { };
global.onBeforeUnmount = () => { };
global.onBeforeRouteLeave = () => { };
global.nextTick = () => Promise.resolve();
global.useTemplateRef = (name) => ({ value: null });

// Mock window.requestAnimationFrame for tests
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
