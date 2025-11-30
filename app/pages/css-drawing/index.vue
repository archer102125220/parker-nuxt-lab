<template>
  <section class="css_animejs_page">
    <p>主要以css繪圖及anime.js整合測試為主</p>

    <v-img
      class="css_animejs_page-banner"
      max-height="400"
      src="/img/css-drawing/css-drawing-v.05.webp"
    />

    <nav class="css_animejs_page-content" role="navigation">
      <!-- <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="css_animejs_page-content-link"
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
        class="css_animejs_page-content-link"
      />
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'css繪圖列表',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | css繪圖相關測試` : 'css繪圖相關測試';
  }
});

// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const linkList = computed(() => [
  { to: localePath('/css-drawing/triangle-test'), label: 'css三角形測試' },
  {
    to: localePath('/css-drawing/triangle-full-test'),
    label: 'css三角形滿版測試'
  },
  {
    to: localePath('/css-drawing/triangle-anime-test'),
    label: 'css三角形滿版動畫測試'
  },
  {
    to: localePath('/css-drawing/hexagon-test'),
    label: 'css六邊形測試'
  },
  { to: localePath('/css-drawing/svg-color-change'), label: 'svg替換顏色測試' }
]);
</script>

<style lang="scss">
.css_animejs_page {
  &-banner {
    /* Display & Box Model */
    width: 100%;
    margin-bottom: 8px;
  }

  &-content {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    &-link {
      /* Display & Box Model */
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
