import { verifyWopiToken } from '@server/utils/wopiAuth';

export default defineEventHandler((event) => {
  const path = event.path.split('?')[0];

  // 只攔截 /collabora/wopi/files/ 下的路由
  if (path.startsWith('/collabora/wopi/files/')) {
    const parts = path.split('/');
    // 路徑格式: ['', 'collabora', 'wopi', 'files', '檔名', ...]
    const filesId = parts[4];

    if (filesId) {
      // 1. 檔案型別驗證
      const filetype = filesId.split('.').pop();
      const allowedTypes = ['xlsx', 'docx', 'pptx'];
      
      if (!allowedTypes.includes(filetype)) {
        console.error('[WOPI Middleware] 不支援的檔案格式:', filetype);
        throw createError({ statusCode: 400, statusMessage: 'Unsupported file type' });
      }

      // 2. Token 授權驗證
      const { access_token } = getQuery(event);
      let userInfo;
      try {
        userInfo = verifyWopiToken(access_token);
      } catch (err) {
        console.error('[WOPI Middleware] Token validation failed:', err.message);
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
      }

      // 將驗證結果綁定到 context 供後面的 API 使用
      event.context.wopi = {
        userInfo,
        filetype,
        filesId
      };
    }
  }
});
