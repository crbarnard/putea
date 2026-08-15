import { NavLink } from "react-router";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/accounts", label: "Accounts" },
  { to: "/transactions", label: "Transactions" },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4">
      <h2 className="mb-6 text-xl font-bold">My App</h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 ${isActive ? "bg-gray-200 font-medium" : "hover:bg-gray-100"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}