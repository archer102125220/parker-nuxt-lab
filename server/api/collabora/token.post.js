import { generateWopiToken } from '@server/utils/wopiAuth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, userName } = body;

  if (!userId || !userName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId or userName'
    });
  }

  // 這裡使用剛剛建立的 wopiAuth util
  // 因為是放在 server/utils 裡，Nuxt 3 會自動 import
  const token = generateWopiToken(userId, userName);

  return {
    success: true,
    token
  };
});
