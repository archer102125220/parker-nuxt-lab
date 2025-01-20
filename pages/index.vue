<template>
  <AnimationTriangleEnter
    class="index_page"
    label="Parker的Nuxt實驗室"
    :style="cssVariable"
    :is-mobile="$store.system.isMobile"
    @animation-inited="handleAnimationInited"
    @animationFinish="handleAnimationFinish"
  >
    <template #leftLabel="{ label }">
      <p class="index_page-left_label">{{ label }}</p>
    </template>

    <nav class="index_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="index_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <template #rightLabel="{ label }">
      <p class="index_page-right_label">{{ label }}</p>
    </template>
  </AnimationTriangleEnter>
</template>

<script setup>
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const router = useRouter();
const animationInited = ref(false);

const linkList = computed(() => [
  { to: '/components', label: '自製組件及第三方整合組件' },
  { to: '/components-test', label: '組件綜合測試' },
  { to: '/directives', label: '自製vue指令' },
  { to: '/route', label: 'route相關測試' },
  { to: '/css-drawing', label: 'css繪圖相關測試' },
  { to: '/web-authn', label: '生物辨識測試（原生）' },
  { to: '/fido2-lib', label: '生物辨識測試（fido2-lib）' },
  { to: '/web-cam', label: 'WebCam測試' },
  { to: '/face-api', label: 'face-api測試' },
  { to: '/frontend-api-cach-test', label: '前端api快取測試' }
]);
const cssVariable = computed(() => {
  const _cssVariable = {
    ['--label_opacity']: 0
  };
  if (animationInited.value === true) {
    _cssVariable['--label_animation'] = 'var(--key_label_animation)';
    _cssVariable['--label_opacity'] = 1;
  }

  return _cssVariable;
});

function handleAnimationInited() {
  setTimeout(
    () => window.requestAnimationFrame(() => (animationInited.value = true)),
    200
  );
}
function handleAnimationFinish() {
  setTimeout(
    () =>
      window.requestAnimationFrame(() => {
        router.push('/home');
      }),
    200
  );
}
</script>

<style lang="scss">
@keyframes labelAnimation {
  0% {
    width: 110px;
    height: fit-content;
    font-size: 20px;
    opacity: 0;
  }

  100% {
    width: 85px;
    height: fit-content;
    font-size: 16px;
    opacity: 1;
  }
}
.index_page {
  --key_label_animation: labelAnimation 0.5s;
  // width: 100vw;

  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    // width: 80%;
    // margin: auto;

    &-link {
      flex: 1;
      flex-basis: 400px;
    }
  }

  &-left_label {
    position: absolute;
    // top: 50vh;
    top: 53vh;
    right: 53vw;
    width: 85px;

    // animation: labelAnimation 1s;
    animation: var(--label_animation);
    opacity: var(--label_opacity, 0);
    @include mobile {
      right: 52vw;
    }
  }

  &-right_label {
    position: absolute;
    top: -50vh;
    left: 50vw;
    width: 85px;

    // animation: labelAnimation 1s;
    animation: var(--label_animation);
    opacity: var(--label_opacity, 0);
  }
}
</style>
