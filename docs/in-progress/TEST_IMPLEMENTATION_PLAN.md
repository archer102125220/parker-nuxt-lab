# 測試覆蓋率提升實作計畫

> [!NOTE]
> **📋 計劃狀態：✅ 部分完成**
> 
> 此文件為測試覆蓋率提升的實作計劃。
> 
> - **建立時間：** 2025-11-25
> - **最後更新：** 2025-12-27
> - **當前狀態：** 核心測試已完成，擴展測試待實作
> - **已完成項目：** 工具函數、核心組件、整合測試、行為測試範本
> - **待完成項目：** 更多組件測試、Composables 測試
> 
> **重要參考文件：**
> - [測試哲學指南](../agent-rules/frontend-testing-guide.md) - 什麼值得測試？
> - [TESTING.md](./TESTING.md) - 當前測試狀態

---

## 📊 當前測試狀態

**已測試項目：**
- ✅ 工具函數：7/9 (77.8%)
  - amount-format.js ✅
  - number-unit.js ✅
  - safeToJSON.js ✅
  - check-phone.js ✅
  - classify-swipe-direction.js ✅ (行為測試範本)
  - distance-between-points.js ✅ (行為測試範本)
  - get-cookie.js ✅ (行為測試範本)
  - request/index.js ❌
  - firebase.js ❌
- ✅ Vue 組件：9/34 (26.5%)
  - SwitchButton.vue ✅
  - Selector.vue ✅
  - PhoneInput.vue ✅
  - Dialog.vue ✅
  - Drawer.vue ✅
  - Message.vue ✅
  - ImageUpload.vue ✅
  - LoadingBar.vue ✅ (行為測試範本)
  - SkeletonLoader.vue ✅ (行為測試範本)
- ✅ Composables：1/17 (5.9%)
  - useRequest ✅

**測試統計：**
- 總測試數：310+ tests
- 通過率：97%+
- 新增行為測試：41 tests

---

## 🔍 未測試項目分析

### 1. Vue 組件 (27 個未測試)

#### 高優先級（常用/核心組件）
1. **LoadingBar.vue** - 載入進度條
2. **DatePicker.vue** - 日期選擇器
3. **Countdown.vue** - 倒數計時器
4. **GoTop.vue** - 返回頂部按鈕
5. **SkeletonLoader.vue** - 骨架屏載入
6. **QRcode.vue** - QR Code 生成器

#### 中優先級（功能性組件）
7. **ScrollFetch.vue** - 滾動載入
8. **SlideInPanel.vue** - 滑入面板
9. **SwiperCustom.vue** - 自訂輪播
10. **SwiperJs.vue** - Swiper 輪播
11. **Youtube.vue** - YouTube 嵌入
12. **NotificationPermission.vue** - 通知權限
13. **PWALoading.vue** - PWA 載入
14. **Triangle.vue** - 三角形組件

#### 低優先級（容器/佈局組件）
15. **DialogModal/index.vue** - 對話框模態
16. **Layout/Header.vue** - 頁首
17. **Layout/Footer.vue** - 頁尾
18. **Tabs/Bar.vue** - 標籤欄
19. **Tabs/Content.vue** - 標籤內容
20. **Link/Card.vue** - 連結卡片
21. **Hexagon/Container.vue** - 六角形容器
22. **Animation/EnterLabel.vue** - 進入動畫標籤
23. **WangEditor/index.vue** - 富文本編輯器

---

### 2. Composables (16 個未測試)

#### 高優先級（核心功能）
1. **useAsyncDataError.js** - 異步數據錯誤處理
2. **useUserCookie.js** - 用戶 Cookie 管理
3. **useMataData.js** - 元數據管理

#### 中優先級（第三方整合）
4. **useGoogle.js** - Google 整合
5. **useFacebook.js** - Facebook 整合
6. **useNuxtFirebase.js** - Firebase 整合
7. **useNuxtGtm.js** - GTM 整合
8. **useDayjs.js** - Day.js 日期處理

#### 低優先級（特殊功能）
9. **useWebRTC.js** - WebRTC 功能
10. **useWebSocket.js** - WebSocket 連接
11. **useSocketIoClient.js** - Socket.IO 客戶端
12. **useEventSource.js** - Server-Sent Events
13. **useCameraStream.js** - 攝像頭串流
14. **useFaceapi.js** - 人臉識別 API
15. **useWangEditor.js** - 富文本編輯器
16. **useBeforeunload.js** - 頁面卸載處理

---

### 3. 其他工具 (2 個未測試)

1. **shared/request/index.js** - 請求工具
2. **shared/third-party/firebase.js** - Firebase 配置

---

## 🎯 優先級建議

### 第一優先級（建議立即添加）
這些是核心功能，測試價值高：

1. **LoadingBar.vue** - 用戶體驗的核心組件
2. **useAsyncDataError.js** - 錯誤處理邏輯
3. **useUserCookie.js** - 用戶狀態管理
4. **shared/request/index.js** - 請求工具函數
5. **DatePicker.vue** - 常用輸入組件

**預估工作量：** 5-8 小時
**測試數量：** 約 60-80 tests
**預期覆蓋率提升：** +8-12%

### 第二優先級（可選但推薦）
這些組件常用且邏輯較複雜：

