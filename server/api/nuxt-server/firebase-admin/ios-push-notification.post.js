import firebaseAdmin from 'firebase-admin';

import {
  getIosFirebaseAdminApp
} from '@/utils/helpers/firebase-admin';

export default defineEventHandler(async function iosPushMessage(event) {
  const body = await readBody(event);

  if (body.data === undefined || body.data === null) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: data',
    });
  } else if (Array.isArray(body.token) === false || body.token.length <= 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: token',
    });
  }


  const iosFirebaseAdminApp = getIosFirebaseAdminApp();
  const response = await firebaseAdmin
    .messaging(iosFirebaseAdminApp)
    .sendEachForMulticast({
      data: { msg: body.data, title: body.title, img: body.img },
      tokens: body.token
    });
  console.log(response);

  return response;
});
