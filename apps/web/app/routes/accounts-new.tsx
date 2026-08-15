export default function NewAccount() {
  return (
    <main>
      <h1>Create Account</h1>

      <form>
        <label>
          Account name
          <input name="name" />
        </label>

        <button type="submit">Create account</button>
      </form>
    </main>
  );
}