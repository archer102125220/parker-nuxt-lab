
import { firebase } from '@/utils/third-party/firebase';

export default defineNuxtPlugin(() => {

  return {
    provide: {
      firebase
    }
  }
});