// Vitest setup file
import { config } from '@vue/test-utils';

// Configure Vue Test Utils globally
config.global.mocks = {
  $t: (key) => key, // Mock i18n
};

// Mock Nuxt auto-imports
global.defineComponent = (component) => component;
global.ref = (value) => ({ value });
global.computed = (fn) => ({ value: fn() });
global.reactive = (obj) => obj;
global.watch = () => { };
global.watchEffect = () => { };
global.onMounted = () => { };
global.onBeforeUnmount = () => { };
global.nextTick = () => Promise.resolve();
global.useTemplateRef = (name) => ({ value: null });

// Mock window.requestAnimationFrame for tests
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
