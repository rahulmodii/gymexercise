// public/service-worker.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    // Cache image files
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

// Cache CSS and JavaScript files
registerRoute(
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script',
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

// Cache API responses
registerRoute(
    ({ request }) => request.destination === 'fetch',
    new NetworkFirst({
        cacheName: 'api-cache',
    })
);
