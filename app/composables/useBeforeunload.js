export function useBeforeunload(fun = () => {}) {
  const removeBeforeunload = ref(null);

  onMounted(() => {
    window.onbeforeunload = fun;
    window.addEventListener('beforeunload', fun);
    removeBeforeunload.value = function () {
      window.removeEventListener('beforeunload', fun);
      window.onbeforeunload = null;
    };
  });
  onBeforeUnmount(() => {
    removeBeforeunload.value();
  });

  return removeBeforeunload;
}