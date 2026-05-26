<script setup>
const { locale } = useI18n();
const route = useRoute();

const unitId = computed(() => route.query.unit);
</script>

<template>
  <div class="univer_sheet_page">
    <ClientOnly>
      <UniverSheetEditor :locale="locale" :unit-id="unitId" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet_page {
  height: 90vh;
}
</style>
