<template>
  <v-btn
    ref="el"
    icon="mdi mdi-chevron-up-circle"
    aria-label="go_to_top"
    color="primary"
    variant="text"
    :class="['go_top', isShow ? 'go_top-show' : '']"
    @click="goTop"
  />
</template>
<script setup>
const props = defineProps({
  limit: { type: Number, default: 100 }
});
const el = useTemplateRef('el');
const isShow = ref(false);

function goTop() {
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

  if (el.value?.$el?.parentElement?.scrollTop > props.limit) {
    if (typeof el.value?.$el?.parentElement?.scrollTo === 'function') {
      el.value.$el.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.value.$el.parentElement.scrollTop = 0;
    }
  }
}
function handleScroll() {
  if (
    document.body.scrollTop > props.limit ||
    document.documentElement.scrollTop > props.limit ||
    el.value?.$el?.parentElement?.scrollTop > props.limit
  ) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
}

onMounted(() => {
  window.onscroll = handleScroll;
  window.addEventListener('scroll', handleScroll);
  if (typeof el.value?.$el?.parentElement?.addEventListener === 'function') {
    el.value.$el.parentElement.addEventListener('scroll', handleScroll);
  }
});
onBeforeUnmount(() => {
  window.onscroll = null;
  window.removeEventListener('scroll', handleScroll);
  if (typeof el.value?.$el?.parentElement?.removeEventListener === 'function') {
    el.value.$el.parentElement.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style lang="scss" scoped>
.go_top {
  position: fixed;
  // bottom: 25px;
  bottom: -50px;
  right: 25px;
  z-index: 10;
  opacity: 0;
  width: 60px;
  height: 60px;
  font-size: 60px;
  transition: 0.3s;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  @include tablet {
    width: 30px;
    height: 30px;
    font-size: 30px;
  }
  &-show {
    opacity: 1;
    bottom: 25px;
  }
}
</style>
