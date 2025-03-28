<template>
  <section class="selector_page">
    <Selector
      display-key="display"
      value-key="id"
      v-model="classId"
      :option-list="matchTypeList"
    />
  </section>
</template>

<script setup>
const classId = ref();
const matchTypeList = computed(() => {
  return [
    {
      id: 5,
      name: 'football',
      display: '足球'
    },
    {
      id: 4,
      name: 'basketball',
      display: '篮球'
    },
    {
      id: 14,
      name: 'e-sports',
      display: '電競'
    },
    {
      // 其他運動的默認圖標
      id: 'default',
      name: 'other',
      display: '預設'
    }
  ];
});

onMounted(() => {
  classId.value = matchTypeList.value[0]?.id;
});
</script>

<style lang="scss" scoped>
.selector_page {
}
</style>
