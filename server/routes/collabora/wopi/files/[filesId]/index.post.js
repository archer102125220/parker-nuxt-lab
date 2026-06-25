// WOPI Lock / Unlock / RefreshLock / GetLock handler
// Collabora 在存檔前一定會先嘗試 Lock，收到非 200 就會拒絕儲存
// Reference: https://learn.microsoft.com/en-us/microsoft-365/cloud-storage-partner-program/rest/files/lock

// 簡易的 in-memory lock store（lab 用，正式環境應改用 Redis / DB）
const lockStore = new Map();

export default defineEventHandler(async (event) => {
  const { filesId } = event.context.wopi;
  const operation = getHeader(event, 'X-WOPI-Override');

  console.log(`[WOPI Lock] operation=${operation}, filesId=${filesId}`);

  if (operation === 'LOCK') {
    console.log('LOCK');

    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = lockStore.get(filesId);

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
    lockStore.set(filesId, lockToken);
    setHeader(event, 'X-WOPI-Lock', lockToken);
    setResponseStatus(event, 200);
    return '';
  }

  if (operation === 'UNLOCK') {
    console.log('UNLOCK');

    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = lockStore.get(filesId);

    if (currentLock !== lockToken) {
      console.log('X-WOPI-Lock', currentLock ?? '', 409);
      setHeader(event, 'X-WOPI-Lock', currentLock ?? '');
      setResponseStatus(event, 409);
      return 'Lock mismatch';
    }

    console.log('X-WOPI-Lock', 200);
    lockStore.delete(filesId);
    setResponseStatus(event, 200);
    return '';
  }

  if (operation === 'REFRESH_LOCK') {
    console.log('REFRESH_LOCK');

    const lockToken = getHeader(event, 'X-WOPI-Lock');
    const currentLock = lockStore.get(filesId);

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

  if (operation === 'GET_LOCK') {
    console.log('GET_LOCK');

    const currentLock = lockStore.get(filesId);
    setHeader(event, 'X-WOPI-Lock', currentLock ?? '');
    setResponseStatus(event, 200);
    return '';
  }

  console.error('unknown operation', operation);
  // 未知 operation
  setResponseStatus(event, 501);
  return `Unsupported WOPI operation: ${operation}`;
});
