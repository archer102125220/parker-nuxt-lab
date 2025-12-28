# IndexedDB ORM Utility

一個輕量級、基於 Promise 的 IndexedDB ORM 工具，支援 Sequelize 風格和鏈式 API。

[English](./README.md) | **繁體中文**

## 特色功能

✨ **混合式 API** - 同時支援 Sequelize 風格和鏈式 API  
🎯 **TypeScript 支援** - 完整的型別定義和泛型支援  
🔄 **關聯支援** - hasMany 和 belongsTo 關聯  
⚡ **交易管理** - 自動和手動交易處理  
✅ **資料驗證** - Schema 驗證和型別檢查  
📦 **批量操作** - 高效的批量新增和刪除

## 安裝

此工具已包含在專案中，位於 `app/utils/database/indexeddb-orm.js`。

## 快速開始

### 1. 初始化資料庫

```javascript
import IndexedDBORM from '~/utils/database/indexeddb-orm';

// 建立資料庫實例
const db = new IndexedDBORM('myDatabase', { version: 1 });
```

### 2. 定義模型

```javascript
// 定義 User 模型
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

// 定義 Post 模型
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
```

### 3. 定義關聯

```javascript
// 一對多關聯
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
```

## API 使用範例

### Sequelize 風格 API

#### 新增記錄

```javascript
// 新增單筆記錄
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});

// 批量新增
const users = await User.bulkCreate([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);
```

#### 查詢記錄

```javascript
// 依主鍵查詢
const user = await User.findByPk(1);

// 查詢單筆
const user = await User.findOne({
  where: { email: 'john@example.com' }
});

// 查詢多筆
const users = await User.findAll({
  where: {
    age: { $gte: 18, $lte: 65 },
    status: 'active'
  },
  order: [['age', 'DESC']],
  limit: 10,
  offset: 0
});

// 複雜查詢（OR 邏輯）
const users = await User.findAll({
  where: {
    $or: [{ age: { $lt: 18 } }, { status: 'inactive' }]
  }
});
```

#### 更新記錄

```javascript
// 更新符合條件的記錄
const count = await User.update(
  { status: 'inactive' },
  { where: { age: { $lt: 18 } } }
);

// 更新實例
const user = await User.findByPk(1);
user.age = 26;
await user.save();
```

#### 刪除記錄

```javascript
// 刪除符合條件的記錄
const count = await User.destroy({
  where: { status: 'inactive' }
});

// 刪除實例
const user = await User.findByPk(1);
await user.destroy();
```

#### 關聯查詢

```javascript
// 預先載入（Eager Loading）
const user = await User.findByPk(1, { include: ['posts'] });
console.log(user.posts); // 使用者的所有文章

// 延遲載入（Lazy Loading）
const user = await User.findByPk(1);
const posts = await user.getPosts();
```

### 鏈式 API

#### 新增記錄

```javascript
// 新增單筆
const user = await User.add({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});

// 批量新增
const users = await User.bulkAdd([...userData]);
```

#### 查詢記錄

```javascript
// 依主鍵查詢
const user = await User.get(1);

// 鏈式查詢
const users = await User.where('age')
  .above(18)
  .and('status')
  .equals('active')
  .orderBy('age')
  .reverse()
  .limit(10)
  .offset(0)
  .toArray();

// 查詢第一筆
const user = await User.where('email').equals('john@example.com').first();

// 查詢最後一筆
const user = await User.orderBy('createdAt').last();

// 計數
const count = await User.where('status').equals('active').count();
```

#### 更新記錄

```javascript
// 更新符合條件的記錄
const count = await User.where('age').below(18).modify({ status: 'inactive' });
```

#### 刪除記錄

```javascript
// 刪除符合條件的記錄
const count = await User.where('status').equals('inactive').delete();

// 批量刪除
const count = await User.bulkDelete([1, 2, 3]);

// 清空所有記錄
const count = await User.clear();
```

### 交易

```javascript
// Sequelize 風格交易
await db.transaction(async (t) => {
  const user = await User.create({ name: 'Jane' }, { transaction: t });

  await Post.create(
    { userId: user.id, title: 'Hello World' },
    { transaction: t }
  );
});
```

## 查詢操作符

### Sequelize 風格操作符

