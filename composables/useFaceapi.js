
export function useFaceapi() {
  if (import.meta.client) {
    return useNuxtApp()?.$faceapi;
  } else if (import.meta.server) {
    return useNitro()?.$faceapi;
  }

  return null;
}