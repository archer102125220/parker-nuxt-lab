import { messagingFindAllToken } from '@/services/server/firebase-messaging';

/**
 * 取得推播通知權杖 API
 * 
 * 查詢並回傳所有平台的 FCM 推播通知權杖
 * 支援按平台篩選或取得所有平台的權杖清單
 * 
 * @api {GET} /api/nuxt-server/firebase-admin/get-push-notification-tokens 取得推播通知權杖
 * @apiGroup Firebase
 * @apiName GetPushNotificationTokens
 * 
 * @apiQuery {String} [os] 作業系統平台篩選 (web|android|ios)
 * 
 * @apiSuccess {Object} data 權杖清單物件
 * @apiSuccess {Array} [data.webTokenList] Web 平台權杖清單
 * @apiSuccess {Array} [data.androidTokenList] Android 平台權杖清單
 * @apiSuccess {Array} [data.iosTokenList] iOS 平台權杖清單
 * @apiSuccess {Array} [data] 單一平台權杖清單 (當指定 os 參數時)
 * 
 * @example
 * // 取得所有平台權杖
 * GET /api/nuxt-server/firebase-admin/get-push-notification-tokens
 * 
 * @example
 * // 取得特定平台權杖
 * GET /api/nuxt-server/firebase-admin/get-push-notification-tokens?os=web
 * 
 * @example
 * // 所有平台成功回應範例
 * {
 *   "webTokenList": [
 *     { "id": 1, "token": "web_token_1", "os": "web" },
 *     { "id": 2, "token": "web_token_2", "os": "web" }
 *   ],
 *   "androidTokenList": [
 *     { "id": 3, "token": "android_token_1", "os": "android" }
 *   ],
 *   "iosTokenList": [
 *     { "id": 4, "token": "ios_token_1", "os": "ios" }
 *   ]
 * }
 * 
 * @example
 * // 單一平台成功回應範例
 * [
 *   { "id": 1, "token": "web_token_1", "os": "web" },
 *   { "id": 2, "token": "web_token_2", "os": "web" }
 * ]
 * 
 * @description
 * 此 API 用於查詢 FCM 推播通知權杖：
 * 
 * 查詢模式：
 * 1. 無參數：並行取得所有平台 (web, android, ios) 的權杖
 * 2. 指定 os 參數：只取得特定平台的權杖
 * 
 * 權杖資料結構：
 * - id: 權杖在資料庫中的唯一識別碼
 * - token: FCM 推播通知權杖
 * - os: 作業系統平台標識
 * 
 * 使用場景：
 * - 管理員查看註冊的裝置數量
 * - 測試推播通知功能
 * - 統計各平台的使用者分佈
 * 
 * 注意事項：
 * - 使用 Promise.all 並行查詢提升效能
 * - 權杖可能過期或無效，需要定期清理
 * 
 * @see {@link https://firebase.google.com/docs/cloud-messaging Firebase Cloud Messaging 文檔}
 */
export default defineEventHandler(async function getMessageTokens(event) {
  const query = getQuery(event) || {};

  if (typeof query.os === 'string' && query.os !== '') {
    return await messagingFindAllToken(query);
  }

  const [
    webTokenList,
    androidTokenList,
    iosTokenList
  ] = await Promise.all([
    messagingFindAllToken({ ...query, os: 'web' }),
    messagingFindAllToken({ ...query, os: 'android' }),
    messagingFindAllToken({ ...query, os: 'ios' })
  ]);

  const tokenList = { webTokenList, androidTokenList, iosTokenList };
  return tokenList;
});
