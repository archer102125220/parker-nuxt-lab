<script setup>
const emit = defineEmits(['success', 'error']);

const userId = defineModel('userId', { type: String, required: true });
const userName = defineModel('userName', { type: String, required: true });
const token = defineModel('token', { type: String, default: '' });

const systemStore = useSystemStore();
const { $request, $errorMessage } = useNuxtApp();
const isGenerating = ref(false);
const panel = ref(0);

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

    &-btn {
      align-self: flex-start;
    }
  }
}
</style>
