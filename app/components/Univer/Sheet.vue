<script lang="ts" setup>
import type { UniverSheetsInstance } from '@app/utils/third-party/univer/univer-sheets';
const container = ref<HTMLDivElement | null>(null);

const univerInstance = shallowReactive<UniverSheetsInstance>({
  univer: null,
  univerAPI: null
});

async function handleUniverSheet() {
  try {
    const { createUniverInstance } = await import(
      '@app/utils/third-party/univer/univer-sheets'
    );
    const { univer, univerAPI } = await createUniverInstance(
      container.value as HTMLDivElement
    );

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
  univerInstance.univer?.dispose();
  univerInstance.univerAPI?.dispose();
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
