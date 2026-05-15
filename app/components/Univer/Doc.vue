<script setup>
const container = ref(null);
const loading = ref(true);

const univerInstance = shallowReactive({
  univer: null,
  univerAPI: null
});

async function handleUniverSheet() {
  try {
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
}

onMounted(() => {
  handleUniverSheet();
});

onBeforeUnmount(() => {
  if (typeof univerInstance.univer?.dispose === 'function') {
    univerInstance.univer?.dispose();
  }
  if (typeof univerInstance.univerAPI?.dispose === 'function') {
    univerInstance.univerAPI?.dispose();
  }
  univerInstance.univer = null;
  univerInstance.univerAPI = null;
});
</script>

<template>
  <div class="univer_doc">
    <SkeletonLoader
      v-if="loading"
      :loading="true"
      class="univer_doc-skeleton"
    />
    <div ref="container" class="univer_doc-editor" />
  </div>
</template>

<style lang="scss" scoped>
.univer_doc {
  position: relative;
  height: 100%;

  &-skeleton {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  &-editor {
    height: 100%;
  }
}
</style>
