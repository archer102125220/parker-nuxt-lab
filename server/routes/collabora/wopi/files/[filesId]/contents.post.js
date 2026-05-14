import path from 'path';
import fs from 'fs-extra';

const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public/xlsx');
console.log({ __dirname, FILE_DIR });

export default defineEventHandler(async (event) => {
  const { filesId } = event.context.params;

  // const filePath = path.join(FILE_DIR, 'test.xlsx');
  const filePath = path.join(FILE_DIR, filesId);

  console.log('save');
  console.log({ filesId });
  console.log('[PutFile] 實際寫入路徑:', filePath); // ← 確認寫入位置
  console.log('[PutFile] FILE_DIR:', FILE_DIR);

  // 參數 false 非常重要！它確保 Nitro 回傳的是 Node.js Buffer，而不是被編碼過的 String
  const rawBinary = await readRawBody(event, false);

  if (!rawBinary) {
    const error = createError({ statusCode: 400, statusMessage: 'Empty File Body' });
    console.error(error);
    throw error;
  }

  try {
    // 確保目錄存在
    fs.ensureDirSync(FILE_DIR);
    // 將 Buffer 寫入硬碟覆寫舊檔案
    fs.writeFileSync(filePath, rawBinary);

    console.log('[PutFile] 寫入成功，大小:', rawBinary.length, 'bytes');

    return { success: true };
  } catch (err) {
    console.error('[PutFile] 寫入失敗:', err);
    throw createError({ statusCode: 500, statusMessage: 'Failed to save file' });
  }
});