import { PROXIES } from "./ProxyManager";
import { settings } from "./SettingsManager";
import EventEmitter from "events";
import { v4 } from "uuid";

export class TabModel extends EventEmitter {
  static tabs: TabModel[] = [];
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
      url = `https://www.google.com/search?q=${encodeURIComponent(
        url
      )}&size=64`;
    }

    this.id = v4();
    this.url = url;
    this.title = url;
    this.favicon = new URL(url).origin + "/favicon.ico";
    this.iframe = this.createIframe();

    this.startUpdateLoop();

    TabModel.tabs.push(this);
  }

  createIframe() {
    const iframe = document.createElement("iframe");

    iframe.src = PROXIES[settings.proxy].encode(this.url);
    this.isLoading = true;

    iframe.onload = () => {
      this.isLoading = false;
      this.emit("update");
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
          `https://www.google.com/s2/favicons?domain=${new URL(this.url).host}`
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
      activeTab = new TabModel("https://www.google.com/");
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