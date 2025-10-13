/**
 * 取得 Cookie 資訊 API
 * 
 * 解析並回傳請求中的所有 Cookie 資訊
 * 用於前端取得當前使用者的 Cookie 狀態
 * 
 * @api {GET} /api/nuxt-server/cookie 取得 Cookie 資訊
 * @apiGroup Cookie
 * @apiName GetCookie
 * 
 * @apiSuccess {Object} data Cookie 物件，鍵值對形式
 * 
 * @apiError {Error} error 當解析 Cookie 失敗時回傳錯誤資訊
 * 
 * @example
 * // 請求範例
 * GET /api/nuxt-server/cookie
 * 
 * @example
 * // 成功回應範例
 * {
 *   "sessionId": "abc123",
 *   "userId": "user456",
 *   "theme": "dark"
 * }
 * 
 * @description
 * 使用 Nuxt3 的 parseCookies 工具函數解析請求中的 Cookie
 * 如果解析失敗會回傳錯誤資訊而非拋出例外
 */
export default defineEventHandler((event) => {
  try {
    const cookies = parseCookies(event);
    return cookies;
  } catch (error) {
    return error;
  }
});