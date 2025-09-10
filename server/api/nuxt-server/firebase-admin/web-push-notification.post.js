import firebaseAdmin from 'firebase-admin';

export default defineEventHandler(async function webPushMessage(event) {
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

  const firebaseAdminApp = event.context.$firebaseAdminApp.web;
  const response = await firebaseAdmin
    .messaging(firebaseAdminApp)
    .sendEachForMulticast({
      data: { msg: body.data, title: body.title, img: body.img },
      tokens: body.token
    });
  console.log(response);

  return response;
});
