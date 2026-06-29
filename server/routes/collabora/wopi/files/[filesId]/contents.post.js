import path from 'path';
import fs from 'fs-extra';

import { renameMap } from '@server/utils/wopiStore';

const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public');
console.log({ __dirname, FILE_DIR });

export default defineEventHandler(async (event) => {
  // 由 middleware wopi.js 統一處理驗證與參數解析
  const { filesId, filetype, actualFilename } = event.context.wopi;

  // 參數 false 非常重要！它確保 Nitro 回傳的是 Node.js Buffer，而不是被編碼過的 String
  const rawBinary = await readRawBody(event, false);
  console.log('filesId', filesId);

  const dirPath = path.join(FILE_DIR, filetype);
  // 若檔案有被改名過，則取其真正的實體檔名
  const resolvedFilename = (await renameMap.getItem(filesId)) || actualFilename;
  const filePath = path.join(dirPath, resolvedFilename);

  console.log('save');
  console.log({ filesId, filetype });
  console.log('[PutFile] 實際寫入路徑:', filePath); // ← 確認寫入位置
  console.log('[PutFile] FILE_DIR:', FILE_DIR);

  if (Buffer.isBuffer(rawBinary) === false || rawBinary.length === 0) {
    const error = createError({
      statusCode: 400,
      statusMessage: 'Empty File Body'
    });
    console.error(error);
    throw error;
  }

  try {
    // 確保目錄存在
    fs.ensureDirSync(dirPath);
    // 將 Buffer 寫入硬碟覆寫舊檔案
    fs.writeFileSync(filePath, rawBinary);

    console.log('[PutFile] 寫入成功，大小:', rawBinary.length, 'bytes');

    return { success: true };
  } catch (err) {
    console.error('[PutFile] 寫入失敗:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save file'
    });
  }
});
