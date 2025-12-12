/**
 * IndexedDB ORM Utility
 * A lightweight, promise-based ORM-like utility for IndexedDB operations
 * Supports both Sequelize-style and chainable API
 *
 * @example
 * // Initialize database
 * const db = new IndexedDBORM('myDatabase', { version: 1 });
 *
 * // Define models
 * const User = db.define('users', {
 *   id: { type: 'number', primaryKey: true, autoIncrement: true },
 *   name: { type: 'string', allowNull: false },
 *   email: { type: 'string', unique: true }
 * });
 *
 * // Use Sequelize-style API
 * await User.create({ name: 'John', email: 'john@example.com' });
 * const user = await User.findByPk(1);
 *
 * // Or use chainable API
 * await User.add({ name: 'Jane', email: 'jane@example.com' });
 * const users = await User.where('name').equals('John').toArray();
 */

class IndexedDBORM {
  constructor(dbName, options = {}) {
    this.dbName = dbName;
    this.version = options.version || 1;
    this.db = null;
    this.models = new Map();
    this.schema = new Map();
    this.isInitialized = false;
  }

  /**
   * Define a model (Sequelize-style)
   * @param {string} storeName - Name of the object store
   * @param {Object} attributes - Model attributes definition
   * @param {Object} options - Additional options (indexes, etc.)
   * @returns {Model} Model instance
   */
  define(storeName, attributes, options = {}) {
    // Store schema for database initialization
    this.schema.set(storeName, {
      attributes,
      options
    });

    // Create and return model instance
    const model = new Model(this, storeName, attributes, options);
    this.models.set(storeName, model);

    return model;
  }

  /**
   * Initialize database connection
   * @private
   */
  async _initDatabase() {
    if (this.isInitialized) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(new IndexedDBError('Failed to open database', request.error));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isInitialized = true;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const transaction = event.target.transaction;

        // Create object stores based on defined schemas
        for (const [storeName, schema] of this.schema.entries()) {
          if (!db.objectStoreNames.contains(storeName)) {
            const { attributes, options } = schema;

            // Find primary key configuration
            const primaryKey = Object.entries(attributes).find(
              ([, config]) => config.primaryKey
            );

            const storeOptions = {};
            if (primaryKey) {
              storeOptions.keyPath = primaryKey[0];
              if (primaryKey[1].autoIncrement) {
                storeOptions.autoIncrement = true;
              }
            }

            const objectStore = db.createObjectStore(storeName, storeOptions);

            // Create indexes
            if (options.indexes && Array.isArray(options.indexes)) {
              for (const index of options.indexes) {
                const indexName = Array.isArray(index.fields)
                  ? index.fields.join('_')
                  : index.fields;
                const keyPath = Array.isArray(index.fields)
                  ? index.fields
                  : [index.fields];

                objectStore.createIndex(indexName, keyPath, {
                  unique: index.unique || false,
                  multiEntry: index.multiEntry || false
                });
              }
            }

            // Create indexes for unique fields
            for (const [fieldName, config] of Object.entries(attributes)) {
              if (config.unique && !config.primaryKey) {
                objectStore.createIndex(fieldName, fieldName, {
                  unique: true
                });
              }
            }
          }
        }
      };

      request.onblocked = () => {
        reject(
          new IndexedDBError(
            'Database upgrade blocked. Please close other tabs using this database.'
          )
        );
      };
    });
  }

  /**
   * Execute a transaction (Sequelize-style)
   * @param {Function} callback - Transaction callback
   * @returns {Promise} Transaction result
   */
  async transaction(callback) {
    await this._initDatabase();

    const storeNames = Array.from(this.models.keys());
    const tx = this.db.transaction(storeNames, 'readwrite');
    const transactionProxy = new TransactionProxy(tx, this);

    try {
      const result = await callback(transactionProxy);
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(result);
        tx.onerror = () =>
          reject(new IndexedDBError('Transaction failed', tx.error));
        tx.onabort = () => reject(new IndexedDBError('Transaction aborted'));
      });
    } catch (error) {
      tx.abort();
      throw error;
    }
  }

  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.isInitialized = false;
    }
  }

  /**
   * Delete database
   * @returns {Promise}
   */
  static async deleteDatabase(dbName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName);
      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new IndexedDBError('Failed to delete database', request.error));
      request.onblocked = () =>
        reject(
          new IndexedDBError(
            'Database deletion blocked. Please close other tabs using this database.'
          )
        );
    });
  }
}

