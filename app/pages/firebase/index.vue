<template>
  <section class="firebase_page">
    <div class="firebase_page-content">
      <p>原本在</p>
      <a
        href="https://resume-web-orpin.vercel.app/portfolio/firebase-admin"
        target="_blank"
      >
        電子履歷
      </a>
      <p>
        中實作並測試的功能，但由於該專案並沒有實作PWA等需要 Service Worker
        的功能，因此在此專案嘗試整合 Service Worker 並做測試
      </p>
    </div>

    <v-img
      class="firebase_page-banner"
      max-height="400"
      src="/img/firebase/firebase-v.07.webp"
    />

    <nav class="firebase_page-link_list" role="navigation">
      <!-- <NuxtLink
        class="firebase_page-link_list-link"
        :to="localePath('/firebase/cloud-messaging')"
      >
        FCM推播通知後台
      </NuxtLink> -->

      <LinkCard
        v-for="link in linkList"
        :key="link.to"
        :to="link.to"
        :banner="link.banner"
        :label="link.label"
        class="firebase_page-link_list-link"
      />
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'Firebase整合列表',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Firebase整合測試` : 'Firebase整合測試';
  }
});
const localePath = useLocalePath();
const linkList = computed(() => [
  {
    to: localePath('/firebase/cloud-messaging'),
    label: 'FCM推播通知後台'
  }
]);
</script>

<style lang="scss" scoped>
.firebase_page {
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
    margin-bottom: 16px;
  }

  &-link_list {
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
