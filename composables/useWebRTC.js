
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
  const webRTC = reactive({
    RTC: null,
    candidate: null,
    localDescriptionSetting: false,
    localDescription: null,
    streamList: []
  });

  async function webRTCInit(newConfig = DEFAULT_CONFIG) {
    if (typeof window === 'undefined') return;

    if (webRTC.RTC instanceof window?.RTCPeerConnection === true) {
      webRTC.RTC.close();
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
    const newWebRTC = new window.RTCPeerConnection(_webRTCConfig);

    newWebRTC.addEventListener('icecandidate', function (iceCandidateEvent, ...arg) {
      if (iceCandidateEvent.candidate) {
        webRTC.candidate = iceCandidateEvent.candidate;
      }

      if (typeof iceCandidate === 'function') {
        iceCandidate(iceCandidateEvent, ...arg);
      }
    });
    // if (typeof iceCandidate === 'function') {
    //   newWebRTC.addEventListener('icecandidate', iceCandidate);
    //   // newWebRTC.onicecandidate = iceCandidate;
    // }
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

    newWebRTC.addEventListener('track', function (trackEvent, ...arg) {
      const streamList = Array.isArray(trackEvent.streams)
        ? trackEvent.streams
        : [];

      webRTC.streamList = streamList;

      if (typeof track === 'function') {
        track(trackEvent, ...arg);
      }
    });
    // if (typeof track === 'function') {
    //   newWebRTC.addEventListener('track', track);
    // }
    if (typeof dataChannel === 'function') {
      newWebRTC.addEventListener('datachannel', dataChannel);
    }
    if (typeof negotiationNeeded === 'function') {
      newWebRTC.addEventListener('negotiationneeded', negotiationNeeded);
    }

    handleStreamData(streamData, null, newWebRTC);

    webRTC.RTC = newWebRTC;

    await nextTick();
    if (typeof afterInit === 'function') {
      afterInit(webRTC.RTC);
    }
  }
  async function webRTCConfigUpdate(newConfig = DEFAULT_CONFIG, oldConfig = null) {
    if (typeof window === 'undefined' || webRTC.RTC instanceof window?.RTCPeerConnection === false) return;
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

    webRTC.RTC.setConfiguration({
      ...(newWebRTCConfig || {}),
      iceServers: newWebRTCConfig?.iceServers || freeice()
    });

    if (newIceCandidate !== oldIceCandidate) {
      if (typeof oldIceCandidate === 'function') {
        webRTC.RTC.removeEventListener('icecandidate', oldIceCandidate)
      }
      if (typeof newIceCandidate === 'function') {
        webRTC.RTC.addEventListener('icecandidate', newIceCandidate)
      }
    }

    if (newIceCandidateError !== oldIceCandidateError) {
      if (typeof oldIceCandidateError === 'function') {
        webRTC.RTC.removeEventListener('icecandidateerror', oldIceCandidateError)
      }
      if (typeof newIceCandidateError === 'function') {
        webRTC.RTC.addEventListener('icecandidateerror', newIceCandidateError);
        // webRTC.RTC.addEventListener('icecandidateerror', console.error);
        // webRTC.RTC.onicecandidateerror = newIceCandidateError;
      }
    }

    if (newIceconnectionStateChange !== oldIceconnectionStateChange) {
      if (typeof oldIceconnectionStateChange === 'function') {
        webRTC.RTC.removeEventListener('iceconnectionstatechange', oldIceconnectionStateChange);
      }
      if (typeof newIceconnectionStateChange === 'function') {
        webRTC.RTC.addEventListener('iceconnectionstatechange', newIceconnectionStateChange);
      }
    }

    if (newAddStream !== oldAddStream) {
      if (typeof oldAddStream === 'function') {
        webRTC.RTC.removeEventListener('addstream', oldAddStream);
      }
      if (typeof newAddStream === 'function') {
        webRTC.RTC.addEventListener('addstream', newAddStream);
      }
    }


    if (newTrack !== oldTrack) {
      if (typeof oldTrack === 'function') {
        webRTC.RTC.removeEventListener('track', oldTrack);
      }
      if (typeof newTrack === 'function') {
        webRTC.RTC.addEventListener('track', newTrack);
      }
    }

    if (newDataChannel !== oldDataChannel) {
      if (typeof oldDataChannel === 'function') {
        webRTC.RTC.removeEventListener('datachannel', oldDataChannel);
      }
      if (typeof newDataChannel === 'function') {
        webRTC.RTC.addEventListener('datachannel', newDataChannel);
      }
    }


    if (newNegotiationNeeded !== oldNegotiationNeeded) {
      if (typeof oldNegotiationNeeded === 'function') {
        webRTC.RTC.removeEventListener('negotiationneeded', oldNegotiationNeeded);
      }
      if (typeof newNegotiationNeeded === 'function') {
        webRTC.RTC.addEventListener('negotiationneeded', newNegotiationNeeded);
      }
    }

    await nextTick();
    if (typeof afterUpdate === 'function') {
      afterUpdate(webRTC.RTC);
    }
  }

  async function handleStreamData(newStreamData, oldStreamData, currentWebRTC = webRTC.RTC) {
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
  watch(() => webRTC.localDescription,
    async function (newLocalDescription) {
      webRTC.localDescriptionSetting = true;
      await webRTC.RTC.setLocalDescription(newLocalDescription);
      webRTC.localDescriptionSetting = false;
    },
    { deep: true }
  );

  onMounted(() => {
    webRTCInit(config);
  });

  onBeforeUnmount(() => {
    if (typeof webRTC.RTC?.removeStream === 'function') {
      if (streamData?.value instanceof window?.MediaStream === true) {
        webRTC.RTC.removeStream(streamData.value);
      } else if (streamData instanceof window?.MediaStream === true) {
        webRTC.RTC.removeStream(streamData);
      }

      webRTC.RTC.close();

      webRTC.RTC = null;
    }
  });

  return webRTC;
}

export default useWebRTC;