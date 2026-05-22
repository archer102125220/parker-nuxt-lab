/*
取得轉換結果

GET

[UNIVERSER_DOCKER_HOST]/exchange/task/{taskID}
http://localhost:8000/universer-api

Headers

Path Parameters
Parameter	Type	Example	Description
taskID*	string	-	任務 id

curl -X GET 'http://localhost:8000/universer-api/exchange/task/123'
*/
export default defineEventHandler((event) => {
  const taskID = getRouterParam(event, 'taskID');

  const query = getQuery(event);

  return { success: true, taskID, query };
});