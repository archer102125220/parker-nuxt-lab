<template>
  <div class="cloud_messaging_page">
    <v-skeleton-loader type="table" :loading="pending">
      <ScrollFetch :refresh="refresh">
        <v-table class="cloud_messaging_page-token_table" fixed-header>
          <thead class="cloud_messaging_page-token_table-thead">
            <tr class="cloud_messaging_page-token_table-thead-tr">
              <th class="cloud_messaging_page-token_table-thead-tr-os_th">
                作業系統
              </th>
              <th class="cloud_messaging_page-token_table-thead-tr-token_th">
                token
              </th>
            </tr>
          </thead>
          <tbody class="cloud_messaging_page-token_table-tbody">
            <tr
              v-for="webToken in webTokenList"
              :key="webToken.createdAt"
              class="cloud_messaging_page-token_table-tbody-tr"
            >
              <td
                class="cloud_messaging_page-token_table-tbody-tr-os_td"
                data-title="作業系統"
                :data-context="webToken.os"
              >
                {{ webToken.os }}
              </td>
              <td
                class="cloud_messaging_page-token_table-tbody-tr-token_td"
                data-title="token"
                :data-context="webToken.token"
              >
                {{ webToken.token }}
              </td>
            </tr>

            <tr
              v-for="androidToken in androidTokenList"
              :key="androidToken.createdAt"
              class="cloud_messaging_page-token_table-tbody-tr"
            >
              <td
                class="cloud_messaging_page-token_table-tbody-tr-os_td"
                data-title="作業系統"
                :data-context="androidToken.os"
              >
                {{ androidToken.os }}
              </td>
              <td
                class="cloud_messaging_page-token_table-tbody-tr-token_td"
                data-title="token"
                :data-context="androidToken.token"
              >
                {{ androidToken.token }}
              </td>
            </tr>

            <tr
              v-for="iosToken in iosTokenList"
              :key="iosToken.createdAt"
              class="cloud_messaging_page-token_table-tbody-tr"
            >
              <td
                class="cloud_messaging_page-token_table-tbody-tr-os_td"
                data-title="作業系統"
                :data-context="iosToken.os"
              >
                {{ iosToken.os }}
              </td>
              <td
                class="cloud_messaging_page-token_table-tbody-tr-token_td"
                data-title="token"
                :data-context="iosToken.token"
              >
                {{ iosToken.token }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </ScrollFetch>
    </v-skeleton-loader>
  </div>
</template>

<script setup>
useHead({
  title: 'Firebase Cloud Messaging 後台'
});

const nuxtApp = useNuxtApp();

const asyncData = await useAsyncData('cloud-messaging-tokens', async () => {
  if (import.meta.server === true) {
    const { messagingFindAllToken } = await import(
      '@/services/server/firebase-admin'
    );
    const [webTokenList, androidTokenList, iosTokenList] = await Promise.all([
      messagingFindAllToken({ os: 'web' }),
      messagingFindAllToken({ os: 'android' }),
      messagingFindAllToken({ os: 'ios' })
    ]);

    const tokenList = { webTokenList, androidTokenList, iosTokenList };
    return JSON.parse(JSON.stringify(tokenList));
  }

  const response = await nuxtApp.$clientFirebaseAdmin.GET_getMessageTokens();
  return response;
});
const { pending, data, error, refresh } = asyncData;

const webTokenList = computed(() => data.value?.webTokenList || []);
const androidTokenList = computed(() => data.value?.androidTokenList || []);
const iosTokenList = computed(() => data.value?.iosTokenList || []);
</script>

<style lang="scss" scoped>
.os {
  width: 30%;

  word-break: keep-all;
}
.token {
  width: 60%;

  overflow: auto;
}
.tr {
  width: 100%;

  @include mobile {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}

.cloud_messaging_page {
  width: 100%;

  &-token_table {
    width: 100%;
    margin: 10px 0;

    &-thead {
      width: 100%;

      @include mobile {
        display: none;
      }
      &-tr {
        @extend .tr;

        &-os_th {
          @extend .os;
        }
        &-token_th {
          @extend .token;
        }
      }
    }

    &-tbody {
      width: 100%;

      &-tr {
        @extend .tr;

        &-os_td {
          @extend .os;
        }
        &-token_td {
          @extend .token;
        }
      }
    }
  }
}
</style>
