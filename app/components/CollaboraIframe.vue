<script setup>
const props = defineProps({
  token: {
    type: String,
    default: ''
  },
  collaboraHost: {
    type: String,
    default: ''
  },
  fileId: {
    type: String,
    default: ''
  },
  wopiHost: {
    type: String,
    default: import.meta.env.VITE_DOMAIN
  }
});

const loading = ref(true);
const iframeUrl = computed(() => {
  const encodedWopiSrc = encodeURIComponent(
    `${props.wopiHost}/wopi/files/${props.fileId}?token=${props.token}`
  );
  return `${props.collaboraHost}/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}`;
});
</script>

<template>
  <div class="collabora_iframe">
    <SkeletonLoader :loading="loading" class="collabora_iframe-skeleton" />
    <ClientOnly>
      <iframe
        class="collabora_iframe-iframe"
        :src="iframeUrl"
        frameborder="0"
        @load="loading = false"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.collabora_iframe {
  position: relative;

  min-width: 100%;
  min-height: 100%;

  &-skeleton {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    width: 100%;
    height: 100%;
  }

  &-iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
