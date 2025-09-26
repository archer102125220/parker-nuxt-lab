
import freeice from 'freeice';

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87

export function useWebRTC(config = {}, streamData = null) {
  const webRTC = ref(null);

  function webRTCInit(newCconfig = {}) {
    if (typeof window === 'undefined') return;

    if (webRTC.value instanceof window?.RTCPeerConnection === true) {
      webRTC.value.close();
    }

    webRTC.value = new window.RTCPeerConnection({
      ...(newCconfig || {}),
      iceServers: newCconfig?.iceServers || freeice()
    });
    handleStreamData(streamData, null, webRTC.value);
  }
  function webRTCConfigUpdate(newCconfig = {}, currentWebRTC = webRTC.value) {
    if (typeof window === 'undefined' || currentWebRTC instanceof window?.RTCPeerConnection === false) return;

    currentWebRTC.setConfiguration({
      ...(newCconfig || {}),
      iceServers: newCconfig?.iceServers || freeice()
    });
  }

  function handleStreamData(newStreamData, oldStreamData, currentWebRTC = webRTC.value) {
    console.log({ oldStreamData, newStreamData });

    if (typeof window === 'undefined' || currentWebRTC instanceof window?.RTCPeerConnection === false) return;

    if (oldStreamData?.value instanceof window?.MediaStream === true) {
      currentWebRTC.removeStream(oldStreamData.value);
    } else if (oldStreamData instanceof window?.MediaStream === true) {
      currentWebRTC.removeStream(oldStreamData);
    }

    if (newStreamData?.value instanceof window?.MediaStream === true) {
      currentWebRTC.addStream(newStreamData.value);
    } else if (newStreamData instanceof window?.MediaStream === true) {
      currentWebRTC.addStream(newStreamData);
    }
  }

  watch(() => (config?.value || config), (newCconfig) => webRTCConfigUpdate(newCconfig), { deep: true });
  watch(() => (streamData?.value || streamData), handleStreamData, { deep: true });

  onMounted(() => {
    webRTCInit(config);
  });

  onBeforeUnmount(() => {
    if (typeof webRTC.value?.removeStream === 'function') {
      if (streamData?.value instanceof window?.MediaStream === true) {
        webRTC.value.removeStream(streamData.value);
      } else if (streamData instanceof window?.MediaStream === true) {
        webRTC.value.removeStream(streamData);
      }

      webRTC.value.close();

      webRTC.value = null;
    }
  });

  return webRTC;
}

export default useWebRTC;