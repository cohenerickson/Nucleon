import type { UVConfig } from "@titaniumnetwork-dev/ultraviolet";

declare global {
  var __uv$config: Required<UVConfig>;

  var __scramjet$config: {
    prefix: `/${string}/`;
    config: `/${string}.js`;
    bundle: `/${string}.js`;
    worker: `/${string}.js`;
    client: `/${string}.js`;
    codecs: `/${string}.js`;
    codec: {
      encode: (url: string) => string;
      decode: (url: string) => string;
    };
  };
}

type Settings = {
  proxy: keyof typeof PROXIES;
  transport: keyof typeof TRANSPORTS;
  theme: "auto" | "light" | "dark";
  searchEngine: keyof typeof SEARCH_ENGINES;
  transportServers: {
    bare: string[];
    wisp: string[];
  };
};

export const REQUIRES_RELOAD = new Set([
  "proxy",
  "transport",
  "transportServers"
]);

export function fetchSettings() {
  return {
    proxy:
      (localStorage.getItem("proxy") as Settings["proxy"]) || "ultraviolet",
    transport:
      (localStorage.getItem("transport") as Settings["transport"]) || "epoxy",
    theme: (localStorage.getItem("theme") as Settings["theme"]) || "auto",
    searchEngine:
      (localStorage.getItem("searchEngine") as Settings["searchEngine"]) ||
      "google",
    transportServers: (JSON.parse(
      localStorage.getItem("transportServers") || "null"
    ) as Settings["transportServers"]) || {
      bare: [`${location.origin}/bare/`],
      wisp: [`${location.origin.replace(/^http/, "ws")}/wisp/`]
    }
  } satisfies Settings;
}

export function resolveSearchEngine(): SearchEngine {
  const settings = fetchSettings();

  const searchEngine = SEARCH_ENGINES[settings.searchEngine];

  if (searchEngine.name === "Custom") {
    return {
      name: "Custom",
      pattern: localStorage.getItem("customSearchPattern") || "",
      homepage: localStorage.getItem("customSearchHomepage") || ""
    };
  }

  return searchEngine as SearchEngine;
}

type SearchEngine = {
  name: string;
  pattern: string;
  homepage: string;
};

export const SEARCH_ENGINES = {
  google: {
    name: "Google",
    pattern: "https://www.google.com/search?q=%s",
    homepage: "https://www.google.com/search?q="
  },
  duckduckgo: {
    name: "DuckDuckGo",
    pattern: "https://duckduckgo.com/?q=%s",
    homepage: "https://duckduckgo.com/?q="
  },
  brave: {
    name: "Brave",
    pattern: "https://search.brave.com/search?q=%s",
    homepage: "https://search.brave.com/search?q="
  },
  bing: {
    name: "Bing",
    pattern: "https://www.bing.com/search?q=%s",
    homepage: "https://www.bing.com/search?q="
  },
  yahoo: {
    name: "Yahoo",
    pattern: "https://search.yahoo.com/search?p=%s",
    homepage: "https://search.yahoo.com/search?p="
  },
  custom: {
    name: "Custom"
  }
} satisfies {
  [key: string]:
    | {
        name: "Custom";
      }
    | SearchEngine;
};

type Proxy = {
  github: string;
  name: string;
  description: string;
  requiredScripts: string[];
  prefix: () => string;
  encode: (url: string) => string;
  decode: (url: string) => string;
};

export const PROXIES = {
  ultraviolet: {
    github: "https://github.com/titaniumnetwork-dev/Ultraviolet",
    name: "Ultraviolet",
    description:
      "A highly sophisticated proxy used for evading internet censorship or accessing websites in a controlled sandbox using the power of service-workers. Works by intercepting HTTP requests with a service worker script that follows the TompHTTP specifications.",
    requiredScripts: ["/uv/uv.bundle.js", "/uv/uv.config.js"],
    prefix: () => __uv$config.prefix,
    encode: (url: string) => {
      return `${__uv$config.prefix}${__uv$config.encodeUrl(url)}`;
    },
    decode: (url: string) => {
      return __uv$config.decodeUrl(
        url.replace(
          new RegExp(`^${__uv$config.prefix.replace(/\//g, "\\/")}`),
          ""
        )
      );
    }
  },
  scramjet: {
    github: "https://github.com/MercuryWorkshop/scramjet",
    name: "Scramjet",
    description:
      "Scramjet is an experimental web proxy that aims to be the successor to Ultraviolet.",
    requiredScripts: [
      "/scramjet/scramjet.codecs.js",
      "/scramjet/scramjet.config.js"
    ],
    prefix: () => __scramjet$config.prefix,
    encode: (url: string) => {
      return `${__scramjet$config.prefix}${__scramjet$config.codec.encode(url)}`;
    },
    decode: (url: string) => {
      return __scramjet$config.codec.decode(
        url.replace(
          new RegExp(`^${__scramjet$config.prefix.replace(/\//g, "\\/")}`),
          ""
        )
      );
    }
  }
} satisfies { [key: string]: Proxy };

type Trasport = {
  github: string;
  name: string;
  entry: string;
  class: string;
  serverType: "bare" | "wisp";
};

export const TRANSPORTS = {
  bare: {
    github: "https://github.com/tomphttp/bare-client",
    name: "Bare",
    entry: "bare.cjs",
    class: "BareMod.BareClient",
    serverType: "bare"
  },
  epoxy: {
    github: "https://github.com/MercuryWorkshop/EpoxyTransport",
    name: "Epoxy",
    entry: "index.js",
    class: "EpxMod.EpoxyClient",
    serverType: "wisp"
  },
  libcurl: {
    github: "https://github.com/ading2210/libcurl.js",
    name: "Libcurl",
    entry: "index.js",
    class: "CurlMod.LibcurlClient",
    serverType: "wisp"
  }
} satisfies { [key: string]: Trasport };
