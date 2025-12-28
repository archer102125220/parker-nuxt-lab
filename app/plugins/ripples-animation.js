import { Ripples as ripplesAnimation } from '@app/utils/animation/ripples';

export default defineNuxtPlugin((nuxtApp) => {
  // 基本 Ripples 動畫指令
  const ripplesAnimationDirective = {
    mounted(el, binding) {
      ripplesAnimation.ripples(el, binding.value);
    },
    updated(el, binding) {
      ripplesAnimation.ripples(el, binding.value);
    }
  };

  // 自動水滴效果指令
  const ripplesAutoDropsDirective = {
    mounted(el, binding) {
      const options = {
        interval: 400, // 水滴間隔 (ms)
        dropRadius: 20, // 水滴半徑
        strength: 0.04, // 基礎強度
        strengthVariance: 0.04, // 強度變化範圍
        ...(typeof binding.value === 'object' ? binding.value : {})
      };

      if (el.ripple === undefined) {
        ripplesAnimation.ripples(el, options);
      }

      // 儲存 interval ID 以便清理
      el._ripplesAutoDropsInterval = setInterval(() => {
        const rect = el.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const strength =
          options.strength + Math.random() * options.strengthVariance;

        ripplesAnimation.ripples(
          el,
          'drop',
          x,
          y,
          options.dropRadius,
          strength
        );
      }, options.interval);
    },
    unmounted(el) {
      // 清理 interval
      if (el._ripplesAutoDropsInterval) {
        clearInterval(el._ripplesAutoDropsInterval);
        el._ripplesAutoDropsInterval = null;
      }
    }
  };

  // 註冊指令
  nuxtApp.vueApp.directive('ripples-animation', ripplesAnimationDirective);
  nuxtApp.vueApp.directive('ripplesAnimation', ripplesAnimationDirective);
  nuxtApp.vueApp.directive('ripples-auto-drops', ripplesAutoDropsDirective);
  nuxtApp.vueApp.directive('ripplesAutoDrops', ripplesAutoDropsDirective);

  return {
    provide: {
      ripplesAnimation
    }
  };
});
