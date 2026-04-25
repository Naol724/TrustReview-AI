const CACHE_NAME = 'trustreview-v1';
const STATIC_CACHE = 'trustreview-static-v1';
const API_CACHE = 'trustreview-api-v1';

// Essential files to cache during install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html'
];

// Install event - Pre-cache essential files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching essential files');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - Handle different caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  console.log('Service Worker: Fetching:', request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    console.log('Service Worker: Skipping non-GET request:', request.method);
    return;
  }

  // Handle external API calls (Network-first strategy)
  if (url.origin.includes('render.com') || url.pathname.includes('/api/')) {
    console.log('Service Worker: API call detected - Network-first strategy');
    event.respondWith(
      caches.open(API_CACHE)
        .then((cache) => {
          return fetch(request)
            .then((response) => {
              // Cache successful responses
              if (response.status === 200) {
                console.log('Service Worker: Caching API response');
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              console.log('Service Worker: Network failed, trying cache');
              return cache.match(request);
            });
        })
    );
    return;
  }

  // Handle same-origin requests (Cache-first strategy)
  if (url.origin === self.location.origin) {
    console.log('Service Worker: Same-origin request - Cache-first strategy');
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          // Return cached version if available
          if (cachedResponse) {
            console.log('Service Worker: Serving from cache:', request.url);
            return cachedResponse;
          }

          // Otherwise, fetch from network
          console.log('Service Worker: Fetching from network:', request.url);
          return fetch(request)
            .then((response) => {
              // Check if response is valid
              if (!response || response.status !== 200) {
                console.log('Service Worker: Invalid response:', response.status);
                return response;
              }

              // Clone and cache the response
              const responseToCache = response.clone();
              console.log('Service Worker: Caching response:', request.url);
              
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });

              return response;
            })
            .catch((error) => {
              console.error('Service Worker: Network failed:', error);
              
              // For navigation requests, serve index.html (SPA fallback)
              if (request.destination === 'document' || 
                  request.url.endsWith('/') ||
                  request.url.includes('/index.html')) {
                console.log('Service Worker: Serving index.html as fallback');
                return caches.match('/index.html');
              }
              
              // For other requests, serve offline page
              console.log('Service Worker: Serving offline page');
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // Handle other requests (pass through)
  console.log('Service Worker: Pass-through request:', request.url);
  event.respondWith(fetch(request));
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync:', event.tag);
  // Handle any offline actions that need to be synced
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  // Handle push notifications if needed
});
