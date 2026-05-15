<script setup>
// const container = ref(null);

const univerInstance = shallowReactive({
  univer: null,
  univerAPI: null
});

async function handleUniverSheet() {
  try {
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
  <div ref="container" class="univer_doc" />
</template>

<style lang="scss" scoped>
.univer_doc {
  height: 100%;
}
</style>
