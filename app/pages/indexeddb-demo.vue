<template>
  <div class="indexeddb_demo_page">
    <!-- Hero Section -->
    <section class="indexeddb_demo_page-hero">
      <div class="indexeddb_demo_page-hero-background">
        <div class="indexeddb_demo_page-hero-background-overlay" />
      </div>

      <div class="indexeddb_demo_page-hero-content">
        <h1 class="indexeddb_demo_page-hero-content-title">
          {{ $t('indexeddb_demo_page.hero.title') }}
        </h1>
        <p class="indexeddb_demo_page-hero-content-subtitle">
          {{ $t('indexeddb_demo_page.hero.subtitle') }}
        </p>
        <p class="indexeddb_demo_page-hero-content-description">
          {{ $t('indexeddb_demo_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="indexeddb_demo_page-section">
      <!-- Status Card -->
      <div class="indexeddb_demo_page-section-status">
        <div
          class="indexeddb_demo_page-section-status-indicator"
          :data-connected="isInitialized"
        >
          {{
            isInitialized
              ? $t('indexeddb_demo_page.status.connected')
              : $t('indexeddb_demo_page.status.disconnected')
          }}
        </div>
        <span class="indexeddb_demo_page-section-status-text">
          {{ $t('indexeddb_demo_page.status.label') }}: {{ dbName }} v{{
            dbVersion
          }}
        </span>
      </div>

      <!-- Add User Form -->
      <div class="indexeddb_demo_page-section-form">
        <h2 class="indexeddb_demo_page-section-form-title">
          {{ $t('indexeddb_demo_page.form.title') }}
        </h2>
        <div class="indexeddb_demo_page-section-form-fields">
          <v-text-field
            v-model="newUser.name"
            :label="$t('indexeddb_demo_page.form.name')"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="newUser.email"
            :label="$t('indexeddb_demo_page.form.email')"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model.number="newUser.age"
            :label="$t('indexeddb_demo_page.form.age')"
            type="number"
            variant="outlined"
            density="compact"
          />
          <v-btn color="primary" :loading="isLoading" @click="handleCreate">
            {{ $t('indexeddb_demo_page.form.add') }}
          </v-btn>
        </div>
      </div>

      <!-- Query Section -->
      <div class="indexeddb_demo_page-section-query">
        <h2 class="indexeddb_demo_page-section-query-title">
          {{ $t('indexeddb_demo_page.query.title') }}
        </h2>
        <div class="indexeddb_demo_page-section-query-fields">
          <v-text-field
            v-model.number="minAge"
            :label="$t('indexeddb_demo_page.query.min_age')"
            type="number"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model.number="maxAge"
            :label="$t('indexeddb_demo_page.query.max_age')"
            type="number"
            variant="outlined"
            density="compact"
          />
          <v-btn color="secondary" :loading="isLoading" @click="handleQuery">
            {{ $t('indexeddb_demo_page.query.search') }}
          </v-btn>
          <v-btn variant="outlined" @click="handleLoadAll">
            {{ $t('indexeddb_demo_page.query.load_all') }}
          </v-btn>
        </div>
      </div>

      <!-- Users List -->
      <div class="indexeddb_demo_page-section-list">
        <h2 class="indexeddb_demo_page-section-list-title">
          {{ $t('indexeddb_demo_page.list.title') }} ({{ users.length }})
        </h2>

        <div
          v-if="users.length === 0"
          class="indexeddb_demo_page-section-list-empty"
        >
          {{ $t('indexeddb_demo_page.list.empty') }}
        </div>

        <div v-else class="indexeddb_demo_page-section-list-items">
          <div
            v-for="user in users"
            :key="user.id"
            class="indexeddb_demo_page-section-list-items-item"
          >
            <div class="indexeddb_demo_page-section-list-items-item-info">
              <span class="indexeddb_demo_page-section-list-items-item-info-id"
                >#{{ user.id }}</span
              >
              <span
                class="indexeddb_demo_page-section-list-items-item-info-name"
                >{{ user.name }}</span
              >
              <span
                class="indexeddb_demo_page-section-list-items-item-info-email"
                >{{ user.email }}</span
              >
              <span class="indexeddb_demo_page-section-list-items-item-info-age"
                >{{ user.age }} {{ $t('indexeddb_demo_page.list.years') }}</span
              >
            </div>
            <div class="indexeddb_demo_page-section-list-items-item-actions">
              <v-btn
                icon
                size="small"
                variant="text"
                color="error"
                @click="handleDelete(user.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Bulk Operations -->
      <div class="indexeddb_demo_page-section-bulk">
        <h2 class="indexeddb_demo_page-section-bulk-title">
          {{ $t('indexeddb_demo_page.bulk.title') }}
        </h2>
        <div class="indexeddb_demo_page-section-bulk-actions">
          <v-btn
            color="primary"
            variant="outlined"
            :loading="isLoading"
            @click="handleBulkAdd"
          >
            {{ $t('indexeddb_demo_page.bulk.add_sample') }}
          </v-btn>
          <v-btn
            color="error"
            variant="outlined"
            :loading="isLoading"
            @click="handleClearAll"
          >
            {{ $t('indexeddb_demo_page.bulk.clear_all') }}
          </v-btn>
        </div>
      </div>

      <!-- Log Section -->
      <div class="indexeddb_demo_page-section-log">
        <h2 class="indexeddb_demo_page-section-log-title">
          {{ $t('indexeddb_demo_page.log.title') }}
        </h2>
        <div class="indexeddb_demo_page-section-log-content">
          <div
            v-for="(log, index) in logs"
            :key="index"
            class="indexeddb_demo_page-section-log-content-item"
            :data-type="log.type"
          >
            <span class="indexeddb_demo_page-section-log-content-item-time">{{
              log.time
            }}</span>
            <span
              class="indexeddb_demo_page-section-log-content-item-message"
              >{{ log.message }}</span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import IndexedDBORM from '@app/utils/indexeddb/indexeddb-orm';

const { t } = useI18n();

useHeadMataData({
  title: t('indexeddb_demo_page.hero.title')
});

const localePath = useLocalePath();
const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: t('indexeddb_demo_page.hero.title'),
    description: t('indexeddb_demo_page.hero.description'),
    url: `${DOMAIN}${localePath('/indexeddb-demo')}`,
    inLanguage: ['zh-TW', 'en']
  })
]);

