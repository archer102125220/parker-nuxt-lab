export function handleBindScrollEnd(el, handler, wait = 100) {
  if (typeof el?.addEventListener !== 'function') {
    console.error('missing scroll end element');
    return;
  }
  if (typeof handler !== 'function') {
    console.error('missing scroll end handler');
    return;
  }

  if ('onscrollend' in el) {
    function handleScrollEnd(...arg) {
      setTimeout(() => handler(...arg), wait);
    }
    el.addEventListener('scrollend', handleScrollEnd);
    return () => el.removeEventListener('scrollend', handleScrollEnd);
  }

  let setTimeoutTimer = 0;
  function bindScrollEnd(...arg) {
    if (setTimeoutTimer !== 0) {
      clearTimeout(setTimeoutTimer);
      setTimeoutTimer = 0;
    }

    setTimeoutTimer = setTimeout(() => {
      setTimeoutTimer = 0;
      handler(...arg);
    }, wait);
  }
  el.addEventListener('scroll', bindScrollEnd);

  return () => el.removeEventListener('scroll', bindScrollEnd);
}

export function createScrollEndEvent(wait = 100) {
  let setTimeoutTimer = 0;

  return function detectScrollEnd(event) {
    if (setTimeoutTimer !== 0) {
      clearTimeout(setTimeoutTimer);
      setTimeoutTimer = 0;
    }

    setTimeoutTimer = setTimeout(() => {
      const scrollEnd = new CustomEvent('scrollend', {
        bubbles: true,
        detail: event
      });
      event.target.dispatchEvent(scrollEnd);
    }, wait);
  };
}

export function handlePolyfillScrollEnd(wait = 100) {
  if (typeof window === 'undefined') return;
  if ('onscrollend' in window) return;

  document.addEventListener('scroll', createScrollEndEvent(wait));
}

export default handleBindScrollEnd;