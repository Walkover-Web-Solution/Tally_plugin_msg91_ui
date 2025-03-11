
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/Tally_plugin_msg91_ui/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/Tally_plugin_msg91_ui"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 536, hash: '0709548f9620a4be0a9630e75d84b9b108e80dda86962257ee505b1de8c4ee0f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1049, hash: '90b1d655f326a0663461c06376c064d481ed7fa53222e55c4a6320e3a1e60d2f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
