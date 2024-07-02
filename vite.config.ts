import { vitePlugin as remix } from "@remix-run/dev";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: `${uvPath}/uv.*`.replace(/\\/g, "/"),
          dest: "uv"
        },
        {
          src: "public/uv/uv.config.js",
          dest: "uv"
        }
      ]
    })
  ]
});
