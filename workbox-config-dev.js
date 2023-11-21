// workbox-config.js
/*
This file is used by the Workbox CLI to generate a complete service worker.
It defines which files are pre-cached and routed in the globDirectory and the
patterns matched in that directory, we can also exclude files in the globIgnores
option. We also define where the service worker is sourced from and generated to.
 */

module.exports = {
  globDirectory: 'web/',
  globPatterns: [
    'static/**/*.{js,css,png,jpg,webp,svg,woff,woff2}',
    'offline-message.html',
    'offline-clouds.jpg',
  ],
  // if you have files you don't want to pre-cache, add them here
  globIgnores: [
    'static/example-to-ignore.jpg',
  ],
  swDest: 'web/sw-test.js',
  swSrc: 'web/sw-test.js'
};
