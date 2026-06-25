<script setup>
const { $successMessage, $errorMessage } = useNuxtApp();

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
</script>

<template>
  <v-expansion-panels class="office_tool_collabora_guide" variant="accordion">
    <v-expansion-panel>
      <v-expansion-panel-title class="office_tool_collabora_guide-header">
        <span class="office_tool_collabora_guide-header-icon">ℹ️</span>
        <span class="office_tool_collabora_guide-header-text">
          Docker 啟動與常見問題說明
        </span>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="office_tool_collabora_guide-content">
        <p class="office_tool_collabora_guide-content-desc">
          若在編輯器中看見「Unauthorized Host」錯誤，表示 Collabora
          尚未授權專案的網址存取。請根據您的 Nuxt 執行環境選擇對應的指令啟動
          (Port 為 9980)：
        </p>
        <p class="office_tool_collabora_guide-content-subtitle">
          HTTP 環境 (最單純推薦)
        </p>
        <div class="office_tool_collabora_guide-content-code">
          <span>{{ dockerCommandHttp }}</span>
          <v-btn
            icon="mdi-content-copy"
            variant="text"
            size="small"
            class="office_tool_collabora_guide-content-code-copy"
            @click="copyDockerCommand(dockerCommandHttp)"
          />
        </div>
        <p class="office_tool_collabora_guide-content-subtitle">
          HTTPS 環境 (需避開自簽憑證檢查)
        </p>
        <div class="office_tool_collabora_guide-content-code">
          <span>{{ dockerCommandHttps }}</span>
          <v-btn
            icon="mdi-content-copy"
            variant="text"
            size="small"
            class="office_tool_collabora_guide-content-code-copy"
            @click="copyDockerCommand(dockerCommandHttps)"
          />
        </div>
        <div class="office_tool_collabora_guide-content-note">
          <p class="office_tool_collabora_guide-content-note-item">
            注意：因為 Collabora 是跑在 Docker 容器內，無法直接透過 localhost
            存取本機的 Nuxt API。
          </p>
          <p class="office_tool_collabora_guide-content-note-item">
            因此，wopiHost 必須填寫您的區域網路 IP（如 192.168.x.x）或是
            host.docker.internal。
          </p>
          <p class="office_tool_collabora_guide-content-note-item">
            同時也必須在啟動指令的 aliasgroup1 中包含對應的 IP
            網域以通過授權。
          </p>
        </div>
        <div class="office_tool_collabora_guide-content-troubleshoot">
          <p class="office_tool_collabora_guide-content-troubleshoot-title">
            【常見問題】Mixed Content 混合內容封鎖 (無法建立連線)
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            若您的 Nuxt 跑在 https://localhost:3000，但 Collabora 跑
            HTTP，瀏覽器會直接封鎖 Iframe。
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            解決方案：改用上方的 HTTPS 環境 Docker 指令，並在 .env 設定
            VITE_COLLABORA_HOST 為 https://localhost:9980。
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            【注意】若改用 HTTPS，由於 Collabora
            產生的為自簽憑證，必須手動開新分頁前往 https://localhost:9980
            點擊「進階 -> 繼續前往」信任憑證。
          </p>

          <p class="office_tool_collabora_guide-content-troubleshoot-title">
            【常見問題】WebSocket 斷線 (Data frame received after close)
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            若編輯器畫面卡死且 Console 出現此錯誤，通常是因為 Collabora
            嘗試連回您的 Nuxt HTTPS API 讀取檔案，但因為您的憑證是自簽的而被
            Collabora 阻擋斷線。
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            解決方案：HTTPS 指令中必須加上 --o:ssl.ssl_verification=false
            來關閉 Collabora 的 SSL 驗證。
          </p>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
.office_tool_collabora_guide {
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

    &-subtitle {
      font-weight: bold;
      font-size: 14px;
      margin-top: 12px;
      margin-bottom: 4px;
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
</style>
