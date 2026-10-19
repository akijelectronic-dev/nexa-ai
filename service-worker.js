/* ═══════════════════════════════════════════════════════
   NEXA AI — Service Worker (Offline Support)
   Author: AL-AMIN
   Part 29/30
   ═══════════════════════════════════════════════════════ */

'use strict';

const CACHE_NAME = 'nexa-ai-v1.0.0';

// Files to cache for offline use
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './js/core/config.js',
  './js/core/engine.js',
  './js/core/loader.js',
  './js/core/storage.js',
  './js/core/version.js',
  './js/core/boot.js',
  './js/tisha/face.js',
  './js/tisha/body.js',
  './js/tisha/animations.js',
  './js/tisha/emotions.js',
  './js/ai/groq.js',
  './js/ai/openrouter.js',
  './js/ai/router.js',
  './js/modules/chat.js',
  './js/modules/vision.js',
  './js/modules/voice.js',
  './js/modules/documents.js',
  './js/modules/memory.js',
  './js/modules/imagegen.js',
  './js/ui/main-ui.js',
  './js/ui/chat-ui.js',
  './js/ui/settings.js',
  './js/ui/notifications.js',
  './js/admin/auth.js',
  './js/utils/helpers.js',
  './js/utils/language.js'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching app assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Offline Fallback)
self.addEventListener('fetch', event => {
  // Skip non-GET requests or API calls
  if (event.request.method !== 'GET' || event.request.url.includes('workers.dev')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
