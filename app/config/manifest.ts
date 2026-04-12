import type { WebAppManifest } from "web-app-manifest";

export const manifest = {
  short_name: "Nucleon",
  name: "Nucleon",
  description:
    "The next-generation web proxy platform with seamless integration and enhanced privacy features.",
  categories: ["productivity", "games", "security", "utilities"],
  icons: [
    {
      src: "icons/32.png",
      sizes: "32x32",
      type: "image/png"
    },
    {
      src: "icons/192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "icons/512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "icons/touch.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable"
    }
  ],
  start_url: "/app",
  file_handlers: [
    {
      action: "/app",
      accept: {
        "text/html": [".html", ".htm"]
      }
    }
  ],
  theme_color: "white",
  background_color: "white",
  display: "fullscreen",
  display_override: ["window-controls-overlay"]
} satisfies WebAppManifest & {
  // The WebAppManifest type doesn't currently include file_handlers, so we need to extend it here
  /* Example Implementation
   * if ("launchQueue" in window) {
   *   window.launchQueue.setConsumer((launchParams) => {
   *     if (launchParams.files && launchParams.files.length) {
   *       playSong(launchParams.files[0]);
   *   }});
   * }
   */
  file_handlers: {
    action: string;
    accept: Record<string, string[]>;
  }[];
};
