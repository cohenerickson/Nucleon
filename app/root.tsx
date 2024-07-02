import "./tailwind.css";
import "./theme.css";
// @ts-expect-error
import BareMux from "@mercuryworkshop/bare-mux";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useEffect } from "react";


export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: __uv$config.prefix
        })
        .then(() => {
          BareMux.registerRemoteListener(navigator.serviceWorker.controller);

          BareMux.SetTransport("EpxMod.EpoxyClient", {
            wisp: "wss://wisp.mercurywork.shop/"
          });
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/uv/uv.bundle.js" defer></script>
        <script src="/uv/uv.config.js" defer></script>
        <Meta />
        <Links />
      </head>
      <body className="h-screen w-screen bg-background font-semibold text-text">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}