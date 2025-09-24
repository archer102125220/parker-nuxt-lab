import { dayjs } from '@/plugins/01.day';

export function useDayjs() {
  const _dayjs = computed(() => useNuxtApp().$dayjs || dayjs);


  return _dayjs;
}

export default useDayjs;