/*
上傳檔案

POST

[UNIVERSER_DOCKER_HOST]/stream/file/upload
http://localhost:8000/universer-api

Headers
content-type: multipart/form-data

Body Parameters
Parameter	Type	Example	Description
size*	int	-	檔案大小（byte），query 參數；必須與實際大小一致，否則回傳 error
file*	Form.file	-	HTML form 上傳檔案

curl 'http://localhost:8000/universer-api/stream/file/upload?size=125466' \
  --header 'cookie: _univer=XXXXXX' \
  --form 'file=@"demo.xlsx"'
*/
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return { success: true, body };
});
