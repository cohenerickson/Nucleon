import { getSettings } from "./State";
import { Proxy } from "./proxies/Proxy";
import { ScramJet } from "./proxies/ScramJet";
import type { BareMuxConnection } from "@mercuryworkshop/bare-mux";

declare const BareMux: typeof import("@mercuryworkshop/bare-mux");

export class ProxyManager {
  proxies: Set<Proxy> = new Set();
  connection?: BareMuxConnection;

  constructor() {
    this.proxies.add(new ScramJet());
  }

  async initialize() {
    await loadScript("/baremux/index.js");

    // Load all pre requisite scripts for each of the proxies before initializing them
    for (const preq of Proxy.preqs) {
      await loadScript(preq);
    }

    this.connection = new BareMux.BareMuxConnection("/baremux/worker.js");

    const { transport } = await getSettings();

    if (transport.type === "wisp") {
      await this.setTransport(transport.path, [{ wisp: transport.server }]);
    } else if (transport.type === "bare") {
      await this.setTransport(transport.path, [transport.server]);
    }

    for (const proxy of this.proxies) {
      await proxy.initialize();
    }
  }

  async setTransport(...args: Parameters<BareMuxConnection["setTransport"]>) {
    if (!this.connection) {
      throw new Error("ProxyManager not initialized yet");
    }

    await loadScript(args[0], { module: true });

    await this.connection.setTransport(...args);
  }
}

async function loadScript(
  src: string,
  options?: { async?: boolean; defer?: boolean; module?: boolean }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      if ((existingScript as HTMLScriptElement).hasAttribute("data-loaded")) {
        resolve();
      } else {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () =>
          reject(new Error(`Failed to load script: ${src}`))
        );
      }
    }

    const script = document.createElement("script");
    script.src = src;
    if (options?.async) script.async = true;
    if (options?.defer) script.defer = true;
    if (options?.module) script.type = "module";
    script.onload = () => {
      (script as HTMLScriptElement).setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}
