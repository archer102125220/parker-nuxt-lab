export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;

export function useWindowSize() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : DEFAULT_WIDTH);
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : DEFAULT_HEIGHT);

  const windowSize = reactive({
    width: width.value,
    height: height.value
  });

  function handleResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    windowSize.width = width.value;
    windowSize.height = height.value;
  }

  if (typeof window !== 'undefined') {
    handleResize();
    window.addEventListener('resize', handleResize);
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      window.removeEventListener('resize', handleResize);
    });
  }

  return { width, height, windowSize };
}

export default useWindowSize;