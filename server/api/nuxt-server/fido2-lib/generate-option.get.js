import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// import { fido2LibInitialize, getFido2Lib, fido2LibIsInitialized } from '@server/utils/fido2-lib';

// 前端透過 GET_fido2LibGenerateOption 呼叫這隻http get的api
/**
 * @openapi
 * /nuxt-server/fido2-lib/generate-option:
 *    get:
 *      description: 生成 FIDO2 選項
 *      parameters:
 *        - in: query
 *          name: isLogin
 *          description: 是否為登入模式
 *          schema:
 *            type: boolean
 *            default: false
 *          example: false
 *        - in: query
 *          name: userId
 *          description: 使用者 ID (註冊時需要)
 *          schema:
 *            type: string
 *          example: "user123"
 *        - in: query
 *          name: userName
 *          description: 使用者名稱 (註冊時需要)
 *          schema:
 *            type: string
 *          example: "john"
 *        - in: query
 *          name: userDisplayName
 *          description: 使用者顯示名稱 (註冊時需要)
 *          schema:
 *            type: string
 *          example: "John Doe"
 *      responses:
 *        200:
 *          description: FIDO2 選項物件
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  challenge:
 *                    type: string
 *                    description: Base64URL 編碼的挑戰值
 *                  timeout:
 *                    type: number
 *                    description: 超時時間（毫秒）
 *                  rpId:
 *                    type: string
 *                    description: 信賴方 ID
 *                  rpName:
 *                    type: string
 *                    description: 信賴方名稱
 *                  allowCredentials:
 *                    type: array
 *                    description: 允許的憑證清單（登入時）
 *                    items:
 *                      type: object
 *                  user:
 *                    type: object
 *                    description: 使用者資訊（註冊時）
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: 使用者 ID
 *                      name:
 *                        type: string
 *                        description: 使用者名稱
 *                      displayName:
 *                        type: string
 *                        description: 使用者顯示名稱
 *              examples:
 *                registration:
 *                  summary: 註冊模式成功回應
 *                  value:
 *                    challenge: "base64url_encoded_challenge"
 *                    timeout: 60000
 *                    rpId: "parker-nuxt-lab.vercel.app"
 *                    rpName: "Nuxt Lab"
 *                    user:
 *                      id: "user123"
 *                      name: "john"
 *                      displayName: "John Doe"
 *                login:
 *                  summary: 登入模式成功回應
 *                  value:
 *                    challenge: "base64url_encoded_challenge"
 *                    timeout: 60000
 *                    rpId: "parker-nuxt-lab.vercel.app"
 *                    allowCredentials: []
 */
