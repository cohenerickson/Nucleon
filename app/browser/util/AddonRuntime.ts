/*
 * This file is part of the main service worker scope.
 * See app/browser/services/ServiceWorker.ts for more details.
 */
import { RPC } from "./RPC";
import { browserDB, browserRPC } from "../services/ServiceWorker";
import type { Manifest } from "../types/Manifest";
import { log } from "./Logger";
import { lt, gt } from "semver";
import MANIFEST from "../../../package.json";

// Counterpart RPC implementations are within the AddonSWBootstrap service
export class AddonRuntime extends RPC {
  id: string;
  name?: string;
  private initialized = false;

  get ready(): Promise<boolean> {
    return new Promise((resolve) => {
      const checkReady = () => {
        if (this.initialized) {
          resolve(true);
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }

  constructor(id: string) {
    super(`nucleon-addon-${id}`);

    this.id = id;

    this.initialize();

    // browserRPC.call("nucleon.internal.registerAddon", id);
  }

  private async initialize() {
    const manifestRequest = await fetch(
      `/app/internal/addons/${this.id}/manifest.json`
    );
    const manifest = (await manifestRequest.json()) as Manifest;

    // Manifest validation
    if (!manifest.version) {
      throw log.fatal(
        `[AddonRuntime] Manifest is missing required "version" field`
      );
    }

    if (!manifest.name) {
      throw log.fatal(
        `[AddonRuntime] Manifest is missing required "name" field`
      );
    }

    this.name = manifest.name;

    if (manifest.manifest_version !== 3) {
      throw log.fatal(
        `[AddonRuntime] Unsupported manifest version: ${manifest.manifest_version}`
      );
    }

    if (manifest.browser_specific_settings.nucleon.id !== this.id) {
      throw log.fatal(
        `[AddonRuntime] Manifest ID does not match expected addon ID: ${this.id}`
      );
    }

    if (
      lt(
        manifest.browser_specific_settings.nucleon.strict_min_version,
        MANIFEST.version
      )
    ) {
      throw log.fatal(
        `[AddonRuntime] Nucleon version is older than expected: ${manifest.browser_specific_settings.nucleon.strict_min_version} < ${MANIFEST.version}`
      );
    }

    if (
      gt(
        manifest.browser_specific_settings.nucleon.strict_max_version ||
          MANIFEST.version,
        MANIFEST.version
      )
    ) {
      throw log.fatal(
        `[AddonRuntime] Nucleon version is newer than expected: ${manifest.browser_specific_settings.nucleon.strict_max_version} > ${MANIFEST.version}`
      );
    }

    if (manifest.theme) {
      await this.initTheme(manifest);
    }

    this.initialized = true;
  }

  private async initTheme(manifest: Manifest) {
    const activeTheme = await browserDB.get("browserState", "activeTheme");

    if (activeTheme === this.id) {
      log.info(`[AddonRuntime] Activating theme ${this.id}`);
      await browserRPC.call("nucleon.internal.setActiveTheme", manifest.theme);
    } else {
      log.info(`[AddonRuntime] Requesting theme activation for ${this.id}`);
      const themeActivation = await browserRPC.call(
        "nucleon.internal.requestThemeActivation",
        this.id,
        manifest
      );

      if (themeActivation) {
        log.info(
          `[AddonRuntime] Theme activation approved for ${this.name}, activating...`
        );
        await browserRPC.call(
          "nucleon.internal.setActiveTheme",
          manifest.theme
        );
        log.info(`[AddonRuntime] Successfully activated theme ${this.name}`);
      } else {
        log.info(
          `[AddonRuntime] Theme activation request denied for ${this.name}`
        );
      }
    }
  }

  destroy(): void {
    browserRPC.call("nucleon.internal.unregisterAddon", this.id);
    super.destroy();
  }
}
