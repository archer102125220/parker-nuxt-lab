<template>
  <component :is="tagName" class="animation_enter_label" :style="cssVariable">
    {{ enterLabel }}
  </component>
</template>

<script setup>
const modelValue = defineModel({ type: Boolean, default: false });
const modelAnimationEnd = defineModel('animationEnd', {
  type: Boolean,
  default: false
});
const props = defineProps({
  tagName: { type: String, default: 'p' },
  randomLen: { type: String, default: 'en' },
  autoStart: { type: Boolean, default: true },
  label: { type: String, default: '' },
  speed: { type: Number, default: 100 }
});
const emits = defineEmits([
  'change',
  'update:modelValue',
  'update:modelAnimationEnd'
]);

const enterLabel = ref('');

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (modelValue.value === true && modelAnimationEnd.value === false) {
    _cssVariable['--animation_enter_label_anime'] = 'var(--enter_label_anime)';
  }

  return _cssVariable;
});

watch(
  () => [modelValue.value, props.label],
  ([newModelValue]) => {
    if (newModelValue === true) {
      enterLabel.value = '';
      modelAnimationEnd.value = false;
      emits('update:modelAnimationEnd', false);
      nextTick(handleEnterLabel);
    }
  }
);

function handleEnterLabel() {
  if (enterLabel.value.length <= props.label.length) {
    const randomLen = props.randomLen.toLowerCase();
    let randomString = '';

    for (let i = 0; i <= enterLabel.value.length + 1; i++) {
      if (randomLen.includes('zh')) {
        randomString += generateRandomChineseCharacter();
      } else {
        randomString += getRandomUppercaseLetter();
      }
    }

    enterLabel.value = randomString;
    nextTick(() => {
      setTimeout(
        () => window.requestAnimationFrame(handleEnterLabel),
        props.speed
      );
    });
  } else {
    enterLabel.value = props.label;

    modelAnimationEnd.value = true;
    emits('update:modelAnimationEnd', true);
  }
}

function getRandomUppercaseLetter() {
  // 隨機生成一個 65-90 之間的數字（A-Z 的 ASCII 碼範圍）
  const randomAscii = Math.floor(Math.random() * 26) + 65;

  // Math.random() 會產生 0 (包含) 到 1 (不包含) 之間的隨機小數
  // 因此，我們乘以 94 (126 - 33 + 1) 再加上 33，就能得到 33 到 126 之間的隨機整數
  // const randomAscii = Math.floor(Math.random() * 94) + 33;

  return String.fromCharCode(randomAscii);
}

function generateRandomChineseCharacter() {
  // 中文常用字的 Unicode 範圍
  // const chineseCharRange = '\u4E00-\u9FFF';

  // 隨機生成一個 Unicode 碼點
  const randomCodePoint =
    Math.floor(Math.random() * (0x9fff - 0x4e00 + 1)) + 0x4e00;

  // 將 Unicode 碼點轉換為字符
  return String.fromCodePoint(randomCodePoint);
}

onMounted(() => {
  if (props.autoStart === true || modelValue.value === true) {
    if (modelValue.value === true) {
      handleEnterLabel();
    } else {
      modelValue.value = true;
      emits('update:modelValue', true);
    }
  }
});
</script>

<style lang="scss">
@keyframes blink {
  0% {
    // border-left: 0px solid #000;
    opacity: 0;
  }
  25% {
    border-left: 1px solid #000;
    opacity: 1;
  }
  75% {
    border-left: 1px solid #000;
    opacity: 1;
  }
  100% {
    // border-left: 0px solid #000;
    opacity: 0;
  }
}

.animation_enter_label {
  --enter_label_anime: blink;
  // position: relative;

  &:after {
    content: '';

    // display: inline-block;
    // position: absolute;
    // top: 0px;
    // left: 0px;
    // width: 100%;
    // height: 100%;
    // border: 0px;

    animation: var(--animation_enter_label_anime) 1s infinite;
    // animation: blink 1s infinite;
    transition: none;
  }
}
</style>
