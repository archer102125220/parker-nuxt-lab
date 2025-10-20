const prefix = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';

export function POST_webRTCJoinRoom(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/server-sent-event/web-rtc/join-room`, payload);
}
export function POST_webRTCCandidateList(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/server-sent-event/web-rtc/candidate-list`, payload);
}

export function POST_webRTCDescription(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/server-sent-event/web-rtc/description`, payload);
}