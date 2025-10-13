import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

// 前端透過 POST_fido2LibRegistration 呼叫這隻http post的api
/**
 * FIDO2 憑證註冊 API
 * 
 * 驗證並處理 FIDO2/WebAuthn 憑證註冊請求
 * 驗證前端傳來的憑證資料並回傳註冊結果
 * 
 * @api {POST} /api/nuxt-server/fido2-lib/registration FIDO2 憑證註冊
 * @apiGroup FIDO2
 * @apiName Fido2Registration
 * 
 * @apiBody {String} challengeString 挑戰字串
 * @apiBody {Object} credential WebAuthn 憑證物件
 * @apiBody {String} credential.id 憑證 ID
 * @apiBody {String} credential.rawId Base64URL 編碼的原始憑證 ID
 * @apiBody {String} credential.type 憑證類型
 * @apiBody {Object} credential.response 憑證回應物件
 * @apiBody {String} credential.response.attestationObject Base64URL 編碼的證明物件
 * @apiBody {String} credential.response.clientDataJSON Base64URL 編碼的客戶端資料
 * @apiBody {Object} user 使用者資訊
 * @apiBody {String} user.id 使用者 ID
 * 
 * @apiSuccess {Object} data 註冊結果物件
 * @apiSuccess {String} data.credential.id 憑證 ID
 * @apiSuccess {Object} data.attestationResult 證明結果物件
 * @apiSuccess {Object} data.base64URLServerSaveData 伺服器儲存資料
 * @apiSuccess {String} data.base64URLServerSaveData.resultId 結果 ID
 * @apiSuccess {String} data.base64URLServerSaveData.credentialPublicKeyPem PEM 格式的公鑰
 * @apiSuccess {String} data.base64URLServerSaveData.userId 使用者 ID
 * @apiSuccess {Number} data.base64URLServerSaveData.counter 計數器值
 * 
 * @apiError {Object} error 註冊失敗時的錯誤資訊
 * @apiError {Number} error.statusCode=401 HTTP 狀態碼
 * @apiError {String} error.statusMessage 錯誤訊息
 * 
 * @example
 * // 請求範例
 * POST /api/nuxt-server/fido2-lib/registration
 * Content-Type: application/json
 * {
 *   "challengeString": "base64url_challenge",
 *   "credential": {
 *     "id": "credential_id",
 *     "rawId": "base64url_raw_id",
 *     "type": "public-key",
 *     "response": {
 *       "attestationObject": "base64url_attestation_object",
 *       "clientDataJSON": "base64url_client_data"
 *     }
 *   },
 *   "user": {
 *     "id": "user123"
 *   }
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "credential": { ... },
 *   "attestationResult": { ... },
 *   "base64URLServerSaveData": {
 *     "resultId": "credential_id",
 *     "credentialPublicKeyPem": "pem_encoded_public_key",
 *     "userId": "user123",
 *     "counter": 0
 *   }
 * }
 * 
 * @description
 * 此 API 處理 FIDO2/WebAuthn 憑證註冊流程：
 * 
 * 1. 驗證憑證資料的完整性和有效性
 * 2. 解析並驗證證明物件 (attestationObject)
 * 3. 驗證客戶端資料 (clientDataJSON)
 * 4. 提取並處理認證器資料 (authenticatorData)
 * 5. 回傳處理後的資料供伺服器儲存
 * 
 * 重要注意事項：
 * - 驗證成功後應將 base64URLServerSaveData 儲存至資料庫
 * - credentialPublicKeyPem 為 PEM 格式，用於後續登入驗證
 * - counter 值用於防止重放攻擊
 * 
 * @see {@link https://webauthn-open-source.github.io/fido2-lib/index.html FIDO2-Lib 文檔}
 */
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const challengeString = payload.challengeString || '';

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

  // 驗證用物件，大多數資料由後端寫死或透過env做設定，type註冊時固定為webauthn.create
  const expected = {
    type: 'webauthn.create',
    origin: process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://parker-nuxt-lab.vercel.app',
    challenge: challengeString,
    // https://webauthn-open-source.github.io/fido2-lib/Fido2Lib.html#attestationResultＦ
    factor: 'first'
  };
  console.log({ expected });

  let attestationResult = {};

  try {
    const _attestationResult = await f2l.attestationResult({
      ...payload.credential,
      rawId: base64Js.toUint8Array(payload.credential.rawId).buffer,
      response: {
        ...payload.credential.response,
        attestationObject: base64Js.toUint8Array(payload.credential.response.attestationObject).buffer,
        authenticatorData: base64Js.toUint8Array(payload.credential.response.authenticatorData).buffer,
        clientDataJSON: base64Js.toUint8Array(payload.credential.response.clientDataJSON).buffer,
        publicKey: base64Js.toUint8Array(payload.credential.response.publicKey).buffer,
      }
    }, expected);
    attestationResult = _attestationResult;
    console.log({ attestationResult });

    // 可執行可不執行，建立attestationResult實例時會一並檢查是否正確，無回傳值，無效直接拋出例外
    // await attestationResult.validate();
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 401,
      statusMessage: error.message,
    });
  }

  // 驗證沒問題後，要將使用者資訊、金鑰及金鑰id存入資料庫，大多還是ArrayBuffer型別，因此需要特別注意資料庫欄位型態
  // 需要特別注意的是fido2-lib登入時的驗證金鑰方法是用PEM格式的金鑰，因此需要存的是credentialPublicKeyPem，其餘金鑰可是需求儲存

  const outputClientData = JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.clientData)));
  const outputAuthnrData = JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.authnrData)));
  console.log({ outputClientData });
  console.log({ outputAuthnrData });

  const utf8Decoder = new TextDecoder('utf-8');
  const userId = utf8Decoder.decode(base64Js.toUint8Array(
    payload.user?.id
  ));
  console.log({ userId });

  return {
    ...payload,
    attestationResult: {
      ...attestationResult,
      audit: {
        ...attestationResult.audit,
        journal: Array.from(attestationResult.audit.journal),
        info: JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.audit.info))),
        warning: JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.audit.warning)))
      },
      requiredExpectations: Array.from(attestationResult.requiredExpectations),
      optionalExpectations: Array.from(attestationResult.optionalExpectations),
      expectations: JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.expectations))),
      request: {
        ...attestationResult.request,
        rawId: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.rawId), true),
        response: {
          ...attestationResult.request.response,
          attestationObject: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.response.attestationObject), true),
          authenticatorData: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.response.authenticatorData), true),
          clientDataJSON: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.response.clientDataJSON), true),
          publicKey: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.response.publicKey), true)
        }
      },
      clientData: {
        ...outputClientData,
        rawClientDataJson: base64Js.fromUint8Array(new Uint8Array(outputClientData.rawClientDataJson), true),
        rawId: base64Js.fromUint8Array(new Uint8Array(outputClientData.rawId), true)
      },
      authnrData: {
        ...outputAuthnrData,
        sig: base64Js.fromUint8Array(new Uint8Array(outputAuthnrData.sig), true),
        rawAuthnrData: base64Js.fromUint8Array(new Uint8Array(outputAuthnrData.rawAuthnrData), true),
        rpIdHash: base64Js.fromUint8Array(new Uint8Array(outputAuthnrData.rpIdHash), true),
        flags: Array.from(outputAuthnrData.flags),
        aaguid: base64Js.fromUint8Array(new Uint8Array(outputAuthnrData.aaguid), true),
        credId: base64Js.fromUint8Array(new Uint8Array(outputAuthnrData.credId), true),
        credentialPublicKeyCose: base64Js.fromUint8Array(new Uint8Array(outputAuthnrData.credentialPublicKeyCose), true),
        credentialPublicKeyPem: base64Js.encodeURL(outputAuthnrData.credentialPublicKeyPem),
      }
    },
    base64URLServerSaveData: {
      resultId: attestationResult.request.id,
      // publicKey: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.response.publicKey), true),
      credentialPublicKeyPem: base64Js.encodeURL(attestationResult.authnrData.get('credentialPublicKeyPem')),
      userId,
      counter: outputAuthnrData.counter
    }
  };
});