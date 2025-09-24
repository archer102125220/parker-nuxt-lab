import { dayjs } from '@/plugins/01.day';

export function useDayjs() {
  const _dayjs = useState('__$dayjs__', () => {
    return useNuxtApp().$dayjs || dayjs;
  });


  return _dayjs;
}

export default useDayjs;