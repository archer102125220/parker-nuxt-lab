<template>
  <component
    :is="disabled ? 'div' : NuxtLink"
    :to="disabled ? undefined : to"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :alt="label"
    class="link_card"
    :css-not-link-icon="isExternal ? 'true' : undefined"
    :css-state="disabled ? 'disabled' : undefined"
  >
    <div class="link_card-wrapper">
      <div v-if="hasBanner" class="link_card-image_container">
        <img
          class="link_card-image_container-img"
          :src="safeBanner"
          :alt="label"
          @error="handleBannerError"
        />
        <div class="link_card-image_container-overlay" />
        <span v-if="badge" class="link_card-image_container-badge">
          {{ badge }}
        </span>
      </div>

      <div class="link_card-content">
        <div v-if="icon && !banner" class="link_card-content-icon">
          {{ icon }}
        </div>
        <span v-if="badge && !banner" class="link_card-content-badge">
          {{ badge }}
        </span>

        <h3 class="link_card-content-title">
          <slot>
            {{ label }}
          </slot>
        </h3>
        <p v-if="description" class="link_card-content-description">
          {{ description }}
        </p>

        <div v-if="footerText" class="link_card-content-footer">
          <span class="link_card-content-footer-text">{{ footerText }}</span>
          <span
            v-if="isExternal === true"
            class="link_card-content-footer-external"
          />
          <span v-else class="link_card-content-footer-arrow">→</span>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup>
import { resolveComponent } from 'vue';

const DOMAIN = import.meta.env.VITE_DOMAIN || '';

const NuxtLink = resolveComponent('NuxtLink');
const DEFAULT_IMG = '/img/icon/NuxtRock.v.10.4.webp';

const props = defineProps({
  to: { type: String, default: '' },
  banner: { type: String, default: '' },
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  description: { type: String, default: '' },
  footerText: { type: String, default: '' },
  badge: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  hasBanner: { type: Boolean, default: true }
});

const isBannerError = ref(false);

const isExternal = computed(() => {
  return (
    typeof props.to === 'string' &&
    props.to.startsWith('http') &&
    props.to !== DOMAIN
  );
});

const safeBanner = computed(() => {
  const _safeBanner = props.banner || '';
  if (
    isBannerError.value === true ||
    typeof _safeBanner !== 'string' ||
    _safeBanner === ''
  ) {
    return DEFAULT_IMG;
  }
  return _safeBanner;
});

function handleBannerError() {
  isBannerError.value = true;
}
</script>

<style lang="scss">
.link_card {
  /* Display & Box Model */
  display: block;
  text-decoration: none;
  height: 100%;

  &-wrapper {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;

    /* Visual */
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    backdrop-filter: blur(10px);

    /* Animation */
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      /* Visual */
      background: #ffffff;
      border-color: rgba(68, 160, 141, 0.2);
      box-shadow: 0 12px 32px rgba(68, 160, 141, 0.1);

      /* Positioning */
      transform: translateY(-6px);
    }
  }

  &:hover {
    .link_card-image_container-img {
      transform: scale(1.05);
    }

    .link_card-image_container-overlay {
      opacity: 0.3;
    }

    .link_card-content-footer-arrow {
      transform: translateX(6px);
      color: #44a08d;
    }
  }

  &-image_container {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    width: 100%;
    height: 180px;
    overflow: hidden;

    /* Visual */
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);

    &-img {
      /* Display & Box Model */
      width: 100%;
      height: 100%;

      /* Visual */
      object-fit: cover;

      /* Animation */
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &-overlay {
      /* Positioning */
      position: absolute;
      bottom: 0;
      left: 0;

      /* Display & Box Model */
      width: 100%;
      height: 100%;

      /* Visual */
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        transparent 100%
      );
      opacity: 0.5;

      /* Animation */
      transition: opacity 0.3s ease;
    }

    &-badge {
      /* Positioning */
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;

      /* Display & Box Model */
      padding: 6px 12px;
      border-radius: 20px;

      /* Typography */
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;

      /* Visual */
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }

  // Disabled state
  &[css-state='disabled'] {
    /* Misc */
    cursor: not-allowed;

    &:hover {
      .link_card-wrapper {
        transform: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        border-color: rgba(0, 0, 0, 0.05);
      }

      .link_card-image_container-img {
        transform: none;
      }
    }

    .link_card-wrapper {
      /* Visual */
      opacity: 0.6;
    }

    .link_card-image_container-badge {
      /* Visual */
      background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
    }
  }

  &-content {
    /* Display & Box Model */
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 24px;

    &-icon {
      /* Display & Box Model */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      margin-bottom: 20px;
      border-radius: 14px;

      /* Typography */
      font-size: 28px;

      /* Visual */
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      border: 1px solid rgba(0, 0, 0, 0.03);
    }

    &-badge {
      /* Display & Box Model */
      display: inline-flex;
      align-self: flex-start;
      margin-bottom: 20px;
      padding: 6px 12px;
      border-radius: 20px;

      /* Typography */
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;

      /* Visual */
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &-title {
      /* Display & Box Model */
      margin-bottom: 12px;

      /* Typography */
      font-size: 20px;
      font-weight: 600;
      line-height: 1.5;
      color: var(--color-text-primary, #1a1a1a);

      /* Visual */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &-description {
      /* Display & Box Model */
      margin-bottom: 24px;

      /* Typography */
      font-size: 14px;
      line-height: 1.5;
      color: var(--color-text-secondary, #6c757d);

      /* Visual */
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &-footer {
      /* Display & Box Model */
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      margin-top: auto;
      border-top: 1px solid rgba(0, 0, 0, 0.05);

      &-text {
        /* Typography */
        font-size: 14px;
        font-weight: 500;
        color: var(--color-text-secondary, #6c757d);
      }

      &-external {
        // Display & Box Model
        display: inline-block;
        width: var(--link_blank_width, 16px);
        height: var(--link_blank_height, 16px);

        // Visual
        background-image: url('/img/icon/external-link/outbound-link-icon.webp');
        background-size: 100%;
      }

      &-arrow {
        /* Typography */
        font-size: 18px;
        color: #adb5bd;

        /* Animation */
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
