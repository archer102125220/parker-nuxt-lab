/*
取得文件列表

GET

[UNIVERSER_DOCKER_HOST]/universer-api/snapshot/{type}/units
http://localhost:8000
type 參數值：1 表示 Docs，2 表示 Sheets。

Headers

Query Parameters
Parameter	Type	Example	Description
type*	enum(int)	-	1（doc），2（sheet）路徑與請求體參數
nextCursor	string	-	分頁下一頁游標

curl -X GET 'http://localhost:8000/universer-api/snapshot/1/units?nextCursor=100'
*/
export default defineEventHandler((event) => {
  const query = getQuery(event);
  
  return { success: true, query };
});