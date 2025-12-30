<template>
  <client-only>
    <v-snackbar
      v-model="isShow"
      class="notification_permission"
      location="top"
      :timeout="-1"
      :vertical="true"
      :disabled="true"
      position="sticky"
      :multi-line="true"
      variant="flat"
    >
      <div class="notification_permission-content">
        <p>本專案有整合firebase 的 FCM 功能，若想測試該功能需要啟用推播權限</p>
      </div>

      <template #actions>
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
const { $pinia, $Firebase } = nuxtApp;
const system = useSystemStore($pinia);

const isShow = ref(false);
const processing = ref(false);

const agreePermission = computed(() => system.agreeNotification);

watchEffect(() => {
  if (system.firebaseCroeInited === true) {
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
  const result = await $Firebase.requestNotificationPermission();
  if (result === true) {
    const firebaseCroe = $Firebase.croe;
    if (typeof firebaseCroe === 'undefined' || firebaseCroe === null) {
      return handleFirebase();
    }
    await $Firebase.messagingInit(firebaseCroe);
  }
  processing.value = false;
  isShow.value = false;
  system.setFirebaseMessagingInited(true);
}

function handleCofirm() {
  processing.value = true;
  system.setAgreeNotification(true);
}
</script>

<style lang="scss" scoped>
.notification_permission {
  &-content {
    // Display & Box Model
    width: 100%;
  }
  &-actions {
    // Display & Box Model
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
}
</style>
