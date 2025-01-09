const config = {};
export default defineNuxtPlugin((nuxtApp) => {
  let observer = null;
  if (typeof window?.IntersectionObserver === 'function') {
    function handleLazyload(element) {
      const src = element.getAttribute('lazy-src') || element.src || element.removeAttribute('lazy-error-img') || '';
      if (src !== '') {
        element.src = src;
        element.removeAttribute('lazy-src');
      }

      // if (element.getAttribute('has-loading-src') === 'false') {
      //   element.style.opacity = null;
      //   element.removeAttribute('has-loading-src');
      // }

      element.addEventListener('load', function (event) {
        event.target.removeAttribute('lazy-error-img');
        if (element.getAttribute('has-loading-src') === 'false') {
          element.style.opacity = null;
          element.removeAttribute('has-loading-src');
        }
        element.setAttribute('lazy-finish', 'true');
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
    const errorImgSrc = event.target.getAttribute('lazy-error-img') || '';
    event.target.setAttribute('lazy-error', 'true');
    if (typeof errorImgSrc === 'string' && errorImgSrc !== '') {
      event.target.src = errorImgSrc;
      event.target.removeAttribute('lazy-error-img');
      event.target.removeAttribute('lazy-src');
    }
    event.target.removeEventListener('error', handleImgError);

    observer.unobserve(event.target);
  }

  const customizeLazyload = {
    mounted(el, binding) {
      const src = el.src || '';
      const lazySrc = (typeof binding.value?.src === 'string' ? binding.value?.src : binding.value) || src;
      if (typeof observer?.observe !== 'function') {
        el.src = lazySrc;
        return;
      }

      if ((typeof binding.value?.loading !== 'string' && typeof binding.value?.loading !== 'object') || binding.value?.loading === '' || binding.value?.loading === null) {
        el.style.opacity = 0;
        el.setAttribute('has-loading-src', false);
      } else {
        el.setAttribute('has-loading-src', true);
      }

      el.setAttribute('lazy-src', lazySrc);
      const errorImg = binding.value?.errorImg || config?.error || src;
      el.setAttribute('lazy-error-img', errorImg);

      el.src = binding.value?.loading || config?.loading || src;

      if (typeof binding.value?.error === 'function') {
        el.addEventListener('error', binding.value.error);
      }

      if ((typeof src === 'string' && src === '' || (src !== lazySrc && src !== errorImg)) && typeof observer.observe === 'function') {
        observer.observe(el);
      }
    },
    updated(el, binding) {
      if ((binding.value === binding.oldValue || binding.value?.src === binding.oldValue?.src) && binding.value?.error === binding.oldValue?.error) {
        return;
      }

      if (el.getAttribute('lazy-finish') === 'true') {
        const newLazySrc = (typeof binding.value?.src === 'string' ? binding.value?.src : binding.value) || '';
        const newErrorSrc = binding.value?.error || newLazySrc;

        if (el.getAttribute('lazy-error') === 'true') {
          el.src = newErrorSrc;
        } else {
          el.src = newLazySrc;
        }

        return
      }

      const src = el.src || '';
      const lazySrc = (typeof binding.value?.src === 'string' ? binding.value?.src : binding.value) || src;
      if (typeof observer?.observe !== 'function') {
        el.src = lazySrc;
        return;
      }

      if ((typeof binding.value?.loading !== 'string' && typeof binding.value?.loading !== 'object') || binding.value?.loading === '' || binding.value?.loading === null) {
        el.style.opacity = 0;
        el.setAttribute('has-loading-src', false);
      } else {
        el.setAttribute('has-loading-src', true);
      }

      el.setAttribute('lazy-src', lazySrc);
      const errorImg = binding.value?.errorImg || config?.error || src;
      el.setAttribute('lazy-error-img', errorImg);

      el.src = binding.value?.loading || config?.loading || src;

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