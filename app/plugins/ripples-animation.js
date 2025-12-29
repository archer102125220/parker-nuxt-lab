import { Ripples as ripplesAnimation } from '@app/utils/animation/ripples';

/**
 * 建立 IntersectionObserver 來偵測元素可視範圍
 * @param {HTMLElement} el - 要觀察的元素
 * @param {Object} callbacks - 回調函數 { onVisible, onHidden }
 * @returns {IntersectionObserver} observer 實例
 */
function createVisibilityObserver(el, { onVisible, onHidden } = {}) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof onVisible === 'function') onVisible();
        } else {
          if (typeof onHidden === 'function') onHidden();
        }
      });
    },
    {
      // 當元素有任何部分進入視窗時觸發
      threshold: 0
    }
  );

  observer.observe(el);
  return observer;
}

export default defineNuxtPlugin((nuxtApp) => {
  // 基本 Ripples 動畫指令
  const ripplesAnimationDirective = {
    mounted(el, binding) {
      ripplesAnimation.ripples(el, binding.value);

      // 建立可視範圍觀察器
      el._ripplesVisibilityObserver = createVisibilityObserver(el, {
        onVisible: () => {
          // 回復可視範圍，繼續動畫
          ripplesAnimation.ripples(el, 'play');
        },
        onHidden: () => {
          // 超出可視範圍，暫停動畫
          ripplesAnimation.ripples(el, 'pause');
        }
      });
    },
    updated(el, binding) {
      ripplesAnimation.ripples(el, binding.value);
    },
    unmounted(el) {
      // 清理觀察器
      if (el._ripplesVisibilityObserver) {
        el._ripplesVisibilityObserver.disconnect();
        el._ripplesVisibilityObserver = null;
      }
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

      // 標記是否可見
      el._ripplesIsVisible = true;

      /**
       * 啟動自動水滴 interval
       */
      function startAutoDrops() {
        if (el._ripplesAutoDropsInterval) return;

        el._ripplesAutoDropsInterval = setInterval(() => {
          // 如果不可見，則不產生水滴
          if (!el._ripplesIsVisible) return;

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
      }

      /**
       * 停止自動水滴 interval
       */
      function stopAutoDrops() {
        if (el._ripplesAutoDropsInterval) {
          clearInterval(el._ripplesAutoDropsInterval);
          el._ripplesAutoDropsInterval = null;
        }
      }

      // 儲存控制函數
      el._ripplesStartAutoDrops = startAutoDrops;
      el._ripplesStopAutoDrops = stopAutoDrops;

      // 啟動自動水滴
      startAutoDrops();

      // 建立可視範圍觀察器
      el._ripplesVisibilityObserver = createVisibilityObserver(el, {
        onVisible: () => {
          // 回復可視範圍，繼續動畫和自動水滴
          el._ripplesIsVisible = true;
          ripplesAnimation.ripples(el, 'play');
        },
        onHidden: () => {
          // 超出可視範圍，暫停動畫和自動水滴
          el._ripplesIsVisible = false;
          ripplesAnimation.ripples(el, 'pause');
        }
      });
    },
    unmounted(el) {
      // 清理 interval
      if (el._ripplesStopAutoDrops) {
        el._ripplesStopAutoDrops();
      }
      el._ripplesAutoDropsInterval = null;
      el._ripplesStartAutoDrops = null;
      el._ripplesStopAutoDrops = null;

      // 清理觀察器
      if (el._ripplesVisibilityObserver) {
        el._ripplesVisibilityObserver.disconnect();
        el._ripplesVisibilityObserver = null;
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
