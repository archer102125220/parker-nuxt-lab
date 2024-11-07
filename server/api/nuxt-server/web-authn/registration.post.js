// import { decode } from 'cbor-x';
import { Base64 as base64Js } from 'js-base64';
import fido2Lib from 'fido2-lib';

// 簽章驗證之部分找不到相關資料，因此此部分略過待完全依賴fido2-lib套件在實作驗證

// https://blog.techbridge.cc/2019/08/17/webauthn-intro
// https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility
// https://flyhigher.top/develop/2160.html#verify-authenticator

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
  console.log(attestationObject);

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