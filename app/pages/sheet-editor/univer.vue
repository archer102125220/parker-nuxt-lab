<script setup>
const { locale } = useI18n();
</script>

<template>
  <div class="univer_sheet_page">
    <ClientOnly>
      <UniverSheetEditor :locale="locale" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet_page {
  height: 90vh;
}
</style>
