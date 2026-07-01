import path from 'path';
import fs from 'fs-extra';

import { renameMap } from '@server/utils/wopiStore';

const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public');
console.log({ __dirname, FILE_DIR });

export default defineEventHandler(async (event) => {
  const { filesId, filetype, actualFilename, userInfo } = event.context.wopi;

  console.log('read');
  console.log({ filesId, filetype });

  const dirPath = path.join(FILE_DIR, filetype);
  // 若檔案有被改名過，則取其真正的實體檔名
  const BaseFileName = (await renameMap.getItem(filesId)) || actualFilename;
  const filePath = path.join(dirPath, BaseFileName);

  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`[WOPI] File not found: ${filePath}`);
      throw createError({ statusCode: 404, statusMessage: 'File Not Found' });
    }
    throw err;
  }

  return {
    BaseFileName, // 檔案名稱（反映真實或已被改過的名字）
    Size: stats.size, // 檔案大小（bytes），Collabora 用來驗證完整性
    OwnerId: 'test-owner', // 檔案擁有者 ID（通常是開檔者或系統寫死）
    UserId: userInfo.userId, // 目前操作者 ID（必填，沒有會拒絕寫入）
    UserFriendlyName: userInfo.userName, // 顯示給其他協作者看的名稱（必填）
    UserCanWrite: (userInfo.permissions?.DisableWrite ?? false) === false, // 允許目前 user 編輯
    SupportsUpdate: true, // 關鍵！告訴 Collabora: 此 WOPI Host 支援 PutFile
    SupportsLocks: true, // 告訴 Collabora: 此 WOPI Host 支援 Lock/Unlock
    SupportsRename: true, // 告訴 Collabora: 支援 RENAME_FILE
    UserCanRename: (userInfo.permissions?.DisableRename ?? false) === false, // 允許此使用者重新命名
    UserCanNotWriteRelative: userInfo.permissions?.DisableSaveAs ?? false, // 允許「另存新檔」
    DisableExport: userInfo.permissions?.DisableExport ?? false, // 隱藏原生 UI 的匯出與下載按鈕
    DisableCopy: (userInfo.permissions?.DisableCopy ?? false) === false, // 允許「複製」
    DisablePrint: userInfo.permissions?.DisablePrint ?? false, // 允許「列印」
    ClosePostMessage: true, // 允許透過 PostMessage 傳遞關閉事件
    PostMessageOrigin: '*', // 允許接收 PostMessage 的來源 (建議生產環境設為確切網域)
    Version: stats.mtimeMs.toString() // 版本號，存檔後應更新，Collabora 用來偵測衝突
  };
});
