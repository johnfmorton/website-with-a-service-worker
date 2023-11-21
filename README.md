# Website with a Service Worker

This is an example repo to use as reference when setting up a service worker. It accompanies a blog post that goes into detail on the set up process.

## Basic usage

1. Install dependencies: `npm install`
2. To test the service worker, use the script with `-dev` in their names. For example: `npm run workbox-dev-1`
3. Build the production version of the service worker into the web directory: `npm run workbox`
4. Remove the old version of the service worker and build a new production server worker with `npm run build-sw`.

The `npm run build-sw` script can be incorporated into your other build script as shown in the `npm run build` script in the package.json file.
