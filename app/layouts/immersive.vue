<template>
  <div class="immersive_layout">
    <!-- 返回按鈕 -->
    <NuxtLink
      :to="localePath('/')"
      class="immersive_layout-back"
    >
      <v-icon icon="mdi-arrow-left" size="24" />
      <span class="immersive_layout-back-text">{{ $t('system.defaultTitle') }}</span>
    </NuxtLink>

    <!-- 全屏內容區 -->
    <main class="immersive_layout-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>

<style lang="scss">
.immersive_layout {
  // Positioning
  position: relative;

  // Display & Box Model
  width: 100vw;
  height: 100dvh;
  overflow: hidden;

  // Visual
  background: #000;

  &-back {
    // Positioning
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 100;

    // Display & Box Model
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 24px;

    // Typography
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);

    // Visual
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);

    // Animation
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    &-text {
      // Typography
      font-size: 14px;
      font-weight: 500;

      @media (max-width: 600px) {
        display: none;
      }
    }
  }

  &-content {
    // Display & Box Model
    width: 100%;
    height: 100%;
  }
}
</style>
