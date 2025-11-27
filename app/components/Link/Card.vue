<template>
  <NuxtLink :to="to" :alt="label" class="link_card">
    <v-card class="link_card-card" v-ripple max-width="150">
      <v-img cover height="100" :src="safeBanner" @error="handleBannerError" />

      <v-card-subtitle class="link_card-card-page_name">
        <slot>
          {{ label }}
        </slot>
      </v-card-subtitle>
    </v-card>
  </NuxtLink>
</template>

<script setup>
const DEFAULT_IMG = '/img/icon/NuxtRock.v.02.webp';

const props = defineProps({
  to: { type: String, default: '' },
  banner: { type: String, default: '' },
  label: { type: String, default: '' }
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
  &-card {
    // Display & Box Model
    margin: auto;

    &-page_name.v-card-subtitle {
      // Display & Box Model
      display: -webkit-box;
      height: 54px;
      padding: 4px;

      // Typography
      line-height: 54px;
      white-space: break-spaces;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
