import { decode, encode } from 'cbor-x';
import { Base64 as base64Js } from 'js-base64';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const challengeString = body.challengeString || '';
  const challenge = Uint8Array.from(challengeString.split?.(','));

  const credentials = {
    authenticatorAttachment: body.credentials.authenticatorAttachment,
    id: body.credentials.id,
    rawId: Uint8Array.from(base64Js.decode(
      body.credentials.rawId
    ).split(',')),
    // response: {
    //   attestationObject: body.credentials.response.attestationObject,
    //   clientDataJSON: body.credentials.response.clientDataJSON
    // },
    attestationObject: Uint8Array.from(base64Js.decode(
      body.credentials.attestationObject
    ).split(',')),
    clientDataJSON: Uint8Array.from(base64Js.decode(
      body.credentials.clientDataJSON
    ).split(','))
  };
  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientData = utf8Decoder.decode(credentials.clientDataJSON)
  const clientDataObj = JSON.parse(decodedClientData);

  const attestationObject = credentials.attestationObject;
  const decodedAttestationObj = decode(attestationObject);

  const { authData } = decodedAttestationObj;
  const credentialIdLength = authData[55];
  // get the credential ID
  const credentialId = authData.slice(56, 56 + credentialIdLength);
  // get the public key object
  const publicKeyBytes = authData.slice(56 + credentialIdLength);
  // the publicKeyBytes are encoded again as CBOR
  // const publicKeyObject = decode(publicKeyBytes);


  // console.log(credentialIdLength);
  // console.log(authData);
  console.log(credentialId);
  console.log(publicKeyBytes);
  // console.log(publicKeyObject);

  return { ...body, decodeClientDataObj: clientDataObj };
});