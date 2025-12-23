<template>
  <div class="language_switcher">
    <button 
      ref="buttonRef"
      class="language_switcher-button" 
      @click="toggleMenu"
      aria-label="Language Switcher"
    >
      <img
        src="/img/icon/i18n/i18n.v-04.webp"
        alt="i18n"
        class="language_switcher-button-icon"
      />
    </button>
    
    <ClientOnly>
      <Teleport to="body">
        <div 
          v-if="isOpen" 
          ref="menuRef"
          class="language_switcher-menu"
          :style="menuStyle"
        >
          <div class="language_switcher-menu-backdrop" @click="closeMenu"></div>
          <div class="language_switcher-menu-content">
            <button
              v-for="lang in localeList"
              :key="lang.code"
              class="language_switcher-menu-item"
              :class="{ 'language_switcher-menu-item--active': locale === lang.code }"
              @click="handleLanguageSwitch(lang.code)"
            >
              {{ $t(lang.label) }}
            </button>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup>
const router = useRouter();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const localeList = [
  { code: 'en', label: 'en' },
  { code: 'zh', label: 'zh-tw' }
];

const isOpen = ref(false);
const buttonRef = ref(null);
const menuRef = ref(null);
const menuStyle = ref({});

function toggleMenu() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      updateMenuPosition();
    });
  }
}

function closeMenu() {
  isOpen.value = false;
}

function updateMenuPosition() {
  if (!buttonRef.value) return;
  
  const buttonRect = buttonRef.value.getBoundingClientRect();
  
  menuStyle.value = {
    position: 'fixed',
    top: `${buttonRect.bottom + 8}px`,
    right: `${window.innerWidth - buttonRect.right}px`,
    zIndex: '9999'
  };
}

function handleLanguageSwitch(langCode) {
  const path = switchLocalePath(langCode);
  router.replace(path);
  closeMenu();
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', updateMenuPosition);
  window.addEventListener('resize', updateMenuPosition);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', updateMenuPosition);
  window.removeEventListener('resize', updateMenuPosition);
});

function handleClickOutside(event) {
  if (!buttonRef.value || !menuRef.value) return;
  
  if (!buttonRef.value.contains(event.target) && !menuRef.value.contains(event.target)) {
    closeMenu();
  }
}
</script>

<style lang="scss" scoped>
.language_switcher {
  // Positioning
  position: relative;
  
  &-button {
    // Display & Box Model
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border: none;
    border-radius: 50%;
    
    // Visual
    background: transparent;
    cursor: pointer;
    
    // Animation
    transition: background-color 0.2s ease;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    
    &-icon {
      // Display & Box Model
      width: 20px;
      height: 20px;
      
      // Visual
      object-fit: contain;
    }
  }
  
  &-menu {
    // Positioning
    position: fixed;
    z-index: 9999;
    
    &-backdrop {
      // Positioning
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      
      // Display & Box Model
      width: 100vw;
      height: 100vh;
      
      // Visual
      background: transparent;
    }
    
    &-content {
      // Display & Box Model
      min-width: 120px;
      padding: 8px 0;
      border-radius: 8px;
      
      // Visual
      background: white;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      
      // Animation
      animation: menu-fade-in 0.2s ease;
    }
    
    &-item {
      // Display & Box Model
      display: block;
      width: 100%;
      padding: 12px 20px;
      border: none;
      
      // Typography
      text-align: left;
      font-size: 14px;
      color: #2d3748;
      
      // Visual
      background: transparent;
      cursor: pointer;
      
      // Animation
      transition: background-color 0.2s ease;
      
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      
      &--active {
        // Typography
        font-weight: 600;
        color: #44A08D;
        
        // Visual
        background: rgba(68, 160, 141, 0.1);
      }
    }
  }
}

@keyframes menu-fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
