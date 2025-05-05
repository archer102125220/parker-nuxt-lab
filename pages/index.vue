<template>
  <AnimationTriangleEnter
    class="index_page"
    left-label="Parker Chen"
    right-label=" 的Nuxt實驗室"
    :style="cssVariable"
    :is-mobile="$store.system.isMobile"
    @animation-inited="handleAnimationInited"
    @animation-finish="handleAnimationFinish"
  >
    <template #leftLabel="{ label }">
      <p class="index_page-left_label">{{ label }}</p>
    </template>

    <HomeContent />

    <template #rightLabel="{ label }">
      <p class="index_page-right_label">{{ label }}</p>
    </template>
  </AnimationTriangleEnter>
</template>

<script setup>
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const router = useRouter();
const animationInited = ref(false);

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
        router.replace(localePath('/home'));
      }),
    200
  );
}
</script>

<style lang="scss">
@keyframes labelAnimation {
  0% {
    // width: 110px;
    width: 125px;
    font-size: 20px;
    opacity: 0;
  }

  100% {
    // width: 85px;
    width: 110px;
    font-size: 16px;
    opacity: 1;
  }
}
.index_page {
  --key_label_animation: labelAnimation 0.5s;
  // width: 100vw;

  &-left_label {
    position: absolute;
    // top: 50vh;
    // top: 53dvh;
    top: 0dvh;
    bottom: -100dvh;
    // right: 53vw;
    right: 54dvw;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    // width: 85px;
    // width: 110px;
    width: 95px;

    padding-top: 16px;

    // animation: labelAnimation 1s;
    animation: var(--label_animation);
    opacity: var(--label_opacity, 0);
    // @include mobile {
    //   // top: 49dvh;
    //   // right: 52vw;
    //   top: 52dvh;
    //   right: 51vw;
    // }
  }

  &-right_label {
    position: absolute;
    // top: -50vh;
    top: -100dvh;
    bottom: 0dvh;
    // left: 50vw;
    left: 50dvw;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    // width: 85px;
    width: 110px;

    // animation: labelAnimation 1s;
    animation: var(--label_animation);
    opacity: var(--label_opacity, 0);
  }
}
</style>
