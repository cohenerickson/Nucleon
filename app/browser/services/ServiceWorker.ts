import { log } from "../../util/Logger";
import { RPC } from "../../util/RPC";
import {
  download,
  getLatestVersion,
  installExtension
} from "../util/ExtFetcher";
import "../util/Network";
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

      // Handle cached files such as extension resources first
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        log.debug("Serving request from cache:", event.request.url);
        return cachedResponse;
      }

      // Then we can handle Scramjet requests
      if (scramjet.route(event)) {
        return scramjet.fetch(event);
      }

      // Before falling back to the network for any other requests
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

  rpc.expose(
    "nucleon.internal.getAddonVersion",
    async (platform: string, id: string) => {
      log.debug(
        `Received RPC request for addon version: platform=${platform}, id=${id}`
      );

      return await getLatestVersion(platform as "firefox" | "chrome", id);
    }
  );

  rpc.expose(
    "nucleon.internal.installAddon",
    async (platform: "firefox" | "chrome", id: string) => {
      log.debug(
        `Received RPC request to install addon: platform=${platform}, id=${id}`
      );

      const data = await download(platform, id);

      log.debug(
        `Downloaded addon data for ${id}, size=${data.byteLength} bytes, installing...`
      );

      return await installExtension(id, data);
    }
  );
}
