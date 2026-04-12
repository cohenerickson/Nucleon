import { db, type BrowserSettings } from "~/browser/services/BrowserStorage";
import { Defaults } from "~/config/Settings";

const UpdateHandlers: ((settings: BrowserSettings) => void)[] = [];

export async function getSettings(): Promise<BrowserSettings> {
  const _ = await db;
  const storedSettings = await _.get("settings", "profile0");

  return { ...Defaults, ...storedSettings };
}

export async function updateSettings(
  newSettings: Partial<BrowserSettings>
): Promise<void> {
  const _ = await db;
  const currentSettings = await getSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  await _.put("settings", updatedSettings, "profile0");
  UpdateHandlers.forEach((handler) => handler(updatedSettings));
}

export function onUpdateSettings(
  callback: (settings: BrowserSettings) => void
) {
  UpdateHandlers.push(callback);
}
