# Collabora 整合後續開發 TODO

本文件用於追蹤 Collabora 編輯器整合的後續待辦事項與進階功能。

## 1. 實作前端 PostMessage API 整合 (優先)

Collabora 編輯器在 Iframe 內運作時，會透過原生的 `postMessage` 與外層的 Nuxt 應用程式進行通訊。
目前我們的 `<CollaboraIframe>` 只有將 token 與檔案路徑丟給 Iframe 啟動，尚未監聽回傳事件。

**待完成：**
- [x] 在 `CollaboraIframe.vue` 實作 `window.addEventListener('message', ...)` 監聽器。
- [x] 攔截並解析來自 Collabora 的訊息（例如解析 `JSON.parse(e.data)`）。
- [x] 實作 `UI_Close` 事件：當使用者在 Collabora 點擊「關閉」或「離開」時，能正確觸發前端返回上一頁或關閉編輯器的流程。
- [x] 實作 `UI_Save` 事件 (非必須但建議)：監聽使用者手動點擊存檔時的事件，可搭配 UI 給予「已儲存」的提示。
- [x] 在組件 unmount (`onBeforeUnmount`) 時，正確移除 message event listener 避免 memory leak。

## 2. 後續進階功能：WOPI 進階操作 (擴充功能)

目前我們實作的 WOPI 後端 API 只有最基礎的 `CheckFileInfo` (index.get), `GetFile` (contents.get), `PutFile` (contents.post) 以及 Lock 相關 (index.post)。
若未來有進階需求，可擴充實作以下功能：

**待完成：**
- [ ] 支援 `PutRelativeFile`：讓使用者可以在 Collabora 介面中「另存新檔」。
- [ ] 支援 `RenameFile`：允許直接從 Collabora 的標題列重新命名檔案。
- [ ] 支援多人協作廣播：目前我們使用簡單的 Map 來做 Lock，如果是真實環境，可能需要搭配 Redis 或資料庫來確保 Lock 狀態，甚至是紀錄正在協作的 user。

---

**備註：** 
目前的後端重構（使用 `server/middleware/wopi.js` 集中驗證 Token 與攔截）以及前端共用組件 (`AuthForm`, `CollaboraGuide`) 皆已完成並穩定運作中。接下來的工作將聚焦在 **前端與 Iframe 的事件通訊**。
