import { useAframe } from '@app/aframe/hooks/useAframe';
import { useVrStore } from '@app/store/360vrStore';

export function useVideoControl(aframeConfig) {
  const aframe = useAframe(aframeConfig);
  const vrStore = useVrStore();
  const componentName = 'video-control';

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
      schema: {
        autoplay: { type: 'boolean', default: false },
        loop: { type: 'boolean', default: false },
        playBtnId: { type: 'string' },
        pauseBtnId: { type: 'string' },
        vrPlayBtnId: { type: 'string' },
        vrPauseBtnId: { type: 'string' },
        btnControlOnly: { type: 'boolean', default: false },
      },
      init: function () {
        this.onCanplay = this.onCanplay.bind(this);
        this.onTriggerClick = this.onTriggerClick.bind(this);
        this.onEnded = this.onEnded.bind(this);
        this.handleAttribute = this.handleAttribute.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleVrBtn = this.handleVrBtn.bind(this);
        this.handleBtn = this.handleBtn.bind(this);
        this.handleAttribute();

        const videoSrc = this.el.getAttribute('src');
        let videoEl = null;
        try {
          videoEl = document.querySelector(videoSrc);
        } catch (error) {
          console.log(error);
        }

        const btnControlOnly = this.data.btnControlOnly;
        const playBtnId = this.data.playBtnId;
        let playBtnEl = null;
        if (typeof playBtnId === 'string' && playBtnId !== '') {
          try {
            playBtnEl = document.querySelector(`#${playBtnId}`);
            playBtnEl.addEventListener('click', (...arg) =>
              this.onTriggerClick(playBtnEl, ...arg)
            );
          } catch (error) {
            console.log(error);
          }
        }

        if (btnControlOnly === true && playBtnEl === null) {
          console.warn('miss play button');
        }

        const pauseBtnId = this.data.pauseBtnId;
        let pauseBtnEl = null;
        if (typeof pauseBtnId === 'string' && pauseBtnId !== '') {
          try {
            pauseBtnEl = document.querySelector(`#${pauseBtnId}`);
            pauseBtnEl.addEventListener('click', (...arg) =>
              this.onTriggerClick(pauseBtnEl, ...arg)
            );
          } catch (error) {
            console.log(error);
          }
        }

        if (btnControlOnly === true && pauseBtnEl === null) {
          console.warn('miss pause button');
        }

        const vrPlayBtnId = this.data.vrPlayBtnId;
        let vrPlayBtnEl = null;
        if (typeof vrPlayBtnId === 'string' && vrPlayBtnId !== '') {
          try {
            vrPlayBtnEl = document.querySelector(`#${vrPlayBtnId}`);
            vrPlayBtnEl.addEventListener('click', (...arg) =>
              this.onTriggerClick(vrPlayBtnEl, ...arg)
            );
          } catch (error) {
            console.log(error);
          }
        }

        if (btnControlOnly === true && vrPlayBtnEl === null) {
          console.warn('miss play vr button');
        }

        const vrPauseBtnId = this.data.vrPauseBtnId;
        let vrPauseBtnEl = null;
        if (typeof vrPauseBtnId === 'string' && vrPauseBtnId !== '') {
          try {
            vrPauseBtnEl = document.querySelector(`#${vrPauseBtnId}`);
            vrPauseBtnEl.addEventListener('click', (...arg) =>
              this.onTriggerClick(vrPauseBtnEl, ...arg)
            );
          } catch (error) {
            console.log(error);
          }
        }

        if (btnControlOnly === true && vrPauseBtnEl === null) {
          console.warn('miss pause vr button');
        }

        this.playTrigger = false;
        this.playing = false;
        this.vrStore = vrStore;
        this.videoSrc = videoSrc;
        this.videoEl = videoEl;
        this.playerEl = videoEl || this.el;
        this.playBtnEl = playBtnEl;
        this.pauseBtnEl = pauseBtnEl;
        this.vrPlayBtnEl = vrPlayBtnEl;
        this.vrPauseBtnEl = vrPauseBtnEl;

        if (this.data.btnControlOnly === false) {
          this.el.addEventListener('click', (...arg) =>
            this.onTriggerClick(this.el, ...arg)
          );
        }
        this.playerEl.addEventListener('ended', this.onEnded);
        this.playerEl.addEventListener('canplay', this.onCanplay, false);
        this.playerEl.load();
      },
      tock() {
        if (this.playTrigger === true && this.playing === false) {
          this.handlePlay();
        } else if (this.playTrigger === false && this.playing === true) {
          this.handlePause();
        }
        if (this.vrStore.isVrArMode === true) {
          if (this.playBtnEl) {
            this.playBtnEl.setAttribute('visible', false);
            this.playBtnEl.visible = false;
          }
          if (this.pauseBtnEl) {
            this.pauseBtnEl.setAttribute('visible', false);
            this.pauseBtnEl.visible = false;
          }
          this.handleVrBtn(!this.playing);
        } else {
          if (this.vrPlayBtnEl) {
            this.vrPlayBtnEl.setAttribute('visible', false);
            this.vrPlayBtnEl.visible = false;
          }
          if (this.vrPauseBtnEl) {
            this.vrPauseBtnEl.setAttribute('visible', false);
            this.vrPauseBtnEl.visible = false;
          }
          this.handleBtn(!this.playing);
        }
      },

      onCanplay(e) {
        if (this.data.autoplay === true) {
          // if (e.composed === false) {
          //   return setTimeout(() => this.onLoadeddata(e), 100);
          // }
          // this.playTrigger = true;
          // this.playing = false;
          this.handlePlay();
          // this.el.click();
        }
      },
      onTriggerClick: function (target) {
        console.log('onTriggerClick');
        const visible = target.getAttribute('visible') || target.visible;
        const id = target.getAttribute('id') || target.id;
        if (
          this.vrStore.isVrArMode === true &&
          (this.data.vrPlayBtnId === id || this.data.vrPauseBtnId === id) &&
          visible !== true
        ) {
          return;
        } else if (
          this.vrStore.isVrArMode === false &&
          (this.data.playBtnId === id || this.data.pauseBtnId === id) &&
          visible !== true
        ) {
          return;
        }
        this.playTrigger = !this.playTrigger;
      },
      onEnded: function () {
        if (this.data.loop === true) {
          this.playTrigger = true;
          this.playing = false;
        } else {
          this.playTrigger = false;
          this.playing = false;
          if (this.vrStore.isVrArMode === true) {
            this.handleVrBtn(true);
          } else {
            this.handleBtn(true);
          }
        }
      },
      handleBtn(palyBtnVisible = true) {
        if (this.playBtnEl) {
          this.playBtnEl.setAttribute('visible', palyBtnVisible);
          this.playBtnEl.visible = palyBtnVisible;
        }
        if (this.pauseBtnEl) {
          this.pauseBtnEl.setAttribute('visible', !palyBtnVisible);
          this.pauseBtnEl.visible = !palyBtnVisible;
        }
      },
      handleVrBtn(palyBtnVisible = true) {
        if (this.vrPlayBtnEl) {
          this.vrPlayBtnEl.setAttribute('visible', palyBtnVisible);
          this.vrPlayBtnEl.visible = palyBtnVisible;
        }
        if (this.vrPauseBtnEl) {
          this.vrPauseBtnEl.setAttribute('visible', !palyBtnVisible);
          this.vrPauseBtnEl.visible = !palyBtnVisible;
        }
      },
      handleAttribute() {
        if (this.data.btnControlOnly === false) {
          this.el.setAttribute('data-raycastable', '');
        }
        this.el.loop = this.data.loop;
        this.el.setAttribute('loop', this.data.loop);
        this.el.autoplay = this.data.autoplay;
        this.el.setAttribute('autoplay', this.data.autoplay);
        if (this.videoEl) {
          this.videoEl.loop = this.data.loop;
          this.videoEl.setAttribute('loop', this.data.loop);
          this.videoEl.autoplay = this.data.autoplay;
          this.videoEl.setAttribute('autoplay', this.data.autoplay);
        }
        if (this.playBtnEl) {
          this.playBtnEl.setAttribute('data-raycastable', '');
        }
        if (this.pauseBtnEl) {
          this.pauseBtnEl.setAttribute('data-raycastable', '');
        }
      },
      handlePlay() {
        this.playerEl.play();
        this.playing = true;
        if (this.vrStore.isVrArMode === true) {
          this.handleVrBtn(false);
        } else {
          this.handleBtn(false);
        }
      },
      handlePause() {
        this.playerEl.pause();
        this.playing = false;
        if (this.vrStore.isVrArMode === true) {
          this.handleVrBtn(true);
        } else {
          this.handleBtn(true);
        }
      },
    });
  }

  return { handleRegister, aframe };
}
