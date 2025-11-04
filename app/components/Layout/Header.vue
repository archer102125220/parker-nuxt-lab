<template>
  <header class="layout_header" :animation="animation">
    <v-btn
      :has-back="hasBack === true"
      class="layout_header-back"
      size="x-small"
      color="primary"
      variant="outlined"
      icon="mdi-chevron-left"
      @click="handleGoBack"
    />

    <div class="layout_header-name">
      <NuxtLink :to="$localePath('/')" class="layout_header-name-link">
        <v-img
          class="layout_header-name-link-logo"
          src="/img/icon/NuxtRock.v.02.svg"
          :alt="$t('system.systemName')"
        />
        <!-- <p class="layout_header-name-label">Parker Chen 的Nuxt實驗室</p> -->
        <AnimationEnterLabel
          class="layout_header-name-link-label"
          :animation-end="animation === false"
          :label="$t('system.systemName')"
        />
      </NuxtLink>
    </div>

    <v-btn color="primary" variant="text" rounded>
      <!-- <p>{{ $t(currentLocaleLabel) }}</p> -->
      <v-img
        src="/img/icon/i18n/i18n.v-02.png"
        cover
        width="20"
        height="20"
        alt="i18n"
      />
      <v-menu
        activator="parent"
        target="parent"
        location="start"
        scroll-strategy="none"
      >
        <v-list :value="locale">
          <v-list-item
            v-for="lang in localeList"
            :key="lang.code"
            :value="lang.code"
            :active="locale === lang.code"
            color="primary"
          >
            <NuxtLink :to="$switchLocalePath(lang.code)">
              <v-list-item-title>
                {{ $t(lang.label) }}
              </v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </header>
</template>
<script setup>
const router = useRouter();
const { locale } = useI18n();

const localeList = [
  { code: 'en', label: 'en' },
  { code: 'zh', label: 'zh-tw' }
];

const props = defineProps({
  hasBack: { type: Boolean, default: true }
});

const animation = computed(() => {
  if (import.meta.client) {
    return window.___IS_NUXT_INITED__ !== true;
  }
  return true;
});

// const currentLocaleLabel = computed(() => {
//   const found = localeList.find(
//     (localeItem) => localeItem.code === locale.value
//   );
//   return found ? found.label : locale.value;
// });

function handleGoBack() {
  router.back();
}

onMounted(() => {
  window.___IS_NUXT_INITED__ = true;
});
</script>

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
.layout_header {
  // position: relative;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  // margin: 8px;
  padding: 8px 16px;

  background-color: #f8f9fa;

  &[animation='true'] {
    animation-name: headerEnterAnimation;
    animation-duration: 0.3s;
  }

  &-back {
    // position: absolute;
    // left: 0px;
    // top: 0;
    font-size: 24px;

    width: 0px;

    opacity: 0;
    overflow: hidden;

    transition:
      width 0.2s,
      opacity 0.2s;

    &[has-back='true'] {
      width: 32px;
      opacity: 1;
    }
  }

  &-name {
    flex: 1;

    padding-left: 8px;

    &-link {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 13px;

      text-decoration: none;

      &-logo {
        height: 30px;
        width: 30px;
        object-fit: contain;
      }

      &-label {
        // font-size: 24px;
        color: #343a40;
        margin: 0;
      }
    }
  }
}
</style>
