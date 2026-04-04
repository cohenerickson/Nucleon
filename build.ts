import { context, type BuildOptions } from "esbuild";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
// @ts-expect-error - Typescript doesn't like this for some reason, will have to revisit later
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import * as fs from "fs/promises";
import { watchFile } from "fs";

const isDev = process.argv.includes("--dev");

const baseContextOptions = {
  entryPoints: {
    sw: "./app/browser/services/ServiceWorker.ts",
    addonBootstrap: "./app/browser/services/AddonSWBootstrap.ts",
    "uv/uv.config": "./app/config/uv.config.ts"
  },
  bundle: true,
  outdir: "public",
  sourcemap: "linked",
  legalComments: "linked",
  format: "esm",
  minify: !isDev,
  external: ["/scram/scramjet.all.js"]
} satisfies BuildOptions;

// Copy static assets for proxies
await fs.cp(scramjetPath, "public/scram", {
  recursive: true,
  filter: (_, destination) => !destination.match(/types/)
});
await fs.cp(uvPath, "public/uv", {
  recursive: true,
  filter: (src) => !src.match(/(?<!uv\.)sw|config\.js(\.map)?$/)
});
await fs.cp(baremuxPath, "public/baremux", { recursive: true });
await fs.cp(epoxyPath, "public/epoxy", { recursive: true });
await fs.cp(libcurlPath, "public/libcurl", { recursive: true });

// Copy static assets for the app
await generateManifest();

async function generateManifest() {
  const { manifest } = await import("./app/config/manifest.ts?" + Date.now());
  await fs.writeFile(
    "./public/manifest.json",
    JSON.stringify(manifest, null, isDev ? 2 : undefined)
  );
}

const ctx = await context(baseContextOptions);

if (isDev) {
  console.log("Watching for changes...");

  watchFile("./app/config/manifest.ts", async () => {
    console.log("Manifest changed, updating...");
    await generateManifest();
  });

  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
