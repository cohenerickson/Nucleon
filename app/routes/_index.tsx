import * as _BareMux from "@mercuryworkshop/bare-mux";
import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { SplashScreen } from "~/components/SplashScreen";
import { UtilityBar } from "~/components/UtilityBar";
import {
  PROXIES,
  TRANSPORTS,
  fetchSettings,
  resolveSearchEngine
} from "~/util/SettingsManager";
import { TabModel } from "~/util/TabModel";

declare global {
  var BareMux: typeof _BareMux;
}

export const meta: MetaFunction = () => {
  return [{ title: "Nucleon" }, { name: "description", content: "tee hee" }];
};

export default function Inxex() {
  const [ready, setReady] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Initializing...");

  let initialized = false;

  async function initialize() {
    if (initialized) return;
    initialized = true;

    const settings = fetchSettings();

    const scripts = [
      `/transports/${settings.transport}/${TRANSPORTS[settings.transport].entry}`,
      "/baremux/bare.cjs",
      ...PROXIES[settings.proxy].requiredScripts
    ];

    for (const source of scripts) {
      setStatus(`Downloading ${source}...`);
      const script = document.createElement("script");
      script.src = source;
      document.head.appendChild(script);
      await new Promise((resolve) => {
        script.addEventListener("load", () => {
          // leave time for the scripts to execute
          setTimeout(resolve, 200);
        });
      });
    }

    if ("serviceWorker" in navigator) {
      setStatus("Registering Service Worker...");

      await navigator.serviceWorker.register(
        `/sw.js?transport=/transports/${settings.transport}/${TRANSPORTS[settings.transport].entry}`,
        {
          scope: "/"
        }
      );
      await navigator.serviceWorker.ready;

      setStatus("Configuring Transport...");

      BareMux.registerRemoteListener(navigator.serviceWorker.controller!);

      const transport = TRANSPORTS[settings.transport];

      const { bare, wisp } = settings.transportServers;

      BareMux.SetTransport(
        transport.class,
        transport.serverType === "bare"
          ? bare[Math.floor(Math.random() * bare.length)]
          : {
              wisp: wisp[Math.floor(Math.random() * wisp.length)]
            }
      );

      setStatus("Restoring Browser Session...");

      const tabs = JSON.parse(localStorage.getItem("tabs") || "[]") as string[];
      const activeTab = Number(localStorage.getItem("activeTab") || 0);

      if (tabs.length === 0) {
        tabs.push(resolveSearchEngine().homepage);
      }

      // TODO: Fix this (idk what the fuck is wrong)
      for (let i = 0; i < tabs.length; i++) {
        const tab = new TabModel(tabs[i]);
        if (i === activeTab) {
          tab.setActive(true);
          tab.once("load", () => {
            setReady(true);
          });
        }
      }

      // Fallback for if the tab takes ages to load
      setTimeout(() => {
        setReady(true);
      }, 10000);
    } else {
      setStatus(
        "Failed to Load: Service workers are not supported in this browser."
      );
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <main className="flex h-full flex-col overflow-hidden">
      <SplashScreen ready={ready} status={status} />

      <UtilityBar />
      <section id="iframes" className="flex-1"></section>
    </main>
  );
}
