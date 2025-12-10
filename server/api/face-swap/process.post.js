// POST /api/face-swap/process
// Face swap API endpoint using server-side face-api.js
import { performFaceSwap } from '../../utils/face-swap.js';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sourceImage, targetImage } = body;

    // Validate input
    if (typeof sourceImage !== 'string' || sourceImage === '') {
      throw createError({
        statusCode: 400,
        message: '缺少來源圖片 (sourceImage)'
      });
    }

    if (typeof targetImage !== 'string' || targetImage === '') {
      throw createError({
        statusCode: 400,
        message: '缺少目標圖片 (targetImage)'
      });
    }

    // Perform face swap
    const resultImage = await performFaceSwap(sourceImage, targetImage);

    return {
      success: true,
      resultImage
    };
  } catch (error) {
    console.error('Face swap error:', error);

    // Handle known errors
    if (error.message.includes('無法在')) {
      return {
        success: false,
        error: error.message
      };
    }

    // Handle unexpected errors
    throw createError({
      statusCode: 500,
      message: error.message || '人臉替換處理失敗'
    });
  }
});
