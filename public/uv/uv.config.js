self.__uv$config = {
  bare: [
    `https://uv.radon.games/bare1/`,
    `https://uv.radon.games/bare2/`,
    `https://uv.radon.games/bare3/`,
    `https://uv.radon.games/bare3/`
  ],
  prefix: "/~/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js"
};
