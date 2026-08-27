<script setup>
const props = defineProps({
  src: { type: String, default: null },
  htmlTemplateSeletor: { type: String, default: '' },
  iconRotation: { type: String, default: '20 0 0' },
  iconPosition: { type: String, default: '0 -0.5 0' },
  iconScale: { type: String, default: null },
  titlePosition: { type: String, default: '0 0.45 0' },
  titleRotation: { type: String, default: null },
  titleScale: { type: String, default: null },
  linkPath: { type: String, default: '' },
  linkQyery: { type: Object, default: () => ({}) },
  height: { type: String, default: '80px' }
});
const cssVariable = computed(() => {
  const _cssVariable = {};

  if (
    (typeof props.src !== 'string' || props.src === '') &&
    typeof props.height === 'string' &&
    props.height !== ''
  ) {
    _cssVariable['--aframe_link_height'] = props.height;
  }

  return _cssVariable;
});
</script>

<template>
  <!-- aframe-dialog-triggerb若綁定在 a-entity，會因為 a-plane不會將 a-entity 撐開，導致無法觸擊 a-entity ，若要優化事件邦定需直接綁訂於a-plane上-->
  <a-entity v-bind="$attrs" class="aframe_link" :style="cssVariable">
    <slot
      template-class="aframe_link-template"
      title-class="aframe_link-template-title"
      title-tw-class="aframe_link-template-title-tw"
      title-en-class="aframe_link-template-title-en"
    />

    <a-plane
      v-if="src"
      :src="src"
      :aframe-link="`linkPath:${linkPath};linkQyery:${JSON.stringify(
        linkQyery
      )}`"
      data-raycastable=""
    />
    <template v-else>
      <a-plane
        src="#up-icon"
        height="1"
        width="1"
        transparent="true"
        :rotation="iconRotation"
        :position="iconPosition"
        :scale="iconScale"
        :aframe-link="`linkPath:${linkPath};linkQyery:${JSON.stringify(
          linkQyery
        )}`"
        data-raycastable=""
      />
      <a-plane
        v-if="htmlTemplateSeletor"
        :position="titlePosition"
        :rotation="titleRotation"
        :scale="titleScale"
        :material="`shader:html;target:${htmlTemplateSeletor};transparent:true;ratio:height;fps:1;`"
        :aframe-link="`linkPath:${linkPath};linkQyery:${JSON.stringify(
          linkQyery
        )}`"
        data-raycastable=""
      />
    </template>

    <ClientOnly>
      <Teleport to="#vr_engine_layout_assets">
        <img id="down-icon" src="/vr-assets/icons/down.svg" />
        <img id="up-icon" src="/vr-assets/icons/up.svg" />
      </Teleport>
    </ClientOnly>
  </a-entity>
</template>

<style lang="scss">
.aframe_link {
  // --aframe_link_height: 80px;
  &-template {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -2;
    overflow: hidden;
    &-title {
      // height: 80px;
      height: var(--aframe_link_height);
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
      color: #fff;
      font-size: 4rem;
      font-weight: 700;
      font-style: normal;
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
