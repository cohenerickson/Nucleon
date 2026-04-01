import { Sky } from "~/components/Sky";
import { manifest } from "~/config/manifest";

export function meta({}) {
  return [
    { title: manifest.name },
    {
      name: "description",
      content: manifest.description
    }
  ];
}

export default function Home() {
  return (
    <Sky>
      <section className="flex justify-center h-screen w-screen flex-col gap-8 p-20">
        <div className="flex-1 gap-5 flex opacity-75">
          <a
            target="_blank"
            href="https://discord.gg/unblock"
            className="h-min hover:scale-105 transition-all"
          >
            Discord
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min hover:scale-105 transition-all"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://github.com/cohenerickson/Nucleon"
            className="h-min hover:scale-105 transition-all "
          >
            Documentation
          </a>
        </div>
        <h1 className="text-6xl font-light transform scale-y-110 opacity-90">
          {manifest.name}.
        </h1>
        <div className="glass bg-white/10 w-2/5 py-3 px-5 rounded-md">
          <input
            className="w-full h-full"
            placeholder="Search Google or type a URL"
          />
        </div>
        <div className="flex gap-4">
          <a
            className="glass bg-black/90 transition-all px-4 py-2 rounded-md shadow-sm hover:scale-105 hover:shadow-xl hover:cursor-pointer text-white w-max flex items-center justify-center gap-2"
            href="nucleon://newtab"
          >
            <p>Browse Games</p>
          </a>
          <a
            className="glass bg-black/90 transition-all px-4 py-2 rounded-md shadow-sm hover:scale-105 hover:shadow-xl hover:cursor-pointer  text-white w-max flex items-center justify-center gap-2"
            href="https://mozilla.org/en-US/firefox/themes/"
          >
            <p>Browse Addons</p>
          </a>
          <a
            className="glass bg-black/90 transition-all px-4 py-2 rounded-md shadow-sm hover:scale-105 hover:shadow-xl hover:cursor-pointer  text-white w-max flex items-center justify-center gap-2"
            href="nucleon://settings"
          >
            <p>Change Settings</p>
          </a>
        </div>
        <div className="flex-1 gap-5 flex items-end opacity-75">
          <p
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to clear all your data including search history, extensions, themes, and any open tabs? This cannot be undone."
                )
              ) {
                localStorage.clear();
                sessionStorage.clear();
                navigator.serviceWorker
                  .getRegistrations()
                  .then((registrations) => {
                    registrations.forEach((registration) => {
                      registration.unregister();
                    });
                  });
              }
            }}
            className="hover:cursor-pointer h-min hover:scale-105 transition-all"
          >
            Clear All Data
          </p>
        </div>
      </section>
    </Sky>
  );
}
