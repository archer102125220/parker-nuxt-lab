<script setup>
const { locale } = useI18n();
</script>

<template>
  <div class="univer_doc_page">
    <ClientOnly>
      <UniverDocEditor :locale="locale" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.univer_doc_page {
  height: 90vh;
}
</style>
