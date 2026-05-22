/*
匯出

POST

[UNIVERSER_DOCKER_HOST]/universer-api/exchange/{type}/export
http://localhost:8000

Headers
content-type: application/json
Body Parameters
Parameter	Type	Example	Description
type*	enum(int)	-	1（doc），2（sheet）
unitID*	string	-	協同文件 id；如果以 jsonID 方式匯出，unitID 可傳空字符串
jsonID*	string	-	非協同文件匯出的方式，jsonID 是前端 json 生成的文件上傳後返回的 FileId。若以 unitID 方式匯出，則無需 jsonID，傳空字符串即可
sscSwitch	boolean	-	是否啟用 SSC（Server Side Calculation），true 觸發服務端公式計算，預設 false
useImageUrl	boolean	-	是否禁止單元格圖片轉換為連結，true 則單元格圖片不會轉換為連結，默認 false
ignoreTableExport	boolean	-	是否忽略表格（Table）匯出，默認 false

curl -X POST 'http://localhost:8000/universer-api/exchange/2/export' \
  -H 'Content-Type: application/json' \
  --data-raw '{"unitID":"xxxx","type":2}'
*/
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return { success: true, body };
});
