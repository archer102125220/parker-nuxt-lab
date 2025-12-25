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
// const { $pwa } = nuxtApp;
// onMounted(() => {
//   console.log({ $pwa });
// });

const { $ripplesAnimation } = useNuxtApp();

onMounted(() => {
  console.log('layout default mounted');
  $ripplesAnimation.ripples('body', {
    resolution: 512,
    dropRadius: 20, //px
    perturbance: 0.04
  });

  // Automatic drops
  setInterval(() => {
    console.log('automatic drops');
    const $el = document.querySelector('main');
    const x = Math.random() * $el.getBoundingClientRect().width;
    const y = Math.random() * $el.getBoundingClientRect().height;
    const dropRadius = 20;
    const strength = 0.04 + Math.random() * 0.04;
    $ripplesAnimation.ripples('main', 'drop', x, y, dropRadius, strength);
  }, 400);
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
    width: 90%;
    margin: auto;
    padding: 8px;

    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