/**
 * Model class representing a database table/store
 */
class Model {
  constructor(orm, storeName, attributes, options) {
    this.orm = orm;
    this.storeName = storeName;
    this.attributes = attributes;
    this.options = options;
    this.associations = {
      hasMany: [],
      belongsTo: []
    };
  }

  /**
   * Define hasMany association
   * @param {Model} targetModel - Target model
   * @param {Object} options - Association options
   */
  hasMany(targetModel, options = {}) {
    this.associations.hasMany.push({
      model: targetModel,
      foreignKey: options.foreignKey,
      as: options.as
    });

    // Add getter method
    const methodName = `get${options.as.charAt(0).toUpperCase() + options.as.slice(1)}`;
    this[methodName] = async function (instance) {
      const where = {};
      where[options.foreignKey] = instance[this._getPrimaryKey()];
      return targetModel.findAll({
        where
      });
    }.bind(this);
  }

  /**
   * Define belongsTo association
   * @param {Model} targetModel - Target model
   * @param {Object} options - Association options
   */
  belongsTo(targetModel, options = {}) {
    this.associations.belongsTo.push({
      model: targetModel,
      foreignKey: options.foreignKey,
      as: options.as
    });

    // Add getter method
    const methodName = `get${options.as.charAt(0).toUpperCase() + options.as.slice(1)}`;
    this[methodName] = async function (instance) {
      const foreignKeyValue = instance[options.foreignKey];
      return targetModel.findByPk(foreignKeyValue);
    }.bind(this);
  }

  /**
   * Get primary key field name
   * @private
   */
  _getPrimaryKey() {
    const primaryKey = Object.entries(this.attributes).find(
      ([, config]) => config.primaryKey
    );
    return primaryKey ? primaryKey[0] : 'id';
  }

  /**
   * Apply default values to data
   * @private
   */
  _applyDefaults(data) {
    const result = {
      ...data
    };

    for (const [fieldName, config] of Object.entries(this.attributes)) {
      if (
        result[fieldName] === undefined &&
        config.defaultValue !== undefined
      ) {
        result[fieldName] =
          typeof config.defaultValue === 'function'
            ? config.defaultValue()
            : config.defaultValue;
      }
    }

    return result;
  }

  /**
   * Validate data against schema
   * @private
   */
  _validate(data) {
    for (const [fieldName, config] of Object.entries(this.attributes)) {
      const value = data[fieldName];

      // Check allowNull
      if (
        config.allowNull === false &&
        (value === null || value === undefined)
      ) {
        throw new ValidationError(`Field '${fieldName}' cannot be null`);
      }

      // Type validation (basic)
      if (value !== undefined && value !== null && config.type) {
        const expectedType = config.type.toLowerCase();
        const actualType = typeof value;

        if (expectedType === 'number' && actualType !== 'number') {
          throw new ValidationError(
            `Field '${fieldName}' must be a number, got ${actualType}`
          );
        }
        if (expectedType === 'string' && actualType !== 'string') {
          throw new ValidationError(
            `Field '${fieldName}' must be a string, got ${actualType}`
          );
        }
        if (expectedType === 'date' && !(value instanceof Date)) {
          throw new ValidationError(
            `Field '${fieldName}' must be a Date object`
          );
        }
      }
    }
  }

