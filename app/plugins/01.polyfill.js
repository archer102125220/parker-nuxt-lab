import dvhSvhLvhPolyfill from '@app/utils/polyfill/large-small-dynamic-viewport-units-polyfill';
import {
  findLastIndex,
  handleFindLastIndexPolyfill
} from '@app/utils/polyfill/array-find-last-index-polyfill';

handleFindLastIndexPolyfill();
dvhSvhLvhPolyfill();

if (typeof window !== 'undefined') {
  import('mdn-polyfills/Node.prototype.replaceWith')
    .then(() => {
      if (import.meta.env.DEV) {
        console.log('Node.prototype.replaceWith polyfill loaded');
      }
    })
    .catch((error) => {
      if (import.meta.env.DEV) {
        console.error('Node.prototype.replaceWith polyfill failed', error);
      }
    });
}

export default defineNuxtPlugin(() => {
  console.log('Polyfill loaded');

  return {
    provide: {
      findLastIndex
    }
  };
});
