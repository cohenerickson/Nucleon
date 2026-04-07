import { Sky } from "~/components/Sky";
import { manifest } from "~/config/manifest";

export default function Home() {
  return (
    <Sky>
      <section className="flex h-screen w-screen flex-col justify-center gap-8 p-20">
        <div className="flex flex-1 gap-5 opacity-75">
          <a
            target="_blank"
            href="https://discord.gg/unblock"
            className="h-min transition-all hover:scale-105"
          >
            Discord
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min transition-all hover:scale-105"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min transition-all hover:scale-105"
          >
            Documentation
          </a>
        </div>
        <h1 className="scale-y-110 transform text-6xl font-light opacity-90">
          {manifest.name}.
        </h1>
        <div className="glass w-2/5 rounded-md bg-white/10 px-5 py-3">
          <input
            className="h-full w-full"
            placeholder="Search Google or type a URL"
          />
        </div>
        <div className="flex gap-4">
          <a
            className="glass flex w-max items-center justify-center gap-2 rounded-md bg-black/90 px-4 py-2 text-white shadow-sm transition-all hover:scale-105 hover:cursor-pointer hover:shadow-xl"
            href="nucleon://newtab"
          >
            <p>Browse Games</p>
          </a>
          <a
            className="glass flex w-max items-center justify-center gap-2 rounded-md bg-black/90 px-4 py-2 text-white shadow-sm transition-all hover:scale-105 hover:cursor-pointer hover:shadow-xl"
            href="https://mozilla.org/en-US/firefox/themes/"
          >
            <p>Browse Addons</p>
          </a>
          <a
            className="glass flex w-max items-center justify-center gap-2 rounded-md bg-black/90 px-4 py-2 text-white shadow-sm transition-all hover:scale-105 hover:cursor-pointer hover:shadow-xl"
            href="nucleon://settings"
          >
            <p>Change Settings</p>
          </a>
        </div>
        <div className="flex flex-1 items-end gap-5 opacity-75">
          <p
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to clear all your data including search history, extensions, themes, and any open tabs? This cannot be undone."
                )
              ) {
                localStorage.clear();
                sessionStorage.clear();
                if (window.caches) {
                  caches.keys().then((names) => {
                    for (let name of names) caches.delete(name);
                  });
                }
                if (window.indexedDB && indexedDB.databases) {
                  indexedDB.databases().then((dbs) => {
                    dbs.forEach((db) => {
                      indexedDB.deleteDatabase(db.name!);
                    });
                  });
                }
                navigator.serviceWorker
                  .getRegistrations()
                  .then((registrations) => {
                    registrations.forEach((registration) => {
                      registration.unregister();
                    });
                  });
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                      /=.*/,
                      "=;expires=" + new Date().toUTCString() + ";path=/"
                    );
                });
              }
            }}
            className="h-min transition-all hover:scale-105 hover:cursor-pointer"
          >
            Clear All Data
          </p>
        </div>
      </section>
    </Sky>
  );
}
