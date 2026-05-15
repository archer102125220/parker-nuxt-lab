<script setup>
const container = ref(null);

const univerInstance = shallowReactive({
  univer: null,
  univerAPI: null
});

async function handleUniverSheet() {
  try {
    const { createUniverInstance } = await import(
      '@app/utils/third-party/univer/univer-sheets'
    );
    const { univer, univerAPI } = await createUniverInstance(container.value);

    univerAPI.createWorkbook({});

    univerInstance.univer = univer;
    univerInstance.univerAPI = univerAPI;
  } catch (error) {
    console.error(error);
  }
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
  <div ref="container" class="univer_sheet" />
</template>

<style lang="scss" scoped>
.univer_sheet {
  height: 100%;
}
</style>
