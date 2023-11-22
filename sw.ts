/* This is the file that will be used to generate the service worker.
 * It will be compiled to sw.js and placed in the root of the public folder.
 * See the "workbox" script in package.json for the command.
 */

import {setDefaultHandler} from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

import { offlineFallback } from 'workbox-recipes';

const pageFallback = 'offline-message.html';
const imageFallback = 'offline-clouds.jpg';
const fontFallback = '/static/fonts/Inter.var.woff2?v=3.19';

setDefaultHandler(new NetworkOnly());

// Register a navigation route to respond with the cached offline page and image.
offlineFallback({
  pageFallback: pageFallback,
  imageFallback: imageFallback,
  fontFallback: fontFallback,
});
