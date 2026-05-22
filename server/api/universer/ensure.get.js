/*
生成快照

GET

[UNIVERSER_DOCKER_HOST]/universer-api/snapshot/{type}/unit/{unitID}/rev/0/ensure
http://localhost:8000
type 參數值：1 表示 Docs，2 表示 Sheets。

Headers

Query Parameters
Parameter	Type	Example	Description
type*	enum(int)	-	1（doc），2（sheet）路徑參數
unitID*	string	-	文檔 id

curl -X GET 'http://localhost:8000/universer-api/snapshot/2/unit/ETVf-B4lQqOSE_p09mcp9Q/rev/0/ensure'
*/
export default defineEventHandler((event) => {
  const query = getQuery(event);

  return { success: true, query };
});