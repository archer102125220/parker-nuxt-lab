import swaggerJSDoc from 'swagger-jsdoc';

// https://github.com/nuxt/nuxt/discussions/16165
/**
 * Swagger API 文檔生成 API
 * 
 * 動態生成專案的 Swagger/OpenAPI 3.0 文檔
 * 掃描所有 API 檔案並根據 JSDoc 註解生成完整的 API 文檔
 * 
 * @api {GET} /api/nuxt-server/swagger-docs 取得 Swagger API 文檔
 * @apiGroup Documentation
 * @apiName GetSwaggerDocs
 * 
 * @apiSuccess {Object} data Swagger/OpenAPI 3.0 文檔物件
 * @apiSuccess {String} data.openapi OpenAPI 版本號
 * @apiSuccess {Object} data.info API 基本資訊
 * @apiSuccess {String} data.info.title API 標題
 * @apiSuccess {String} data.info.version API 版本
 * @apiSuccess {Array} data.servers 伺服器資訊
 * @apiSuccess {Array} data.schemes 支援的協議
 * @apiSuccess {Object} data.components 組件定義
 * @apiSuccess {Object} data.paths API 路徑定義
 * @apiSuccess {Object} data.security 安全性定義
 * 
 * @example
 * // 請求範例
 * GET /api/nuxt-server/swagger-docs
 * 
 * @example
 * // 成功回應範例
 * {
 *   'openapi': '3.0.0',
 *   'info': {
 *     'title': 'TITLE',
 *     'version': '1.0.0'
 *   },
 *   'servers': [{ 'url': '/api' }],
 *   'schemes': ['http', 'https'],
 *   'paths': {
 *     '/facebook-oauth-verify': {
 *       'post': { ... }
 *     }
 *   }
 * }
 * 
 * @description
 * 此 API 會掃描 server/api/**\/*.js 路徑下的所有檔案
 * 並根據 JSDoc 註解生成完整的 OpenAPI 3.0 規格文檔
 * 
 * 支援的環境變數：
 * - SWAGGER_SCHEMA_HTTPS: 設定為 'true' 時僅支援 HTTPS
 * 
 * 安全性配置：
 * - BearerAuth: 支援 Bearer Token 認證
 * - OAuth2: 支援 OAuth2 認證
 * 
 * @see {@link https://swagger.io/specification/ OpenAPI 3.0 規格}
 * @see {@link https://github.com/Surnet/swagger-jsdoc swagger-jsdoc 文檔}
 */
export default defineEventHandler(() => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'TITLE',
      version: '1.0.0',
    },
    // servers: [{ url: '/api' }, { url: '/api/facebook-oauth-verify' }],
    servers: [{ url: '/api' }],
    schemes:
      process.env.SWAGGER_SCHEMA_HTTPS === 'true'
        ? ['https']
        : ['http', 'https'],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    security: {
      ApiKeyAuth: [],
      OAuth2: {},
    },
  };

  const options = {
    swaggerDefinition,
    apis: ['server/api/**/*.js', 'server/api/**/*.*.js'],
  };

  return swaggerJSDoc(options);
});