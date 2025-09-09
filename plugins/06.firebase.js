
import { firebase } from '@/utils/third-party/firebase';

export default defineNuxtPlugin(() => {

  return {
    provide: {
      firebase,
      Firebase: new firebase()
    }
  }
});