/*
刪除文件

DELETE

[UNIVERSER_DOCKER_HOST]/universer-api/snapshot/-/units
http://localhost:8000

Headers
content-type: application/json

Query Parameters
Parameter	Type	Example	Description
unitIds*	array[string]	-	文件 id 陣列

curl -X DELETE 'http://localhost:8000/universer-api/snapshot/-/units?unitIds=1&unitIds=2'
*/
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  return { success: true, query };
});
