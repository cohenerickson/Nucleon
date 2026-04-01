import { openDB } from "idb";
import { log } from "../util/Logger";
import { RPC } from "../util/RPC";
import type { BrowserDB } from "./BrowserStorage";

declare const self: ServiceWorkerGlobalScope;
export const browserRPC = new RPC("nucleon-browser-connection");
export const browserDB = (async () => {
  return await openDB<BrowserDB>("nucleon");
})();
initializeRPCHandlers(browserRPC);

self.addEventListener("fetch", (event) => {
  log.debug("Service worker received fetch event for:", event.request.url);
  event.respondWith(fetch(event.request));
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
  rpc.on("nucleon.internal.getBrowserState", async () => {
    log.debug("Received RPC request for browser state from client");
    return {
      state: "ready"
    };
  });
}

export {};
