<template>
  <div class="cloud_messaging_page">
    <v-container
      class="cloud_messaging_page-form"
      :tag="VForm"
      v-model="isValidSubmit"
      @submit.prevent="handlePushNotification"
    >
      <v-row>
        <v-col
          cols="12"
          sm="12"
          :tag="VTextField"
          label="推播標題"
          v-model="appMessageTitle"
          :rules="handleCheckMessageTitle"
        />
        <v-col
          cols="12"
          sm="12"
          :tag="VTextField"
          label="推播訊息"
          v-model="appMessageData"
          :rules="handleCheckMessageData"
        />
        <v-col
          cols="12"
          sm="12"
          :tag="VTextField"
          label="推播圖片網址"
          v-model="appMessageImg"
        />
      </v-row>
      <v-row justify="end" align="center">
        <v-col
          :tag="VBtn"
          color="primary"
          variant="outlined"
          width="100%"
          min-height="100%"
          @click="handleResetForm"
        >
          重置
        </v-col>
        <v-col
          :tag="VBtn"
          color="primary"
          type="submit"
          width="100%"
          min-height="100%"
          :disabled="isValidSubmit === false"
        >
          送出
        </v-col>
      </v-row>
    </v-container>

    <v-container class="cloud_messaging_page-refresh_btn">
      <v-row justify="end" align="center">
        <v-col
          cols="12"
          :tag="VBtn"
          prepend-icon="mdi-reload"
          color="primary"
          width="100%"
          min-height="100%"
          @click="handleRefresh"
        >
          重新整理
        </v-col>
      </v-row>
    </v-container>

    <v-skeleton-loader
      type="table"
      class="cloud_messaging_page-skeleton_loader"
      height="500px"
      :loading="pending"
    >
      <v-table
        v-if="hasData === true"
        class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table"
        fixed-header
      >
        <thead
          class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-thead"
        >
          <tr
            class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-thead-title_row"
          >
            <th
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-thead-title_row-os_th"
            >
              {{ OS_TD_TITLE }}
            </th>
            <th
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-thead-title_row-token_th"
            >
              {{ TOKEN_TD_TITLE }}
            </th>
            <th
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-thead-title_row-action_th"
            >
              {{ ACRION_TITLE }}
            </th>
          </tr>
        </thead>
        <tbody
          class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody"
        >
          <tr
            v-for="(webToken, webTokenIndex) in webTokenList"
            :key="webToken.createdAt"
            :data-title="`web token No.${webTokenIndex + 1}`"
            class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr"
          >
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-os_td"
              :data-title="`${OS_TD_TITLE}：`"
              :data-context="webToken.os"
            >
              {{ webToken.os }}
            </td>
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-token_td"
              :data-title="`${TOKEN_TD_TITLE}：`"
              :data-context="webToken.token"
            >
              {{ webToken.token }}
            </td>
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-action_td"
              :data-title="`${ACRION_TITLE}：`"
            >
              <v-btn color="error" @click="handleDeleteToken(webToken.token)">
                刪除
              </v-btn>
            </td>
          </tr>

          <tr
            v-for="(androidToken, androidTokenIndex) in androidTokenList"
            :key="androidToken.createdAt"
            :data-title="`android token No.${androidTokenIndex + 1}`"
            class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr"
          >
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-os_td"
              :data-title="`${OS_TD_TITLE}：`"
              :data-context="androidToken.os"
            >
              {{ androidToken.os }}
            </td>
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-token_td"
              :data-title="`${TOKEN_TD_TITLE}：`"
              :data-context="androidToken.token"
            >
              {{ androidToken.token }}
            </td>
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-action_td"
              :data-title="`${ACRION_TITLE}：`"
            >
              <v-btn
                color="error"
                @click="handleDeleteToken(androidToken.token)"
              >
                刪除
              </v-btn>
            </td>
          </tr>

          <tr
            v-for="iosToken in iosTokenList"
            :key="iosToken.createdAt"
            :data-title="`ios token No.${iosToken + 1}`"
            class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr"
          >
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-os_td"
              :data-title="`${OS_TD_TITLE}：`"
              :data-context="iosToken.os"
            >
              {{ iosToken.os }}
            </td>
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-token_td"
              :data-title="`${TOKEN_TD_TITLE}：`"
              :data-context="iosToken.token"
            >
              {{ iosToken.token }}
            </td>
            <td
              class="cloud_messaging_page-skeleton_loader-scroll_fetch-token_table-tbody-tr-action_td"
              :data-title="`${ACRION_TITLE}：`"
            >
              <v-btn color="error" @click="handleDeleteToken(iosToken.token)">
                刪除
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <!-- https://vuetifyjs.com/en/components/empty-states -->
      <v-empty-state
        v-else
        width="100%"
        color="primary"
        justify="center"
        icon="mdi-alert"
        title="暫無資料"
        text="請稍後再試"
        action-text="重新整理"
        @click:action="handleRefresh"
      />
    </v-skeleton-loader>
  </div>
