import {
  messagingAddToken
} from '@/services/server/firebase-messaging';

/**
 * 註冊推播通知權杖 API
 * 
 * 將客戶端的 FCM 推播通知權杖註冊到資料庫
 * 用於後續發送推播通知時識別目標裝置
 * 
 * @api {POST} /api/nuxt-server/firebase-admin/register-push-notification-token 註冊推播通知權杖
 * @apiGroup Firebase
 * @apiName RegisterPushNotificationToken
 * 
 * @apiBody {String} token FCM 推播通知權杖
 * @apiBody {String} os 作業系統平台 (web|android|ios)
 * 
 * @apiSuccess {Object} data 註冊結果物件
 * @apiSuccess {Boolean} data.success 註冊是否成功
 * @apiSuccess {String} data.token 註冊的權杖
 * 
 * @example
 * // 請求範例
 * POST /api/nuxt-server/firebase-admin/register-push-notification-token
 * Content-Type: application/json
 * {
 *   "token": "fcm_token_here",
 *   "os": "web"
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "success": true,
 *   "token": "fcm_token_here"
 * }
 * 
 * @description
 * 此 API 用於註冊客戶端的 FCM 推播通知權杖：
 * 
 * 註冊流程：
 * 1. 驗證請求參數 (token 和 os)
 * 2. 將權杖和平台資訊儲存至資料庫
 * 3. 回傳註冊成功結果
 * 
 * 支援的平台：
 * - web: Web 瀏覽器
 * - android: Android 應用程式
 * - ios: iOS 應用程式
 * 
 * 使用場景：
 * - 用戶首次訪問時註冊權杖
 * - 權杖更新時重新註冊
 * - 多裝置登入時註冊多個權杖
 * 
 * 注意事項：
 * - 權杖可能會過期，需要定期更新
 * - 同一用戶可能有多個權杖（多裝置）
 * - 權杖註冊後可用於後續的推播通知發送
 * 
 * @see {@link https://firebase.google.com/docs/cloud-messaging Firebase Cloud Messaging 文檔}
 */
export default defineEventHandler(async function registerMessageToken(event) {
  const body = await readBody(event);

  console.log({ body });
  await messagingAddToken({ token: body.token, os: body.os });

  return { success: true, token: body.token };
});
