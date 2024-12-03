import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// import { getFido2Lib, reNewFido2Lib } from '@/utils/fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  // console.log(payload.credential);

  // const f2l = getFido2Lib();
  // const f2l = reNewFido2Lib();
  const f2l = new Fido2Lib({
    timeout: 60000,
    rpId: process.env.NODE_ENV === 'development' ? 'localhost' : 'nuxt-lab.vercel.app',
    rpName: "Nuxt Lab",
    // rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    // authenticatorAttachment: "platform",
    // authenticatorRequireResidentKey: false,
    // authenticatorUserVerification: "required"
  });

  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientData = utf8Decoder.decode(base64Js.toUint8Array(
    payload.credential.response.clientDataJSON
  ));
  const clientDataObj = JSON.parse(decodedClientData);
  clientDataObj.factor = 'first';
  console.log({ clientDataObj });

  const attestationResult = await f2l.attestationResult({
    ...payload.credential,
    rawId: base64Js.toUint8Array(payload.credential.rawId).buffer,
    response: {
      ...payload.credential.response,
      attestationObject: base64Js.toUint8Array(payload.credential.response.attestationObject).buffer,
      authenticatorData: base64Js.toUint8Array(payload.credential.response.authenticatorData).buffer,
      clientDataJSON: base64Js.toUint8Array(payload.credential.response.clientDataJSON).buffer,
      publicKey: base64Js.toUint8Array(payload.credential.response.publicKey).buffer,
    }
  }, clientDataObj);
  console.log({ attestationResult });

  // 無回傳值，無效直接拋出例外
  await attestationResult.validate();

  const outputClientData = JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.clientData)));
  const outputAuthnrData = JSON.parse(JSON.stringify(Object.fromEntries(attestationResult.authnrData)));
  // console.log(outputAuthnrData.credentialPublicKeyJwk);

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
    success: true,
    base64URLServerSaveData: {
      resultId: attestationResult.request.id,
      publicKey: base64Js.fromUint8Array(new Uint8Array(attestationResult.request.response.publicKey), true),
      credentialPublicKeyPem: base64Js.encodeURL(attestationResult.authnrData.get('credentialPublicKeyPem')),
      credentialPublicKeyJwk: base64Js.encodeURL(JSON.stringify(attestationResult.authnrData.get('credentialPublicKeyJwk'))),
      counter: outputAuthnrData.counter
    }
  };
});