</template>

<script setup>
import { VTextField, VForm, VBtn } from 'vuetify/components';

useHead({
  title: 'Firebase Cloud Messaging 後台'
});

const nuxtApp = useNuxtApp();
const { $pinia } = nuxtApp;
const system = useSystemStore($pinia);

const { pending, data, error, refresh } = await useAsyncData(
  'cloud-messaging-tokens',
  async () => {
    if (import.meta.server === true) {
      const { messagingFindAllToken } = nuxtApp.$serverFirebaseMessaging;
      const [webTokenList, androidTokenList, iosTokenList] = await Promise.all([
        messagingFindAllToken({ os: 'web' }),
        messagingFindAllToken({ os: 'android' }),
        messagingFindAllToken({ os: 'ios' })
      ]);

      const tokenList = { webTokenList, androidTokenList, iosTokenList };
      return JSON.parse(JSON.stringify(tokenList));
    }

    const response =
      await nuxtApp.$clientFirebaseAdmin.GET_getMessageTokens(false);

    return response;
  },
  { watch: [() => system.firebaseMessagingInited] }
);
if (error.value) {
  console.error('Error fetching cloud messaging tokens:', error.value);
}

const OS_TD_TITLE = computed(() => '作業系統');
const TOKEN_TD_TITLE = computed(() => 'token');
const ACRION_TITLE = computed(() => '操作');

const appMessageTitle = ref('appMessageTitle');
const appMessageData = ref('appMessage');
const appMessageImg = ref('/img/ico/favicon.svg');
const isValidSubmit = ref(false);
const loading = ref(false);

const webTokenList = computed(() => data.value?.webTokenList || []);
const androidTokenList = computed(() => data.value?.androidTokenList || []);
const iosTokenList = computed(() => data.value?.iosTokenList || []);
const hasData = computed(
  () =>
    (Array.isArray(webTokenList.value) && webTokenList.value.length > 0) ||
    (Array.isArray(androidTokenList.value) &&
      androidTokenList.value.length > 0) ||
    (Array.isArray(iosTokenList.value) && iosTokenList.value.length > 0)

  // () =>
  //   Array.isArray(webTokenList.value) &&
  //   webTokenList.value.length > 0 &&
  //   Array.isArray(androidTokenList.value) &&
  //   androidTokenList.value.length > 0 &&
  //   Array.isArray(iosTokenList.value) &&
  //   iosTokenList.value.length > 0
);

const handleCheckMessageTitle = computed(() => [
  function handleCheckMessageTitle(messageTitle) {
    if (!messageTitle || messageTitle.trim() === '') {
      return '請檢查推播標題';
    }
    return true;
  }
]);
const handleCheckMessageData = computed(() => [
  function handleCheckMessageData(messageData) {
    if (!messageData || messageData.trim() === '') {
      return '請檢查推播訊息';
    }
    return true;
  }
]);

async function POST_PushNotification() {
  if (import.meta.server === true) return;

  return await nuxtApp.$clientFirebaseAdmin.POST_pushNotification({
    title: appMessageTitle.value,
    data: appMessageData.value,
    img: appMessageImg.value
  });
}

async function DELETE_DeleteToken(token) {
  if (import.meta.server === true) return;

  return await nuxtApp.$clientFirebaseAdmin.DELETE_cancelMessageToken(token);
}

