const e=["./","index.html","css/base.css","css/desktop.css","css/new.css","css/palette.css","img/placeholder.svg","img/favicon/logo24.png","img/favicon/logo48.png","img/favicon/logo192.png","img/demo/andrew-hughes-261571-unsplash.jpg","img/demo/ever-wild-634729-unsplash.jpg","img/demo/will-turner-1244879-unsplash.jpg","js/chunk-76c6e771.js","js/db-worker.js","js/index.js","lib/node-vibrant/vibrant.js","lib/node-vibrant/worker.js","lib/pwacompat.js","lib/shimport.js"],s="color-breakdown-67e8118e6f0bf9c43a10bdcde61bc5cb7270df07";self.addEventListener("install",t=>{t.waitUntil(async function(){return(await caches.open(s)).addAll(e)}())}),self.addEventListener("activate",e=>{e.waitUntil(async function(){const e=await caches.keys();return Promise.all(e.filter(e=>e!==s).map(e=>caches.delete(e)))}())}),self.addEventListener("fetch",e=>{e.respondWith(async function(e){const s=await caches.match(e);if(s)return s;try{return await fetch(e)}catch(s){if("www.googletagmanager.com"!==new URL(e.url).hostname)throw new TypeError("Failed to fetch Google Analytics");throw new TypeError(`Failed to fetch: ${e.url}`)}}(e.request))});
//# sourceMappingURL=sw.js.map
