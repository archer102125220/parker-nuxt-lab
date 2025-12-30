import {
    Redis
} from '@upstash/redis';
import _cloneDeep from 'lodash/cloneDeep';

import {
    safeToJSON,
    safeParseJSON
} from '@shared/helpers/safeToJSON';

const UpstashRedis = Redis.fromEnv();

export default defineEventHandler(async function(event) {
    const body = await readBody(event);
    const roomId = body?.roomId;
    const userId = body?.userId;

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

    const memberListString = await UpstashRedis.get(
        `nuxt-lab:web-rtc-member-list-${roomId}`
    );
    const memberList = memberListString ? safeParseJSON(memberListString) : [];
    const oldMemberList = _cloneDeep(memberList);

    const memberType = {
        roomId,
        userId,
        isOffer: oldMemberList.length <= 0,
        isAnswer: oldMemberList.length > 0
    };

    if (memberList.some(member => member.userId === userId) === false) {
        memberList.push(memberType);

        await UpstashRedis.set(
            `nuxt-lab:web-rtc-member-list-${roomId}`,
            safeToJSON(memberList), {
                ex: 60 * 10
            }
        );
    }

    await UpstashRedis.set(
        `nuxt-lab:web-rtc-member-type-${roomId}-${userId}`,
        safeToJSON(memberType), {
            ex: 60 * 10
        }
    );

    return memberType;
});