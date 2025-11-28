<template>
  <section class="about_page">
    <v-img
      class="about_page-banner"
      max-height="400"
      src="/img/about/about-v.10.webp"
    />
    <v-skeleton-loader
      v-if="pending"
      class="mx-auto"
      type="heading, subtitle, paragraph, list-item-three-line@3, divider, subtitle, text@2, list-item-three-line@4, divider, subtitle, list-item-three-line@2"
      boilerplate
    />
    <p v-else-if="error">無法載入內容：{{ error.message }}</p>
    <template v-else-if="data">
      <!-- <h1 class="about_page-title">關於本站</h1> -->
      <section
        v-for="(section, index) in sectionList"
        :key="index"
        class="about_page-section"
      >
        <h2 class="about_page-section-sub_title">
          {{ section.title }}
        </h2>
        <div v-if="section.description" class="about_page-section-description">
          <template
            v-for="(descItem, descIndex) in section.description"
            :key="descIndex"
          >
            <del v-if="descItem.isDel">{{ descItem.text }}</del>
            <p v-else>{{ descItem.text }}</p>
          </template>
        </div>
        <ul
          v-if="Array.isArray(section.listItemList)"
          class="about_page-section-list"
        >
          <li
            v-for="(item, itemIndex) in section.listItemList"
            :key="itemIndex"
            class="about_page-section-list-item"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </template>
  </section>
</template>

<script setup>
const systemStore = useSystemStore();
const { $nuxtServer } = useNuxtApp();
const { locale } = useI18n();

const { data, pending, error } = await useAsyncData(
  'about-content',
  () => $nuxtServer.GET_aboutContent({ locale: locale.value }),
  { watch: [locale] }
);

const sectionList = computed(() => {
  const _sectionList = data.value;
  return Array.isArray(_sectionList) ? _sectionList : [];
});

watchEffect(() => {
  systemStore.setLoading(pending.value);
});

useHeadMataData({
  title: '關於本站 - Nuxt實驗室',
  meta: [
    {
      name: 'description',
      content:
        '這是一個用於測試和實驗的專案，主要聚焦於客製化組件、Nuxt4套件整合以及PWA實驗。'
    }
  ]
});
</script>

<style lang="scss">
.about_page {
  /* Display & Box Model */
  // padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  &-title {
    /* Display & Box Model */
    margin-bottom: 1rem;

    /* Typography */
    font-size: 2.5rem;
    color: #333;
  }

  &-banner {
    /* Display & Box Model */
    width: 100%;
    margin-bottom: 8px;
  }

  &-section {
    /* Display & Box Model */
    margin-bottom: 2rem;

    &-sub_title {
      /* Display & Box Model */
      margin: 1.5rem 0 1rem;

      /* Typography */
      font-size: 1.8rem;
      color: #444;
    }

    &-description {
      /* Display & Box Model */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 1rem;

      /* Typography */
      line-height: 1.6;
      color: #666;
    }

    &-list {
      /* Display & Box Model */
      margin-bottom: 1rem;
      padding-left: 2rem;

      /* Misc */
      list-style-type: disc;

      &-item {
        /* Display & Box Model */
        margin-bottom: 0.5rem;

        /* Typography */
        line-height: 1.6;
        color: #666;
      }
    }
  }
}
</style>
