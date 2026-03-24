/**
 * 將傳入的函式包裝為防抖 (Debounce) 版本，並支援在 Vue 的 Effect Scope 內自動清理。
 * 
 * @param {Function} fn - 要進行防抖處理的目標函式
 * @param {number} [delay=300] - 延遲執行的時間（毫秒）
 * @returns {{ debouncedFn: Function, cancel: Function }} 包含防抖函式與手動取消函式的物件
 */
export function useDebounceFn(fn, delay = 300) {
  let timer = null;

  const debouncedFn = (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };

  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  if (getCurrentScope()) {
    onScopeDispose(cancel);
  }

  return { debouncedFn, cancel };
}