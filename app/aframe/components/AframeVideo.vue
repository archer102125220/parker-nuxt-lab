<script setup>
const props = defineProps({
  videoId: { type: String, default: null },
  videoSrc: { type: String, default: null },
  title: { type: String, default: null },
  titleHeight: { type: String, default: null },
  titleFontSize: { type: String, default: null },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  btnControlOnly: { type: Boolean, default: false },
  fixed: { type: Boolean, default: false },
  htmlTemplateSeletor: { type: String, default: '' },
  iconRotation: { type: String, default: null },
  iconPosition: { type: String, default: null },
  iconScale: { type: String, default: null },
  titlePosition: { type: String, default: null },
  titleRotation: { type: String, default: null },
  titleScale: { type: String, default: null },
  videoPosition: { type: String, default: null },
  videoRotation: { type: String, default: null },
  videoScale: { type: String, default: null }
});

const _id = useState('__aframe_video_id', () => -1);
_id.value += 1;

const titleId = ref(`aframe_video-title_${_id.value}`);
const playBtnId = ref(`aframe_video-play_${_id.value}`);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.titleHeight === 'string' && props.titleHeight !== '') {
    _cssVariable['--template_height'] = props.titleHeight;
  } else if (props.fixed === true) {
    _cssVariable['--template_height'] = '160px';
  }

  if (typeof props.titleFontSize === 'string' && props.titleFontSize !== '') {
    _cssVariable['--template_font_size'] = props.titleFontSize;
  } else if (props.fixed === true) {
    _cssVariable['--template_font_size'] = '80px';
  }

  return _cssVariable;
});

const stateIconRotation = computed(() => {
  let _stateIconRotation = '0 0 0';

  if (typeof props.iconRotation === 'string' && props.iconRotation !== '') {
    _stateIconRotation = props.iconRotation;
  } else if (props.fixed === true) {
    _stateIconRotation = '0 0 0';
  }

  return _stateIconRotation;
});

const stateIconPosition = computed(() => {
  let _stateIconPosition = '-0.05 0.05 0.01';

  if (typeof props.iconPosition === 'string' && props.iconPosition !== '') {
    _stateIconPosition = props.iconPosition;
  } else if (props.fixed === true) {
    _stateIconPosition = '0.2 0.05 0.25';
  }

  return _stateIconPosition;
});

const stateIconScale = computed(() => {
  let _stateIconScale = '0.5 0.5 0.5';

  if (typeof props.iconScale === 'string' && props.iconScale !== '') {
    _stateIconScale = props.iconScale;
  } else if (props.fixed === true) {
    _stateIconScale = '0.5 0.5 0.5';
  }

  return _stateIconScale;
});

const stateTitlePosition = computed(() => {
  let _stateTitlePosition = '0 0.7 0';

  if (typeof props.titlePosition === 'string' && props.titlePosition !== '') {
    _stateTitlePosition = props.titlePosition;
  } else if (props.fixed === true) {
    _stateTitlePosition = '0 0.7 0';
  }

  return _stateTitlePosition;
});

const stateTitleRotation = computed(() => {
  let _stateTitleRotation = '0 0 0';

  if (typeof props.titleRotation === 'string' && props.titleRotation !== '') {
    _stateTitleRotation = props.titleRotation;
  } else if (props.fixed === true) {
    _stateTitleRotation = '0 0 0';
  }

  return _stateTitleRotation;
});

const stateTitleScale = computed(() => {
  let _stateTitleScale = '0.3 0.3 0.3';

  if (typeof props.titleScale === 'string' && props.titleScale !== '') {
    _stateTitleScale = props.titleScale;
  } else if (props.fixed === true) {
    _stateTitleScale = '0.3 0.3 0.3';
  }

  return _stateTitleScale;
});
</script>

<template>
  <a-entity v-bind="$attrs" class="aframe_video" :style="cssVariable">
    <slot
      template-class="aframe_video-template"
      title-class="aframe_video-template-title"
      title-tw-class="aframe_video-template-title-tw"
      title-en-class="aframe_video-template-title-en"
      :title-id="titleId"
    >
      <div class="aframe_video-template">
        <p :id="titleId" class="aframe_video-template-title">
          {{ title }}
        </p>
      </div>
    </slot>
    <a-plane
      :position="stateTitlePosition"
      :rotation="stateTitleRotation"
      :scale="stateTitleScale"
      :material="`shader:html;target:#${titleId};transparent:true;ratio:height;fps:1;`"
    />
    <a-plane
      :id="playBtnId"
      src="#video_play-icon"
      :rotation="stateIconRotation"
      :position="stateIconPosition"
      :scale="stateIconScale"
      shader="flat"
      transparent="true"
    />
    <a-video
      :src="`#${videoId}`"
      :position="videoPosition"
      :rotation="videoRotation"
      :scale="videoScale"
      transparent="false"
      :autoplay="autoplay"
      :video-control="`autoplay: ${autoplay};loop: ${loop};playBtnId: ${playBtnId};btnControlOnly: ${btnControlOnly};`"
    />
    <ClientOnly>
      <Teleport to="#vr_engine_layout_assets">
        <img
          id="video_play-icon"
          src="/vr-assets/icons/video_play-button.svg"
        />
        <video :id="videoId" :src="videoSrc" :autoplay="autoplay" />
      </Teleport>
    </ClientOnly>
  </a-entity>
</template>

<style lang="scss">
.aframe_video {
  --template_height: 80px;
  --template_font_size: 40px;
  width: auto;
  // max-width: unset;
  white-space: nowrap;
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
      font-size: var(--template_font_size);
      font-style: normal;
      font-size: 4rem;
      font-weight: 700;
      text-align: center;
      p {
        padding: 0;
        margin: 0;
      }
      &-tw {
        font-size: 32px;
        // font-weight: 700;
      }
      &-en {
        font-size: 28px;
        font-weight: 400;
      }
    }
  }
}
</style>
