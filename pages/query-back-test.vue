<template>
  <div class="query_back_test_page">
    <p>{{ queryTestData }}</p>
    <v-btn color="primary" @click="handleRouteQuery">增加query</v-btn>
  </div>
</template>

<script setup>
useHead({
  title: '路由query與上一頁測試'
});

const route = useRoute();
const router = useRouter();

const queryTestData = ref(0);

watch(
  () => route.query,
  (newRouteQuery) => {
    if (
      typeof newRouteQuery?.testData === 'string' &&
      isNaN(Number(newRouteQuery.testData)) === false
    ) {
      queryTestData.value = Number(newRouteQuery.testData);
    }
  },
  { deep: true, immediate: true }
);

function handleRouteQuery() {
  router.push({
    query: {
      testData: queryTestData.value + 1
    }
  });
}
</script>

<style lang="scss">
.query_back_test_page {
}
</style>
