
/**
 * @openapi
 * /nuxt-server/frontend-api-cach-test:
 *    get:
 *      description: 前端 API 快取測試
 *      parameters:
 *        - in: query
 *          name: test
 *          description: 意查詢參數，用於測試快取機制
 *          schema: 
 *            type: string
 *      responses:
 *        200:
 *          description: api 環傳請求
 */
/**
 * 前端 API 快取測試 API (GET)
 * 
 * 用於測試前端 API 快取機制的 GET 端點
 * 回傳請求中的查詢參數，用於驗證快取行為
 * 
 * @api {GET} /api/nuxt-server/frontend-api-cach-test 前端 API 快取測試
 * @apiGroup Test
 * @apiName FrontendApiCacheTestGet
 * 
 * @apiQuery {*} [*] 任意查詢參數，用於測試快取機制
 * 
 * @apiSuccess {Object} query 查詢參數物件
 * 
 * @example
 * // 請求範例
 * GET /api/nuxt-server/frontend-api-cach-test?test=value&cache=true
 * 
 * @example
 * // 成功回應範例
 * {
 *   "query": {
 *     "test": "value",
 *     "cache": "true"
 *   }
 * }
 * 
 * @description
 * 此 API 專門用於測試前端 API 快取機制
 * 回傳所有查詢參數，方便驗證快取是否正確運作
 */
export default defineEventHandler((event) => {
  console.log('api:frontend-api-cach-test.get');

  const query = getQuery(event);
  return { query };
});