1. **Countdown.vue** - 倒數計時邏輯
2. **ScrollFetch.vue** - 無限滾動邏輯
3. **QRcode.vue** - QR Code 生成
4. **SwiperCustom.vue** / **SwiperJs.vue** - 輪播功能
5. **useDayjs.js** - 日期處理

**預估工作量：** 4-6 小時
**測試數量：** 約 40-60 tests
**預期覆蓋率提升：** +5-8%

### 第三優先級（視需求而定）
這些是特殊功能或第三方整合：

1. **useWebRTC.js** - 如果有使用 WebRTC
2. **useWebSocket.js** - 如果有使用 WebSocket
3. **useGoogle.js** / **useFacebook.js** - 第三方整合
4. **WangEditor** - 富文本編輯器

**預估工作量：** 視需求而定
**測試數量：** 約 30-50 tests
**預期覆蓋率提升：** +3-5%

---

## 📈 測試覆蓋率提升計劃

### 當前狀態
- 組件測試：7/34 (20.6%)
- Composables 測試：1/17 (5.9%)
- 工具函數測試：4/6 (66.7%)
- **總體覆蓋率：67.73%**

### 目標設定

#### 階段一：核心功能（+60-80 tests）
完成第一優先級測試後：
- 組件測試：12/34 (35.3%)
- Composables 測試：4/17 (23.5%)
- 工具函數測試：5/6 (83.3%)
- **預期覆蓋率：75-80%** ⭐

#### 階段二：常用組件（+40-60 tests）
完成第二優先級測試後：
- 組件測試：17/34 (50%)
- Composables 測試：5/17 (29.4%)
- 工具函數測試：6/6 (100%)
- **預期覆蓋率：80-85%** ⭐⭐

#### 階段三：完整覆蓋（+30-50 tests）
完成第三優先級測試後：
- 組件測試：22+/34 (64.7%+)
- Composables 測試：9+/17 (52.9%+)
- 工具函數測試：6/6 (100%)
- **預期覆蓋率：85-90%** ⭐⭐⭐

---

## 💡 測試策略建議

### 1. 組件測試重點
- ✅ 基本渲染
- ✅ Props 驗證
- ✅ 事件處理
- ✅ 用戶互動
- ✅ 邊界情況
- ✅ 錯誤處理

### 2. Composables 測試重點
- ✅ 返回值格式
- ✅ 狀態管理
- ✅ 副作用處理
- ✅ 錯誤處理
- ✅ Mock 第三方依賴
- ✅ 生命週期鉤子

### 3. 整合測試重點
- ✅ 組件間互動
- ✅ 資料流
- ✅ API 整合
- ✅ 狀態同步
- ✅ 錯誤傳播

---

## 🚫 不建議測試的項目

1. **純展示組件** - 沒有邏輯的靜態組件
2. **第三方庫包裝** - 已有完整測試的第三方庫
3. **一次性 Demo 組件** - DialogModal/DemoContent.vue
4. **複雜動畫組件** - 難以測試且價值較低
5. **已棄用組件** - 不再使用的舊組件

---

## 📝 實作步驟

### 步驟 1：準備工作
1. 確認測試環境正常運行
2. 準備測試數據和 Mock
3. 建立測試輔助函數

### 步驟 2：第一優先級實作
1. LoadingBar.vue 測試（預估 2 小時）
2. useAsyncDataError.js 測試（預估 1.5 小時）
3. useUserCookie.js 測試（預估 1.5 小時）
4. shared/request/index.js 測試（預估 2 小時）
5. DatePicker.vue 測試（預估 2 小時）

### 步驟 3：驗證與調整
1. 執行所有測試確保通過
2. 檢查覆蓋率報告
3. 調整測試策略

### 步驟 4：第二優先級實作
根據實際需求和時間安排

### 步驟 5：持續改進
定期檢視測試覆蓋率並調整優先級

---

## 📊 預期成果

**完成第一優先級後：**
- ✅ 新增 60-80 tests
- ✅ 覆蓋率達到 75-80%
- ✅ 核心功能完整測試

**完成第二優先級後：**
- ✅ 新增 100-140 tests
- ✅ 覆蓋率達到 80-85%
- ✅ 常用組件完整測試

**完成第三優先級後：**
- ✅ 新增 130-190 tests
- ✅ 覆蓋率達到 85-90%
- ✅ 特殊功能完整測試

---

## 🎯 總結

**當前測試狀態：**
- ✅ 270+ tests (255 passing, 94.4%)
- ✅ 67.73% 覆蓋率
- ✅ 核心功能已測試

**潛在測試項目：**
- 📦 27 個未測試組件
- 🔧 16 個未測試 composables
- 🛠️ 2 個未測試工具函數

**建議行動：**
1. 優先測試核心功能（LoadingBar, useAsyncDataError, useUserCookie）
2. 逐步增加常用組件測試
3. 根據實際使用情況決定是否測試特殊功能
4. 定期檢視並更新測試優先級

**長期目標：**
- 🎯 達到 85%+ 測試覆蓋率
- 🎯 所有核心功能 100% 測試
- 🎯 建立完整的測試文檔
- 🎯 整合到 CI/CD 流程
