STATIC_CACHE_NAME = 'dev-static-v2';

let deleteOldCache = () => {
  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (cacheName) {
              return cacheName !== STATIC_CACHE_NAME;
            })
            .map(function (cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
    );
  });
};

let cacheUI = () => {
  self.addEventListener('fetch', (event) => {
    if (
      !event.request.url.includes('api') &&
      !event.request.url.includes('/company/individual/')
    ) {
      event.respondWith(
        caches.open(STATIC_CACHE_NAME).then(async (cache) => {
          const response = await cache.match(event.request);
          return (
            response ||
            fetch(event.request).then((response_1) => {
              cache.put(event.request, response_1.clone());
              return response_1;
            })
          );
        })
      );
    }
  });
};

let updateServiceWorker = () => {
  self.addEventListener('message', function (event) {
    if (event.data.action === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
};

deleteOldCache();
updateServiceWorker();
cacheUI();