  /**
   * Create a new record (Sequelize-style)
   * @param {Object} data - Record data
   * @param {Object} options - Options (transaction, etc.)
   * @returns {Promise<Object>} Created record
   */
  async create(data, options = {}) {
    await this.orm._initDatabase();

    const recordData = this._applyDefaults(data);
    this._validate(recordData);

    const db = this.orm.db;
    const tx = options.transaction
      ? options.transaction.tx
      : db.transaction([this.storeName], 'readwrite');
    const store = tx.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.add(recordData);

      request.onsuccess = () => {
        const createdRecord = {
          ...recordData
        };
        if (request.result !== undefined) {
          createdRecord[this._getPrimaryKey()] = request.result;
        }
        resolve(new ModelInstance(this, createdRecord));
      };

      request.onerror = () => {
        reject(new IndexedDBError('Failed to create record', request.error));
      };
    });
  }

  /**
   * Find record by primary key (Sequelize-style)
   * @param {*} id - Primary key value
   * @param {Object} options - Options (include, etc.)
   * @returns {Promise<Object|null>} Found record or null
   */
  async findByPk(id, options = {}) {
    await this.orm._initDatabase();

    const db = this.orm.db;
    const tx = db.transaction([this.storeName], 'readonly');
    const store = tx.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = async () => {
        if (!request.result) {
          resolve(null);
          return;
        }

        const instance = new ModelInstance(this, request.result);

        // Handle includes (eager loading)
        if (options.include && Array.isArray(options.include)) {
          await this._loadAssociations(instance, options.include);
        }

        resolve(instance);
      };

      request.onerror = () => {
        reject(new IndexedDBError('Failed to find record', request.error));
      };
    });
  }

  /**
   * Find one record matching criteria (Sequelize-style)
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Found record or null
   */
  async findOne(options = {}) {
    const results = await this.findAll({
      ...options,
      limit: 1
    });
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Find all records matching criteria (Sequelize-style)
   * @param {Object} options - Query options (where, order, limit, offset)
   * @returns {Promise<Array>} Array of records
   */
  async findAll(options = {}) {
    await this.orm._initDatabase();

    const db = this.orm.db;
    const tx = db.transaction([this.storeName], 'readonly');
    const store = tx.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const results = [];
      const request = store.openCursor();

      request.onsuccess = async (event) => {
        const cursor = event.target.result;

        if (cursor) {
          const record = cursor.value;

          // Apply where filter
          if (!options.where || this._matchesWhere(record, options.where)) {
            results.push(record);
          }

          cursor.continue();
        } else {
          // Apply ordering
          if (options.order && Array.isArray(options.order)) {
            for (const [field, direction] of options.order) {
              results.sort((a, b) => {
                const aVal = a[field];
                const bVal = b[field];
                const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                return direction === 'DESC' ? -comparison : comparison;
              });
            }
          }

          // Apply offset and limit
          let finalResults = results;
          if (options.offset) {
            finalResults = finalResults.slice(options.offset);
          }
          if (options.limit) {
            finalResults = finalResults.slice(0, options.limit);
          }

          // Convert to model instances
          const instances = finalResults.map((r) => new ModelInstance(this, r));

          // Handle includes (eager loading)
          if (options.include && Array.isArray(options.include)) {
            for (const instance of instances) {
              await this._loadAssociations(instance, options.include);
            }
          }

          resolve(instances);
        }
      };

      request.onerror = () => {
        reject(new IndexedDBError('Failed to find records', request.error));
      };
    });
  }

  /**
   * Check if record matches where clause
   * @private
   */
  _matchesWhere(record, where) {
    // Handle $or operator
    if (where.$or) {
      return where.$or.some((condition) =>
        this._matchesWhere(record, condition)
      );
    }

    // Handle $and operator (default behavior)
    for (const [field, condition] of Object.entries(where)) {
      if (field.startsWith('$')) continue; // Skip operators

      const value = record[field];

      // Direct equality
      if (typeof condition !== 'object' || condition === null) {
        if (value !== condition) return false;
        continue;
      }

      // Operators
      if (condition.$eq !== undefined && value !== condition.$eq) return false;
      if (condition.$ne !== undefined && value === condition.$ne) return false;
      if (condition.$gt !== undefined && !(value > condition.$gt)) return false;
      if (condition.$gte !== undefined && !(value >= condition.$gte))
        return false;
      if (condition.$lt !== undefined && !(value < condition.$lt)) return false;
      if (condition.$lte !== undefined && !(value <= condition.$lte))
        return false;
      if (condition.$in !== undefined && !condition.$in.includes(value))
        return false;
      if (condition.$nin !== undefined && condition.$nin.includes(value))
        return false;
    }

    return true;
  }

  /**
   * Load associations for an instance
   * @private
   */
  async _loadAssociations(instance, includes) {
    for (const includeName of includes) {
      // Find hasMany association
      const hasMany = this.associations.hasMany.find(
        (a) => a.as === includeName
      );
      if (hasMany) {
        const methodName = `get${includeName.charAt(0).toUpperCase() + includeName.slice(1)}`;
        instance[includeName] = await this[methodName](instance);
        continue;
      }

      // Find belongsTo association
      const belongsTo = this.associations.belongsTo.find(
        (a) => a.as === includeName
      );
      if (belongsTo) {
        const methodName = `get${includeName.charAt(0).toUpperCase() + includeName.slice(1)}`;
        instance[includeName] = await this[methodName](instance);
      }
    }
  }

  /**
   * Update records matching criteria (Sequelize-style)
   * @param {Object} data - Data to update
   * @param {Object} options - Options (where, etc.)
   * @returns {Promise<number>} Number of updated records
   */
  async update(data, options = {}) {
    const records = await this.findAll(options);
    let count = 0;

    for (const record of records) {
      Object.assign(record, data);
      await record.save();
      count++;
    }

    return count;
  }

  /**
   * Delete records matching criteria (Sequelize-style)
   * @param {Object} options - Options (where, etc.)
   * @returns {Promise<number>} Number of deleted records
   */
  async destroy(options = {}) {
    const records = await this.findAll(options);
    let count = 0;

    for (const record of records) {
      await record.destroy();
      count++;
    }

    return count;
  }

  /**
   * Bulk create records (Sequelize-style)
   * @param {Array} dataArray - Array of records to create
   * @returns {Promise<Array>} Created records
   */
  async bulkCreate(dataArray) {
    const results = [];
    for (const data of dataArray) {
      const record = await this.create(data);
      results.push(record);
    }
    return results;
  }

  // ==================== Chainable API Methods ====================

  /**
   * Add a record (chainable API alias for create)
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async add(data) {
    return this.create(data);
  }

  /**
   * Get a record by primary key (chainable API alias for findByPk)
   * @param {*} id - Primary key value
   * @returns {Promise<Object|null>} Found record or null
   */
  async get(id) {
    return this.findByPk(id);
  }

  /**
   * Start a chainable query
   * @param {string} field - Field name to query
   * @returns {QueryBuilder} Query builder instance
   */
  where(field) {
    return new QueryBuilder(this).where(field);
  }

  /**
   * Order results by field
   * @param {string} field - Field name to order by
   * @returns {QueryBuilder} Query builder instance
   */
  orderBy(field) {
    return new QueryBuilder(this).orderBy(field);
  }

  /**
   * Get all records as array
   * @returns {Promise<Array>} All records
   */
  async toArray() {
    return this.findAll();
  }

  /**
   * Count all records
   * @returns {Promise<number>} Number of records
   */
  async count() {
    await this.orm._initDatabase();

    const db = this.orm.db;
    const tx = db.transaction([this.storeName], 'readonly');
    const store = tx.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(new IndexedDBError('Failed to count records', request.error));
    });
  }

  /**
   * Delete all records (chainable API)
   * @returns {Promise<number>} Number of deleted records
   */
  async clear() {
    await this.orm._initDatabase();

    const db = this.orm.db;
    const tx = db.transaction([this.storeName], 'readwrite');
    const store = tx.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const countRequest = store.count();

      countRequest.onsuccess = () => {
        const count = countRequest.result;
        const clearRequest = store.clear();

        clearRequest.onsuccess = () => resolve(count);
        clearRequest.onerror = () =>
          reject(
            new IndexedDBError('Failed to clear store', clearRequest.error)
          );
      };

      countRequest.onerror = () =>
        reject(
          new IndexedDBError('Failed to count records', countRequest.error)
        );
    });
  }

  /**
   * Bulk add records (chainable API alias for bulkCreate)
   * @param {Array} dataArray - Array of records to add
   * @returns {Promise<Array>} Created records
   */
  async bulkAdd(dataArray) {
    return this.bulkCreate(dataArray);
  }

  /**
   * Bulk delete records by IDs
   * @param {Array} ids - Array of primary key values
   * @returns {Promise<number>} Number of deleted records
   */
  async bulkDelete(ids) {
    await this.orm._initDatabase();

    const db = this.orm.db;
    const tx = db.transaction([this.storeName], 'readwrite');
    const store = tx.objectStore(this.storeName);

    let count = 0;

    return new Promise((resolve, reject) => {
      const deleteNext = (index) => {
        if (index >= ids.length) {
          resolve(count);
          return;
        }

        const request = store.delete(ids[index]);

        request.onsuccess = () => {
          count++;
          deleteNext(index + 1);
        };

        request.onerror = () => {
          reject(new IndexedDBError('Failed to delete record', request.error));
        };
      };

      deleteNext(0);
    });
  }
}

