import { RPC } from "../util/RPC";
import { log } from "./Logger";

export class BrowserConnection {
  #sw: ServiceWorker | null = null;
  #rpc: RPC | null = null;

  constructor() {
    this.initialize();
  }

  get ready(): Promise<void> {
    return new Promise((resolve) => {
      const checkReady = () => {
        if (this.#sw) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }

  get sw(): ServiceWorker {
    if (!this.#sw) {
      throw new Error("BrowserConnection not ready yet");
    }

    return this.#sw;
  }

  get rpc(): RPC {
    if (!this.#rpc) {
      throw new Error("BrowserConnection RPC not initialized yet");
    }
    return this.#rpc;
  }

  private async initialize() {
    const serviceWorker = await this.initializeServiceWorker();
    this.#sw = serviceWorker;
    this.#rpc = new RPC(`nucleon-browser-connection`);
    log.debug(
      "BrowserConnection initialized with service worker:",
      serviceWorker
    );
  }

  // TODO: create a way to handle a "redudant" service worker
  // (i.e. if the user clicks Clear All Data on the newtab)
  private async initializeServiceWorker(): Promise<ServiceWorker> {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service workers not supported");
    }

    // If there's already an active service worker, use it
    if (navigator.serviceWorker.controller) {
      await waitForState(navigator.serviceWorker.controller, "activated");
      return navigator.serviceWorker.controller;
    }

    // Otherwise, register a new service worker
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/app",
      updateViaCache: "none",
      type: "module"
    });

    // Wait for the service worker to become active
    const worker = await waitForController();
    await waitForState(worker, "activated");
    return worker;
  }
}

async function waitForController(): Promise<ServiceWorker> {
  log.debug("Waiting for service worker controller...");
  return new Promise((resolve, reject) => {
    const checkState = async () => {
      // If the user reloads the page with Ctrl + Shift + R, after the first load
      // for some reason the service worker doesn't properly claim the page even
      // if it's active, so if the service worker is active but there's no controller
      // we will force a reload to fix this
      const ready = await navigator.serviceWorker.ready;

      if (navigator.serviceWorker.controller) {
        resolve(navigator.serviceWorker.controller);
      } else if (ready) {
        window.location.reload();
      } else {
        setTimeout(checkState, 100);
      }
    };
    checkState();
  });
}

async function waitForState(
  serviceWorker: ServiceWorker,
  desiredState: ServiceWorkerState
): Promise<void> {
  log.debug(`Waiting for service worker to reach state: ${desiredState}...`);
  return new Promise((resolve) => {
    if (serviceWorker.state === desiredState) {
      resolve();
    } else {
      serviceWorker.addEventListener("statechange", () => {
        if (serviceWorker.state === desiredState) {
          resolve();
        }
      });
    }
  });
}
