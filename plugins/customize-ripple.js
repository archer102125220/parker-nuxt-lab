import '@/style/customize-ripple.scss';

// 可以直接傳入boolean來控制是否啟用，也可傳入{ enabled: boolean }的方式來控制，顏色則可透過{ color: string }的方式做客製化
export default defineNuxtPlugin((nuxtApp) => {
  const customizeRipple = {
    // inserted(el) { // 直接使用vue時使用的掛載生命週期
    //   console.log(el);
    // },
    mounted(el, binding) {  // 使用nuxt時使用的客戶端掛載生命週期
      let enabledRipple = binding.value?.enabled || binding.value;
      if (typeof enabledRipple !== 'boolean') {
        enabledRipple = true;
      }
      el.setAttribute('enabled-ripple', enabledRipple);

      const color = binding.value?.color;
      if (typeof color === 'string' && color !== '') {
        el.style.setProperty('--__ripple_color__', color);
      }

      function handleRippleStart(e) {
        const _enabledRipple = el.getAttribute('enabled-ripple') === 'true';

        if (_enabledRipple === false) return;
        const elementStyle = window.getComputedStyle(el);
        if (elementStyle.position === 'static') {
          el.classList.add('customize_ripple'); // 若綁定的元素上有對className進行判斷調整，則可能會無法將className新增進去
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

        const currentTargeClientRectt = e.currentTarget.getBoundingClientRect();

        // Get position of X
        // const x = e.clientX - e.currentTarget.offsetLeft;
        const x = e.clientX - currentTargeClientRectt.x;
        // Get position of Y
        // const y = e.clientY - e.currentTarget.offsetTop;
        const y = e.clientY - currentTargeClientRectt.y;

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
      let enabledRipple = binding.value?.enabled || binding.value;
      if (typeof enabledRipple !== 'boolean') {
        enabledRipple = true;
      }
      el.setAttribute('enabled-ripple', enabledRipple);

      const color = binding.value?.color;

      if (typeof color === 'string' && color !== '') {
        el.style.setProperty('--__ripple_color__', color);
      } else {
        const rippleColor = el.style.getPropertyValue('--__ripple_color__');
        if (typeof rippleColor === 'string' && rippleColor !== '') {
          el.style.removeProperty('--__ripple_color__');
        }
      }
    },
    // getSSRProps(binding, vnode) { // 使用nuxt時使用的伺服器端掛載生命週期
    //   // you can provide SSR-specific props here
    //   return {}
    // }
  }
  nuxtApp.vueApp.directive('customize-ripple', customizeRipple);
  nuxtApp.vueApp.directive('customizeRipple', customizeRipple);
});