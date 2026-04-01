import type * as TabTypes from "../types/Tabs";
import type { ImageDetails } from "../types/ExtensionTypes";
import { addonRPC } from "../services/AddonSWBootstrap";

export async function captureVisibleTab(
  windowId?: number,
  options?: ImageDetails
): Promise<string> {
  return "";
}
