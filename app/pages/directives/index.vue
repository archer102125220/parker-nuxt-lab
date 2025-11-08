<template>
  <section class="directives_page">
    <p>
      為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關directives
    </p>

    <v-img
      class="directives_page-banner"
      max-height="400"
      src="/img/vue-directives/vue-directives-v.02.png"
    />

    <nav class="directives_page-content">
      <!-- <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="directives_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink> -->

      <LinkCard
        v-for="link in linkList"
        :key="link.to"
        :to="link.to"
        :banner="link.banner"
        :label="link.label"
        class="directives_page-content-link"
      />
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: '自製vue指令列表',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 自製vue指令` : '自製vue指令';
  }
});

// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const linkList = computed(() => [
  {
    to: localePath('/directives/customize-ripple-test'),
    label: '自製ripple directive測試'
  },
  {
    to: localePath('/directives/customize-lazyload-test'),
    label: '自製lazyload directive測試'
  }
]);
</script>

<style lang="scss">
.directives_page {
  &-banner {
    width: 100%;
    margin-bottom: 8px;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    &-link {
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
