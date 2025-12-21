<template>
  <NuxtLink :to="to" :alt="label" class="link_card">
    <div class="link_card-wrapper">
      <div class="link_card-image_container">
        <img 
          class="link_card-image_container-img" 
          :src="safeBanner" 
          :alt="label"
          @error="handleBannerError" 
        />
        <div class="link_card-image_container-overlay"></div>
      </div>
      
      <div class="link_card-content">
        <h3 class="link_card-content-title">
          <slot>
            {{ label }}
          </slot>
        </h3>
        <p v-if="description" class="link_card-content-description">
          {{ description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const DEFAULT_IMG = '/img/icon/NuxtRock.v.10.4.webp';

const props = defineProps({
  to: { type: String, default: '' },
  banner: { type: String, default: '' },
  label: { type: String, default: '' },
  description: { type: String, default: '' }
});

const isBannerError = ref(false);

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
  
  /* Animation */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    
    .link_card-image_container-img {
      transform: scale(1.05);
    }
    
    .link_card-image_container-overlay {
      opacity: 0.3;
    }
  }
  
  &-wrapper {
    /* Positioning */
    position: relative;
    
    /* Display & Box Model */
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
    
    /* Visual */
    background: var(--color-bg-primary, #ffffff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    
    /* Animation */
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
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
  }
  
  &-content {
    /* Display & Box Model */
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    
    &-title {
      /* Display & Box Model */
      margin-bottom: 8px;
      
      /* Typography */
      font-size: 18px;
      font-weight: 600;
      line-height: 1.4;
      color: var(--color-text-primary, #1a1a1a);
      
      /* Visual */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    &-description {
      /* Typography */
      font-size: 14px;
      line-height: 1.5;
      color: var(--color-text-secondary, #6c757d);
      
      /* Visual */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
