<template>
  <div class="scroll_fetch_test_page">
    <form class="scroll_fetch_test_page-form" @submit.prevent="">
      <v-radio-group
        class="frontend_api_cach_test_page-form-http_method"
        v-model="userTokenType"
      >
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
      height="85dvh"
      :ios-style="false"
      :infinity-buffer="500"
      :refresh-disable="false"
      refresh-icon="/img/icon/refresh/refresh-icon.svg"
      refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
      class="scroll_fetch_test_page-scroll_fetch"
      :user-select-none="userSelect"
      :infinity-end="infinityEnd"
      :loading="$store.system.loading"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div class="scroll_fetch_test_page-scroll_fetch-content">
        <p
          v-for="displayData in displayDataList"
          :key="displayData.id"
          class="scroll_fetch_test_page-scroll_fetch-content-item"
        >
          {{ displayData.full_name }}
        </p>
      </div>
    </ScrollFetch>
  </div>
</template>

<script setup>
import _cloneDeep from 'lodash/cloneDeep';
useHeadMataData({
  title: '自製下拉重整及無限滾動測試'
});
const nuxtApp = useNuxtApp();

// https://docs.github.com/zh/rest/authentication/endpoints-available-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28
/*
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
const displayDataList = useState('scrollFetchTestDisplayDataList', () => []);
const infinityEnd = useState('scrollFetchTestInfinityEnd', () => false);
const infinityLoading = ref(false);
const userTokenType = ref('default');
const userInputToken = ref('');
const page = ref(1);

const asyncData = await useAsyncData('scroll_fetch_test', async function () {
  const { $request } = useNuxtApp();
  const token =
    userTokenType.value === 'default'
      ? import.meta.env.VITE_GITHUB_TOKEN || ''
      : userInputToken.value;

  if (typeof token !== 'string' || token === '') {
    throw new Error('invalid token');
  }
  const response = await $request.get(
    'https://api.github.com/user/repos',
    {
      per_page: 10,
      page: page.value
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseSetting: {
        returnRawResponse: true
      }
    }
  );

  if (page.value === 1) {
    displayDataList.value = response?.data || [];
  } else {
    const newDisplayDataList = [
      ..._cloneDeep(displayDataList.value),
      ...(response?.data || [])
    ];

    console.log({
      newDisplayDataList,
      displayDataList: displayDataList.value,
      response
    });

    displayDataList.value = newDisplayDataList;
  }

  const headersLink = response.headers?.link || '';
  console.log(
    {
      headersLink,
      ["headersLink.split(',')"]: headersLink.split(',')
    },
    headersLink.split(',').some((linkString) => {
      console.log({ linkString });
      return linkString.includes('rel="next"');
    })
  );

  infinityEnd.value =
    headersLink
      .split(',')
      .some((linkString) => linkString.includes('rel="next"')) === false;

  return response?.data;
});
const { pending, data, error, refresh, execute } = asyncData;

watch(
  () => pending,
  (newPadding) => {
    nuxtApp.$store.system.setLoading(newPadding);
  }
);

async function handleRefresh(done) {
  if (
    pending === true ||
    refreshLoading.value === true ||
    infinityLoading.value === true ||
    nuxtApp.$store.system.loading === true
  ) {
    done();
    return;
  }

  refreshLoading.value = true;
  nuxtApp.$store.system.setLoading(true);

  page.value = 1;

  await refresh();

  done();
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

  page.value = page.value + 1;
  await execute();

  done();
  nuxtApp.$store.system.setLoading(false);
  infinityLoading.value = false;
}
</script>

<style lang="scss" scoped>
.scroll_fetch_test_page {
  // height: 100dvh;
  &-scroll_fetch {
    background-color: #fff;

    &-content {
      // background-color: #fff;
      // min-height: 100dvh;
      &-item {
        height: 200px;
      }
    }
  }
}
</style>
