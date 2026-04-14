import { dayjs } from '@app/plugins/02.day';

export function useDayjs() {
  return useNuxtApp().$dayjs || dayjs;
}

export default useDayjs;
