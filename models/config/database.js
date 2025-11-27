'use strict';

import pg from 'pg';

// const nodeEnv = process.env.NODE_ENV || 'development';

//https://github.com/sequelize/cli/issues/766

const processEnvDialect = process.env.DB_CONNECTION || process.env.VITE_DB_CONNECTION;
const importMetaEnvDialect = import.meta?.env?.VITE_DB_CONNECTION;

const processEnvHost = process.env.POSTGRES_HOST || process.env.VITE_POSTGRES_HOST;
const importMetaEnvHost = import.meta?.env?.VITE_POSTGRES_HOST;

const processEnvUsername = process.env.POSTGRES_USER || process.env.VITE_POSTGRES_USER;
const importMetaEnvUsername = import.meta?.env?.VITE_POSTGRES_USER;

const processEnvPassword = process.env.POSTGRES_PASSWORD || process.env.VITE_POSTGRES_PASSWORD;
const importMetaEnvPassword = import.meta?.env?.VITE_POSTGRES_PASSWORD;

const processEnvDatabase = process.env.POSTGRES_DATABASE || process.env.VITE_POSTGRES_DATABASE;
const importMetaEnvDatabase = import.meta?.env?.VITE_POSTGRES_DATABASE;

const processEnvCharset = process.env.DB_DEFINE_CHARSET || process.env.VITE_DB_DEFINE_CHARSET;
const importMetaEnvCharset = import.meta?.env?.VITE_DB_DEFINE_CHARSET;

const processEnvCollate = process.env.DB_DEFINE_COLLATE || process.env.VITE_DB_DEFINE_COLLATE;
const importMetaEnvCollate = import.meta?.env?.VITE_DB_DEFINE_COLLATE;

const processEnvServerName = process.env.DB_SERVER_NAME || process.env.VITE_DB_SERVER_NAME;
const importMetaEnvServerName = import.meta?.env?.VITE_DB_SERVER_NAME;

const envConfig = {
  dialect: processEnvDialect || importMetaEnvDialect,
  dialectModule: pg, // I've added this.
  host: processEnvHost || importMetaEnvHost,

  username: processEnvUsername || importMetaEnvUsername,
  password: processEnvPassword || importMetaEnvPassword,
  database: processEnvDatabase || importMetaEnvDatabase,

  operatorsAliases: '0',
  define: {
    charset: processEnvCharset || importMetaEnvCharset,
    collate: processEnvCollate || importMetaEnvCollate
  },

  dialectOptions: {
    dialect: processEnvDialect || importMetaEnvDialect,
    charset: processEnvCharset || importMetaEnvCharset,
    collate: processEnvCollate || importMetaEnvCollate,
    instanceName: processEnvServerName || importMetaEnvServerName,
    enableArithAbort: false,
    encrypt: true,
    ssl: true
  }
};

// module.exports = {
//   [nodeEnv]: envConfig
// };


export const development = envConfig;
export const production = envConfig;

export const env = {
  development,
  production
};
export default env;