import { verifyWopiToken } from '@server/utils/wopiAuth';

export default defineEventHandler((event) => {
  const path = event.path.split('?')[0];

  // 只攔截 /collabora/wopi/files/ 下的路由
  if (path.startsWith('/collabora/wopi/files/')) {
    const parts = path.split('/');
    // 路徑格式: ['', 'collabora', 'wopi', 'files', '檔名', ...]
    const filesId = parts[4];

    if (filesId) {
      const { access_token, type } = getQuery(event);

      // 1. 檔案型別驗證
      let filetype = type || '';
      if (filetype.includes('?')) {
        filetype = filetype.split('?')[0];
      }
      let baseId = filesId;

      if (filesId.includes('.')) {
        const partsId = filesId.split('.');
        const originalExt = partsId.pop();
        baseId = partsId.join('.');
        if (!filetype) {
          filetype = originalExt;
        }
      }

      const allowedTypes = [
        'xlsx',
        'xls',
        'ods',
        'csv',
        'docx',
        'doc',
        'odt',
        'rtf',
        'txt',
        'pptx',
        'ppt',
        'odp',
        'pdf'
      ];

      if (
        typeof filetype !== 'string' ||
        filetype === '' ||
        allowedTypes.includes(filetype) === false
      ) {
        console.error('[WOPI Middleware] 不支援的檔案格式:', filetype);
        throw createError({
          statusCode: 400,
          statusMessage: 'Unsupported file type'
        });
      }

      const actualFilename = decodeURIComponent(`${baseId}.${filetype}`);

      // 2. Token 授權驗證
      let userInfo;
      try {
        userInfo = verifyWopiToken(access_token);
      } catch (err) {
        console.error(
          '[WOPI Middleware] Token validation failed:',
          err.message
        );
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
      }

      const correctedFilesId = `${baseId}.${filetype}`;

      // 將驗證結果綁定到 context 供後面的 API 使用
      event.context.wopi = {
        userInfo,
        filetype,
        filesId: correctedFilesId,
        actualFilename
      };
    }
  }
});
