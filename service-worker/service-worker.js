
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

import '@service-worker/firebase-messaging';

// https://unminify.com/ // minify 還原用網址

cleanupOutdatedCaches();

// 這裡的 __WB_MANIFEST 會在打包時由 vite-pwa 自動注入
// 包含了所有需要預先快取的檔案列表，預先快取靜態檔案
precacheAndRoute(self.__WB_MANIFEST);

// POST做快取會因為Service Workers會再背景再叫一次api，而瀏覽器並不允許這種兩個不同JS線程重複呼叫相同POST API的行為，
// 因此會出現error並無法有效將資料做快取，經查找資料疑似與幕等性有關
// 關於http的冪等性：https://medium.com/willhanchen/%E9%97%9C%E6%96%BChttp%E7%9A%84%E5%86%AA%E7%AD%89%E6%80%A7-4438381d0a70
// Service Workers 的 Cache API 不能快取 POST https://stackoverflow.com/questions/53639134/request-method-post-is-unsupported
// registerRoute(
//   new RegExp(`^${import.meta.env.VITE_API_BASE || '/api'}`, 'i'),
//   new StaleWhileRevalidate({
//     cacheName: 'post-api-cache',
//     expiration: {
//       maxEntries: 10,
//       maxAgeSeconds: 60 * 2
//     },
//     plugins: [
//       {
//         handlerWillStart: async (willStartResponse) => {
//           console.log({ willStartResponse });
//         },
//         requestWillFetch: async (willFetchResponse) => {
//           console.log({ willFetchResponse });

//           return willFetchResponse.request;
//         },
//         // handlerDidRespond 之後還會再執行一次 cacheKeyWillBeUsed
//         cacheKeyWillBeUsed: async (cacheKeyResponse) => {
//           console.log({ cacheKeyResponse });
//           const request = cacheKeyResponse.request;

//           if (
//             cacheKeyResponse.mode === 'write' ||
//             (typeof request?.headers?.get === 'function' && request.headers.get('X-Is-Cacheable') === 'true')
//           ) {

//             return cacheKeyResponse.request;
//           }
//         },
//         cachedResponseWillBeUsed: async (response) => {
//           console.log({ response });
//           const { cachedResponse } = response;

//           if (typeof cachedResponse?.clone === 'function') {
//             const responseClone = cachedResponse.clone();
//             console.log({ response, responseClone });
//             return responseClone;
//           }

//           // return response;
//         },
//         fetchDidSucceed: async (fetchResponse) => {
//           console.log({ fetchResponse });
//           const { response } = fetchResponse

//           if (typeof response?.clone === 'function') {
//             const responseClone = response.clone();
//             console.log({ response, responseClone });
//             return responseClone;
//           }

//           return response;
//         },
//         handlerWillRespond: async (willResponse) => {
//           console.log({ willResponse });

//           return willResponse.response;
//         },
//         handlerDidRespond: async (didResponse) => {
//           console.log({ didResponse });
//         },
//         cacheWillUpdate: async (cacheWillUpdate) => {
//           console.log({ cacheWillUpdate });

//           return cacheWillUpdate.response;
//         },
//         handlerDidComplete: async (didCompleteResponse) => {
//           console.log({ didCompleteResponse });
//         },

//         cacheDidUpdate: async (cacheDidUpdate) => {
//           console.log({ cacheDidUpdate });

//           return cacheDidUpdate.response;
//         },
//         fetchDidFail: async (fetchFailResponse) => {
//           console.log({ fetchFailResponse });
//         },
//         handlerDidError: async (didErrorResponse) => {
//           console.log({ didErrorResponse });
//         },
//       },
//     ],
//   }),
//   'POST'
// );

registerRoute(
  new RegExp(`^${import.meta.env.VITE_API_BASE || '/api'}`, 'i'),
  new CacheFirst({
    cacheName: 'api-cache',
    expiration: {
      maxEntries: 10,
      maxAgeSeconds: 60 * 2
    },
    cacheableResponse: {
      statuses: [0, 200]
    },
    plugins: [
      {
        cacheKeyWillBeUsed: (cacheKeyResponse) => {
          const request = cacheKeyResponse.request;
          if (
            cacheKeyResponse.mode === 'write' ||
            (typeof request?.headers?.get === 'function' && request.headers.get('X-Is-Cacheable') === 'true')
          ) {

            return cacheKeyResponse.request;
          }
        }
      },
    ],
  }),
  'GET'
);

registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
    expiration: {
      maxEntries: 10,
      maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
    },
    cacheableResponse: {
      statuses: [0, 200]
    }
  }),
  'GET'
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com\/.*/i,
  new StaleWhileRevalidate({
    cacheName: 'gstatic-fonts-cache',
    expiration: {
      maxEntries: 10,
      maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
    },
    cacheableResponse: {
      statuses: [0, 200]
    },
  }),
  'GET'
);
