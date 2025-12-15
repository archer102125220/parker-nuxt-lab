import { dayjs } from '@app/plugins/01.day';

export function useDayjs() {
  return useNuxtApp().$dayjs || dayjs;
}

export default useDayjs;
