import { request } from '@/utils/request';

// const CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID;
// const CLIENT_SECRET = import.meta.env.VITE_LINE_CLIENT_SECRET;
// const CALLBACK_URI = import.meta.env.VITE_LINE_CALLBACK_URI;


/**
 * @openapi
 * /line-oauth-verify:
 *    post:
 *      description: LINE OAuth 驗證
 *      parameters:
 *        - in: body
 *          name: accessToken
 *          description: accessToken LINE 存取權杖
 *          schema: 
 *            type: string
 *      responses:
 *        200:
 *          description: success 驗證是否成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    success:
 *                      type: boolean
 *                      description: 驗證是否成功
 *            
 */
/**
 * LINE OAuth 驗證 API
 * 
 * 驗證從前端傳入的 LINE 存取權杖是否有效
 * 透過 LINE OAuth API 驗證權杖並回傳驗證結果
 * 
 * @api {POST} /api/line-oauth-verify LINE OAuth 驗證
 * @apiGroup OAuth
 * @apiName LineOAuthVerify
 * 
 * @apiBody {String} accessToken LINE 存取權杖
 * 
 * @apiSuccess {Boolean} success 驗證是否成功
 * 
 * @apiError {Error} Error 當權杖驗證失敗時拋出錯誤
 * 
 * @example
 * // 請求範例
 * POST /api/line-oauth-verify
 * {
 *   "accessToken": "line_access_token_here"
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "success": true
 * }
 * 
 * @see {@link https://developers.line.biz/en/reference/line-login/#verify-access-token-http-request LINE Login API 文檔}
 */
export default defineEventHandler(async (event) => {

  const { accessToken } = await readBody(event);

  const url = 'https://api.line.me/oauth2/v2.1/verify';
  const reslut = await request.get(url, { access_token: accessToken });

  console.log({ url, reslut });

  return { success: true };
});