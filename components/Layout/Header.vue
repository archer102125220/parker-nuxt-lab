<template>
  <header class="layout_header">
    <v-btn
      v-if="hasBack === true"
      class="layout_header-back"
      size="x-small"
      color="primary"
      variant="outlined"
      icon="mdi-chevron-left"
      @click="handleGoBack"
    />
    <div class="layout_header-name">
      <img
        class="layout_header-name-logo"
        v-lazy="'/img/icon/NuxtRock.v.02.svg'"
      />
      <p class="layout_header-name-label">Parker Chen 的Nuxt實驗室</p>
    </div>
  </header>
</template>
<script setup>
const router = useRouter();

const props = defineProps({
  hasBack: { type: Boolean, default: true }
});

function handleGoBack() {
  router.back();
}
</script>

<style lang="scss" scoped>
.layout_header {
  // position: relative;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  // margin: 8px;
  padding: 8px 16px;

  background-color: #f8f9fa;

  &-back {
    // position: absolute;
    // left: 0px;
    // top: 0;
    font-size: 24px;
  }

  &-name {
    flex: 1;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 13px;

    padding-left: 8px;

    &-logo {
      height: 30px;
      width: 30px;
      object-fit: contain;
    }

    &-name {
      font-size: 24px;
      color: #343a40;
      margin: 0;
    }
  }
}
</style>
