import qs from 'qs';

const prefix = '/nuxt-server';

export function GET_cookie(payload) {
  const { $request } = useNuxtApp();

  return $request.get(`${prefix}/cookie`, payload);
}

export function POST_cookie(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/cookie`, payload);
}

export function POST_frontendApiCachTest(payload = {}, extendOption) {
  const { $request } = useNuxtApp();

  const { query, payload: _payload } = payload;

  return $request.post(`${prefix}/frontend-api-cach-test?${qs.stringify(query)}`, _payload, extendOption);
}

export function GET_frontendApiCachTest(payload = {}, extendOption) {
  const { $request } = useNuxtApp();

  const { query, payload: _payload } = payload;

  return $request.get(`${prefix}/frontend-api-cach-test?${qs.stringify(query)}`, _payload, extendOption);
}