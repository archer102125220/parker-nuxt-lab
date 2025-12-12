# IndexedDB ORM Utility

A lightweight, promise-based ORM-like utility for IndexedDB operations, supporting both Sequelize-style and chainable API.

**English** | [繁體中文](./README.zh-TW.md)

## Features

✨ **Hybrid API** - Supports both Sequelize-style and chainable API  
🎯 **TypeScript Support** - Full type definitions with generics  
🔄 **Associations** - hasMany and belongsTo relationships  
⚡ **Transaction Management** - Automatic and manual transaction handling  
✅ **Data Validation** - Schema validation and type checking  
📦 **Bulk Operations** - Efficient bulk add and delete

## Installation

This utility is included in the project at `app/utils/database/indexeddb-orm.js`.

## Quick Start

### 1. Initialize Database

```javascript
import IndexedDBORM from '~/utils/database/indexeddb-orm';

// Create database instance
const db = new IndexedDBORM('myDatabase', { version: 1 });
```

### 2. Define Models

```javascript
// Define User model
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

// Define Post model
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

### 3. Define Associations

```javascript
// One-to-many relationship
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
```

## API Examples

### Sequelize-style API

#### Create Records

```javascript
// Create single record
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});

// Bulk create
const users = await User.bulkCreate([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);
```

#### Query Records

```javascript
// Find by primary key
const user = await User.findByPk(1);

// Find one
const user = await User.findOne({
  where: { email: 'john@example.com' }
});

// Find all
const users = await User.findAll({
  where: {
    age: { $gte: 18, $lte: 65 },
    status: 'active'
  },
  order: [['age', 'DESC']],
  limit: 10,
  offset: 0
});

// Complex queries (OR logic)
const users = await User.findAll({
  where: {
    $or: [{ age: { $lt: 18 } }, { status: 'inactive' }]
  }
});
```

#### Update Records

```javascript
// Update matching records
const count = await User.update(
  { status: 'inactive' },
  { where: { age: { $lt: 18 } } }
);

// Update instance
const user = await User.findByPk(1);
user.age = 26;
await user.save();
```

#### Delete Records

```javascript
// Delete matching records
const count = await User.destroy({
  where: { status: 'inactive' }
});

// Delete instance
const user = await User.findByPk(1);
await user.destroy();
```

#### Association Queries

```javascript
// Eager loading
const user = await User.findByPk(1, { include: ['posts'] });
console.log(user.posts); // User's posts

// Lazy loading
const user = await User.findByPk(1);
const posts = await user.getPosts();
```

### Chainable API

#### Create Records

```javascript
// Add single record
const user = await User.add({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});

// Bulk add
const users = await User.bulkAdd([...userData]);
```

#### Query Records

```javascript
// Get by primary key
const user = await User.get(1);

// Chainable queries
const users = await User.where('age')
  .above(18)
  .and('status')
  .equals('active')
  .orderBy('age')
  .reverse()
  .limit(10)
  .offset(0)
  .toArray();

// Get first
const user = await User.where('email').equals('john@example.com').first();

// Get last
const user = await User.orderBy('createdAt').last();

// Count
const count = await User.where('status').equals('active').count();
```

#### Update Records

```javascript
// Update matching records
const count = await User.where('age').below(18).modify({ status: 'inactive' });
```

#### Delete Records

```javascript
// Delete matching records
const count = await User.where('status').equals('inactive').delete();

// Bulk delete
const count = await User.bulkDelete([1, 2, 3]);

// Clear all records
const count = await User.clear();
```

### Transactions

```javascript
// Sequelize-style transaction
await db.transaction(async (t) => {
  const user = await User.create({ name: 'Jane' }, { transaction: t });

  await Post.create(
    { userId: user.id, title: 'Hello World' },
    { transaction: t }
  );
});
```

## Query Operators

### Sequelize-style Operators

| Operator | Description           | Example                                                   |
| -------- | --------------------- | --------------------------------------------------------- |
| `$eq`    | Equals                | `{ age: { $eq: 25 } }`                                    |
| `$ne`    | Not equals            | `{ status: { $ne: 'inactive' } }`                         |
| `$gt`    | Greater than          | `{ age: { $gt: 18 } }`                                    |
| `$gte`   | Greater than or equal | `{ age: { $gte: 18 } }`                                   |
| `$lt`    | Less than             | `{ age: { $lt: 65 } }`                                    |
| `$lte`   | Less than or equal    | `{ age: { $lte: 65 } }`                                   |
| `$in`    | In array              | `{ status: { $in: ['active', 'pending'] } }`              |
| `$nin`   | Not in array          | `{ status: { $nin: ['deleted'] } }`                       |
| `$or`    | OR logic              | `{ $or: [{ age: { $lt: 18 } }, { status: 'inactive' }] }` |

### Chainable API Methods

| Method                  | Description           | Example                                         |
| ----------------------- | --------------------- | ----------------------------------------------- |
| `equals(value)`         | Equals                | `.where('age').equals(25)`                      |
| `notEqual(value)`       | Not equals            | `.where('status').notEqual('inactive')`         |
| `above(value)`          | Greater than          | `.where('age').above(18)`                       |
| `aboveOrEqual(value)`   | Greater than or equal | `.where('age').aboveOrEqual(18)`                |
| `below(value)`          | Less than             | `.where('age').below(65)`                       |
| `belowOrEqual(value)`   | Less than or equal    | `.where('age').belowOrEqual(65)`                |
| `between(lower, upper)` | Between (inclusive)   | `.where('age').between(18, 65)`                 |
| `anyOf(values)`         | In array              | `.where('status').anyOf(['active', 'pending'])` |
| `noneOf(values)`        | Not in array          | `.where('status').noneOf(['deleted'])`          |

## TypeScript Support

```typescript
import IndexedDBORM from '~/utils/database/indexeddb-orm';

// Define interface
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: string;
}

