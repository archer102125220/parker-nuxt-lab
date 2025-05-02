<template>
  <div class="home_layout">
    <LayoutHeader :has-back="false" />
    <main class="home_layout-content">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
const { $pwa } = useNuxtApp();
onMounted(() => {
  console.log({ $pwa });
});
</script>

<style lang="scss" scoped>
.home_layout {
  display: flex;
  flex-direction: column;

  min-height: 100dvh;

  &-content {
    flex: 1;
    // min-height: 100vh;
    width: 80%;
    margin: auto;
  }
}
</style>
