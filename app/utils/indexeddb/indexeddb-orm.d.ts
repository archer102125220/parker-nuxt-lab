/**
 * IndexedDB ORM TypeScript Type Definitions
 * Provides type safety for both Sequelize-style and chainable API
 */

// ==================== Core Types ====================

export interface IndexedDBORMOptions {
  version?: number;
}

export interface FieldDefinition {
  type: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
  primaryKey?: boolean;
  autoIncrement?: boolean;
  unique?: boolean;
  allowNull?: boolean;
  defaultValue?: any | (() => any);
}

export interface ModelAttributes {
  [fieldName: string]: FieldDefinition;
}

export interface IndexDefinition {
  fields: string | string[];
  unique?: boolean;
  multiEntry?: boolean;
}

export interface ModelOptions {
  indexes?: IndexDefinition[];
}

export interface AssociationOptions {
  foreignKey: string;
  as: string;
}

// ==================== Query Options ====================

export interface WhereOperators {
  $eq?: any;
  $ne?: any;
  $gt?: any;
  $gte?: any;
  $lt?: any;
  $lte?: any;
  $in?: any[];
  $nin?: any[];
}

export type WhereValue = any | WhereOperators;

export interface WhereClause {
  [field: string]: WhereValue;
  $or?: WhereClause[];
  $and?: WhereClause[];
}

export type OrderDirection = 'ASC' | 'DESC';

export interface FindOptions {
  where?: WhereClause;
  order?: [string, OrderDirection][];
  limit?: number;
  offset?: number;
  include?: string[];
}

export interface CreateOptions {
  transaction?: TransactionProxy;
}

export interface UpdateOptions {
  where?: WhereClause;
}

export interface DestroyOptions {
  where?: WhereClause;
}

// ==================== Main Classes ====================

export default class IndexedDBORM {
  dbName: string;
  version: number;
  db: IDBDatabase | null;
  models: Map<string, Model<any>>;
  schema: Map<string, { attributes: ModelAttributes; options: ModelOptions }>;
  isInitialized: boolean;

  constructor(dbName: string, options?: IndexedDBORMOptions);

  define<T = any>(
    storeName: string,
    attributes: ModelAttributes,
    options?: ModelOptions
  ): Model<T>;

  transaction(callback: (tx: TransactionProxy) => Promise<any>): Promise<any>;

  close(): void;

  static deleteDatabase(dbName: string): Promise<void>;
}

export class Model<T = any> {
  orm: IndexedDBORM;
  storeName: string;
  attributes: ModelAttributes;
  options: ModelOptions;
  associations: {
    hasMany: any[];
    belongsTo: any[];
  };

  // ==================== Sequelize-style API ====================

  create(data: Partial<T>, options?: CreateOptions): Promise<ModelInstance<T>>;

  findByPk(id: any, options?: FindOptions): Promise<ModelInstance<T> | null>;

  findOne(options?: FindOptions): Promise<ModelInstance<T> | null>;

  findAll(options?: FindOptions): Promise<ModelInstance<T>[]>;

  update(data: Partial<T>, options: UpdateOptions): Promise<number>;

  destroy(options: DestroyOptions): Promise<number>;

  bulkCreate(dataArray: Partial<T>[]): Promise<ModelInstance<T>[]>;

  // ==================== Chainable API ====================

  add(data: Partial<T>): Promise<ModelInstance<T>>;

  get(id: any): Promise<ModelInstance<T> | null>;

  where(field: keyof T): QueryBuilder<T>;

  orderBy(field: keyof T): QueryBuilder<T>;

  toArray(): Promise<ModelInstance<T>[]>;

  count(): Promise<number>;

  clear(): Promise<number>;

  bulkAdd(dataArray: Partial<T>[]): Promise<ModelInstance<T>[]>;

  bulkDelete(ids: any[]): Promise<number>;

  // ==================== Associations ====================

  hasMany<U>(targetModel: Model<U>, options: AssociationOptions): void;

  belongsTo<U>(targetModel: Model<U>, options: AssociationOptions): void;
}

export class ModelInstance<T = any> {
  _model: Model<T>;
  [key: string]: any;

  constructor(model: Model<T>, data: Partial<T>);

  save(): Promise<ModelInstance<T>>;

  reload(): Promise<ModelInstance<T>>;

  destroy(): Promise<void>;
}

