import { handleBindScrollEnd } from '@app/utils/polyfill/scroll-end';

export const pluginScrollEnd = defineNuxtPlugin((nuxtApp) => {
  const scrollEnd = {
    mounted(el, binding) {
      const handler = binding.value?.handler || binding.value;

      const wait = binding.value?.wait || 100;

      handleBindScrollEnd(el, handler, wait);
    }
  };
  nuxtApp.vueApp.directive('scrollEnd', scrollEnd);
  nuxtApp.vueApp.directive('scroll-end', scrollEnd);

  return {
    provide: {
      bindScrollEnd: handleBindScrollEnd
    }
  };
});

export default pluginScrollEnd;
