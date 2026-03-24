/**
 * 接收一個 Vue ref 資料來源，回傳一個具有防抖延遲更新特性的新 ref。
 * 支援在 Vue 的 Effect Scope 內自動清理監聽與計時器。
 * 
 * @param {import('vue').Ref} source - 欲監聽的來源 ref 資料
 * @param {number} [delay=300] - 延遲更新的時間（毫秒）
 * @returns {import('vue').Ref} 經過防抖處理、延遲更新的新 ref
 */
export function useDebouncedValue(source, delay = 300) {
  const debouncedValue = ref(source.value);
  let timer = null;

  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const stopWatch = watch(source, (newValue) => {
    cancel();
    timer = setTimeout(() => {
      debouncedValue.value = newValue;
      timer = null;
    }, delay);
  });

  if (getCurrentScope()) {
    onScopeDispose(() => {
      cancel();
      stopWatch();
    });
  }

  return debouncedValue;
}