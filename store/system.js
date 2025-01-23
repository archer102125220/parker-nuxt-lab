import { defineStore } from 'pinia';

import { getLocalLanguage } from '@/utils/third-party/get-local-language';

const DIALOG_PROPS = {
  hideTitle: true,
  mask: true,
  unmountOnClose: true,
  maskClosable: true,
  hideCancel: true,
  okText: null,
  cancelText: null,
  onbeforeOk: null,
  onbeforeCancel: null
};

export const useSystemStore = defineStore('system', {
  state: () => ({
    _welcomeMsg: true,
    displayTitle: '',
    accessToken: null,
    loading: false,
    messageState: { text: '', type: 'success' },
    cantResendOTPTime: Date.now(),
    _supplierCode: '',
    windowInnerWidth: 1920,
    windowInnerHeight: 1080,
    isMobile: false,
    isTabletOnly: false,
    isTablet: false,
    dialog: {
      trigger: false,
      width: null,
      bgColor: '#fff',
      radius: '4px',
      content: null,
      contentClass: null,
      contentProps: null,
      dialogProps: null
    },
    contactHTML: '',
    _privilegeRole: [],
    _otpCheckCode: ''
  }),
  actions: {
    setAccessToken(payload) {
      this.accessToken = payload;
    },
    setLoading(payload) {
      this.loading = payload;
    },
    setMessageState(payload) {
      this.messageState = payload;
    },
    setCantResendOTPTime(payload, second = 120) {
      const { $dayjs } = useNuxtApp();
      this.cantResendOTPTime = $dayjs(payload).add(second, 'second').valueOf();
    },
    setIsMobile(payload = false) {
      this.isMobile = payload;
    },
    setIsTablet(payload = false) {
      this.isTablet = payload;
    },
    setIsTabletOnly(payload = false) {
      this.isTabletOnly = payload;
    },
    setWindowInnerSize(payload = {}) {
      const {
        width,
        height,
        isMobile = false,
        isTabletOnly = false,
        isTablet = false
      } = payload;
      this.windowInnerWidth = width;
      this.windowInnerHeight = height;
      this.isMobile = isMobile;
      this.isTabletOnly = isTabletOnly;
      this.isTablet = isTablet;
    },
    setDialog(payload = {}) {
      const _payload = {
        trigger: false,
        width: null,
        content: null,
        contentClass: null,
        contentProps: null,
        ...payload
      };
      _payload.dialogProps = { ...DIALOG_PROPS, ..._payload.dialogProps };
      this.dialog = _payload;
    },
    setPrivilegeRole(payload) {
      if (typeof window?.localStorage?.setItem === 'function') {
        localStorage.setItem('systemPrivilegeRole', JSON.stringify(payload));
      }

      this._privilegeRole = payload;
    },
    setContactHTML(payload = '') {
      this.contactHTML = payload;
    },
    setOptCheckCode(payload) {
      if (typeof window?.localStorage?.setItem === 'function') {
        localStorage.setItem('otpCheckCode', payload);
      }

      this._otpCheckCode = payload;
    },
    setDisplayTitle(payload = '') {
      this.displayTitle = payload;
    },
    setWelcomeMsg(payload = false) {
      if (typeof window?.localStorage?.setItem === 'function') {
        localStorage.setItem('systemWelcomeMsg', payload);
      }

      this._welcomeMsg = payload;
    }
  },
  getters: {
    broswerInfo() {
      const broswerInfo = {
        type: '',
        version: '',
        isEdge: false,
        isIe: false,
        isFirefox: false,
        isChrome: false,
        isOpera: false,
        isSafari: false,
        isAndroid: false,
        isIos: false,
        isIphone: false,
        isIpad: false,
        isStandalone: false,
        isDesktop: false,
        isWeiXin: false, // 微信瀏覽器
        notBroswer: typeof window === 'undefined',
      };
      if (typeof window === 'undefined') {
        return broswerInfo;
      }
      const userAgent = (window?.navigator?.userAgent || '').toLowerCase();

      broswerInfo.isDesktop = ['windows nt', 'macintosh', 'x11'].some(keyword => userAgent.includes(keyword));
      broswerInfo.isAndroid = userAgent.includes('android');
      broswerInfo.isIphone = userAgent.includes('iphone');
      broswerInfo.isIpad = userAgent.includes('ipad');
      broswerInfo.isIos = broswerInfo.isIphone || broswerInfo.isIpad;
      broswerInfo.isStandalone = window.navigator?.standalone === true || window.matchMedia?.('(display-mode: standalone)')?.matches === true;

      // /MicroMessenger/i.test
      broswerInfo.isWeiXin = userAgent.includes('micromessenger');

      if (userAgent.match(/edge\/([\d.]+)/)) {
        broswerInfo.type = 'Edge';
        broswerInfo.version = userAgent.match(/edge\/([\d.]+)/)[1];
        broswerInfo.isEdge = true;
      } else if (
        userAgent.match(/rv:([\d.]+)\) like gecko/) ||
        userAgent.match(/msie ([\d.]+)/)
      ) {
        const _version =
          userAgent.match(/rv:([\d.]+)\) like gecko/) ||
          userAgent.match(/msie ([\d.]+)/);

        broswerInfo.type = 'IE';
        broswerInfo.version = _version[1];
        broswerInfo.isIe = true;
      } else if (userAgent.match(/firefox\/([\d.]+)/)) {
        broswerInfo.type = 'Firefox';
        broswerInfo.version = userAgent.match(/firefox\/([\d.]+)/)[1];
        broswerInfo.isFirefox = true;
      } else if (userAgent.match(/chrome\/([\d.]+)/)) {
        broswerInfo.type = 'Chrome';
        broswerInfo.version = userAgent.match(/chrome\/([\d.]+)/)[1];
        broswerInfo.isChrome = true;
      } else if (userAgent.match(/opera.([\d.]+)/)) {
        broswerInfo.type = 'Opera';
        broswerInfo.version = userAgent.match(/opera.([\d.]+)/)[1];
        broswerInfo.isOpera = true;
      } else if (userAgent.match(/version\/([\d.]+).*safari/)) {
        broswerInfo.type = 'Safari';
        broswerInfo.version = userAgent.match(/version\/([\d.]+).*safari/)[1];
        broswerInfo.isSafari = true;
      }

      return broswerInfo;
    },
    localLanguage() {
      const { $i18n } = useNuxtApp();
      return getLocalLanguage($i18n?.local?.value);
    },
    privilegeRole() {
      const localPrivilegeRole =
        (typeof window?.localStorage?.getItem === 'function' &&
          localStorage.getItem('systemPrivilegeRole')) ||
        '{}';

      let privilegeRole = this._privilegeRole;
      if (
        (Array.isArray(privilegeRole) === false || privilegeRole.length <= 0) &&
        localPrivilegeRole !== '{}'
      ) {
        privilegeRole = JSON.parse(localPrivilegeRole);
        this._privilegeRole = privilegeRole;
      }
      return privilegeRole;
    },
    otpCheckCode() {
      const localOptCheckCode =
        (typeof window?.localStorage?.getItem === 'function' &&
          localStorage.getItem('otpCheckCode')) ||
        '';
      let otpCheckCode = this._otpCheckCode;
      if (otpCheckCode === '' && localOptCheckCode !== otpCheckCode) {
        otpCheckCode = localOptCheckCode;
        this._token = otpCheckCode;
      }
      return otpCheckCode;
    },
    supplierCode() {
      const { $store } = useNuxtApp();
      const route = useRoute();
      const merchantBranchList = $store.user.merchantBranchList || [];
      const merchantBranchLinkId = merchantBranchList[0]?.linkId || '';
      let supplierCode =
        route.params.supplier_code ||
        this._supplierCode ||
        merchantBranchLinkId ||
        '';

      if (this.privilegeRole._authType === 'staff') {
        supplierCode = 'staff';
      }
      if (typeof supplierCode === 'string' && supplierCode !== '') {
        supplierCode = `/${supplierCode}`;
      }
      return supplierCode;
    },
    welcomeMsg() {
      const localWelcomeMsg =
        ((typeof window?.localStorage?.getItem === 'function' &&
          localStorage.getItem('systemWelcomeMsg')) ||
          'true') === 'true';

      let welcomeMsg = this._welcomeMsg;
      if (typeof localWelcomeMsg === 'boolean') {
        welcomeMsg = localWelcomeMsg;
        this._welcomeMsg = welcomeMsg;
      }
      return welcomeMsg;
    }
  }
});