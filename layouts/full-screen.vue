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
  position: relative;
  // height: 100vh;
  width: 100vw;
  // width: 1210px;
  // margin: auto;
  overflow: auto;
  @include mobile {
    // height: auto;
    overflow: unset;
    // width: 327px;
  }

  &-header {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 3;
  }
  &-content {
    width: 1210px;
    max-width: 100%;
    min-height: 100vh;
    // margin: 0 40px;
    margin: auto;
    @include mobile {
      width: 327px;
      // margin: 0 20px;
    }
    @include tabletOnly {
      width: calc(100% - 20px);
      margin: 20px 10px;
    }
  }
}
</style>