async function handleRefresh() {
  if (pending.value === true) return;

  nuxtApp.$store.system.setLoading(true);
  await refresh();
  nuxtApp.$store.system.setLoading(false);
}

function handleResetForm() {
  appMessageTitle.value = 'appMessageTitle';
  appMessageData.value = 'appMessage';
  appMessageImg.value = '/img/ico/favicon.svg';
}
async function handlePushNotification() {
  console.log({
    isValidSubmit: isValidSubmit.value,
    pending: pending.value,
    loading: loading.value
  });

  if (
    isValidSubmit.value === false ||
    pending.value === true ||
    loading.value === true
  ) {
    return;
  }

  console.log('push notification');

  nuxtApp.$store.system.setLoading(true);
  loading.value = true;

  try {
    const response = await POST_PushNotification();

    console.log({ response });

    const { failureCount = 0, successCount = 0 } = response;
    nuxtApp.$infoMessage(
      `執行完畢，成功向${successCount}份裝置發送推播訊息，${failureCount}份裝置發送失敗`
    );
  } catch (error) {
    console.error('Error sending push notification:', error);
  } finally {
    loading.value = false;
    nuxtApp.$store.system.setLoading(false);
  }
}
async function handleDeleteToken(token) {
  if (pending.value === true || loading.value === true) {
    return;
  }

  console.log({ token });

  loading.value = true;
  nuxtApp.$store.system.setLoading(true);
  try {
    await DELETE_DeleteToken(token);
    await handleRefresh();
    nuxtApp.$successMessage('刪除成功');
  } catch (error) {
    console.error('Error deleting token:', error);
    nuxtApp.$errorMessage('刪除失敗');
  } finally {
    loading.value = false;
    nuxtApp.$store.system.setLoading(false);
  }
}
</script>

<style lang="scss" scoped>
@mixin mobile_td {
  @include mobile {
    --v-table-row-height: auto;
    --v-border-opacity: 0;

    margin-bottom: 10px;

    @content;

    &::before {
      content: attr(data-title);
      flex-shrink: 0;
      display: inline-block;
      // width: 100%;
    }
  }
}
@mixin os {
  width: 30%;

  word-break: keep-all;

  @include mobile_td {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    width: 100%;
  }
}
@mixin token {
  width: 60%;

  overflow: auto;

  word-break: break-all;

  @include mobile_td {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    width: 100%;
  }
}
@mixin action {
  width: 10%;

  @include mobile_td {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    width: 100%;
  }
}
@mixin tr {
  width: 100%;

  @include mobile {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    padding: 10px 0px 0px 10px;
    margin-bottom: 10px;
    // border-bottom: thin solid
    //   rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 10px;

    background-color: #00000014;

    &::before {
      content: attr(data-title);
      display: block;

      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}

.cloud_messaging_page {
  width: 100%;
  min-height: 500px;

  &-form {
    :deep(.v-btn) {
      padding: 0 16px;

      &.v-col {
        &:not(:last-child) {
          margin-right: 16px;

          @include mobile {
            flex: 1;
            flex-basis: 100%;

            margin-right: unset;
            margin-bottom: 16px;
          }
        }
      }
    }
  }

  &-refresh_btn {
    // @include mobile {
    //   display: none;
    // }
    :deep(.v-btn) {
      padding: 0 16px;
    }
  }

  &-skeleton_loader {
    height: 100%;

    &-scroll_fetch {
      height: 100%;
      width: 100%;

      &-token_table {
        width: 100%;
        height: 100%;
        margin: 10px 0;

        @include mobile {
          user-select: none;
        }

        &-thead {
          width: 100%;

          @include mobile {
            display: none;
          }
          &-title_row {
            @include tr;

            &-os_th {
              @include os;
            }
            &-token_th {
              @include token;
            }
            &-action_th {
              @include action;
            }
          }
        }

        &-tbody {
          width: 100%;

          &-tr {
            @include tr;

            &-os_td {
              @include os;
            }
            &-token_td {
              @include token;
            }
            &-action_td {
              @include action;
            }
          }
        }
      }
    }
  }
}
</style>