// Database setup
const dbName = 'indexeddb_demo';
const dbVersion = 1;
const isInitialized = ref(false);
const isLoading = ref(false);

// Data state
const users = ref([]);
const newUser = ref({ name: '', email: '', age: 25 });
const minAge = ref(0);
const maxAge = ref(100);
const logs = ref([]);

// ORM instance
let db = null;
let User = null;

// Logging helper
function addLog(message, type = 'info') {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ time, message, type });
  if (logs.value.length > 20) {
    logs.value.pop();
  }
}

// Initialize database
async function initDatabase() {
  try {
    db = new IndexedDBORM(dbName, { version: dbVersion });

    User = db.define(
      'users',
      {
        id: { type: 'number', primaryKey: true, autoIncrement: true },
        name: { type: 'string', allowNull: false },
        email: { type: 'string', unique: true },
        age: { type: 'number', defaultValue: 0 }
      },
      {
        indexes: [{ fields: ['age'] }]
      }
    );

    // Explicitly initialize the database connection
    await db._initDatabase();

    isInitialized.value = true;
    addLog('Database initialized successfully', 'success');
    await handleLoadAll();
  } catch (error) {
    isInitialized.value = false;
    addLog(`Error initializing database: ${error.message}`, 'error');
    console.error('IndexedDB initialization error:', error);
  }
}

