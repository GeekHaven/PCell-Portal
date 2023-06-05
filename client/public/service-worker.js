CACHE_NAME = 'static-cache-v1';

let cacheUI = () => {
  self.addEventListener('fetch', (event) => {
    if (
      !event.request.url.includes('api') &&
      !event.request.url.includes('/company/individual/')
    ) {
      event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
          return cache.match(event.request).then((response) => {
            return (
              response ||
              fetch(event.request).then((response) => {
                cache.put(event.request, response.clone());
                return response;
              })
            );
          });
        })
      );
    }
  });
};

cacheUI();
