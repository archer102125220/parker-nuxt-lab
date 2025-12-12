const prefix = '/face-swap';

/**
 * POST face swap process
 * @param {FormData|Object} payload - FormData with sourceImage and targetImage files, or { sourceImage: string, targetImage: string }
 * @returns {Promise<{ success: boolean, resultImage?: string, error?: string }>}
 */
export function POST_faceSwapProcess(payload) {
  const { $request } = useNuxtApp();

  // If payload is FormData, set appropriate headers
  const config =
    payload instanceof FormData
      ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      : {};

  return $request.post(`${prefix}/process`, payload, config);
}
