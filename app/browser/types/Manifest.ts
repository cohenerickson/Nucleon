// Manifest v3, prior versions will not be supported in the first phase of development
// Anything commented out is not currently supported by Nucleon, open a PR if you like :)
export type Manifest = {
  // action?: {
  //   browser_style?: boolean;
  //   default_area?: "navbar" | "menupanel" | "tabstrip" | "personaltoolbar";
  //   default_icon?: string | { [key: string]: string };
  //   default_popup?: string;
  //   default_title?: string;
  //   theme_icons?: ThemeIcons[];
  // };
  // author?: string;
  // background?: {
  //   page?: string;
  //   scripts?: string[];
  //   service_worker?: string;
  //   persistent?: boolean;
  //   preferred_environment?: ("document" | "service_worker")[];
  //   type?: "classic" | "module";
  // };
  browser_specific_settings: {
    nucleon: {
      id: string;
      strict_min_version: string;
      strict_max_version?: string;
    };
  };
  // chrome_settings_overrides?: {
  //   homepage?: string;
  //   search_provider?: {
  //     name: string;
  //     search_url: string;
  //     is_default: boolean;
  //     alternate_urls?: string[];
  //     encoding?: string;
  //     favicon_url?: string;
  //     image_url?: string;
  //     image_url_post_params?: string;
  //     instant_url?: string;
  //     instant_url_post_params?: string;
  //     keyword?: string;
  //     prepopulated_id?: string;
  //     search_url_get_params?: string;
  //     search_url_post_params?: string;
  //     suggest_url?: string;
  //     suggest_url_get_params?: string;
  //     suggest_url_post_params?: string;
  //   };
  //   startup_pages?: string[];
  // };
  // chrome_url_overrides?: {
  //   bookmarks?: string;
  //   history?: string;
  //   newtab?: string;
  // };
  // commands?: {
  //   [key: string]: {
  //     suggested_key?: {
  //       default?: string;
  //       nucleon?: string;
  //     };
  //     description?: string;
  //   };
  // };
  // content_scripts?: {
  //   all_frames?: boolean;
  //   css?: string[];
  //   css_origin?: "author" | "user";
  //   exclude_globs?: string[];
  //   exclude_matches?: string[];
  //   include_globs?: string[];
  //   js?: string[];
  //   match_about_blank?: boolean;
  //   max_orignin_as_fallback?: boolean;
  //   matches: string[];
  //   run_at?: "document_start" | "document_end" | "document_idle";
  //   world?: "ISOLATED" | "MAIN";
  // }[];
  // content_security_policy?: {
  //   extension_pages?: string;
  //   sandbox?: string;
  // };
  // declarative_net_request?: {
  //   rule_resources: {
  //     id: string;
  //     enabled: boolean;
  //     path: string;
  //   }[];
  // };
  // default_locale?: string;
  // description?: string;
  // developer?: {
  //   name?: string;
  //   url?: string;
  // };
  // devtools_page?: string;
  // dictionaries?: {
  //   [key: string]: string;
  // };
  // externally_connectable?: {
  //   ids?: string[];
  //   matches?: string[];
  //   accepts_tls_channel_id?: boolean;
  // };
  // homepage_url?: string;
  // host_permissions?: string[];
  // icons?: { [key: string]: string };
  // incognito?: "spanning" | "split" | "not_allowed";
  manifest_version: 3;
  name: string;
  // omnibox?: {
  //   keyword: string;
  // };
  // optional_host_permissions?: string[];
  // optional_permissions?: string[];
  // options_page?: string;
  // options_ui?: {
  //   open_in_tab?: boolean;
  //   page: string;
  // };
  // page_action?: {
  //   default_icon?: string | { [key: string]: string };
  //   default_popup?: string;
  //   default_title?: string;
  //   hide_matches?: string[];
  //   show_matches?: string[];
  // };
  // permissions?: string[];
  // protocol_handlers?: {
  //   protocol: string;
  //   name: string;
  //   uriTemplate: string;
  // }[];
  // short_name?: string;
  // sidebar_action?: {
  //   default_icon?: string | { [key: string]: string };
  //   default_panel: string;
  //   default_title?: string;
  //   open_at_install?: boolean;
  // };
  // storage?: {
  //   managed_schema?: string;
  // };
  theme?: {
    images?: {
      theme_frame?: string;
      additional_backgrounds?: string[];
    };
    colors?: { [K in ThemeColorKeys]: string };
    properties?: ThemeProperties;
  };
  version: string;
  version_name?: string;
  web_accessible_resources?: {
    extension_ids?: string[];
    matches?: string[];
    resources: string[];
    use_dynamic_url?: boolean;
  }[];
};

export type ThemeProperties = {
  additional_backgrounds_alignment: (
    | "bottom"
    | "left"
    | "center"
    | "right"
    | "top"
    | "center bottom"
    | "center center"
    | "center top"
    | "left bottom"
    | "left center"
    | "left top"
    | "right bottom"
    | "right center"
    | "right top"
  )[];
  additional_backgrounds_tiling: (
    | "no-repeat"
    | "repeat"
    | "repeat-x"
    | "repeat-y"
  )[];
  color_scheme: "auto" | "light" | "dark" | "system";
  content_color_scheme: "auto" | "light" | "dark" | "system";
};

// See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/theme#colors
export type ThemeColorKeys =
  | "bookmark_text"
  | "button_background_active"
  | "button_background_hover"
  | "icons"
  | "icons_attention"
  | "frame"
  | "frame_inactive"
  | "ntp_background"
  | "ntp_card_background"
  | "ntp_text"
  | "popup"
  | "popup_border"
  | "popup_highlight"
  | "popup_highlight_text"
  | "popup_text"
  | "sidebar"
  | "sidebar_border"
  | "sidebar_highlight"
  | "sidebar_highlight_text"
  | "sidebar_text"
  | "tab_background_separator"
  | "tab_background_text"
  | "tab_line"
  | "tab_loading"
  | "tab_selected"
  | "tab_text"
  | "toolbar"
  | "toolbar_bottom_separator"
  | "toolbar_field"
  | "toolbar_field_border"
  | "toolbar_field_border_focus"
  | "toolbar_field_focus"
  | "toolbar_field_highlight"
  | "toolbar_field_highlight_text"
  | "toolbar_field_separator"
  | "toolbar_field_text"
  | "toolbar_field_text_focus"
  | ("toolbar_text" | "bookmark_text")
  | "toolbar_top_separator"
  | "toolbar_vertical_separator";

export type ThemeIcons = {
  dark: string;
  light: string;
  size: string;
};
