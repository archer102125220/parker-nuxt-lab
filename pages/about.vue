<template>
  <div class="about_page">
    <div class="about_page-content">
      <v-skeleton-loader
        v-if="pending"
        class="mx-auto"
        type="heading, subtitle, paragraph, list-item-three-line@3, divider, subtitle, text@2, list-item-three-line@4, divider, subtitle, list-item-three-line@2"
        boilerplate
      />
      <p v-else-if="error">無法載入內容：{{ error.message }}</p>
      <template v-else-if="data">
        <h1 class="about_page-content-title">關於本站</h1>
        <section
          v-for="(section, index) in sectionList"
          :key="index"
          class="about_page-content-section"
        >
          <h2 class="about_page-content-section-sub_title">
            {{ section.title }}
          </h2>
          <div
            v-if="section.description"
            class="about_page-content-section-description"
          >
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
            class="about_page-content-section-list"
          >
            <li
              v-for="(item, itemIndex) in section.listItemList"
              :key="itemIndex"
              class="about_page-content-section-list-item"
            >
              {{ item }}
            </li>
          </ul>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
const systemStore = useSystemStore();
const { $nuxtServer } = useNuxtApp();

const { data, pending, error } = await useAsyncData('about-content', () =>
  $nuxtServer.GET_aboutContent()
);

const sectionList = computed(() => {
  const _sectionList = data.value;
  return Array.isArray(_sectionList) ? _sectionList : [];
});

watchEffect(() => {
  systemStore.setLoading(pending.value);
});

useHead({
  title: '關於本站 - Nuxt實驗室',
  meta: [
    {
      name: 'description',
      content:
        '這是一個用於測試和實驗的專案，主要聚焦於客製化組件、Nuxt3套件整合以及PWA實驗。'
    }
  ]
});
</script>

<style lang="scss">
.about_page {
  // padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  &-content {
    padding: 2rem;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &-title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #333;
    }

    &-section {
      margin-bottom: 2rem;

      &-sub_title {
        font-size: 1.8rem;
        margin: 1.5rem 0 1rem;
        color: #444;
      }

      &-description {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;

        margin-bottom: 1rem;
        color: #666;
        line-height: 1.6;
      }

      &-list {
        list-style-type: disc;
        padding-left: 2rem;
        margin-bottom: 1rem;

        &-item {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          color: #666;
        }
      }
    }
  }
}
</style>
