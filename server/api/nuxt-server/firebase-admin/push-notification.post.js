import firebaseAdmin from 'firebase-admin';

import {
  messagingFindAllToken
} from '@/services/server/firebase-messaging';

/**
 * @openapi
 * /nuxt-server/firebase-admin/push-notification:
 *    post:
 *      description: 全平台推播通知
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - data
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
 *      responses:
 *        200:
 *          description: 推播結果統計物件
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  successCount:
 *                    type: number
 *                    description: 總成功發送數量
 *                  failureCount:
 *                    type: number
 *                    description: 總發送失敗數量
 *                  responses:
 *                    type: array
 *                    description: 所有發送結果陣列
 *                    items:
 *                      type: object
 *                      properties:
 *                        success:
 *                          type: boolean
 *                        messageId:
 *                          type: string
 *                        error:
 *                          type: string
 *              example:
 *                successCount: 5
 *                failureCount: 1
 *                responses:
 *                  - success: true
 *                    messageId: "message_id_1"
 *                  - success: false
 *                    error: "Invalid token"
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
 * 全平台推播通知 API
 * 
 * 發送推播通知到所有平台 (Web、Android、iOS)
 * 自動取得所有平台的 FCM 權杖並批次發送推播通知
 * 
 * @api {POST} /api/nuxt-server/firebase-admin/push-notification 全平台推播通知
 * @apiGroup Firebase
 * @apiName PushNotification
 * 
 * @apiBody {String} data 推播訊息內容
 * @apiBody {String} [title] 推播訊息標題
 * @apiBody {String} [img] 推播訊息圖片 URL
 * 
 * @apiSuccess {Object} data 推播結果統計物件
 * @apiSuccess {Number} data.successCount 總成功發送數量
 * @apiSuccess {Number} data.failureCount 總發送失敗數量
 * @apiSuccess {Array} data.responses 所有發送結果陣列
 * 
 * @apiError {Object} error 發送失敗時的錯誤資訊
 * @apiError {Number} error.statusCode=500 HTTP 狀態碼
 * @apiError {String} error.statusMessage 錯誤訊息
 * 
 * @example
 * // 請求範例
 * POST /api/nuxt-server/firebase-admin/push-notification
 * Content-Type: application/json
 * {
 *   "data": "您有新的訊息",
 *   "title": "通知標題",
 *   "img": "https://example.com/image.jpg"
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "successCount": 5,
 *   "failureCount": 1,
 *   "responses": [
 *     {
 *       "success": true,
 *       "messageId": "message_id_1"
 *     },
 *     {
 *       "success": false,
 *       "error": "Invalid token"
 *     }
 *   ]
 * }
 * 
 * @description
 * 此 API 會自動向所有平台發送推播通知：
 * 
 * 1. 驗證必要的參數 (data)
 * 2. 並行取得所有平台的 FCM 權杖：
 *    - Web 平台權杖
 *    - Android 平台權杖
 *    - iOS 平台權杖
 * 3. 使用對應的 Firebase Admin 應用實例發送推播
 * 4. 統計所有平台的發送結果
 * 5. 回傳統一的結果統計
 * 
 * 支援的資料欄位：
 * - msg: 訊息內容
 * - title: 訊息標題
 * - img: 圖片 URL
 * 
 * 注意事項：
 * - 會自動處理所有平台的權杖取得
 * - 使用 Promise.all 並行處理多平台發送
 * - 個別平台的發送失敗不會影響其他平台
 * - 回傳的統計包含所有平台的結果
 * 
 * @see {@link https://firebase.google.com/docs/cloud-messaging Firebase Cloud Messaging 文檔}
 */
export default defineEventHandler(async function pushMessage(event) {
  const body = await readBody(event);

  if (body.data === undefined || body.data === null) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: data',
    });
  }

  const [webTokens, androidTokens, iosTokens] = await Promise.all([
    messagingFindAllToken({ os: 'web' }),
    messagingFindAllToken({ os: 'android' }),
    messagingFindAllToken({ os: 'ios' })
  ]);

  const firebaseAdminWeb = event.context.$firebaseAdminApp.web;
  const firebaseAdminAndroid = event.context.$firebaseAdminApp.android;
  const firebaseAdminIos = event.context.$firebaseAdminApp.ios;

  const promiseArray = [];

  if (webTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(firebaseAdminWeb).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: webTokens.map(({ token }) => token)
      }).catch((error) => console.error('Error sending message to web tokens:', error))
    );
  }
  if (androidTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(firebaseAdminAndroid).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: androidTokens.map(({ token }) => token)
      }).catch((error) => console.error('Error sending message to android tokens:', error))
    );
  }
  if (iosTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(firebaseAdminIos).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: iosTokens.map(({ token }) => token)
      }).catch((error) => console.error('Error sending message to ios tokens:', error))
    );
  }

  const responseArray = await Promise.all(promiseArray);

  const response = { failureCount: 0, successCount: 0, responses: [] };
  responseArray.forEach(_response => {
    response.failureCount += _response.failureCount;
    response.successCount += _response.successCount;
    const responses = [...response.responses];
    response.responses = responses.concat(_response.responses);
  });

  return response;
});
