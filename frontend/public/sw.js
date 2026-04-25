const CACHE_NAME = 'trustreview-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip all external API calls and non-GET requests
  if (event.request.url.includes('render.com') || 
      event.request.url.includes('api') ||
      event.request.method !== 'GET') {
    return fetch(event.request);
  }

  // Only handle GET requests for static assets
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200) {
              return response;
            }

            // Only cache same-origin requests
            if (event.request.url.startsWith(self.location.origin)) {
              // Clone response
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          }
        ).catch((error) => {
          console.log('Fetch failed, serving from cache or offline page:', error);
          
          // Return cached version if available
          if (response) {
            return response;
          }
          
          // Return offline page for navigation requests
          if (event.request.destination === 'document' || 
              event.request.url.endsWith('/') ||
              event.request.url.includes('/index.html')) {
            return caches.match('/offline.html');
          }
          
          // For other requests, return a basic offline response
          return new Response('Offline - Service unavailable', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
