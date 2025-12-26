import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import 'fake-indexeddb/auto';
import IndexedDBORM from '../../../app/utils/database/indexeddb-orm';

describe('IndexedDBORM', () => {
  let db;
  let User;

  beforeEach(async () => {
    // Create a fresh database for each test
    const dbName = `test_db_${Date.now()}`;
    db = new IndexedDBORM(dbName, {
      version: 1
    });

    User = db.define(
      'users',
      {
        id: {
          type: 'number',
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: 'string',
          allowNull: false
        },
        email: {
          type: 'string',
          unique: true
        },
        age: {
          type: 'number',
          defaultValue: 0
        }
      },
      {
        indexes: [
          {
            fields: ['email'],
            unique: true
          },
          {
            fields: ['age']
          }
        ]
      }
    );
  });

  afterEach(async () => {
    if (db) {
      try {
        db.close();
        await IndexedDBORM.deleteDatabase(db.dbName);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });

  describe('Database Initialization', () => {
    it('should create a database with specified name', () => {
      expect(db.dbName).toContain('test_db_');
    });

    it('should set the correct version', () => {
      expect(db.version).toBe(1);
    });

    it('should define a model correctly', () => {
      expect(User).toBeDefined();
      expect(User.storeName).toBe('users');
    });
  });

  describe('CRUD Operations', () => {
    describe('Create', () => {
      it('should create a new record', async () => {
        const user = await User.create({
          name: 'John Doe',
          email: 'john@example.com',
          age: 25
        });

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john@example.com');
        expect(user.age).toBe(25);
      });

      it('should apply default values', async () => {
        const user = await User.create({
          name: 'Jane Doe',
          email: 'jane@example.com'
        });

        expect(user.age).toBe(0);
      });

      it('should reject missing required fields', async () => {
        await expect(
          User.create({
            email: 'test@example.com'
          })
        ).rejects.toThrow();
      });
    });

    describe('Read', () => {
      it('should find a record by primary key', async () => {
        const created = await User.create({
          name: 'John Doe',
          email: 'john@example.com',
          age: 25
        });

        const found = await User.findByPk(created.id);
        expect(found).toBeDefined();
        expect(found.name).toBe('John Doe');
      });

      it('should return null for non-existent primary key', async () => {
        const found = await User.findByPk(99999);
        expect(found).toBeNull();
      });

      it('should find one record by condition', async () => {
        await User.create({
          name: 'John Doe',
          email: 'john@example.com',
          age: 25
        });

        const found = await User.findOne({
          where: {
            email: 'john@example.com'
          }
        });

        expect(found).toBeDefined();
        expect(found.name).toBe('John Doe');
      });

      it('should find all records', async () => {
        await User.create({
          name: 'User 1',
          email: 'user1@example.com',
          age: 20
        });
        await User.create({
          name: 'User 2',
          email: 'user2@example.com',
          age: 30
        });
        await User.create({
          name: 'User 3',
          email: 'user3@example.com',
          age: 40
        });

        const users = await User.findAll();
        expect(users).toHaveLength(3);
      });
    });

    describe('Update', () => {
      it('should update a record by condition', async () => {
        const created = await User.create({
          name: 'John Doe',
          email: 'john@example.com',
          age: 25
        });

        const count = await User.update(
          {
            age: 26
          },
          {
            where: {
              id: created.id
            }
          }
        );

        expect(count).toBeGreaterThanOrEqual(1);

        const updated = await User.findByPk(created.id);
        expect(updated.age).toBe(26);
      });
    });

    describe('Delete', () => {
      it('should delete a record by condition', async () => {
        const created = await User.create({
          name: 'John Doe',
          email: 'john@example.com',
          age: 25
        });

        const count = await User.destroy({
          where: {
            id: created.id
          }
        });
        expect(count).toBeGreaterThanOrEqual(1);

        const found = await User.findByPk(created.id);
        expect(found).toBeNull();
      });
    });
  });

  describe('Query Builder', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Alice',
        email: 'alice@example.com',
        age: 20
      });
      await User.create({
        name: 'Bob',
        email: 'bob@example.com',
        age: 30
      });
      await User.create({
        name: 'Charlie',
        email: 'charlie@example.com',
        age: 40
      });
      await User.create({
        name: 'David',
        email: 'david@example.com',
        age: 50
      });
    });

    it('should filter by $gte operator', async () => {
      const users = await User.findAll({
        where: {
          age: {
            $gte: 30
          }
        }
      });

      expect(users.length).toBeGreaterThanOrEqual(3);
    });

    it('should filter by $lte operator', async () => {
      const users = await User.findAll({
        where: {
          age: {
            $lte: 30
          }
        }
      });

      expect(users.length).toBeGreaterThanOrEqual(2);
    });

    it('should filter by range', async () => {
      const users = await User.findAll({
        where: {
          age: {
            $gte: 25,
            $lte: 45
          }
        }
      });

      expect(users.length).toBe(2);
    });

    it('should order results ascending', async () => {
      const users = await User.findAll({
        order: [['age', 'ASC']]
      });

      expect(users[0].name).toBe('Alice');
    });

    it('should order results descending', async () => {
      const users = await User.findAll({
        order: [['age', 'DESC']]
      });

      expect(users[0].name).toBe('David');
    });

    it('should limit results', async () => {
      const users = await User.findAll({
        limit: 2
      });

      expect(users).toHaveLength(2);
    });

    it('should count records', async () => {
      const count = await User.count();
      expect(count).toBe(4);
    });
  });

  describe('Bulk Operations', () => {
    it('should bulk create records', async () => {
      const users = await User.bulkCreate([
        {
          name: 'Bulk User 1',
          email: 'bulk1@example.com',
          age: 25
        },
        {
          name: 'Bulk User 2',
          email: 'bulk2@example.com',
          age: 30
        },
        {
          name: 'Bulk User 3',
          email: 'bulk3@example.com',
          age: 35
        }
      ]);

      expect(users).toHaveLength(3);

      const all = await User.findAll();
      expect(all).toHaveLength(3);
    });

    it('should clear all records', async () => {
      await User.create({
        name: 'Test',
        email: 'test@example.com',
        age: 25
      });
      await User.create({
        name: 'Test2',
        email: 'test2@example.com',
        age: 30
      });

      await User.clear();

      const all = await User.findAll();
      expect(all).toHaveLength(0);
    });
  });

  describe('Chainable API', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Alice',
        email: 'alice@example.com',
        age: 20
      });
      await User.create({
        name: 'Bob',
        email: 'bob@example.com',
        age: 30
      });
    });

    it('should add a record with chainable API', async () => {
      const user = await User.add({
        name: 'Charlie',
        email: 'charlie@example.com',
        age: 25
      });

      expect(user).toBeDefined();
      expect(user.name).toBe('Charlie');
    });

    it('should get a record by id with chainable API', async () => {
      const users = await User.findAll();
      const firstUser = users[0];

      const found = await User.get(firstUser.id);
      expect(found).toBeDefined();
      expect(found.id).toBe(firstUser.id);
    });
  });

  describe('Error Handling', () => {
    it('should handle validation errors', async () => {
      await expect(
        User.create({
          email: 'missing-name@example.com'
          // name is missing but required
        })
      ).rejects.toThrow();
    });
  });
});
