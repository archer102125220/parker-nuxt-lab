<script setup>
const { locale } = useI18n();
const route = useRoute();

const unitId = computed(() => route.query.unit);
</script>

<template>
  <div class="univer_doc_page">
    <ClientOnly>
      <UniverDocEditor :locale="locale" :unit-id="unitId" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.univer_doc_page {
  height: 90vh;
}
</style>
