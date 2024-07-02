const transport = new URL(location).searchParams.get("transport");
importScripts(transport);
importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts(__uv$config.sw || "/uv/uv.sw.js");
importScripts("/scramjet/scramjet.codecs.js");
importScripts("/scramjet/scramjet.config.js");
importScripts(__scramjet$config.bundle || "/scramjet/scramjet.bundle.js");
importScripts(__scramjet$config.worker || "/scramjet/scramjet.worker.js");

const uv = new UVServiceWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (uv.route(event)) {
        return await uv.fetch(event);
      } else if (scramjet.route(event)) {
        return await scramjet.fetch(event);
      }
      return await fetch(event.request);
    })()
  );
});
