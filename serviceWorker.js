const staticDevCoffee = "dev-coffee-site-v9";
// DO NOT CHANGE CACHE NAME
const cacheName = "v7";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(caches.delete(cacheName));
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
  console.log("Install");
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener(
  "notificationclick",
  function (event) {
    event.notification.close();

    clients.openWindow(self.location.origin);
  },
  false
);
