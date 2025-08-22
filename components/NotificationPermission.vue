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
          <v-btn color="error" variant="elevated" @click="handleCancel">
            不同意
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="handleCofirm">
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
const { $firebaseHelper } = nuxtApp;

const isShow = ref(false);

onMounted(() => {
  const result = $firebaseHelper.getPermission();
  isShow.value = result === false;
});

function handleCancel() {
  // 在這裡處理取消的邏輯
  isShow.value = false;
}

async function handleCofirm() {
  // 在這裡處理同意的邏輯
  isShow.value = false;

  const result = await $firebaseHelper.requestPermission();
  if (result === true) {
    await $firebaseHelper.firebaseMessagingInit();
  }
  isShow.value = false;
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
