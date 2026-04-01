import { useEffect, useState } from "react";
import { manifest } from "~/config/manifest";
import { IoHomeOutline } from "react-icons/io5";
import { TabBar } from "~/components/TabBar";
import { motion, AnimatePresence } from "motion/react";
import { BrowserConnection } from "~/util/BrowserConnection";
import { log } from "~/browser/util/Logger";
import { ToolBar } from "~/components/ToolBar";

export function meta({}) {
  return [
    { title: manifest.name },
    { name: "description", content: manifest.description }
  ];
}

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      log.warn("Initializing browser connection from app client");
      const browserConnection = new BrowserConnection();
      log.warn("Waiting for browser connection to be ready...");

      await browserConnection.ready;

      log.warn("Browser connection is ready, requesting browser state...");

      const browserState = await browserConnection.rpc.call(
        "nucleon.internal.getBrowserState"
      );
      log.warn("Received browser state from service worker:", browserState);

      // Things happen pretty quick here and it looks bad if we immediately transition the waiting screen away
      setTimeout(() => {
        setReady(true);
      }, 1000);
    })();
  }, []);

  return (
    <>
      <AnimatePresence>
        {!ready ? (
          <motion.div
            className="absolute top-0 left-0 bg-white flex items-center justify-center h-screen w-screen flex-col gap-8 p-20"
            exit={{ top: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-light">
              Please hang tight while we set some things up in the background...
            </h2>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <main className="w-screen h-screen flex flex-col">
        <TabBar />
        <ToolBar />
        <div className="w-full h-7 bg-nav-bar-bg"></div>
        <iframe className="w-full flex-1" src="/app/internal/newtab"></iframe>
      </main>
    </>
  );
}
