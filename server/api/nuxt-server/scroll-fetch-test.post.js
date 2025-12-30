/**
 * @openapi
 * /nuxt-server/scroll-fetch:
 *    post:
 *      description: 滾動載入測試
 *      parameters:
 *        - in: query
 *          name: page
 *          description: 頁面編號
 *          schema:
 *            type: integer
 *            default: 1
 *          example: 2
 *        - in: query
 *          name: limit
 *          description: 每頁資料數量
 *          schema:
 *            type: integer
 *            default: 10
 *          example: 15
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              additionalProperties: true
 *              description: 任意請求體資料，如篩選條件等
 *            example:
 *              filter:
 *                category: "news"
 *                date: "2024-01-01"
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
 *                  payload:
 *                    type: object
 *                    additionalProperties: true
 *                    description: 請求體資料物件
 *              example:
 *                query:
 *                  page: "2"
 *                  limit: "15"
 *                payload:
 *                  filter:
 *                    category: "news"
 *                    date: "2024-01-01"
 */
/**
 * 滾動載入測試 API (POST)
 *
 * 用於測試前端滾動載入功能的 POST 端點
 * 回傳請求中的查詢參數和請求體，用於驗證滾動載入行為
 *
 * @api {POST} /api/nuxt-server/scroll-fetch 滾動載入測試
 * @apiGroup Test
 * @apiName ScrollFetchTestPost
 *
 * @apiQuery {Number} [page=1] 頁面編號
 * @apiQuery {Number} [limit=10] 每頁資料數量
 * @apiQuery {*} [*] 其他任意查詢參數
 * @apiBody {*} [*] 任意請求體資料，如篩選條件等
 *
 * @apiSuccess {Object} query 查詢參數物件
 * @apiSuccess {Object} payload 請求體資料物件
 *
 * @example
 * // 請求範例
 * POST /api/nuxt-server/scroll-fetch?page=2&limit=15
 * Content-Type: application/json
 * {
 *   "filter": {
 *     "category": "news",
 *     "date": "2024-01-01"
 *   }
 * }
 *
 * @example
 * // 成功回應範例
 * {
 *   "query": {
 *     "page": "2",
 *     "limit": "15"
 *   },
 *   "payload": {
 *     "filter": {
 *       "category": "news",
 *       "date": "2024-01-01"
 *     }
 *   }
 * }
 *
 * @description
 * 此 API 專門用於測試前端的滾動載入功能
 * 支援 POST 請求以處理複雜的篩選條件或資料查詢
 */
export default defineEventHandler(async (event) => {
  console.log('api:scroll-fetch.post');

  const payload = await readBody(event);
  const query = getQuery(event);
  return { query, payload };
});