| 操作符 | 說明         | 範例                                                      |
| ------ | ------------ | --------------------------------------------------------- |
| `$eq`  | 等於         | `{ age: { $eq: 25 } }`                                    |
| `$ne`  | 不等於       | `{ status: { $ne: 'inactive' } }`                         |
| `$gt`  | 大於         | `{ age: { $gt: 18 } }`                                    |
| `$gte` | 大於等於     | `{ age: { $gte: 18 } }`                                   |
| `$lt`  | 小於         | `{ age: { $lt: 65 } }`                                    |
| `$lte` | 小於等於     | `{ age: { $lte: 65 } }`                                   |
| `$in`  | 包含於陣列   | `{ status: { $in: ['active', 'pending'] } }`              |
| `$nin` | 不包含於陣列 | `{ status: { $nin: ['deleted'] } }`                       |
| `$or`  | OR 邏輯      | `{ $or: [{ age: { $lt: 18 } }, { status: 'inactive' }] }` |

### 鏈式 API 方法

| 方法                    | 說明         | 範例                                            |
| ----------------------- | ------------ | ----------------------------------------------- |
| `equals(value)`         | 等於         | `.where('age').equals(25)`                      |
| `notEqual(value)`       | 不等於       | `.where('status').notEqual('inactive')`         |
| `above(value)`          | 大於         | `.where('age').above(18)`                       |
| `aboveOrEqual(value)`   | 大於等於     | `.where('age').aboveOrEqual(18)`                |
| `below(value)`          | 小於         | `.where('age').below(65)`                       |
| `belowOrEqual(value)`   | 小於等於     | `.where('age').belowOrEqual(65)`                |
| `between(lower, upper)` | 介於之間     | `.where('age').between(18, 65)`                 |
| `anyOf(values)`         | 包含於陣列   | `.where('status').anyOf(['active', 'pending'])` |
| `noneOf(values)`        | 不包含於陣列 | `.where('status').noneOf(['deleted'])`          |

## TypeScript 支援

```typescript
import IndexedDBORM from '~/utils/database/indexeddb-orm';

// 定義介面
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: string;
}

// 使用泛型
const User = db.define<User>('users', {
  id: { type: 'number', primaryKey: true, autoIncrement: true },
  name: { type: 'string', allowNull: false },
  email: { type: 'string', unique: true },
  age: { type: 'number', defaultValue: 0 },
  status: { type: 'string', defaultValue: 'active' }
});

// 享受完整的型別安全
const user = await User.create({
  name: 'John',
  email: 'john@example.com',
  age: 25
}); // user 的型別為 ModelInstance<User>
```

## 最佳實踐

### 1. Schema 版本管理

當需要變更 schema 時，增加版本號：

```javascript
const db = new IndexedDBORM('myDatabase', { version: 2 });
```

### 2. 索引優化

為常用查詢欄位建立索引：

```javascript
const User = db.define(
  'users',
  {
    // ...
  },
  {
    indexes: [
      { fields: ['email'], unique: true },
      { fields: ['status'] },
      { fields: ['createdAt'] }
    ]
  }
);
```

### 3. 錯誤處理

```javascript
try {
  const user = await User.create({
    name: 'John',
    email: 'john@example.com'
  });
} catch (error) {
  if (error.name === 'ValidationError') {
    console.error('驗證錯誤:', error.message);
  } else if (error.name === 'IndexedDBError') {
    console.error('資料庫錯誤:', error.message);
  }
}
```

### 4. 關閉連接

在不需要時關閉資料庫連接：

```javascript
db.close();
```

### 5. 刪除資料庫

```javascript
await IndexedDBORM.deleteDatabase('myDatabase');
```

## 效能提示

1. **使用索引**：為常查詢的欄位建立索引
2. **批量操作**：使用 `bulkCreate` 和 `bulkDelete` 進行批量操作
3. **選擇適當的 API**：簡單查詢用 Sequelize 風格，複雜查詢用鏈式 API
4. **限制結果數量**：使用 `limit` 和 `offset` 進行分頁
5. **使用交易**：多個相關操作應使用交易確保原子性

## 瀏覽器支援

- Chrome 24+
- Firefox 16+
- Safari 10+
- Edge 12+

## 授權

MIT

## 貢獻

歡迎提交 Issue 和 Pull Request！