// Use generics
const User = db.define<User>('users', {
  id: { type: 'number', primaryKey: true, autoIncrement: true },
  name: { type: 'string', allowNull: false },
  email: { type: 'string', unique: true },
  age: { type: 'number', defaultValue: 0 },
  status: { type: 'string', defaultValue: 'active' }
});

// Enjoy full type safety
const user = await User.create({
  name: 'John',
  email: 'john@example.com',
  age: 25
}); // user is typed as ModelInstance<User>
```

## Best Practices

### 1. Schema Version Management

Increment version when schema changes:

```javascript
const db = new IndexedDBORM('myDatabase', { version: 2 });
```

### 2. Index Optimization

Create indexes for frequently queried fields:

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

### 3. Error Handling

```javascript
try {
  const user = await User.create({
    name: 'John',
    email: 'john@example.com'
  });
} catch (error) {
  if (error.name === 'ValidationError') {
    console.error('Validation error:', error.message);
  } else if (error.name === 'IndexedDBError') {
    console.error('Database error:', error.message);
  }
}
```

### 4. Close Connection

Close database connection when not needed:

```javascript
db.close();
```

### 5. Delete Database

```javascript
await IndexedDBORM.deleteDatabase('myDatabase');
```

## Performance Tips

1. **Use Indexes**: Create indexes for frequently queried fields
2. **Bulk Operations**: Use `bulkCreate` and `bulkDelete` for batch operations
3. **Choose Appropriate API**: Use Sequelize-style for simple queries, chainable API for complex queries
4. **Limit Results**: Use `limit` and `offset` for pagination
5. **Use Transactions**: Wrap related operations in transactions for atomicity

## Browser Support

- Chrome 24+
- Firefox 16+
- Safari 10+
- Edge 12+

## License

MIT

## Contributing

Issues and Pull Requests are welcome!
