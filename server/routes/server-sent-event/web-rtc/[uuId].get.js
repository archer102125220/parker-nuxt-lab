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
  const uuId = getRouterParam(event, 'uuId')
  const query = getQuery(event);

  const eventStream = createEventStream(event);

  const interval = setInterval(async () => {
    try {
      const userId = query?.userId || '';

      const memberListString = await UpstashRedis.get(`web-rtc-${uuId}`);
      const memberList = memberListString ? safeParseJSON(memberListString) : [];
      const oldMemberList = _cloneDeep(memberList);
      const newMemberList = memberList;

      if (userId !== '' && oldMemberList.some(member => member.userId === userId) === false) {
        const newMember = {
          roomId: uuId,
          userId
        };

        const candidate = query?.candidate || null;
        if (candidate !== null) {
          newMember.candidate = candidate;
        }

        const description = query?.description || null;
        if (description !== null) {
          newMember.description = description;
        }

        newMemberList.push(newMember);
        newMemberList.push(newMember);
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
})
