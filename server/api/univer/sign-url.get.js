/*
取得檔案

GET

[UNIVERSER_DOCKER_HOST]/file/{fileID}/sign-url
http://localhost:8000/universer-api

Headers

Path Parameters
Parameter	Type	Example	Description
fileID*	string	-	結果檔案 id (export.fileID 或 import.jsonID)

curl -X GET 'http://localhost:8000/universer-api/file/1234/sign-url'
*/
export default defineEventHandler((event) => {
  const query = getQuery(event);

  return { success: true, query };
});