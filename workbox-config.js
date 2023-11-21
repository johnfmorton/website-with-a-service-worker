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
  // These options are not required, because they don't fall within
  // the globPatterns above. That's why they're commented out.
  globIgnores: [
    // 'an-example-to-exclude-a-file.jpg',
  ],
  swDest: 'web/sw.js',
  swSrc: 'web/sw.js'
};
