// Import Univer specific locales
import univerCustomEnUS from '../../app/utils/third-party/univer/i18n/en-US.js';
import vuetifyEn from 'vuetify/lib/locale/en.mjs';

export const en = {
  en: 'English',
  'zh-tw': 'Chinese',
  system: {
    systemName: "Parker's Nuxt lab",
    defaultTitle: "Parker's Nuxt lab",
    titleTemplate: "Parker's Nuxt lab",
    description: "Parker's Nuxt Laboratory"
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
    face_swap: 'AI Face Swap Test',
    swagger_doc: 'Swagger API Documentation',
    frontend_cach_api: 'Frontend API cache test',
    firebase: 'Firebase Integration Test',
    socket: 'Socket Test',
    server_sent_event: 'Server Sent Event Test',
    web_rtc: 'WebRTC Test',
    indexeddb_demo: 'IndexedDB ORM Demo',
    virtual_reality: 'Virtual Reality Lab',
    notes: 'Notion Notes',
    animation: 'Animation Showcase',
    office_tool: 'Office Tools'
  },
  office_tool_page: {
    hero: {
      title: 'Office Tools',
      description:
        'Explore different document, spreadsheet, and PDF implementations.'
    },
    categories: {
      doc: 'Documents (Doc)',
      sheet: 'Spreadsheets (Sheet)',
      pdf: 'PDF'
    },
    items: {
      collabora_doc: {
        title: 'Collabora Doc',
        desc: 'Collaborative document editing using Collabora.'
      },
      syncfusion_doc: {
        title: 'Syncfusion Doc',
        desc: 'Document editor powered by Syncfusion.'
      },
      tiptap_doc: {
        title: 'Tiptap Doc',
        desc: 'Rich text document editing using Tiptap.'
      },
      univer_doc: {
        title: 'Univer Doc',
        desc: 'Document editing capabilities powered by Univer.'
      },
      univer_federation_doc: {
        title: 'Univer Federation Doc',
        desc: 'Document editing integrating Univer via Module Federation.'
      },
      collabora_sheet: {
        title: 'Collabora Sheet',
        desc: 'Collaborative spreadsheet editing using Collabora.'
      },
      syncfusion_sheet: {
        title: 'Syncfusion Sheet',
        desc: 'Spreadsheet editor powered by Syncfusion.'
      },
      univer_sheet: {
        title: 'Univer Sheet',
        desc: 'Spreadsheet capabilities powered by Univer.'
      },
      univer_federation_sheet: {
        title: 'Univer Federation Sheet',
        desc: 'Spreadsheet integrating Univer via Module Federation.'
      },
      pdf_reader: {
        title: 'PDF.js Reader',
        desc: 'PDF viewing and interaction powered by PDF.js.'
      }
    }
  },
  collabora_doc_page: {
    title: 'Collabora Doc Editor',
    description:
      'Since the current deployment environment of this project is Vercel (Serverless Functions), and Collabora requires Docker to start the main file editing service, this demonstration can only be shown in a local Docker environment.',
    docker_btn: 'Collabora Docker'
  },
  collabora_sheet_page: {
    title: 'Collabora Sheet Editor',
    description:
      'Since the current deployment environment of this project is Vercel (Serverless Functions), and Collabora requires Docker to start the main file editing service, this demonstration can only be shown in a local Docker environment.',
    docker_btn: 'Collabora Docker'
  },
  home: {
    hero: {
      subtitle: 'Explore the Infinite Possibilities of Nuxt 4',
      description:
        'An experimental project built on Nuxt 4, integrating PWA, real-time communication, AI/ML, comprehensive testing suite, and other modern frontend and backend technologies',
      cta_explore: 'Start Exploring',
      cta_about: 'Learn More'
    },
    features: {
      title: 'Core Features',
      pwa: {
        title: 'PWA Support',
        description:
          'Complete Progressive Web App support including Service Worker, offline caching, and push notifications'
      },
      realtime: {
        title: 'Real-time Communication',
        description:
          'Integration of multiple real-time technologies including WebRTC, Socket.IO, WebSocket, and Server-Sent Events'
      },
      ai: {
        title: 'AI/ML Integration',
        description:
          'Integration with face-api.js, TensorFlow.js and other ML frameworks for facial recognition, face swapping, and more'
      },
      testing: {
        title: 'Comprehensive Testing',
        description:
          'E2E testing with Playwright to ensure project quality and stability'
      }
    },
    navigation: {
      title: 'Feature Navigation'
    },
    nav: {
      about_desc:
        "Learn about the project's technical architecture, tech stack, and development philosophy",
      components_desc:
        'Explore custom components and third-party integration examples',
      directives_desc: 'View custom Vue directives implementation and usage',
      route_desc: 'Test Nuxt routing features and capabilities',
      css_drawing_desc:
        'Visual effects created with CSS and animation libraries',
      web_authn_desc:
        'Native WebAuthn API biometric authentication implementation',
      fido2_lib_desc: 'Biometric authentication using fido2-lib',
      web_cam_desc: 'WebCam video stream application testing',
      face_api_desc: 'face-api.js facial recognition feature demonstration',
      frontend_cach_api_desc:
        'Frontend API caching strategy implementation and testing',
      firebase_desc:
        'Firebase service integration including Cloud Messaging push notifications',
      socket_desc: 'Socket.IO and WebSocket real-time communication testing',
      server_sent_event_desc:
        'Server-Sent Events unidirectional real-time communication',
      web_rtc_desc: 'WebRTC peer-to-peer video call functionality testing',
      face_swap_desc: 'AI face swapping technology implementation showcase',
      swagger_doc_desc:
        'Using Swagger UI to display complete documentation for Nuxt Server APIs',
      indexeddb_demo_desc:
        'Custom IndexedDB ORM tool demonstration and testing',
      virtual_reality_desc:
        'Explore WebVR and WebXR experiments, including panoramas and 3D scenes',
      notes_desc:
        'Practical records of daily work and private research on SEO and technology',
      animation_desc: 'Showcase of various animation effects and utilities',
      office_tool_desc:
        'Explore different document, spreadsheet, and PDF tools',
      read_on_notion: 'Read on Notion'
    },
    stats: {
      components: 'Components',
      pages: 'Pages',
      features: 'Feature Modules',
      tests: 'Test Cases'
    }
  },
  virtual_reality: {
    title: 'Virtual Reality',
    subtitle: 'WebVR & WebXR Experiments',
    description:
      'Explore WebVR and WebXR experiments, including 360° panoramas and 3D virtual visual demonstrations.',
    aframe_demo: 'A-Frame Demo',
    aframe_desc: '3D and WebVR experiences built with the A-Frame framework.',
    krpano_demo: 'Krpano Demo',
    krpano_desc: 'Interactive 360° Panorama and Virtual Tour Demo using Krpano.'
  },
  about: {
    hero: {
      title: 'About',
      subtitle: 'Exploring Nuxt 4 Experimental Project',
      description:
        'A laboratory focused on exploring and practicing modern frontend technologies'
    },
    overview: {
      title: 'Project Overview',
      intro:
        "Parker's Nuxt Lab is an experimental project built on Nuxt 4, aimed at exploring and practicing modern frontend and backend technologies.",
      purpose:
        'The main purpose of this project is to test and integrate various cutting-edge technologies, including PWA, real-time communication, AI/ML, and establish a complete set of development practice examples.',
      features:
        'Through custom components and third-party integrations, we have built a feature-rich, well-structured technology showcase platform.',
      view_source: 'View Source on GitHub',
      view_nextjs: 'View Next.js Version'
    },
    tech_stack: {
      title: 'Tech Stack',
      frontend: {
        title: 'Frontend',
        items: ['Nuxt 4', 'Vue 3', 'Vuetify 3', 'TypeScript', 'SCSS']
      },
      backend: {
        title: 'Backend',
        items: ['Nuxt Server', 'H3', 'Nitro', 'Node.js']
      },
      tools: {
        title: 'Development Tools',
        items: ['Vite', 'Playwright', 'ESLint', 'Git']
      },
      features_tech: {
        title: 'Featured Technologies',
        items: ['PWA', 'i18n', 'WebRTC', 'Socket.IO', 'face-api.js']
      }
    },
    features: {
      title: 'Core Features',
      pwa: {
        title: 'PWA Support',
        description:
          'Complete Progressive Web App support including Service Worker, offline caching, and push notifications'
      },
      realtime: {
        title: 'Real-time Communication',
        description:
          'Integration of multiple real-time technologies including WebRTC, Socket.IO, WebSocket, and Server-Sent Events'
      },
      ai: {
        title: 'AI/ML Integration',
        description:
          'Integration with face-api.js, TensorFlow.js and other ML frameworks for facial recognition, face swapping, and more'
      },
      testing: {
        title: 'Comprehensive Testing',
        description:
          'E2E testing with Playwright to ensure project quality and stability'
      },
      components: {
        title: 'Custom Components',
        description:
          'To avoid package compatibility issues, we implement multiple common components ourselves to ensure project stability and controllability'
      },
      i18n: {
        title: 'Internationalization',
        description:
          'Complete multilingual support with Traditional Chinese and English interfaces'
      }
    },
    development: {
      title: 'Development Philosophy',
      philosophy:
        "This project adheres to the philosophy of 'Experiment, Learn, Share', deepening understanding of various technologies through practice.",
      approach:
        'We value code quality, user experience, and technological innovation, continuously exploring best practices in frontend development.',
      design_credit:
        'Website visual design is AI-assisted. All functionality is originally developed.'
    }
  },
  components_page: {
    hero: {
      title: 'Components Showcase',
      subtitle: 'Custom Components & Third-party Integrations',
      description:
        'To avoid package compatibility issues, we implement common components ourselves, ensuring project stability and control'
    },
    categories: {
      ui: 'UI Components',
      functional: 'Functional Components',
      integration: 'Third-party Integrations',
      combined: 'Combined Tests'
    },
    intro: {
      custom:
        "Custom components are built to avoid compatibility issues with npm packages or when project requirements don't fit existing tools.",
      integration:
        'Third-party integrations wrap vanilla JS libraries as Vue components when no official Vue version exists.'
    }
  },
  directives_page: {
    hero: {
      title: 'Custom Directives',
      subtitle: 'Vue Custom Directives Showcase',
      description:
        'To avoid package compatibility issues, we implement common Vue directives ourselves, providing more flexible DOM manipulation capabilities'
    },
    intro:
      "Custom Vue directives are built to avoid compatibility issues with npm packages or when project requirements don't fit existing tools.",
    directives_list_title: 'Custom Directives List'
  },
  route_page: {
    hero: {
      title: 'Route Tests',
      subtitle: 'Nuxt Routing Features Testing',
      description:
        'Test pages for reproducing specific routing scenarios and serving as reference notes'
    },
    intro:
      'Used for reproducing routing-related scenarios, including query parameters, params parameters, and back navigation functionality tests.',
    tests_list_title: 'Route Tests List'
  },
  query_back_test_page: {
    hero: {
      title: 'Query Parameter Test',
      subtitle: 'Route Query Parameters & Back Navigation',
      description:
        'Testing route query parameter changes and browser history behavior'
    },
    current_value_label: 'Current Query Value:',
    btn_push: 'Increment Query (Push)',
    btn_replace: 'Increment Query (Replace)',
    push_title: 'Push:',
    push_desc: 'Adds a browser history entry; you can navigate back with the back button',
    replace_title: 'Replace:',
    replace_desc: 'Replaces the current history entry; cannot navigate back with the back button'
  },
  params_back_test_page: {
    hero: {
      title: 'Params Parameter Test',
      subtitle: 'Route Params Parameters & Back Navigation',
      description:
        'Testing dynamic route params parameter changes and browser history behavior'
    },
    current_value_label: 'Current Params Value:',
    btn_push: 'Increment Params (Push)',
    btn_replace: 'Increment Params (Replace)',
    push_title: 'Push:',
    push_desc: 'Adds a browser history entry; you can navigate back with the back button',
    replace_title: 'Replace:',
    replace_desc: 'Replaces the current history entry; cannot navigate back with the back button',
    note_title: 'Note:',
    note_desc: 'Dynamic parameter modification may require special handling',
    issue_link: 'Related Issue'
  },
  css_drawing_page: {
    hero: {
      title: 'CSS Drawing',
      subtitle: 'CSS Drawing & Anime.js Integration',
      description:
        'Test pages focusing on CSS drawing techniques and Anime.js animation library integration'
    },
    intro:
      'Primarily focused on CSS drawing and Anime.js integration tests, including geometric shapes like triangles and hexagons with animation effects.',
    tests_list_title: 'CSS Drawing Tests List'
  },
  triangle_test_page: {
    hero: {
      title: 'CSS Triangle Test',
      subtitle: 'CSS Border Triangle Drawing Demo',
      description:
        'Drawing triangles in various directions using CSS border property'
    }
  },
  triangle_full_test_page: {
    hero: {
      title: 'CSS Triangle Fullscreen Test',
      subtitle: 'CSS Fullscreen Triangle Demo',
      description: 'Testing CSS triangle application in fullscreen layout'
    }
  },
  triangle_anime_test_page: {
    hero: {
      title: 'CSS Triangle Animation Test',
      subtitle: 'CSS Triangle Animation Effect Demo',
      description: 'Testing CSS triangle with animation effects'
    }
  },
  hexagon_test_page: {
    hero: {
      title: 'CSS Hexagon Test',
      subtitle: 'CSS Hexagon Drawing Demo',
      description: 'Drawing hexagon shapes using CSS'
    }
  },
  svg_color_change_page: {
    hero: {
      title: 'SVG Color Change Test',
      subtitle: 'SVG Dynamic Color Change Demo',
      description: 'Testing dynamic color change effects on SVG images'
    },
    pseudo_element_test: 'Pseudo-element Test:'
  },
  socket_test_page: {
    hero: {
      title: 'Socket Tests',
      subtitle: 'WebSocket & Socket.IO Testing',
      description:
        'Recording results of native WebSocket with Nuxt 4 built-in features, and Socket.IO implementation on both frontend and backend'
    },
    intro:
      'Recording results of native WebSocket with Nuxt 4 built-in features, and Socket.IO implementation on both frontend and backend.',
    warning:
      'The current deployment environment may not support WebSocket (e.g., Vercel and other deployment platforms), which may cause it to be ineffective.',
    tests_list_title: 'Socket Tests List',
    test_socket_io_label: 'Socket.IO handled on both frontend and backend',
    test_websocket_label: 'Native frontend / Nuxt 4 built-in backend'
  },
  socket_io_page: {
    hero: {
      title: 'Socket.IO Test',
      subtitle: 'Socket.IO Bidirectional Communication Test',
      description:
        'Using Socket.IO for real-time bidirectional communication between frontend and backend'
    },
    connection_status: 'Connection Status:',
    connected: 'Connected',
    disconnected: 'Disconnected',
    send_message_title: 'Send Message',
    input_message_label: 'Input Message',
    input_message_placeholder: 'Enter test message to send...',
    send_btn: 'Send',
    received_data_label: 'Received Data:',
    no_message_yet: 'No message received yet...'
  },
  websocket_page: {
    hero: {
      title: 'Native WebSocket Test',
      subtitle: 'Nuxt 4 Built-in WebSocket Test',
      description:
        'Testing native WebSocket communication using Nuxt 4 built-in features'
    },
    send_message_title: 'Send Message',
    input_message_label: 'Input Message',
    input_message_placeholder: 'Enter test message to send...',
    send_btn: 'Send',
    received_data_label: 'Received Data:',
    no_message_yet: 'No message received yet...'
  },
  sse_page: {
    hero: {
      title: 'Server-Sent Events Tests',
      subtitle: 'SSE Real-time Push Testing',
      description:
        'Testing global and route param-based grouped Server-Sent Events functionality'
    },
    intro:
      'Testing global and route param-based grouped Server-Sent Events, including GET and POST methods.',
    tests_list_title: 'SSE Tests List'
  },
  sse_global_get_page: {
    hero: {
      title: 'SSE Global Receive (GET)',
      subtitle: 'Receiving Server-Sent Events via GET',
      description:
        'Testing EventSource standard API for receiving global SSE events'
    },
    received_data_label: 'Received Data:'
  },
  sse_global_post_page: {
    hero: {
      title: 'SSE Global Receive (POST)',
      subtitle: 'Receiving Server-Sent Events via POST',
      description:
        'Testing custom POST EventSource for receiving global SSE events'
    },
    received_data_label: 'Received Data:'
  },
  sse_room_get_page: {
    hero: {
      title: 'SSE Room Receive (GET)',
      subtitle: 'Receiving Room-based SSE via GET',
      description: 'SSE receive test grouped by Route Param'
    },
    room_id_label: 'Room ID:',
    copy_id_title: 'Copy Room ID',
    copied: 'Copied!',
    share_url_label: 'Share URL:',
    copy_url: 'Copy URL',
    url_copied: 'URL Copied!',
    received_data_label: 'Received Data:',
    no_message_yet: 'No message received yet...',
    create_room_title: 'Create Room',
    create_room_desc: 'Automatically generate Room ID and enter room',
    create_room_btn: 'Create SSE Room',
    join_room_title: 'Join Room',
    join_room_desc: 'Enter Room ID to join existing room',
    input_placeholder: 'Enter Room ID in UUID format',
    invalid_uuid: 'Invalid Room ID format',
    join_room_btn: 'Join Room'
  },
  sse_room_post_page: {
    hero: {
      title: 'SSE Room Receive (POST)',
      subtitle: 'Receiving Room-based SSE via POST',
      description: 'SSE POST receive test grouped by Route Param'
    },
    room_id_label: 'Room ID:',
    copy_id_title: 'Copy Room ID',
    copied: 'Copied!',
    share_url_label: 'Share URL:',
    copy_url: 'Copy URL',
    url_copied: 'URL Copied!',
    received_data_label: 'Received Data:',
    no_message_yet: 'No message received yet...',
    create_room_title: 'Create Room',
    create_room_desc: 'Automatically generate Room ID and enter room (POST Mode)',
    create_room_btn: 'Create SSE Room (POST)',
    join_room_title: 'Join Room',
    join_room_desc: 'Enter Room ID to join existing room (POST Mode)',
    input_placeholder: 'Enter Room ID in UUID format',
    invalid_uuid: 'Invalid Room ID format',
    join_room_btn: 'Join Room'
  },
  web_rtc_page: {
    hero: {
      title: 'WebRTC Tests',
      subtitle: 'WebRTC Real-time Video Communication Testing',
      description:
        'WebRTC implementation tests with different signaling transport methods (Socket.IO, WebSocket, SSE)'
    },
    intro:
      'WebRTC implementation tests, primarily divided into three signaling transport methods: Socket.IO, WebSocket, and Server-Sent Events.',
    note: 'The video functionality is currently in its initial completion stage, but the detailed workflow is not yet complete. Manual URL copying is required for testing.',
    tests_list_title: 'WebRTC Tests List',
    test_socket_io_label: 'Implemented with Socket.IO',
    test_websocket_label: 'Implemented with native frontend / Nuxt 4 built-in backend',
    test_sse_label: 'Implemented with SSE',
    websocket_env_warning: '*The current deployment environment may not support WebSocket (e.g. Vercel deployment), which may not function properly.',
    creating_room: 'Creating video room...',
    create_video_chat: 'Create Video Chat',
    create_new_room: 'Create New Room',
    or: 'OR',
    join_video_chat: 'Join Video Chat',
    input_room_id_placeholder: 'Enter Room ID...',
    invalid_room_id: 'Invalid Room ID',
    join_room: 'Join Room'
  },
  web_rtc_socket_io_page: {
    hero: {
      title: 'WebRTC + Socket.IO',
      subtitle: 'Using Socket.IO for Signaling',
      description:
        'WebRTC peer-to-peer video communication with Socket.IO signaling exchange'
    },
    room: {
      title: 'Video Chat Room',
      current_id: 'Current Pairing ID',
      copy_id: 'Copy ID',
      copy_url: 'Copy Link',
      copied: 'Copied!',
      your_video: 'Your Video',
      remote_video: 'Remote Video',
      waiting: 'Waiting for others to join...'
    }
  },
  web_rtc_websocket_page: {
    hero: {
      title: 'WebRTC + WebSocket',
      subtitle: 'Using Native WebSocket for Signaling',
      description:
        'WebRTC signaling exchange using Nuxt 4 built-in WebSocket features'
    },
    room: {
      title: 'Video Chat Room',
      current_id: 'Current Pairing ID',
      copy_id: 'Copy ID',
      copy_url: 'Copy Link',
      copied: 'Copied!',
      your_video: 'Your Video',
      remote_video: 'Remote Video',
      waiting: 'Waiting for others to join...'
    }
  },
  web_rtc_sse_page: {
    hero: {
      title: 'WebRTC + SSE',
      subtitle: 'Using Server-Sent Events for Signaling',
      description:
        'WebRTC signaling exchange via Server-Sent Events with POST requests'
    },
    room: {
      title: 'Video Chat Room',
      current_id: 'Current Pairing ID',
      copy_id: 'Copy ID',
      copy_url: 'Copy Link',
      copied: 'Copied!',
      your_video: 'Your Video',
      remote_video: 'Remote Video',
      waiting: 'Waiting for others to join...'
    }
  },
  firebase_page: {
    hero: {
      title: 'Firebase Integration',
      subtitle: 'Firebase Cloud Services Integration Testing',
      description:
        'Integrating Firebase cloud services, including FCM push notifications, Service Worker, and other functionality tests'
    },
    intro:
      'Originally implemented and tested in the electronic resume, but since that project did not implement PWA or other features requiring Service Worker, this project attempts to integrate Service Worker and conduct tests.',
    intro_original: 'Originally implemented in {link}.',
    resume: 'E-Resume',
    feature_test: 'Firebase Feature Test',
    fcm_dashboard: 'FCM Push Notification Dashboard'
  },
  face_swap_page: {
    hero: {
      title: 'AI Face Swap',
      subtitle: 'AI Face Recognition & Swap Technology',
      description:
        'Using AI technology to implement face recognition and swap functionality, providing both frontend and backend implementation versions'
    },
    intro:
      'Using face-api.js and AI models to implement face recognition and swap functionality, providing both pure frontend and backend AI implementation methods.',
    section_title: 'Select Implementation Version',
    serverless_notice: {
      title: 'Serverless Environment Limitation',
      text: 'This website is deployed on Vercel Serverless environment. The backend AI version requires long-running computational resources and cannot function properly in a Serverless environment. To experience full functionality, please run this project locally.'
    },
    versions: {
      frontend: 'Frontend Only - Using face-api.js + Canvas',
      backend: 'Backend AI Version - Using Node.js Backend + AI Model'
    },
    badges: {
      unavailable: 'Unavailable',
      developing: 'In Development'
    }
  },
  swagger_doc_page: {
    hero: {
      title: 'Swagger API Documentation',
      subtitle: 'Interactive API Documentation Interface',
      description:
        'Using Swagger UI to display complete documentation for Nuxt Server APIs, supporting interactive testing and queries'
    },
    intro:
      'This page displays Swagger documentation for Nuxt Server APIs. You can directly view API endpoints, parameters, and response formats, and perform interactive testing.'
  },
  offline_page: {
    hero: {
      title: 'Offline Mode Test',
      subtitle: 'Network Status Detection & Offline Handling',
      description:
        'Testing website behavior in offline state, including network status detection and automatic reconnection functionality'
    },
    intro:
      "This page is used to test the website's offline functionality. The system will automatically detect network status changes and display corresponding prompt messages."
  },
  web_cam_page: {
    hero: {
      title: 'WebCam Test',
      subtitle: 'Web Camera Video Stream Testing',
      description:
        'Testing web camera API, including video stream capture and Canvas rendering functionality'
    },
    intro:
      'This page is used to test web camera functionality. The system will automatically request camera permissions and display the video stream on Canvas.',
    permission_required: 'Camera Permission Required',
    permission_desc:
      'Please allow the browser to access your camera to display the video stream.'
  },
  frontend_api_cache_page: {
    hero: {
      title: 'Frontend API Cache Test',
      subtitle: 'API Caching Strategy & Performance Testing',
      description:
        'Testing frontend API caching functionality, including memory cache and Service Worker caching strategies'
    },
    intro:
      'This page is used to test frontend API caching functionality. You can test different caching strategies and compare performance differences.',
    pwa_note: 'Progressive Web Apps (PWA) Notes:',
    notion_link: 'Notion Notes Link',
    form: {
      get_param: 'GET Parameter',
      post_param: 'POST Parameter',
      use_post: 'Use HTTP POST',
      use_get: 'Use HTTP GET',
      enable_cache: 'Enable Cache (takes priority when both are enabled)',
      enable_sw_cache:
        'Enable ServiceWorker Cache (only works for HTTP GET in production mode)',
      test_button: 'Test'
    },
    results: {
      time_label: 'Time Consumed:',
      time_unit: 'ms',
      response_label: 'Response:'
    }
  },
  web_authn_page: {
    hero: {
      title: 'Web Authn Biometric Test',
      subtitle: 'Native Web Authentication API Implementation',
      description:
        'Using native Web Authentication API for biometric authentication, supporting fingerprint, facial recognition and other authentication methods'
    },
    intro:
      'This page implements biometric authentication using the native Web Authentication API, supporting both registration and login flows.',
    note_label: 'Notes:',
    notion_link: 'Notion Notes Link',
    register: {
      title: 'Register Biometric Data to Server',
      id_label: 'ID',
      account_label: 'Account',
      name_label: 'Name',
      submit_button: 'Register',
      webapi_output: 'Web Authn Response:',
      server_output: 'Server Response:'
    },
    login: {
      title: 'Perform Identity Verification',
      account_label: 'Account',
      submit_button: 'Verify',
      webapi_output: 'Web Authn Response:',
      server_output: 'Server Response:'
    },
    messages: {
      register_success: 'Credential registered successfully',
      register_error: 'Failed to register credential',
      login_success: 'Credential login successful',
      login_error: 'Failed to login with credential'
    }
  },
  fido2_lib_page: {
    hero: {
      title: 'FIDO2 Lib Biometric Test',
      subtitle: 'Implementation Using fido2-lib Package',
      description:
        'Using fido2-lib package for biometric authentication, supporting fingerprint, facial recognition and other authentication methods'
    },
    intro:
      'This page implements biometric authentication using the fido2-lib package, supporting both registration and login flows.',
    note_label: 'Notes:',
    notion_link: 'Notion Notes Link',
    register: {
      title: 'Register Biometric Data to Server',
      id_label: 'ID',
      account_label: 'Account',
      name_label: 'Name',
      submit_button: 'Register',
      webapi_output: 'Web Authn Response:',
      server_output: 'Server Response:'
    },
    login: {
      title: 'Perform Identity Verification',
      saved_account_label: 'Simulated Server Saved Account',
      remember_me_label: "Simulate 'Remember Me' Login (Forced on Mobile)",
      submit_button: 'Verify',
      webapi_output: 'Web Authn Response:',
      server_output: 'Server Response:'
    }
  },
  face_api_page: {
    hero: {
      title: 'Face API Recognition Test',
      subtitle: 'face-api.js Face Recognition Demo',
      description:
        'Using face-api.js for face detection, landmark recognition, expression analysis and face comparison'
    },
    intro:
      'This page demonstrates various face recognition features of face-api.js, including real-time face detection, landmark recognition, expression analysis and face comparison.',
    form: {
      upload_label: 'Click or drag photo here for recognition',
      upload_button: 'Select Recognition Photo',
      upload_mask: 'Drag recognition photo here',
      submit_button: 'Recognize',
      similarity_label: 'Similarity:',
      same_person: 'Same Person',
      different_person: 'Different Person'
    },
    sections: {
      video_preview: 'Real-time Video Preview',
      bounding_boxes: 'Face Bounding Box Detection',
      landmarks: 'Face Landmark Recognition',
      expressions: 'Face Expression Analysis'
    },
    data: {
      bounding_boxes: 'Bounding Box Data',
      landmarks: 'Landmark Data',
      expressions: 'Expression Analysis Data'
    }
  },
  face_swap_frontend: {
    hero: {
      title: 'Frontend Face Swap',
      subtitle: 'Real-time face swap using browser-side face-api.js',
      description:
        'This feature runs entirely in the frontend without backend server support'
    },
    tip: {
      title: 'Usage Tip:',
      content:
        "For best results, the source photo dimensions should be similar to the target frame. For different sized images, please use 'Backend AI Face Swap' feature."
    },
    sections: {
      source: 'Source Face',
      target: 'Target Frame',
      result: 'Swap Result'
    },
    upload: {
      button: 'Select Source Photo',
      label: 'Click or drag source photo here',
      mask: 'Drag source photo here'
    },
    buttons: {
      swap: 'Perform Swap',
      reset: 'Reset',
      download: 'Download Result'
    },
    size_warning: {
      title: 'Image size may not be suitable',
      content:
        'Recommend using dimensions similar to webcam (approx. 640x480) for best results.'
    },
    panels: {
      detection: 'Face Detection Details',
      landmarks: 'Face Landmarks',
      expressions: 'Expression Recognition Results'
    },
    status: {
      detecting: 'Detecting faces...',
      swapping: 'Performing face swap...',
      success: 'Face swap completed!',
      downloaded: 'Image downloaded',
      no_source: 'Please upload source photo and confirm camera is active',
      no_source_face: 'Cannot detect face in source photo',
      no_target_face: 'Cannot detect face in camera frame',
      error: 'Face swap failed'
    }
  },
  face_swap_backend: {
    hero: {
      title: 'Backend AI Face Swap',
      subtitle: 'High quality face swap using backend AI service',
      description:
        'Supports different image sizes and provides more accurate face swap results'
    },
    sections: {
      source: 'Source Photo',
      target: 'Target Photo',
      result: 'Swap Result'
    },
    upload: {
      source_button: 'Select Source Photo',
      source_label: 'Click or drag source photo here',
      target_button: 'Select Target Photo',
      target_label: 'Click or drag target photo here'
    },
    buttons: {
      swap: 'Perform Swap',
      reset: 'Reset',
      download: 'Download Result'
    },
    status: {
      processing: 'Processing, please wait...',
      success: 'Face swap completed!',
      error: 'Processing failed',
      error_fallback: 'Face swap processing failed',
      no_source: 'Please upload source and target photos first',
      downloaded: 'Image downloaded'
    },
    tech_info: {
      title: 'Technical Details',
      detection: 'Server-side face detection',
      processing: 'Server-side image processing'
    }
  },
  cloud_messaging_page: {
    hero: {
      title: 'Firebase Cloud Messaging',
      subtitle: 'Push Notification Admin Panel',
      description:
        'Manage push tokens and send notifications to registered devices'
    },
    intro:
      'Wait for PWA installation to complete before triggering notification permission request. Notifications will work after permission is granted.',
    form: {
      title_label: 'Notification Title',
      message_label: 'Notification Message',
      image_label: 'Notification Image URL',
      reset: 'Reset',
      submit: 'Submit',
      title_error: 'Please check the notification title',
      message_error: 'Please check the notification message'
    },
    table: {
      os: 'OS',
      token: 'Token',
      action: 'Action',
      delete: 'Delete',
      refresh: 'Refresh',
      no_data: 'No Data',
      no_data_hint: 'Please try again later'
    },
    status: {
      success:
        'Execution completed. Successfully sent push notifications to {success} devices, failed to send to {failure} devices',
      delete_success: 'Delete successful',
      delete_error: 'Delete failed'
    }
  },
  dialog_page: {
    hero: {
      title: 'Dialog Component Test',
      subtitle: 'Custom Dialog Component Demo',
      description: 'Testing custom dialog component vs Vuetify Dialog'
    },
    buttons: {
      open: 'Open',
      vuetify_dialog: 'Vuetify Dialog Comparison'
    },
    demo_coupon_title: 'Test Dialog Title'
  },
  drawer_page: {
    hero: {
      title: 'Drawer Component Test',
      subtitle: 'Custom Drawer Component Demo',
      description: 'Testing custom side drawer component functionality'
    },
    buttons: {
      left: 'Left',
      right: 'Right',
      top: 'Top',
      bottom: 'Bottom'
    }
  },
  slide_in_panel_page: {
    hero: {
      title: 'Slide-in Panel Test',
      subtitle: 'Custom Slide-in Panel Display',
      description: 'Testing the functionality of custom slide-in side panel'
    },
    describe: {
      text: 'Created a custom message queue to avoid package conflicts in company projects',
      strikethrough:
        'I wanted to use packages elegantly and easily, but reality did not permit it'
    },
    buttons: {
      test: 'Test Notification'
    },
    form: {
      message_label: 'Add Notification Message',
      left_enter_label: 'Enter from Left Side'
    }
  },

  image_upload_page: {
    hero: {
      title: 'Image Upload Component Test',
      subtitle: 'Custom ImageUpload Component Demo',
      description:
        'Test image upload component with drag-and-drop and preview support'
    },
    selected_image_label: 'Selected Image:'
  },
  phone_input_page: {
    hero: {
      title: 'Phone Number Input Component Demo',
      subtitle: 'Phone input component with country code selector and flag-icons',
      description: 'Phone input component supporting country code selector, return-object, and customizable styling'
    },
    credit: {
      prefix: 'This component was built with assistance from',
      author: 'Antigravity AI',
      suffix: ''
    },
    sections: {
      basic: {
        title: 'Basic Usage',
        desc: 'Defaults to Taiwan (+886) country code'
      },
      custom_default: {
        title: 'Custom Default Country Code',
        desc: 'Set default country code to United States (+1)',
        placeholder: 'Enter your phone number'
      },
      return_object: {
        title: 'Return Full Object',
        desc: 'Use return-object prop to retrieve comprehensive phone number info',
        placeholder: 'Please enter phone number'
      },
      custom_width: {
        title: 'Custom Dropdown Width',
        desc: 'Adjust the width of country code selector dropdown',
        placeholder: 'Please enter phone number'
      },
      form_demo: {
        title: 'Form Integration Demo',
        desc: 'Using phone number input inside a form',
        name_label: 'Name',
        name_placeholder: 'Please enter name',
        phone_label: 'Phone Number',
        submit_btn: 'Submit Form',
        submitted_data: 'Submitted Data:'
      },
      api: {
        title: 'API Documentation',
        props_title: 'Props',
        events_title: 'Events',
        return_format_title: 'Return Object Format (when returnObject is true)',
        th_prop: 'Prop Name',
        th_type: 'Type',
        th_default: 'Default',
        th_desc: 'Description',
        th_event: 'Event Name',
        th_params: 'Parameters',
        prop_model_value: 'v-model binding value',
        prop_default_country: 'Default country code (ISO 3166-1 alpha-2)',
        prop_placeholder: 'Input placeholder',
        prop_option_width: 'Dropdown list width',
        prop_return_object: 'Whether to return full object',
        event_update_model: 'Triggered when value changes',
        event_change: 'Triggered when value changes',
        event_focus: 'Triggered when input gains focus',
        event_blur: 'Triggered when input loses focus',
        default_placeholder: 'Please enter phone number'
      }
    },
    output_value: 'Output Value:',
    output_object: 'Output Object:',
    not_entered: '(Not entered yet)'
  },
  selector_page: {
    hero: {
      title: 'Dropdown Selector Test',
      subtitle: 'Custom Selector Component Demo',
      description: 'Test custom dropdown selector component functionality'
    },
    select_sport_label: 'Select Sport Type:',
    current_selected_label: 'Current Selection:',
    not_selected: '(Not selected yet)',
    sports: {
      football: 'Football',
      basketball: 'Basketball',
      esports: 'E-Sports',
      other: 'Default'
    }
  },
  lazyload_test_page: {
    hero: {
      title: 'Custom Lazyload Directive Test',
      subtitle: 'Custom Image Lazy Loading Directive Demo',
      description: 'Testing custom v-customize-lazyload directive functionality'
    },
    normal_image: 'Normal Image (Immediate load):',
    scroll_down: '⬇️ Please scroll down ⬇️',
    spacer_hint_p1: 'This area is a test spacer to ensure lazy-loaded images are not loaded before scrolling.',
    spacer_hint_p2: 'The image will only start loading when you scroll into its viewport area.',
    lazy_image: 'Lazy-loaded Image (Loads when visible):'
  },
  ripple_test_page: {
    hero: {
      title: 'Custom Ripple Directive Test',
      subtitle: 'Custom Click Ripple Effect Directive Demo',
      description: 'Testing custom v-customize-ripple directive functionality'
    },
    click_me: 'Click me to test custom ripple effect'
  },
  go_top_page: {
    hero: {
      title: 'Go Top Component Test',
      subtitle: 'Custom GoTop Component Demo',
      description: 'Testing custom scroll-to-top button component functionality'
    },
    scroll_hint: 'Scroll down to see the go-to-top button'
  },
  switch_button_page: {
    hero: {
      title: 'Switch Component Test',
      subtitle: 'Custom Switch Button Component Demo',
      description: 'Testing custom toggle switch button component functionality'
    },
    current_value: 'Current State',
    label: 'Live Only'
  },
  enter_label_page: {
    hero: {
      title: 'Text Animation Test',
      subtitle: 'Custom Animated Text Component Demo',
      description: 'Testing custom character-by-character text animation effect'
    },
    demo_title: 'Demo',
    test_title: 'Test Text',
    update: 'Update'
  },
  waving_image_page: {
    hero: {
      title: 'Waving Image Animation',
      subtitle: 'Custom Waving Image Component Demo',
      description: 'Testing custom image waving animation effect'
    },
    controls: 'Options',
    amplitude: 'Amplitude',
    period: 'Period',
    frequency: 'Frequency',
    fps: 'FPS',
    direction: 'Direction',
    direction_horizontal: 'Horizontal',
    direction_vertical: 'Vertical'
  },
  qr_code_page: {
    hero: {
      title: 'QR Code Component Test',
      subtitle: 'Custom QR Code Component Demo',
      description: 'Testing custom QR code generator component functionality'
    },
    input_label: 'Enter QR Code content'
  },
  skeleton_loader_page: {
    hero: {
      title: 'Skeleton Component Test',
      subtitle: 'Custom Skeleton Loader Demo',
      description:
        'Testing custom skeleton screen loader component functionality'
    },
    toggle_loading: 'Enable loading state',
    loaded_content: 'Content loaded'
  },
  countdown_page: {
    hero: {}
  },
  virtual_scroller_page: {
    hero: {
      title: 'Virtual Scroller Component Test',
      subtitle: 'Vuetify Virtual Scroll Component Demo',
      description:
        'Testing Vuetify v-virtual-scroll for efficient rendering of large datasets'
    },
    describe: {
      text: 'Testing whether items of different sizes display correctly'
    }
  },
  youtube_test_page: {
    hero: {
      title: 'YouTube Integration Test',
      subtitle: 'Custom YouTube Player Component Demo',
      description: 'Testing custom embedded YouTube player component'
    },
    describe: {
      text: 'Wrapped YouTube iframe into a component for unified management and styling'
    }
  },
  swiper_test_page: {
    hero: {
      title: 'Custom Swiper Test',
      subtitle: 'Custom Carousel Component Demo',
      description: 'Testing custom touch-enabled carousel component'
    },
    describe: {},
    demo: {
      current_slide: 'Current Slide',
      basic: {
        title: 'Basic Swipe',
        description: 'Use finger or mouse to drag and switch slides'
      },
      navigation: {
        title: 'Navigation Buttons',
        description:
          'Use hasNavigation prop to enable left/right navigation buttons'
      },
      events: {
        title: 'Event Handling',
        description:
          'Listen to change, sliderMove, sliderMoveEnd and other events',
        last_event: 'Last Event',
        log_title: 'Event Log'
      },
      ratio: {
        title: 'Swipe Ratio Adjustment',
        description:
          'Use longSwipesRatio to adjust the swipe distance required to switch slides',
        hint: 'Try different swipe distances'
      },
      slots: {
        title: 'Multi-position Slots',
        description:
          'Supports top, left, center, right, bottom five slot positions',
        top: 'Top Slot',
        left: 'Left',
        center: 'Center Area',
        right: 'Right',
        bottom: 'Bottom Slot'
      }
    },
    slides: {
      slide1: 'Slide 1',
      slide2: 'Slide 2',
      slide3: 'Slide 3',
      content1: 'This is the content of the first slide',
      content2: 'This is the content of the second slide',
      content3: 'This is the content of the third slide'
    },
    colors: {
      red: 'Red',
      green: 'Green',
      blue: 'Blue',
      purple: 'Purple'
    }
  },
  swiper_js_test_page: {
    hero: {
      title: 'Swiper.js Integration Test',
      subtitle: 'Swiper.js Library Integration Demo',
      description:
        'Testing Swiper.js integration with loop and autoplay features'
    },
    note: '📝 This component was created during Swiper v9 to v10 when official Vue/React component maintenance stopped in favor of Web Components. Since Swiper v11 (late 2023), official first-party Vue support has been restored and the official Vue package can be used directly.',
    basic_usage: 'Basic Usage:',
    loop_autoplay: 'Loop & Autoplay:'
  },
  wang_editor_page: {
    hero: {
      title: 'Wang Editor Integration Test',
      subtitle: 'Wang Editor Rich Text Editor Demo',
      description: 'Testing Wang Editor rich text editor integration'
    },
    describe: {
      text: 'Integrated Wang Editor as rich text editor for company project requirements'
    }
  },
  countdown_test_page: {
    hero: {
      title: 'Countdown Timer Test',
      subtitle: 'Custom Countdown Component Demo',
      description:
        'Testing custom flip-style countdown timer component functionality'
    },
    describe: {
      text: 'Handcrafted flip-style countdown timer to avoid package conflicts in company projects'
    },
    form: {
      seconds_label: 'Test Seconds:',
      flip_up: 'Flip Up',
      flip_down: 'Flip Down',
      update_btn: 'Update'
    },
    wip_notice: '*Under Construction↓'
  },
  components_test_page: {
    hero: {
      title: 'Components Integration Test',
      subtitle: 'Multi-Component Integration Demo',
      description:
        'Testing multiple custom components integration and interaction on a single page'
    }
  },
  tab_test_page: {
    hero: {
      title: 'Custom Tab Test',
      subtitle: 'Custom TabsBar/TabsContent Component Demo',
      description:
        'Testing custom tab switching component configurations and effects'
    }
  },
  scroll_fetch_page: {
    hero: {
      title: 'Pull-to-Refresh Component Test',
      subtitle: 'Custom ScrollFetch Component Demo',
      description:
        'Testing custom pull-to-refresh and infinite scroll component with GitHub API integration'
    },
    page_title: 'Custom Pull-to-Refresh & Infinite Scroll Test',
    page_github: 'Page GitHub',
    component_github: 'Component GitHub',
    use_project_token: 'Use project GitHub Token',
    input_token: 'Input GitHub Token',
    use_project_account: 'Use project GitHub Account',
    input_account: 'Input GitHub Account',
    github_account: 'GitHub Account',
    github_token: 'GitHub Token',
    reload: 'Reload',
    disable_user_select: 'Disable user-select',
    disable_pull_refresh: 'Disable pull-refresh',
    repo_name: 'Repo Name:',
    repo_desc: 'Repo Description:',
    repo_link: 'Repo Link:',
    repo_language: 'Main Language:',
    stargazers: 'Stars:',
    no_data: 'No data currently',
    warn_invalid_token: 'Please enter a valid token',
    warn_invalid_account: 'Please enter a valid GitHub account'
  },
  components: {
    description: {},
    tab: 'Tabs component test',
    scroll_fetch: 'Pull-to-refresh / Infinite scroll test',
    wang_editor: 'WangEditor (HTML editor) test',
    youtube: 'YouTube test',
    dialog: 'Dialog Component Test',
    components: 'Components Test (Tabs, Scroll Fetch, WangEditor, Youtube)',
    drawer: 'Drawer Component Test',
    selector: 'Selector Component Test',
    switch: 'Switch Component Test',
    skeleton_loader: 'Skeleton Loader Component',
    countdown_test: 'Countdown Component Test',
    image_upload_test: 'Image Upload Component Test',
    phone_input: 'Phone Input Component',
    go_top: 'Go Top Component Test',
    virtual_scroller: 'Virtual Scroller Component Test',
    slide_in_panel: 'Slide-in Panel Test',
    qr_code_test: 'QR Code Test',
    swiper_test: 'Custom Swiper Test',
    swiper_js_test: 'SwiperJS Test',
    banner_demo: 'Banner Carousel Component Test'
  },
  $vuetify: vuetifyEn,
  offline: {
    title: 'No Internet Connection',
    description: 'Please check your internet connection and try again later.',
    backOnline: "You're back online!",
    canRetry: 'You can now reload the page.',
    online: 'Online',
    offline: 'Offline',
    retry: 'Reload',
    goHome: 'Go Home',
    tipTitle: 'Tip',
    tipMessage: 'Previously visited pages can be browsed offline.',
    autoDetect: 'Network status changes will be detected automatically'
  },
  indexeddb_demo_page: {
    hero: {
      title: 'IndexedDB ORM Demo',
      subtitle: 'Local Database Operations',
      description:
        'Lightweight ORM utility for IndexedDB operations, supporting both Sequelize-style and chainable API'
    },
    status: {
      label: 'Database',
      connected: 'Connected',
      disconnected: 'Disconnected'
    },
    form: {
      title: 'Add User',
      name: 'Name',
      email: 'Email',
      age: 'Age',
      add: 'Add'
    },
    query: {
      title: 'Query Users',
      min_age: 'Min Age',
      max_age: 'Max Age',
      search: 'Search',
      load_all: 'Load All'
    },
    list: {
      title: 'User List',
      empty: 'No data available',
      years: 'years old'
    },
    bulk: {
      title: 'Bulk Operations',
      add_sample: 'Add Sample Data',
      clear_all: 'Clear All'
    },
    log: {
      title: 'Activity Log'
    }
  },
  ripples_component_page: {
    hero: {
      title: 'Ripples Background Component',
      subtitle: 'WebGL-based Interactive Water Ripple Background',
      description:
        'Encapsulated Vue component with mouse/touch interaction, auto drops, and customizable parameters'
    },
    view_directive: 'View Directive Version',
    demo: {
      title: 'Interactive Demo',
      interactive_hint: 'Water Ripple Effect Demo',
      touch_hint: 'Move or click to create ripples',
      controls: 'Parameter Controls',
      code_example: 'Code Example'
    },
    props: {
      title: 'Props Reference',
      description: 'Description',
      image_url: 'Background image URL (required)',
      resolution: 'Ripple resolution (recommended: 256, 512, 1024)',
      drop_radius: 'Drop radius',
      perturbance: 'Perturbance strength (recommended: 0.01 ~ 0.1)',
      interactive: 'Enable mouse/touch interaction',
      auto_drops: 'Enable auto drops effect',
      auto_drops_interval: 'Auto drops interval (ms)'
    }
  },
  banner_demo_page: {
    hero: {
      title: 'Banner Carousel Component Demo',
      description: 'Showcase various usage scenarios and configuration options of Banner component'
    },
    sections: {
      single: 'Single Banner (No Autoplay)',
      two: 'Two Banners (Autoplay)',
      three: 'Three Banners (Preview Effect)',
      five: 'Five Banners (Full Carousel)',
      custom_content: 'Custom Content Banner',
      custom_nav: 'Custom Navigation Buttons',
      different_heights: 'Different Height Settings',
      height_200: 'Height 200px',
      height_400: 'Height 400px',
      no_indicators: 'No Indicators and Navigation Buttons',
      keyboard_nav: 'Keyboard Navigation Test'
    },
    current_index: 'Current Banner Index: {index}',
    keyboard_guide: {
      info: 'Click on the Banner to focus it (a blue border will appear), then use the following keys:',
      prev: 'Previous',
      next: 'Next',
      toggle_play: 'Pause / Resume',
      first: 'First',
      last: 'Last'
    },
    banners: {
      single: {
        title: 'Single Banner',
        desc: 'This is the only banner and will not autoplay'
      },
      two_1: {
        title: 'Banner 1',
        desc: 'Two banners with autoplay'
      },
      two_2: {
        title: 'Banner 2',
        desc: 'Supports swipe gestures'
      },
      three_1: {
        title: 'Banner 1',
        desc: 'Three or more banners show left/right previews'
      },
      three_2: {
        title: 'Banner 2',
        desc: 'Hover to pause autoplay'
      },
      three_3: {
        title: 'Banner 3',
        desc: 'Supports infinite loop'
      },
      five_1: {
        title: 'Football Match',
        desc: 'Live sports broadcast'
      },
      five_2: {
        title: 'Basketball Game',
        desc: 'Passionate showdown'
      },
      five_3: {
        title: 'Tennis Open',
        desc: 'Top players battle'
      },
      five_4: {
        title: 'Esports Tournament',
        desc: 'World finals'
      },
      five_5: {
        title: 'Baseball League',
        desc: 'Playoffs started'
      },
      custom_1: {
        title: 'Custom Style 1',
        desc: 'Fully customized banner content'
      },
      custom_2: {
        title: 'Custom Style 2',
        desc: 'Freely designed with slots'
      },
      custom_3: {
        title: 'Custom Style 3',
        desc: 'Flexible component design'
      }
    }
  },
  ripples_directive_page: {
    hero: {
      title: 'Ripples Directive',
      subtitle: 'Vue Custom Directive for Water Ripple Effect',
      description:
        'Add water ripple effects to elements directly via directives without wrapper components'
    },
    view_component: 'View Component Version',
    code_example: 'Code Example',
    table: {
      option: 'Option',
      type: 'Type',
      default: 'Default'
    },
    animation: {
      description:
        'Basic water ripple animation directive with mouse/touch interaction',
      hint: 'Move or click to create ripples'
    },
    auto_drops: {
      description: 'Directive that automatically generates random water drops',
      hint: 'Auto-generating random water drops'
    },
    options: {
      title: 'Directive Options Reference',
      description: 'Description',
      image_url: 'Background image URL',
      resolution: 'Ripple resolution',
      interactive: 'Enable interaction',
      interval: 'Drop interval (ms)',
      drop_radius: 'Drop radius',
      strength: 'Base drop strength',
      strength_variance: 'Drop strength random variance'
    }
  },
  a_frame_demo_page: {
    title: 'Virtual Reality Lab',
    description: 'Virtual Reality lab experiments using A-Frame are currently under construction.',
    under_construction: 'A-Frame Page Under Construction',
    back_home: 'Back to Home'
  },
  krpano_demo_page: {
    hero: {
      title: 'Krpano Panorama Demo'
    },
    scenes: {
      scene1: 'Scene 1 - Aurora',
      scene2: 'Scene 2 - Starry Sky'
    },
    controls: {
      show: 'Show Controls',
      hide: 'Hide Controls',
      scene: 'Scene Switching',
      hotspots: 'Hotspot Management',
      add_hotspot: 'Add Hotspot',
      debug: 'Debug Mode',
      debug_on: 'On',
      debug_off: 'Off'
    },
    log: {},
    hotspot_form: {
      name_placeholder: 'Hotspot Name',
      ath_placeholder: 'Horizontal Angle (ATH)',
      atv_placeholder: 'Vertical Angle (ATV)',
      preset_icon: 'Preset Icon',
      custom_url: 'Custom URL',
      url_placeholder: 'Enter image URL',
      confirm: 'Add',
      cancel: 'Cancel'
    }
  },
  animation_page: {
    hero: {
      title: 'Animation Showcase',
      subtitle: 'CSS, WebGL & Animation Library Integrations',
      description:
        'A centralized showcase of animation components including text effects, water ripple backgrounds, CSS animations and other visual interaction techniques'
    },
    intro: {
      text: 'This section brings together various animation-related components and effect demos, covering pure CSS animations, WebGL water ripple effects, and custom text animation components — serving as an integrated animation technology laboratory.'
    },
    demos: {
      title: 'Animation Collection',
      enter_label: {
        label: 'Character-by-Character Text Effect',
        description:
          'Custom component for animated character-by-character text reveal with customizable entrance effects'
      },
      ripples: {
        label: 'Ripples Background Component',
        description:
          'WebGL-based interactive water ripple background with mouse/touch interaction and auto drops'
      },
      triangle_anime: {
        label: 'CSS Triangle Animation',
        description:
          'CSS triangle entrance animation effect with anime.js integration'
      },
      waving_image: {
        label: 'Waving Image Animation',
        description: 'Custom image waving animation component'
      }
    }
  },
  univer_doc_page: {
    title: 'Univer Doc Editor',
    description:
      'Online document editing powered by Univer with CDN loading demonstration.',
    remark: {
      lock_title: 'Lock State Export Notes:',
      local_export: 'Local Export (JSON Snapshot):',
      local_export_desc:
        'Can retain the lock state. Custom range properties are recorded in the Snapshot and remain effective after reloading JSON.',
      server_export: 'Server Export (DOCX/XLSX):',
      server_export_desc:
        "Cannot retain the lock state. Standard Office formats do not support Univer's custom range locking mechanism, so exported physical files will not contain editing restrictions.",
      univer_title: 'Univer Loading & Stability Notes:',
      univer_npm_desc:
        'The npm version of Univer seems to trigger endless re-renders in Nuxt due to bundle transpilation settings upon loading, so it has been switched to CDN. (To prove that the same code works properly in the NPM version, please refer to the {link} built with a clean Vue SPA project.)',
      univer_npm_demo_link: 'test page',
      univer_stability:
        'Currently, the Doc version is not very stable and prone to errors. If the editor fails to load properly, please try refreshing the page to reload the Univer package.',
      univer_cdn_wait:
        'Note that due to using a CDN, the initial loading time will be much longer than using the npm version. Please be patient.'
    },
    warning: {
      title: 'CDM Collab Edit Limitations:',
      desc: 'Currently testing the CDM version for collaborative editing will definitely throw a missing package error, so collaborative editing will likely not work when using the CDM version.'
    },
    tools: {
      current_role: 'Current Test Role:',
      input_room_id: 'Input Room ID',
      join: 'Join',
      create_room: 'Create Room',
      collab_edit: 'Collaborative Editing'
    },
    empty_room:
      'Currently no room specified. Please "Create Room" to test collaborative editing.',
    create_room_fail_title: 'Cannot Create Room:',
    create_room_fail_desc: 'Failed to create room. Please check the Console.'
  },
  univer_sheet_page: {
    title: 'Univer Sheet Editor',
    description:
      'Online spreadsheet powered by Univer with CDN loading demonstration.',
    remark: {
      univer_title: 'Univer Loading & Stability Notes:',
      univer_npm_desc:
        'The npm version of Univer seems to trigger endless re-renders in Nuxt due to bundle transpilation settings upon loading, so it has been switched to CDN. (To prove that the same code works properly in the NPM version, please refer to the {link} built with a clean Vue SPA project.)',
      univer_npm_demo_link: 'test page',
      univer_stability:
        'The Sheet version is relatively mature and rarely fails to load. However, if the editor still does not load properly, please try refreshing the page to reload the Univer package.',
      univer_cdn_wait:
        'Note that due to using a CDN, the initial loading time will be much longer than using the npm version. Please be patient.'
    },
    warning: {
      title: 'Online Environment Limitations:',
      collab: 'Collaborative Editing / Presentation Follow:',
      collab_desc:
        'Relies on the backend universer service for WebSocket message broadcasting, and collaboration-server for OT (Operational Transformation) algorithm synchronization.',
      room: 'Create / Join Room:',
      room_desc:
        'Relies on the collaboration-helper service to generate and store document snapshots (Snapshot API).',
      export: 'Physical File Export (XLSX):',
      export_desc:
        'To convert and export physical Office files on the server side, the high-resource exchange worker service is required.',
      overall_desc:
        'If you encounter feature failures or API errors in the online environment, it is usually due to the lack of the above backend Docker microservices (e.g., /universer-api). Since Vercel is currently used for deployment, you need to clone the project locally and connect the Univer docker services to test.'
    },
    tools: {
      current_role: 'Current Test Role:',
      input_room_id: 'Input Room ID',
      join: 'Join',
      create_room: 'Create Room',
      collab_edit: 'Collaborative Editing',
      live_share: 'Presentation Follow'
    },
    empty_room:
      'Currently no room specified. Please "Create Room" to test collaborative editing.',
    create_room_fail_title: 'Cannot Create Room:',
    create_room_fail_desc: 'Failed to create room. Please check the Console.'
  },
  univer_federation_doc_page: {
    title: 'Univer Federation Doc Editor',
    description:
      'Document editing integrating Univer via Module Federation with collaborative editing testing.',
    remark: {
      lock_title: 'Lock State Export Notes:',
      local_export: 'Local Export (JSON Snapshot):',
      local_export_desc:
        'Can retain the lock state. Custom range properties are recorded in the Snapshot and remain effective after reloading JSON.',
      server_export: 'Server Export (DOCX/XLSX):',
      server_export_desc:
        "Cannot retain the lock state. Standard Office formats do not support Univer's custom range locking mechanism, so exported physical files will not contain editing restrictions."
    },
    warning: {
      performance_issue:
        'Attempted to export and use the {link} version via Module Federation, but it currently loads very slowly and sometimes causes the entire website to become extremely laggy. The cause and solution have not yet been found.',
      parker_vue_lab: 'parker-vue-lab',
      title: 'Online Environment Limitations:',
      collab: 'Collaborative Editing / Presentation Follow:',
      collab_desc:
        'Relies on the backend universer service for WebSocket message broadcasting, and collaboration-server for OT (Operational Transformation) algorithm synchronization.',
      room: 'Create / Join Room:',
      room_desc:
        'Relies on the collaboration-helper service to generate and store document snapshots (Snapshot API).',
      export: 'Physical File Export (XLSX):',
      export_desc:
        'To convert and export physical Office files on the server side, the high-resource exchange worker service is required.',
      overall_desc:
        'If you encounter feature failures or API errors in the online environment, it is usually due to the lack of the above backend Docker microservices (e.g., /universer-api). Since Vercel is currently used for deployment, you need to clone the project locally and connect the Univer docker services to test.'
    },
    tools: {
      current_role: 'Current Test Role:',
      online_users: 'Online Users:',
      input_room_id: 'Input Room ID',
      join: 'Join',
      create_room: 'Create Room',
      collab_edit: 'Collaborative Editing'
    },
    empty_room:
      'Currently no room specified. Please "Create Room" to test collaborative editing.',
    create_room_fail_title: 'Cannot Create Room:',
    create_room_fail_desc: 'Failed to create room. Please check the Console.'
  },
  univer_federation_sheet_page: {
    title: 'Univer Federation Sheet Editor',
    description:
      'Spreadsheet integrating Univer via Module Federation with collaborative editing testing.',
    warning: {
      performance_issue:
        'Attempted to export and use the {link} version via Module Federation, but it currently loads very slowly and sometimes causes the entire website to become extremely laggy. The cause and solution have not yet been found.',
      parker_vue_lab: 'parker-vue-lab',
      title: 'Online Environment Limitations:',
      collab: 'Collaborative Editing / Presentation Follow:',
      collab_desc:
        'Relies on the backend universer service for WebSocket message broadcasting, and collaboration-server for OT (Operational Transformation) algorithm synchronization.',
      room: 'Create / Join Room:',
      room_desc:
        'Relies on the collaboration-helper service to generate and store document snapshots (Snapshot API).',
      export: 'Physical File Export (XLSX):',
      export_desc:
        'To convert and export physical Office files on the server side, the high-resource exchange worker service is required.',
      overall_desc:
        'If you encounter feature failures or API errors in the online environment, it is usually due to the lack of the above backend Docker microservices (e.g., /universer-api). Since Vercel is currently used for deployment, you need to clone the project locally and connect the Univer docker services to test.'
    },
    tools: {
      current_role: 'Current Test Role:',
      online_users: 'Online Users:',
      input_room_id: 'Input Room ID',
      join: 'Join',
      create_room: 'Create Room',
      collab_edit: 'Collaborative Editing',
      live_share: 'Presentation Follow'
    },
    empty_room:
      'Currently no room specified. Please "Create Room" to test collaborative editing.',
    create_room_fail_title: 'Cannot Create Room:',
    create_room_fail_desc: 'Failed to create room. Please check the Console.'
  },
  collabora: {
    file_saved: 'File Saved!',
    file_saved_as: 'Saved as {filename}!',
    save_as_dialog: {
      title: 'Save As',
      new_filename: 'New Filename (without extension)',
      error_empty: 'Please enter a filename',
      error_ext: 'Please do not enter the extension',
      extension: 'Extension',
      cancel: 'Cancel',
      confirm: 'Confirm'
    }
  },
  office_tool: {
    auth_form: {
      title: 'User Login Information',
      user_id: 'User ID',
      user_name: 'User Name',
      permissions_title: 'Permissions',
      disable_write: 'Disable Write',
      disable_rename: 'Disable Rename',
      disable_save_as: 'Disable Save As/Export',
      disable_export: 'Disable Download',
      disable_copy: 'Disable Copy',
      disable_print: 'Disable Print',
      submit_btn: 'Generate Token and Open Editor',
      generate_token_failed: 'Failed to generate Token, please try again'
    },
    guide: {
      title: 'Docker Startup and Troubleshooting Guide',
      copy_success: 'Command copied',
      copy_failed: 'Copy failed',
      unauthorized_host_desc:
        'If you see an "Unauthorized Host" error in the editor, it means Collabora has not authorized access to the project URL. Please choose the corresponding startup command according to your Nuxt runtime environment (Port is 9980):',
      http_env: 'HTTP Environment (Simplest and Recommended)',
      https_env: 'HTTPS Environment (Need to bypass self-signed cert check)',
      note_1:
        'Note: Because Collabora runs inside a Docker container, it cannot access the local Nuxt API directly via localhost.',
      note_2:
        'Therefore, wopiHost must be filled with your local network IP (e.g., 192.168.x.x) or host.docker.internal.',
      note_3:
        'At the same time, the corresponding IP domain must be included in the aliasgroup1 of the startup command to pass authorization.',
      troubleshoot_mixed_content_title:
        '[Troubleshooting] Mixed Content Blocked (Cannot establish connection)',
      troubleshoot_mixed_content_desc1:
        'If your Nuxt is running on https://localhost:3000 but Collabora is running on HTTP, the browser will directly block the Iframe.',
      troubleshoot_mixed_content_desc2:
        'Solution: Use the HTTPS environment Docker command above, and set VITE_COLLABORA_HOST to https://localhost:9980 in your .env.',
      troubleshoot_mixed_content_desc3:
        '[Note] If using HTTPS, since Collabora generates a self-signed certificate, you must manually open a new tab to https://localhost:9980 and click "Advanced -> Proceed" to trust the certificate.',
      troubleshoot_websocket_title:
        '[Troubleshooting] WebSocket Disconnected (Data frame received after close)',
      troubleshoot_websocket_desc1:
        'If the editor screen freezes and this error appears in the Console, it is usually because Collabora tries to connect back to your Nuxt HTTPS API to read the file, but because your certificate is self-signed, it is blocked and disconnected by Collabora.',
      troubleshoot_websocket_desc2:
        'Solution: The HTTPS command must include --o:ssl.ssl_verification=false to disable Collabora SSL verification.'
    }
  },
  tiptap_doc_page: {
    title: 'Tiptap Doc Editor',
    description:
      'Rich text document editing using Tiptap with docx and mammoth integration testing.',
    limitations_title: 'Tiptap + docx + mammoth POC Limitations',
    limitations_summary: 'The following items are features that "cannot be done" or "cannot be reliably saved back to Word even if visually possible".',
    word_impact: 'Impact on Word Save:',
    limits: {
      open_word: {
        statusText: 'Possible but may distort',
        title: '1. Open Word Online',
        reason: 'mammoth can convert .docx to HTML for Tiptap editing, but it is not a Word layout engine. Headers, footers, comments, track changes, complex styles, text boxes, etc. may be lost.',
        wordImpact: 'Can be saved as a new .docx, but not a full round-trip of the original file. Word-specific information lost during import cannot be restored.'
      },
      editable_region: {
        statusText: 'Currently not possible',
        title: '4. Support for editable regions',
        reason: 'Tiptap can make the whole document read-only/editable; partial editable regions require a custom NodeView, extension, or permission model, which is not built into Tiptap + mammoth + docx.',
        wordImpact: 'Even if the frontend implements partial locking, it cannot use content controls or protection zone settings that convert reliably to Word.'
      },
      edit_history: {
        statusText: 'Possible but cannot naturally save back',
        title: '5. Edit history for every user',
        reason: 'The current POC history is a frontend memory list, only showing who did what. Formal multi-person history requires backend storage of transactions, diffs, or version records.',
        wordImpact: 'docx can write comments or custom metadata separately, but it is not equivalent to Word native track changes; history cannot be saved into .docx.'
      },
      auto_chapter_numbering: {
        statusText: 'Partially possible',
        title: '6. Auto-increment chapter numbering on adding chapters',
        reason: 'Currently, chapter scanning on screen and CSS counters can demonstrate automatic chapter addition; but formal chapter/list continuation requires a stricter document model, not just HTML text scanning.',
        wordImpact: 'Can use docx numbering to generate multi-level lists, but if required to seamlessly connect with existing Word document list definitions, mammoth import may not retain original numbering ids.'
      },
      full_toolbar: {
        statusText: 'Not equivalent to Word toolbar',
        title: '8. Full toolbar display',
        reason: 'Tiptap only provides editing commands supported by extensions. To make a full ribbon close to Word requires massive extensions, custom UI, and formatting conversion rules.',
        wordImpact: 'Even if the frontend shows many format buttons, only formats written into the HTML -> docx converter can be reliably saved into .docx.'
      },
      excel_formula: {
        statusText: 'Currently not possible',
        title: '9. Excel embedding and formulas',
        reason: 'Word embedded Excel is an OLE object, browser-side Tiptap/docx is not suitable for creating or editing such binary embedded objects. Formulas can use a math extension, but that is for math, not Excel spreadsheet formulas.',
        wordImpact: 'Can consider exporting tables or formulas as images, HTML tables, text results, or OMML math formulas; cannot save editable Excel or Excel formulas into .docx.'
      }
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineI18nLocale(async (locale) => {
  return {
    ...en,
    ...univerCustomEnUS
  };
});
