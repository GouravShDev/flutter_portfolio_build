'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "389a6e6e6f34312743ca5f36467c84b5",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"index.html": "5aadd7b012dee1165aa0b247ce2f647b",
"/": "5aadd7b012dee1165aa0b247ce2f647b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "64056119d3cc013d2ff63c4f470c1c20",
"assets/AssetManifest.bin": "40fb1e72326974ee4de2c566805be364",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin.json": "ce8a9b1f6c1224665da84db09e1792c1",
"assets/assets/images/todoList.png": "24fccd345dbb741bc5645261b15e4d5d",
"assets/assets/images/appflowy.webp": "855fb721a7f957d38c9bbbffcdbad5ee",
"assets/assets/images/tv_maze.png": "7ea4e1db5400158cae3d1e086db0fe9c",
"assets/assets/images/anytime_podcast.jpeg": "4be9d272707ce9622ce4d1acac0c96cf",
"assets/assets/images/codersGym.png": "fbf7356e75f4f1050298119e7351bc13",
"assets/assets/images/aniyomi.png": "d97b578aa242444d2f46940a7495648b",
"assets/assets/fonts/MechanicalOutObl.otf": "2934744dd5746537e93db17890a0e5eb",
"assets/assets/fonts/MechanicalCondObl.otf": "fd18aceb7697b4d6ffb0f5187a5bcded",
"assets/assets/fonts/MechanicalBd.otf": "7f5530bbbfed6210443c3a722f881caf",
"assets/assets/fonts/Mechanical.otf": "73b54e75eaab0097af825c7329c26560",
"assets/assets/fonts/MechanicalCond.otf": "fc1c3cde35392f6a0af92041a01346b8",
"assets/assets/fonts/MechanicalBdExtObl.otf": "c79eb88e05b53d5ca3212e08247d8f49",
"assets/assets/fonts/MechanicalOut.otf": "c9b94afe6700db46a8d6faa5e89835d4",
"assets/assets/fonts/MechanicalBdCondObl.otf": "e2e2f5909db035580bb608b24f4c92c9",
"assets/assets/fonts/MechanicalBdOut.otf": "cbe55589bbe39cf619675451ba0b921f",
"assets/assets/fonts/MechanicalBdObl.otf": "5937f46fb3000c954a6ce4ab8dc63f1b",
"assets/assets/fonts/MechanicalBdExt.otf": "b3ef811edab2008931682293b165cd4e",
"assets/assets/fonts/MechanicalObl.otf": "09ddf27b54c6e932290e09821ed12530",
"assets/assets/fonts/MechanicalBdCond.otf": "7ab0af602df3f644c807a7d34246ec54",
"assets/assets/fonts/MechanicalBdOutObl.otf": "0e382e021ed91c159b61c5fa374b5db4",
"assets/assets/fonts/MechanicalExt.otf": "d15c0363a247c87c7f2593e9bdc44b57",
"assets/assets/fonts/MechanicalExtObl.otf": "6b96b8a570f339494d94ebe8a06df9c4",
"assets/FontManifest.json": "6c8eb295c0331f14fe907c7e3f83e175",
"assets/AssetManifest.json": "dc8791d0e432ecd5e94f739fd35d0d63",
"assets/NOTICES": "de7eef72cf9053b1781a71ee73e43f25",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/fonts/MaterialIcons-Regular.otf": "98adb4ccfa6093620e787a07890695bd",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"flutter_bootstrap.js": "8e40f236f69fe338c35132ba55c2589f",
"manifest.json": "56128fc6ec7568b99d6fc24cfa34a218"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
