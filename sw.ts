/* This is the file that will be used to generate the service worker.
 * It will be compiled to sw.js and placed in the root of the public folder.
 * See the "workbox" script in package.json for the command.
 */

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

import { offlineFallback } from 'workbox-recipes';

const pageFallback = 'offline-message.html';
const imageFallback = 'offline-clouds.jpg';

declare const self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is TOKEN that will be replaced with a list of URLs
// be precached by Workbox. This list is included in the final sw.js file
// by the injectManifest build step.
precacheAndRoute(self.__WB_MANIFEST);

// Register a navigation route to respond with the cached offline page and image.
offlineFallback({
  pageFallback,
  imageFallback
});

registerRoute(
  ({ url }) =>
  (
    !_isAction(url) &&
    !_isAdmin(url) &&
    !_hasUtm(url) &&
    !_hasFbclid(url) &&
    !_isCpResource(url)
    ),
  new NetworkFirst({
    cacheName: 'supergeekery-html-cache',
    plugins: [
      {
        handlerDidError: async () => {
          return caches.match('/offline-message.html'); // Return the offline HTML page
        },
      },
    ],
  }),
);


registerRoute(
  ({ url }) => url.origin === 'https://static.supergeekery.com',
  // https://unpkg.com/browse/@types/workbox-strategies@4.3.0/CacheFirst.d.ts
  new CacheFirst({
    cacheName: 'supergeekery-static-cache',
    fetchOptions: {
      // https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
      mode: 'no-cors',
    },
    matchOptions: {
      // https://www.w3.org/TR/service-workers/#cache-query-options-dictionary
      ignoreVary: true, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
      // https://tpiros.dev/blog/what-is-an-opaque-response/
      new CacheableResponsePlugin({
        statuses: [0, 200], // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      }),
    ],
  }),
);

// Helper functions for the routes above

/*
* Does this URL have a utm parameter?
*
* A UTM parameter is a query parameter that you can attach to a  URL in order
* to track a source, medium, campaign name, term, and content. This enables Analytics
* to tell you where searchers came from as well as what campaign directed them
* to a web page.
*/
function _hasUtm(url: URL) {
    return url.searchParams.has('utm');
}

/*
* Does this URL have a fbclid parameter?
*
* FBCLID is a query parameter that appears in URLs when a user clicks on a link
* that takes them from Facebook to another website. The FBCLID parameter is
* automatically added to the URL by Facebook when a user clicks on a link
* shared on Facebook.
*/
function _hasFbclid(url: URL) {
    return url.searchParams.has('fbclid');
}

/*
* Is this a Craft CMS action URL?
*
* Craft CMS has a special URL format for actions. This is a test to see if the
* URL is one of those. Since the "action" keyword can be changed in the
* Craft CMS config, this is a test to see if the URL starts with the default
* action URL. If you've changed the action URL, you'll need to change this
* function to reflect the action word you've chosen.
*
* https://craftcms.com/docs/4.x/extend/controllers.html#action-paths
*/
function _isAction(url: URL) {
  return url.pathname.startsWith('/actions/');
}

/*
*  Is this a Craft CMS admin URL?
*
* Craft CMS has a special URL format for the admin. This is a test to see if the
* URL is one of those. Since the "cpTrigger" keyword can be changed in the
* Craft CMS config, this is a test to see if the URL starts with the default
* admin URL. If you've changed the admin URL, you'll need to change this
* function to reflect the admin word you've chosen.
*
* https://craftcms.com/docs/4.x/config/general.html#cptrigger
*/
function _isAdmin(url: URL) {
  return url.pathname.startsWith('/admin/');
}

/*
* Is this a Craft CMS CP resource URL?
*
* Craft CMS has resources that are used within the control panel. This
* location is determined by the "resourceBasePath" config setting. It defaults
* to /cpresources/. This is a test to see if the URL is one of those.
* If you've changed the "resourceBasePath", you'll need to change this
* function to reflect the path you've chosen.
*
* https://craftcms.com/docs/4.x/config/general.html#resourcebasepath
*/
function _isCpResource(url: URL) {
  return url.pathname.startsWith('/cpresources/');
}
