<script setup>
const { locale } = useI18n();
const route = useRoute();

const unitId = computed(() => route.query.unit);
</script>

<template>
  <div class="univer_sheet_page">
    <UniverSheetEditor :locale="locale" :unit-id="unitId" />
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet_page {
  height: 90vh;
}
</style>
