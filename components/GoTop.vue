<template>
  <div
    ref="el"
    :style="cssVariable"
    :class="['go_top', isShow ? 'go_top_show' : '']"
    @click="goTop"
  >
    <slot :is-show="isShow">
      <v-btn
        class="go_top-btn"
        icon="mdi mdi-chevron-up-circle"
        aria-label="go_to_top"
        color="primary"
        variant="text"
      />
    </slot>
  </div>
</template>
<script setup>
const el = useTemplateRef('el');

const props = defineProps({
  limit: { type: Number, default: 100 },
  heddinBottom: { type: [Number, String], default: '-50px' },
  showBottom: { type: [Number, String], default: '25px' },
  right: { type: [Number, String], default: '25px' }
});
const isShow = ref(false);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.right === 'string' && props.right !== '') {
    _cssVariable['--go_top_right'] = props.right;
  } else if (typeof props.right === 'number') {
    _cssVariable['--go_top_right'] = `${props.right}px`;
  }

  if (typeof props.heddinBottom === 'string' && props.heddinBottom !== '') {
    _cssVariable['--go_top_hidden_bottom'] = props.heddinBottom;
  } else if (typeof props.heddinBottom === 'number') {
    _cssVariable['--go_top_hidden_bottom'] = `${props.heddinBottom}px`;
  }

  if (typeof props.showBottom === 'string' && props.showBottom !== '') {
    _cssVariable['--go_top_show_bottom'] = props.showBottom;
  } else if (typeof props.showBottom === 'number') {
    _cssVariable['--go_top_show_bottom'] = `${props.showBottom}px`;
  }

  return _cssVariable;
});

function goTop() {
  if (isShow.value === false) return;

  if (
    document.body.scrollTop > props.limit ||
    document.documentElement.scrollTop > props.limit
  ) {
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  if (el.value?.parentElement?.scrollTop > props.limit) {
    if (typeof el.value?.parentElement?.scrollTo === 'function') {
      el.value.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.value.parentElement.scrollTop = 0;
    }
  }
}
function handleScroll() {
  if (
    document.body.scrollTop > props.limit ||
    document.documentElement.scrollTop > props.limit ||
    el.value?.parentElement?.scrollTop > props.limit
  ) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
}

onMounted(() => {
  window.onscroll = handleScroll;
  window.addEventListener('scroll', handleScroll);
  if (typeof el.value?.parentElement?.addEventListener === 'function') {
    el.value.parentElement.addEventListener('scroll', handleScroll);
  }
});
onBeforeUnmount(() => {
  window.onscroll = null;
  window.removeEventListener('scroll', handleScroll);
  if (typeof el.value?.parentElement?.removeEventListener === 'function') {
    el.value.parentElement.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style lang="scss" scoped>
.go_top {
  position: fixed;
  // bottom: -50px;
  bottom: var(--go_top_hidden_bottom);
  // right: 25px;
  right: var(--go_top_right);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 60px;

  opacity: 0;
  background-color: #fff;
  transition: 0.3s;

  @include tablet {
    width: 30px;
    height: 30px;
    font-size: 30px;
  }

  &-btn {
    width: 100%;
    height: 100%;
  }
}
.go_top_show {
  opacity: 1;
  // bottom: 25px;
  bottom: var(--go_top_show_bottom);
}
</style>
