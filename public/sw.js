/* Service worker sederhana — membuat aplikasi bisa dipasang
   di HP dan tetap terbuka saat sinyal lemah. */
const VERSI = "kbih-v3";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((kunci) =>
      Promise.all(kunci.filter((k) => k !== VERSI).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Jangan campuri panggilan ke server data
  if (/firestore|googleapis|firebaseio|telegram/.test(url.hostname)) return;
  if (url.origin !== self.location.origin) return;

  // Utamakan jaringan; kalau gagal, ambil dari simpanan
  e.respondWith(
    fetch(req)
      .then((res) => {
        const salinan = res.clone();
        caches.open(VERSI).then((c) => c.put(req, salinan)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || caches.match("./index.html"))
      )
  );
});
