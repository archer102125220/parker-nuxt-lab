<script setup>
const router = useRouter();

const props = defineProps({
  hasBack: { type: Boolean, default: true }
});

const animation = computed(() => {
  if (import.meta.client) {
    return window.___IS_NUXT_INITED__ !== true;
  }
  return true;
});

const imgTransition = computed(() => {
  if (animation.value === true) {
    return 'fade-transition';
  }
  return false;
});

function handleGoBack() {
  router.back();
}

onMounted(() => {
  window.___IS_NUXT_INITED__ = true;
});
</script>

<template>
  <header class="layout_header" :css-animation="animation">
    <v-btn
      class="layout_header-back"
      size="x-small"
      color="primary"
      variant="outlined"
      icon="mdi-chevron-left"
      :css-has-back="hasBack === true"
      @click="handleGoBack"
    />

    <div class="layout_header-name">
      <NuxtLink :to="$localePath('/')" class="layout_header-name-link">
        <v-img
          class="layout_header-name-link-logo"
          src="/img/icon/NuxtRock.v.10.4.webp"
          :alt="$t('system.systemName')"
          :transition="imgTransition"
        />
        <!-- <p class="layout_header-name-label">Parker Chen 的Nuxt實驗室</p> -->
        <AnimationEnterLabel
          class="layout_header-name-link-label"
          :css-animation="animation"
          :animation-end="animation === false"
          :label="$t('system.systemName')"
        />
      </NuxtLink>
    </div>

    <LanguageSwitcher />
  </header>
</template>

<style lang="scss" scoped>
@keyframes headerEnterAnimation {
  from {
    opacity: 0;
    transform: translate(0px, -120px);
  }

  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}
@keyframes enterLabelAnimation {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes enterLabelAnimation {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes backWidthAnimation {
  from {
    width: 0px;
  }

  to {
    width: 32px;
  }
}
@keyframes backOpacityAnimation {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.layout_header {
  // Positioning
  position: sticky;
  top: 0;
  z-index: 100;

  // Display & Box Model
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 12px 24px;
  padding-top: calc(12px + var(--safe-area-inset-top));

  // Visual
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  // Animation
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &[css-animation='true'] {
    // Animation
    animation-name: headerEnterAnimation;
    animation-duration: 0.3s;
  }

  &-back {
    // Display & Box Model
    width: 0px;
    overflow: hidden;

    // Typography
    font-size: 24px;

    // Visual
    opacity: 0;

    // Animation
    animation-name: backWidthAnimation, backOpacityAnimation;
    animation-duration: 0.2s, 0.3s;
    animation-direction: reverse, reverse;

    &[css-has-back='true'] {
      // Display & Box Model
      width: 32px;

      // Visual
      opacity: 1;

      // Animation
      animation-name: backWidthAnimation, backOpacityAnimation;
      animation-duration: 0.2s, 0.3s;
      animation-direction: normal, normal;
    }
  }

  &-name {
    // Display & Box Model
    flex: 1;
    padding-left: 8px;

    &-link {
      // Display & Box Model
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 13px;

      // Typography
      text-decoration: none;

      &-logo {
        // Display & Box Model
        width: 30px;
        height: 30px;
        object-fit: contain;
      }

      &-label {
        // Display & Box Model
        margin: 0;

        // Typography
        font-weight: 600;
        color: #2d3748;

        &[css-animation='true'] {
          // Animation
          animation-name: enterLabelAnimation;
          animation-duration: 0.3s;
        }
      }
    }
  }
}
</style>
