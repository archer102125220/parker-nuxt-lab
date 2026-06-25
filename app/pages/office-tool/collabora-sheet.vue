<script setup>
import { COLLABORA_LOCALES } from '@app/components/CollaboraIframe.vue';

const route = useRoute();
const { locale } = useI18n();
const systemStore = useSystemStore();

const language = computed(() => {
  const _locale =
    locale.value === 'zh'
      ? 'zh-TW'
      : locale.value === 'en'
        ? 'en-US'
        : locale.value;
  const target = COLLABORA_LOCALES.find((item) => item.code === _locale);
  return target?.code ?? 'zh-TW';
});

const fileType = computed(() => route.query.type || 'xlsx');
const fileId = computed(() => route.query.file || 'test.xlsx');
const collaboraHost = computed(() => {
  return import.meta.env.VITE_COLLABORA_HOST || 'http://localhost:9980';
});
const wopiHost = computed(() => {
  return (
    import.meta.env.VITE_WOPI_HOST || 'http://192.168.139.3:3000/collabora'
  );
});

// 表單狀態
const userId = useState(
  'collabora_sheet_user_id',
  () => `user-${Math.floor(Math.random() * 1000)}`
);
const userName = ref('Test User');
const token = ref('');
const isGenerating = ref(false);

const { $request, $errorMessage, $successMessage } = useNuxtApp();

const dockerCommandHttp =
  'docker run -t -d -p 9980:9980 -e "aliasgroup1=http://192.168.139.3:3000,http://host.docker.internal:3000" -e "extra_params=--o:ssl.enable=false" collabora/code';

const dockerCommandHttps =
  'docker run -t -d -p 9980:9980 -e "aliasgroup1=https://192.168.139.3:3000,https://host.docker.internal:3000" -e "extra_params=--o:ssl.enable=true --o:ssl.ssl_verification=false" collabora/code';

const copyDockerCommand = async (cmd) => {
  try {
    await navigator.clipboard.writeText(cmd);
    $successMessage('已複製指令');
  } catch (err) {
    console.error(err);
    $errorMessage('複製失敗');
  }
};

async function generateToken() {
  if (
    typeof userId.value !== 'string' ||
    userId.value === '' ||
    typeof userName.value !== 'string' ||
    userName.value === '' ||
    systemStore.loading === true
  ) {
    return;
  }

  systemStore.setLoading(true);
  try {
    isGenerating.value = true;
    const response = await $request.post('/collabora/token', {
      userId: userId.value,
      userName: userName.value
    });
    token.value = response.token;
  } catch (error) {
    console.error('Failed to generate token:', error);
    $errorMessage('產生 Token 失敗，請重試');
  } finally {
    isGenerating.value = false;
    systemStore.setLoading(false);
  }
}
</script>

