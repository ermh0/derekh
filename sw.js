const CACHE="derekh-vmvpg2vwc";
const SHELL=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","icons/apple-touch-icon.png","fonts/alegreya-cyrillic-500-normal.woff2","fonts/alegreya-cyrillic-700-normal.woff2","fonts/alegreya-cyrillic-800-normal.woff2","fonts/alegreya-latin-500-normal.woff2","fonts/alegreya-latin-700-normal.woff2","fonts/alegreya-latin-800-normal.woff2","fonts/frank-ruhl-libre-hebrew-400-normal.woff2","fonts/frank-ruhl-libre-hebrew-700-normal.woff2","fonts/frank-ruhl-libre-latin-400-normal.woff2","fonts/frank-ruhl-libre-latin-700-normal.woff2","fonts/golos-text-cyrillic-400-normal.woff2","fonts/golos-text-cyrillic-500-normal.woff2","fonts/golos-text-cyrillic-600-normal.woff2","fonts/golos-text-latin-400-normal.woff2","fonts/golos-text-latin-500-normal.woff2","fonts/golos-text-latin-600-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match("index.html"))));
});
