/**
 * @openapi
 * /nuxt-server/frontend-api-cach-test:
 *    post:
 *      description: 前端 API 快取測試
 *      parameters:
 *        - in: query
 *          name: test
 *          description: 任意查詢參數，用於測試快取機制
 *          schema:
 *            type: string
 *          example: "value"
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              additionalProperties: true
 *              description: 任意請求體資料，用於測試快取機制
 *            example:
 *              data: "test data"
 *              timestamp: "2024-01-01T00:00:00Z"
 *      responses:
 *        200:
 *          description: API 環傳請求
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  query:
 *                    type: object
 *                    additionalProperties: true
 *                    description: 查詢參數物件
 *                  payload:
 *                    type: object
 *                    additionalProperties: true
 *                    description: 請求體資料物件
 *              example:
 *                query:
 *                  test: "value"
 *                payload:
 *                  data: "test data"
 *                  timestamp: "2024-01-01T00:00:00Z"
 */
/**
 * 前端 API 快取測試 API (POST)
 *
 * 用於測試前端 API 快取機制的 POST 端點
 * 回傳請求中的查詢參數和請求體，用於驗證快取行為
 *
 * @api {POST} /api/nuxt-server/frontend-api-cach-test 前端 API 快取測試
 * @apiGroup Test
 * @apiName FrontendApiCacheTestPost
 *
 * @apiQuery {*} [*] 任意查詢參數，用於測試快取機制
 * @apiBody {*} [*] 任意請求體資料，用於測試快取機制
 *
 * @apiSuccess {Object} query 查詢參數物件
 * @apiSuccess {Object} payload 請求體資料物件
 *
 * @example
 * // 請求範例
 * POST /api/nuxt-server/frontend-api-cach-test?test=value
 * Content-Type: application/json
 * {
 *   "data": "test data",
 *   "timestamp": "2024-01-01T00:00:00Z"
 * }
 *
 * @example
 * // 成功回應範例
 * {
 *   "query": {
 *     "test": "value"
 *   },
 *   "payload": {
 *     "data": "test data",
 *     "timestamp": "2024-01-01T00:00:00Z"
 *   }
 * }
 *
 * @description
 * 此 API 專門用於測試前端 API 快取機制
 * 回傳所有查詢參數和請求體資料，方便驗證快取是否正確運作
 */
export default defineEventHandler(async (event) => {
  console.log('api:frontend-api-cach-test.post');

  const payload = await readBody(event);
  const query = getQuery(event);
  return { query, payload };
});