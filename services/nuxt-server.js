const prefix = '/nuxt-server';

export function GET_cookie(payload) {
  const {  $request } = useNuxtApp();

  return  $request.get(`${prefix}/cookie`, payload);
}

export function POST_cookie(payload) {
  const {  $request } = useNuxtApp();

  return  $request.post(`${prefix}/cookie`, payload);
}