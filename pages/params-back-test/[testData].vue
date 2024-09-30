<template>
  <div class="params_back_test_page">
    <p>{{ paramsTestData }}</p>
    <v-btn color="primary" @click="handleRouteParams">增加params</v-btn>
  </div>
</template>

<script setup>
// https://github.com/nuxt/nuxt/issues/27982
useHead({
  title: '路由參數與上一頁測試'
});

const route = useRoute();
const router = useRouter();

const paramsTestData = ref(0);

watch(
  () => route.params,
  (newRouteParams) => {
    if (
      typeof newRouteParams?.testData === 'string' &&
      isNaN(Number(newRouteParams.testData)) === false
    ) {
      paramsTestData.value = Number(newRouteParams.testData);
    }
  },
  { deep: true, immediate: true }
);

function handleRouteParams() {
  router.push({
    params: {
      testData: paramsTestData.value + 1
    }
  });
}
</script>

<style lang="scss">
.params_back_test_page {
}
</style>
