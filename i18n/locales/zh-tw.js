// Import Univer specific locales
import univerCustomZhTw from '../../app/utils/third-party/univer/i18n/zh-TW.js';

export const zhTw = {
  en: '英文',
  'zh-tw': '繁體中文',
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
    face_swap: 'AI 換臉 測試',
    frontend_cach_api: '前端api快取測試',
    firebase: 'firebase整合測試',
    socket: 'socket測試',
    server_sent_event: 'Server Sent Event測試',
    web_rtc: 'WebRTC測試',
    swagger_doc: 'Swagger API 文檔',
    indexeddb_demo: 'IndexedDB ORM 展示',
    virtual_reality: '虛擬實境實驗室',
    notes: 'Notion 筆記',
    animation: '動畫效果展示',
    office_tool: '辦公工具'
  },
  office_tool_page: {
    hero: {
      title: '辦公工具 (Office Tools)',
      description: '探索不同的文件、試算表與 PDF 實作方式。'
    },
    categories: {
      doc: '文件 (Doc)',
      sheet: '試算表 (Sheet)',
      pdf: 'PDF'
    },
    items: {
      collabora_doc: {
        title: 'Collabora Doc',
        desc: '使用 Collabora 進行協作文件編輯。'
      },
      syncfusion_doc: {
        title: 'Syncfusion Doc',
        desc: '由 Syncfusion 提供的文件編輯器。'
      },
      tiptap_doc: {
        title: 'Tiptap Doc',
        desc: '使用 Tiptap 的富文本文件編輯。'
      },
      univer_doc: {
        title: 'Univer Doc',
        desc: '由 Univer 提供的文件編輯功能。'
      },
      collabora_sheet: {
        title: 'Collabora Sheet',
        desc: '使用 Collabora 進行協作試算表編輯。'
      },
      syncfusion_sheet: {
        title: 'Syncfusion Sheet',
        desc: '由 Syncfusion 提供的試算表編輯器。'
      },
      univer_sheet: {
        title: 'Univer Sheet',
        desc: '由 Univer 提供的試算表功能。'
      },
      pdf_reader: {
        title: 'PDF.js 閱讀器',
        desc: '使用 PDF.js 整合的 PDF 閱讀與互動功能。'
      }
    }
  },
  collabora_doc_page: {
    title: 'Collabora Doc 編輯器',
    description:
      '礙於本專案目前部署環境為 Vercel（Serverless Functions），而 Collabora 需要 Docker 啟動主要編輯檔案的服務，因此本示範僅能在本機 Docker 環境下展示。',
    docker_btn: 'Collabora Docker'
  },
  collabora_sheet_page: {
    title: 'Collabora Sheet 編輯器',
    description:
      '礙於本專案目前部署環境為 Vercel（Serverless Functions），而 Collabora 需要 Docker 啟動主要編輯檔案的服務，因此本示範僅能在本機 Docker 環境下展示。',
    docker_btn: 'Collabora Docker'
  },
  home: {
    hero: {
      subtitle: '探索 Nuxt 4 的無限可能',
      description:
        '一個以 Nuxt 4 為核心的實驗型專案，整合 PWA、即時通訊、AI/ML、完整測試套件等現代化前後端技術',
      cta_explore: '開始探索',
      cta_about: '了解更多'
    },
    features: {
      title: '核心特色',
      pwa: {
        title: 'PWA 支援',
        description:
          '完整的漸進式網頁應用支援，包含 Service Worker、離線快取、推播通知等功能'
      },
      realtime: {
        title: '即時通訊',
        description:
          '整合 WebRTC、Socket.IO、WebSocket 和 Server-Sent Events 等多種即時通訊技術'
      },
      ai: {
        title: 'AI/ML 整合',
        description:
          '整合 face-api.js、TensorFlow.js 等機器學習框架，實現人臉辨識、換臉等 AI 功能'
      },
      testing: {
        title: '完整測試',
        description: '使用 Playwright 進行 E2E 測試，確保專案品質與穩定性'
      }
    },
    navigation: {
      title: '功能導覽'
    },
    nav: {
      about_desc: '了解專案的技術架構、使用的技術棧和開發理念',
      components_desc: '探索自製組件和第三方整合組件的實作範例',
      directives_desc: '查看自製 Vue 指令的實作和使用方式',
      route_desc: '測試 Nuxt 路由相關功能和特性',
      css_drawing_desc: '使用 CSS 和動畫庫創作的視覺效果展示',
      web_authn_desc: '原生 WebAuthn API 的生物辨識實作',
      fido2_lib_desc: '使用 fido2-lib 實作的生物辨識功能',
      web_cam_desc: 'WebCam 視訊串流的應用測試',
      face_api_desc: 'face-api.js 人臉辨識功能展示',
      frontend_cach_api_desc: '前端 API 快取策略的實作與測試',
      firebase_desc: 'Firebase 服務整合，包含 Cloud Messaging 推播通知',
      socket_desc: 'Socket.IO 和 WebSocket 即時通訊測試',
      server_sent_event_desc: 'Server-Sent Events 單向即時通訊實作',
      web_rtc_desc: 'WebRTC 點對點視訊通話功能測試',
      face_swap_desc: 'AI 人臉交換技術的實作展示',
      swagger_doc_desc: '使用 Swagger UI 展示 Nuxt Server API 的完整文檔',
      indexeddb_demo_desc: '自製 IndexedDB ORM 工具的功能展示與測試',
      virtual_reality_desc: '探索 WebVR 和 WebXR，包含全景圖與 3D 虛擬視覺展示',
      notes_desc: '日常工作與私下研究的 SEO 及技術實戰紀錄',
      animation_desc: '各種動畫效果與功能展示',
      office_tool_desc: '探索不同的文件、試算表與 PDF 實作工具',
      read_on_notion: '在 Notion 閱讀'
    },
    stats: {
      components: '組件數量',
      pages: '頁面數量',
      features: '功能模組',
      tests: '測試案例'
    }
  },
  virtual_reality: {
    title: '虛擬實境',
    subtitle: 'WebVR 與 WebXR 實驗項目',
    aframe_demo: 'A-Frame 展示',
    aframe_desc: '使用 A-Frame 框架構建的 3D 與 WebVR 體驗。',
    krpano_demo: 'Krpano 展示',
    krpano_desc: '使用 Krpano 實現互動式 360° 全景圖導覽的展示。'
  },
  notes_page: {
    hero: {
      title: 'Notion 筆記',
      description: '日常工作與私下研究的實戰紀錄'
    },
    seo: {
      title: 'Notion 筆記 - Parker Nuxt Lab',
      description: '日常工作與私下研究的實戰紀錄，包含 SEO 與其他技術筆記。'
    },
    read_on_notion: '在 Notion 閱讀'
  },
  about: {
    hero: {
      title: '關於本站',
      subtitle: '探索 Nuxt 4 的實驗性專案',
      description: '一個專注於現代化前端技術探索與實踐的實驗室'
    },
    overview: {
      title: '專案概述',
      intro:
        'Parker 的 Nuxt 實驗室是一個以 Nuxt 4 為核心的實驗型專案，旨在探索和實踐現代化的前後端技術。',
      purpose:
        '本專案的主要目的是測試和整合各種前沿技術，包括 PWA、即時通訊、AI/ML 等，並建立一套完整的開發實踐範例。',
      features:
        '透過自製組件和第三方整合，我們打造了一個功能豐富、架構清晰的技術展示平台。',
      view_source: '查看 GitHub 原始碼',
      view_nextjs: '查看 Next.js 版本'
    },
    tech_stack: {
      title: '技術棧',
      frontend: {
        title: '前端技術',
        items: ['Nuxt 4', 'Vue 3', 'Vuetify 3', 'TypeScript', 'SCSS']
      },
      backend: {
        title: '後端技術',
        items: ['Nuxt Server', 'H3', 'Nitro', 'Node.js']
      },
      tools: {
        title: '開發工具',
        items: ['Vite', 'Playwright', 'ESLint', 'Git']
      },
      features_tech: {
        title: '特色功能',
        items: ['PWA', 'i18n', 'WebRTC', 'Socket.IO', 'face-api.js']
      }
    },
    features: {
      title: '核心功能',
      pwa: {
        title: 'PWA 支援',
        description:
          '完整的漸進式網頁應用支援，包含 Service Worker、離線快取、推播通知等功能'
      },
      realtime: {
        title: '即時通訊',
        description:
          '整合 WebRTC、Socket.IO、WebSocket 和 Server-Sent Events 等多種即時通訊技術'
      },
      ai: {
        title: 'AI/ML 整合',
        description:
          '整合 face-api.js、TensorFlow.js 等機器學習框架，實現人臉辨識、換臉等 AI 功能'
      },
      testing: {
        title: '完整測試',
        description: '使用 Playwright 進行 E2E 測試，確保專案品質與穩定性'
      },
      components: {
        title: '自製組件',
        description:
          '為避免套件相容性問題，自行實作多個常用組件，確保專案的穩定性和可控性'
      },
      i18n: {
        title: '國際化',
        description: '完整的多語言支援，提供繁體中文和英文介面'
      }
    },
    development: {
      title: '開發理念',
      philosophy:
        '本專案秉持「實驗、學習、分享」的理念，透過實作來深入理解各種技術的運作原理。',
      approach:
        '我們重視程式碼品質、使用者體驗和技術創新，持續探索前端開發的最佳實踐。',
      design_credit: '網站美術設計由 AI 輔助完成，所有功能實作皆為原創開發。'
    }
  },
  components_page: {
    hero: {
      title: '組件展示',
      subtitle: '自製組件與第三方整合',
      description:
        '為避免套件相容性問題，自行實作多個常用組件，確保專案的穩定性和可控性'
    },
    categories: {
      ui: 'UI 組件',
      functional: '功能組件',
      integration: '第三方整合',
      combined: '綜合測試'
    },
    intro: {
      custom:
        '自製組件主要是為避免因套件版本相容性或專案性質不合適使用 npm 上相關工具之狀況，因此自己實作相關組件。',
      integration:
        '第三方整合主要是因為該套件並未提供 Vue 版本，因此整合純 JS 版本為組件的方式做實作。'
    }
  },
  directives_page: {
    hero: {
      title: '自製指令',
      subtitle: 'Vue 自訂指令展示',
      description:
        '為避免套件相容性問題，自行實作常用的 Vue 指令，提供更靈活的 DOM 操作能力'
    },
    intro:
      '自製 Vue 指令主要是為了避免因套件版本相容性或專案性質不合適使用 npm 上相關工具之狀況，因此自己實作相關指令。'
  },
  route_page: {
    hero: {
      title: '路由測試',
      subtitle: 'Nuxt 路由功能測試',
      description: '用於複現特定路由狀況，作為筆記用途的測試頁面'
    },
    intro:
      '主要用作複現路由相關狀況，包含 query 參數、params 參數與上一頁導航等功能測試。'
  },
  query_back_test_page: {
    hero: {
      title: 'Query 參數測試',
      subtitle: '路由 Query 參數與上一頁導航',
      description: '測試路由的 query 參數變化與瀏覽器歷史紀錄行為'
    }
  },
  params_back_test_page: {
    hero: {
      title: 'Params 參數測試',
      subtitle: '路由 Params 參數與上一頁導航',
      description: '測試路由的動態 params 參數變化與瀏覽器歷史紀錄行為'
    }
  },
  css_drawing_page: {
    hero: {
      title: 'CSS 繪圖',
      subtitle: 'CSS 繪圖與 Anime.js 整合',
      description: '以 CSS 繪圖技術與 Anime.js 動畫庫整合為主的測試頁面'
    },
    intro:
      '主要以 CSS 繪圖及 Anime.js 整合測試為主，包含三角形、六邊形等幾何圖形繪製與動畫效果。'
  },
  triangle_test_page: {
    hero: {
      title: 'CSS 三角形測試',
      subtitle: 'CSS Border 繪製三角形展示',
      description: '使用 CSS border 屬性繪製各種方向的三角形'
    }
  },
  triangle_full_test_page: {
    hero: {
      title: 'CSS 三角形滿版測試',
      subtitle: 'CSS 全螢幕三角形展示',
      description: '測試 CSS 三角形在滿版布局中的應用'
    }
  },
  triangle_anime_test_page: {
    hero: {
      title: 'CSS 三角形動畫測試',
      subtitle: 'CSS 三角形動畫效果展示',
      description: '測試 CSS 三角形搭配動畫的效果'
    }
  },
  hexagon_test_page: {
    hero: {
      title: 'CSS 六邊形測試',
      subtitle: 'CSS 六邊形繪製展示',
      description: '使用 CSS 繪製六邊形圖形'
    }
  },
  svg_color_change_page: {
    hero: {
      title: 'SVG 變色測試',
      subtitle: 'SVG 動態變色展示',
      description: '測試 SVG 圖片的動態變色效果'
    }
  },
  socket_test_page: {
    hero: {
      title: 'Socket 測試',
      subtitle: 'WebSocket 與 Socket.IO 測試',
      description:
        '紀錄原生 WebSocket 配合 Nuxt 4 內建功能，以及前後端皆由 Socket.IO 實作的結果'
    },
    intro:
      '紀錄原生配合 Nuxt 4 內建的 WebSocket 以及前後端皆由 Socket.IO 實作的結果。',
    warning:
      '當前部署環境可能不支援 WebSocket（如：Vercel 等部署平台），可能會無效。'
  },
  socket_io_page: {
    hero: {
      title: 'Socket.IO 測試',
      subtitle: 'Socket.IO 雙向通訊測試',
      description: '使用 Socket.IO 實現前後端即時雙向通訊'
    }
  },
  websocket_page: {
    hero: {
      title: '原生 WebSocket 測試',
      subtitle: 'Nuxt 4 內建 WebSocket 測試',
      description: '使用 Nuxt 4 內建的 WebSocket 功能進行原生通訊測試'
    }
  },
  sse_page: {
    hero: {
      title: 'Server-Sent Events 測試',
      subtitle: 'SSE 即時推送測試',
      description: '測試全域及依照 route param 做分組的 Server-Sent Events 功能'
    },
    intro:
      '測試全域及依照 route param 做分組的 Server-Sent Events，包含 GET 與 POST 方法。'
  },
  sse_global_get_page: {
    hero: {
      title: 'SSE 全域接收 (GET)',
      subtitle: '使用 GET 方法接收 Server-Sent Events',
      description: '測試使用 EventSource 標準 API 接收全域 SSE 事件'
    }
  },
  sse_global_post_page: {
    hero: {
      title: 'SSE 全域接收 (POST)',
      subtitle: '使用 POST 方法接收 Server-Sent Events',
      description: '測試使用自訂 POST EventSource 接收全域 SSE 事件'
    }
  },
  sse_room_get_page: {
    hero: {
      title: 'SSE 房間接收 (GET)',
      subtitle: '使用 GET 方法接收房間內 SSE',
      description: '依據 Route Param 分組的 SSE 接收測試'
    }
  },
  sse_room_post_page: {
    hero: {
      title: 'SSE 房間接收 (POST)',
      subtitle: '使用 POST 方法接收房間內 SSE',
      description: '依據 Route Param 分組的 SSE POST 接收測試'
    }
  },
  web_rtc_page: {
    hero: {
      title: 'WebRTC 測試',
      subtitle: 'WebRTC 即時視訊通訊測試',
      description:
        'WebRTC 的實作測試，配合不同的信令傳輸方式（Socket.IO、WebSocket、SSE）'
    },
    intro:
      'WebRTC 的實作測試，主要分為配合 Socket.IO、WebSocket 和 Server-Sent Events 三種信令傳輸方式。',
    note: '目前視訊功能已初步完成，但是詳細的流程尚未完成，若要測試需手動複製網址才能做測試。'
  },
  web_rtc_socket_io_page: {
    hero: {
      title: 'WebRTC + Socket.IO',
      subtitle: '使用 Socket.IO 作為信令傳輸',
      description: '透過 Socket.IO 實現 WebRTC 點對點視訊通訊的信令交換'
    },
    room: {
      title: '視訊聊天室',
      current_id: '目前配對 ID',
      copy_id: '複製 ID',
      copy_url: '複製連結',
      copied: '已複製!',
      your_video: '您的視訊',
      remote_video: '對方視訊',
      waiting: '等待對方加入...'
    }
  },
  web_rtc_websocket_page: {
    hero: {
      title: 'WebRTC + WebSocket',
      subtitle: '使用原生 WebSocket 作為信令傳輸',
      description: '透過 Nuxt 4 內建的 WebSocket 功能實現 WebRTC 信令交換'
    },
    room: {
      title: '視訊聊天室'
    }
  },
  web_rtc_sse_page: {
    hero: {
      title: 'WebRTC + SSE',
      subtitle: '使用 Server-Sent Events 作為信令傳輸',
      description: '透過 Server-Sent Events 配合 POST 請求實現 WebRTC 信令交換'
    },
    room: {
      title: '視訊聊天室'
    }
  },
  firebase_page: {
    hero: {
      title: 'Firebase 整合',
      subtitle: 'Firebase 雲端服務整合測試',
      description:
        '整合 Firebase 雲端服務，包含 FCM 推播通知、Service Worker 等功能測試'
    },
    intro:
      '原本在電子履歷中實作並測試的功能，但由於該專案並沒有實作 PWA 等需要 Service Worker 的功能，因此在此專案嘗試整合 Service Worker 並做測試。'
  },
  face_swap_page: {
    hero: {
      title: 'AI 人臉替換',
      subtitle: 'AI 人臉識別與替換技術',
      description:
        '使用 AI 技術實現人臉識別與替換功能，提供前端與後端兩種實作版本'
    },
    intro:
      '使用 face-api.js 和 AI 模型實現人臉識別與替換功能，提供純前端與後端 AI 兩種實作方式。',
    section_title: '選擇實作版本',
    serverless_notice: {
      title: 'Serverless 環境限制',
      text: '目前網站部署於 Vercel Serverless 環境，後端 AI 版本需要長時間執行的運算資源，無法在 Serverless 環境中正常運作。如需體驗完整功能，請在本地環境執行此專案。'
    },
    versions: {
      frontend: '純前端版本 - 使用 face-api.js + Canvas 實現',
      backend: '後端 AI 版本 - 使用 Node.js 後端 + AI 模型'
    },
    badges: {
      unavailable: '無法使用',
      developing: '開發中'
    }
  },
  swagger_doc_page: {
    hero: {
      title: 'Swagger API 文檔',
      subtitle: 'API 文檔互動式查詢介面',
      description:
        '使用 Swagger UI 展示 Nuxt Server API 的完整文檔，支援互動式測試和查詢'
    },
    intro:
      '此頁面展示 Nuxt Server API 的 Swagger 文檔，您可以直接在此查看 API 端點、參數和回應格式，並進行互動式測試。'
  },
  offline_page: {
    hero: {
      title: '離線模式測試',
      subtitle: '網路狀態偵測與離線處理',
      description: '測試網站在離線狀態下的表現，包含網路狀態偵測和自動重連功能'
    },
    intro:
      '此頁面用於測試網站的離線功能，系統會自動偵測網路狀態變化，並顯示相應的提示訊息。'
  },
  web_cam_page: {
    hero: {
      title: 'WebCam 測試',
      subtitle: '網頁攝影機視訊串流測試',
      description: '測試網頁攝影機 API，包含視訊串流擷取和 Canvas 繪製功能'
    },
    intro:
      '此頁面用於測試網頁攝影機功能，系統會自動請求攝影機權限，並將視訊串流顯示在 Canvas 上。',
    permission_required: '需要攝影機權限',
    permission_desc: '請允許瀏覽器存取您的攝影機以顯示視訊串流。'
  },
  frontend_api_cache_page: {
    hero: {
      title: '前端 API 快取測試',
      subtitle: 'API 快取策略與效能測試',
      description:
        '測試前端 API 快取功能，包含內存快取和 Service Worker 快取策略'
    },
    intro:
      '此頁面用於測試前端 API 快取功能，您可以測試不同的快取策略並比較效能差異。',
    pwa_note: '漸進式網頁（Progressive Web Apps，PWA）記錄筆記：',
    notion_link: 'notion筆記連結',
    form: {
      get_param: 'GET參數',
      post_param: 'POST參數',
      use_post: '使用HTTP POST',
      use_get: '使用HTTP GET',
      enable_cache: '啟用快取(同時使用情況下優先生效)',
      enable_sw_cache:
        '啟用ServiceWorker快取(只適用production模式底下的HTTP GET方法)',
      test_button: '測試'
    },
    results: {
      time_label: '耗時約：',
      time_unit: 'ms',
      response_label: '回傳值：'
    }
  },
  web_authn_page: {
    hero: {
      title: 'Web Authn 生物辨識測試',
      subtitle: '原生 Web Authentication API 實作',
      description:
        '使用原生 Web Authentication API 進行生物辨識認證，支援指紋、臉部識別等多種認證方式'
    },
    intro:
      '此頁面使用原生 Web Authentication API 實作生物辨識功能，支援註冊和登入流程。',
    note_label: '記錄筆記：',
    notion_link: 'notion筆記連結',
    register: {
      title: '向伺服器註冊生物辨識資料',
      id_label: 'ID',
      account_label: '帳號',
      name_label: '名稱',
      submit_button: '註冊',
      webapi_output: 'Web Authn 回傳：',
      server_output: '伺服端回傳：'
    },
    login: {
      title: '執行身份驗證',
      account_label: '帳號',
      submit_button: '驗證',
      webapi_output: 'Web Authn 回傳：',
      server_output: '伺服端回傳：'
    }
  },
  fido2_lib_page: {
    hero: {
      title: 'FIDO2 Lib 生物辨識測試',
      subtitle: '使用 fido2-lib 套件實作',
      description:
        '使用 fido2-lib 套件進行生物辨識認證，支援指紋、臉部識別等多種認證方式'
    },
    intro: '此頁面使用 fido2-lib 套件實作生物辨識功能，支援註冊和登入流程。',
    note_label: '記錄筆記：',
    notion_link: 'notion筆記連結',
    register: {
      title: '向伺服器註冊生物辨識資料',
      id_label: 'ID',
      account_label: '帳號',
      name_label: '名稱',
      submit_button: '註冊',
      webapi_output: 'Web Authn 回傳：',
      server_output: '伺服端回傳：'
    },
    login: {
      title: '執行身份驗證',
      saved_account_label: '模擬伺服器已儲存的帳號',
      remember_me_label: '模擬啟用“記住我”的登入(手機強制啟用)',
      submit_button: '驗證',
      webapi_output: 'Web Authn 回傳：',
      server_output: '伺服端回傳：'
    }
  },
  face_api_page: {
    hero: {
      title: 'Face API 人臉辨識測試',
      subtitle: 'face-api.js 人臉辨識功能展示',
      description:
        '使用 face-api.js 進行人臉偵測、特徵點識別、表情分析及人臉比對'
    },
    intro:
      '此頁面展示 face-api.js 的各種人臉辨識功能，包含即時人臉偵測、特徵點識別、表情分析及人臉比對。',
    form: {
      upload_label: '點擊或拖拉識別照片到此區塊',
      upload_button: '選取辨識照片',
      upload_mask: '拖拉識別照片到此區塊',
      submit_button: '辨識',
      similarity_label: '近似值：',
      same_person: '相同人',
      different_person: '不同人'
    },
    sections: {
      video_preview: '即時視訊預覽',
      bounding_boxes: '人臉邊界框偵測',
      landmarks: '人臉特徵點識別',
      expressions: '人臉表情分析'
    },
    data: {
      bounding_boxes: '邊界框資料',
      landmarks: '特徵點資料',
      expressions: '表情分析資料'
    }
  },
  face_swap_frontend: {
    hero: {
      title: '純前端人臉替換',
      subtitle: '使用瀏覽器端 face-api.js 進行即時人臉替換',
      description: '此功能完全在前端運行，不需要後端伺服器支援'
    },
    tip: {
      title: '使用提示：',
      content:
        '為獲得最佳效果，建議來源照片的尺寸與目標畫面相近。如需處理不同尺寸的圖片，請使用「後端 AI 人臉替換」功能。'
    },
    sections: {
      source: '來源臉部',
      target: '目標畫面',
      result: '替換結果'
    },
    upload: {
      button: '選取來源照片',
      label: '點擊或拖拉來源照片到此區塊',
      mask: '拖拉來源照片到此區塊'
    },
    buttons: {
      swap: '執行替換',
      reset: '重置',
      download: '下載結果'
    },
    size_warning: {
      title: '圖片尺寸可能不適合',
      content: '建議使用與攝影機相近的尺寸（約 640x480）以獲得最佳效果。'
    },
    panels: {
      detection: '人臉偵測詳細資訊',
      landmarks: '臉部特徵點 (Landmarks)',
      expressions: '表情辨識結果'
    },
    status: {
      detecting: '正在偵測人臉...',
      swapping: '正在執行人臉替換...',
      success: '人臉替換完成！',
      downloaded: '圖片已下載',
      no_source: '請先上傳來源照片並確認攝影機已啟動',
      no_source_face: '無法在來源照片中偵測到人臉',
      no_target_face: '無法在攝影機畫面中偵測到人臉',
      error: '人臉替換失敗'
    }
  },
  face_swap_backend: {
    hero: {
      title: '後端 AI 人臉替換',
      subtitle: '使用後端 AI 服務進行高品質人臉替換',
      description: '支援不同尺寸的圖片，提供更精確的人臉替換效果'
    },
    sections: {
      source: '來源照片',
      target: '目標照片',
      result: '替換結果'
    },
    upload: {
      source_button: '選取來源照片',
      source_label: '點擊或拖拉來源照片到此區塊',
      target_button: '選取目標照片',
      target_label: '點擊或拖拉目標照片到此區塊'
    },
    buttons: {
      swap: '執行替換',
      reset: '重置',
      download: '下載結果'
    },
    status: {
      uploading: '正在上傳圖片...',
      processing: '正在處理中，請稍候...',
      success: '人臉替換完成！',
      error: '處理失敗',
      error_fallback: '人臉替換處理失敗',
      no_source: '請先上傳來源照片和目標照片',
      downloaded: '圖片已下載'
    },
    tech_info: {
      title: '技術說明',
      detection: '伺服器端人臉偵測',
      processing: '伺服器端圖片處理'
    }
  },
  cloud_messaging_page: {
    hero: {
      title: 'Firebase Cloud Messaging',
      subtitle: '推播通知後台管理',
      description: '管理推播 tokens 並發送通知訊息到已註冊的裝置'
    },
    intro:
      '需等待 PWA 安裝完成才會觸發通知權限請求流程，同意後才能正常觸發通知功能。',
    form: {
      title_label: '推播標題',
      message_label: '推播訊息',
      image_label: '推播圖片網址',
      reset: '重置',
      submit: '送出',
      title_error: '請檢查推播標題',
      message_error: '請檢查推播訊息'
    },
    table: {
      os: '作業系統',
      token: 'Token',
      action: '操作',
      delete: '刪除',
      refresh: '重新整理',
      no_data: '暫無資料',
      no_data_hint: '請稍後再試'
    },
    status: {
      success:
        '執行完畢，成功向 {success} 份裝置發送推播訊息，{failure} 份裝置發送失敗',
      delete_success: '刪除成功',
      delete_error: '刪除失敗'
    }
  },
  dialog_page: {
    hero: {
      title: '彈窗組件測試',
      subtitle: '自製 Dialog 組件展示',
      description: '測試自製彈窗組件與 Vuetify Dialog 的比較'
    },
    buttons: {
      open: '開啟',
      vuetify_dialog: 'Vuetify Dialog 對照'
    }
  },
  drawer_page: {
    hero: {
      title: '抽屜組件測試',
      subtitle: '自製 Drawer 組件展示',
      description: '測試自製側邊抽屜組件功能'
    },
    buttons: {
      left: '左側',
      right: '右側',
      top: '頂部',
      bottom: '底部'
    }
  },
  slide_in_panel_page: {
    hero: {
      title: '滑入面板組件測試',
      subtitle: '自製 Slide-in Panel 組件展示',
      description: '測試自製滑入側邊面板組件功能'
    },
    describe: {
      text: '為了避免公司專案上的套件衝突，因此手刻一版訊息佇列',
      strikethrough: '我也想既優雅又輕鬆愜意的使用套件，但現實不允許'
    },
    buttons: {
      left: '左側',
      right: '右側'
    }
  },
  image_upload_page: {
    hero: {
      title: '圖片上傳組件測試',
      subtitle: '自製 ImageUpload 組件展示',
      description: '測試圖片上傳組件功能，支援拖拉上傳與預覽'
    }
  },
  phone_input_page: {
    hero: {
      title: '電話號碼輸入組件',
      subtitle: '帶國碼選擇器的電話輸入組件',
      description: '使用 flag-icons 顯示國旗，支援多國國碼選擇'
    }
  },
  selector_page: {
    hero: {
      title: '下拉選擇器測試',
      subtitle: '自製 Selector 組件展示',
      description: '測試自製下拉選擇器組件功能'
    }
  },
  lazyload_test_page: {
    hero: {
      title: '自製 Lazyload 指令測試',
      subtitle: '自製圖片懶加載指令展示',
      description: '測試自製 v-customize-lazyload 指令功能'
    }
  },
  ripple_test_page: {
    hero: {
      title: '自製 Ripple 指令測試',
      subtitle: '自製點擊波紋效果指令展示',
      description: '測試自製 v-customize-ripple 指令功能'
    },
    click_me: '點擊我測試自製的 ripple 效果'
  },
  go_top_page: {
    hero: {
      title: '返回置頂組件測試',
      subtitle: '自製 GoTop 組件展示',
      description: '測試自製返回頂部按鈕組件功能'
    },
    scroll_hint: '請向下滾動以查看返回頂部按鈕'
  },
  switch_button_page: {
    hero: {
      title: 'Switch 組件測試',
      subtitle: '自製開關按鈕組件展示',
      description: '測試自製開關切換按鈕組件功能'
    },
    current_value: '目前狀態',
    label: '僅直播'
  },
  enter_label_page: {
    hero: {
      title: '文字特效測試',
      subtitle: '自製動畫文字組件展示',
      description: '測試自製文字逐字進入動畫特效'
    },
    demo_title: '展示',
    test_title: '測試文字',
    update: '更新'
  },
  waving_image_page: {
    hero: {
      title: '圖片波浪特效測試',
      subtitle: '自製 Waving Image 組件展示',
      description: '測試圖片加上波浪變形動畫效果'
    },
    controls: '參數調整',
    amplitude: '震幅 (Amplitude)',
    period: '週期數 (Period)',
    frequency: '頻率 (Frequency)',
    fps: '每秒幀數 (FPS)',
    direction: '方向 (Direction)',
    direction_horizontal: '水平',
    direction_vertical: '垂直'
  },
  qr_code_page: {
    hero: {
      title: 'QR Code 組件測試',
      subtitle: '自製 QR Code 組件展示',
      description: '測試自製 QR Code 生成器組件功能'
    },
    input_label: '輸入 QR Code 內容'
  },
  skeleton_loader_page: {
    hero: {
      title: 'Skeleton 組件測試',
      subtitle: '自製骨架屏載入器展示',
      description: '測試自製骨架屏載入器組件功能'
    },
    toggle_loading: '開啟載入中狀態',
    loaded_content: '載入完成區塊'
  },
  countdown_page: {
    hero: {
      title: '倒數計時組件測試',
      subtitle: '自製翻頁式倒數計時器展示',
      description: '測試自製翻頁式倒數計時器組件功能'
    }
  },
  virtual_scroller_page: {
    hero: {
      title: 'Virtual Scroller 組件測試',
      subtitle: 'Vuetify 虛擬滾動組件展示',
      description: '測試 Vuetify v-virtual-scroll 組件高效渲染大量數據'
    },
    describe: {
      text: '測試不同大小的 item 是否能正常顯示'
    }
  },
  youtube_test_page: {
    hero: {
      title: 'YouTube 整合測試',
      subtitle: '自製 YouTube 播放器組件展示',
      description: '測試自製 YouTube 嵌入式播放器組件'
    },
    describe: {
      text: '將 YouTube iframe 嵌入封裝成組件，便於統一管理與調整樣式'
    }
  },
  swiper_test_page: {
    hero: {
      title: '自製 Swiper 測試',
      subtitle: '自製輪播圖組件展示',
      description: '測試自製觸控滑動輪播圖組件'
    },
    describe: {
      text: '為了避免公司專案上的套件衝突，因此手刻一版輪播圖',
      strikethrough: '我也想既優雅又輕鬆愜意的使用套件，但現實不允許'
    },
    demo: {
      current_slide: '當前幻燈片',
      basic: {
        title: '基本滑動',
        description: '使用手指或滑鼠拖動切換幻燈片'
      },
      navigation: {
        title: '導航按鈕',
        description: '使用 hasNavigation 屬性啟用左右導航按鈕'
      },
      events: {
        title: '事件處理',
        description: '監聽 change、sliderMove、sliderMoveEnd 等事件',
        last_event: '最後事件',
        log_title: '事件日誌'
      },
      ratio: {
        title: '滑動比例調整',
        description: '使用 longSwipesRatio 調整切換所需的滑動距離比例',
        hint: '嘗試不同的滑動距離'
      },
      slots: {
        title: '多位置插槽',
        description: '支援 top、left、center、right、bottom 五個位置的插槽',
        top: '頂部插槽',
        left: '左側',
        center: '中心區域',
        right: '右側',
        bottom: '底部插槽'
      }
    },
    slides: {
      slide1: '幻燈片 1',
      slide2: '幻燈片 2',
      slide3: '幻燈片 3',
      content1: '這是第一個幻燈片的內容',
      content2: '這是第二個幻燈片的內容',
      content3: '這是第三個幻燈片的內容'
    },
    colors: {
      red: '紅色',
      green: '綠色',
      blue: '藍色',
      purple: '紫色'
    }
  },
  swiper_js_test_page: {
    hero: {
      title: 'Swiper.js 整合測試',
      subtitle: 'Swiper.js 套件整合展示',
      description: '測試 Swiper.js 套件整合，支援循環播放、自動播放等功能'
    }
  },
  wang_editor_page: {
    hero: {
      title: 'Wang Editor 整合測試',
      subtitle: 'Wang Editor 富文字編輯器展示',
      description: '測試 Wang Editor 富文字編輯器套件整合'
    },
    describe: {
      text: '因公司專案需求整合 Wang Editor 作為富文字編輯器'
    }
  },
  countdown_test_page: {
    hero: {
      title: '倒數計時器測試',
      subtitle: '自製 Countdown 組件展示',
      description: '測試自製翻頁式倒數計時器組件功能'
    },
    describe: {
      text: '為了避免公司專案上的套件衝突，因此手刻一版翻頁式倒數計時器',
      strikethrough: '我也想既優雅又輕鬆憄意的使用套件，但現實不允許'
    }
  },
  components_test_page: {
    hero: {
      title: '組件綜合測試',
      subtitle: '多組件整合展示',
      description: '測試多個自製組件在同一頁面中的整合與互動'
    }
  },
  tab_test_page: {
    hero: {
      title: '自製 Tab 測試',
      subtitle: '自製 TabsBar/TabsContent 組件展示',
      description: '測試自製標籤切換組件各種配置與效果'
    }
  },
  scroll_fetch_page: {
    hero: {
      title: '下拉更新組件測試',
      subtitle: '自製 ScrollFetch 組件展示',
      description: '測試自製下拉更新與無限滾動組件，整合 GitHub API 實例'
    }
  },
  components: {
    description: {
      span1:
        '自製組件主要是為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關components',
      span2:
        '其餘主要是因為該套件並未提供vue版本，因此整合供純js之版本為組件的方式做實作'
    },
    tab: 'Tabs組件測試',
    scroll_fetch: '下拉重載/無限滾動測試',
    wang_editor: 'WangEditor（HTML編輯器）測試',
    youtube: 'Youtube測試',
    components:
      '組件綜合測試（Tabs組件、下拉重載/無限滾動測試、WangEditor（HTML編輯器）、Youtube測試）',
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
  $vuetify: {
    badge: '徽章',
    open: '開啟',
    close: '關閉',
    dismiss: '關閉',
    confirmEdit: {
      ok: '確定',
      cancel: '取消'
    },
    dataIterator: {
      noResultsText: '沒有符合條件的結果',
      loadingText: '讀取中...'
    },
    dataTable: {
      itemsPerPageText: '每頁列數：',
      ariaLabel: {
        sortDescending: '：降序排列。',
        sortAscending: '：升序排列。',
        sortNone: '無排序方式。點擊以升序排列。',
        activateNone: '點擊以移除排序方式。',
        activateDescending: '點擊以降序排列。',
        activateAscending: '點擊以移除排序方式。'
      },
      sortBy: '排序方式'
    },
    dataFooter: {
      itemsPerPageText: '每頁項目：',
      itemsPerPageAll: '全部',
      nextPage: '下一頁',
      prevPage: '上一頁',
      firstPage: '第一頁',
      lastPage: '最後頁',
      pageText: '{2} 條中的 {0}~{1} 條'
    },
    dateRangeInput: {
      divider: '至'
    },
    datePicker: {
      itemsSelected: '已選擇 {0} 個日期',
      range: {
        title: '選擇日期範圍',
        header: '輸入日期範圍'
      },
      title: '選擇日期',
      header: '輸入日期',
      input: {
        placeholder: '請輸入日期'
      },
      ariaLabel: {
        previousMonth: '上個月',
        nextMonth: '下個月',
        selectYear: '選擇年份',
        selectDate: '{0}',
        currentDate: '今天，{0}'
      }
    },
    noDataText: '沒有資料',
    carousel: {
      prev: '上一張',
      next: '下一張',
      ariaLabel: {
        delimiter: '第 {0} 張 / 共 {1} 張'
      }
    },
    calendar: {
      moreEvents: '還有其他 {0} 項',
      today: '今天'
    },
    input: {
      clear: '清除 {0}',
      prependAction: '{0} 前置操作',
      appendAction: '{0} 附加操作',
      otp: '請輸入第 {0} 個 OTP 字元'
    },
    fileInput: {
      counter: '{0} 個檔案',
      counterSize: '{0} 個檔案（共 {1}）'
    },
    fileUpload: {
      title: '拖曳檔案至此',
      divider: '或',
      browse: '瀏覽檔案'
    },
    timePicker: {
      am: '上午',
      pm: '下午',
      title: '選擇時間'
    },
    pagination: {
      ariaLabel: {
        root: '分頁導航',
        next: '下一頁',
        previous: '上一頁',
        page: '轉到頁面 {0}',
        currentPage: '當前頁 {0}',
        first: '第一頁',
        last: '最後一頁'
      }
    },
    stepper: {
      next: '下一步',
      prev: '上一步'
    },
    rating: {
      ariaLabel: {
        item: '評分 {0} / {1}'
      }
    },
    loading: '載入中...',
    infiniteScroll: {
      loadMore: '載入更多',
      empty: '沒有更多內容'
    },
    rules: {
      required: '此欄位為必填項',
      email: '請輸入有效的電子郵件地址',
      number: '此欄位只能包含數字',
      integer: '此欄位只能包含整數',
      capital: '此欄位只能包含大寫字母',
      maxLength: '您最多可以輸入{0}個字符',
      minLength: '您必須至少輸入{0}個字符',
      strictLength: '輸入欄位的長度無效',
      exclude: '字符{0}是不允許的',
      notEmpty: '請至少選擇一個值',
      pattern: '格式無效'
    },
    hotkey: {
      then: '然後',
      ctrl: 'Ctrl',
      command: 'Command',
      shift: 'Shift',
      alt: 'Alt',
      option: 'Option',
      enter: 'Enter',
      escape: 'Escape',
      upArrow: '上箭頭',
      downArrow: '下箭頭',
      leftArrow: '左箭頭',
      rightArrow: '右箭頭',
      backspace: '退格',
      space: '空格',
      plus: '加',
      shortcut: '鍵盤快捷鍵：{0}'
    },
    video: {
      play: '播放',
      pause: '暫停',
      seek: '搜尋',
      volume: '音量',
      showVolume: '顯示音量控制',
      mute: '靜音',
      unmute: '取消靜音',
      enterFullscreen: '全螢幕',
      exitFullscreen: '退出全螢幕'
    },
    colorPicker: {
      ariaLabel: {
        eyedropper: '從螢幕上選取顏色',
        hueSlider: '色相',
        alphaSlider: '透明度',
        redInput: '紅色',
        greenInput: '綠色',
        blueInput: '藍色',
        alphaInput: '透明度',
        hueInput: '色相',
        saturationInput: '飽和度',
        lightnessInput: '亮度',
        hexInput: '十六進位值',
        hexaInput: '帶透明度的十六進位值',
        changeFormat: '變更顏色格式'
      }
    }
  },
  offline: {
    title: '目前沒有網路連線',
    description: '請檢查您的網路連線，或稍後再試。',
    backOnline: '網路已恢復！',
    canRetry: '您現在可以重新載入頁面了。',
    online: '已連線',
    offline: '離線',
    retry: '重新載入',
    goHome: '返回首頁',
    tipTitle: '提示',
    tipMessage: '已訪問過的頁面可以在離線狀態下瀏覽。',
    autoDetect: '系統會自動偵測網路狀態變化'
  },
  indexeddb_demo_page: {
    hero: {
      title: 'IndexedDB ORM 展示',
      subtitle: '本地端資料庫操作示範',
      description:
        '使用輕量級 ORM 工具進行 IndexedDB 資料庫操作，支援 Sequelize 風格和鏈式 API'
    },
    status: {
      label: '資料庫',
      connected: '已連線',
      disconnected: '未連線'
    },
    form: {
      title: '新增使用者',
      name: '姓名',
      email: '電子郵件',
      age: '年齡',
      add: '新增'
    },
    query: {
      title: '查詢使用者',
      min_age: '最小年齡',
      max_age: '最大年齡',
      search: '搜尋',
      load_all: '載入全部'
    },
    list: {
      title: '使用者列表',
      empty: '尚無資料',
      years: '歲'
    },
    bulk: {
      title: '批量操作',
      add_sample: '新增範例資料',
      clear_all: '清空全部'
    },
    log: {
      title: '操作記錄'
    }
  },
  ripples_component_page: {
    hero: {
      title: 'Ripples 水波紋元件',
      subtitle: '基於 WebGL 的互動式水波紋背景',
      description:
        '封裝好的 Vue 元件，支援滑鼠/觸控互動、自動水滴效果、可自訂參數'
    },
    view_directive: '查看指令版本',
    demo: {
      title: '互動展示',
      interactive_hint: '水波紋效果展示',
      touch_hint: '滑鼠移動或點擊產生水波紋',
      controls: '參數調整',
      code_example: '程式碼範例'
    },
    props: {
      title: 'Props 說明',
      description: '說明',
      image_url: '背景圖片 URL（必填）',
      resolution: '水波紋解析度（建議: 256, 512, 1024）',
      drop_radius: '水滴半徑',
      perturbance: '擾動強度（建議: 0.01 ~ 0.1）',
      interactive: '是否啟用滑鼠/觸控互動',
      auto_drops: '是否啟用自動水滴效果',
      auto_drops_interval: '自動水滴間隔（毫秒）'
    }
  },
  ripples_directive_page: {
    hero: {
      title: 'Ripples 水波紋指令',
      subtitle: 'Vue 自訂指令版本的水波紋效果',
      description: '直接透過指令為元素添加水波紋效果，無需包裝元件'
    },
    view_component: '查看元件版本',
    code_example: '程式碼範例',
    view_source: '查看 GitHub 原始碼',
    animation: {
      description: '基本的水波紋動畫指令，支援滑鼠/觸控互動',
      hint: '滑鼠移動或點擊產生水波紋'
    },
    auto_drops: {
      description: '自動產生隨機水滴效果的指令',
      hint: '自動產生隨機位置的水滴'
    },
    options: {
      title: '指令參數說明',
      description: '說明',
      image_url: '背景圖片 URL',
      resolution: '水波紋解析度',
      interactive: '是否啟用互動',
      interval: '水滴間隔時間（毫秒）',
      drop_radius: '水滴半徑',
      strength: '水滴基礎強度',
      strength_variance: '水滴強度隨機變化範圍'
    }
  },
  krpano_demo_page: {
    hero: {
      title: 'Krpano 全景圖展示',
      subtitle: '360° 全景圖查看器組件',
      description:
        '使用 Krpano 實現互動式 360° 全景圖瀏覽，支援場景切換、熱點管理等功能'
    },
    scenes: {
      scene1: '場景 1 - 極光',
      scene2: '場景 2 - 星空'
    },
    controls: {
      title: '控制面板',
      show: '顯示控制',
      hide: '隱藏控制',
      scene: '場景切換',
      hotspots: '熱點管理',
      add_hotspot: '新增熱點',
      remove_hotspot: '移除最後一個',
      clear_hotspots: '清除全部',
      debug: 'Debug 模式',
      debug_on: '開啟',
      debug_off: '關閉',
      text_layer: '文字圖層',
      text_content: '輸入文字內容'
    },
    log: {
      title: '事件日誌'
    },
    hotspot_form: {
      name_placeholder: '熱點名稱',
      ath_placeholder: '水平角度 (ATH)',
      atv_placeholder: '垂直角度 (ATV)',
      preset_icon: '預設圖示',
      custom_url: '自訂 URL',
      url_placeholder: '輸入圖片網址',
      confirm: '確認',
      cancel: '取消'
    }
  },
  animation_page: {
    badge: 'Animation Lab',
    hero: {
      title: '動畫效果展示',
      subtitle: 'CSS、WebGL 與動畫庫整合',
      description:
        '集中展示各種動畫效果組件，包含文字特效、水波紋背景、CSS 動畫等視覺互動技術'
    },
    intro: {
      text: '本區塊匯集各類動畫相關組件與效果展示，涵蓋純 CSS 動畫、WebGL 水波紋特效，以及自製文字動畫組件等，作為動畫技術的整合實驗室。'
    },
    demos: {
      title: '動畫效果選單',
      enter_label: {
        label: '文字逐字進入特效',
        description: '自製文字逐字動態顯示組件，支援自訂進入動畫效果'
      },
      ripples: {
        label: '水波紋背景元件',
        description:
          '基於 WebGL 的互動式水波紋背景，支援滑鼠觸控互動與自動水滴效果'
      },
      triangle_anime: {
        label: 'CSS 三角形動畫',
        description: '使用 CSS 搭配 anime.js 的三角形進場動畫效果展示'
      },
      waving_image: {
        label: '圖片波浪動畫',
        description: '使用 Canvas 實作圖片隨時間呈現波浪效果的動畫'
      }
    }
  },
  univer_doc_page: {
    remark: {
      lock_title: '鎖定狀態匯出說明：',
      local_export: 'Local Export (JSON Snapshot)：',
      local_export_desc: '可以保留鎖定狀態。自訂區域屬性會記錄於 Snapshot 中，重新載入 JSON 後依然生效。',
      server_export: 'Server Export (DOCX/XLSX)：',
      server_export_desc: '無法保留鎖定狀態。標準 Office 格式不支援 Univer 自訂的區域鎖定機制，匯出的實體檔案將不含編輯限制。',
      univer_title: 'Univer 載入與穩定度說明：',
      univer_npm: 'Univer 的 npm 版在 Nuxt 上疑似因為打包轉譯設定的問題，光是載入就會觸發無盡 rerender，因此改用 CDN 的方式處理。',
      univer_stability_1: '目前 Doc 版的穩定度不是很高，容易出現 error 狀況。如果編輯器沒有正常載入，請嘗試',
      univer_stability_2: '重新整理頁面',
      univer_stability_3: '來讓 Univer 套件重新載入。',
      univer_cdn_wait_1: '需要注意的是，由於改用 CDN 載入，初次載入的等待時間會比直接使用 npm 版本',
      univer_cdn_wait_2: '久上許多',
      univer_cdn_wait_3: '，請耐心等候。'
    },
    tools: {
      current_role: '當前測試身份：'
    }
  },
  univer_sheet_page: {
    remark: {
      univer_title: 'Univer 載入與穩定度說明：',
      univer_npm: 'Univer 的 npm 版在 Nuxt 上疑似因為打包轉譯設定的問題，光是載入就會觸發無盡 rerender，因此改用 CDN 的方式處理。',
      univer_stability_1: '目前 Sheet 版本發展相對成熟，不太會出現無法正常載入的狀況。但若依然遇到編輯器沒有正常載入的情形，請嘗試',
      univer_stability_2: '重新整理頁面',
      univer_stability_3: '來讓 Univer 套件重新載入。',
      univer_cdn_wait_1: '需要注意的是，由於改用 CDN 載入，初次載入的等待時間會比直接使用 npm 版本',
      univer_cdn_wait_2: '久上許多',
      univer_cdn_wait_3: '，請耐心等候。'
    },
    tools: {
      current_role: '當前測試身份：'
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineI18nLocale(async (locale) => {
  return {
    ...zhTw,
    ...univerCustomZhTw
  };
});
