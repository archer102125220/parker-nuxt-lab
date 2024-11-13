<template>
  <div class="params_back_test_page">
    <p>{{ paramsTestData }}</p>
    <div>
      <v-btn color="primary" @click="handleRouteParamsPush">
        增加params(Push)
      </v-btn>
    </div>
    <div>
      <v-btn color="primary" @click="handleRouteParamsReplace">
        增加params(Replace)
      </v-btn>
    </div>
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

function handleRouteParamsPush() {
  router.push({
    params: {
      testData: paramsTestData.value + 1
    }
  });
}
function handleRouteParamsReplace() {
  router.replace({
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
