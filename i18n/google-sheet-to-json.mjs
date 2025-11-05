import '@babel/register';

import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { unflatten } from 'flat'
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
      systemName: "Parker's Nuxt lab",
      defaultTitle: "Parker's Nuxt lab",
      titleTemplate: "Parker's Nuxt lab",
      description: "Parker's Nuxt Laboratory"
    },
    $vuetify: vuetifyEn,
  };
  const zhTw = {
    en: '英文',
    ['zh-tw']: '繁體中文',
    system: {
      systemName: "Parker 的 Nuxt實驗室",
      defaultTitle: "Parker 的 Nuxt實驗室",
      titleTemplate: 'Parker 的 Nuxt 實驗室',
      description: "Parker 的 Nuxt實驗室"
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
      face_api: 'face_api測試',
      frontend_cach_api: '前端api快取測試',
      firebase: 'firebase整合測試',
      socket: 'socket測試',
      server_sent_event: 'Server Sent Event測試',
      web_rtc: 'WebRTC測試'
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