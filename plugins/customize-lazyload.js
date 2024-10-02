const config = {};
export default defineNuxtPlugin((nuxtApp) => {
  let observer = null;
  if (typeof window?.IntersectionObserver === 'function') {
    function handleLazyload(element) {
      const src = element.getAttribute('lazy-src') || element.src || element.removeAttribute('error-img') || '';
      if (src !== '') {
        element.src = src;
        element.removeAttribute('lazy-src');
      }

      element.addEventListener('load', function (event) {
        event.target.removeAttribute('error-img');
      });
    }
    observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleLazyload(entry.target);
          entry.target.addEventListener('error', handleImgError);
          observer.unobserve(entry.target);
        } else {
          entry.target.removeEventListener('error', handleImgError);
        }
      });
    });
  }


  function handleImgError(event) {
    const errorImgSrc = event.target.getAttribute('error-img') || '';
    if (typeof errorImgSrc === 'string' && errorImgSrc !== '') {
      event.target.src = errorImgSrc;
      event.target.removeAttribute('error-img');
      event.target.removeAttribute('lazy-src');
    }
    observer.unobserve(event.target);
  }

  const customizeLazyload = {
    mounted(el, binding) {
      const src = el.src || '';

      const lazySrc = binding.value?.src || binding.value || src;
      el.setAttribute('lazy-src', lazySrc);
      const errorImg = config?.error || binding.value?.errorImg || src;
      el.setAttribute('error-img', errorImg);

      el.src = config?.loading || binding.value?.loading || src;

      if (typeof binding.value?.error === 'function') {
        el.addEventListener('error', binding.value.error);
      }

      if ((typeof src === 'string' && src === '' || (src !== lazySrc && src !== errorImg)) && typeof observer.observe === 'function') {
        observer.observe(el);
      }
    },
    updated(el, binding) {
      if (binding.value?.src === binding.oldValue?.src) {
        return;
      }

      const src = el.src || '';

      const lazySrc = binding.value?.src || binding.value || src;
      el.setAttribute('lazy-src', lazySrc);
      const errorImg = config?.error || binding.value?.errorImg || src;
      el.setAttribute('error-img', errorImg);

      el.src = config?.loading || binding.value?.loading || src;

      if (typeof binding.oldValue?.error === 'function') {
        el.removeEventListener('error', binding.oldValue.error);
      }
      if (typeof binding.value?.error === 'function') {
        el.addEventListener('error', binding.value.error);
      }
    },
    beforeUnmount(el) {
      if (typeof observer.unobserve === 'function') {
        observer.unobserve(el);
      }
    }
  }
  nuxtApp.vueApp.directive('customize-lazyload', customizeLazyload);
  nuxtApp.vueApp.directive('customizeLazyload', customizeLazyload);
});