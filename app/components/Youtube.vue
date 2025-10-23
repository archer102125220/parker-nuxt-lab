<template>
  <div class="youtube">
    <div class="youtube-player" ref="youtubePlayerEl" />
  </div>
</template>

<script setup>
const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

const props = defineProps({
  videoId: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  playerVars: {
    type: Object,
    default: () => ({
      rel: 0,
      controls: 1,
      showinfo: 0,
      enablejsapi: 1,
      wmode: 'opaque'
    })
  },
  autoplay: { type: Boolean, default: false }
});
const emit = defineEmits(['ready', 'stateChange']);

const player = ref(null);
const youtubePlayerEl = ref(null);

const events = computed(() => ({
  [UNSTARTED]: 'unstarted',
  [PLAYING]: 'playing',
  [PAUSED]: 'paused',
  [ENDED]: 'ended',
  [BUFFERING]: 'buffering',
  [CUED]: 'cued'
}));

function playerReady(e) {
  const youtubePlayer = e.target;
  if (typeof props.videoUrl === 'string' && props.videoUrl !== '') {
    // player.loadVideoByUrl(mediaContentUrl:String, startSeconds?:Number, endSeconds?:Number):Void
    youtubePlayer.loadVideoByUrl(props.videoUrl);
    if (props.autoplay === false) {
      youtubePlayer.stopVideo();
    }
  }
  if (
    // !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //   navigator.userAgent
    // ) &&
    props.autoplay === true
  ) {
    // https://tutorials.webduino.io/zh-tw/docs/socket/useful/youtube.html
    youtubePlayer.seekTo(0);
  }
  emit('ready', e.target, e);
}
function playerStateChange(e) {
  emit('stateChange', e.target, e);
}
function createPlayer(_videoId, _videoUrl, _el) {
  const videoId = _videoId || props.videoId;
  const videoUrl = _videoUrl || props.videoUrl;
  const el = _el || youtubePlayerEl.value;
  if (window.YT?.Player && (videoId !== '' || videoUrl !== '')) {
    player.value = new window.YT.Player(el, {
      videoId,
      playerVars: props.playerVars,
      events: {
        onReady: playerReady,
        onStateChange: playerStateChange
      }
    });
    window.youTubeIsCreated = true;
  } else if (typeof videoId === 'string' && videoId !== '') {
    setTimeout(() => createPlayer(videoId, videoUrl, el), 500);
  }
}
function init() {
  window.onYouTubeIframeAPIReady = (...arg) => {
    createPlayer(null, null, null, ...arg);
  };
}
watch(
  () => props.videoId,
  (newVideoId) => {
    if (
      (typeof newVideoId !== 'string' || newVideoId === '') &&
      typeof player.value.destroy === 'function'
    ) {
      player.value.destroy();
    } else {
      createPlayer(newVideoId, null, youtubePlayerEl.value);
    }
  }
);
watch(
  () => props.videoUrl,
  (newVideoUrl) => {
    if (
      (typeof newVideoUrl !== 'string' || newVideoUrl === '') &&
      typeof player.value.destroy === 'function'
    ) {
      player.value.destroy();
    } else {
      createPlayer(null, newVideoUrl, youtubePlayerEl.value);
    }
  }
);
onMounted(async () => {
  await nextTick();
  if (import.meta.client) {
    if (document.getElementById('youtube-script') === null) {
      const el = document.createElement('script');
      el.setAttribute('id', 'youtube-script');
      el.setAttribute('src', 'https://www.youtube.com/iframe_api');
      el.setAttribute('async', '');
      el.setAttribute('defer', '');
      document.body.appendChild(el);
      init();
    } else if (props.videoId !== '') {
      if (typeof window.onYouTubeIframeAPIReady === 'function') {
        createPlayer();
        // setTimeout(() => {
        //   // console.log("setTimeout", props.videoId);
        //   createPlayer();
        // }, 500);
      }
    }
  }
});
onUnmounted(() => {
  if (player.value !== null && typeof player.value.destroy === 'function') {
    player.value.destroy();
    delete player.value;
    window.youTubeIsCreated = false;
  }
  // const el = document?.querySelectorAll?.(".youtube-player") || [];
  // if (el.length > 0) {
  //   el.forEach((_el) => {
  //     _el.remove();
  //   });
  // }
});
defineExpose({
  props,
  emit,
  player,
  youtubePlayerEl,
  events,
  playerReady,
  playerStateChange,
  createPlayer,
  init
});
</script>

<style lang="scss">
.youtube {
  width: 100%;
  height: 100%;
  &-player {
    width: 100%;
    height: 100%;
  }
}
</style>