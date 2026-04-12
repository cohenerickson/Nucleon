import type { BrowserSettings } from "~/browser/services/BrowserStorage";

export const Defaults = {
  homepage: "nucleon://newtab",
  searchEngine: "https://www.google.com/search?q=%s",
  proxy: "scramjet",
  theme: {},
  transport: {
    type: "wisp",
    path: "/epoxy/index.mjs",
    server: "ws://127.0.0.1:5001/"
  },
  view: {
    homeButton: true,
    bookmarksBar: true,
    autocomplete: {
      enabled: true,
      searches: true,
      history: true,
      bookmarks: true
    },
    fullUrls: true,
    roundedContent: false,
    tabHover: "none"
  },
  shortcuts: {}
} satisfies BrowserSettings;
