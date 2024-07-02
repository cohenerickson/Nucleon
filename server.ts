// @ts-expect-error
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
// @ts-expect-error
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
// @ts-expect-error
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { scramjetPath } from "@mercuryworkshop/scramjet";
import { createRequestHandler } from "@remix-run/express";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { createBareServer } from "@tomphttp/bare-server-node";
import compression from "compression";
import express from "express";
import { createServer } from "http";
import type { Socket } from "node:net";
import wisp from "wisp-server-node";

// Run vite server
const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true }
        })
      );

// Run remix server
const remixHandler = createRequestHandler({
  // @ts-expect-error
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js")
});

// Create http server
const app = express();
const httpServer = createServer(app);
const bareServer = createBareServer("/bare/", {
  maintainer: {
    email: "contact+bare.security@cohenerickson.com",
    website: "https://cohenerickson.com/"
  }
});

app.use((req, res, next) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    next();
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (req.url?.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket as Socket, head);
  } else {
    socket.end();
  }
});

app.use(compression());
app.disable("x-powered-by");

// Setup vite dev server
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Serve static files
app.use(express.static("build/client", { maxAge: "1h" }));

// Proxy scripts
const staticOptions: Parameters<typeof express.static>[1] = {
  setHeaders: (res, path) => {
    if (path.endsWith(".cjs")) {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    }
  }
};
app.use("/uv", express.static(uvPath, staticOptions));
app.use("/scramjet", express.static(scramjetPath, staticOptions));
app.use("/baremux", express.static(baremuxPath, staticOptions));
app.use("/transports/epoxy", express.static(epoxyPath, staticOptions));
app.use("/transports/libcurl", express.static(libcurlPath, staticOptions));
app.use("/transports/bare", express.static(bareModulePath, staticOptions));

// Handle SSR requests
app.all("*", remixHandler);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
