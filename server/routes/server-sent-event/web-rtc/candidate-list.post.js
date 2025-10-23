import { Redis } from '@upstash/redis';
import _cloneDeep from 'lodash/cloneDeep';

import { safeToJSON, safeParseJSON } from '@utils/helpers/safeToJSON';

const UpstashRedis = Redis.fromEnv();

export default defineEventHandler(async function (event) {
  const body = await readBody(event);
  const roomId = body?.roomId;
  const userId = body?.userId;
  const candidateList = body?.candidateList;

  if (typeof roomId !== 'string' || roomId === '') {
    throw new Error({
      statusCode: 401,
      statusMessage: 'invalid webRTC room id',
    });
  }

  if (typeof userId !== 'string' || userId === '') {
    throw new Error({
      statusCode: 401,
      statusMessage: 'invalid webRTC user id',
    });
  }

  if (Array.isArray(candidateList) === false || candidateList.length <= 0) {
    throw new Error({
      statusCode: 401,
      statusMessage: 'invalid webRTC candidate list',
    });
  }

  const memberCandidateListString = await UpstashRedis.get(
    `web-rtc-member-candidate-list-${roomId}`
  );
  const memberCandidateList = memberCandidateListString ? safeParseJSON(memberCandidateListString) : [];
  if (memberCandidateList.some(member => member.userId === userId) === false) {
    memberCandidateList.push({
      roomId,
      userId,
      candidateList
    });

    await UpstashRedis.set(
      `web-rtc-member-candidate-list-${roomId}`,
      safeToJSON(memberCandidateList),
      { ex: 60 * 10 }
    );
  }

  return { success: true };
});