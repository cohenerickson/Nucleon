import { PROXIES, DEFAULT_PROXY } from "./ProxyManager";

if (!("localStorage" in globalThis)) {
  // @ts-ignore
  globalThis.localStorage = {
    getItem: () => DEFAULT_PROXY,
    setItem: () => {}
  };
}

export const settings = {
  proxy: (localStorage.getItem("proxy") ||
    DEFAULT_PROXY) as keyof typeof PROXIES
} as const;
