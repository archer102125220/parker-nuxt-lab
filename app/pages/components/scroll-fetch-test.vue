<template>
  <div class="scroll_fetch_test_page">
    <form class="scroll_fetch_test_page-form" @submit.prevent="">
      <v-radio-group
        class="frontend_api_cach_test_page-form-http_method"
        v-model="userTokenType"
      >
        <v-radio color="primary" label="前端模擬" value="fake" />

        <v-radio
          color="primary"
          label="使用專案設定GitHub Token"
          value="default"
        />

        <div class="scroll_fetch_test_page-form-token_input">
          <v-radio
            color="primary"
            label="自行輸入 GitHub Token"
            value="input"
          />
          <v-text-field
            clearable
            label="GitHub Token"
            :disabled="userTokenType !== 'input'"
          />
        </div>
      </v-radio-group>
    </form>

    <v-checkbox
      label="停用user-select"
      color="primary"
      :value="true"
      v-model="userSelect"
    />

    <ScrollFetch
      :ios-style="false"
      :refresh-disable="false"
      height="85dvh"
      refresh-icon="/img/icon/refresh/refresh-icon.svg"
      refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
      :infinity-buffer="500"
      :user-select-none="userSelect"
      :infinity-end="infinityEnd"
      :loading="$store.system.loading"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div class="scroll_fetch_test_page-content">
        <p
          v-for="(data, index) in dataList"
          :key="index"
          class="scroll_fetch_test_page-content-text"
        >
          {{ data }}
        </p>
      </div>
    </ScrollFetch>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '自製下拉重整及無限滾動測試'
});
const nuxtApp = useNuxtApp();

// https://docs.github.com/zh/rest/authentication/endpoints-available-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28
/*
VITE_GITHUB_TOKEN

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN" \
  https://api.github.com/user/repos

參數,說明,範例值
type,篩選儲存庫類型,"all, owner (僅您擁有的), member (您是成員或協作者的)"
sort,排序依據,"created, updated, pushed, full_name"
direction,排序方向,"asc (升序), desc (降序)"
visibility,篩選可見性,"all, public, private"
per_page,每頁顯示數量,1 到 100，預設是 30

*/

const userSelect = ref(false);
const refreshLoading = ref(false);
const infinityLoading = ref(false);
const infinityEnd = ref(false);
const userTokenType = ref('default');
const page = ref(1);

const asyncData = useAsyncData('scroll_fetch_test', () => {});

const limit = computed(() => page.value * 20);
const dataList = computed(() => {
  const _dataList = [];
  for (let i = 0; i <= page.value * limit.value; i++) {
    _dataList.push(i);
    // let data = '';
    // for (let j = i; j >= 0; j--) {
    //   data += j;
    // }
    // _dataList.push(data);
  }
  return _dataList;
});

async function handleRefresh(done) {
  if (
    refreshLoading.value === true ||
    infinityLoading.value === true ||
    nuxtApp.$store.system.loading === true
  ) {
    done();
    return;
  }

  refreshLoading.value = true;
  nuxtApp.$store.system.setLoading(true);
  console.log('handleRefresh');

  page.value = 1;
  const response = await nuxtApp.$nuxtServer.GET_scrollFetchTest(
    { page: page.value },
    { useCache: false, useCacheRefresh: true }
  );
  await new Promise((resolve) => nextTick(setTimeout(() => resolve(), 1000)));

  console.log({ response });

  console.log('handleRefresh setTimeout');
  done();
  // nuxtApp.$successMessage('handleRefresh');
  nuxtApp.$store.system.setLoading(false);
  refreshLoading.value = false;
}
async function handleInfinityFetch(done) {
  if (
    refreshLoading.value === true ||
    infinityLoading.value === true ||
    nuxtApp.$store.system.loading === true
  ) {
    done();
    return;
  }

  infinityLoading.value = true;
  nuxtApp.$store.system.setLoading(true);
  console.log('handleInfinityFetch');

  page.value = page.value + 1;
  const response = await nuxtApp.$nuxtServer.GET_scrollFetchTest(
    { page: page.value },
    { useCache: true, useCacheRefresh: false }
  );
  await new Promise((resolve) => nextTick(setTimeout(() => resolve(), 1000)));

  console.log({ response });

  // infinityEnd.value = true;
  console.log('handleInfinityFetch setTimeout');
  done();
  // nuxtApp.$successMessage('handleInfinityFetch');
  nuxtApp.$store.system.setLoading(false);
  infinityLoading.value = false;
}
</script>

<style lang="scss" scoped>
.scroll_fetch_test_page {
  // height: 100dvh;
  &-content {
    background-color: #fff;
    &-scroll_fetch {
      // min-height: 100dvh;
      &-text {
        height: 200px;
      }
    }
  }
}
</style>
