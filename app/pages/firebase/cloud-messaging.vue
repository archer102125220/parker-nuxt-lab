<template>
  <div class="cloud_messaging_page">
    <!-- Hero Section -->
    <section class="cloud_messaging_page-hero">
      <div class="cloud_messaging_page-hero-background">
        <div class="cloud_messaging_page-hero-background-overlay" />
      </div>

      <div class="cloud_messaging_page-hero-content">
        <h1 class="cloud_messaging_page-hero-content-title">
          {{ $t('cloud_messaging_page.hero.title') }}
        </h1>
        <p class="cloud_messaging_page-hero-content-subtitle">
          {{ $t('cloud_messaging_page.hero.subtitle') }}
        </p>
        <p class="cloud_messaging_page-hero-content-description">
          {{ $t('cloud_messaging_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="cloud_messaging_page-section">
      <p class="cloud_messaging_page-intro">
        {{ $t('cloud_messaging_page.intro') }}
      </p>

      <v-container
        v-model="isValidSubmit"
        class="cloud_messaging_page-form"
        :tag="VForm"
        @submit.prevent="handlePushNotification"
      >
        <v-row>
          <v-col
            v-model="appMessageTitle"
            cols="12"
            sm="12"
            :tag="VTextField"
            :label="$t('cloud_messaging_page.form.title_label')"
            :rules="handleCheckMessageTitle"
          />
          <v-col
            v-model="appMessageData"
            cols="12"
            sm="12"
            :tag="VTextField"
            :label="$t('cloud_messaging_page.form.message_label')"
            :rules="handleCheckMessageData"
          />
          <v-col
            v-model="appMessageImg"
            cols="12"
            sm="12"
            :tag="VTextField"
            :label="$t('cloud_messaging_page.form.image_label')"
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
            <span>{{ $t('cloud_messaging_page.form.reset') }}</span>
          </v-col>
          <v-col
            :tag="VBtn"
            color="primary"
            type="submit"
            width="100%"
            min-height="100%"
            :disabled="isValidSubmit === false"
          >
            {{ $t('cloud_messaging_page.form.submit') }}
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
            <span>{{ $t('cloud_messaging_page.table.refresh') }}</span>
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
                    <span>{{ $t('cloud_messaging_page.table.delete') }}</span>
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
                    <span>{{ $t('cloud_messaging_page.table.delete') }}</span>
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
                    <span>{{ $t('cloud_messaging_page.table.delete') }}</span>
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
          :title="$t('cloud_messaging_page.table.no_data')"
          :text="$t('cloud_messaging_page.table.no_data_hint')"
          :action-text="$t('cloud_messaging_page.table.refresh')"
          @click:action="handleRefresh"
        />
      </v-skeleton-loader>
    </section>
  </div>
</template>

<script setup>
import { VTextField, VForm, VBtn } from 'vuetify/components';

const { t } = useI18n();

useHeadMataData({
  title: t('cloud_messaging_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('cloud_messaging_page.hero.description')
    }
  ]
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
if (typeof error.value === 'object' && error.value !== null) {
  console.error('Error fetching cloud messaging tokens:', error.value);
}

const OS_TD_TITLE = computed(() => t('cloud_messaging_page.table.os'));
const TOKEN_TD_TITLE = computed(() => t('cloud_messaging_page.table.token'));
const ACRION_TITLE = computed(() => t('cloud_messaging_page.table.action'));

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
      return t('cloud_messaging_page.form.title_error');
    }
    return true;
  }
]);
const handleCheckMessageData = computed(() => [
  function handleCheckMessageData(messageData) {
    if (!messageData || messageData.trim() === '') {
      return t('cloud_messaging_page.form.message_error');
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
      t('cloud_messaging_page.status.success', { success: successCount, failure: failureCount })
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
    nuxtApp.$successMessage(t('cloud_messaging_page.status.delete_success'));
  } catch (error) {
    console.error('Error deleting token:', error);
    nuxtApp.$errorMessage(t('cloud_messaging_page.status.delete_error'));
  } finally {
    loading.value = false;
    nuxtApp.$store.system.setLoading(false);
  }
}
</script>

<style lang="scss" scoped>
@mixin mobile_td {
  @include mobile {
    /* Display & Box Model */
    --v-table-row-height: auto;
    --v-border-opacity: 0;
    margin-bottom: 10px;

    @content;

    &::before {
      /* Display & Box Model */
      display: inline-block;
      flex-shrink: 0;
      // width: 100%;

      /* Misc */
      content: attr(data-title);
    }
  }
}
@mixin os {
  /* Display & Box Model */
  width: 30%;

  /* Typography */
  word-break: keep-all;

  @include mobile_td {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
}
@mixin token {
  /* Display & Box Model */
  width: 60%;
  overflow: auto;

  /* Typography */
  word-break: break-all;

  @include mobile_td {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
  }
}
@mixin action {
  /* Display & Box Model */
  width: 10%;

  @include mobile_td {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
  }
}
@mixin tr {
  /* Display & Box Model */
  width: 100%;

  @include mobile {
    /* Display & Box Model */
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 10px 0px 0px 10px;
    margin-bottom: 10px;
    // border-bottom: thin solid
    //   rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 10px;

    /* Visual */
    background-color: #00000014;

    &::before {
      /* Display & Box Model */
      display: block;
      margin-right: 10px;
      margin-bottom: 10px;

      /* Misc */
      content: attr(data-title);
    }
  }
}

.cloud_messaging_page {
  /* Display & Box Model */
  width: 100%;
  min-height: 100vh;

  // ========================================
  // Hero Section
  // ========================================
  &-hero {
    // Positioning
    position: relative;

    // Display & Box Model
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;

    // Visual
    overflow: hidden;

    &-background {
      // Positioning
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;

      // Display & Box Model
      width: 100%;
      height: 100%;

      // Visual
      background: linear-gradient(135deg, #44A08D 0%, #4ECDC4 100%);

      &-overlay {
        // Positioning
        position: absolute;
        top: 0;
        left: 0;

        // Display & Box Model
        width: 100%;
        height: 100%;

        // Visual
        background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
      }
    }

    &-content {
      // Positioning
      position: relative;
      z-index: 1;

      // Display & Box Model
      max-width: 800px;
      text-align: center;

      &-title {
        // Display & Box Model
        margin: 0 0 12px 0;

        // Typography
        font-size: 42px;
        font-weight: 800;
        color: #ffffff;

        // Animation
        animation: fade-in-up 0.6s ease-out;

        @media (max-width: 768px) {
          font-size: 32px;
        }
      }

      &-subtitle {
        // Display & Box Model
        margin: 0 0 16px 0;

        // Typography
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);

        // Animation
        animation: fade-in-up 0.6s ease-out 0.1s both;

        @media (max-width: 768px) {
          font-size: 18px;
        }
      }

      &-description {
        // Display & Box Model
        margin: 0;

        // Typography
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);

        // Animation
        animation: fade-in-up 0.6s ease-out 0.2s both;
      }
    }
  }

  &-section {
    // Display & Box Model
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  &-intro {
    // Display & Box Model
    margin-bottom: 24px;

    // Typography
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;
  }

  &-form {
    :deep(.v-btn) {
      /* Display & Box Model */
      padding: 0 16px;

      &.v-col {
        &:not(:last-child) {
          /* Display & Box Model */
          margin-right: 16px;

          @include mobile {
            /* Display & Box Model */
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
      /* Display & Box Model */
      padding: 0 16px;
    }
  }

  &-skeleton_loader {
    /* Display & Box Model */
    height: 100%;

    &-scroll_fetch {
      /* Display & Box Model */
      width: 100%;
      height: 100%;

      &-token_table {
        /* Display & Box Model */
        width: 100%;
        height: 100%;
        margin: 10px 0;

        @include mobile {
          /* Misc */
          user-select: none;
        }

        &-thead {
          /* Display & Box Model */
          width: 100%;

          @include mobile {
            /* Display & Box Model */
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
          /* Display & Box Model */
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
