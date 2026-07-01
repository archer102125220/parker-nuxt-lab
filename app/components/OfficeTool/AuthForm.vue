<script setup>
const emit = defineEmits(['success', 'error']);

const userId = defineModel('userId', { type: String, required: true });
const userName = defineModel('userName', { type: String, required: true });
const token = defineModel('token', { type: String, default: '' });

const systemStore = useSystemStore();
const { $request, $errorMessage } = useNuxtApp();
const { t } = useI18n();
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
    $errorMessage(t('office_tool.auth_form.generate_token_failed'));
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
        <span class="office_tool_auth_form-header-text">{{ $t('office_tool.auth_form.title') }}</span>
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
              :label="$t('office_tool.auth_form.user_id')"
              variant="outlined"
              required
              hide-details="auto"
            />
            <v-text-field
              v-model="userName"
              class="office_tool_auth_form-form-fields-input"
              :label="$t('office_tool.auth_form.user_name')"
              variant="outlined"
              required
              hide-details="auto"
            />
          </div>

          <div class="office_tool_auth_form-form-permissions">
            <p class="office_tool_auth_form-form-permissions-title">
              {{ $t('office_tool.auth_form.permissions_title') }}
            </p>
            <div class="office_tool_auth_form-form-permissions-grid">
              <v-switch
                v-model="permissions.DisableWrite"
                :label="$t('office_tool.auth_form.disable_write')"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableRename"
                :label="$t('office_tool.auth_form.disable_rename')"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableSaveAs"
                :label="$t('office_tool.auth_form.disable_save_as')"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableExport"
                :label="$t('office_tool.auth_form.disable_export')"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisableCopy"
                :label="$t('office_tool.auth_form.disable_copy')"
                color="primary"
                hide-details
                density="compact"
              />
              <v-switch
                v-model="permissions.DisablePrint"
                :label="$t('office_tool.auth_form.disable_print')"
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
            {{ $t('office_tool.auth_form.submit_btn') }}
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