export class QueryBuilder<T = any> {
  model: Model<T>;
  whereConditions: any[];
  orderByField: string | null;
  orderDirection: OrderDirection;
  limitValue: number | null;
  offsetValue: number | null;

  constructor(model: Model<T>);

  where(field: keyof T): WhereClause<T>;

  and(field: keyof T): WhereClause<T>;

  orderBy(field: keyof T): QueryBuilder<T>;

  reverse(): QueryBuilder<T>;

  limit(value: number): QueryBuilder<T>;

  offset(value: number): QueryBuilder<T>;

  toArray(): Promise<ModelInstance<T>[]>;

  first(): Promise<ModelInstance<T> | null>;

  last(): Promise<ModelInstance<T> | null>;

  count(): Promise<number>;

  delete(): Promise<number>;

  modify(data: Partial<T>): Promise<number>;
}

export class WhereClause<T = any> {
  queryBuilder: QueryBuilder<T>;
  field: keyof T;

  constructor(queryBuilder: QueryBuilder<T>, field: keyof T);

  equals(value: any): QueryBuilder<T>;

  notEqual(value: any): QueryBuilder<T>;

  above(value: any): QueryBuilder<T>;

  aboveOrEqual(value: any): QueryBuilder<T>;

  below(value: any): QueryBuilder<T>;

  belowOrEqual(value: any): QueryBuilder<T>;

  between(lower: any, upper: any): QueryBuilder<T>;

  anyOf(values: any[]): QueryBuilder<T>;

  noneOf(values: any[]): QueryBuilder<T>;
}

export class TransactionProxy {
  tx: IDBTransaction;
  orm: IndexedDBORM;
  [storeName: string]: any;

  constructor(tx: IDBTransaction, orm: IndexedDBORM);
}

export class ModelTransactionProxy<T = any> {
  model: Model<T>;
  transactionProxy: TransactionProxy;

  constructor(model: Model<T>, transactionProxy: TransactionProxy);

  create(data: Partial<T>): Promise<ModelInstance<T>>;
}

// ==================== Error Classes ====================

export class IndexedDBError extends Error {
  name: 'IndexedDBError';
  originalError: any;

  constructor(message: string, originalError?: any);
}

export class ValidationError extends Error {
  name: 'ValidationError';

  constructor(message: string);
}

// ==================== Utility Types ====================

export type ModelDefinition<T> = {
  [K in keyof T]: FieldDefinition;
};

export type CreateInput<T> = Partial<T>;

export type UpdateInput<T> = Partial<T>;

// ==================== Example Usage ====================

/**
 * Example usage with TypeScript:
 *
 * ```typescript
 * import IndexedDBORM from './indexeddb-orm';
 *
 * // Define your data types
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   age: number;
 *   status: string;
 * }
 *
 * interface Post {
 *   id: number;
 *   userId: number;
 *   title: string;
 *   content: string;
 *   createdAt: Date;
 * }
 *
 * // Initialize database
 * const db = new IndexedDBORM('myDatabase', { version: 1 });
 *
 * // Define models with type safety
 * const User = db.define<User>('users', {
 *   id: { type: 'number', primaryKey: true, autoIncrement: true },
 *   name: { type: 'string', allowNull: false },
 *   email: { type: 'string', unique: true },
 *   age: { type: 'number', defaultValue: 0 },
 *   status: { type: 'string', defaultValue: 'active' }
 * }, {
 *   indexes: [
 *     { fields: ['email'], unique: true },
 *     { fields: ['age'] }
 *   ]
 * });
 *
 * const Post = db.define<Post>('posts', {
 *   id: { type: 'number', primaryKey: true, autoIncrement: true },
 *   userId: { type: 'number', allowNull: false },
 *   title: { type: 'string', allowNull: false },
 *   content: { type: 'string' },
 *   createdAt: { type: 'date', defaultValue: () => new Date() }
 * });
 *
 * // Use Sequelize-style API with type safety
 * const user = await User.create({
 *   name: 'John',
 *   email: 'john@example.com',
 *   age: 25
 * });
 *
 * const users = await User.findAll({
 *   where: {
 *     age: { $gte: 18 }
 *   },
 *   order: [['age', 'DESC']],
 *   limit: 10
 * });
 *
 * // Or use chainable API with type safety
 * const activeUsers = await User
 *   .where('age').above(18)
 *   .and('status').equals('active')
 *   .orderBy('age')
 *   .reverse()
 *   .toArray();
 * ```
 */
