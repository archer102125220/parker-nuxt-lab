<script setup>
import SkeletonLoader from '@app/components/SkeletonLoader.vue';
const RemoteFederationUniverDoc = defineAsyncComponent(
  () => import('parker-vue-lab-federation/UniverDocEditor'),
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
  <div class="federation_univer_doc" :class="props.class">
    <ClientOnly>
      <RemoteFederationUniverDoc v-bind="$attrs" />
      <template #placeholder>
        <SkeletonLoader
          :loading="true"
          class="federation_univer_doc-skeleton"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.federation_univer_doc {
  // display: flex;
  // flex-direction: column;
  // flex: 1;
  height: 100%;

  // &:deep(.univer_doc),
  // .univer_doc {
  //   flex: 1;
  //   height: 100%;
  // }

  &-skeleton {
    width: 100%;
    height: 100%;
  }
}
</style>
