<template>
  <div class="digit-container">
    <div class="clock clock-reverse">
      <div
        class="up gradient-white-gray"
        :class="{ 'flip-up': shouldAnimate }"
        @animationend="handleAnimationEnd"
      >
        {{ prevValue }}
      </div>
      <div class="down">{{ prevValue }}</div>

      <div class="up gradient-white-gray">{{ currentValue }}</div>
      <div class="down" :class="{ 'flip-up-back': shouldAnimate }">
        {{ nextValue }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentValue: {
    type: String,
    required: true
  },
  nextValue: {
    type: String,
    required: true
  }
});

const prevValue = ref(props.currentValue); // 儲存前一個數字
const shouldAnimate = ref(false); // 控制動畫 Class

// 在組件創建時（或數字第一次變化時）設置初始值
onMounted(() => {
  prevValue.value = props.currentValue;
});

// 監聽 currentValue 的變化來觸發動畫
watch(
  () => props.currentValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      // 1. 設置舊值 (prevValue) 為當前值，這是動畫要翻轉離開的內容
      prevValue.value = oldVal;
      // 2. 觸發動畫
      shouldAnimate.value = true;
    }
  }
);

// 動畫結束後，重設狀態
const handleAnimationEnd = () => {
  shouldAnimate.value = false;
  // 動畫結束後，prevValue 已經不再需要，但為保持視覺連貫，可讓它等於新值
  prevValue.value = props.currentValue;
};
</script>

<style lang="scss" scoped>
/* ---------------------------------------------------- */
/* 將您提供的 CSS/SASS 邏輯集中到此處，並移除靜態的循環動畫設置 */
/* ---------------------------------------------------- */

// 由於 .clock-reverse 的樣式是我們需要的，我們將它複製到此處
$clockReverseWidth: 80px; // 調整為更適合數字的大小
$clockReverseHeight: 100px;
$clockReversePadding: 10px;
$clockReverseTotal: 59; // 保持變數名，儘管這裡只顯示一個數字

* {
  box-sizing: border-box;
}

.digit-container {
  margin: 0 2px;
}

.gradient-white-gray {
  /* 您的漸層效果 */
  background: linear-gradient(to bottom, #000000 0%, #111 100%);
}

.clock {
  display: inline-block;
  vertical-align: top;
  color: #e74c3c;
  position: relative;
  /* 移除外部邊框和陰影，由外部容器控制 */

  .up,
  .down {
    left: 0;
    right: 0;
    text-align: center;
    overflow: hidden;
    position: absolute;
    backface-visibility: hidden;
    /* 移除 animation-fill-mode: forwards; 由 Vue 邏輯控制狀態 */
  }
  .up {
    top: 0;
    bottom: 50%;
    transform-origin: 50% 100%;
    z-index: 2; /* 確保在上層 */
  }
  .down {
    top: 50%;
    bottom: 0;
    background: black;
    transform-origin: 50% 0%;
    line-height: 0px;
    z-index: 1;
  }
}

.clock-reverse {
  width: $clockReverseWidth;
  height: $clockReverseHeight;
  background: black;
  position: relative;
  padding: $clockReversePadding;
  perspective: 1000px;
  border-radius: 5px;

  .up,
  .down {
    font-size: $clockReverseHeight - $clockReversePadding;
  }
  .up {
    line-height: $clockReverseHeight;
  }

  /* ---------------------------------------------------- */
  /* 動態 Class 觸發的動畫 */
  /* ---------------------------------------------------- */

  /* 舊數字的上半部 (翻轉離開) */
  .up.flip-up {
    animation: flip-up 0.6s 1;
    animation-fill-mode: forwards;
    z-index: 3; /* 確保翻轉時在上層 */
  }

  /* 新數字的下半部 (翻轉進入) */
  .down.flip-up-back {
    animation: flip-up-back 0.6s 1;
    animation-fill-mode: forwards;
    /* 初始狀態：新數字的下半部先被翻轉 180 度隱藏 */
    transform: rotate3d(-1, 0, 0, 180deg);
    z-index: 3; /* 確保翻轉時在上層 */
  }
}

/* 由於 SASS 變數只在 scoped 內有效，我們將 @keyframes 放在這裡 */
@keyframes flip-up {
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    transform: rotate3d(1, 0, 0, 180deg);
  }
}

@keyframes flip-up-back {
  from {
    transform: rotate3d(-1, 0, 0, 180deg);
  }
  to {
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
</style>
