import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/welcome.tsx"),
  route("app", "routes/app.tsx"),
  route("app/internal/newtab", "routes/newtab.tsx")
] satisfies RouteConfig;
