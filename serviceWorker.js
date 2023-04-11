const CACHE_NAME = "index";
const REQUESTS = [
    "index.html",
    "index.css",
    "index.js",
    "index.wasm"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(REQUESTS);
        })
    );
});

self.addEventListener("fetch", event => {
    event.waitUntil(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});
