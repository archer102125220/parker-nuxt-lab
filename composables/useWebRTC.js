import freeice from 'freeice';
import _cloneDeep from 'lodash/cloneDeep';

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
const RTC = window?.RTCPeerConnection || window?.mozRTCPeerConnection || window?.webkitRTCPeerConnection;

export function webRTCInit(newConfig = DEFAULT_CONFIG) {
  if (typeof window === 'undefined') return;

  const {
    iceCandidate,
    iceCandidateError,
    iceconnectionStateChange,
    addStream,
    track,
    dataChannel,
    negotiationNeeded,
    signalingstateChange,
    afterInit: _afterInit,
    ...webRTCConfig
  } = newConfig || {};

  const _webRTCConfig = {
    ...(webRTCConfig || {}),
    iceServers: webRTCConfig?.iceServers || freeice()
  };
  const newWebRTC = new RTC(_webRTCConfig);

  if (typeof iceCandidate === 'function') {
    newWebRTC.addEventListener('icecandidate', iceCandidate);
    // newWebRTC.onicecandidate = iceCandidate;
  }
  if (typeof iceCandidateError === 'function') {
    newWebRTC.addEventListener('icecandidateerror', iceCandidateError);
    // newWebRTC.onicecandidateerror = iceCandidateError;
  }
  if (typeof iceconnectionStateChange === 'function') {
    newWebRTC.addEventListener('iceconnectionstatechange', iceconnectionStateChange);
  }

  if (typeof track === 'function') {
    newWebRTC.addEventListener('track', track);
  }

  if (typeof addStream === 'function') {
    newWebRTC.addEventListener('addstream', addStream);
  }

  if (typeof dataChannel === 'function') {
    newWebRTC.addEventListener('datachannel', dataChannel);
  }
  if (typeof negotiationNeeded === 'function') {
    newWebRTC.addEventListener('negotiationneeded', negotiationNeeded);
  }
  if (typeof signalingstateChange === 'function') {
    newWebRTC.addEventListener('signalingstatechange ', signalingstateChange);
  }

  return newWebRTC;
}

