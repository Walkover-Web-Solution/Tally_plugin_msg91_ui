
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Tally_plugin_msg91_ui/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Tally_plugin_msg91_ui/app",
    "route": "/Tally_plugin_msg91_ui"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TCVFGJNU.js",
      "chunk-THL3BJOR.js",
      "chunk-TVCC6NOX.js",
      "chunk-DL45R3KN.js",
      "chunk-M4UOAXVA.js"
    ],
    "route": "/Tally_plugin_msg91_ui/app"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YBOIDNYJ.js",
      "chunk-THL3BJOR.js",
      "chunk-HVADP46R.js",
      "chunk-TVCC6NOX.js",
      "chunk-JI4FHBYO.js",
      "chunk-DL45R3KN.js",
      "chunk-5GFR4ER6.js",
      "chunk-M4UOAXVA.js"
    ],
    "route": "/Tally_plugin_msg91_ui/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4VYOAN2B.js",
      "chunk-HVADP46R.js",
      "chunk-TVCC6NOX.js",
      "chunk-5GFR4ER6.js",
      "chunk-M4UOAXVA.js"
    ],
    "route": "/Tally_plugin_msg91_ui/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JG3IZYB5.js",
      "chunk-JI4FHBYO.js",
      "chunk-DL45R3KN.js",
      "chunk-5GFR4ER6.js",
      "chunk-M4UOAXVA.js"
    ],
    "route": "/Tally_plugin_msg91_ui/layout"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Tally_plugin_msg91_ui/app",
    "route": "/Tally_plugin_msg91_ui/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 64043, hash: '38ba24babcfa3e7c6d2b811d21e9047dc1ddba303ad156d1c4a5be127229187e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17313, hash: '967b96d6ad0954abad6813fd76ac68aadf4300dca37e7427f9a906560ae1b43a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'app/index.html': {size: 104512, hash: 'e5db30ef28a4dca452e1b6289f45a4bc90731d077a5398290bcfd2e88abfceaa', text: () => import('./assets-chunks/app_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 94414, hash: 'e90470b8773de21afbcb03adf911946ba3189755caa9d16b73e0ecf5b57405ba', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 134269, hash: 'faea06cb9d8631c607f5b20952868fc9eb415ed224c8cefdc45493f1e210987f', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'layout/index.html': {size: 99195, hash: '1af75ea6441fbad18b3af8c6aae130eaecb52b51f75eda3dfe53f6840e2beea0', text: () => import('./assets-chunks/layout_index_html.mjs').then(m => m.default)},
    'styles-4B4UCG5E.css': {size: 104653, hash: 'B3xpbS4xt70', text: () => import('./assets-chunks/styles-4B4UCG5E_css.mjs').then(m => m.default)}
  },
};
