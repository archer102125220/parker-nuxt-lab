<script setup>
const emit = defineEmits(['success', 'error']);

const userId = defineModel('userId', { type: String, required: true });
const userName = defineModel('userName', { type: String, required: true });
const token = defineModel('token', { type: String, default: '' });

const systemStore = useSystemStore();
const { $request, $errorMessage } = useNuxtApp();
const isGenerating = ref(false);
const panel = ref(0);

const permissions = defineModel('permissions', {
  type: Object,
  default: () => ({
    DisableWrite: false,
    DisableRename: false,
    DisableSaveAs: false,
    DisableExport: false,
    DisableCopy: false,
    DisablePrint: false
  })
});

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
      userName: userName.value,
      permissions: permissions.value
    });
    token.value = response.token;
    emit('success', response.token);
    panel.value = undefined;
  } catch (error) {
    console.error('Failed to generate token:', error);
    $errorMessage('產生 Token 失敗，請重試');
    emit('error', error);
  } finally {
    isGenerating.value = false;
    systemStore.setLoading(false);
  }
}

watch(
  () => token.value,
  (newToken) => {
    panel.value =
      typeof newToken !== 'string' || newToken === '' ? 0 : undefined;
  }
);
</script>

<template>
  <v-expansion-panels v-model="panel" class="office_tool_auth_form">
    <v-expansion-panel>
      <v-expansion-panel-title class="office_tool_auth_form-header">
        <span class="office_tool_auth_form-header-icon">🔑</span>
        <span class="office_tool_auth_form-header-text">使用者登入資訊</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <form
          class="office_tool_auth_form-form"
          @submit.prevent="generateToken"
        >
          <div class="office_tool_auth_form-form-fields">
            <v-text-field
              v-model="userId"
              class="office_tool_auth_form-form-fields-input"
              label="User ID"
              variant="outlined"
              required
              hide-details="auto"
            />
            <v-text-field
              v-model="userName"
              class="office_tool_auth_form-form-fields-input"
              label="User Name"
              variant="outlined"
              required
              hide-details="auto"
            />
          </div>

          <div class="office_tool_auth_form-form-permissions">
            <p class="office_tool_auth_form-form-permissions-title">權限設定 (Permissions)</p>
            <div class="office_tool_auth_form-form-permissions-grid">
              <v-switch
                v-model="permissions.DisableWrite"
                label="停用編輯"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableRename"
                label="停用重新命名"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableSaveAs"
                label="停用另存新檔"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableExport"
                label="停用匯出"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableCopy"
                label="停用複製"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisablePrint"
                label="停用列印"
                color="primary"
                hide-details
                density="compact"
              />
            </div>
          </div>

          <v-btn
            class="office_tool_auth_form-form-btn"
            color="primary"
            type="submit"
            :loading="isGenerating"
            :disabled="!userId || !userName"
          >
            產生 Token 並開啟編輯器
          </v-btn>
        </form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
.office_tool_auth_form {
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
      color: #333;
    }
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

    &-permissions {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &-title {
        font-size: 14px;
        font-weight: 500;
        color: #666;
        margin-bottom: 4px;
      }

      &-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 8px;
      }
    }

    &-btn {
      align-self: flex-start;
    }
  }
}
</style>