// CRUD Operations
async function handleCreate() {
  if (!newUser.value.name || !newUser.value.email) {
    addLog('Name and email are required', 'error');
    return;
  }

  isLoading.value = true;
  try {
    const created = await User.create({
      name: newUser.value.name,
      email: newUser.value.email,
      age: newUser.value.age || 0
    });
    addLog(`Created user: ${created.name} (ID: ${created.id})`, 'success');
    newUser.value = { name: '', email: '', age: 25 };
    await handleLoadAll();
  } catch (error) {
    addLog(`Error creating user: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

async function handleLoadAll() {
  isLoading.value = true;
  try {
    const result = await User.findAll();
    users.value = result;
    addLog(`Loaded ${result.length} users`, 'info');
  } catch (error) {
    addLog(`Error loading users: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

async function handleQuery() {
  isLoading.value = true;
  try {
    const result = await User.findAll({
      where: {
        age: { $gte: minAge.value, $lte: maxAge.value }
      },
      order: [['age', 'ASC']]
    });
    users.value = result;
    addLog(
      `Found ${result.length} users with age between ${minAge.value} and ${maxAge.value}`,
      'info'
    );
  } catch (error) {
    addLog(`Error querying users: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

async function handleDelete(id) {
  isLoading.value = true;
  try {
    await User.destroy({ where: { id } });
    addLog(`Deleted user with ID: ${id}`, 'success');
    await handleLoadAll();
  } catch (error) {
    addLog(`Error deleting user: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

async function handleBulkAdd() {
  isLoading.value = true;
  try {
    const sampleUsers = [
      { name: 'Alice', email: `alice_${Date.now()}@example.com`, age: 28 },
      { name: 'Bob', email: `bob_${Date.now()}@example.com`, age: 35 },
      { name: 'Charlie', email: `charlie_${Date.now()}@example.com`, age: 22 }
    ];
    await User.bulkCreate(sampleUsers);
    addLog(`Added ${sampleUsers.length} sample users`, 'success');
    await handleLoadAll();
  } catch (error) {
    addLog(`Error adding sample users: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

async function handleClearAll() {
  isLoading.value = true;
  try {
    await User.clear();
    users.value = [];
    addLog('Cleared all users', 'success');
  } catch (error) {
    addLog(`Error clearing users: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

// Initialize on mount
onMounted(() => {
  initDatabase();
});
</script>

<style lang="scss">
.indexeddb_demo_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    overflow: hidden;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
      }
    }

    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      text-align: center;

      &-title {
        margin: 0 0 12px 0;
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 28px;
        }
      }

      &-subtitle {
        margin: 0 0 8px 0;
        font-size: 20px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }

  &-section {
    padding: 24px 20px;
    max-width: 1000px;
    margin: 0 auto;

    &-status {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding: 12px 16px;
      border-radius: 8px;
      background: #f7fafc;

      &-indicator {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 600;

        &[data-connected='true'] {
          background: #c6f6d5;
          color: #22543d;
        }

        &[data-connected='false'] {
          background: #fed7d7;
          color: #742a2a;
        }
      }

      &-text {
        font-size: 14px;
        color: #4a5568;
      }
    }

    &-form,
    &-query,
    &-list,
    &-bulk,
    &-log {
      margin-bottom: 24px;
      padding: 20px;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      &-title {
        margin: 0 0 16px 0;
        font-size: 18px;
        font-weight: 600;
        color: #2d3748;
      }
    }

    &-form-fields,
    &-query-fields,
    &-bulk-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 12px;
    }

    &-list {
      &-empty {
        padding: 32px;
        text-align: center;
        color: #a0aec0;
      }

      &-items {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 8px;
          background: #f7fafc;

          &-info {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;

            &-id {
              font-size: 12px;
              font-weight: 600;
              color: #44a08d;
            }

            &-name {
              font-weight: 600;
              color: #2d3748;
            }

            &-email {
              font-size: 14px;
              color: #718096;
            }

            &-age {
              font-size: 14px;
              color: #a0aec0;
            }
          }
        }
      }
    }

    &-log {
      &-content {
        max-height: 200px;
        overflow-y: auto;
        padding: 8px;
        border-radius: 8px;
        background: #1a202c;
        font-family: monospace;

        &-item {
          display: flex;
          gap: 12px;
          padding: 4px 8px;
          font-size: 12px;

          &-time {
            color: #718096;
          }

          &-message {
            color: #e2e8f0;
          }

          &[data-type='success'] &-message {
            color: #68d391;
          }

          &[data-type='error'] &-message {
            color: #fc8181;
          }
        }
      }
    }
  }
}
</style>
