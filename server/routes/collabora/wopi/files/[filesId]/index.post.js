import path from 'path';
import fs from 'fs-extra';

import { lockStore, renameMap } from '@server/utils/wopiStore';

// WOPI Lock / Unlock / RefreshLock / GetLock handler
// Collabora 在存檔前一定會先嘗試 Lock，收到非 200 就會拒絕儲存
// Reference: https://learn.microsoft.com/en-us/microsoft-365/cloud-storage-partner-program/rest/files/lock

const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public');

export default defineEventHandler(async (event) => {
  const { filesId, filetype, actualFilename } = event.context.wopi;
  const operation = getHeader(event, 'X-WOPI-Override');

  console.log(`[WOPI Lock] operation=${operation}, filesId=${filesId}`);

  if (operation === 'RENAME_FILE') {
    console.log('RENAME_FILE');

    // 從 header 取得新檔名
    let requestedName = getHeader(event, 'X-WOPI-RequestedName') || '';

    try {
      // 嘗試 decode，以防傳過來的是 URL encoded 的字串
      requestedName = decodeURIComponent(requestedName);
    } catch (_e) {}

    // 取出副檔名確保一致性，或者允許使用者自己改副檔名
    let newName = requestedName;
    if (!newName.toLowerCase().endsWith(`.${filetype.toLowerCase()}`)) {
      newName = `${newName}.${filetype}`;
    }

    const dirPath = path.join(FILE_DIR, filetype);

    // 若曾經改名過，要拿真實檔名來做 oldFilePath
    const actualOldFilename =
      (await renameMap.getItem(filesId)) || actualFilename;
    const oldFilePath = path.join(dirPath, actualOldFilename);
    const newFilePath = path.join(dirPath, newName);

    // 檢查有沒有 lock 衝突
    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = await lockStore.getItem(filesId);
    if (currentLock && currentLock !== lockToken) {
      setHeader(event, 'X-WOPI-Lock', currentLock);
      setResponseStatus(event, 409);
      return 'Lock mismatch';
    }

    try {
      fs.renameSync(oldFilePath, newFilePath);

      // 將 filesId 指向新的實體檔名
      await renameMap.setItem(filesId, newName);

      // 注意：rename 後，如果是用 filesId 存取，那麼新的 ID 就是 newName
      // 把 Lock 的對應也移轉過去
      if (currentLock) {
        await lockStore.removeItem(filesId);
        await lockStore.setItem(newName, currentLock);
        // 同時也保留舊的 lock 對應，因為 filesId 沒變
        await lockStore.setItem(filesId, currentLock);
      }

      setResponseStatus(event, 200);
      return { Name: newName };
    } catch (error) {
      console.error('Rename failed', error);
      setResponseStatus(event, 500);
      return 'Internal Server Error';
    }
  }

  if (operation === 'LOCK') {
    console.log('LOCK');

    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = await lockStore.getItem(filesId);

    if (typeof currentLock === 'string' && currentLock !== '') {
      // 已有 lock
      if (currentLock === lockToken) {
        console.log('X-WOPI-LOCK', currentLock, 200);

        // 同一個 token → RefreshLock 行為，直接允許
        setHeader(event, 'X-WOPI-Lock', currentLock);
        setResponseStatus(event, 200);
        return '';
      } else {
        console.log('X-WOPI-LOCK', currentLock, 409);
        // 不同 token → 衝突，回傳 409 + 當前 lock token
        setHeader(event, 'X-WOPI-Lock', currentLock);
        setResponseStatus(event, 409);
        return 'File already locked by another session';
      }
    }

    console.log('X-WOPI-LOCK', lockToken, 200);
    // 無 lock → 建立新 lock
    await lockStore.setItem(filesId, lockToken);
    setHeader(event, 'X-WOPI-Lock', lockToken);
    setResponseStatus(event, 200);
    return '';
  }

  if (operation === 'UNLOCK') {
    console.log('UNLOCK');

    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = await lockStore.getItem(filesId);

    if (currentLock !== lockToken) {
      console.log('X-WOPI-Lock', currentLock ?? '', 409);
      setHeader(event, 'X-WOPI-Lock', currentLock ?? '');
      setResponseStatus(event, 409);
      return 'Lock mismatch';
    }

    console.log('X-WOPI-Lock', 200);
    await lockStore.removeItem(filesId);
    setResponseStatus(event, 200);
    return '';
  }

  if (operation === 'REFRESH_LOCK') {
    console.log('REFRESH_LOCK');

    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = await lockStore.getItem(filesId);

    if (currentLock !== lockToken) {
      console.log('X-WOPI-Lock', currentLock ?? '', 409);
      setHeader(event, 'X-WOPI-Lock', currentLock ?? '');
      setResponseStatus(event, 409);
      return 'Lock mismatch';
    }

    console.log('X-WOPI-Lock', 200);
    // Refresh：維持原 lock，回傳 200
    setResponseStatus(event, 200);
    return '';
  }

  if (operation === 'PUT_RELATIVE') {
    console.log('PUT_RELATIVE');

    // 取得想要的檔名
    let suggestedTarget = getHeader(event, 'X-WOPI-SuggestedTarget');
    let relativeTarget = getHeader(event, 'X-WOPI-RelativeTarget');
    let targetName = '';

    try {
      if (suggestedTarget) {
        suggestedTarget = decodeURIComponent(suggestedTarget);
      }
    } catch (_e) {}
    try {
      if (relativeTarget) {
        relativeTarget = decodeURIComponent(relativeTarget);
      }
    } catch (_e) {}

    const { actualFilename } = event.context.wopi;
    const baseNameWithoutExt = actualFilename.includes('.')
      ? actualFilename.substring(0, actualFilename.lastIndexOf('.'))
      : actualFilename;

    if (relativeTarget) {
      targetName = relativeTarget;
    } else if (
      typeof suggestedTarget === 'string' &&
      suggestedTarget.startsWith('.')
    ) {
      targetName = `${baseNameWithoutExt}${suggestedTarget}`;
    } else if (typeof suggestedTarget === 'string') {
      targetName = suggestedTarget;
    } else {
      targetName = `Copy_${actualFilename}`;
    }

    // 副檔名防護
    const newExt = targetName.includes('.')
      ? targetName.split('.').pop().toLowerCase()
      : filetype;
    const dirPath = path.join(FILE_DIR, newExt);
    const newFilePath = path.join(dirPath, targetName);

    try {
      // 確保目錄存在
      fs.ensureDirSync(dirPath);

      // 讀取傳過來的內容
      const rawBody = await readRawBody(event, false);
      if (rawBody && rawBody.length > 0) {
        fs.writeFileSync(newFilePath, rawBody);
      } else {
        // 如果沒有 body，則複製目前的檔案
        const oldFilePath = path.join(FILE_DIR, filetype, actualFilename);
        fs.copyFileSync(oldFilePath, newFilePath);
      }

      // 產生新檔案的 Url (提供給 Collabora，讓它知道新檔存在哪裡)
      const hostURL = `${getRequestProtocol(event)}://${getRequestHost(event)}`;
      // WOPI URL
      const wopiUrl = `${hostURL}/collabora/wopi/files/${targetName}`;

      setResponseStatus(event, 200);
      return {
        Name: targetName,
        Url: wopiUrl
      };
    } catch (error) {
      console.error('PutRelative failed:', error);
      setResponseStatus(event, 500);
      return 'Internal Server Error';
    }
  }

  if (operation === 'GET_LOCK') {
    console.log('GET_LOCK');

    const currentLock = await lockStore.getItem(filesId);
    setHeader(event, 'X-WOPI-Lock', currentLock ?? '');
    setResponseStatus(event, 200);
    return '';
  }

  console.error('unknown operation', operation);
  // 未知 operation
  setResponseStatus(event, 501);
  return `Unsupported WOPI operation: ${operation}`;
});
