declare global {
  var __uv$config: {
    bare: string | string[];
    prefix: `/${string}/`;
    handler: `/${string}.js`;
    bundle: `/${string}.js`;
    config: `/${string}.js`;
    sw: `/${string}.js`;
    encodeUrl: (url: string) => string;
    decodeUrl: (url: string) => string;
  };
}

export const DEFAULT_PROXY = "ultraviolet";

export const PROXIES = {
  ultraviolet: {
    github: "https://github.com/titaniumnetwork-dev/Ultraviolet",
    name: "Ultraviolet",
    description:
      "A highly sophisticated proxy used for evading internet censorship or accessing websites in a controlled sandbox using the power of service-workers. Works by intercepting HTTP requests with a service worker script that follows the TompHTTP specifications.",
    encode: (url: string) => {
      return `/~/${__uv$config.encodeUrl(url)}`;
    },
    decode: (url: string) => {
      return __uv$config.decodeUrl(
        url.replace(
          new RegExp(`^${__uv$config.prefix.replace(/\//g, "\\/")}`),
          ""
        )
      );
    }
  }
};
