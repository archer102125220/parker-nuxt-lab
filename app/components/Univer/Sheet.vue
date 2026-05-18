<script setup>
const container = ref(null);
const loading = ref(true);

const univerInstance = shallowReactive({
  univer: null,
  univerAPI: null
});

async function handleUniverSheet() {
  try {
    const { createUniverInstance } = await import(
      '@/app/utils/third-party/univer/create-sheet'
    );
    const { univer, univerAPI } = await createUniverInstance(container.value);

    univerAPI.createWorkbook({});

    univerInstance.univer = univer;
    univerInstance.univerAPI = univerAPI;
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
  <div class="univer_sheet">
    <SkeletonLoader
      v-if="loading"
      :loading="true"
      class="univer_sheet-skeleton"
    />
    <div ref="container" class="univer_sheet-editor" />
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet {
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
