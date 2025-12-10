const prefix = '/api/face-swap';

/**
 * POST face swap process
 * @param {Object} payload - { sourceImage: string, targetImage: string }
 * @returns {Promise<{ success: boolean, resultImage?: string, error?: string }>}
 */
export function POST_faceSwapProcess(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/process`, payload);
}
