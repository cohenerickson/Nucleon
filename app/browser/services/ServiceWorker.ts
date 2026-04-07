import { log } from "../../util/Logger";
import { RPC } from "../../util/RPC";
import type { BrowserDB } from "./BrowserStorage";
import "/scram/scramjet.all.js";
import { openDB } from "idb";

declare const self: ServiceWorkerGlobalScope;
export const browserRPC = new RPC("nucleon-browser-connection");
export const browserDB = (async () => {
  return await openDB<BrowserDB>("nucleon");
})();

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();
console.log(scramjet);

initializeRPCHandlers(browserRPC);

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      await scramjet.loadConfig();

      // // Handle Scramjet Requests first
      if (scramjet.route(event)) {
        return scramjet.fetch(event);
      }

      // TODO: Handle cached addon resources next

      return await fetch(event.request);
    })()
  );
  log.debug("Service worker received fetch event for:", event.request.url);
});

self.addEventListener("install", (event) => {
  log.debug("Service worker installing, initializing IDB and cache...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      log.debug("Service worker activating, claiming clients...");
      await self.clients.claim();
    })()
  );
});

function initializeRPCHandlers(rpc: RPC) {
  rpc.expose("nucleon.internal.getBrowserState", async () => {
    log.debug("Received RPC request for browser state from client");
    return {
      state: "ready"
    };
  });
}
