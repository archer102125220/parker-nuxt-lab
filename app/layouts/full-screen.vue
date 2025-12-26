<template>
  <div class="full_screen_layout">
    <LayoutHeader class="full_screen_layout-header" />
    <main class="full_screen_layout-content">
      <slot />
    </main>
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script setup></script>

<style lang="scss">
.full_screen_layout {
  // Positioning
  position: relative;

  // Display & Box Model
  width: 100vw;
  overflow: auto;

  @include mobile {
    overflow: unset;
  }

  &-header {
    // Positioning
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 3;
  }

  &-content {
    // Display & Box Model
    width: 1210px;
    max-width: 100%;
    min-height: 100vh;
    margin: auto;

    // @include mobile {
    //   width: 327px;
    // }

    // @include tabletOnly {
    //   width: calc(100% - 20px);
    //   margin: 20px 10px;
    // }
  }
}
</style>
