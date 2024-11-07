import { Base64 as base64Js } from 'js-base64';

// 簽章驗證之部分找不到相關資料，因此此部分略過待完全依賴fido2-lib套件在實作驗證

export default defineEventHandler((event) => {
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  // console.log({ challenge }, challenge.toLocaleString());

  return base64Js.fromUint8Array(challenge, true);
});