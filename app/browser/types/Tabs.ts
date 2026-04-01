export type MutedInfo = {
  extensionId?: string;
  muted: boolean;
  reason?: MutedInfoReason;
};

export enum MutedInfoReason {
  "user",
  "capture",
  "extension"
}

export type Tab = {
  active: boolean;
  audible: boolean;
  autoDiscardable: boolean;
  discarded: boolean;
  faviconUrl: string;
  frozen: boolean;
  groupId: number;
  height: number;
  highlighted: boolean;
  id: number;
  incognito: boolean;
  index: number;
  lastAccessed: number;
  mutedInfo?: MutedInfo;
  openerTabId?: number;
  pendingUrl?: string;
  pinned: boolean;
  selected: boolean;
  sessionId?: string;
  splitViewId?: number;
  status?: TabStatus;
  title?: string;
  url?: string;
  width?: number;
  windowId: number;
};

export enum TabStatus {
  "unloading",
  "loading",
  "complete"
}

export enum WindowType {
  "normal",
  "popup",
  "panel",
  "app",
  "devtools"
}

export type ZoomSettings = {
  defaultZoomFactor?: number;
  mode?: ZoomSettingsMode;
  scope?: ZoomSettingsScope;
};

export enum ZoomSettingsMode {
  "automatic",
  "manual",
  "disabled"
}

export enum ZoomSettingsScope {
  "per-origin",
  "per-tab"
}

export type MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND = 2;
export type SPLIT_VIEW_ID_NONE = -1;
export type TAB_ID_NONE = -1;
export type TAB_INDEX_NONE = -1;
