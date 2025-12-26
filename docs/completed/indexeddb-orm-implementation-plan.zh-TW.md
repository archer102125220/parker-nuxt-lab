# IndexedDB ORM 工具實作計畫

**狀態：** ✅ 已完成  
**完成度：** 100%  
**最後更新：** 2025-12-26

一個輕量級、基於 Promise 的 IndexedDB ORM 工具，專為 Nuxt 專案設計，提供類似 Dexie.js 的簡潔 API，並結合 Sequelize 風格的操作方式。

## 需要使用者審核

> [!IMPORTANT]
> **混合式 API 設計**：此工具同時支援 **Sequelize 風格和鏈式 API**，以達到最大的靈活性和團隊採用率。這讓熟悉 Sequelize 的後端開發者可以使用熟悉的語法，而前端開發者則可以使用現代化的鏈式方法。

> [!NOTE]
> **TypeScript 支援**：將為兩種 API 風格提供完整的型別定義，確保優秀的 IDE 自動完成和型別安全。

### 為什麼選擇混合式方法？

**團隊協作優勢：**

- ✅ **零學習曲線**：後端開發者可以使用熟悉的 Sequelize 模式
- ✅ **現代化且直觀**：前端開發者獲得感覺自然的鏈式 API
- ✅ **靈活性**：團隊可以選擇適合其工作流程的風格
- ✅ **漸進式遷移**：輕鬆從 Sequelize 風格過渡到鏈式 API

**更廣泛的採用：**

- 📚 **更好的文檔**：兩種風格的範例幫助不同受眾
- 🔄 **框架無關**：適用於任何 JavaScript 框架
- 🎯 **用例優化**：簡單查詢使用 Sequelize，複雜查詢使用鏈式 API
- 🚀 **性能**：鏈式 API 為 IndexedDB 特定操作提供更好的性能

## 提議的變更

### 資料庫工具層

#### [新增] [indexeddb-orm.js](file:///c:/Users/User/Desktop/code/parker-nuxt-lab/app/utils/database/indexeddb-orm.js)

核心 ORM 工具類別，提供：

- **資料庫初始化和版本控制**：自動化的 schema 管理與版本升級
- **Schema 定義**：聲明式定義物件儲存庫和索引
- **CRUD 操作**：基於 Promise 的新增、讀取、更新、刪除 API
- **查詢建構器**：用於過濾、排序和分頁的流暢 API
- **交易管理**：自動和手動交易處理
- **錯誤處理**：具有自訂錯誤類型的全面錯誤處理

**主要功能：**

**1. 模型定義（Sequelize 風格）**

```javascript
// 使用模型定義資料庫
const db = new IndexedDBORM('myDatabase', { version: 1 });

// 定義具有驗證和類型的模型
const User = db.define(
  'users',
  {
    id: { type: 'number', primaryKey: true, autoIncrement: true },
    name: { type: 'string', allowNull: false },
    email: { type: 'string', unique: true },
    age: { type: 'number', defaultValue: 0 },
    status: { type: 'string', defaultValue: 'active' }
  },
  {
    indexes: [
      { fields: ['email'], unique: true },
      { fields: ['age'] },
      { fields: ['status'] }
    ]
  }
);

const Post = db.define(
  'posts',
  {
    id: { type: 'number', primaryKey: true, autoIncrement: true },
    userId: { type: 'number', allowNull: false },
    title: { type: 'string', allowNull: false },
    content: { type: 'string' },
    createdAt: { type: 'date', defaultValue: () => new Date() }
  },
  {
    indexes: [{ fields: ['userId'] }, { fields: ['createdAt'] }]
  }
);

// 定義關聯（簡化版，不支援 JOIN）
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
```

**2. CRUD 操作（兩種風格都支援）**

```javascript
// Sequelize 風格
await User.create({ name: 'John', email: 'john@example.com', age: 25 });
await User.findByPk(1);
await User.findOne({ where: { email: 'john@example.com' } });
await User.update({ age: 26 }, { where: { id: 1 } });
await User.destroy({ where: { id: 1 } });

// 鏈式 API（替代方案）
await User.add({ name: 'John', email: 'john@example.com', age: 25 });
await User.get(1);
await User.where('email').equals('john@example.com').first();
```

**3. 查詢操作（混合方法）**

```javascript
// Sequelize 風格查詢
await User.findAll({
  where: {
    age: { $gte: 18, $lte: 65 },
    status: 'active'
  },
  order: [['age', 'DESC']],
  limit: 10,
  offset: 0
});

// 鏈式 API（對 IndexedDB 性能更好）
await User.where('age')
  .between(18, 65)
  .and('status')
  .equals('active')
  .orderBy('age')
  .reverse()
  .limit(10)
  .offset(0)
  .toArray();

// 使用 OR 邏輯的複雜查詢（Sequelize 風格）
await User.findAll({
  where: {
    $or: [{ age: { $lt: 18 } }, { status: 'inactive' }]
  }
});
```

