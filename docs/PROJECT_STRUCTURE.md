# Project Structure

This project uses React Router framework mode. Application source code lives under `web/app/`.

## Structure


### Web App

```text
web/
├─ app/
│  ├─ components/     # Shared reusable UI components
│  ├─ config/         # App configuration such as navigation
│  ├─ features/       # Domain-specific functionality
│  ├─ hooks/          # Shared React hooks
│  ├─ layouts/        # Shared page layouts
│  ├─ routes/         # Route/page entry components
│  ├─ services/       # API, authentication, external services
│  ├─ app.css         # Global styles
│  ├─ root.tsx        # Root application shell
│  └─ routes.ts       # Route definitions
├─ public/
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Routes

Route components should remain relatively thin and delegate reusable or domain-specific logic to `features/`, `components/`, and `services/`.

Current planned routes:

```text
/login
/dashboard
/accounts
/accounts/new
/transactions
```

`/login` is a standalone page.

Dashboard-related routes share `DashboardLayout`, which contains persistent UI such as the sidebar and renders the active child route through React Router's `<Outlet />`.

## Components

`components/` contains reusable UI that is not specific to a single feature.

Examples:

```text
components/
├─ button.tsx
├─ input.tsx
└─ sidebar.tsx
```

## Features

`features/` contains business/domain-specific code.

Example:

```text
features/
├─ accounts/
│  ├─ components/
│  ├─ hooks/
│  ├─ api.ts
│  └─ types.ts
└─ transactions/
   ├─ components/
   ├─ api.ts
   └─ types.ts
```

Code should move into a feature once it becomes specific to that area of the application.

## Layouts

Layouts contain UI shared by multiple routes.

`DashboardLayout` contains the sidebar and an `<Outlet />`:

```text
DashboardLayout
├─ Sidebar
└─ Outlet
   └─ Current route
```

This allows navigation between dashboard pages without duplicating the surrounding layout.

## Navigation

Sidebar navigation should be defined separately from the sidebar component.

```text
config/
└─ navigation.ts
```

This keeps route labels and paths centralized and makes it easier to add icons, permissions, or conditional navigation later.

## General Guidelines

* Keep route files focused on page composition.
* Put reusable UI in `components/`.
* Put domain-specific code in `features/`.
* Put API and authentication logic in `services/`.
* Put shared page shells in `layouts/`.
* Avoid adding a separate `pages/` directory because `routes/` already serves that purpose.
