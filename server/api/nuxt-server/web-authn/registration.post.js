import { decode, encode } from 'cbor-x';
import { Base64 as base64Js } from 'js-base64';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const challengeString = body.challengeString || '';
  const challenge = base64Js.toUint8Array(base64Js.decode(challengeString));

  const credential = {
    authenticatorAttachment: body.credential.authenticatorAttachment,
    id: body.credential.id,
    rawId: base64Js.toUint8Array(
      body.credential.rawId
    ),
    // response: {
    //   attestationObject: body.credential.response.attestationObject,
    //   clientDataJSON: body.credential.response.clientDataJSON
    // },
    attestationObject: base64Js.toUint8Array(
      body.credential.attestationObject
    ),
    clientDataJSON: base64Js.toUint8Array(
      body.credential.clientDataJSON
    )
  };
  // console.log(credential.rawId);

  const utf8Decoder = new TextDecoder('utf-8');

  const decodedClientData = utf8Decoder.decode(credential.clientDataJSON)
  const clientDataObj = JSON.parse(decodedClientData);

  if (clientDataObj?.type !== 'webauthn.create') {
    throw createError({
      statusCode: 401,
      statusMessage: 'clientData.type error',
    })
  }

  const attestationObject = credential.attestationObject;
  const decodedAttestationObj = decode(attestationObject);
  console.log(Object.keys(decodedAttestationObj));
  console.log(decodedAttestationObj.fmt);
  console.log(decodedAttestationObj.attStmt.alg);
  console.log(decodedAttestationObj.attStmt.sig);
  console.log(decodedAttestationObj.attStmt.x5c);
  console.log(decodedAttestationObj.attStmt.ecdaaKeyId);


  const { authData } = decodedAttestationObj;
  // console.log(authData);

  const credentialIdLength = authData[55];
  // get the credential ID
  const credentialId = authData.slice(55, 55 + credentialIdLength);
  // get the public key object
  const publicKeyBytes = authData.slice(55 + credentialIdLength, authData.length - 1);
  // the publicKeyBytes are encoded again as CBOR
  // const publicKeyObject = decode(publicKeyBytes); // error ?

  // console.log(credentialId);
  // console.log(decode(credentialId));
  // console.log(publicKeyBytes);
  // console.log(decode(publicKeyBytes));
  // console.log(utf8Decoder.decode(credentialId), '123');
  // console.log(utf8Decoder.decode(publicKeyBytes), '456');
  // console.log(publicKeyObject);

  // console.log(credentialIdLength);
  // console.log(authData);
  // console.log(credentialId, authData.length, credentialIdLength, 56 + credentialIdLength);
  // console.log(publicKeyBytes, authData.length);
  // console.log(base64Js.encodeURL(challenge), clientDataObj, base64Js.encodeURL(challenge) === clientDataObj.challenge);

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