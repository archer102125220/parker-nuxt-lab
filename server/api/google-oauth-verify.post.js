import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

/**
 * Google OAuth 驗證 API
 * 
 * 使用 Google Auth Library 驗證從前端傳入的 Google ID Token
 * 驗證權杖的有效性並回傳驗證結果
 * 
 * @api {POST} /api/google-oauth-verify Google OAuth 驗證
 * @apiGroup OAuth
 * @apiName GoogleOAuthVerify
 * 
 * @apiBody {String} accessToken Google ID Token
 * 
 * @apiSuccess {Boolean} success 驗證是否成功
 * 
 * @apiError {Error} Error 當權杖驗證失敗時拋出錯誤
 * 
 * @example
 * // 請求範例
 * POST /api/google-oauth-verify
 * {
 *   "accessToken": "google_id_token_here"
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "success": true
 * }
 * 
 * @description
 * 此 API 使用 Google Auth Library 的 OAuth2Client 來驗證 ID Token
 * 驗證成功後可從 payload 中取得使用者資訊如：
 * - payload['sub']: 使用者 ID
 * - payload['hd']: G Suite 網域 (如果適用)
 * 
 * @see {@link https://developers.google.com/identity/protocols/oauth2/openid-connect Google OAuth 2.0 文檔}
 */
export default defineEventHandler(async (event) => {
  const { accessToken } = await readBody(event);

  const ticket = await client.verifyIdToken({
    idToken: accessToken,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload);
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return { success: true };
});