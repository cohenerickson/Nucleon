import { PROXIES, fetchSettings, resolveSearchEngine } from "./SettingsManager";
import EventEmitter from "events";
import { v4 } from "uuid";

export class TabModel extends EventEmitter {
  static tabs: TabModel[] = [];
  static listeners: Record<string, ((...args: any[]) => void)[]> = {};
  static _on(event: string, listener: (...args: any[]) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  }

  id: string;
  title: string;
  url: string;
  favicon: string;
  iframe: HTMLIFrameElement;
  isLoading: boolean = false;
  active: boolean = false;
  #updateLoop?: NodeJS.Timeout;

  constructor(url: string) {
    super();

    try {
      new URL(url);
    } catch (error) {
      url = resolveSearchEngine().pattern.replace(
        "%s",
        encodeURIComponent(url)
      );
    }

    this.id = v4();
    this.url = url;
    this.title = url;
    this.favicon = new URL(url).origin + "/favicon.ico";
    this.iframe = this.createIframe();

    this.startUpdateLoop();

    TabModel.tabs.push(this);

    TabModel.listeners["new"]?.forEach((listener) => listener(this));

    this.emit("update");
  }

  createIframe() {
    const iframe = document.createElement("iframe");

    iframe.src = PROXIES[fetchSettings().proxy].encode(this.url);
    this.isLoading = true;

    iframe.onload = () => {
      this.isLoading = false;
      this.emit("update");
      this.emit("load");
    };

    document.getElementById("iframes")!.appendChild(iframe);

    return iframe;
  }

  startUpdateLoop() {
    this.#updateLoop = setInterval(() => {
      const title = this.iframe.contentDocument?.title || this.url;
      const favicon = new URL(
        this.iframe.contentDocument?.querySelector<HTMLLinkElement>(
          "link[rel='icon']"
        )?.href ||
          `https://www.google.com/s2/favicons?domain=${new URL(this.url).host}&size=64`
      ).href;

      if (title !== this.title || favicon !== this.favicon) {
        this.title = title;
        this.favicon = favicon;
        this.emit("update");
      }

      this.emit("update");
    }, 100);
  }

  close() {
    clearInterval(this.#updateLoop!);
    this.iframe.remove();

    const index = TabModel.tabs.indexOf(this);
    TabModel.tabs.splice(index, 1);

    let activeTab;
    if (TabModel.tabs.length === 0) {
      activeTab = new TabModel(resolveSearchEngine().homepage);
    } else {
      activeTab = TabModel.tabs[index] || TabModel.tabs[index - 1];
    }

    activeTab.setActive(true);
  }

  reload() {
    this.iframe.contentWindow?.location.reload();
  }

  stop() {
    this.iframe.contentWindow?.stop();
  }

  navigate(url: string) {
    this.iframe.src = url;
  }

  back() {
    this.iframe.contentWindow?.history.back();
  }

  forward() {
    this.iframe.contentWindow?.history.forward();
  }

  setActive(active: boolean) {
    if (active) {
      TabModel.tabs.forEach((tab) => tab.setActive(false));
    }

    this.active = active;
    this.emit("update");
  }
}
