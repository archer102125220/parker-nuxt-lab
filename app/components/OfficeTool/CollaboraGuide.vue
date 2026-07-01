<script setup>
const { $successMessage, $errorMessage } = useNuxtApp();
const { t } = useI18n();

const dockerCommandHttp =
  'docker run -t -d -p 9980:9980 -e "aliasgroup1=http://192.168.139.3:3000,http://host.docker.internal:3000" -e "extra_params=--o:ssl.enable=false" collabora/code';

const dockerCommandHttps =
  'docker run -t -d -p 9980:9980 -e "aliasgroup1=https://192.168.139.3:3000,https://host.docker.internal:3000" -e "extra_params=--o:ssl.enable=true --o:ssl.ssl_verification=false" collabora/code';

async function copyDockerCommand(copyContent) {
  try {
    await navigator.clipboard.writeText(copyContent);
    $successMessage(t('office_tool.guide.copy_success'));
  } catch (err) {
    console.error(err);
    $errorMessage(t('office_tool.guide.copy_failed'));
  }
}
</script>

<template>
  <v-expansion-panels class="office_tool_collabora_guide" variant="accordion">
    <v-expansion-panel>
      <v-expansion-panel-title class="office_tool_collabora_guide-header">
        <span class="office_tool_collabora_guide-header-icon">ℹ️</span>
        <span class="office_tool_collabora_guide-header-text">
          {{ $t('office_tool.guide.title') }}
        </span>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="office_tool_collabora_guide-content">
        <p class="office_tool_collabora_guide-content-desc">
          {{ $t('office_tool.guide.unauthorized_host_desc') }}
        </p>
        <p class="office_tool_collabora_guide-content-subtitle">
          {{ $t('office_tool.guide.http_env') }}
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
          {{ $t('office_tool.guide.https_env') }}
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
            {{ $t('office_tool.guide.note_1') }}
          </p>
          <p class="office_tool_collabora_guide-content-note-item">
            {{ $t('office_tool.guide.note_2') }}
          </p>
          <p class="office_tool_collabora_guide-content-note-item">
            {{ $t('office_tool.guide.note_3') }}
          </p>
        </div>
        <div class="office_tool_collabora_guide-content-troubleshoot">
          <p class="office_tool_collabora_guide-content-troubleshoot-title">
            {{ $t('office_tool.guide.troubleshoot_mixed_content_title') }}
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            {{ $t('office_tool.guide.troubleshoot_mixed_content_desc1') }}
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            {{ $t('office_tool.guide.troubleshoot_mixed_content_desc2') }}
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            {{ $t('office_tool.guide.troubleshoot_mixed_content_desc3') }}
          </p>

          <p class="office_tool_collabora_guide-content-troubleshoot-title">
            {{ $t('office_tool.guide.troubleshoot_websocket_title') }}
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            {{ $t('office_tool.guide.troubleshoot_websocket_desc1') }}
          </p>
          <p class="office_tool_collabora_guide-content-troubleshoot-item">
            {{ $t('office_tool.guide.troubleshoot_websocket_desc2') }}
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
