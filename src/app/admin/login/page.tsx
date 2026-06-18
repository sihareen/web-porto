import { redirect } from "next/navigation";

import { loginAdminAction } from "@/app/admin/actions";
import { getAdminSessionFromCookies } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSessionFromCookies();
  if (session) {
    redirect("/admin/projects");
  }

  const params = await searchParams;
  const showError = params.error === "invalid_credentials" || params.error === "invalid_input";

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-6 py-16">
      <div className="w-full max-w-md border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Admin Panel</h1>
          <p className="text-sm text-[var(--text-secondary)]">Masukkan kredensial untuk mengelola konten.</p>
        </div>

        {showError ? (
          <div className="mb-6 border border-rose-400/40 bg-rose-500/5 px-4 py-3 text-sm text-rose-700">
            Login gagal. Periksa email dan password.
          </div>
        ) : null}

        <form action={loginAdminAction} className="space-y-5">
          <label className="block space-y-2 text-sm font-medium text-[var(--text-primary)]">
            Email
            <input
              name="email"
              type="email"
              required
              className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-[var(--text-primary)]">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--text-primary)]"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[var(--text-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--surface)] transition-opacity hover:opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
