

import { Decoder } from 'socket.io-parser';
import { decodePayload } from 'engine.io-parser';

export function decodeSocketIOPayload(payload) {
  return new Promise(async (resolve) => {
    const engineIoDecodePayload = decodePayload(payload);
    console.log({ engineIoDecodePayload });
    const decoder = new Decoder();

    decoder.on('decoded', (packet) => {
      resolve(packet);
    });

    decoder.add(engineIoDecodePayload?.[0]?.data || payload);
  })
}

export default decodeSocketIOPayload;