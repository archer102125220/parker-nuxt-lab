
import freeice from 'freeice';

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
// http://ithelp.ithome.com.tw/articles/10258599

const DEFAULT_CONFIG = {
  iceCandidate(...arg) { console.log('iceCandidate', ...arg); },
  iceCandidateError(...arg) { console.log('iceCandidateError', ...arg); },
  iceconnectionStateChange(...arg) { console.log('iceconnectionStateChange', ...arg); },
  addStream(...arg) { console.log('addStream', ...arg); },
  track(...arg) { console.log('track', ...arg); },
  dataChannel(...arg) { console.log('dataChannel', ...arg); },
  negotiationNeeded(...arg) { console.log('negotiationNeeded', ...arg); }
};

export function useWebRTC(config = DEFAULT_CONFIG, streamData = null) {
  const webRTC = ref(null);

  async function webRTCInit(newConfig = DEFAULT_CONFIG) {
    if (typeof window === 'undefined') return;
    console.log('webRTCInit');
    console.log({ newConfig });

    if (webRTC.value instanceof window?.RTCPeerConnection === true) {
      webRTC.value.close();
    }

    const {
      iceCandidate,
      iceCandidateError,
      iceconnectionStateChange,
      addStream,
      track,
      dataChannel,
      negotiationNeeded,
      afterInit,
      ...webRTCConfig
    } = newConfig || {};

    const _webRTCConfig = {
      ...(webRTCConfig || {}),
      iceServers: webRTCConfig?.iceServers || freeice()
    }
    console.log({ _webRTCConfig });
    const newWebRTC = new window.RTCPeerConnection(_webRTCConfig);

    if (typeof iceCandidate === 'function') {
      newWebRTC.addEventListener('icecandidate', iceCandidate);
      // newWebRTC.onicecandidate = iceCandidate;
    }
    if (typeof iceCandidateError === 'function') {
      newWebRTC.addEventListener('icecandidateerror', iceCandidateError);
      // newWebRTC.addEventListener('icecandidateerror', console.error);
      // newWebRTC.onicecandidateerror = iceCandidateError;
    }
    if (typeof iceconnectionStateChange === 'function') {
      newWebRTC.addEventListener('iceconnectionstatechange', iceconnectionStateChange);
    }
    if (typeof addStream === 'function') {
      newWebRTC.addEventListener('addstream', addStream);
    }
    if (typeof track === 'function') {
      newWebRTC.addEventListener('track', track);
    }
    if (typeof dataChannel === 'function') {
      newWebRTC.addEventListener('datachannel', dataChannel);
    }
    if (typeof negotiationNeeded === 'function') {
      newWebRTC.addEventListener('negotiationneeded', negotiationNeeded);
    }

    handleStreamData(streamData, null, newWebRTC);

    webRTC.value = newWebRTC;

    await nextTick();
    if (typeof afterInit === 'function') {
      afterInit(webRTC.value);
    }
  }
  async function webRTCConfigUpdate(newConfig = DEFAULT_CONFIG, oldConfig = null) {
    if (typeof window === 'undefined' || webRTC.value instanceof window?.RTCPeerConnection === false) return;
    console.log('webRTCConfigUpdate');
    console.log({ newConfig, oldConfig });

    const {
      iceCandidate: newIceCandidate,
      iceCandidateError: newIceCandidateError,
      iceconnectionStateChange: newIceconnectionStateChange,
      addStream: newAddStream,
      track: newTrack,
      dataChannel: newDataChannel,
      negotiationNeeded: newNegotiationNeeded,
      afterInit: _afterInit,
      afterUpdate,
      ...newWebRTCConfig
    } = newConfig || {};
    const {
      iceCandidate: oldIceCandidate,
      iceCandidateError: oldIceCandidateError,
      iceconnectionStateChange: oldIceconnectionStateChange,
      addStream: oldAddStream,
      dataChannel: oldDataChannel,
      negotiationNeeded: oldNegotiationNeeded,
      track: oldTrack
    } = oldConfig || {};

    webRTC.value.setConfiguration({
      ...(newWebRTCConfig || {}),
      iceServers: newWebRTCConfig?.iceServers || freeice()
    });

    if (newIceCandidate !== oldIceCandidate) {
      if (typeof oldIceCandidate === 'function') {
        webRTC.value.removeEventListener('icecandidate', oldIceCandidate)
      }
      if (typeof newIceCandidate === 'function') {
        webRTC.value.addEventListener('icecandidate', newIceCandidate)
      }
    }

    if (newIceCandidateError !== oldIceCandidateError) {
      if (typeof oldIceCandidateError === 'function') {
        webRTC.value.removeEventListener('icecandidateerror', oldIceCandidateError)
      }
      if (typeof newIceCandidateError === 'function') {
        webRTC.value.addEventListener('icecandidateerror', newIceCandidateError);
        // webRTC.value.addEventListener('icecandidateerror', console.error);
        // webRTC.value.onicecandidateerror = newIceCandidateError;
      }
    }

    if (newIceconnectionStateChange !== oldIceconnectionStateChange) {
      if (typeof oldIceconnectionStateChange === 'function') {
        webRTC.value.removeEventListener('iceconnectionstatechange', oldIceconnectionStateChange);
      }
      if (typeof newIceconnectionStateChange === 'function') {
        webRTC.value.addEventListener('iceconnectionstatechange', newIceconnectionStateChange);
      }
    }

    if (newAddStream !== oldAddStream) {
      if (typeof oldAddStream === 'function') {
        webRTC.value.removeEventListener('addstream', oldAddStream);
      }
      if (typeof newAddStream === 'function') {
        webRTC.value.addEventListener('addstream', newAddStream);
      }
    }


    if (newTrack !== oldTrack) {
      if (typeof oldTrack === 'function') {
        webRTC.value.removeEventListener('track', oldTrack);
      }
      if (typeof newTrack === 'function') {
        webRTC.value.addEventListener('track', newTrack);
      }
    }

    if (newDataChannel !== oldDataChannel) {
      if (typeof oldDataChannel === 'function') {
        webRTC.value.removeEventListener('datachannel', oldDataChannel);
      }
      if (typeof newDataChannel === 'function') {
        webRTC.value.addEventListener('datachannel', newDataChannel);
      }
    }


    if (newNegotiationNeeded !== oldNegotiationNeeded) {
      if (typeof oldNegotiationNeeded === 'function') {
        webRTC.value.removeEventListener('negotiationneeded', oldNegotiationNeeded);
      }
      if (typeof newNegotiationNeeded === 'function') {
        webRTC.value.addEventListener('negotiationneeded', newNegotiationNeeded);
      }
    }

    await nextTick();
    if (typeof afterUpdate === 'function') {
      afterUpdate(webRTC.value);
    }
  }

  async function handleStreamData(newStreamData, oldStreamData, currentWebRTC = webRTC.value) {
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

    const streamAdded = (config?.value || config)?.streamAdded;

    await nextTick();
    if (typeof streamAdded === 'function') {
      streamAdded(currentWebRTC);
    }
  }

  watch(() => (config?.value || config), webRTCConfigUpdate, { deep: true });
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