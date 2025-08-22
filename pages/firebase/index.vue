<template>
  <div class="firebase_page">
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

    <nav class="firebase_page-link_list">
      <NuxtLink
        class="firebase_page-link_list-link"
        :to="localePath('/firebase/cloud-messaging')"
      >
        FCM推播通知後台
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
useHead({
  title: 'Firebase整合測試'
});
const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
.firebase_page {
  &-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    margin-bottom: 16px;;
  }

  &-link_list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    &-link {
      flex: 1;
      flex-basis: 400px;
    }
  }
}
</style>
