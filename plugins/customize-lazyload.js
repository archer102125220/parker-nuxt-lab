
export default defineNuxtPlugin((nuxtApp) => {
  let observer = null;
  if (typeof window?.IntersectionObserver === 'function') {
    function handleLazyload(el) {
      el.src = el.getAttribute('lazy-src') || '';
      el.removeAttribute('lazy-src');
    }
    observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleLazyload(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
  }

  const customizeLazyload = {
    mounted(el, binding) {
      el.setAttribute('lazy-src', binding.value || binding.value?.src || '');
      el.src = binding.value?.loading || '';

      if (typeof observer.observe === 'function') {
        observer.observe(el);
      }
    },
    updated(el, binding) {
      el.setAttribute('lazy-src', binding.value || binding.value?.src || '');
      el.src = binding.value?.loading || '';

      if (typeof observer.observe === 'function') {
        observer.observe(el);
      }
    },
  }
  nuxtApp.vueApp.directive('customize-lazyload', customizeLazyload);
  nuxtApp.vueApp.directive('customizeLazyload', customizeLazyload);
});