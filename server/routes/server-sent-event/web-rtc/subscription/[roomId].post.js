import { Redis } from '@upstash/redis';
import _cloneDeep from 'lodash/cloneDeep';
// import { createEventStream } from 'h3';

import { safeToJSON, safeParseJSON } from '@utils/helpers/safeToJSON';

const UpstashRedis = Redis.fromEnv();

export default defineEventHandler(async function (event) {
  setResponseHeader(event, 'Content-Type', 'text/event-stream');
  setResponseHeader(event, 'Cache-Control', 'no-cache');
  setResponseHeader(event, 'Connection', 'keep-alive');

  console.log('WebRTC SSE');
  // const { roomId } = event.context.params;
  const roomId = getRouterParam(event, 'roomId');
  const query = getQuery(event);
  const body = await readBody(event);

  const userId = body?.userId || query?.userId || '';

  const eventStream = createEventStream(event);

  const interval = setInterval(async function () {
    try {
      const [memberTypeString, memberCandidateListString, memberDescriptionListString] = await Promise.all([
        UpstashRedis.get(`web-rtc-member-type-${roomId}-${userId}`),
        UpstashRedis.get(`web-rtc-member-candidate-list-${roomId}`),
        UpstashRedis.get(`web-rtc-member-description-list-${roomId}`),
      ]);
      const memberType = memberTypeString ? safeParseJSON(memberTypeString) : null;
      const memberCandidateList = memberCandidateListString ? safeParseJSON(memberCandidateListString) : [];
      const memberDescriptionList = memberDescriptionListString ? safeParseJSON(memberDescriptionListString) : [];

      const webRTCSetting = {
        roomId,
        userId,
        memberCandidateList,
        memberDescriptionList,
        isOffer: memberType.isOffer,
        isAnswer: memberType.isAnswer
      }

      await eventStream.push({ event: 'webrtc', data: safeToJSON(webRTCSetting) });
    } catch (error) {
      console.error(error);
    }
  }, 1000);

  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });


  return eventStream.send();
});


