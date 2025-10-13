/**
 * @openapi
 * /nuxt-server/scroll-fetch-test:
 *    get:
 *      description: 滾動載入測試
 *      parameters:
 *        - in: query
 *          name: page
 *          description: 頁面編號
 *          schema:
 *            type: integer
 *            default: 1
 *          example: 1
 *        - in: query
 *          name: limit
 *          description: 每頁資料數量
 *          schema:
 *            type: integer
 *            default: 10
 *          example: 20
 *      responses:
 *        200:
 *          description: 滾動載入測試結果
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  query:
 *                    type: object
 *                    additionalProperties: true
 *                    description: 查詢參數物件
 *              example:
 *                query:
 *                  page: "1"
 *                  limit: "20"
 */
/**
 * 滾動載入測試 API (GET)
 * 
 * 用於測試前端滾動載入功能的 GET 端點
 * 回傳請求中的查詢參數，用於驗證滾動載入行為
 * 
 * @api {GET} /api/nuxt-server/scroll-fetch-test 滾動載入測試
 * @apiGroup Test
 * @apiName ScrollFetchTestGet
 * 
 * @apiQuery {Number} [page=1] 頁面編號
 * @apiQuery {Number} [limit=10] 每頁資料數量
 * @apiQuery {*} [*] 其他任意查詢參數
 * 
 * @apiSuccess {Object} query 查詢參數物件
 * 
 * @example
 * // 請求範例
 * GET /api/nuxt-server/scroll-fetch-test?page=1&limit=20
 * 
 * @example
 * // 成功回應範例
 * {
 *   "query": {
 *     "page": "1",
 *     "limit": "20"
 *   }
 * }
 * 
 * @description
 * 此 API 專門用於測試前端的滾動載入功能
 * 通常配合前端的分頁或無限滾動組件使用
 */
export default defineEventHandler((event) => {
  console.log('api:scroll-fetch-test.get');

  const query = getQuery(event);
  return { query };
});