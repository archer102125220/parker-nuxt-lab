// POST /api/face-swap/process
// Face swap API endpoint using server-side face-api.js
import { performFaceSwap } from '@server/utils/face-swap';

export default defineEventHandler(async (event) => {
  try {
    // Read multipart form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: '未收到圖片資料'
      });
    }

    // Extract files from form data
    let sourceImageBuffer = null;
    let targetImageBuffer = null;

    for (const part of formData) {
      if (part.name === 'sourceImage' && part.data) {
        sourceImageBuffer = part.data;
      } else if (part.name === 'targetImage' && part.data) {
        targetImageBuffer = part.data;
      }
    }

    // Validate input
    if (!sourceImageBuffer) {
      throw createError({
        statusCode: 400,
        message: '缺少來源圖片 (sourceImage)'
      });
    }

    if (!targetImageBuffer) {
      throw createError({
        statusCode: 400,
        message: '缺少目標圖片 (targetImage)'
      });
    }

    // Convert buffers to base64 for processing
    const sourceImage = `data:image/png;base64,${sourceImageBuffer.toString('base64')}`;
    const targetImage = `data:image/png;base64,${targetImageBuffer.toString('base64')}`;

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
