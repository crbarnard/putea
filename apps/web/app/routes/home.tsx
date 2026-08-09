import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Welcome />
      <p className="pb-8 text-center">
        <Link
          to="/status"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Check API status
        </Link>
      </p>
    </>
  );
}
