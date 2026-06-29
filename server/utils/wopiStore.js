// 利用 Nitro 內建的 storage 來儲存 lock 與 rename 紀錄
// 這樣未來可以直接替換成 Redis 或其他資料庫
export const lockStore = useStorage('wopi:locks');
export const renameMap = useStorage('wopi:renames');
