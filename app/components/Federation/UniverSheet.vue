<script setup>
import SkeletonLoader from '@app/components/SkeletonLoader.vue';

const isReady = ref(false);
let fallbackTimer = null;

const RemoteFederationUniverSheet = defineAsyncComponent({
  loader: () => import('parker-vue-lab-federation/UniverSheetEditor'),
  loadingComponent: SkeletonLoader,
  delay: 0
});

const props = defineProps({
  class: {
    type: [Object, String, Array],
    default: null
  }
});

const handleReady = () => {
  isReady.value = true;
  if (fallbackTimer !== null) {
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
};

const handleRemoteMounted = () => {
  // 如果遠端組件沒有拋出 ready 事件，設定一個 3 秒的兜底機制強制顯示
  fallbackTimer = setTimeout(() => {
    if (!isReady.value) {
      isReady.value = true;
    }
  }, 3000);
};

onBeforeUnmount(() => {
  if (fallbackTimer !== null) {
    clearTimeout(fallbackTimer);
  }
});
</script>

<template>
  <div class="federation_univer_sheet" :class="props.class">
    <ClientOnly>
      <div v-show="isReady" class="federation_univer_sheet-wrapper">
        <RemoteFederationUniverSheet
          v-bind="$attrs"
          @ready="handleReady"
          @univer-steady="handleReady"
          @vue:mounted="handleRemoteMounted"
        />
      </div>

      <SkeletonLoader
        v-if="!isReady"
        :loading="true"
        class="federation_univer_sheet-skeleton"
      />

      <template #placeholder>
        <SkeletonLoader
          :loading="true"
          class="federation_univer_sheet-skeleton"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.federation_univer_sheet {
  position: relative;
  height: 100%;

  &-wrapper {
    width: 100%;
    height: 100%;
  }

  &-skeleton {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
