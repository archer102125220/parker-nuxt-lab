import path from 'path';
import fs from 'fs-extra';


const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public');

console.log({ __dirname, FILE_DIR });

export default defineEventHandler((event) => {
  const { filesId, filetype, userInfo } = event.context.wopi;

  console.log('read');
  console.log({ filesId, filetype });

  const dirPath = path.join(FILE_DIR, filetype);
  // 正式時應替換為 filesId
  // const filePath = path.join(FILE_DIR, 'test.xlsx');
  const filePath = path.join(dirPath, filesId);
  const stats = fs.statSync(filePath);

  return {
    BaseFileName: filesId, // 檔案名稱，例如: test.xlsx
    Size: stats.size, // 檔案大小（bytes），Collabora 用來驗證完整性
    OwnerId: 'test-owner', // 檔案擁有者 ID（通常是開檔者或系統寫死）
    UserId: userInfo.userId, // 目前操作者 ID（必填，沒有會拒絕寫入）
    UserFriendlyName: userInfo.userName, // 顯示給其他協作者看的名稱（必填）
    UserCanWrite: true, // 允許目前 user 編輯
    SupportsUpdate: true, // 關鍵！告訴 Collabora: 此 WOPI Host 支援 PutFile
    SupportsLocks: true, // 告訴 Collabora: 此 WOPI Host 支援 Lock/Unlock
    ClosePostMessage: true, // 允許透過 PostMessage 傳遞關閉事件
    PostMessageOrigin: '*', // 允許接收 PostMessage 的來源 (建議生產環境設為確切網域)
    Version: stats.mtimeMs.toString() // 版本號，存檔後應更新，Collabora 用來偵測衝突
  };
});
