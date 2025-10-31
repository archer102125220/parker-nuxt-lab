import { request } from '@shared/request';

const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

/**
 * @openapi
 * /facebook-oauth-verify:
 *    post:
 *      description: Facebook OAuth 驗證
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - accessToken
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: Facebook 存取權杖
 *                  example: "facebook_access_token_here"
 *      responses:
 *        200:
 *          description: 驗證是否成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: 驗證是否成功
 *                    example: true
 *              example:
 *                success: true
 *        401:
 *          description: 驗證失敗時的錯誤資訊
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 401
 *                  statusMessage:
 *                    type: string
 *                    example: "Invalid access token"
 *        500:
 *          description: 伺服器內部錯誤
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
 *                    example: "Internal server error"
 */
/**
 * Facebook OAuth 驗證 API
 * 
 * 驗證從前端傳入的 Facebook 存取權杖是否有效
 * 透過 Facebook Graph API 驗證權杖並回傳驗證結果
 * 
 * @api {POST} /api/facebook-oauth-verify Facebook OAuth 驗證
 * @apiGroup OAuth
 * @apiName FacebookOAuthVerify
 * 
 * @apiBody {String} accessToken Facebook 存取權杖
 * 
 * @apiSuccess {Boolean} success 驗證是否成功
 * 
 * @apiError {Error} Error 當權杖驗證失敗時拋出錯誤
 * 
 * @example
 * // 請求範例
 * POST /api/facebook-oauth-verify
 * {
 *   "accessToken": "facebook_access_token_here"
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "success": true
 * }
 * 
 * @see {@link https://developers.facebook.com/docs/graph-api/overview Facebook Graph API 文檔}
 * @see {@link https://stackoverflow.com/questions/70114224/how-to-verify-facebook-login-access-token-from-node-js Stack Overflow 相關討論}
 */
export default defineEventHandler(async (event) => {

  const { accessToken } = await readBody(event);

  const url = `https://graph.facebook.com/me?client_id=${APP_ID}&access_token=${accessToken}`;
  const reslut = await request.get(url);

  console.log({ url, reslut });

  return { success: true };
});