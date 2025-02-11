<template>
  <div class="frontend_api_cach_test_page">
    <form
      class="frontend_api_cach_test_page-form"
      @submit.prevent="handleSubmit"
    >
      <v-text-field
        clearable
        label="GET參數"
        class="frontend_api_cach_test_page-form-query"
        v-model="queryData"
      />
      <v-text-field
        clearable
        label="POST參數"
        class="frontend_api_cach_test_page-form-payload"
        v-model="payloadData"
      />

      <v-radio-group
        class="frontend_api_cach_test_page-form-http_method"
        v-model="isPost"
      >
        <v-radio color="primary" label="使用HTTP POST" :value="true" />
        <v-radio color="primary" label="使用HTTP GET" :value="false" />
      </v-radio-group>

      <v-checkbox
        class="frontend_api_cach_test_page-form-checkbox"
        label="啟用快取(同時使用情況下優先生效)"
        color="primary"
        hide-details
        :value="true"
        v-model="useCache"
      />
      <v-checkbox
        class="frontend_api_cach_test_page-from-checkbox"
        label="啟用ServiceWorker快取(只適用production模式底下的HTTP GET方法)"
        color="primary"
        hide-details
        :value="true"
        v-model="useServiceWorkerCache"
      />

      <v-btn color="primary" type="submit">測試</v-btn>
    </form>

    <div class="frontend_api_cach_test_page-content">
      <p>耗時約：</p>
      <p>{{ timeConsuming }}</p>
      <p>ms</p>
    </div>

    <p>回傳值：</p>
    <p>{{ JSON.stringify(response) }}</p>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const { $store } = nuxtApp;

const queryData = ref('queryTest');
const payloadData = ref('payloadTest');
const isPost = ref(true);
const timeConsuming = ref('');
const useCache = ref(false);
const useServiceWorkerCache = ref(false);
const response = ref(null);

function handleSubmit() {
  if (isPost.value !== true) {
    handleGetApi();
  } else {
    handlePostApi();
  }
}

async function handlePostApi() {
  if ($store.system.loading === true) return;
  console.log('--test post api start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.POST_frontendApiCachTest(
      {
        query: { data: queryData.value },
        payload: { data: payloadData.value }
      },
      {
        useCache: useCache.value
      }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test post api end--', timeConsuming.value);
}

async function handleGetApi() {
  if ($store.system.loading === true) return;
  console.log('--test get api start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.GET_frontendApiCachTest(
      {
        query: { data: queryData.value }
      },
      {
        useCache: useCache.value,
        useServiceWorkerCache: useServiceWorkerCache.value
      }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test get api end--', timeConsuming.value);
}
</script>

<style lang="scss" scoped>
.frontend_api_cach_test_page {
  &-form {
    &-query {
    }

    &-payload {
    }

    &-http_method {
    }

    &-checkbox {
      // :deep(.v-input__details) {
      //   display: none;
      // }
    }
  }

  &-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
