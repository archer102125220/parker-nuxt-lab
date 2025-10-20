import { Redis } from "@upstash/redis";
import _cloneDeep from 'lodash/cloneDeep';
// import { createEventStream } from 'h3';

import { safeToJSON, safeParseJSON } from '@/utils/helpers/safeToJSON';

const UpstashRedis = Redis.fromEnv();

export default defineEventHandler(async function (event) {
  setResponseHeader(event, 'Content-Type', 'text/event-stream');
  setResponseHeader(event, 'Cache-Control', 'no-cache');
  setResponseHeader(event, 'Connection', 'keep-alive');

  console.log('WebRTC SSE');
  // const { uuId } = event.context.params;
  const uuId = getRouterParam(event, 'uuId');
  const query = getQuery(event);
  const body = await readBody(event);

  const eventStream = createEventStream(event);

  const interval = setInterval(async function () {
    try {
      const userId = body?.userId || query?.userId || '';

      const memberListString = await UpstashRedis.get(`web-rtc-${uuId}`);
      const memberList = memberListString ? safeParseJSON(memberListString) : [];
      const oldMemberList = _cloneDeep(memberList);
      const newMemberList = memberList;

      if (userId !== '' && oldMemberList.some(member => member.userId === userId) === false) {
        const newMember = {
          roomId: uuId,
          userId
        };

        const candidate = body?.candidate || query?.candidate || null;
        if (candidate !== null) {
          newMember.candidate = candidate;
        }

        const description = body?.description || query?.description || null;
        if (description !== null) {
          newMember.description = description;
        }

        console.log({ newMember });

        newMemberList.push(newMember);
        console.log({ newMemberList });
        await UpstashRedis.set(`web-rtc-${uuId}`, safeToJSON(newMemberList), { ex: 60 * 10 });
      }

      await eventStream.push({ event: 'webrtc', data: safeToJSON(newMemberList) });
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


