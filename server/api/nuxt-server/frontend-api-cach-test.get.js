
/**
 * @openapi
 * /nuxt-server/frontend-api-cach-test:
 *    get:
 *      description: 前端 API 快取測試
 *      parameters:
 *        - in: query
 *          name: test
 *          description: 任意查詢參數，用於測試快取機制
 *          schema: 
 *            type: string
 *          example: "value"
 *        - in: query
 *          name: cache
 *          description: 快取控制參數
 *          schema:
 *            type: string
 *          example: "true"
 *        - in: query
 *          name: timestamp
 *          description: 時間戳記，用於驗證快取時間
 *          schema:
 *            type: string
 *          example: "2024-01-01T00:00:00Z"
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
 *                example:
 *                  query:
 *                    test: "value"
 *                    cache: "true"
 *                    timestamp: "2024-01-01T00:00:00Z"
 *        400:
 *          description: 請求參數錯誤
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  statusMessage:
 *                    type: string
 *                    example: "Bad Request"
 *        500:
 *          description: 伺服器內部錯誤
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 500
 *                  statusMessage:
 *                    type: string
 *                    example: "Internal Server Error"
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