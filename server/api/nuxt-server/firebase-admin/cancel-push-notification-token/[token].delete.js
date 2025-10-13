import {
  messagingRemoveToken
} from '@/services/server/firebase-messaging';

/**
 * 取消單一推播通知權杖 API
 * 
 * 從資料庫中移除指定的 FCM 推播通知權杖
 * 用於用戶登出或停用推播通知時清理權杖
 * 
 * @api {DELETE} /api/nuxt-server/firebase-admin/cancel-push-notification-token/{token} 取消推播通知權杖
 * @apiGroup Firebase
 * @apiName CancelPushNotificationToken
 * 
 * @apiParam {String} token FCM 推播通知權杖
 * 
 * @apiSuccess {Object} data 取消結果物件
 * @apiSuccess {Boolean} data.success 取消是否成功
 * @apiSuccess {String} data.token 被取消的權杖
 * 
 * @example
 * // 請求範例
 * DELETE /api/nuxt-server/firebase-admin/cancel-push-notification-token/fcm_token_here
 * 
 * @example
 * // 成功回應範例
 * {
 *   "success": true,
 *   "token": "fcm_token_here"
 * }
 * 
 * @description
 * 此 API 用於移除特定的 FCM 推播通知權杖：
 * 
 * 移除流程：
 * 1. 從 URL 路徑參數中取得權杖
 * 2. 從資料庫中移除該權杖記錄
 * 3. 回傳移除成功結果
 * 
 * 使用場景：
 * - 用戶登出時清理權杖
 * - 用戶停用推播通知
 * - 權杖過期時清理
 * - 裝置卸載應用程式時清理
 * 
 * 注意事項：
 * - 權杖移除後將無法再接收推播通知
 * - 移除操作是永久性的，無法復原
 * - 建議在客戶端確認後再呼叫此 API
 * 
 * @see {@link https://firebase.google.com/docs/cloud-messaging Firebase Cloud Messaging 文檔}
 */
export default defineEventHandler(async function cancelMessageToken(event) {
  const { token } = event.context.params;

  const response = await messagingRemoveToken(token);
  console.log(response);

  return { success: true, token };
});
