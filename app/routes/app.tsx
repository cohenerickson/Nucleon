import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { LoadingScreen } from "~/components/LoadingScreen";
import { TabBar } from "~/components/TabBar";
import { ToolBar } from "~/components/ToolBar";
import { BrowserConnection } from "~/util/BrowserConnection";
import { log } from "~/util/Logger";
import { ProxyManager } from "~/util/ProxyManager";

export default function Home() {
  const [ready, setReady] = useState(false);

  // Initialization logic for loading the app's core
  // This includes loading proxy scripts, and registering service workers
  useEffect(() => {
    (async () => {
      log.debug("Initializing ProxyManager");
      const proxyManager = new ProxyManager();
      await proxyManager.initialize();

      log.debug("Initializing BrowserConnection");
      const browserConnection = new BrowserConnection();
      await browserConnection.ready;

      log.debug("Waiting for Service Worker to be ready");
      const browserState = await browserConnection.rpc.call(
        "nucleon.internal.getBrowserState"
      );

      log.debug("App intialization complete, browser state:", browserState);

      setTimeout(() => {
        setReady(true);
      }, 500);
    })();
  }, []);

  return (
    <>
      <main className="flex h-screen w-screen flex-col">
        <TabBar />
        <ToolBar />
        <iframe className="w-full flex-1" src="/app/internal/newtab"></iframe>
      </main>
      <AnimatePresence>{!ready ? <LoadingScreen /> : null}</AnimatePresence>
    </>
  );
}
