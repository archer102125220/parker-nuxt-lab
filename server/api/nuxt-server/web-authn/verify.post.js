import { decode, encode } from 'cbor-x';
import { Base64 as base64Js } from 'js-base64';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const challengeString = body.challengeString || '';
  const challenge = base64Js.toUint8Array(base64Js.decode(challengeString));

  const credentials = {
    authenticatorAttachment: body.credentials.authenticatorAttachment,
    id: body.credentials.id,
    rawId: base64Js.toUint8Array(
      body.credentials.rawId
    ),
    // response: {
    //   attestationObject: body.credentials.response.attestationObject,
    //   clientDataJSON: body.credentials.response.clientDataJSON
    // },
    attestationObject: base64Js.toUint8Array(
      body.credentials.attestationObject
    ),
    clientDataJSON: base64Js.toUint8Array(
      body.credentials.clientDataJSON
    )
  };
  // console.log(credentials.rawId);

  const utf8Decoder = new TextDecoder('utf-8');

  const decodedClientData = utf8Decoder.decode(credentials.clientDataJSON)
  const clientDataObj = JSON.parse(decodedClientData);

  // if (clientDataObj?.type !== 'webauthn.create') {
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: 'clientData.type error',
  //   })
  // }

  const attestationObject = credentials.attestationObject;
  const decodedAttestationObj = decode(attestationObject);
  // console.log(decodedAttestationObj);

  const { authData } = decodedAttestationObj;
  const credentialIdLength = authData[55];
  // get the credential ID
  const credentialId = authData.slice(56, 56 + credentialIdLength);
  // get the public key object
  const publicKeyBytes = authData.slice(56 + credentialIdLength, authData.length - 1);
  // the publicKeyBytes are encoded again as CBOR
  // const publicKeyObject = decode(publicKeyBytes); // error ?
  // console.log(publicKeyObject);

  return {
    ...body,
    decodeClientDataObj: clientDataObj,
    success: base64Js.fromUint8Array(challenge, true) === clientDataObj.challenge,
    base64URLServerSaveData: {
      credentialId: base64Js.fromUint8Array(credentialId, true),
      publicKeyBytes: base64Js.fromUint8Array(publicKeyBytes, true),
    }
  };
});