/**
 * Query Builder for chainable API
 */
class QueryBuilder {
  constructor(model) {
    this.model = model;
    this.whereConditions = [];
    this.orderByField = null;
    this.orderDirection = 'ASC';
    this.limitValue = null;
    this.offsetValue = null;
  }

  /**
   * Add where condition
   * @param {string} field - Field name
   * @returns {WhereClause} Where clause builder
   */
  where(field) {
    return new WhereClause(this, field);
  }

  /**
   * Add AND condition
   * @param {string} field - Field name
   * @returns {WhereClause} Where clause builder
   */
  and(field) {
    return new WhereClause(this, field);
  }

  /**
   * Set order by field
   * @param {string} field - Field name
   * @returns {QueryBuilder} This query builder
   */
  orderBy(field) {
    this.orderByField = field;
    this.orderDirection = 'ASC';
    return this;
  }

  /**
   * Reverse order direction
   * @returns {QueryBuilder} This query builder
   */
  reverse() {
    this.orderDirection = this.orderDirection === 'ASC' ? 'DESC' : 'ASC';
    return this;
  }

  /**
   * Set limit
   * @param {number} value - Limit value
   * @returns {QueryBuilder} This query builder
   */
  limit(value) {
    this.limitValue = value;
    return this;
  }

  /**
   * Set offset
   * @param {number} value - Offset value
   * @returns {QueryBuilder} This query builder
   */
  offset(value) {
    this.offsetValue = value;
    return this;
  }

