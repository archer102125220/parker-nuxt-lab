import '@babel/register';

import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { unflatten } from 'flat';
import fsExtra from 'fs-extra';
import { extractSheets } from 'spreadsheet-to-json';
import vuetifyZhHant from 'vuetify/lib/locale/zh-Hant.mjs';
import vuetifyEn from 'vuetify/lib/locale/en.mjs';

// import credentials from '../google-key/g-key-90f333a85fc9.mjs';
const credentials = {};

const __dirname = dirname(fileURLToPath(import.meta.url));

const I18N_DIR = join(__dirname, './');

const sheetsToExtract = [
  'System',
  'Index',
  'Reserve Room',
  'Follow Player',
  'Latest News',
  'Recommend Store',
  'Login',
  'Sign up',
  'Forgot password',
  'Member information',
  'Reset Password',
  'Member information new phone',
  'Collect stamps',
  'Points',
  'Coupons',
  'Modify registered phone number',
  'Member guide'
];

async function googleSheetToJson() {
  const en = {
    en: 'English',
    ['zh-tw']: 'Chinese',
    system: {
      systemName: 'Parker\'s Nuxt lab',
      defaultTitle: 'Parker\'s Nuxt lab',
      titleTemplate: 'Parker\'s Nuxt lab',
      description: 'Parker\'s Nuxt Laboratory'
    },
    index: {
      about: 'About',
      components: 'Custom components and third-party integrations',
      directives: 'Custom Vue directives',
      route: 'Route-related tests',
      css_drawing: 'CSS drawing tests',
      web_authn: 'Biometric authentication test (native)',
      fido2_lib: 'Biometric authentication test (fido2-lib)',
      web_cam: 'WebCam test',
      face_api: 'face_api test',
      frontend_cach_api: 'Frontend API cache test',
      firebase: 'Firebase integration test',
      socket: 'Socket tests',
      server_sent_event: 'Server-Sent Event tests',
      web_rtc: 'WebRTC tests'
    },
    components: {
      description: {
        span1: 'Custom components are implemented to avoid issues with package compatibility or project fit when using npm tools, so we build components ourselves.',
        span2: 'Others are integrated because no official Vue version exists; we wrap vanilla JS libraries as components.'
      },
      tab: 'Tabs component test',
      scroll_fetch: 'Pull-to-refresh / Infinite scroll test',
      wang_editor: 'WangEditor (HTML editor) test',
      youtube: 'YouTube test',
      components: 'Combined components test (Tabs, Pull-to-refresh / Infinite scroll, WangEditor (HTML editor), YouTube)',
      swiper_js: 'SwiperJs test',
      swiper: 'Custom Swiper test',
      qrcode: 'QR code test',
      slide_in_panel: 'Message queue test',
      switch: 'Switch component test',
      go_top: 'Back to top component test',
      virtual_scroller: 'virtual-scroller component test',
      enter_label: 'Text effect test',
      image_upload: 'Image upload selector test',
      dialog: 'Dialog component',
      drawer: 'Drawer expand/collapse component',
      selector: 'Dropdown selector component'
    },
    css_drawing: {
      description: {
        span1: 'Mainly CSS drawing and anime.js integration tests'
      },
      triangle: 'CSS triangle test',
      triangle_full: 'Fullscreen CSS triangle test',
      triangle_anime: 'Fullscreen CSS triangle animation test',
      hexagon: 'CSS hexagon test',
      svg_color: 'SVG color replacement test'
    },
    directives: {
      description: {
        span1: 'To avoid incompatibility or project mismatch with npm tools, we implement directives ourselves.'
      },
      ripple: 'Custom ripple directive test',
      lazyload: 'Custom lazyload directive test'
    },
    firebase: {
      description: {
        span1: 'Originally implemented in the',
        span2: 'e-Resume',
        span3: 'project, but since that project does not implement PWA or other Service Worker features, this project integrates Service Worker for testing.'
      },
      'cloud_messaging': 'FCM push notification admin'
    },
    route: {
      description: {
        span1: 'Mainly for reproductions and note-taking tests'
      },
      query_back: 'Route query and back navigation test',
      params_back: 'Route params and back navigation test'
    },
    server_sent_event_test: {
      description: {
        span1: 'Test global and route-param grouped Server-Sent Event'
      },
      global_get: 'Server-Sent Event global test',
      global_post: 'Server-Sent Event POST global test',
      room_get: 'Server-Sent Event route param group test',
      room_post: 'Server-Sent Event POST route param group test',
      page: {
        get_data: 'Received data:'
      }
    },
    socket: {
      description: {
        span1: 'Record results of native + Nuxt4 built-in websocket and',
        span2: 'socket.io',
        span3: 'implementations on both frontend and backend'
      },
      warning: 'Current deployment may not support WebSocket (e.g., Vercel), so it may not work',
      socket_io: 'Frontend and backend handled by socket.io',
      websocket: 'Frontend native / backend Nuxt4 built-in',
      page: {
        get_data: 'Received data:'
      }
    },
    web_rtc: {
      description: {
        span1: 'The video feature is basically done, but the detailed flow is incomplete. To test, copy the URL manually.',
        span2: 'WebRTC implementation tests mainly include:'
      },
      socket_io: 'Implemented with socket.io',
      websocket: 'Implemented with frontend native / backend Nuxt4 built-in',
      server_sent_event: 'Implemented with SSE'
    },
    $vuetify: vuetifyEn,
  };
  const zhTw = {
    en: '英文',
    ['zh-tw']: '繁體中文',
    system: {
      systemName: 'Parker 的 Nuxt實驗室',
      defaultTitle: 'Parker 的 Nuxt實驗室',
      titleTemplate: 'Parker 的 Nuxt 實驗室',
      description: 'Parker 的 Nuxt實驗室'
    },
    index: {
      about: '關於本站',
      components: '自製組件及第三方整合組件',
      directives: '自製vue指令',
      route: 'route相關測試',
      css_drawing: 'css繪圖相關測試',
      web_authn: '生物辨識測試（原生）',
      fido2_lib: '生物辨識測試（fido2-lib）',
      web_cam: 'WebCam測試',
      face_api: 'face-api測試',
      frontend_cach_api: '前端api快取測試',
      firebase: 'firebase整合測試',
      socket: 'socket測試',
      server_sent_event: 'Server Sent Event測試',
      web_rtc: 'WebRTC測試'
    },
    components: {
      // description: [
      //   '自製組件主要是為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關components',
      //   '其餘主要是因為該套件並未提供vue版本，因此整合供純js之版本為組件的方式做實作'
      // ]
      description: {
        span1: '自製組件主要是為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關components',
        span2: '其餘主要是因為該套件並未提供vue版本，因此整合供純js之版本為組件的方式做實作'
      },
      tab: 'Tabs組件測試',
      scroll_fetch: '下拉重載/無限滾動測試',
      wang_editor: 'WangEditor（HTML編輯器）測試',
      youtube: 'Youtube測試',
      components: '組件綜合測試（Tabs組件、下拉重載/無限滾動測試、WangEditor（HTML編輯器）、Youtube測試）',
      swiper_js: 'SwiperJs測試',
      swiper: '自製Swiper測試',
      qrcode: 'QRcode測試',
      slide_in_panel: '訊息佇列測試',
      switch: 'switch組件測試',
      go_top: '返回置頂組件測試',
      virtual_scroller: 'virtual-scroller組件測試',
      enter_label: '文字特效測試',
      image_upload: '選擇圖片組件測試',
      dialog: '彈窗組件',
      drawer: '抽屜收展組件',
      selector: '下拉選單組件'
    },
    css_drawing: {
      description: {
        span1: '主要以css繪圖及anime.js整合測試為主',
      },
      triangle: 'css三角形測試',
      triangle_full: 'css三角形滿版測試',
      triangle_anime: 'css三角形滿版動畫測試',
      hexagon: 'css六邊形測試',
      svg_color: 'svg替換顏色測試'
    },
    directives: {
      description: {
        span1: '為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關directives',
      },
      ripple: '自製ripple directive測試',
      lazyload: '自製lazyload directive測試'
    },
    firebase: {
      description: {
        span1: '原本在',
        span2: '電子履歷',
        span3: '中實作並測試的功能，但由於該專案並沒有實作PWA等需要 Service Worker 的功能，因此在此專案嘗試整合 Service Worker 並做測試',
      },
      cloud_messaging: 'FCM推播通知後台',
    },
    route: {
      description: {
        span1: '主要用作複現狀況，篇筆記用途的測試',
      },
      query_back: '路由query與上一頁測試',
      params_back: '路由參數與上一頁測試'
    },
    server_sent_event_test: {
      description: {
        span1: '測試全域及依照route param做分組的 Server-Sent Event',
      },
      global_get: 'Server Sent Event全域測試',
      global_post: 'Server Sent Event Post全域測試',
      room_get: 'Server Sent Event route param分組測試',
      room_post: 'Server Sent Event Post route param分組測試',
      page: {
        get_data: '接收到的data：'
      }
    },
    socket: {
      description: {
        span1: '紀錄原生配合Nuxt4內建的websocket以及前後端皆由',
        span2: 'socket.io',
        span3: '實作的結果',
      },
      warning: '*當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效',
      socket_io: '前後端皆由socket.io做處理',
      websocket: '前端原生/後端Nuxt4內建',
      page: {
        get_data: '接收到的data：'
      }
    },
    web_rtc: {
      description: {
        span1: '目前視訊功能已初步完成，但是詳細的流程尚未完成，若要測試需手動複製網址才能做測試',
        span2: 'WebRTC的實作測試，主要分爲：',
      },
      // warning: '*當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效',
      socket_io: '配合socket.io實作',
      websocket: '配合前端原生/後端Nuxt4內建實作',
      server_sent_event: '配合SSE實作'
    },
    $vuetify: vuetifyZhHant,
  };
  let err;


  try {
    const data = await extractSheets(
      {
        spreadsheetKey: 'fake',
        credentials,
        sheetsToExtract
      },
    );
    sheetsToExtract.forEach(function (_sheetsToExtract) {
      const sheets = data[_sheetsToExtract] || [];
      sheets.forEach(function (_sheets) {
        if (_sheets.key !== null) {
          const key = (_sheetsToExtract + '.' + _sheets.key)
            .replaceAll(/\s/g, '_')
            .toLocaleLowerCase();

          const sheetsZhTw = _sheets['zh-TW'];
          const sheetsEn = _sheets['en-US'];
          const defaultLang = sheetsZhTw || '';
          en[key] = sheetsEn || defaultLang;
          zhTw[key] = sheetsZhTw || defaultLang;
        }
      });
    });
  } catch (error) {
    err = error;
  }

  const output = [
    { lang: en, file: 'locales/en.json' },
    { lang: zhTw, file: 'locales/zh-tw.json' }
  ];
  output.forEach(function (_lang) {
    fsExtra.ensureDirSync(dirname(resolve(I18N_DIR, _lang.file)));
    fsExtra.writeJSONSync(
      resolve(I18N_DIR, _lang.file),
      unflatten(_lang.lang, { object: true }),
      { spaces: 2 }
    );
  });

  if (err) {
    throw err;
  }
}

googleSheetToJson();