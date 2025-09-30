export function useEventSource() {
  // const sseObj = new EventSource('https://localhost:3000/server-sent-event');
  const sseObj = new EventSource('/server-sent-event');
  // sseObj.addEventListener('open', (payload) => { console.log('open'); console.log(payload); });
  // sseObj.addEventListener('error', (payload) => { console.log('error'); console.log(payload); });
  // sseObj.addEventListener('message', (payload) => { console.log('message'); console.log(payload); });
  // sseObj.addEventListener('ping', (payload) => { console.log('message'); console.log(payload); });
}

export default useEventSource;