const t=(t,e)=>e.some(e=>t instanceof e);let e,o;const r=new WeakMap,n=new WeakMap,a=new WeakMap,i=new WeakMap,s=new WeakMap;let c={get(t,e,o){if(t instanceof IDBTransaction){if("done"===e)return n.get(t);if("objectStoreNames"===e)return t.objectStoreNames||a.get(t);if("store"===e)return o.objectStoreNames[1]?void 0:o.objectStore(o.objectStoreNames[0])}return d(t[e])},has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function l(t){return t===IDBDatabase.prototype.transaction&&"objectStoreNames"in IDBTransaction.prototype?function(e,...o){const r=t.call(p(this),e,...o);return a.set(r,e.sort?e.sort():[e]),d(r)}:(o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(p(this),e),d(r.get(this))}:function(...e){return d(t.apply(p(this),e))}}function u(o){return"function"==typeof o?l(o):(o instanceof IDBTransaction&&function(t){if(n.has(t))return;const e=new Promise((e,o)=>{const r=()=>{t.removeEventListener("complete",n),t.removeEventListener("error",a),t.removeEventListener("abort",a)},n=()=>{e(),r()},a=()=>{o(t.error),r()};t.addEventListener("complete",n),t.addEventListener("error",a),t.addEventListener("abort",a)});n.set(t,e)}(o),t(o,e||(e=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(o,c):o)}function d(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,o)=>{const r=()=>{t.removeEventListener("success",n),t.removeEventListener("error",a)},n=()=>{e(d(t.result)),r()},a=()=>{o(t.error),r()};t.addEventListener("success",n),t.addEventListener("error",a)});return e.then(e=>{e instanceof IDBCursor&&r.set(e,t)}),s.set(e,t),e}(t);if(i.has(t))return i.get(t);const e=u(t);return e!==t&&(i.set(t,e),s.set(e,t)),e}const p=t=>s.get(t);const m=["get","getKey","getAll","getAllKeys","count"],y=["put","add","delete","clear"],h=new Map;function f(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(h.get(e))return h.get(e);const o=e.replace(/FromIndex$/,""),r=e!==o;if(!(o in(r?IDBIndex:IDBObjectStore).prototype))return;let n;return m.includes(o)&&(n=function(t,...e){let n=this.transaction(t).store;return r&&(n=n.index(e.shift())),n[o](...e)}),y.includes(o)&&(n=function(t,...e){const r=this.transaction(t,"readwrite");return r.store[o](...e),r.done}),n&&h.set(e,n),n}function g(t){if(null==t)return null;const e=t.id,o=function(t){const[e,o]=t.split(",",2),r=e.split(":",2)[1].split(";",1)[0],n=atob(o),a=new ArrayBuffer(n.length),i=new Uint8Array(a);for(let t=0;t<n.length;t++)i[t]=n.charCodeAt(t);return new Blob([a],{type:r})}(t.imgSrc);return{timestamp:e,imgSrc:URL.createObjectURL(o),colors:t.colors,name:t.name||new Date(e).toLocaleString()}}c=(t=>({get:(e,o,r)=>f(e,o)||t.get(e,o,r),has:(e,o)=>!!f(e,o)||t.has(e,o)}))(c);const w="#FFFFFF",b="#FFFFFF",C={1:{timestamp:1,imgSrc:"img/demo/andrew-hughes-261571-unsplash.jpg",name:"Photo by Andrew Hughes on Unsplash",colors:{vibrant:{color:"#AE340E",textColor:w},darkVibrant:{color:"#6C140C",textColor:w},lightVibrant:{color:"#DACC9B",textColor:b},muted:{color:"#9F805F",textColor:w},darkMuted:{color:"#3B3945",textColor:w},lightMuted:{color:"#DAD3B0",textColor:b}}},2:{timestamp:2,imgSrc:"img/demo/ever-wild-634729-unsplash.jpg",name:"Photo by ever wild on Unsplash",colors:{vibrant:{color:"#FBA409",textColor:b},darkVibrant:{color:"#7C0404",textColor:w},lightVibrant:{color:"#F9A250",textColor:b},muted:{color:"#AC784C",textColor:w},darkMuted:{color:"#8C6C44",textColor:w},lightMuted:{color:"#BC987A",textColor:b}}},3:{timestamp:3,imgSrc:"img/demo/will-turner-1244879-unsplash.jpg",name:"Photo by Will Turner on Unsplash",colors:{vibrant:{color:"#1E8EE0",textColor:w},darkVibrant:{color:"#061C2C",textColor:w},lightVibrant:{color:"#8AC4EF",textColor:b},muted:{color:"#777C80",textColor:w},darkMuted:{color:"#253D4C",textColor:w},lightMuted:{color:"#BBBCC4",textColor:b}}}},D=function(t,e,{blocked:o,upgrade:r,blocking:n}={}){const a=indexedDB.open(t,e),i=d(a);return r&&a.addEventListener("upgradeneeded",t=>{r(d(a.result),t.oldVersion,t.newVersion,d(a.transaction))}),o&&a.addEventListener("blocked",()=>o()),n&&i.then(t=>t.addEventListener("versionchange",n)),i}("history-store",2,{upgrade(t,e){switch(e){case 0:t.createObjectStore("history",{keyPath:"id"});case 1:t.createObjectStore("example",{keyPath:"id"})}}});async function v(t){const e=await Promise.all(t.map(async t=>{const e=await fetch(t.imgSrc).then(t=>t.blob()),o=await function(t){return new Promise((e,o)=>{const r=new FileReader;r.onload=(()=>e(r.result)),r.onerror=(()=>o(r.error)),r.readAsDataURL(t)})}(e);return function(t){"blob:"===new URL(t).protocol&&URL.revokeObjectURL(t)}(t.imgSrc),{id:t.timestamp,imgSrc:o,colors:t.colors,name:t.name}})),o=await D,{store:r,done:n}=await o.transaction("history","readwrite");return e.forEach(t=>r.put(t)),await n,e}async function x(t,e){console.log(t.type,t.payload);try{switch(t.type){case"SAVE":if(t.payload.length>0){const o=await v(t.payload);e({type:"DISPLAY",payload:{entry:g(o[0]),firstLoad:!1,updateHash:!0}}),e({type:"ADD",payload:o.map(g)})}return;case"LOAD":return void await async function(t,e){const o=await D,r=await o.transaction(["history","example"]);await Promise.all([r.objectStore("example").openCursor().then(async e=>{for(;e;)e.value.hidden&&t(e.key),e=await e.continue()}),r.objectStore("history").openCursor().then(async t=>{for(;t;)e(g(t.value)),t=await t.continue()})])}(t=>e({type:"REMOVE",payload:[t]}),t=>e({type:"ADD",payload:[t]}));case"OPEN":let o=null;return Number.isNaN(t.payload.timestamp)||(o=await async function(t){const e=await D;if(t<10){const o=await e.get("example",t);return null!=o&&o.hidden?null:C[t]||null}return g(await e.get("history",t))}(t.payload.timestamp)),void e({type:"DISPLAY",payload:{entry:o,firstLoad:t.payload.firstLoad,updateHash:!1}});case"DELETE":if(!Number.isNaN(t.payload.timestamp)&&(await async function(t){const e=await D;t<10?await e.put("example",{id:t,hidden:!0}):await e.delete("history",t)}(t.payload.timestamp),e({type:"REMOVE",payload:[t.payload.timestamp]}),t.payload.current)){const t=await async function(){const t=await D,e=await t.transaction(["history","example"]),o=await e.objectStore("history").getAll(void 0,1);if(o.length>0)return g(o[0]);const r=await e.objectStore("example").getAll(),n=new Set(r.filter(t=>t.hidden).map(t=>t.id));return Object.values(C).find(t=>!n.has(t.timestamp))||null}();e({type:"DISPLAY",payload:{entry:t,firstLoad:!1,updateHash:!0}})}return}}catch(t){e({type:"ERROR",payload:String(t)})}}self.addEventListener("message",t=>x(t.data,postMessage)),x({type:"LOAD",payload:null},postMessage);
//# sourceMappingURL=db-worker.js.map
