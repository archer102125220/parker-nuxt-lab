import { useAframe } from '@app/aframe/composables/useAframe';
import { useVrStore } from '@app/store/360vrStore';

export function useAframeSkyAnimation(aframeConfig) {
  const aframe = useAframe(aframeConfig);
  const vrStore = useVrStore();
  const componentName = 'aframe-sky-animation';

  watch(
    () => aframe.value.api,
    (newAframe) => {
      handleRegister(newAframe);
    },
    { deep: true }
  );

  function handleRegister(newAframe) {
    if (
      newAframe === null ||
      newAframe.components[componentName] !== undefined
    ) {
      return;
    }

    newAframe.registerComponent(componentName, {
      schema: {},
      init: function () {
        const src = this.el.getAttribute('src');
        const dur = 200;
        this.dur = dur;
        this.oldSrc = src;
        this.vrStore = vrStore;

        // https://aframe.io/docs/1.4.0/components/animation.html
        this.el.setAttribute('animation__001', {
          property: 'material.opacity',
          from: 1,
          to: 0,
          dur,
          easing: 'easeOutQuad',
          loop: false,
          startEvents: 'fadeout',
        });
        this.el.setAttribute('animation__002', {
          property: 'material.opacity',
          from: 0,
          to: 1,
          dur,
          easing: 'easeInQuad',
          loop: false,
          startEvents: 'fadein',
        });
        aframe.value.api.skyAnimationClassName = '__sky_animation';
        this.el.classList.add(aframe.value.api.skyAnimationClassName);
        this.onFadein = this.onFadein.bind(this);
        this.onFadeout = this.onFadeout.bind(this);
        this.el.onFadein = this.onFadein.bind(this);
        this.el.onFadeout = this.onFadeout.bind(this);
        this.el.onFadeout();
        this.el.onFadein();
      },
      onFadein(callback) {
        return new Promise((resolve, reject) => {
          this.el.emit('fadein', null, false);
          setTimeout(() => {
            resolve();
            if (typeof callback === 'function') {
              callback();
            }
            this.vrStore.setVrLoading(false);
          }, this.dur - 40);
        });
      },
      onFadeout(callback) {
        this.vrStore.setVrLoading(true);
        return new Promise((resolve, reject) => {
          this.el.emit('fadeout', null, false);
          setTimeout(() => {
            resolve();
            if (typeof callback === 'function') {
              callback();
            }
          }, this.dur - 40);
        });
      },
      tock: function () {
        const src = this.el.getAttribute('src');
        if (this.oldSrc !== src) {
          this.onFadein();
          this.oldSrc = src;
        }
      },
    });
  }

  return { handleRegister, aframe };
}
