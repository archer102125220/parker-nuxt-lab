import _debounce from 'lodash/debounce';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('customize-ripple', {
    // inserted(el) { // 直接使用vue時使用的掛載生命週期
    //   console.log(el);
    // },
    mounted(el) {  // 使用nuxt時使用的客戶端掛載生命週期
      function handleRippleStart(e) {
        // el.classList.add('customize_ripple');
        const elementStyle = window.getComputedStyle(el);
        if (elementStyle.position === 'static') {
          el.style.position = 'relative';
          el.setAttribute('isSetPosition', true);
        }

        const rippleBlock = document.createElement("span");
        rippleBlock.classList.add("customize_ripple-block");
        const ripple = document.createElement("span");
        ripple.classList.add("customize_ripple-block-content");
        rippleBlock.appendChild(ripple);
        el.appendChild(rippleBlock);

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
        const rippleBlock = el.querySelector('.customize_ripple-block');
        if (typeof rippleBlock?.remove === 'function') {
          rippleBlock.remove();
        }
        handleRippleResetStyle();
      }
      const handleRippleResetStyle = _debounce(() => {
        if (typeof el?.getAttribute !== 'function') return;
        // el.classList.remove('customize_ripple');
        const isSetPosition = el.getAttribute('isSetPosition') === 'true';
        if (isSetPosition === true) {
          el.style.position = '';
          el.setAttribute('isSetPosition', false);
        }
      }, 1000 * 60 * 1);
      el.addEventListener('pointerdown', handleRippleStart);
    }
    // getSSRProps(binding, vnode) { // 使用nuxt時使用的伺服器端掛載生命週期
    //   // you can provide SSR-specific props here
    //   return {}
    // }
  });
});