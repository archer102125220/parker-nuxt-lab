export default defineNuxtPlugin((nuxtApp) => {
  const customizeRipple = {
    // inserted(el) { // 直接使用vue時使用的掛載生命週期
    //   console.log(el);
    // },
    mounted(el, binding) {  // 使用nuxt時使用的客戶端掛載生命週期
      el.setAttribute('disable-ripple', binding.value);

      function handleRippleStart(e) {
        const disableRipple = el.getAttribute('disable-ripple') === 'true';

        if (disableRipple === true) return;
        const elementStyle = window.getComputedStyle(el);
        if (elementStyle.position === 'static') {
          el.classList.add('customize_ripple');  // 若綁定的元素上有對className進行判斷調整，則可能會無法將className新增進去
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
        if (el.querySelectorAll('.customize_ripple-block').length <= 0) {
          handleRippleResetStyle();
        }
      }
      function handleRippleResetStyle() {
        if (typeof el?.getAttribute !== 'function') return;
        const isSetPosition = el.getAttribute('isSetPosition') === 'true';
        if (isSetPosition === true) {
          el.classList.remove('click_ripple'); // 若綁定的元素上有對className進行判斷調整，則可能會無法將className新增進去
          el.style.position = '';
          el.setAttribute('isSetPosition', 'false');
        }
      }

      el.addEventListener('pointerdown', handleRippleStart);
    },
    updated(el, binding) {
      el.setAttribute('disable-ripple', binding.value);
    },
    // getSSRProps(binding, vnode) { // 使用nuxt時使用的伺服器端掛載生命週期
    //   // you can provide SSR-specific props here
    //   return {}
    // }
  }
  nuxtApp.vueApp.directive('customize-ripple', customizeRipple);
  nuxtApp.vueApp.directive('customizeRipple', customizeRipple);
});