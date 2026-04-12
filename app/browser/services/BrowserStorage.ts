import type { browser } from "../polyfill/Browser";
import type { Manifest } from "../types/Manifest";
import { openDB, type DBSchema } from "idb";

export const db = openDB<BrowserDB>("nucleon", 1, {
  upgrade(db) {
    db.createObjectStore("settings");
    db.createObjectStore("addons");
  }
});

export interface BrowserDB extends DBSchema {
  settings: {
    key: string;
    value: BrowserSettings;
  };
  addons: {
    key: string;
    value: {
      id: string;
      profile: string;
      version: string;
      enabled: boolean;
      grantedPermissions: (keyof typeof browser)[];
      requestedPermissions: string[];
      pinned: boolean;
      allowedInPrivateBrowsing: boolean;
    };
  };
}

export type BrowserSettings = {
  homepage: string;
  searchEngine: string;
  proxy: "scramjet";
  theme: Manifest["theme"];
  transport: {
    type: "wisp" | "bare";
    path: string;
    server: string;
  };
  view: {
    homeButton: boolean;
    bookmarksBar: boolean;
    autocomplete: {
      enabled: boolean;
      searches: boolean;
      history: boolean;
      bookmarks: boolean;
    };
    fullUrls: boolean;
    roundedContent: boolean;
    tabHover: "card" | "tooltip" | "none";
  };
  shortcuts: {};
};

// Static methods on a BrowserStorage class?
