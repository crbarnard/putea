import type { Route } from "./+types/status";

export function meta({}: Route.MetaArgs) {
  return [{ title: "API Status" }];
}

export async function loader({}: Route.LoaderArgs) {
  const apiUrl = process.env.API_URL ?? "http://localhost:3000";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }
    const data = (await response.json()) as { message: string };
    return { ok: true as const, message: data.message };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default function Status({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex items-center justify-center pt-16">
      <div className="max-w-[400px] w-full space-y-4 px-4 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          API Status
        </h1>
        {loaderData.ok ? (
          <p className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            {loaderData.message}
          </p>
        ) : (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
            Couldn&apos;t reach the API: {loaderData.error}
          </p>
        )}
      </div>
    </main>
  );
}
