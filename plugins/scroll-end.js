import handlePolyfillScrollEnd from '@/utils/polyfill/scroll-end';

export const pluginScrollEnd = defineNuxtPlugin((nuxtApp) => {
  const scrollEnd = {
    mounted(el, binding) {
      const handler = binding.value?.handler || binding.value;

      const wait = binding.value?.wait || 100;

      handlePolyfillScrollEnd(el, handler, wait);
    }
  }
  nuxtApp.vueApp.directive('scrollEnd', scrollEnd);
  nuxtApp.vueApp.directive('scroll-end', scrollEnd);

  return {
    provide: {
      polyfillScrollEnd: handlePolyfillScrollEnd
    },
  };
});

export default pluginScrollEnd;