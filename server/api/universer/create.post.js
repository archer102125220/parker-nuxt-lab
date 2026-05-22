/*
建立文件

POST

[UNIVERSER_DOCKER_HOST]/universer-api/snapshot/{type}/unit/-/create
http://localhost:8000
type 參數值：1 表示 Docs，2 表示 Sheets。

Headers
content-type: application/json

Body Parameters
Parameter	Type	Example	Description
type*	enum(int)	-	1（docs），2（sheets）路徑與請求體參數
name*	string	-	文件名稱
creator*	string	-	建立者 id
idempotencyKey	string	-	v0.20.0開始引入，可選幂等键，字符串需要<=64字節
metaData	string	-	v0.20.0開始引入，使用者自訂資訊，會綁定到建立的unit，之後的同步事件和USIP調用會透傳，字符串需要<=1024字節

curl http://localhost:8000/universer-api/snapshot/{type}/unit/-/create \
  -X POST \
  -H 'Content-Type: application/json' \
  --data-raw '{"type":2,"name":"New Sheet By Univer","creator":"userID","idempotencyKey":"a-idgenerator-unique-id","metaData":"tenant12345"}'
*/
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return { success: true, body };
});
