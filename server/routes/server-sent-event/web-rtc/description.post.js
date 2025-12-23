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
    const description = body?.description;

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

    if (typeof description !== 'object' || description === null) {
        throw new Error({
            statusCode: 401,
            statusMessage: 'invalid webRTC description',
        });
    }

    const memberDescriptionListString = await UpstashRedis.get(
        `nuxt-lab:web-rtc-member-description-list-${roomId}`
    );
    const memberDescriptionList = memberDescriptionListString ? safeParseJSON(memberDescriptionListString) : [];
    if (memberDescriptionList.some(member => member.userId === userId) === false) {
        memberDescriptionList.push({
            roomId,
            userId,
            description
        });

        await UpstashRedis.set(
            `nuxt-lab:web-rtc-member-description-list-${roomId}`,
            safeToJSON(memberDescriptionList), {
                ex: 60 * 10
            }
        );
    }

    return {
        success: true
    };
});