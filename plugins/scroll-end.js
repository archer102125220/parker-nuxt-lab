export function pluginScrollEnd(VueApp) {
  const scrollEnd = {
    mounted(el, binding) {
      const handler = binding.value?.handler || binding.value;
      if (typeof handler !== 'function') {
        console.error('missing scroll end handler');
        return;
      }

      const wait = binding.value?.wait || 100;

      if ('onscrollend' in window) {
        function handleScrollEnd(...arg) {
          setTimeout(() => handler(...arg), wait);
        }
        el.addEventListener('scrollend', handleScrollEnd);
        return;
      }

      let setTimeoutTimer = 0;
      function polyfillScrollEnd(...arg) {
        if (setTimeoutTimer !== 0) {
          clearTimeout(setTimeoutTimer);
          setTimeoutTimer = 0;
        }

        setTimeoutTimer = setTimeout(() => {
          setTimeoutTimer = 0;
          handler(...arg);
        }, wait);
      }
      el.addEventListener('scroll', polyfillScrollEnd);
    }
  }
  VueApp.directive('scrollEnd', scrollEnd);
  VueApp.directive('scroll-end', scrollEnd);
};

export default pluginScrollEnd;