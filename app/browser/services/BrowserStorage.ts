import { openDB, type IDBPDatabase, type DBSchema } from "idb";
import type { browser } from "../api/Browser";

export interface BrowserDB extends DBSchema {
  browserState: {
    key: "activeProfile" | "activeTheme";
    value: string;
  };
  profiles: {
    key: string;
    value: {};
  };
  addons: {
    key: string;
    value: {
      id: string;
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