**4. 關聯（簡化版）**

```javascript
// 預先載入（內部執行多次查詢）
const user = await User.findByPk(1, { include: ['posts'] });
console.log(user.posts); // 文章陣列

// 延遲載入
const user = await User.findByPk(1);
const posts = await user.getPosts();

// 手動關聯查詢
const posts = await Post.findAll({ where: { userId: 1 } });
```

**5. 批量操作**

```javascript
// Sequelize 風格
await User.bulkCreate([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);

// 鏈式 API
await User.bulkAdd([...users]);
await User.bulkDelete([1, 2, 3]);
```

**6. 交易**

```javascript
// Sequelize 風格
await db.transaction(async (t) => {
  const user = await User.create({ name: 'Jane' }, { transaction: t });
  await Post.create({ userId: user.id, title: 'Hello' }, { transaction: t });
});

// 直接 API
await db.transaction(['users', 'posts'], 'readwrite', async (tx) => {
  const userId = await tx.users.add({ name: 'Jane' });
  await tx.posts.add({ userId, title: 'Hello' });
});
```

**7. 實例方法**

```javascript
// Sequelize 風格的實例操作
const user = await User.findByPk(1);
user.age = 26;
await user.save();
await user.reload();
await user.destroy();

// 獲取關聯資料
const posts = await user.getPosts();
```

---

#### [新增] [indexeddb-orm.d.ts](file:///c:/Users/User/Desktop/code/parker-nuxt-lab/app/utils/database/indexeddb-orm.d.ts)

TypeScript 型別定義，包含：

- 資料庫配置選項
- Store schema 定義
- 查詢建構器方法
- 交易類型
- 錯誤類型

---

### 文檔和範例

#### [新增] [README.md](file:///c:/Users/User/Desktop/code/parker-nuxt-lab/app/utils/database/README.md)

完整文檔，包括：

- 安裝和設定說明
- 帶範例的 API 參考
- 最佳實踐和模式
- Schema 變更的遷移指南
- 性能提示
- 常見問題疑難排解

---

#### [新增] [indexeddb-demo.vue](file:///c:/Users/User/Desktop/code/parker-nuxt-lab/app/pages/database/indexeddb-demo.vue)

展示頁面，包含：

- 資料庫初始化
- 帶 UI 的 CRUD 操作
- 查詢範例（過濾、排序、分頁）
- 交易範例
- 錯誤處理示範
- 性能監控

---

### 測試

#### [新增] [indexeddb-orm.test.js](file:///c:/Users/User/Desktop/code/parker-nuxt-lab/tests/unit/utils/indexeddb-orm.test.js)

全面的單元測試，涵蓋：

- 資料庫初始化和版本控制
- Schema 建立和遷移
- CRUD 操作
- 查詢建構器功能
- 交易處理
- 錯誤場景
- 邊緣案例（並發操作、配額超出等）

## 驗證計畫

### 自動化測試

**單元測試：**

```bash
# 執行 IndexedDB ORM 單元測試
yarn test:unit tests/unit/utils/indexeddb-orm.test.js
```

測試套件將驗證：

- ✅ 使用不同 schema 的資料庫初始化
- ✅ CRUD 操作（新增、讀取、更新、刪除）
- ✅ 查詢操作（where、orderBy、limit 等）
- ✅ 批量操作（bulkAdd、bulkDelete）
- ✅ 交易處理（提交、回滾）
- ✅ 索引使用和性能
- ✅ 錯誤處理（配額超出、約束違規）
- ✅ 版本間的 Schema 遷移

### 手動驗證

**互動式展示頁面：**

1. 啟動開發伺服器：`yarn dev`
2. 導航至 `http://localhost:3000/database/indexeddb-demo`
3. 測試以下場景：
   - **新增記錄**：新增多個具有不同資料的使用者記錄
   - **查詢記錄**：按年齡過濾、按電子郵件搜尋、按名稱排序
   - **更新記錄**：修改現有記錄並驗證變更
   - **刪除記錄**：移除記錄並驗證刪除
   - **批量操作**：一次新增/刪除多個記錄
   - **交易**：驗證跨多個 store 的原子操作
   - **錯誤處理**：觸發錯誤（重複的唯一索引、無效資料）並驗證錯誤訊息

**瀏覽器開發者工具驗證：**

1. 開啟瀏覽器開發者工具（F12）
2. 前往 Application/Storage → IndexedDB
3. 驗證資料庫結構符合 schema 定義
4. 驗證索引正確建立
5. 驗證資料正確儲存和檢索
6. 使用 Performance 標籤監控性能

**跨瀏覽器測試：**

- 在 Chrome、Firefox、Safari 和 Edge 中測試
- 驗證 IndexedDB API 相容性
- 檢查任何瀏覽器特定問題
