<template>
  <a-entity v-bind="$attrs" class="aframe_sky_video" :style="cssVariable">
    <a-videosphere
      :src="`#${videoId}`"
      :autoplay="autoplay"
      :video-control="`autoplay: ${autoplay};loop: ${loop};playBtnId: ${playBtnId};pauseBtnId: ${pauseBtnId};vrPlayBtnId: ${vrPlayBtnId};vrPauseBtnId: ${vrPauseBtnId};btnControlOnly: ${btnControlOnly};`"
    />
    <a-plane
      :id="vrPlayBtnId"
      src="#sky_video-play_icon"
      :rotation="statePlayIconRotation"
      :position="statePlayIconPosition"
      :scale="statePlayIconScale"
      shader="flat"
      transparent="true"
      visible="true"
      data-raycastable=""
    />
    <a-plane
      :id="vrPauseBtnId"
      src="#sky_video-pause_icon"
      :rotation="statePauseIconRotation"
      :position="statePauseIconPosition"
      :scale="statePauseIconScale"
      shader="flat"
      transparent="true"
      visible="false"
      data-raycastable=""
    />
    <ClientOnly>
      <Teleport to="#vr_engine_layout_assets">
        <img
          id="sky_video-play_icon"
          src="/vr-assets/icons/video_play-button.svg"
        />
        <img
          id="sky_video-pause_icon"
          src="/vr-assets/icons/video_pause-button.svg"
        />
      </Teleport>
      <Teleport to="#vr_engine-camera">
        <a-plane
          :id="playBtnId"
          src="#sky_video-play_icon"
          :rotation="statePlayIconRotation"
          :position="statePlayIconPosition"
          :scale="statePlayIconScale"
          shader="flat"
          transparent="true"
          visible="true"
          data-raycastable=""
        />
        <a-plane
          :id="pauseBtnId"
          src="#sky_video-pause_icon"
          :rotation="statePauseIconRotation"
          :position="statePauseIconPosition"
          :scale="statePauseIconScale"
          shader="flat"
          transparent="true"
          visible="false"
          data-raycastable=""
        />
      </Teleport>
    </ClientOnly>
  </a-entity>
</template>

<script setup>
import { useVrStore } from '@/store/360vrStore';
import { useSystemStore } from '@/store/system';

const props = defineProps({
  videoId: { type: String, default: null },
  autoplay: { type: Boolean, default: true },
  loop: { type: Boolean, default: false },
  btnControlOnly: { type: Boolean, default: true },
  playIconRotation: { type: String, default: null },
  playIconPosition: { type: String, default: null },
  playIconScale: { type: String, default: null },
  pauseIconRotation: { type: String, default: null },
  pauseIconPosition: { type: String, default: null },
  pauseIconScale: { type: String, default: null }
});

const vrStore = useVrStore();
const systemStore = useSystemStore();

const _id = useState('__aframe_sky_video_id', () => -1);
_id.value += 1;

const playBtnId = ref(`aframe_sky_video-play_${_id.value}`);
const pauseBtnId = ref(`aframe_sky_video-pause_${_id.value}`);
const vrPlayBtnId = ref(`aframe_sky_video-vr_play_${_id.value}`);
const vrPauseBtnId = ref(`aframe_sky_video-vr_pause_${_id.value}`);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.titleHeight === 'string' && props.titleHeight !== '') {
    _cssVariable['--template_height'] = props.titleHeight;
  }

  if (typeof props.titleFontSize === 'string' && props.titleFontSize !== '') {
    _cssVariable['--template_font_size'] = props.titleFontSize;
  }

  return _cssVariable;
});

const statePlayIconRotation = computed(() => {
  let _statePlayIconRotation = '0 0 0';

  if (
    typeof props.playIconRotation === 'string' &&
    props.playIconRotation !== ''
  ) {
    _statePlayIconRotation = props.playIconRotation;
  }

  return _statePlayIconRotation;
});

const statePlayIconPosition = computed(() => {
  let _statePlayIconPosition = '0 0 -0.25';

  if (
    typeof props.playIconPosition === 'string' &&
    props.playIconPosition !== ''
  ) {
    _statePlayIconPosition = props.playIconPosition;
  } else if (vrStore.isVrArMode === true) {
    _statePlayIconPosition = '0 1.5 -1.5';
  }

  return _statePlayIconPosition;
});

const statePlayIconScale = computed(() => {
  let _statePlayIconScale = '0.2 0.2 0.2';

  if (typeof props.playIconScale === 'string' && props.playIconScale !== '') {
    _statePlayIconScale = props.playIconScale;
  } else if (vrStore.isVrArMode === true) {
    _statePlayIconScale = '1 1 1';
  } else if (systemStore.isMobile === true) {
    _statePlayIconScale = '0.1 0.1 0.1';
  }

  return _statePlayIconScale;
});

const statePauseIconRotation = computed(() => {
  let _statePauseIconRotation = '0 0 0';

  if (
    typeof props.pauseIconRotation === 'string' &&
    props.pauseIconRotation !== ''
  ) {
    _statePauseIconRotation = props.pauseIconRotation;
  }

  return _statePauseIconRotation;
});

const statePauseIconPosition = computed(() => {
  let _statePauseIconPosition = '-0.4 -0.18 -0.25';

  if (
    typeof props.pauseIconPosition === 'string' &&
    props.pauseIconPosition !== ''
  ) {
    _statePauseIconPosition = props.pauseIconPosition;
  } else if (vrStore.isVrArMode === true) {
    _statePauseIconPosition = '-1.5 1.5 -2';
  } else if (systemStore.isTabletOnly === true) {
    _statePauseIconPosition = '-0.13 -0.08 -0.25';
  } else if (systemStore.isMobile === true) {
    _statePauseIconPosition = '-0.05 -0.12 -0.25';
  }

  return _statePauseIconPosition;
});

const statePauseIconScale = computed(() => {
  let _statePauseIconScale = '0.05 0.05 0.05';

  if (typeof props.pauseIconScale === 'string' && props.pauseIconScale !== '') {
    _statePauseIconScale = props.pauseIconScale;
  } else if (vrStore.isVrArMode === true) {
    _statePauseIconScale = '1 1 1';
  }

  return _statePauseIconScale;
});
</script>

<style lang="scss">
.aframe_sky_video {
  --template_height: 80px;
  --template_font_size: 40px;
  &-template {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -2;
    overflow: hidden;
    &-title {
      height: var(--template_height);
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
      color: #fff;
      font-family: Noto Sans TC;
      font-size: var(--template_font_size);
      font-style: normal;
      font-weight: 700;
      letter-spacing: 2px;
      text-align: center;
    }
  }
}
</style>