<template>
  <div class="collabora_sheet_page">
    <div class="collabora_sheet_page-description">
      <p>{{ $t('collabora_sheet_page.title') }}</p>
      <p>{{ $t('collabora_sheet_page.description') }}</p>

      <v-btn
        href="https://hub.docker.com/r/collabora/code"
        target="_blank"
        rel="noopener noreferrer"
        color="grey-darken-4"
        rounded="xl"
        size="large"
      >
        <p>{{ $t('collabora_sheet_page.docker_btn') }}</p>
        <v-icon icon="mdi-open-in-new" size="small" />
      </v-btn>
    </div>

    <!-- Docker 啟動說明 -->
    <v-expansion-panels class="collabora_sheet_page-guide" variant="accordion">
      <v-expansion-panel>
        <v-expansion-panel-title class="collabora_sheet_page-guide-header">
          <span class="collabora_sheet_page-guide-header-icon">ℹ️</span>
          <span class="collabora_sheet_page-guide-header-text">
            Docker 啟動與常見問題說明
          </span>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="collabora_sheet_page-guide-content">
          <div class="collabora_sheet_page-guide-content-desc">
            若在編輯器中看見「Unauthorized Host」錯誤，表示 Collabora
            尚未授權專案的網址存取。請根據您的 Nuxt 執行環境選擇對應的指令啟動
            (Port 為 9980)：
          </div>
          <p class="collabora_sheet_page-guide-content-subtitle">
            HTTP 環境 (最單純推薦)
          </p>
          <div class="collabora_sheet_page-guide-content-code">
            <span>{{ dockerCommandHttp }}</span>
            <v-btn
              icon="mdi-content-copy"
              variant="text"
              size="small"
              class="collabora_sheet_page-guide-content-code-copy"
              @click="copyDockerCommand(dockerCommandHttp)"
            />
          </div>
          <p class="collabora_sheet_page-guide-content-subtitle">
            HTTPS 環境 (需避開自簽憑證檢查)
          </p>
          <div class="collabora_sheet_page-guide-content-code">
            <span>{{ dockerCommandHttps }}</span>
            <v-btn
              icon="mdi-content-copy"
              variant="text"
              size="small"
              class="collabora_sheet_page-guide-content-code-copy"
              @click="copyDockerCommand(dockerCommandHttps)"
            />
          </div>
          <div class="collabora_sheet_page-guide-content-note">
            <p class="collabora_sheet_page-guide-content-note-item">
              注意：因為 Collabora 是跑在 Docker 容器內，無法直接透過 localhost
              存取本機的 Nuxt API。
            </p>
            <p class="collabora_sheet_page-guide-content-note-item">
              因此，wopiHost 必須填寫您的區域網路 IP（如 192.168.x.x）或是
              host.docker.internal。
            </p>
            <p class="collabora_sheet_page-guide-content-note-item">
              同時也必須在啟動指令的 aliasgroup1 中包含對應的 IP
              網域以通過授權。
            </p>
          </div>
          <div class="collabora_sheet_page-guide-content-troubleshoot">
            <p class="collabora_sheet_page-guide-content-troubleshoot-title">
              【常見問題】Mixed Content 混合內容封鎖 (無法建立連線)
            </p>
            <p class="collabora_sheet_page-guide-content-troubleshoot-item">
              若您的 Nuxt 跑在 https://localhost:3000，但 Collabora 跑
              HTTP，瀏覽器會直接封鎖 Iframe。
            </p>
            <p class="collabora_sheet_page-guide-content-troubleshoot-item">
              解決方案：改用上方的 HTTPS 環境 Docker 指令，並在 .env 設定
              VITE_COLLABORA_HOST 為 https://localhost:9980。
            </p>
            <p class="collabora_sheet_page-guide-content-troubleshoot-item">
              【注意】若改用 HTTPS，由於 Collabora
              產生的為自簽憑證，必須手動開新分頁前往 https://localhost:9980
              點擊「進階 -> 繼續前往」信任憑證。
            </p>

            <p class="collabora_sheet_page-guide-content-troubleshoot-title">
              【常見問題】WebSocket 斷線 (Data frame received after close)
            </p>
            <p class="collabora_sheet_page-guide-content-troubleshoot-item">
              若編輯器畫面卡死且 Console 出現此錯誤，通常是因為 Collabora
              嘗試連回您的 Nuxt HTTPS API 讀取檔案，但因為您的憑證是自簽的而被
              Collabora 阻擋斷線。
            </p>
            <p class="collabora_sheet_page-guide-content-troubleshoot-item">
              解決方案：HTTPS 指令中必須加上 --o:ssl.ssl_verification=false
              來關閉 Collabora 的 SSL 驗證。
            </p>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 加入使用者資訊表單 -->
    <div class="collabora_sheet_page-auth">
      <div class="collabora_sheet_page-auth-title">使用者登入資訊</div>
      <form
        class="collabora_sheet_page-auth-form"
        @submit.prevent="generateToken"
      >
        <div class="collabora_sheet_page-auth-form-fields">
          <v-text-field
            v-model="userId"
            class="collabora_sheet_page-auth-form-fields-input"
            label="User ID"
            variant="outlined"
            required
            hide-details="auto"
          />
          <v-text-field
            v-model="userName"
            class="collabora_sheet_page-auth-form-fields-input"
            label="User Name"
            variant="outlined"
            required
            hide-details="auto"
          />
        </div>
        <v-btn
          class="collabora_sheet_page-auth-form-btn"
          color="primary"
          type="submit"
          :loading="isGenerating"
          :disabled="!userId || !userName"
        >
          產生 Token 並開啟編輯器
        </v-btn>
      </form>
    </div>

    <CollaboraIframe
      v-if="token"
      :key="token"
      class="collabora_sheet_page-collabora"
      :token="token"
      :collabora-host="collaboraHost"
      :file-id="fileId"
      :file-type="fileType"
      :wopi-host="wopiHost"
      :language="language"
    />
  </div>
</template>

<style lang="scss" scoped>
.collabora_sheet_page {
  width: 100%;
  height: 100vh;

  &-description {
    margin-bottom: 16px;
  }

  &-guide {
    margin-bottom: 16px;

    &-header {
      display: flex;
      align-items: center;

      &-icon {
        margin-right: 8px;
      }

      &-text {
        font-size: 16px;
        font-weight: 500;
        color: #0077cc;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &-desc {
        font-size: 14px;
        color: #333;
      }

      &-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 8px 8px 12px;
        font-family: monospace;
        font-size: 14px;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        word-break: break-all;

        &-copy {
          flex-shrink: 0;
          margin-left: 8px;
        }
      }

      &-note,
      &-troubleshoot {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        color: #666;

        &-item {
          line-height: 1.4;
        }
      }

      &-subtitle {
        font-weight: bold;
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 4px;
        color: #333;
      }

      &-troubleshoot {
        &-title {
          font-weight: bold;
          margin-top: 8px;
        }
        &-subitem {
          line-height: 1.4;
          padding-left: 12px;
        }
      }
    }
  }

  &-auth {
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;

    &-title {
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 500;
    }

    &-form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      &-fields {
        display: flex;
        gap: 16px;

        &-input {
          flex: 1;
        }
      }

      &-btn {
        align-self: flex-start;
      }
    }
  }

  &-collabora {
    width: 100%;
    height: 100%;
  }
}
</style>
