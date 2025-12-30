/**
 * @openapi
 * /nuxt-server/cookie:
 *    post:
 *      description: 設定 Cookie
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              additionalProperties:
 *                type: string
 *              properties:
 *                __cookie_seting__:
 *                  type: object
 *                  description: Cookie 全域設定選項
 *                  properties:
 *                    httpOnly:
 *                      type: boolean
 *                      description: 是否僅 HTTP 可存取
 *                      default: true
 *                    secure:
 *                      type: boolean
 *                      description: 是否僅 HTTPS 傳輸
 *                    domain:
 *                      type: string
 *                      description: Cookie 網域
 *                    path:
 *                      type: string
 *                      description: Cookie 路徑
 *                    maxAge:
 *                      type: number
 *                      description: Cookie 最大存活時間（秒）
 *            example:
 *              userId: "user123"
 *              theme: "dark"
 *              __cookie_seting__:
 *                httpOnly: true
 *                secure: true
 *                maxAge: 86400
 *      responses:
 *        200:
 *          description: Cookie 設定結果
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: 設定是否成功
 *                  error:
 *                    type: string
 *                    description: 錯誤訊息（僅在失敗時出現）
 *              examples:
 *                success:
 *                  summary: 設定成功
 *                  value:
 *                    success: true
 *                failure:
 *                  summary: 設定失敗
 *                  value:
 *                    success: false
 *                    error: "Error message here"
 */
/**
 * 設定 Cookie API
 *
 * 根據請求內容設定多個 Cookie
 * 支援自定義 Cookie 設定選項
 *
 * @api {POST} /api/nuxt-server/cookie 設定 Cookie
 * @apiGroup Cookie
 * @apiName SetCookie
 *
 * @apiBody {Object} data Cookie 鍵值對物件
 * @apiBody {Object} [data.__cookie_seting__] Cookie 全域設定選項
 * @apiBody {Boolean} [data.__cookie_seting__.httpOnly=true] 是否僅 HTTP 可存取
 * @apiBody {Boolean} [data.__cookie_seting__.secure] 是否僅 HTTPS 傳輸
 * @apiBody {String} [data.__cookie_seting__.domain] Cookie 網域
 * @apiBody {String} [data.__cookie_seting__.path] Cookie 路徑
 * @apiBody {Number} [data.__cookie_seting__.maxAge] Cookie 最大存活時間（秒）
 *
 * @apiSuccess {Boolean} success 設定是否成功
 *
 * @apiError {Object} error 設定失敗時的錯誤資訊
 * @apiError {Boolean} error.success=false 設定失敗
 * @apiError {Error} error.error 錯誤詳細資訊
 *
 * @example
 * // 請求範例
 * POST /api/nuxt-server/cookie
 * {
 *   "userId": "user123",
 *   "theme": "dark",
 *   "__cookie_seting__": {
 *     "httpOnly": true,
 *     "secure": true,
 *     "maxAge": 86400
 *   }
 * }
 *
 * @example
 * // 成功回應範例
 * {
 *   "success": true
 * }
 *
 * @example
 * // 失敗回應範例
 * {
 *   "success": false,
 *   "error": "Error message here"
 * }
 *
 * @description
 * 此 API 會遍歷請求體中的所有鍵值對並設定為 Cookie
 * 特殊鍵 "__cookie_seting__" 用於設定 Cookie 的全域選項
 * 如果沒有提供 Cookie 設定，預設使用 { httpOnly: true }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    Object.keys(body).forEach((key) => {
      if (body === '__cookie_seting__') return;
      const cookieSeting = body.__cookie_seting__ || { httpOnly: true };
      setCookie(event, key, body[key], cookieSeting);
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
});