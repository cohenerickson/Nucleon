import type { browser } from "../api/Browser";
import { openDB, type DBSchema } from "idb";
import type { BrowserSettings } from "~/util/Settings";

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

// Static methods on a BrowserStorage class?
