<template>
  <client-only>
    <v-snackbar
      class="notification_permission"
      location="top"
      :timeout="-1"
      :vertical="true"
      :disabled="true"
      position="sticky"
      :multi-line="true"
      variant="flat"
      v-model="isShow"
    >
      <div class="notification_permission-content">
        <p>本專案有整合firebase 的 FCM 功能，若想測試該功能需要啟用推播權限</p>
      </div>

      <template v-slot:actions>
        <div class="notification_permission-actions">
          <v-btn
            color="error"
            variant="elevated"
            :disabled="processing"
            @click="handleCancel"
          >
            不同意
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            :loading="processing"
            @click="handleCofirm"
          >
            同意
          </v-btn>
        </div>
      </template>
    </v-snackbar>
  </client-only>
</template>

<script setup>
// const props = defineProps({});
// const emit = defineEmits([]);

const nuxtApp = useNuxtApp();
const { $firebaseHelper, $pwa } = nuxtApp;

const isShow = ref(false);
const agreePermission = ref(false);
const processing = ref(false);

onMounted(() => {
  const result = $firebaseHelper.getPermission();
  agreePermission.value = result;
  // if (result === true) {
  //   $firebaseHelper.firebaseMessagingInit();
  // }
  // isShow.value = result === false;
});

watchEffect(() => {
  console.log({
    ['$pwa.offlineReady']: $pwa?.offlineReady,
    ['$pwa.isPWAInstalled']: $pwa?.isPWAInstalled
  });

  if ($pwa?.isPWAInstalled === true || $pwa?.swActivated === true) {
    if (agreePermission.value === false) {
      isShow.value = true;
    } else {
      handleFirebase();
    }
  }
});

function handleCancel() {
  isShow.value = false;
}

async function handleFirebase() {
  const result = await $firebaseHelper.requestPermission();
  if (result === true) {
    await $firebaseHelper.firebaseMessagingInit();
  }
  processing.value = false;
  isShow.value = false;
}

function handleCofirm() {
  processing.value = true;
  agreePermission.value = true;
}
</script>

<style lang="scss" scoped>
.notification_permission {
  &-content {
    width: 100%;
  }
  &-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
}
</style>
