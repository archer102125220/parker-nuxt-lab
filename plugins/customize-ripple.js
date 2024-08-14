import _debounce from 'lodash/debounce';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('customize-ripple', {
    // inserted(el) { // 直接使用vue時使用的掛載生命週期
    //   console.log(el);
    // },
    mounted(el) {  // 使用nuxt時使用的客戶端掛載生命週期
      let isSetPosition = false;
      function handleRippleStart(e) {
        el.classList.add('customize_ripple');
        const elementStyle = window.getComputedStyle(el);
        if (elementStyle.position === 'static') {
          el.style.position = 'relative';
          isSetPosition = true;
        }

        // Create span el
        const ripple = document.createElement("span");
        // Add ripple class to span
        ripple.classList.add("customize_ripple-content");
        // Add span to the button
        el.appendChild(ripple);
        ripple.addEventListener('animationend', handleRippleEnd);

        // Get position of X
        const x = e.clientX - e.currentTarget.offsetLeft;
        // Get position of Y
        const y = e.clientY - e.currentTarget.offsetTop;

        // Position the span el
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

      }
      function handleRippleEnd(e) {
        const ripple = e?.target || el.querySelector('.customize_ripple-content');
        if (typeof ripple?.remove === 'function') {
          ripple.remove();
        }
        handleRippleResetStyle();
      }
      const handleRippleResetStyle = _debounce(() => {
        el.classList.remove('customize_ripple');
        if (isSetPosition === true) {
          el.style.position = '';
          isSetPosition = false;
        }
      }, 1000 * 60 * 1)
      el.addEventListener('mousedown', handleRippleStart);
    }
    // getSSRProps(binding, vnode) { // 使用nuxt時使用的伺服器端掛載生命週期
    //   // you can provide SSR-specific props here
    //   return {}
    // }
  });
});