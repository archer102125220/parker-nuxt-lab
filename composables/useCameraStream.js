
// https://mrcodingroom.freesite.host/js%E5%B0%87video-webcam%E7%95%AB%E5%9C%A8canvas%E4%B8%8A/
export function useCameraStream(afterInit = () => { }, onError = () => { }) {
  const streamObj = ref(null);

  async function getCameraStream() {
    try {
      // 要 camera 的權限
      const stream = await window.navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user'
        }
      });
      // console.log({ stream });
      streamObj.value = stream;

      if (typeof afterInit === 'function') {
        afterInit(streamObj.value);
      }
    } catch (error) {
      console.error(error);

      if (typeof onError === 'function') {
        onError(error);
      }
    }
  }

  function handleStopStream(stream) {
    if (typeof stream?.getTracks !== 'function') return;

    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
      track.clone();
      if (typeof stream?.removeTrack === 'function') {
        stream.removeTrack(track);
      }
    });
  }

  onMounted(() => {
    getCameraStream();
  });

  onBeforeUnmount(() => {
    if (typeof streamObj.value?.getTracks === 'function') {
      handleStopStream(streamObj.value);

      streamObj.value = null;
    }
  });

  return streamObj;
}