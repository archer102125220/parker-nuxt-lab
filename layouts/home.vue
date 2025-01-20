<template>
  <div class="home_layout">
    <main class="home_layout-content">
      <slot />
    </main>
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home_layout {
  &-content {
    min-height: 100vh;
    width: 80%;
    margin: auto;
  }
}
</style>
