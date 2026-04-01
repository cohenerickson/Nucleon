export enum AccessLevel {
  "TRUSTED_CONTEXTS",
  "TRUSTED_AND_UNTRUSTED_CONTEXTS"
}

export type StorageChange = {
  newValue?: any;
  oldValue?: any;
};

export interface StorageArea {
  clear(): Promise<void>;
  get(keys?: string | string[] | object): Promise<object>;
  getBytesInUse(keys?: string | string[]): Promise<number>;
  getKeys(): Promise<string[]>;
  remove(keys: string | string[]): Promise<void>;
  set(items: { [key: string]: any }): Promise<void>;
  setAccessLevel(accessOptions: { accessLevel: AccessLevel }): Promise<void>;
  onChanged: StorageChangeEvent;
}

export interface StorageChangeEvent {
  addListener(
    callback: (changes: { [key: string]: StorageChange }) => void
  ): void;
  removeListener(
    callback: (changes: { [key: string]: StorageChange }) => void
  ): void;
  hasListener(
    callback: (changes: { [key: string]: StorageChange }) => void
  ): boolean;
}