  /**
   * Execute query and return array of results
   * @returns {Promise<Array>} Query results
   */
  async toArray() {
    const options = {};

    // Build where clause
    if (this.whereConditions.length > 0) {
      options.where = {};
      for (const condition of this.whereConditions) {
        if (condition.operator === 'equals') {
          options.where[condition.field] = condition.value;
        } else if (condition.operator === 'above') {
          options.where[condition.field] = {
            $gt: condition.value
          };
        } else if (condition.operator === 'aboveOrEqual') {
          options.where[condition.field] = {
            $gte: condition.value
          };
        } else if (condition.operator === 'below') {
          options.where[condition.field] = {
            $lt: condition.value
          };
        } else if (condition.operator === 'belowOrEqual') {
          options.where[condition.field] = {
            $lte: condition.value
          };
        } else if (condition.operator === 'between') {
          options.where[condition.field] = {
            $gte: condition.value[0],
            $lte: condition.value[1]
          };
        } else if (condition.operator === 'anyOf') {
          options.where[condition.field] = {
            $in: condition.value
          };
        } else if (condition.operator === 'noneOf') {
          options.where[condition.field] = {
            $nin: condition.value
          };
        } else if (condition.operator === 'notEqual') {
          options.where[condition.field] = {
            $ne: condition.value
          };
        }
      }
    }

    // Build order clause
    if (this.orderByField) {
      options.order = [[this.orderByField, this.orderDirection]];
    }

    // Set limit and offset
    if (this.limitValue !== null) {
      options.limit = this.limitValue;
    }
    if (this.offsetValue !== null) {
      options.offset = this.offsetValue;
    }

    return this.model.findAll(options);
  }

  /**
   * Execute query and return first result
   * @returns {Promise<Object|null>} First result or null
   */
  async first() {
    this.limitValue = 1;
    const results = await this.toArray();
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Execute query and return last result
   * @returns {Promise<Object|null>} Last result or null
   */
  async last() {
    const results = await this.toArray();
    return results.length > 0 ? results[results.length - 1] : null;
  }

  /**
   * Count matching records
   * @returns {Promise<number>} Number of matching records
   */
  async count() {
    const results = await this.toArray();
    return results.length;
  }

  /**
   * Delete matching records
   * @returns {Promise<number>} Number of deleted records
   */
  async delete() {
    const records = await this.toArray();
    let count = 0;

    for (const record of records) {
      await record.destroy();
      count++;
    }

    return count;
  }

  /**
   * Update matching records
   * @param {Object} data - Data to update
   * @returns {Promise<number>} Number of updated records
   */
  async modify(data) {
    const records = await this.toArray();
    let count = 0;

    for (const record of records) {
      Object.assign(record, data);
      await record.save();
      count++;
    }

    return count;
  }
}

/**
 * Where clause builder for chainable API
 */
class WhereClause {
  constructor(queryBuilder, field) {
    this.queryBuilder = queryBuilder;
    this.field = field;
  }

