
export default defineEventHandler((event) => {
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  // console.log({ challenge }, challenge.toLocaleString());

  return challenge.toLocaleString();
});