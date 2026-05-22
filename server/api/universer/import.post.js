/*
匯入

POST

[UNIVERSER_DOCKER_HOST]/universer-api/exchange/{type}/import
http://localhost:8000

Headers
content-type: application/json

Body Parameters
Parameter	Type	Example	Description
type*	enum(int)	-	1（doc），2（sheet）
outputType*	enum(int)	-	1（unit），2（json）
fileID*	string	-	上傳檔案 id
minSheetRowCount*	int	-	最小列數，匯入時檢查列數是否達標
minSheetColumnCount*	int	-	最小欄數，匯入時檢查欄數是否達標
idempotencyKey	string	-	v0.20.0開始引入，可選幂等鍵，字符串需要<=64字節
metaData	string	-	v0.20.0開始引入，使用者自訂資訊，會綁定到匯入任務，之後的同步事件和USIP調用會透傳，字符串需要<=1024字節

curl -X POST 'http://localhost:8000/universer-api/exchange/2/import' \
  -H 'Content-Type: application/json' \
  --data-raw '{"fileID":"123","outputType":1,"minSheetRowCount":1000,"minSheetColumnCount":20,"idempotencyKey":"a-idgenerator-unique-id","metaData":"tenant12345"}'
*/
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return { success: true, body };
});
