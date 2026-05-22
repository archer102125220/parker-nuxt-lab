import path from 'path';
import fs from 'fs-extra';

const __dirname = path.resolve();
const FILE_DIR = path.join(__dirname, 'public');
console.log({ __dirname, FILE_DIR });


export default defineEventHandler((event) => {
  // const { filesId } = event.context.params;
  const filesId = getRouterParam(event, 'filesId');
  const { filetype } = getQuery(event);

  console.log('edit');
  console.log({ filesId, filetype });

  const dirPath = path.join(FILE_DIR, filetype);
  // 正式時應替換為 filesId
  // const filePath = path.join(FILE_DIR, 'test.xlsx');
  const filePath = path.join(dirPath, filesId);

  // 建立可讀串流並直接回傳
  const readStream = fs.createReadStream(filePath);
  return sendStream(event, readStream);
});