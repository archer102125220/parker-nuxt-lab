import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
// import { CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

import '@service-worker/firebase-messaging';

self.addEventListener('message', function (event) {
  if (event?.data?.type === 'SKIP_WAITING') {
    setTimeout(() => {
      self.skipWaiting();
    }, 4000);
  }
});

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

// 為 face-api 模型文件添加運行時快取
// 這些文件不會在 PWA 安裝時預快取，而是在首次使用時才下載並快取
registerRoute(
  /\/ai_models\/.*\.(json|shard\d+)$/,
  new CacheFirst({
    cacheName: 'face-api-ai_models',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // 最多快取 50 個模型文件
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
      })
    ]
  })
);

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
            (typeof request?.headers?.get === 'function' &&
              request.headers.get('X-Is-Cacheable') === 'true')
          ) {
            return cacheKeyResponse.request;
          }
        }
      }
    ]
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
    }
  }),
  'GET'
);

registerRoute(
  /^https:\/\/archer102125220\.github\.io\/parker-vue-lab\/.*$/i,
  new CacheFirst({
    cacheName: 'federation-cache',
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

// 快取 Univer 相關的 CDN 靜態資源 (包含 Univer 本身及其相依套件 react, rxjs, echarts, vue)
registerRoute(
  /^https:\/\/(unpkg\.com|cdn\.jsdelivr\.net)\/(npm\/)?(@univerjs(-pro)?|react(-dom)?|rxjs|echarts|vue)(@[^/]+)?(\/|$)/i,
  new CacheFirst({
    cacheName: 'univer-cdn-cache',
    expiration: {
      maxEntries: 200,
      maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
    },
    cacheableResponse: {
      statuses: [0, 200]
    }
  }),
  'GET'
);

// 設置全局錯誤處理器 - 當所有路由都失敗時的 fallback
// 這會在用戶離線且訪問未快取的頁面時顯示離線頁面
setCatchHandler(async ({ event }) => {
  // 只處理導航請求（頁面請求）
  if (event.request.destination === 'document') {
    try {
      // 嘗試從快取中獲取離線頁面
      // 遍歷所有快取尋找離線頁面
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        if (cacheName.startsWith('workbox-precache')) {
          const cache = await caches.open(cacheName);
          const cachedResponse = await cache.match('/offline');

          if (cachedResponse) {
            return cachedResponse;
          }
        }
      }
    } catch (error) {
      console.error('Failed to get offline page from cache:', error);
    }
  }

  // 對於其他類型的請求，返回錯誤
  return Response.error();
});

// 為導航請求設置 Network First 策略
// 優先從網路獲取，失敗時從快取獲取，都失敗時觸發 catchHandler 顯示離線頁面
registerRoute(
  ({ request }) => request.mode === 'navigate',
  // new NetworkOnly()
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 2 // 2 小時
      })
    ]
  })
);