export function useWebRTC(config = DEFAULT_CONFIG, streamData = null) {
  const localStreamAdded = ref(false);

  const webRTC = reactive({
    RTC: null,
    candidate: null,
    localDescriptionSetting: false,
    localDescription: null,
    streamList: [],
    trackSenderList: [],
    trackSender: {},
    isOffer: false,
    offer: null,
    isAnswer: false,
    answer: null,
    remoteDescriptionAdded: false,
    get localStreamAdded() {
      return localStreamAdded.value;
    },
    set localStreamAdded(newLocalStreamAdded) {
      localStreamAdded.value = newLocalStreamAdded;
    }
  });

  async function handleWebRTCInit(newConfig = DEFAULT_CONFIG) {
    if (typeof window === 'undefined') return;

    if (webRTC.RTC instanceof RTC === true) {
      webRTC.RTC.close();
    }
    const { afterInit, ...webRTCConfig } = newConfig || {};

    const newWebRTC = webRTCInit({
      ...webRTCConfig,
      iceCandidate(iceCandidateEvent, ...arg) {
        // if (iceCandidateEvent.candidate) {
        //   webRTC.candidate = iceCandidateEvent.candidate;
        // }

        webRTC.candidate = iceCandidateEvent.candidate;

        if (typeof config?.iceCandidate === 'function') {
          config.iceCandidate(iceCandidateEvent, ...arg);
        }
      },
      track(trackEvent, ...arg) {
        const streamList = Array.isArray(trackEvent.streams)
          ? trackEvent.streams
          : [];

        webRTC.streamList = streamList;

        if (typeof config?.track === 'function') {
          config.track(trackEvent, ...arg);
        }
      }
    });

    webRTC.RTC = newWebRTC;

    handleStreamData(streamData, null, newWebRTC);

    await nextTick();
    if (typeof afterInit === 'function') {
      afterInit(webRTC.RTC);
    }
  }
  async function handleWebRTCConfigUpdate(newConfig = DEFAULT_CONFIG, oldConfig = null) {
    if (typeof window === 'undefined' || webRTC.RTC instanceof RTC === false) return;

    const {
      iceCandidate: _newIceCandidate,
      iceCandidateError: newIceCandidateError,
      iceconnectionStateChange: newIceconnectionStateChange,
      addStream: newAddStream,
      track: newTrack,
      dataChannel: newDataChannel,
      negotiationNeeded: newNegotiationNeeded,
      signalingstateChange: newSignalingstateChange,
      afterInit: _afterInit,
      afterUpdate,
      ...newWebRTCConfig
    } = newConfig || {};
    const {
      iceCandidate: _oldIceCandidate,
      iceCandidateError: oldIceCandidateError,
      iceconnectionStateChange: oldIceconnectionStateChange,
      addStream: oldAddStream,
      dataChannel: oldDataChannel,
      negotiationNeeded: oldNegotiationNeeded,
      track: _oldTrack,
      signalingstateChange: oldSignalingstateChange,
    } = oldConfig || {};

    webRTC.RTC.setConfiguration({
      ...(newWebRTCConfig || {}),
      iceServers: newWebRTCConfig?.iceServers || freeice()
    });

    // if (newIceCandidate !== oldIceCandidate) {
    //   if (typeof oldIceCandidate === 'function') {
    //     webRTC.RTC.removeEventListener('icecandidate', oldIceCandidate)
    //   }
    //   if (typeof newIceCandidate === 'function') {
    //     webRTC.RTC.addEventListener('icecandidate', newIceCandidate)
    //   }
    // }

    if (newIceCandidateError !== oldIceCandidateError) {
      if (typeof oldIceCandidateError === 'function') {
        webRTC.RTC.removeEventListener('icecandidateerror', oldIceCandidateError)
      }
      if (typeof newIceCandidateError === 'function') {
        webRTC.RTC.addEventListener('icecandidateerror', newIceCandidateError);
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


    // if (newTrack !== oldTrack) {
    //   if (typeof oldTrack === 'function') {
    //     webRTC.RTC.removeEventListener('track', oldTrack);
    //   }
    //   if (typeof newTrack === 'function') {
    //     webRTC.RTC.addEventListener('track', newTrack);
    //   }
    // }

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

    if (newSignalingstateChange !== oldSignalingstateChange) {
      if (typeof oldSignalingstateChange === 'function') {
        webRTC.RTC.removeEventListener('signalingstatechange', oldSignalingstateChange);
      }
      if (typeof newSignalingstateChange === 'function') {
        webRTC.RTC.addEventListener('signalingstatechange ', newSignalingstateChange);
      }
    }

    await nextTick();
    if (typeof afterUpdate === 'function') {
      afterUpdate(webRTC.RTC);
    }
  }

  async function handleStreamData(newStreamData, oldStreamData, currentWebRTC = webRTC.RTC) {
    if (typeof window === 'undefined' || currentWebRTC instanceof RTC === false) return;
    // 還要測試

    const trackSenderList = Array.isArray(webRTC.trackSenderList)
      ? _cloneDeep(webRTC.trackSenderList)
      : [];
    const trackSender = _cloneDeep(webRTC.trackSender);

    // if (oldStreamData?.value instanceof window?.MediaStream === true) {
    //   currentWebRTC.removeStream(oldStreamData.value);
    // } else if (oldStreamData instanceof window?.MediaStream === true) {
    //   currentWebRTC.removeStream(oldStreamData);
    // }

    // if (newStreamData?.value instanceof window?.MediaStream === true) {
    //   currentWebRTC.addStream(newStreamData.value);
    // } else if (newStreamData instanceof window?.MediaStream === true) {
    //   currentWebRTC.addStream(newStreamData);
    // }

    const _oldStreamData = oldStreamData?.value instanceof window?.MediaStream === true ?
      oldStreamData?.value :
      oldStreamData instanceof window?.MediaStream === true ?
        oldStreamData :
        null;
    if (_oldStreamData !== null) {
      if (Array.isArray(trackSender[_oldStreamData.id]) === true) {
        trackSender[_oldStreamData.id].forEach((sender) => {
          webRTC.RTC.removeTrack(sender);
        });
        trackSender[_oldStreamData.id] = null;
        delete trackSender[_oldStreamData.id];
      }
    }

    const _newStreamData = newStreamData?.value instanceof window?.MediaStream === true ?
      newStreamData?.value :
      newStreamData instanceof window?.MediaStream === true ?
        newStreamData :
        null;
    if (_newStreamData !== null) {
      if (Array.isArray(trackSender[_newStreamData.id]) === false) {
        trackSender[_newStreamData.id] = [];
      }

      // 將本地視訊軌加入 RTCPeerConnection
      _newStreamData.getTracks().forEach((track) => {
        const _trackSender = webRTC.RTC.addTrack(track, _newStreamData);
        trackSenderList.push(_trackSender);
        trackSender[_newStreamData.id].push(_trackSender);
      });
      localStreamAdded.value = true;
    }
    webRTC.trackSender = trackSender;
    webRTC.trackSenderList = trackSenderList;

    // const streamAdded = (config?.value || config)?.streamAdded;

    // await nextTick();
    // if (typeof streamAdded === 'function') {
    //   streamAdded(currentWebRTC);
    // }
  }

  watch(() => (config?.value || config), handleWebRTCConfigUpdate, { deep: true });
  watch(
    () => (streamData?.value || streamData),
    (newStreamData, oldStreamData) => handleStreamData(newStreamData, oldStreamData, webRTC.RTC),
    { deep: true }
  );
  watch(() => webRTC.localDescription,
    async function (newLocalDescription) {
      try {
        // const rawNewLocalDescription = toRaw(newLocalDescription);
        webRTC.localDescriptionSetting = true;
        await webRTC.RTC.setLocalDescription(newLocalDescription);
        webRTC.localDescriptionSetting = false;
      } catch (error) {
        console.log(error);
      }
    },
    { deep: true }
  );
  watch(
    () => [
      localStreamAdded.value,
      webRTC.remoteDescriptionAdded,
      webRTC.isOffer,
      webRTC.isAnswer
    ],
    async ([
      newLocalStreamAdded,
      newWremoteWebrtcDescriptionAdded,
      newIsOffer,
      newIsAnswer
    ]) => {
      if (newLocalStreamAdded === false) return;

      try {
        if (newIsOffer === true) {
          const newOffer = await webRTC.RTC.createOffer();
          webRTC.localDescription = newOffer;

          // socketIoClient.io.emit('newUser', { offer: newOffer });
          webRTC.isOffer = false;
          webRTC.offer = newOffer;
        } else if (
          newWremoteWebrtcDescriptionAdded === true &&
          newIsAnswer === true
        ) {
          const newAnswer = await webRTC.RTC.createAnswer();
          webRTC.localDescription = newAnswer;

          // socketIoClient.io.emit('newUser', { answer: newAnswer });
          webRTC.isAnswer = false;
          webRTC.answer = newAnswer;
        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  onMounted(() => {
    handleWebRTCInit(config);

    if (system.supportWebsocket === false) {
      window.webRTC = webRTC;
      window.getWebRTC = function () {
        webRTC.value;
      };
    }
  });

  onBeforeUnmount(() => {
    if (typeof webRTC.RTC?.removeTrack === 'function') {
      webRTC.trackSenderList.forEach(sender => {
        webRTC.RTC.removeTrack(sender);
      })
    }
    if (typeof webRTC.RTC.close === 'function') {
      webRTC.RTC?.close();
    }
    webRTC.RTC = null;
  });

  return webRTC;
}

export default useWebRTC;