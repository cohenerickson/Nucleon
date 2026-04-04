import { useEffect, useState } from "react";
import { manifest } from "~/config/manifest";
import { TabBar } from "~/components/TabBar";
import { motion, AnimatePresence } from "motion/react";
import { BrowserConnection } from "~/util/BrowserConnection";
import { log } from "~/util/Logger";
import { ToolBar } from "~/components/ToolBar";
import { LoadingScreen } from "~/components/LoadingScreen";

declare const BareMux: typeof import("@mercuryworkshop/bare-mux");

export function meta({}) {
  return [
    { title: manifest.name },
    { name: "description", content: manifest.description }
  ];
}

function loadScript(
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

export default function Home() {
  const [ready, setReady] = useState(false);

  // Initialization logic for loading the app's core
  // This includes loading proxy scripts, and registering service workers
  useEffect(() => {
    (async () => {
      log.debug("Loading Scramjet and BareMux scripts...");
      await loadScript("/baremux/index.js");
      await loadScript("/scram/scramjet.all.js");

      log.debug("Initializing Scramjet...");
      const { ScramjetController } = $scramjetLoadController();
      const scramjet = new ScramjetController({
        prefix: "/app/~/scramjet/",
        files: {
          wasm: "/scram/scramjet.wasm.wasm",
          all: "/scram/scramjet.all.js",
          sync: "/scram/scramjet.sync.js"
        },
        flags: {
          rewriterLogs: false,
          scramitize: false,
          cleanErrors: true,
          sourcemaps: true
        }
      });
      scramjet.init();

      log.debug("Initializing BareMux connection...");
      const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
      await connection.setTransport("/epoxy/index.mjs", [
        { wisp: "ws://127.0.0.1:5001/" }
      ]);
      console.log(connection);

      log.debug("Initializing browser connection from app client");
      const browserConnection = new BrowserConnection();

      log.debug("Waiting for browser connection to be ready...");
      await browserConnection.ready;

      log.debug("Browser connection is ready, requesting browser state...");
      const browserState = await browserConnection.rpc.call(
        "nucleon.internal.getBrowserState"
      );

      log.debug("Received browser state from service worker:", browserState);

      // Things happen pretty quick here and it looks bad if we immediately transition the waiting screen away
      setTimeout(() => {
        setReady(true);
      }, 500);
    })();
  }, []);

  return (
    <>
      <AnimatePresence>{!ready ? <LoadingScreen /> : null}</AnimatePresence>
      <main className="w-screen h-screen flex flex-col">
        <TabBar />
        <ToolBar />
        <iframe className="w-full flex-1" src="/app/internal/newtab"></iframe>
      </main>
    </>
  );
}
