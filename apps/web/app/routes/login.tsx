// app/routes/login.tsx
import { useNavigate } from "react-router";
import { Button } from "../components/button";
import { Input } from "../components/input";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: authenticate
    navigate("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit">Login</Button>
      </form>
    </main>
  );
}