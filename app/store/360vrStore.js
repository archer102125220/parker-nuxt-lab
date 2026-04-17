import { defineStore } from 'pinia';

export const useVrStore = defineStore('360vr_store', {
  state: () => ({
    aframeLoad: false,
    assetList: [],
    isVrArMode: false,
    dialogTrigger: false,
    dialogImg: '',
    dialogTitle: '',
    dialogContent: '',
    dialogWindowTop: '',
    slideTrigger: false,
    slideImgList: [],
    videoTrigger: false,
    videoSrc: '',
    youtubeId: '',
    videoTitle: '',
    vrLoading: false,
    vrSetting: [],
    vrData: {},
  }),
  actions: {
    findVrPageSetting(vrSetting) {
      const route = useRoute();
      if (route.href === '/360vr/matsu-map') {
        return {
          // title: "探索馬祖(Explore Matsu)",
          title: '360vr_item_title',
          route_name: '/360vr/matsu-map',
          zh_title: 'a-frame 測試頁',
          en_title: 'a-frame test page',
        };
      }
      const _vrSetting = vrSetting || this.vrSetting || [];
      let _vrPageSettingSubList;
      let __vrPageSettingSubList;
      const _vrPageSetting =
        _vrSetting.find((_path) => {
          const linkPath = '/vr-engine/' + _path.route_name;
          return (
            linkPath === route.href ||
            (_vrPageSettingSubList = (_path?.list || []).find((subPath) => {
              const subLinkPath = '/vr-engine/' + subPath.route_name;
              return (
                subLinkPath === route.href ||
                (__vrPageSettingSubList = (subPath?.sub_list || []).find(
                  (_subPath) =>
                    '/vr-engine/' + _subPath.route_name === route.href
                ))
              );
            }))
          );
        }) || {};
      return __vrPageSettingSubList || _vrPageSettingSubList || _vrPageSetting;
    },

    setAframeLoad(payload = false) {
      this.aframeLoad = payload;
    },
    putAssetList(payload = []) {
      const assetList = this.assetList;
      this.assetList = assetList.concat(payload);
    },
    setAssetList(payload = []) {
      this.assetList = payload;
    },
    setIsVrArMode(payload = false) {
      this.isVrArMode = payload;
    },
    setDialogTrigger(payload = false) {
      this.dialogTrigger = payload;
    },
    setDialogImg(payload = '') {
      this.dialogImg = payload;
    },
    setDialogTitle(payload = '') {
      this.dialogTitle = payload;
    },
    setDialogContent(payload = '') {
      this.dialogContent = payload;
    },
    setDialogWindowTop(payload = '') {
      this.dialogWindowTop = payload;
    },
    setSlideTrigger(payload = false) {
      this.slideTrigger = payload;
    },
    setSlideImgList(payload = []) {
      this.slideImgList = payload;
    },
    setVideoTrigger(payload = false) {
      this.videoTrigger = payload;
    },
    setVideoSrc(payload = '') {
      this.videoSrc = payload;
    },
    setYoutubeId(payload = '') {
      this.youtubeId = payload;
    },
    setVideoTitle(payload = '') {
      this.videoTitle = payload;
    },
    setVrLoading(payload = false) {
      this.vrLoading = payload;
    },
    setVrSetting(payload = []) {
      this.vrSetting = payload;
    },
    setVrData(payload = {}) {
      this.vrData = payload;
    },
  },
  getters: {
    vrPageSetting() {
      return this.findVrPageSetting(this.vrSetting);
    },
  },
});
