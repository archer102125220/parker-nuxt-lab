<script setup>
const props = defineProps({
  src: { type: String, default: null },
  htmlTemplateSeletor: { type: String, default: '' },
  iconPosition: { type: String, default: '-2.05 0 0.1' },
  iconRotation: { type: String, default: '0 0 0' },
  iconOpacity: { type: String, default: null },
  iconScale: { type: String, default: null },
  titlePosition: { type: String, default: '0 0 0' },
  titleRotation: { type: String, default: '0 0 0' },
  triggerLabelScale: { type: String, default: null },
  dialogVideoTitle: { type: String, default: '' },
  videoSrc: { type: String, default: '' },
  youtubeId: { type: String, default: '' },
  height: { type: String, default: '80px' }
});
const cssVariable = computed(() => {
  const _cssVariable = {};

  if (
    (typeof props.src !== 'string' || props.src === '') &&
    typeof props.height === 'string' &&
    props.height !== ''
  ) {
    _cssVariable['--aframe_dialog_video_trigger_height'] = props.height;
  }

  return _cssVariable;
});
</script>

<template>
  <!-- aframe-dialog-video-trigger若綁定在 a-entity，會因為 a-plane不會將 a-entity 撐開，導致無法觸擊 a-entity ，若要優化事件邦定需直接綁訂於a-plane上-->
  <a-entity
    v-bind="$attrs"
    class="aframe_dialog_video_trigger"
    :style="cssVariable"
  >
    <slot
      template-class="aframe_dialog_video_trigger-template"
      title-class="aframe_dialog_video_trigger-template-title"
      title-tw-class="aframe_dialog_video_trigger-template-title-tw"
      title-en-class="aframe_dialog_video_trigger-template-title-en"
    />
    <a-plane
      v-if="src"
      :src="src"
      :aframe-dialog-video-trigger="`dialogVideoTitle:${dialogVideoTitle};videoSrc:${videoSrc};youtubeId:${youtubeId}`"
      data-raycastable=""
    />
    <template v-else>
      <a-plane
        src="#player-icon"
        :position="iconPosition"
        :rotation="iconRotation"
        :scale="iconScale"
        :opacity="iconOpacity"
        :aframe-dialog-video-trigger="`dialogVideoTitle:${dialogVideoTitle};videoSrc:${videoSrc};youtubeId:${youtubeId}`"
        data-raycastable=""
      />
      <a-plane
        v-if="htmlTemplateSeletor"
        :position="titlePosition"
        :rotation="titleRotation"
        :scale="triggerLabelScale"
        :material="`shader:html;target:${htmlTemplateSeletor};transparent:true;ratio:height;fps:1;`"
        :aframe-dialog-video-trigger="`dialogVideoTitle:${dialogVideoTitle};videoSrc:${videoSrc};youtubeId:${youtubeId}`"
        data-raycastable=""
      />
    </template>

    <ClientOnly>
      <Teleport to="#vr_engine_layout_assets">
        <img id="player-icon" src="/vr-assets/icons/play.svg" />
      </Teleport>
    </ClientOnly>
  </a-entity>
</template>

<style lang="scss">
.aframe_dialog_video_trigger {
  // --aframe_dialog_video_trigger_height: 80px;
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
      // height: 80px;
      height: var(--aframe_dialog_video_trigger_height);
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
      color: #fff;
      font-size: 4rem;
      font-weight: 700;
      font-style: normal;
      padding-left: 70px;
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
