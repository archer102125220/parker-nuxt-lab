<script setup>
import SkeletonLoader from '@app/components/SkeletonLoader.vue';
const RemoteFederationUniverSheet = defineAsyncComponent(
  () => import('parker-vue-lab-federation/UniverSheetEditor'),
  {
    ssr: false,
    loadingComponent: SkeletonLoader
  }
);

const props = defineProps({
  class: {
    type: [Object, String, Array],
    default: null
  }
});
</script>

<template>
  <div class="federation_univer_sheet" :class="props.class">
    <ClientOnly>
      <RemoteFederationUniverSheet v-bind="$attrs" />
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
  // display: flex;
  // flex-direction: column;
  // flex: 1;
  height: 100%;

  // &:deep(.univer_sheet),
  // .univer_sheet {
  //   flex: 1;
  //   height: 100%;
  // }

  &-skeleton {
    width: 100%;
    height: 100%;
  }
}
</style>
