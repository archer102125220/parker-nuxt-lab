import firebaseAdmin from 'firebase-admin';

/**
 * @openapi
 * /nuxt-server/firebase-admin/web-push-notification:
 *    post:
 *      description: Web 推播通知
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - data
 *                - token
 *              properties:
 *                data:
 *                  type: string
 *                  description: 推播訊息內容
 *                  example: "您有新的訊息"
 *                title:
 *                  type: string
 *                  description: 推播訊息標題
 *                  example: "通知標題"
 *                img:
 *                  type: string
 *                  description: 推播訊息圖片 URL
 *                  example: "https://example.com/image.jpg"
 *                token:
 *                  type: array
 *                  description: Web 客戶端的 FCM 權杖陣列
 *                  items:
 *                    type: string
 *                  example: ["web_token_1", "web_token_2"]
 *      responses:
 *        200:
 *          description: FCM 回應物件
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  successCount:
 *                    type: number
 *                    description: 成功發送的數量
 *                  failureCount:
 *                    type: number
 *                    description: 發送失敗的數量
 *                  responses:
 *                    type: array
 *                    description: 個別發送結果陣列
 *                    items:
 *                      type: object
 *                      properties:
 *                        success:
 *                          type: boolean
 *                        messageId:
 *                          type: string
 *              example:
 *                successCount: 2
 *                failureCount: 0
 *                responses:
 *                  - success: true
 *                    messageId: "message_id_1"
 *                  - success: true
 *                    messageId: "message_id_2"
 *        500:
 *          description: 發送失敗時的錯誤資訊
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 500
 *                  statusMessage:
 *                    type: string
 *                    example: "Missing parameter: data"
 */
/**
 * Web 推播通知 API
 *
 * 發送推播通知到 Web 瀏覽器
 * 使用 Firebase Cloud Messaging (FCM) 向指定的 Web 客戶端推送訊息
 *
 * @api {POST} /api/nuxt-server/firebase-admin/web-push-notification Web 推播通知
 * @apiGroup Firebase
 * @apiName WebPushNotification
 *
 * @apiBody {String} data 推播訊息內容
 * @apiBody {String} [title] 推播訊息標題
 * @apiBody {String} [img] 推播訊息圖片 URL
 * @apiBody {Array<String>} token Web 客戶端的 FCM 權杖陣列
 *
 * @apiSuccess {Object} data FCM 回應物件
 * @apiSuccess {Number} data.successCount 成功發送的數量
 * @apiSuccess {Number} data.failureCount 發送失敗的數量
 * @apiSuccess {Array} data.responses 個別發送結果陣列
 *
 * @apiError {Object} error 發送失敗時的錯誤資訊
 * @apiError {Number} error.statusCode=500 HTTP 狀態碼
 * @apiError {String} error.statusMessage 錯誤訊息
 *
 * @example
 * // 請求範例
 * POST /api/nuxt-server/firebase-admin/web-push-notification
 * Content-Type: application/json
 * {
 *   "data": "您有新的訊息",
 *   "title": "通知標題",
 *   "img": "https://example.com/image.jpg",
 *   "token": ["web_token_1", "web_token_2"]
 * }
 *
 * @example
 * // 成功回應範例
 * {
 *   "successCount": 2,
 *   "failureCount": 0,
 *   "responses": [
 *     {
 *       "success": true,
 *       "messageId": "message_id_1"
 *     },
 *     {
 *       "success": true,
 *       "messageId": "message_id_2"
 *     }
 *   ]
 * }
 *
 * @description
 * 此 API 專門用於向 Web 瀏覽器發送推播通知：
 *
 * 1. 驗證必要的參數 (data 和 token)
 * 2. 使用 Firebase Admin Web 應用實例
 * 3. 透過 FCM 發送多播訊息到指定的 Web 客戶端
 * 4. 回傳發送結果統計
 *
 * 支援的資料欄位：
 * - msg: 訊息內容
 * - title: 訊息標題
 * - img: 圖片 URL
 *
 * 注意事項：
 * - token 必須是有效的 Web FCM 權杖陣列
 * - 使用 sendEachForMulticast 方法支援批次發送
 * - Web 推播通知需要 Service Worker 支援
 *
 * @see {@link https://firebase.google.com/docs/cloud-messaging Firebase Cloud Messaging 文檔}
 */
export default defineEventHandler(async function webPushMessage(event) {
  const body = await readBody(event);

  if (body.data === undefined || body.data === null) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: data',
    });
  } else if (Array.isArray(body.token) === false || body.token.length <= 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: token',
    });
  }

  const firebaseAdminWeb = event.context.$firebaseAdminApp.web;
  const response = await firebaseAdmin
    .messaging(firebaseAdminWeb)
    .sendEachForMulticast({
      data: { msg: body.data, title: body.title, img: body.img },
      tokens: body.token
    });
  console.log(response);

  return response;
});
