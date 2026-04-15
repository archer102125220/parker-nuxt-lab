<template>
  <div class="language_switcher">
    <VSelector
      class="language_switcher-button"
      aria-label="Language Switcher"
      value-key="code"
      display-key="label"
      :return-object="true"
      :value="locale"
      :option-list="localeList"
      @update:value="handleLanguageSwitch"
    >
      <img
        src="/img/icon/i18n/i18n.v-04.webp"
        alt="i18n"
        class="language_switcher-button-icon"
      />
    </VSelector>
  </div>
</template>

<script setup>
const router = useRouter();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const buttonRef = ref(null);
const menuRef = ref(null);

const localeList = computed(() => [
  { code: 'en', label: 'en' },
  { code: 'zh', label: 'zh-tw' }
]);

function closeMenu() {
  isOpen.value = false;
}

function handleLanguageSwitch(newLang) {
  console.log({ newLang });
  const newLangCode = newLang?.code || 'zh';
  const path = switchLocalePath(newLangCode);
  router.replace(path);
  closeMenu();
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
  if (!buttonRef.value || !menuRef.value) return;

  if (
    !buttonRef.value.contains(event.target) &&
    !menuRef.value.contains(event.target)
  ) {
    closeMenu();
  }
}
</script>

<style lang="scss" scoped>
.language_switcher {
  &-button {
    border-radius: 50%;
    &-icon {
      // Display & Box Model
      width: 20px;
      height: 20px;

      // Visual
      object-fit: contain;
    }
  }
}
</style>
