import path from 'path';
import fs from 'fs-extra';

import { renameMap } from '@server/utils/wopiStore';

const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public');
console.log({ __dirname, FILE_DIR });

export default defineEventHandler(async (event) => {
  // 由 middleware wopi.js 統一處理驗證與參數解析
  const { filesId, filetype } = event.context.wopi;

  console.log('edit');
  console.log({ filesId, filetype });

  const dirPath = path.join(FILE_DIR, filetype);
  // 若檔案有被改名過，則取其真正的實體檔名
  const actualFilename = (await renameMap.getItem(filesId)) || filesId;
  const filePath = path.join(dirPath, actualFilename);

  // 建立可讀串流並直接回傳
  const readStream = fs.createReadStream(filePath);
  return sendStream(event, readStream);
});