/**
 * FIDO2 選項生成 API
 * 
 * 生成 FIDO2/WebAuthn 註冊或登入所需的選項參數
 * 根據 isLogin 參數決定生成註冊選項或認證選項
 * 
 * @api {GET} /api/nuxt-server/fido2-lib/generate-option 生成 FIDO2 選項
 * @apiGroup FIDO2
 * @apiName GenerateFido2Option
 * 
 * @apiQuery {Boolean} [isLogin=false] 是否為登入模式
 * @apiQuery {String} [userId] 使用者 ID (註冊時需要)
 * @apiQuery {String} [userName] 使用者名稱 (註冊時需要)
 * @apiQuery {String} [userDisplayName] 使用者顯示名稱 (註冊時需要)
 * 
 * @apiSuccess {Object} data FIDO2 選項物件
 * @apiSuccess {String} data.challenge Base64URL 編碼的挑戰值
 * @apiSuccess {Number} data.timeout 超時時間（毫秒）
 * @apiSuccess {String} data.rpId 信賴方 ID
 * @apiSuccess {String} data.rpName 信賴方名稱
 * @apiSuccess {Array} data.allowCredentials 允許的憑證清單（登入時）
 * @apiSuccess {Object} data.user 使用者資訊（註冊時）
 * @apiSuccess {String} data.user.id 使用者 ID
 * @apiSuccess {String} data.user.name 使用者名稱
 * @apiSuccess {String} data.user.displayName 使用者顯示名稱
 * 
 * @example
 * // 註冊模式請求範例
 * GET /api/nuxt-server/fido2-lib/generate-option?userId=user123&userName=john&userDisplayName=John Doe
 * 
 * @example
 * // 登入模式請求範例
 * GET /api/nuxt-server/fido2-lib/generate-option?isLogin=true
 * 
 * @example
 * // 註冊模式成功回應範例
 * {
 *   "challenge": "base64url_encoded_challenge",
 *   "timeout": 60000,
 *   "rpId": "parker-nuxt-lab.vercel.app",
 *   "rpName": "Nuxt Lab",
 *   "user": {
 *     "id": "user123",
 *     "name": "john",
 *     "displayName": "John Doe"
 *   }
 * }
 * 
 * @example
 * // 登入模式成功回應範例
 * {
 *   "challenge": "base64url_encoded_challenge",
 *   "timeout": 60000,
 *   "rpId": "parker-nuxt-lab.vercel.app",
 *   "allowCredentials": []
 * }
 * 
 * @description
 * 此 API 根據查詢參數生成 FIDO2/WebAuthn 所需的選項：
 * 
 * 註冊模式 (isLogin=false 或未提供)：
 * - 生成 attestationOptions 用於新憑證註冊
 * - 需要提供 userId, userName, userDisplayName
 * 
 * 登入模式 (isLogin=true)：
 * - 生成 assertionOptions 用於現有憑證認證
 * - 通常需要從資料庫查詢 allowCredentials
 * 
 * 環境配置：
 * - 開發環境：rpId 設為 "localhost"
 * - 生產環境：rpId 設為 "parker-nuxt-lab.vercel.app"
 * 
 * @see {@link https://webauthn-open-source.github.io/fido2-lib/index.html FIDO2-Lib 文檔}
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  console.log({ query })

  const f2l = new Fido2Lib({
    timeout: 60000,
    rpId: process.env.NODE_ENV === 'development' ? 'localhost' : 'parker-nuxt-lab.vercel.app',
    rpName: "Nuxt Lab",
    // rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    authenticatorRequireResidentKey: true,
    // authenticatorAttachment: "platform",
    // authenticatorRequireResidentKey: false,
    // authenticatorUserVerification: "required"
  });

  let output;
  if (query?.isLogin === true) {
    // query?.credentialId 檢查資料庫裡使否存在，想不到模擬的方法
    const publicKeyCredentialCreationOptions = await f2l.assertionOptions();
    output = {
      ...publicKeyCredentialCreationOptions,
      challenge: base64Js.fromUint8Array(publicKeyCredentialCreationOptions.challenge, true),
    };
  } else {
    // let publicKeyCredentialCreationOptions = {};
    // if (fido2LibIsInitialized() === false) {
    //   const f2l = fido2LibInitialize({
    //     timeout: 60000,
    //     // rpId: "example.com",
    //     rpName: "Nuxt Lab",
    //     // rpIcon: "https://example.com/logo.png",
    //     challengeSize: 128,
    //     attestation: "direct",
    //     cryptoParams: [-7, -257],
    //     // authenticatorAttachment: "platform",
    //     // authenticatorRequireResidentKey: false,
    //     // authenticatorUserVerification: "required"
    //   });
    //   publicKeyCredentialCreationOptions = await f2l.attestationOptions();
    // } else {
    //   const f2l = getFido2Lib();
    //   publicKeyCredentialCreationOptions = await f2l.attestationOptions();
    // }

    const publicKeyCredentialCreationOptions = await f2l.attestationOptions();
    output = {
      ...publicKeyCredentialCreationOptions,
      challenge: base64Js.fromUint8Array(publicKeyCredentialCreationOptions.challenge, true),
      user: {
        id: query.userId,
        name: query.userName,
        displayName: query.userDisplayName
      }
    };
  }


  return output;
});