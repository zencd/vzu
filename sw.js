//console.log('sw.js working');

const CACHE_NAME = 'local-fonts-v1';
const FONT_ASSETS = [
  '/static/font/Handjet/Handjet-VariableFont_ELGR,ELSH,wght.ttf'
];

// 1. Install: Pre-cache specific local fonts
self.addEventListener('install', event => {
  console.log('sw.js install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Add assets to cache:', CACHE_NAME);
      return cache.addAll(FONT_ASSETS);
    })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// 2. Activate: Clean up old versions of the cache
self.addEventListener('activate', event => {
  console.log('sw.js activate');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch: Cache-First Strategy for fonts
self.addEventListener('fetch', event => {
  //console.log('sw.js fetch', event.request.url);
  if (event.request.destination === 'font') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        //if (cachedResponse) console.log('cachedResponse:', cachedResponse)
        return cachedResponse || fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            //console.log('put response into cache:', event.request);
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});