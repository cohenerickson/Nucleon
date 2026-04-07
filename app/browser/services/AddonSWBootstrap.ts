import { log } from "../../util/Logger";
import { RPC } from "../../util/RPC";
// Preventing addons from accessing this object will need to be done through scramjet
// for the most part we are taking addons directly from the webstore and the existence
// of this object shouldn't cause issues, but for security reasons we will need to
// isolate it later on. For a proof of concept and early stages of development this should be fine though.
import { browser as _browserAPI } from "../api/Browser";
import type { BrowserDB } from "./BrowserStorage";
import { openDB } from "idb";

declare const self: ServiceWorkerGlobalScope & {
  browser: Partial<typeof _browserAPI>;
  chrome: Partial<typeof _browserAPI>;
};
const db = await openDB<BrowserDB>("nucleon");

// get addon id from URL path /app/internal/ekcnnfhjfcgphgdaggkamkmgojdagdnn/sw.js
const addonId = self.location.pathname.match(
  /(?<=^\/app\/internal\/)[^\/]*\//
)?.[0];
if (!addonId) {
  // Fatal to the context of the addon service worker
  throw log.fatal(
    "[AddonSWBootstrap] Failed to extract addon ID from service worker URL:",
    self.location.pathname
  );
}

// Validate that the addon ID exists in the database and fetch its permissions
const addonData = await db.get("addons", addonId);
if (!addonData) {
  throw log.fatal(
    `[AddonSWBootstrap] Unable to locate addon permissions in DB for addon ID: ${addonId}`
  );
}

// Most counterpart RPC implementations are within the AddonRuntime utility
// If addons need to access content scripts or other privileged APIs,
// it may communicate directly with the client scope via this same RPC channel
// if addons request new permissions it will also need to communicate directly
// with the client to grant these permissions, also using this channel.
export const addonRPC = new RPC(`nucleon-addon-${addonId}`);

// Build the addon api based on the permissions
self.browser = {};
self.chrome = self.browser;
addonData.grantedPermissions.forEach((permission) => {
  self.browser[permission] = _browserAPI[permission];
});

// We will need to hyjack the ServiceWorkerGlobalScope.addEventListener
// in order to allow extensions to capture events like fetch and install,
// for now we just won't have support for these events within addons.
