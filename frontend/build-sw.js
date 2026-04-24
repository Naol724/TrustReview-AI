import { generateSW } from 'workbox-build';

generateSW({
  globDirectory: 'dist',
  globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,json,txt}'],
  swDest: 'dist/sw.js',
  navigateFallback: 'index.html',
  navigateFallbackAllowlist: [/^(?!\/__).*/],
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\/api\//i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
}).then(({count, size, warnings}) => {
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);
}).catch(console.error);
