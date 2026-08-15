import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  route("home", "routes/home.tsx"),
  route("status", "routes/status.tsx"),

  layout("layouts/dashboard-layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("accounts", "routes/accounts.tsx"),
    route("accounts/new", "routes/accounts-new.tsx"),
    route("transactions", "routes/transactions.tsx")
  ])
  
] satisfies RouteConfig;