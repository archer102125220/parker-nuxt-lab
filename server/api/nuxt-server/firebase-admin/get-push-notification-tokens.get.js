import { messagingFindAllToken } from '@/services/server/firebase-admin';

export default defineEventHandler(async function getMessageTokens(event) {
  const query = getQuery(event) || {};

  if (typeof query.os === 'string' && query.os !== '') {
    return await messagingFindAllToken(query);
  }

  const [
    webTokenList,
    androidTokenList,
    iosTokenList
  ] = await Promise.all([
    messagingFindAllToken({ ...query, os: 'web' }),
    messagingFindAllToken({ ...query, os: 'android' }),
    messagingFindAllToken({ ...query, os: 'ios' })
  ]);

  const tokenList = { webTokenList, androidTokenList, iosTokenList };
  return tokenList;
});
