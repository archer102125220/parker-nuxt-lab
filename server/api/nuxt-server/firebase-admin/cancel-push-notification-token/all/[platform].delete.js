import {
  messagingRemoveToken,
  messagingFindAllToken
} from '@/services/server/firebase-messaging';

/**
 * 取消平台所有推播通知權杖 API
 * 
 * 從資料庫中移除指定平台的所有 FCM 推播通知權杖
 * 用於批量清理特定平台的權杖記錄
 * 
 * @api {DELETE} /api/nuxt-server/firebase-admin/cancel-push-notification-token/all/{platform} 取消平台所有推播通知權杖
 * @apiGroup Firebase
 * @apiName CancelAllPushNotificationTokensByPlatform
 * 
 * @apiParam {String} platform 作業系統平台 (web|android|ios)
 * 
 * @apiSuccess {Object} data 取消結果物件
 * @apiSuccess {Boolean} data.success 取消是否成功
 * @apiSuccess {String} data.platform 被清理的平台
 * 
 * @example
 * // 請求範例
 * DELETE /api/nuxt-server/firebase-admin/cancel-push-notification-token/all/web
 * 
 * @example
 * // 成功回應範例
 * {
 *   "success": true,
 *   "platform": "web"
 * }
 * 
 * @description
 * 此 API 用於批量移除指定平台的所有 FCM 推播通知權杖：
 * 
 * 移除流程：
 * 1. 從 URL 路徑參數中取得平台名稱
 * 2. 查詢該平台的所有權杖記錄
 * 3. 逐一移除每個權杖記錄
 * 4. 回傳批量移除成功結果
 * 
 * 支援的平台：
 * - web: Web 瀏覽器平台
 * - android: Android 應用程式平台
 * - ios: iOS 應用程式平台
 * 
 * 使用場景：
 * - 平台維護時批量清理權杖
 * - 測試環境重置權杖資料
 * - 平台升級後清理舊權杖
 * - 安全性問題需要批量撤銷權杖
 * 
 * 注意事項：
 * - 此操作會移除該平台的所有權杖，影響範圍較大
 * - 移除後該平台的所有用戶都無法接收推播通知
 * - 建議在確認後再執行此操作
 * - 操作完成後用戶需要重新註冊權杖才能接收推播
 * 
 * @see {@link https://firebase.google.com/docs/cloud-messaging Firebase Cloud Messaging 文檔}
 */
export default defineEventHandler(async function cancelMessageToken(event) {
  const { platform } = event.context.params;

  const tokens = await messagingFindAllToken({ os: platform });
  for (let i = 0; i < tokens.length; i++) {
    const { os, token } = tokens[i];
    if (os === platform) {
      const response = await messagingRemoveToken(token);
      console.log({ ...response, platform });
    }
  }

  return { success: true, platform };
});
