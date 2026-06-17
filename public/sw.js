const PROXY_PREFIX = '/iptv/proxy/';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith(PROXY_PREFIX)) return;

  const parts = url.pathname.slice(PROXY_PREFIX.length).split('/');
  const protocol = parts.shift();
  const host = parts.shift();
  const path = '/' + parts.join('/') + (url.search || '');
  const target = protocol + '://' + host + path;

  e.respondWith(fetch(target).catch(() => new Response('Proxy error', { status: 502 })));
});
