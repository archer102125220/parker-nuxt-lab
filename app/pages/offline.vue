<template>
  <v-container class="offline-page fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="offline-card" elevation="8">
          <v-card-text class="text-center pa-8">
            <!-- 離線圖示 -->
            <v-icon
              :icon="isOnline ? 'mdi-wifi' : 'mdi-wifi-off'"
              :color="isOnline ? 'success' : 'grey'"
              size="120"
              class="mb-6 offline-icon"
            />

            <!-- 標題 -->
            <h1 class="text-h4 mb-4 font-weight-bold">
              {{ isOnline ? $t('offline.backOnline') : $t('offline.title') }}
            </h1>

            <!-- 說明文字 -->
            <p class="text-body-1 text-medium-emphasis mb-6">
              {{
                isOnline ? $t('offline.canRetry') : $t('offline.description')
              }}
            </p>

            <!-- 網路狀態指示器 -->
            <v-chip
              :color="isOnline ? 'success' : 'error'"
              variant="flat"
              class="mb-6"
              size="large"
            >
              <v-icon
                start
                :icon="isOnline ? 'mdi-check-circle' : 'mdi-alert-circle'"
              />
              {{ isOnline ? $t('offline.online') : $t('offline.offline') }}
            </v-chip>

            <!-- 操作按鈕 -->
            <div class="d-flex flex-column gap-3">
              <v-btn
                v-if="isOnline"
                color="primary"
                size="large"
                variant="flat"
                block
                @click="retryLoad"
              >
                <v-icon start icon="mdi-refresh" />
                {{ $t('offline.retry') }}
              </v-btn>

              <v-btn
                color="primary"
                size="large"
                :variant="isOnline ? 'outlined' : 'flat'"
                block
                @click="goHome"
              >
                <v-icon start icon="mdi-home" />
                {{ $t('offline.goHome') }}
              </v-btn>
            </div>

            <!-- 提示訊息 -->
            <v-alert
              v-if="!isOnline"
              type="info"
              variant="tonal"
              class="mt-6 text-left"
            >
              <template #title>
                {{ $t('offline.tipTitle') }}
              </template>
              {{ $t('offline.tipMessage') }}
            </v-alert>
          </v-card-text>
        </v-card>

        <!-- 額外資訊 -->
        <div class="text-center mt-6">
          <p class="text-caption text-medium-emphasis">
            {{ $t('offline.autoDetect') }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

// 網路狀態 - 初始化為 true 避免 SSR 問題
const isOnline = ref(true);

// 網路狀態變化處理
const handleOnline = () => {
  isOnline.value = true;
};

const handleOffline = () => {
  isOnline.value = false;
};

// 重試載入
const retryLoad = () => {
  if (import.meta.client) {
    // 嘗試返回上一頁或重新載入
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.reload();
    }
  }
};

// 返回首頁
const goHome = () => {
  router.push('/');
};

// 生命週期
onMounted(() => {
  if (import.meta.client) {
    // 設置初始網路狀態
    isOnline.value = navigator.onLine;

    // 監聽網路狀態變化
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  }
});

// SEO
useHead({
  title: t('offline.title'),
  meta: [
    { name: 'description', content: t('offline.description') },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});
</script>

<style lang="scss" scoped>
.offline-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.offline-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.offline-icon {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.95);
  }
}

.gap-3 {
  gap: 12px;
}
</style>