  /**
   * Equals condition
   * @param {*} value - Value to match
   * @returns {QueryBuilder} Query builder
   */
  equals(value) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'equals',
      value
    });
    return this.queryBuilder;
  }

  /**
   * Not equals condition
   * @param {*} value - Value to not match
   * @returns {QueryBuilder} Query builder
   */
  notEqual(value) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'notEqual',
      value
    });
    return this.queryBuilder;
  }

  /**
   * Greater than condition
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} Query builder
   */
  above(value) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'above',
      value
    });
    return this.queryBuilder;
  }

  /**
   * Greater than or equal condition
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} Query builder
   */
  aboveOrEqual(value) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'aboveOrEqual',
      value
    });
    return this.queryBuilder;
  }

  /**
   * Less than condition
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} Query builder
   */
  below(value) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'below',
      value
    });
    return this.queryBuilder;
  }

  /**
   * Less than or equal condition
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} Query builder
   */
  belowOrEqual(value) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'belowOrEqual',
      value
    });
    return this.queryBuilder;
  }

  /**
   * Between condition (inclusive)
   * @param {*} lower - Lower bound
   * @param {*} upper - Upper bound
   * @returns {QueryBuilder} Query builder
   */
  between(lower, upper) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'between',
      value: [lower, upper]
    });
    return this.queryBuilder;
  }

  /**
   * In array condition
   * @param {Array} values - Array of values
   * @returns {QueryBuilder} Query builder
   */
  anyOf(values) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'anyOf',
      value: values
    });
    return this.queryBuilder;
  }

  /**
   * Not in array condition
   * @param {Array} values - Array of values
   * @returns {QueryBuilder} Query builder
   */
  noneOf(values) {
    this.queryBuilder.whereConditions.push({
      field: this.field,
      operator: 'noneOf',
      value: values
    });
    return this.queryBuilder;
  }
}

/**
 * Model instance class
 */
class ModelInstance {
  constructor(model, data) {
    this._model = model;
    Object.assign(this, data);
  }

  /**
   * Save instance changes
   * @returns {Promise<ModelInstance>}
   */
  async save() {
    await this._model.orm._initDatabase();

    const db = this._model.orm.db;
    const tx = db.transaction([this._model.storeName], 'readwrite');
    const store = tx.objectStore(this._model.storeName);

    const data = {
      ...this
    };
    delete data._model;

    return new Promise((resolve, reject) => {
      const request = store.put(data);

      request.onsuccess = () => resolve(this);
      request.onerror = () =>
        reject(new IndexedDBError('Failed to save record', request.error));
    });
  }

  /**
   * Reload instance from database
   * @returns {Promise<ModelInstance>}
   */
  async reload() {
    const primaryKey = this._model._getPrimaryKey();
    const id = this[primaryKey];
    const fresh = await this._model.findByPk(id);

    if (fresh) {
      Object.assign(this, fresh);
    }

    return this;
  }

  /**
   * Delete instance
   * @returns {Promise<void>}
   */
  async destroy() {
    await this._model.orm._initDatabase();

    const db = this._model.orm.db;
    const tx = db.transaction([this._model.storeName], 'readwrite');
    const store = tx.objectStore(this._model.storeName);

    const primaryKey = this._model._getPrimaryKey();
    const id = this[primaryKey];

    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new IndexedDBError('Failed to delete record', request.error));
    });
  }
}

/**
 * Transaction proxy for Sequelize-style transactions
 */
class TransactionProxy {
  constructor(tx, orm) {
    this.tx = tx;
    this.orm = orm;

    // Create proxies for each model
    for (const [storeName, model] of orm.models.entries()) {
      this[storeName] = new ModelTransactionProxy(model, this);
    }
  }
}

/**
 * Model transaction proxy
 */
class ModelTransactionProxy {
  constructor(model, transactionProxy) {
    this.model = model;
    this.transactionProxy = transactionProxy;
  }

  async create(data) {
    return this.model.create(data, {
      transaction: this.transactionProxy
    });
  }

  // Add other methods as needed
}

/**
 * Custom error classes
 */
class IndexedDBError extends Error {
  constructor(message, originalError = null) {
    super(message);
    this.name = 'IndexedDBError';
    this.originalError = originalError;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Export for use in Nuxt
export default IndexedDBORM;
export { IndexedDBError, ValidationError };
