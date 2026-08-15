import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("status", "routes/status.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("accounts", "routes/accounts.tsx"),
  route("accounts/new", "routes/accounts-new.tsx"),
  route("transactions", "routes/transactions.tsx"),
] satisfies RouteConfig;