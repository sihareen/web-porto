import type { ReactNode } from "react";

import { logoutAdminAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--text-primary)] opacity-60">
              Admin Panel
            </p>
            <p className="text-sm font-medium text-[var(--text-secondary)]">{session.email}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            <a
              href="/admin/projects"
              className="border border-[var(--border)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
            >
              Projects
            </a>
            <a
              href="/admin/experiences"
              className="border border-[var(--border)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
            >
              Experience
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--border)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
            >
              View Site
            </a>
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="bg-[var(--text-primary)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--surface)] transition-opacity hover:opacity-90"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
        {children}
      </main>
    </div>
  );
}
