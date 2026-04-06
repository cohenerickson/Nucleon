import type { BareMuxConnection } from "@mercuryworkshop/bare-mux";
import { Proxy } from "./proxies/Proxy";
import { ScramJet } from "./proxies/ScramJet";

const WISP_SERVER = "ws://127.0.0.1:5001/";

declare const BareMux: typeof import("@mercuryworkshop/bare-mux");

export class ProxyManager {
  proxies: Set<Proxy> = new Set();
  connection?: BareMuxConnection;

  constructor() {
    Proxy.preqs.add("/baremux/index.js");

    this.proxies.add(new ScramJet());
  }

  async initialize() {
    for (const preq of Proxy.preqs) {
      await loadScript(preq);
    }

    this.connection = new BareMux.BareMuxConnection("/baremux/worker.js");
    await this.connection.setTransport("/epoxy/index.mjs", [
      { wisp: WISP_SERVER }
    ]);

    for (const proxy of this.proxies) {
      await proxy.initialize();
    }
  }

  async setTransport(...args: Parameters<BareMuxConnection["setTransport"]>) {
    if (!this.connection) {
      throw new Error("ProxyManager not initialized yet");
    }

    await this.connection.setTransport(...args);
  }
}

async function loadScript(
  src: string,
  options?: { async?: boolean; defer?: boolean }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    if (options?.async) script.async = true;
    if (options?.defer) script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}
