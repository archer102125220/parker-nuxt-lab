// import { decode } from 'cbor-x';
import { Base64 as base64Js } from 'js-base64';
import fido2Lib from 'fido2-lib';

// 簽章驗證之部分找不到相關資料，因此此部分略過待完全依賴fido2-lib套件在實作驗證

// https://blog.techbridge.cc/2019/08/17/webauthn-intro
// https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility
// https://flyhigher.top/develop/2160.html#verify-authenticator
/**
 * WebAuthn 憑證註冊 API
 * 
 * 驗證並處理 WebAuthn 憑證註冊請求
 * 驗證前端傳來的憑證資料並回傳註冊結果
 * 
 * @api {POST} /api/nuxt-server/web-authn/registration WebAuthn 憑證註冊
 * @apiGroup WebAuthn
 * @apiName WebAuthnRegistration
 * 
 * @apiBody {String} challengeString 挑戰字串
 * @apiBody {Object} credential WebAuthn 憑證物件
 * @apiBody {String} credential.id 憑證 ID
 * @apiBody {String} credential.rawId Base64URL 編碼的原始憑證 ID
 * @apiBody {String} credential.type 憑證類型
 * @apiBody {Object} credential.response 憑證回應物件
 * @apiBody {String} credential.response.attestationObject Base64URL 編碼的證明物件
 * @apiBody {String} credential.response.clientDataJSON Base64URL 編碼的客戶端資料
 * 
 * @apiSuccess {Object} data 註冊結果物件
 * @apiSuccess {String} data.credential.id 憑證 ID
 * @apiSuccess {Object} data.decodeClientDataObj 解析後的客戶端資料物件
 * @apiSuccess {Boolean} data.success 註冊是否成功
 * @apiSuccess {Object} data.base64URLServerSaveData 伺服器儲存資料
 * @apiSuccess {String} data.base64URLServerSaveData.credentialId 憑證 ID
 * @apiSuccess {String} data.base64URLServerSaveData.credentialPublicKeyPem PEM 格式的公鑰
 * @apiSuccess {String} data.base64URLServerSaveData.credentialPublicKeyJwk JWK 格式的公鑰
 * 
 * @apiError {Object} error 註冊失敗時的錯誤資訊
 * @apiError {Number} error.statusCode=401 HTTP 狀態碼
 * @apiError {String} error.statusMessage 錯誤訊息
 * 
 * @example
 * // 請求範例
 * POST /api/nuxt-server/web-authn/registration
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
 *   }
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "credential": { ... },
 *   "decodeClientDataObj": {
 *     "type": "webauthn.create",
 *     "challenge": "base64url_challenge",
 *     "origin": "https://example.com"
 *   },
 *   "success": true,
 *   "base64URLServerSaveData": {
 *     "credentialId": "credential_id",
 *     "credentialPublicKeyPem": "pem_encoded_public_key",
 *     "credentialPublicKeyJwk": "jwk_encoded_public_key"
 *   }
 * }
 * 
 * @description
 * 此 API 處理 WebAuthn 憑證註冊流程：
 * 
 * 1. 驗證憑證資料的完整性和有效性
 * 2. 解析並驗證證明物件 (attestationObject)
 * 3. 驗證客戶端資料 (clientDataJSON) 的類型和挑戰值
 * 4. 驗證演算法支援 (目前支援 SHA-256)
 * 5. 提取並處理認證器資料 (authenticatorData)
 * 6. 回傳處理後的資料供伺服器儲存
 * 
 * 驗證項目：
 * - clientData.type 必須為 "webauthn.create"
 * - 挑戰值必須與預期值相符
 * - 演算法必須支援 SHA-256
 * 
 * 重要注意事項：
 * - 簽章驗證部分目前依賴 fido2-lib 套件實作
 * - 驗證成功後應將 base64URLServerSaveData 儲存至資料庫
 * - 支援的演算法：SHA-256
 * 
 * @see {@link https://blog.techbridge.cc/2019/08/17/webauthn-intro WebAuthn 介紹}
 * @see {@link https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/ Passkey 和 WebAuthn}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility WebAuthn API 瀏覽器相容性}
 */
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const challengeString = payload.challengeString || '';
  // const challenge = base64Js.toUint8Array(base64Js.decode(challengeString));

  const credential = {
    ...payload.credential,
    id: payload.credential.id,
    rawId: base64Js.toUint8Array(
      payload.credential.rawId
    ),
    response: {
      attestationObject: base64Js.toUint8Array(
        payload.credential.response.attestationObject
      ),
      clientDataJSON: base64Js.toUint8Array(
        payload.credential.response.clientDataJSON
      )
    }
  };

  // const clientResponse = fido2Lib.parseClientResponse(credential);
  // console.log(clientResponse);

  // validateSignature

  const utf8Decoder = new TextDecoder('utf-8');

  const decodedClientData = utf8Decoder.decode(credential.response.clientDataJSON);
  const clientDataObj = JSON.parse(decodedClientData);

  if (clientDataObj?.type !== 'webauthn.create') {
    throw createError({
      statusCode: 401,
      statusMessage: 'clientData.type error',
    })
  }

  // const attestationObject = credential.response.attestationObject;
  // const decodedAttestationObj = decode(attestationObject);
  // console.log(Object.keys(decodedAttestationObj));
  // console.log(decodedAttestationObj.fmt);
  // console.log(decodedAttestationObj.attStmt.alg);
  // console.log(decodedAttestationObj.attStmt.sig);
  // console.log(decodedAttestationObj.attStmt.x5c);
  // console.log(decodedAttestationObj.attStmt.ecdaaKeyId);

  // const alg = decodedAttestationObj.attStmt.alg;
  // if (alg !== -7) {
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: 'Unsupported algorithm',
  //   });
  // }


  const attestationObject = await fido2Lib.parseAttestationObject(credential.response.attestationObject.buffer);
  // console.log(attestationObject);

  const alg = attestationObject.get('alg');
  if (alg?.hashAlg !== 'SHA-256') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unsupported algorithm',
    });
  }

  if (challengeString !== clientDataObj.challenge) {
    throw createError({
      statusCode: 401,
      statusMessage: 'challenge error',
    });
  }


  // const { authData } = decodedAttestationObj;
  // console.log(authData);
  const decodeAuthData = await fido2Lib.parseAuthenticatorData(attestationObject.get('rawAuthnrData'));
  // console.log(decodeAuthData);

  // console.log(base64Js.encodeURL(challenge), clientDataObj, base64Js.encodeURL(challenge) === clientDataObj.challenge);

  // console.log(await fido2Lib.validateSignature(
  //   credential.response.clientDataJSON,
  //   decodeAuthData.get('rawAuthnrData'),
  //   decodeAuthData.get('sig'),
  //   alg.hashAlg
  // ));


  return {
    ...payload,
    decodeClientDataObj: clientDataObj,
    success: true,
    base64URLServerSaveData: {
      credentialId: credential.id,
      credentialPublicKeyPem: base64Js.encodeURL(decodeAuthData.get('credentialPublicKeyPem')),
      credentialPublicKeyJwk: base64Js.encodeURL(JSON.stringify(decodeAuthData.get('credentialPublicKeyJwk')))
    }
  };
});