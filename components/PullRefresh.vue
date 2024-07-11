<template>
  <div
    class="pull_refresh"
    ref="container"
    :style="cssVariable"
    @mousedown="handlePullStart"
    @mousemove="handlePulling"
    @mouseup="handlePullEnd"
    @mouseover="handlePullEnd"
    @touchstart="handlePullStart"
    @touchmove="handlePulling"
    @touchend="handlePullEnd"
  >
    <div class="pull_refresh-trigger">
      <template v-if="iosType === true">
        <slot
          v-if="refreshing === false"
          name="refresh"
          :isPulling="isPulling"
          :isPullStart="isPullStart"
        >
          <p class="pull_refresh-trigger-label">
            {{ isPulling === true ? label : pullingLabel }}
          </p>
        </slot>
        <slot v-else name="refreshing">
          <!-- https://www.crazyegg.com/blog/loading-spinners-css3-animation/ loading icon -->
          <div class="pull_refresh-trigger-refreshing">
            <div
              class="pull_refresh-trigger-refreshing-loading_icon pull_refresh-trigger-loading_icon_animation"
            />
            <p class="pull_refresh-trigger-refreshing-label">
              {{ refreshingLabel }}
            </p>
          </div>
        </slot>
      </template>
      <div
        v-else
        :class="{
          'pull_refresh-trigger-icon': true,
          'pull_refresh-trigger-loading_icon_animation': isPullStart === false
        }"
      />
    </div>

    <div class="pull_refresh-container">
      <slot />
    </div>

    <slot name="infinityLbael" :loading="loading" :infinityEnd="infinityEnd">
      <p v-if="infinityEnd === false" class="pull_refresh-infinity_label">
        {{ loading === true ? refreshingLabel : infinityLabel }}
      </p>
      <p v-else class="pull_refresh-infinity_label">
        {{ infinityEndLbael }}
      </p>
    </slot>
    <div ref="infinityTrigger" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '下拉即可刷新...' },
  pullingLabel: { type: String, default: '释放即可刷新...' },
  refreshingLabel: { type: String, default: '加载中...' },
  refresh: { type: Function, default: null },
  infinityLabel: { type: String, default: '拉至底部可繼續加载' },
  infinityEndLbael: { type: String, default: '沒有更多資料了' },
  infinityBuffer: { type: Number, default: 100 },
  isScrollToFetch: { type: Boolean, default: true },
  infinityEnd: { type: Boolean, default: true },
  infinityFetch: { type: Function, default: null },
  iosType: { type: Boolean, default: false }
});
const emit = defineEmits(['refresh', 'infinityFetch']);

const container = ref(null);
const infinityTrigger = ref(null);
const observer = ref(null);

const isPullStart = ref(false);

const startY = ref(0);
const moveDistance = ref(0);
const duration = ref(0);

const refreshing = ref(false);
const isPulling = ref(false);

const loading = ref(false);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (props.iosType === true) {
    _cssVariable['--refresh_transition'] = `${duration.value}ms`;
    _cssVariable[
      '--refresh_transform'
    ] = `translate3d(0, ${moveDistance.value}px, 0)`;
  } else {
    _cssVariable['--refresh_icon_transition'] = `${duration.value}ms`;
    _cssVariable[
      '--refresh_icon_transform'
    ] = `translate3d(0, ${moveDistance.value}px, 0)`;
  }

  return _cssVariable;
});

watch(
  () => refreshing.value,
  (newRefreshing) => {
    if (newRefreshing === false && duration.value === 300) {
      moveDistance.value = 0;
      isPulling.value = false;
    }
  }
);

onMounted(() => {
  // window.addEventListener('scroll', scrollEventListener);
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // console.log('元素已出現在畫面可視範圍內');
      handleInfinityFetch();
    }
  });

  observer.value.observe(infinityTrigger.value);
});
onUnmounted(() => {
  // window.removeEventListener('scroll', scrollEventListener);
  observer.value.unobserve(infinityTrigger.value);
});
function getCurrentDistance() {
  const rect = container.value.getBoundingClientRect();
  const scrollTop = window.innerHeight;

  return rect.bottom - scrollTop;
}
function scrollEventListener(e) {
  if (
    loading.value === true ||
    props.infinityEnd === true ||
    props.isScrollToFetch !== true
  ) {
    return;
  }
  if (getCurrentDistance() <= props.infinityBuffer) {
    handleInfinityFetch();
  }
}
async function handleInfinityFetch() {
  loading.value = true;
  if (typeof props.infinityFetch === 'function') {
    await props.infinityFetch();
    loading.value = false;
  } else {
    emit('infinityFetch', () => {
      loading.value = false;
    });
  }
}

function handlePullStart(e) {
  isPullStart.value = true;
  duration.value = 0;
  moveDistance.value = 0;
  startY.value = e.targetTouches?.[0]?.clientY || e.clientY;
}
function handlePulling(e) {
  if (isPullStart.value !== true) return;
  const scrollTop =
    document.documentElement?.scrollTop || document.body?.scroll;

  if (scrollTop > 0) return;

  const move = (e.targetTouches?.[0]?.clientY || e.clientY) - startY.value;

  if (move > 0) {
    const _moveDistance = Math.pow(move, 0.8);
    let _isPulling = isPulling.value;
    if (_moveDistance > 50) {
      _isPulling = true;
    } else {
      _isPulling = false;
    }

    moveDistance.value = _moveDistance;
    isPulling.value = _isPulling;
  }
}
async function handlePullEnd(e) {
  isPullStart.value = false;
  duration.value = 300;
  if (moveDistance.value > 50) {
    refreshing.value = true;
    isPulling.value = false;
    moveDistance.value = 50;
    if (typeof props.refresh === 'function') {
      await props.refresh();
      refreshing.value = false;
    } else {
      emit('refresh', () => {
        refreshing.value = false;
      });
    }
  } else {
    moveDistance.value = 0;
  }
}
</script>

<style lang="scss" scoped>
.pull_refresh {
  margin-top: -50px;
  transition: var(--refresh_transition);
  transform: var(--refresh_transform);
  &-trigger {
    margin-bottom: 20px;
    &-label {
      font-size: 14px;
      color: rgba(69, 90, 100, 0.6);
      text-align: center;
      // margin-bottom: 20px;
    }
    &-refreshing {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 10px;
      margin-bottom: 20px;
      &-loading_icon {
        width: 23px;
        height: 23px;
        border: 4px solid lightgray;
        border-radius: 50%;
        position: relative;
        &::after {
          box-sizing: border-box;
          content: '';
          width: 15px;
          height: 15px;
          position: absolute;
          top: -4px;
          right: -4px;
          border-radius: 0 100% 0 0;
          border: 4px solid blue;
          border-color: blue blue transparent transparent;
          transform-origin: 0 100%;

          // animation-name: loading_animation;
          // animation-duration: 1s;
          // animation-iteration-count: infinite;
          // animation-timing-function: linear;
        }
      }
      &-label {
        @extend .pull_refresh-trigger-label;
        margin-bottom: 0;
      }
    }
    &-loading_icon_animation {
      &::after {
        content: '';
        animation-name: loading_animation;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
    &-icon {
      @extend .pull_refresh-trigger-refreshing-loading_icon;
      margin: auto;
      transition: var(--refresh_icon_transition);
      transform: var(--refresh_icon_transform);
    }
  }
  &-container {
  }
  &-infinity_label {
    @extend .pull_refresh-trigger-label;
    margin: 0px;
  }
}
@keyframes loading_animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>