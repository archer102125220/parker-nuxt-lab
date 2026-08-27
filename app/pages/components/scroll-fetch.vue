<script>
import _cloneDeep from 'lodash/cloneDeep';
</script>
<script setup>
const { t } = useI18n();
useHeadMataData({
  title: computed(() => t('scroll_fetch_page.page_title'))
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

const displayDataList = useState('scrollFetchTestDisplayDataList', () => []);
const infinityEnd = useState('scrollFetchTestInfinityEnd', () => false);
const page = ref(1);
const userTokenType = ref('default');
const userInputToken = ref('');
const userAccountType = ref('default');
const userInputAccount = ref('');
const userSelect = ref(false);
const pullRefeshDisabled = ref(false);

const asyncData = await useAsyncData('scroll_fetch_test', async function () {
  const { $request } = useNuxtApp();
  const token =
    userTokenType.value === 'default'
      ? import.meta.env.VITE_GITHUB_TOKEN || ''
      : userInputToken.value;
  const account =
    userAccountType.value === 'default'
      ? import.meta.env.VITE_GITHUB_ACCOUNT || ''
      : userInputAccount.value;

  if (typeof token !== 'string' || token === '') {
    throw new Error('invalid token');
  }

  if (typeof account !== 'string' || account === '') {
    throw new Error('invalid account');
  }

  const response = await $request.get(
    `https://api.github.com/users/${account}/repos`,
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

    displayDataList.value = newDisplayDataList;
  }

  const headersLink = response.headers?.link || '';

  infinityEnd.value =
    headersLink
      .split(',')
      .some((linkString) => linkString.includes('rel="next"')) === false;

  return response?.data;
});
const { pending, data, error, refresh, execute } = asyncData;

watch(
  () => pending.value,
  (newPadding) => {
    nuxtApp.$store.system.setLoading(newPadding);
  }
);

watch(
  () => error.value,
  (newError) => {
    if (typeof newError === 'object' && newError !== null) {
      console.error(newError);

      if (typeof newError?.message === 'string') {
        if (newError.message === 'invalid token') {
          nuxtApp.$warningMessage(t('scroll_fetch_page.warn_invalid_token'));
        } else if (newError.message === 'invalid account') {
          nuxtApp.$warningMessage(t('scroll_fetch_page.warn_invalid_account'));
        } else {
          nuxtApp.$errorMessage(newError.message);
        }
      }

      displayDataList.value = [];
      infinityEnd.value = true;
    }
  }
);

async function handleRefresh(done) {
  if (pending === true || nuxtApp.$store.system.loading === true) {
    if (typeof done === 'function') done();
    return;
  }

  nuxtApp.$store.system.setLoading(true);

  page.value = 1;

  await refresh();

  if (typeof done === 'function') done();
  nuxtApp.$store.system.setLoading(false);
}
async function handleInfinityFetch(done) {
  if (pending === true || nuxtApp.$store.system.loading === true) {
    if (typeof done === 'function') done();
    return;
  }

  nuxtApp.$store.system.setLoading(true);

  page.value = page.value + 1;
  await execute();

  if (typeof done === 'function') done();
  nuxtApp.$store.system.setLoading(false);
}
</script>

<template>
  <div class="scroll_fetch_test_page">
    <!-- Hero Section -->
    <section class="scroll_fetch_test_page-hero">
      <div class="scroll_fetch_test_page-hero-background">
        <div class="scroll_fetch_test_page-hero-background-overlay" />
      </div>

      <div class="scroll_fetch_test_page-hero-content">
        <h1 class="scroll_fetch_test_page-hero-content-title">
          {{ $t('scroll_fetch_page.hero.title') }}
        </h1>
        <p class="scroll_fetch_test_page-hero-content-subtitle">
          {{ $t('scroll_fetch_page.hero.subtitle') }}
        </p>
        <p class="scroll_fetch_test_page-hero-content-description">
          {{ $t('scroll_fetch_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="scroll_fetch_test_page-section">
      <ScrollFetch
        height="70dvh"
        :ios-style="false"
        :infinity-buffer="500"
        :refresh-disable="pullRefeshDisabled"
        refresh-icon="/img/icon/refresh/refresh-icon.svg"
        refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
        :user-select-none="userSelect"
        :infinity-end="infinityEnd"
        :is-mobile="$store.system.isMobile"
        :loading="pending"
        :infinity-disable="displayDataList.length <= 0"
        class="scroll_fetch_test_page-scroller"
        @refresh="handleRefresh"
        @infinity-fetch="handleInfinityFetch"
      >
        <div class="scroll_fetch_test_page-scroller-description">
          <a
            rel="noopener"
            target="_blank"
            href="https://github.com/archer102125220/parker-nuxt-lab/blob/main/app/pages/components/scroll-fetch.vue"
          >
            {{ $t('scroll_fetch_page.page_github') }}
          </a>
          <a
            rel="noopener"
            target="_blank"
            href="https://github.com/archer102125220/parker-nuxt-lab/blob/main/app/components/ScrollFetch.vue"
          >
            {{ $t('scroll_fetch_page.component_github') }}
          </a>
        </div>
        <form
          class="scroll_fetch_test_page-form"
          @submit.prevent="handleRefresh"
        >
          <v-radio-group
            v-model="userTokenType"
            inline
            class="scroll_fetch_test_page-form-token_type"
          >
            <v-radio
              color="primary"
              :label="$t('scroll_fetch_page.use_project_token')"
              value="default"
            />

            <v-radio
              color="primary"
              :label="$t('scroll_fetch_page.input_token')"
              value="input"
            />
            <v-text-field
              v-model="userInputToken"
              clearable
              :label="$t('scroll_fetch_page.github_token')"
              class="scroll_fetch_test_page-form-token_type-token_input"
              :disabled="userTokenType !== 'input'"
            />
          </v-radio-group>

          <v-radio-group
            v-model="userAccountType"
            class="scroll_fetch_test_page-form-account_type"
            inline
          >
            <v-radio
              color="primary"
              :label="$t('scroll_fetch_page.use_project_account')"
              value="default"
            />

            <v-radio
              color="primary"
              :label="$t('scroll_fetch_page.input_account')"
              value="input"
            />
            <v-text-field
              v-model="userInputAccount"
              clearable
              :label="$t('scroll_fetch_page.github_account')"
              class="scroll_fetch_test_page-form-account_type-account_input"
              :disabled="userAccountType !== 'input'"
            />
          </v-radio-group>

          <v-btn block color="primary" type="submit">{{
            $t('scroll_fetch_page.reload')
          }}</v-btn>
        </form>

        <v-checkbox
          v-model="userSelect"
          :label="$t('scroll_fetch_page.disable_user_select')"
          color="primary"
          :value="true"
          class="scroll_fetch_test_page-user_select_disabled"
        />

        <v-checkbox
          v-model="pullRefeshDisabled"
          :label="$t('scroll_fetch_page.disable_pull_refresh')"
          color="primary"
          :value="true"
          class="scroll_fetch_test_page-pull_Refresh_disabled"
        />

        <div class="scroll_fetch_test_page-list">
          <div
            class="scroll_fetch_test_page-list-content"
            :css-is-empty="displayDataList.length <= 0"
          >
            <div
              v-for="(displayData, index) in displayDataList"
              :key="displayData.id"
              class="scroll_fetch_test_page-list-content-item"
            >
              <p class="scroll_fetch_test_page-list-content-item-number">
                No.{{ index + 1 }}
              </p>
              <!-- <p class="scroll_fetch_test_page-list-content-item-full_name">
            {{ displayData.full_name }}
          </p> -->
              <p class="scroll_fetch_test_page-list-content-item-name">
                {{ $t('scroll_fetch_page.repo_name') }} {{ displayData.name }}
              </p>
              <p class="scroll_fetch_test_page-list-content-item-description">
                {{ $t('scroll_fetch_page.repo_desc') }}
                {{ displayData.description }}
              </p>
              <div class="scroll_fetch_test_page-list-content-item-html_link">
                <p>{{ $t('scroll_fetch_page.repo_link') }}</p>
                <a
                  class="scroll_fetch_test_page-list-content-item-html_link-repo_link"
                  target="_blank"
                  :href="displayData.html_url"
                >
                  {{ displayData.html_url }}
                </a>
              </div>
            </div>

            <p
              v-if="displayDataList.length <= 0"
              class="scroll_fetch_test_page-list-content-empty"
            >
              {{ $t('scroll_fetch_page.no_data') }}
            </p>
          </div>
        </div>
      </ScrollFetch>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.scroll_fetch_test_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    overflow: hidden;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
      }
    }

    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      text-align: center;

      &-title {
        margin: 0 0 8px 0;
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 28px;
        }
      }

      &-subtitle {
        margin: 0 0 12px 0;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 20px;
  }

  &-scroller {
    :deep(.v-input__details) {
      display: none;
    }

    &-description {
      display: flex;
      flex-direction: row;
      gap: 16px;
    }
  }

  &-form {
    // class="scroll_fetch_test_page-form-token_type-input_block-token"

    &-token_type {
      &-token_input {
        /* Display & Box Model */
        flex: 1;
        margin-bottom: 16px;
      }
    }

    &-account_type {
      &-account_input {
        /* Display & Box Model */
        flex: 1;
        margin-bottom: 16px;
      }
    }
  }

  &-pull_Refresh_disabled {
    /* Display & Box Model */
    margin-bottom: 16px;
  }

  &-list {
    /* Display & Box Model */
    margin-top: 16px;
    padding-top: 16px;

    /* Visual */
    background-color: #f7f7f7;

    &-content {
      &[css-is-empty='true'] {
        display: flex;
        justify-content: center;
        align-items: center;

        min-height: 45dvh;
      }

      &-item {
        /* Display & Box Model */
        // height: 200px;
        margin: 0 8px;
        margin-bottom: 16px;
        padding: 8px;
        border: 1px solid #afafaf;
        border-radius: 10px;

        /* Typography */
        word-break: break-all;

        &-html_link {
          /* Display & Box Model */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      }

      &-empty {
        /* Display & Box Model */
        margin: auto;
      }
    }
  }
}
</style>
