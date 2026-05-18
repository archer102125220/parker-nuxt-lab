<script setup>
const { locale } = useI18n();
</script>

<template>
  <div class="univer_page">
    <ClientOnly>
      <UniverSheet :locale="locale" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.univer_page {
  height: 90vh;
}
</style>
